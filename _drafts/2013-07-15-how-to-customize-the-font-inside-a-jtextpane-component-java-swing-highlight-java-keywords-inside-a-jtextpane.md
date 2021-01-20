---
title: "How to customize the font inside a JTextPane component (Java Swing) - Highlight Java Keywords inside a JTextPane"
date: "2013-07-15"
categories: 
  - "java-programming-languages"
  - "swing-java-programming-languages"
tags: 
  - "actionlistener"
  - "attributeset"
  - "defaulteditorkit"
  - "jbutton"
  - "jframe"
  - "jpanel"
  - "jscrollpane"
  - "jtextpane"
  - "jtoolbar"
  - "simpleattributeset"
  - "styleconstants"
  - "stylecontext"
  - "styledocument"
---

If you need to change the font, color, etc. of the text inside a [JTextPane](http://docs.oracle.com/javase/7/docs/api/javax/swing/JTextPane.html) component you will basically need to follow the next steps:

private JTextPane textEditor;
private StyledDocument textEditorDoc;
...
textEditor = new JTextPane();
textEditorDoc = textEditor.getStyledDocument();
textEditor.getDocument().putProperty(DefaultEditorKit.EndOfLineStringProperty, "\\n");
...
StyleContext sc = StyleContext.getDefaultStyleContext();
// We will make the text blue (Color.blue)
AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY,StyleConstants.Foreground, Color.blue);
...
textEditorDoc.setCharacterAttributes(offset, length, aset, true);

Where _offset_ represents the starting position where you are going to insert the color and _length_ represents the length (starting from the offset) that you wish color.

In the following scenario I will show you how to "highlight" the java keywords in a given text. To identify the keywords we will use _Regular Expressions_.

[![Capture](images/Capture.png)](http://andreinc.net/wp-content/uploads/2013/07/Capture.png)

First we will have to a default color for text highlighting and blue is my color of choice.

public static final Color DEFAULT\_KEYWORD\_COLOR = Color.blue;

The second step will be to define a regular expression that contains all the Java Keywords. For simplicity I chose to use static variables "attached" to my GUI class:

       
       public static final String\[\] JAVA\_KEYWORDS = new String\[\] { "abstract",
			"assert", "boolean", "break", "byte", "case", "catch", "char",
			"class", "const", "continue", "default", "do", "double", "else",
			"enum", "extends", "final", "finally", "float", "for", "goto",
			"if", "implements", "import", "instanceof", "int", "long",
			"native", "new", "package", "private", "protected", "public",
			"return", "short", "static", "strictfp", "super", "switch",
			"synchronized", "this", "throw", "throws", "transient", "try",
			"void", "volatile", "while", "false", "null", "true" };
	public static String JAVA\_KEYWORDS\_REGEX;

	static {
		StringBuilder buff = new StringBuilder("");
		buff.append("(");
		for (String keyword : JAVA\_KEYWORDS) {
			buff.append("\\\\b").append(keyword).append("\\\\b").append("|");
		}
		buff.deleteCharAt(buff.length() - 1);
		buff.append(")");
		JAVA\_KEYWORDS\_REGEX = buff.toString();
	}

The resulting string (JAVA\_KEYWORDS\_REGEX) will look like this (something that it's not advisable to write by hand):

(\\babstract\\b|\\bassert\\b|\\bboolean\\b|\\bbreak\\b|\\bbyte\\b|\\bcase\\b|\\bcatch\\b|\\bchar\\b|\\bclass\\b|\\bconst\\b|\\bcontinue\\b|\\bdefault\\b|\\bdo\\b|\\bdouble\\b|\\belse\\b|\\benum\\b|\\bextends\\b|\\bfinal\\b|\\bfinally\\b|\\bfloat\\b|\\bfor\\b|\\bgoto\\b|\\bif\\b|\\bimplements\\b|\\bimport\\b|\\binstanceof\\b|\\bint\\b|\\blong\\b|\\bnative\\b|\\bnew\\b|\\bpackage\\b|\\bprivate\\b|\\bprotected\\b|\\bpublic\\b|\\breturn\\b|\\bshort\\b|\\bstatic\\b|\\bstrictfp\\b|\\bsuper\\b|\\bswitch\\b|\\bsynchronized\\b|\\bthis\\b|\\bthrow\\b|\\bthrows\\b|\\btransient\\b|\\btry\\b|\\bvoid\\b|\\bvolatile\\b|\\bwhile\\b|\\bfalse\\b|\\bnull\\b|\\btrue\\b)"

For designing the GUI I've used an Eclipse plugin called [WindowBuilder](http://www.eclipse.org/windowbuilder/), and my component hierarchy looks like this:

[![Capture2](images/Capture2.png)](http://andreinc.net/wp-content/uploads/2013/07/Capture2.png)

The functions that are modifying the text are:

	public void updateTextColor(int offset, int length, Color c) {
		StyleContext sc = StyleContext.getDefaultStyleContext();
		AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY,
				StyleConstants.Foreground, c);
		textEditorDoc.setCharacterAttributes(offset, length, aset, true);
	}

	public void clearTextColors() {
		updateTextColor(0, textEditor.getText().length(), Color.BLACK);
	}

	public void updateTextColor(int offset, int length) {
		updateTextColor(offset, length, DEFAULT\_KEYWORD\_COLOR);
	}

And the action behind the button is:

	public ActionListener highLightBtnClick() {
		return new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				clearTextColors();
				Pattern pattern = Pattern.compile(JAVA\_KEYWORDS\_REGEX);
				System.out.println(pattern.pattern());
				Matcher match = pattern.matcher(textEditor.getText());
				while (match.find()) {
					updateTextColor(match.start(), match.end() - match.start());
				}

			}
		};
	}

