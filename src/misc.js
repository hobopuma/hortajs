
// logical

const or = (...fs) => (...ar) => fs.some(f => f(...ar));
const and = (...fs) => (...ar) => fs.every(f => f(...ar));
const not = f => (...ar) => !f(...ar);

export { or, and, not };
