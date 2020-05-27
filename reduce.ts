import { isArrayLike, isIterable, isIterator } from "./utils/is.ts"
import { getIterator, getTransformer } from "./utils/get.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3, Func, FunctorWithArLk } from "./utils/types.ts"
import Transformer, { ReducedTransformer } from "./utils/Transformers/transformers.ts"

function _arrayReduce<T, R = T>(trans: Transformer, acc: R, list: ArrayLike<T>) {
  for(let i = 0, l = list.length; i < l; i++) {
    acc = trans.step(acc, list[i])
    if(acc && acc instanceof ReducedTransformer) {
      acc = acc.value
      break
    }
  }
  return trans.result(acc)
}

function _iterableReduce<T, R = T>(trans: Transformer, acc: R, it: Iterator<T>) {
  let step = it.next()
  while(!step.done) {
    acc = trans.step(acc, step.value)
    if(acc && acc instanceof ReducedTransformer) {
      acc = acc.value
      break
    }
    step = it.next()
  }
  return trans.result(acc)
}

function reduce<T, R = T>(func: Func | Transformer, acc: R, list: FunctorWithArLk<T>) {
  let trans = getTransformer(func)
  if(isArrayLike(list)) return _arrayReduce(trans, acc, list)
  if(isIterable(list)) return _iterableReduce(trans, acc, getIterator<T>(list))
  if(isIterator(list)) return _iterableReduce(trans, acc, list)
}

export default curryN<typeof reduce>(3, reduce) as Curry3<Func | Transformer, any, FunctorWithArLk, any>