Full sourcecode:

package net.andreinc.colortextpane;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.text.AttributeSet;
import javax.swing.text.DefaultEditorKit;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;
import javax.swing.text.StyledDocument;
import javax.swing.JScrollPane;
import javax.swing.JToolBar;
import javax.swing.JButton;
import javax.swing.JTextPane;
import javax.swing.ScrollPaneConstants;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JavaHighlighter extends JFrame {

	public static final Color DEFAULT\_KEYWORD\_COLOR = Color.blue;

	public static final String\[\] JAVA\_KEYWORDS = new String\[\] { "abstract",
			"assert", "boolean", "break", "byte", "case", "catch", "char",
			"class", "const", "continue", "default", "do", "double", "else",
			"enum", "extends", "final", "finally", "float", "for", "goto",
			"if", "implements", "import", "instanceof", "int", "long",
			"native", "new", "package", "private", "protected", "public",
			"return", "short", "static", "strictfp", "super", "switch",
			"synchronized", "this", "throw", "throws", "transient", "try",
			"void", "volatile", "while", "false", "null", "true" };
	public static String JAVA\_KEYWORDS\_REGEX;

	static {
		StringBuilder buff = new StringBuilder("");
		buff.append("(");
		for (String keyword : JAVA\_KEYWORDS) {
			buff.append("\\\\b").append(keyword).append("\\\\b").append("|");
		}
		buff.deleteCharAt(buff.length() - 1);
		buff.append(")");
		JAVA\_KEYWORDS\_REGEX = buff.toString();
	}

	private JPanel contentPane;
	private JToolBar toolBar;
	private JTextPane textEditor;
	private JScrollPane textEditorScrollPane;
	private JButton highLightBtn;
	private StyledDocument textEditorDoc;

	/\*\*
	 \* Launch the application.
	 \*/
	public static void main(String\[\] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					JavaHighlighter frame = new JavaHighlighter();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/\*\*
	 \* Create the frame.
	 \*/
	public JavaHighlighter() {
		setTitle("Java Syntax Highlighter");
		setDefaultCloseOperation(JFrame.EXIT\_ON\_CLOSE);
		setBounds(100, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		contentPane.setLayout(new BorderLayout(0, 0));
		setContentPane(contentPane);

		toolBar = new JToolBar();
		contentPane.add(toolBar, BorderLayout.NORTH);

		highLightBtn = new JButton("Highlight Syntax");
		highLightBtn.addActionListener(highLightBtnClick());
		toolBar.add(highLightBtn);

		textEditor = new JTextPane();
		textEditorDoc = textEditor.getStyledDocument();
		textEditor.getDocument().putProperty(
				DefaultEditorKit.EndOfLineStringProperty, "\\n");
		textEditorScrollPane = new JScrollPane(textEditor);
		textEditorScrollPane
				.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL\_SCROLLBAR\_ALWAYS);

		contentPane.add(textEditorScrollPane, BorderLayout.CENTER);
	}

	public ActionListener highLightBtnClick() {
		return new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				clearTextColors();
				Pattern pattern = Pattern.compile(JAVA\_KEYWORDS\_REGEX);
				System.out.println(pattern.pattern());
				Matcher match = pattern.matcher(textEditor.getText());
				while (match.find()) {
					updateTextColor(match.start(), match.end() - match.start());
				}

			}
		};
	}

	public void updateTextColor(int offset, int length, Color c) {
		StyleContext sc = StyleContext.getDefaultStyleContext();
		AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY,
				StyleConstants.Foreground, c);
		textEditorDoc.setCharacterAttributes(offset, length, aset, true);
	}

	public void clearTextColors() {
		updateTextColor(0, textEditor.getText().length(), Color.BLACK);
	}

	public void updateTextColor(int offset, int length) {
		updateTextColor(offset, length, DEFAULT\_KEYWORD\_COLOR);
	}
}
