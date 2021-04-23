---
title: "Writing a Universal Chess Interface (UCI) Client in Java"
date: "2021-04-22"
classes: wide
categories:
- "java"
tags:
- "uci"
- "stockfish"
---

> I love chess, it's just that chess doesn't love me back.

Recently my interest in chess surged (I blame Corona), so I've decided to write a set of tools for creating statistics about my games - I am a programmer after all.  

My plan was to build something straightforward, you know, the type of statistics that would answer simple questions like:
- Which opening I am the most successful with;
- How good I am compared to my opponent after (let's say), move 10;
- How often do I blunder pieces in blitz;
- etc.

So my first reaction (as a programmer) was to find a Java library that "connects" to Stockfish (or to a similar open-source chess engine) and do the works for me. Little did I know. There's no maintained Java library that does that. 

After doing my research, I've found out that most modern chess engines implement a protocol called UCI. UCI stands for [*Universal Chess Interface*](https://en.wikipedia.org/wiki/Universal_Chess_Interface). It's good that we have a standard, right?

Well, wrong. UCI is quite arcane judging by today's standards. There's no REST API waiting to be consumed. You are not even connecting through a Network Socket. No! UCI uses OLD-SCHOOL process communication through `stdin` and `stdout`. And here the fun begins.

Technically there is documentation (protocol specification can be found [here](https://github.com/nomemory/uci-protocol-specification/) or [here](https://www.shredderchess.com/download.html) or [here](http://wbec-ridderkerk.nl/html/UCIProtocol.html)), but it's not the type of documentation that holds you by the hand, and can be used without a little "reverse engineering" and "do it by yourself" testing.

This article explains how can you write your own UCI Client in Java, but I suppose you can apply the same knowledge in any other programming language.

The full-code is on github: [neat-chess](https://github.com/nomemory/neat-chess).

# Working with an UCI-enabled engine from the command line

## Installing Stockfish (and Leela Zero)

The first step was to install [Stockfish](https://stockfishchess.org/) as a command line utility. If you are on *NIX, most package managers have it in the repo. 

For example on MAC it was:

```
brew install stockfish
```

On Ubuntu I suppose it is:

```
sudo apt-get install stockfish
```

On Windows:

```
Why are you using Windows for programming ?
```

After installation, to start Stockfish just type `stockfish` in your terminal. 

Another interesting engine to work with is [Leela Chess Zero](https://lczero.org/). You can install this as well from the command line: `brew install lc0`.

## Listing supported options

As per protocol definition, the first command you need to submit is `uci`. After the engine receives `uci` on its `stdin`, he will initialise the UCI interface, and he will identify himself with a line that starts with `id name`. 

Then, all the supported options the engine implements are going to be listed on lines starting with `option name <option_name> type ...`.

After a successful initialisation, the engine will always print on the output: `uciok`. 

![gif]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/startstockfish2.gif)

Make no assumption, the list of supported options are not standard. For example [Leela Chess Zero](https://lczero.org/) output is different:

![gif]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/lc0start.gif)


Each option has a type: `check`, `spin`, `combo`, `button` and `string`. It's important to notice this, especially when you will want to set them, or to parse them.

| Option type | Description | Example line |
| ---------- | ------------ | ------------ |
| `check` | The option can be `true` or `false` | `option name Ponder type check default false` |
| `spin` | The option can be `true` or `false` | `option name MultiPV type spin default 1 min 1 max 500` |
| `combo` | The option has predefined values (Strings) | `option name Analysis Contempt type combo default Both var Off var White var Black var Both` |
| `button` | The option doesn't have any value, but can be used to signal to engine to do something | `option name Clear Hash type button` |
| `string` | As the name suggests | `option name EvalFile type string default nn-62ef826d1a6d.nnue` |

Now, in the original specification, the following options are listed, but this doesn't mean an engine is limited those.

| Option name | Description |
| ---------- | ------------ |
| `Hash` | The value in MB for memory for internal hash tables. |
| `NalimovPath` | This is the path to the [Nalimov table bases](https://www.chessprogramming.org/Nalimov_Tablebases). |
| `NalimovCache` | The internal cache the engine uses for [Nalimov tables bases](https://www.chessprogramming.org/Nalimov_Tablebases). |
| `Ponder` | This means that the engine is able to ponder. The client will send this whenever pondering is possible or not. |
| `OwnBook` | This means that the engine has its own book which is accessed by the engine itself. |
| `MultiPV` | The engine supports multi best line or k-best mode. the default value is 1. |
| `UCI_ShowCurrLine` | The engine can show the current line it is calculating. |
| `UCI_ShowRefutations` | The engine can show a move and its refutation in a line. |
| `UCI_LimitStrength` | The engine is able to limit its strength to a specific Elo number. |
| `UCI_Elo` | The engine can limit its strength in Elo within this interval. |
| `UCI_AnalyseMode` | The engine wants to behave differently when analysing or playing a game. For example when playing it can use some kind of learning. This is set to false if the engine is playing a game, otherwise it is true. |
| `UCI_Opponent` | With this command the GUI can send the name, title, elo and if the engine is playing a human or computer to the engine. |

## Changing an option

To change the value of an existing option we can use:

```text
setoption name <option_name> value <value>
```

For example is we want the engine to enter Analyse Mode (`UCI_AnalyseMode`) and then to support 5 analysis lines (`MultiPV`) we need to write:

```text
setoption name UCI_AnalyseMode value true
setoption name MultiPV value 5
```

As a best practice, after sending a synchronous command to the engine, it's best to issue another command: `isready`. 

> `isready` 
> This must be sent when the engine has received an "isready" command and has
> processed all input and is ready to accept new commands now.
> It is usually sent after a command that can take some time to be able to wait for the engine,
> but it can be used anytime, even when the engine is searching,
> and must always be answered with "isready".

So the current order of the commands should be:

```text
setoption name UCI_AnalyseMode value true
setoption name MultiPV value 5
isready
```

Real-time example:

![gif]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/setoption.gif)


## Analysing a position

An UCI-enabled chess engine uses FEN ([Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)) to read a given position. 

The wikipedia article on the Forsyth–Edwards Notation is quite detailed, so I am not going to describe how a FEN `String` is formatted, but what's important to note is that the FEN format only contains a "snapshot" of the chessboard at a given moment. 

On the other hand, the other popular chess format, PGN ([Portable Game Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)) contains the whole game. 

UCI-enabled chess engines understand FEN, not PGN. 

Before analysing a position, it's a best practice to use `ucinewgame`, to clear the engine state from previously analysed positions. Because sometimes `ucinewgame` takes longer than expected, it's best to test the command has finished by also triggering an "isready" command.

The next step is to set a new position for the engine. This is done using the command:

```
position fen <FEN>
```

Let's take as an example the following position (it's a simple mate in 3, with Black to move):

![png]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/matein3.png)

The corresponding FEN for it is: `8/8/4Rp2/5P2/1PP1pkP1/7P/1P1r4/7K b - - 0 40`. This is the `String` the engine will understand.

```text
ucinewgame
position fen 8/8/4Rp2/5P2/1PP1pkP1/7P/1P1r4/7K b - - 0 40
```

At this point we can ask the engine to analyse the given position using `go <params>`. 

```text
go movetime 1000
```

The above command will force the engine to only think for 1 second. But I am sure that 1 second is enough for it to find the mate in 3.

![gif]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/analyseposition.gif)

If you look at the last two lines of the output:

```
info depth 245 seldepth 6 multipv 1 score mate 3 nodes 143187 nps 3579675 tbhits 0 time 40 pv f4g3 e6e4 d2d1 e4e1 d1e1
bestmove f4g3 ponder e6e4
```

You will see that Stockfish suggests moving the piece from `f4` to `g3` (the Black King), and he also recognised the mate in 3.

UCI-enabled chess engines, use a `from-move-to-move` notation, so you will usually need a chessboard in parallel so you can see what piece is moving.

The `go` command can be used togheter with other params. The most interesting is `depth` that specifies the engine how deep the analysis should be (e.g.: `18` moves).

```text
go depth 18
```

# Writing the Java UCI Client library

As we've seen in the previous sections, an UCI-enabled chess engine works like this:

- You open the chess engine process;
- You write commands to the process's `stdin`;
- You read the results the process's `stdout`;
- It's impossible to make an estimation regarding the time the engine spends to analyse a position;
- An engine-process cannot only work at a single position at a time. If you need to analyse more positions in parallel you need to open more processes;

## Opening and closing the engine process

In order to open a process in Java, the `Process` and `ProcessBuilder` classes can be used:

```java
public class Client {

    private Process process = null;
    private BufferedReader reader = null;
    private OutputStreamWriter writer = null;

    public void start(String cmd) {
        var pb = new ProcessBuilder(cmd);
        try {
            this.process = pb.start();
            this.reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            this.writer = new OutputStreamWriter(process.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Client() { }
    
    // -----
}
```

Notes:
* The `BufferedReader reader` will be used to read data from the process: `reader.readLine()`;
* The `OutputStream writer` will be used to write data to the process: `writer.write()`.

So given the above code, if we want to start a new `stockfish` process (assuming `stockfish` is already installed as a command-line utility), we can simply call:

```java
var client = new Client();
client.start("stockfish");
```

At this point we can continue by writing a `close()` method for the client. This method would close the "external" process, and the associated buffered reader (`reader`) and stream writer (`writer`).

```java
public void close() {
    if (this.process.isAlive()) {
        this.process.destroy();
    }
    try {
        reader.close();
        writer.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

So the way we will use the client in the future would be like this:

```java
var client = new Client();
client.start("stockfish");

// do some work with the client

client.close();
```

## Writing a generic method that sends commands to the engine

The way I would design a method like this is the following:

- The method should have a `timeout` param. The reason is simple: we cannot estimate how much time the engine would spend on analysing a move, and we want the execution to stop eventually. 
- To impose a `timeout` on a method in Java, the only reliable way to do it is to wrap the execution inside a `CompletableFuture`, and then use `CompletableFuture.get(timeout)`;
- The method should block the `Thread` on which the request is running until the results from the engine are returned, or the request timeouts.
- Blocking the `Thread` should be done in order to avoid sending requests to the engine process in parallel - the engine wouldn't be able to handle more than one request/command.
- Our method should be a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function), that takes the following functions as arguments:
    - `Function<List<String>, T> processor` - this param will process the lines coming from the engine (as a `List<String>`) and transform them in the desired output
    - `Predicate<String> break` - this param represents the condition on which we are no longer expect any more input from the previous request.

Given this, a method like this will look like:

```java
public <T> T command(String cmd, Function<List<String>, T> commandProcessor, Predicate<String> breakCondition, long timeout)
        throws InterruptedException, ExecutionException, TimeoutException {

    // This completable future will send a command to the process
    // And gather all the output of the engine in the List<String>
    // At the end, the List<String> is translated to T through the
    // commandProcessor Function
    CompletableFuture<T> command = supplyAsync(() -> {
        final List<String> output = new ArrayList<>();
        try {
            writer.flush();
            writer.write(cmd + "\n");
            writer.write("isready\n");
            writer.flush();
            String line = "";
            while ((line = reader.readLine()) != null) {
                if (line.contains("Unknown command")) {
                    throw new RuntimeException(line);
                }
                if (line.contains("Unexpected token")) {
                    throw new RuntimeException("Unexpected token: " + line);
                }
                output.add(line);
                if (breakCondition.test(line)) {
                    // At this point we are no longer interested to read any more
                    // output from the engine, we consider that the engine responded
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return commandProcessor.apply(output);
    });

    return command.get(timeout, TimeUnit.MILLISECONDS);
}
```

The method is now generic enough to be re-used to send / retrieve various information to / from the engine.

## (Re)use the `command(...)` method to get the best engine move

Let's look at the previously "mate in 3" position:

![png]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/matein3.png)

As we said, the associated FEN string is: `8/8/4Rp2/5P2/1PP1pkP1/7P/1P1r4/7K b - - 0 40`.

Now, we want to ask `stockfish` from Java what is the best move, we can re-use the `command(...)` method a few times and obtain the result.

```java
var client = new Client();
var position = "8/8/4Rp2/5P2/1PP1pkP1/7P/1P1r4/7K b - - 0 40";

client.start("stockfish");

// We initialise the engine to use the UCI interface
client.command("uci", identity(), (s) -> s.startsWith("uciok"), 2000l);

// We set the give position
client.command("position fen " + position, identity(), s -> s.startsWith("readyok"), 2000l);

String bestMove = client.command(
        "go movetime 3000",
        lines -> lines.stream().filter(s->s.startsWith("bestmove")).findFirst().get(),
        line -> line.startsWith("bestmove"),
        5000l)
        .split(" ")[1];

System.out.println(bestMove);

client.close();
```

Output:

```
f4g3
```

## (Re)use the `command(...)` to retrieve the 10 best possible moves for a position.

This task is a bit more complicated because it involves parsing *non-friendly* output from the engine.

By default, an UCI-enabled chess engine only retrieves the single best line it founds. To retrieve more lines and their score, we first need to set the `MultiPV` option to `10`.

Setting an option would be as simple as:

```java
client.command("setoption name MultiPV value 10", identity(), s->s.startsWith("readyok"), 2000l);
```

And now we need to look into format the engine retrieves the analysis line.

Let's take the following position as an example (Ruy-Lopez):

![png]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/ruylopez.png)

The FEN string of this position is: `r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`.

If we want to get the 10 best continuations for black starting with this position, in the command line we will obtain the following output:

```text
go depth 10

--- more text ----

info depth 10 seldepth 12 multipv 1 score cp -8 nodes 125667 nps 657942 tbhits 0 time 191 pv a7a6 b5a4 g8f6 d2d3 f8c5 e1g1 d7d6 d3d4 e5d4 f3d4 c8d7 d4c6 b7c6
info depth 10 seldepth 13 multipv 2 score cp -27 nodes 125667 nps 657942 tbhits 0 time 191 pv g8f6 b1c3 f8d6 d2d4 e5d4 f3d4 c6d4 d1d4
info depth 10 seldepth 13 multipv 3 score cp -28 nodes 125667 nps 657942 tbhits 0 time 191 pv f8c5 c2c3 g8f6 d2d4 c5b6 d4e5 f6e4 e1g1 e8g8 b5a4
info depth 10 seldepth 13 multipv 4 score cp -31 nodes 125667 nps 657942 tbhits 0 time 191 pv g8e7 e1g1 e7g6 b5a4 f8e7 c2c3 e8g8 d2d4 d7d6 g1h1
info depth 10 seldepth 12 multipv 5 score cp -33 nodes 125667 nps 657942 tbhits 0 time 191 pv f8e7 b1c3 d7d6 d2d4 e5d4 f3d4 c8d7 e1g1 g8f6 d4f5 d7f5 e4f5
info depth 10 seldepth 13 multipv 6 score cp -61 nodes 125667 nps 657942 tbhits 0 time 191 pv d7d6 d2d4 g8f6 d4e5 f6e4 b5c6 b7c6 e1g1 c8g4 d1d4
info depth 10 seldepth 13 multipv 7 score cp -63 nodes 125667 nps 657942 tbhits 0 time 191 pv g7g6 d2d4 e5d4 c2c3 a7a6 b5c6 d7c6 c3d4 f8g7 c1e3
info depth 10 seldepth 13 multipv 8 score cp -65 nodes 125667 nps 657942 tbhits 0 time 191 pv h7h6 e1g1 g8f6 b1c3 f8d6 d2d4 e5d4 f3d4 c6d4 d1d4
info depth 10 seldepth 12 multipv 9 score cp -66 nodes 125667 nps 657942 tbhits 0 time 191 pv c6d4 f3d4 e5d4 e1g1 g8f6 d2d3 c7c6 b5c4 f8d6 f2f4
info depth 10 seldepth 13 multipv 10 score cp -74 nodes 125667 nps 657942 tbhits 0 time 191 pv f8d6 d2d4 e5d4 e1g1 g8e7 c2c3 a7a6 b5c4 b7b5 c4b3 d4c3 b1c3 e7g6
```

The relevant output for us is:

```
info depth <depth> seldepth <...> multipv <line> score cp <score> nodes <...> nps <...> tbhits <...> time <...> pv <move1> <move2> ...
``` 

Were:

- `depth` represents how deep the engine has searched;
- `line` represents the line suggested by the engine (smaller is better);
- `score` represents the score the of the move (bigger is better);
- `move1` represents the actual move the engine suggests.
- `move2`, `move3`, ... represent the best continuations on that line from the engine point of view.

In case the line leads to a forced mate in 1,2,3,4,5... moves, the output is a little different. No score will be shown so instead of: `score cp <score>` the line will contain `score mate <number>`.

The first thing that comes to find is to write a [regex](https://en.wikipedia.org/wiki/Regular_expression) that can capture the data we need using [groups](https://docs.oracle.com/javase/tutorial/essential/regex/groups.html). 

I am no expert in writing regular expressions, but after some effort I've come to write the following:

```
info depth ([\w]*) seldepth [\w]* multipv ([\w]*) score (cp ([\-\w]*)|mate ([\w*])) [\s\w]*pv ([\w]*)\s*([\s\w]*)
```

![png]({{site.url}}/assets/images/2021-04-22-writing-a-universal-chess-interface-client-in-java/regex.png)

So if you look closely the data is captured in the groups as follows:

- `group1` contains the depth;
- `group2` contains the line;
- `group3` contains the score string (either `cp score` or `mate number`);
- `group4` the actual `score`;
- `group5` the `number` of moves to mate;
- `group6` the actual move;
- `group7` the next moves for that particular line.

> `group5` and `group4` are mutually exclusive.

Now that we have the regex in place, it's easy to write the actual command that extracts the best 10 moves from a given position. The code is the following:

```java
var client = new Client();
var position = "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3";
var analysisLineRegex = "info depth ([\\w]*) seldepth [\\w]* multipv ([\\w]*) score (cp ([\\-\\w]*)|mate ([\\w*])) [\\s\\w]*pv ([\\w]*)\\s*([\\s\\w]*)";
final var pattern = Pattern.compile(analysisLineRegex);

client.start("stockfish");

// We initialise the engine to use the UCI interface
client.command("uci", identity(), (s) -> s.startsWith("uciok"), 2000l);

// We set MultiPV to 10
client.command("setoption name MultiPV value 10", identity(), s->s.startsWith("readyok"), 2000l);

// We set the give position
client.command("position fen " + position, identity(), s -> s.startsWith("readyok"), 2000l);

Map<Integer, String> bestMoves =
        client.command(
                "go depth 18",
                lines -> {
                    Map<Integer, String> result = new TreeMap<>();
                    for(String line : lines) {
                        var matcher = pattern.matcher(line);
                        if (matcher.matches()) {
                            Integer pv = Integer.parseInt(matcher.group(2));
                            String move = matcher.group(6);
                            result.put(pv, move);
                        }
                    }
                    return result;
                },
                s -> s.startsWith("bestmove"),
                50000l);

bestMoves.forEach((k,v) -> {
    System.out.printf("%d %s\n", k, v);
});

client.close();
```

With the following output:

```text
1 g8f6
2 f8c5
3 a7a6
4 f7f5
5 f8e7
6 g8e7
7 d7d6
8 c6d4
9 h7h6
10 f8d6
```

## Going further

The above code is *nasty*, and it can be become unreadable quickly, but it's just a starting point/foundation for a full-fledged UCI client library. 

Normally, from a design perspective, the `command(...)` method is generic enough not to be public in your library API. Instead of letting the developers use `command(...)` directly, specialised methods should be built. 

In this regard, please take a look at [neat-chess](https://github.com/nomemory/neat-chess). This is already a working library that was tested with `Stockfish 13`.

Behind the scenes **neat-chess** uses the same mechanism as described in this article. But on top of the `command()` method I've built additional abstractions to make everything more readable.

For example, the previous code, can be written using **neat-chess** as simple as:

```java
var client = new UCI();
client.startStockfish();
client.setOption("MultiPV", "10");
client.positionFen("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3").getResultOrThrow();
var analysis = client.analysis(18).getResultOrThrow();
var moves = analysis.getAllMoves();

// Output
moves.forEach((idx, move) -> {
    System.out.println(move);
});

client.close();
```

With the following output:

```text
Move{lan='g8f6', strength=-0.13, pv=1, depth=18, continuation=[d2d3, f8c5, c2c3, e8g8, e1g1, d7d5, e4d5, d8d5, b5c4, d5d6, b1d2, c5b6, d2e4, f6e4, d3e4]}
Move{lan='f8c5', strength=-0.31, pv=2, depth=18, continuation=[c2c3, g8f6, d2d4, e5d4, e4e5, f6e4, c3d4, c5b4, b1d2, e8g8, a2a3, b4d2, c1d2, d7d6, e1g1, e4d2, d1d2, c8e6]}
Move{lan='a7a6', strength=-0.4, pv=3, depth=18, continuation=[b5a4, b7b5, a4b3, g8f6, e1g1, c8b7, d2d3, f8c5, a2a4, d7d6, a4b5, a6b5, a1a8, b7a8, b1c3, c6a5, c1g5, a5b3, c2b3]}
Move{lan='f7f5', strength=-0.46, pv=4, depth=18, continuation=[d2d3, f5e4, d3e4, g8f6, e1g1, d7d6, b1c3, f8e7, b5c4, c6a5, c4d3, c8g4, h2h3, g4h5, f1e1, e8g8, c3d5, a5c6, c2c3, f6d5, e4d5]}
Move{lan='f8e7', strength=-0.46, pv=5, depth=18, continuation=[e1g1, g8f6, f1e1, d7d6, c2c3, a7a6, b5a4, b7b5, a4b3, e8g8, h2h3, c6a5, b3c2, c7c5, d2d4, d8c7, b1d2, c5d4, c3d4]}
Move{lan='g8e7', strength=-0.52, pv=6, depth=18, continuation=[b1c3, g7g6, d2d4, e5d4, c3d5, e7d5, e4d5, d8e7, b5e2, c6e5, f3d4, f8g7, e1g1, c7c5, d4b5, e8g8, f2f4, a7a6, f4e5, a6b5]}
Move{lan='d7d6', strength=-0.53, pv=7, depth=18, continuation=[e1g1, a7a6, b5c6, b7c6, d2d4, e5d4, d1d4, g8e7, c1g5, f7f6, g5e3, c8g4, b1d2, e7g6, d4c4, d8d7, f1e1, f8e7]}
Move{lan='c6d4', strength=-0.61, pv=8, depth=18, continuation=[f3d4, e5d4, e1g1, c7c6, b5c4, g8f6, d2d3, d7d5, e4d5, f6d5, f1e1, f8e7, c1g5, f7f6, g5h4, e8g8, h4g3, c8f5, c4d5, c6d5, b1d2]}
Move{lan='h7h6', strength=-0.72, pv=9, depth=18, continuation=[e1g1, g8e7, c2c3, e7g6, d2d4, f8e7, d4e5, e8g8, b5a4, a7a5, a4b3, c6e5, f3e5, g6e5, f2f4, e5g6, g1h1]}
Move{lan='f8d6', strength=-0.78, pv=10, depth=18, continuation=[e1g1, g8e7, c2c3, e8g8, d2d4, e7g6, f1e1, d6e7, c1e3, d7d5, e4d5, e5d4, f3d4, d8d5, c3c4, d5e5, d4c6, b7c6, b5c6, e5b2, c6a8, b2a1]}
```