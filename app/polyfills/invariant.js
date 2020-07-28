export default function invariant(condition, format, a, b, c, d, e, f) {
    if (!condition) {
        console.log("condition", condition);
        console.log("format", format);
        console.log("a", a);
        console.log("b", b);
        console.log("c", c);
        console.log("d", d);
        console.log("e", e);
        console.log("f", f);
    }
}