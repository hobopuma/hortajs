import { seqn, cond } from './functional.js';
import { isObj, map } from './collection.js';

// recursively use shared memory
const share = seqn((
  cache = {}
) => coll => seqn(
  (key = JSON.stringify(coll)) => cond(
    key in cache, cache[key],
    (res = cond(
      Array.isArray(coll), () => coll.map(v => share(v)),
      isObj(coll), () => map(coll, v => share(v)),
      coll
    )) => seqn(cache[key] = res,  res)
  )
));

export { share };
