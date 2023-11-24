let h = (x) => {
    if (x == 0) return 0.5;
    else if (x > 0) return 1
    else return 0;
}
let sq = (x, L) => { return 2 * (h(x / L) - h(x / L - 1)) - 1; }

let r = [];
const L = 10;
for (let i = 0; i <= 2 * L + 5; i += 0.5) {
    let v = sq(i, L);
    if (v === 0) console.log(i);
    r.push(sq(i, L));
}
console.log(r);