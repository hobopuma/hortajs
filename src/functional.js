
// sequencing - see progn in http://www.cs.cmu.edu/~ggordon/lisp-hints.txt
// see also: https://stackoverflow.com/questions/51407631/how-to-simulate-let-expressions-in-javascript

const seqn = (...fs) => fs.reduce((a, f) => (typeof f === 'function' ? f() : f), null);

// conditionals

const cond = (...cs) => seqn((
  [t, a, ...rest] = cs,
  r = (typeof t === 'function' ? t() : t)
) => (
  cs.length < 2 ? r : (r ? cond(a) : cond(...rest))
));

const when = (t, ...fs) => cond(t, () => seqn(...fs));

export { seqn, cond, when };
