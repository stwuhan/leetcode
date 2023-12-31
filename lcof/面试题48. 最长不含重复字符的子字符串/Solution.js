/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let ans = 0;
    const vis = new Set();
    for (let i = 0, j = 0; i < s.length; ++i) {
        while (vis.has(s[i])) {
            vis.delete(s[j++]);
        }
        vis.add(s[i]);
        ans = Math.max(ans, i - j + 1);
    }
    return ans;
};
