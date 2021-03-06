import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Prepend_2<T> = ((list: T[]) => T[]) &
  ((list?: PH) => Prepend_2<T>)

type Prepend_1<T> = ((el: T) => T[]) & ((el?: PH) => Prepend_1<T>)

type Prepend = (<T>(el: T, list: T[]) => T[]) &
  (<T>(el: T, list?: PH) => Prepend_2<T>) &
  (<T>(el: PH, list: T[]) => Prepend_1<T>) &
  ((el?: PH, list?: PH) => Prepend)

function _prepend<T>(el: T, list: T[]) {
  return [el, ...list]
}

/**
 * Add the `el` to the start of `list` and returns new list without affecting original
 *
 *
 *      Fae.prepend('tests', ['write', 'more']); //=> [''tests', ''write', 'more']
 *      Fae.prepend('tests', []); //=> ['tests']
 *      Fae.prepend(['tests'], ['write', 'more']); //=> [['tests'], 'write', 'more']
 */
export const prepend: Prepend = curryN(2, _prepend)
