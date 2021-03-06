import type { ObjRec, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type Dissoc_2 = ((obj: ObjRec) => ObjRec) & ((obj?: PH) => Dissoc_2)

type Dissoc_1 = ((prop: string | number) => ObjRec) &
  ((prop?: PH) => Dissoc_1)

type Dissoc = ((prop: string | number, obj: ObjRec) => ObjRec) &
  ((prop: string | number, obj?: PH) => Dissoc_2) &
  ((prop: PH, obj: ObjRec) => Dissoc_1) &
  ((prop?: PH, obj?: PH) => Dissoc)

function _dissoc(prop: string | number, obj: ObjRec) {
  const result: ObjRec = {}

  for (let p in obj) result[p] = obj[p]

  delete result[prop]
  return result
}

/**
 * Makes a shallow clone of `obj`, deleting `props` from the new object.
 * All non-primitive properties are copied by reference.
 *
 *      Fae.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
export const dissoc: Dissoc = curryN(2, _dissoc)
