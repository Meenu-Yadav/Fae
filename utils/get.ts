import { Func } from "./types.ts"
import { FUNCTION_LENGTH } from "./constants.ts"
import { isTransformer } from "./is.ts"
import Transformer from "./Transformers/transformers.ts"

export function getIterator<T = any>(iterable: Iterable<T>) {
  return iterable[Symbol.iterator]()
}

export function getIterable<T = any>(iterator: Iterator<T>) {
  return {
    [Symbol.iterator]: () => iterator
  }
}

export function getFunctionLength(func: Func) {
  return func.length || func[FUNCTION_LENGTH]
}

export function getTransformer(func: Func | Transformer): Transformer {
  return isTransformer(func) ? func : new Transformer(func)
}
