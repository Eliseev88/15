const generateArray = (num, add) => {
    // num - how many elements should moved
    console.log(num, add)
    const puzzle = [...Array(num)].map((_, i) => i + add);
    puzzle.push(0);
    return puzzle;
};

function repeat(num, cb) {
    for (let i = num; i > 0; i--) {
        cb();
    }
}

export { generateArray, repeat }
