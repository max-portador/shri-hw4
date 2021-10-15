module.exports = function (Homework) {

    const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;

    return async (array, fn, initialValue, cb) => {

        let i = 0
        let acc = initialValue
        let curr

        async function superCB(res){

            async function waitRes(p_res) {
                acc = await p_res
                asyncArray.get(i, getCurr)
            }

            async function increment(p_inc) {
                i = await p_inc
                waitRes(res)
            }

            async function isNotEnd(p_isLess) {
                const isLess = await p_isLess
                if (isLess) {
                    add(i, 1, increment)
                } else {
                    cb(acc)
                }
            }

            async function whatLen(arrLen) {
                const len = await arrLen
                less(i, len, isNotEnd)
            }

            asyncArray.length(whatLen)

        }

        async function getCurr(p_curr){
            curr = await p_curr
            fn(acc, curr, i, asyncArray, superCB)
        }

        asyncArray.get(i, getCurr)
    }
}