/**
 * @param {number[]} guess
 * @param {number[]} answer
 * @return {number}
 */
var game = function (guess, answer) {
    let ans = 0;
    for (let i = 0; i < 3; ++i) {
        if (guess[i] === answer[i]) {
            ++ans;
        }
    }
    return ans;
};
