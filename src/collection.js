import { cond, seqn } from './functional.js';

// object / map

const isObj = v => v !== null && typeof v === 'object' && v.constructor === Object;

const { isArray } = Array;
const { keys } = Object;

const diff = (a, b) => cond(
  a === b, null,
  isArray(a) && isArray(b), (
    { aNotB, bNotA } = [...a, ...b].reduce((acc, v) => cond(
      a.contains(v) && b.contains(v), acc, // do nothing
      a.contains(v), () => seqn((acc.aNotB = [...acc.aNotB, v]), acc),
      b.contains(v), () => seqn((acc.bNotA = [...acc.bNotA, v]), acc)
    ), { aNotB: [], bNotA: [] })
  ) => cond(aNotB.length || bNotA.length, { aNotB, bNotA }),
  isObj(a) && isObj(b), (
    { aNotB, bNotA, abDiff } = [...Object.keys(a), ...keys(b)].reduce((acc, k) => cond(
      a[k] === b[k], acc,
      !(k in a), () => ({...acc.bNotA, [k]: b[k] }),
      !(k in b), () => ({...acc.aNotB, [k]: a[k] }),
      () => ({...acc.abDiff, [k]: diff(a[k], b[k]) })
    ), { aNotB: {}, bNotA: {}, abDiff: {} })
  ) => cond(keys(aNotB).length || keys(bNotA).length || keys(abDiff).length, { aNotB, bNotA, abDiff }),
  { a, b }
);

const compare = (k, ...ks) => (a, b) => cond(
  k, compare()(a[k], b[k]) || compare(...ks)(a, b),
  a < b, -1,
  a > b, 1,
  0
);


const byKeys = (...ks) => seqn((
  keysObj = Object.fromEntries(ks.map(k => [k, true]))
) => (v, k) => keysObj[k]);

const filter = (obj, f) => Object.entries(obj).reduce(
  (a, [k, v], i) => cond(f(v, k, i), (a[k] = v), a),
  {}
);

const map = (obj, f) => Object.entries(obj).reduce(
  (a, [k, v], i) => seqn((r = f(v, k, i)) => (a[k] = r), a),
  {}
);

// array / list

const first = ([f]) => f;
const rest = ([, ...r]) => r;
const last = ar => (isArray(ar) && ar.length ? ar[ar.length - 1] : undefined);

const groupby = (l, f) => l.reduce(
  (a, v, i) => seqn((k = f(v, i), ak = a[k]) => cond(ak, () => ak.push(v), () => (a[k] = [v])), a),
  {}
);

const repeat = (n, v) => Array(n).fill(v);

const range = (s, e) => seqn((
  offset = (e ? s : 0),
  len = (e ? s - e : s)
) => repeat(len).map((v, i) => i + offset));

const pad = (a, l, v) => cond(
  l <= a.length, a,
  (n = l - a.length) => a.concat(repeat(n, v))
);

export { isObj, diff, compare, byKeys, filter, map, first, rest, last, groupby, repeat, range, pad };
