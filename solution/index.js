module.exports = function (Homework) {

    const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;

    return (array, fn, initialValue, cb) => {

        let i = 0
        let acc = initialValue
        let curr

        async function superCB(res){

            async function waitRes(p_res) {
                acc = await p_res
                array.get(i, getCurr)
            }

            async function increment(p_i) {
                i = await p_i
                waitRes(res)
            }

            async function isNotEnd(isLess) {
                if (await isLess) { add(i, 1, increment) }
                else { cb(acc) }
            }

            async function whatLen(arrLen) { less(i, await arrLen, isNotEnd)}

            array.length(whatLen)

        }

        async function getCurr(curr){
            fn(acc, await curr, i, array, superCB)
        }

        array.get(i, getCurr)
    }
}