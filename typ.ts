import slice from "./slice.ts"
import { AllTypes } from "./utils/types.ts"

/** Gives a single-word string description of the (native) type of a value.
 * The returned types are of type `AllTypes`
 * @function
 * 
 *      Fae.typ({}); //=> "Object"
 *      Fae.typ(1); //=> "Number"
 *      Fae.typ(false); //=> "Boolean"
 *      Fae.typ('s'); //=> "String"
 *      Fae.typ(null); //=> "Null"
 *      Fae.typ([]); //=> "Array"
 *      Fae.typ(/[A-z]/); //=> "RegExp"
 *      Fae.typ(() => {}); //=> "Function"
 *      Fae.typ(undefined); //=> "Undefined"
*/
export default function type(a: any): AllTypes {
  if(a === null) return 'Null'
  if(a === undefined) return 'Undefined'
  return slice(8, -1, Object.prototype.toString.call(a)) as unknown as AllTypes
}
