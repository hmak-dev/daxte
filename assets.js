module.exports = {
    div(a, b) {
        return ~~(a / b);
    },
    mod(a, b) {
        return a - ~~(a / b) * b;
    },
};
