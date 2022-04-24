// console.log('hello range!');

// flow(add10, double, toString)(1) // 两者相等
interface Type_flow {
    <TResult extends Function>(...funcs: Function[]): TResult;
}  

// export const toString = function(str: string) {
//     return function() {
//         console.log(str)
//         return str
//     }
// }

// export const formater = function(bc: string) {
//     return function(str: any) {
//         bc = str + bc
//         return bc
//     }
// }

export const rg_flow: Type_flow = function(...funcs) {
    console.log(funcs)
    const length = funcs.length
    let index = length
    let result

    while(index--) {
        if(typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function')
        }
    }
    let num = length - 1

    if(length) {
        result = funcs[num]()

        while(num--) {
            result = funcs[num](result)
        }
    }
    return result
}
