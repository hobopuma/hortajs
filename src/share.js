import memoize from 'fast-memoize';

import { cond } from './functional.js';
import { isObj, map } from './collection.js';

// recursively use shared memory
const share = memoize(coll => cond(
    Array.isArray(coll), () => coll.map(v => share(v)),
    isObj(coll), () => map(coll, v => share(v)),
    coll
));

export { share };
