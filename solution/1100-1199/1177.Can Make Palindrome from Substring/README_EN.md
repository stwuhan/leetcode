# [1177. Can Make Palindrome from Substring](https://leetcode.com/problems/can-make-palindrome-from-substring)

[中文文档](/solution/1100-1199/1177.Can%20Make%20Palindrome%20from%20Substring/README.md)

## Description

<p>You are given a string <code>s</code> and array <code>queries</code> where <code>queries[i] = [left<sub>i</sub>, right<sub>i</sub>, k<sub>i</sub>]</code>. We may rearrange the substring <code>s[left<sub>i</sub>...right<sub>i</sub>]</code> for each query and then choose up to <code>k<sub>i</sub></code> of them to replace with any lowercase English letter.</p>

<p>If the substring is possible to be a palindrome string after the operations above, the result of the query is <code>true</code>. Otherwise, the result is <code>false</code>.</p>

<p>Return a boolean array <code>answer</code> where <code>answer[i]</code> is the result of the <code>i<sup>th</sup></code> query <code>queries[i]</code>.</p>

<p>Note that each letter is counted individually for replacement, so if, for example <code>s[left<sub>i</sub>...right<sub>i</sub>] = &quot;aaa&quot;</code>, and <code>k<sub>i</sub> = 2</code>, we can only replace two of the letters. Also, note that no query modifies the initial string <code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example :</strong></p>

<pre>
<strong>Input:</strong> s = &quot;abcda&quot;, queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
<strong>Output:</strong> [true,false,false,true,true]
<strong>Explanation:</strong>
queries[0]: substring = &quot;d&quot;, is palidrome.
queries[1]: substring = &quot;bc&quot;, is not palidrome.
queries[2]: substring = &quot;abcd&quot;, is not palidrome after replacing only 1 character.
queries[3]: substring = &quot;abcd&quot;, could be changed to &quot;abba&quot; which is palidrome. Also this can be changed to &quot;baab&quot; first rearrange it &quot;bacd&quot; then replace &quot;cd&quot; with &quot;ab&quot;.
queries[4]: substring = &quot;abcda&quot;, could be changed to &quot;abcba&quot; which is palidrome.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;lyb&quot;, queries = [[0,1,0],[2,2,1]]
<strong>Output:</strong> [false,true]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length, queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= left<sub>i</sub> &lt;= right<sub>i</sub> &lt; s.length</code></li>
	<li><code>0 &lt;= k<sub>i</sub> &lt;= s.length</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>

## Solutions

<!-- tabs:start -->

### **Python3**

```python
class Solution:
    def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
        n = len(s)
        ss = [[0] * 26 for _ in range(n + 1)]
        for i, c in enumerate(s, 1):
            ss[i] = ss[i - 1][:]
            ss[i][ord(c) - ord("a")] += 1
        ans = []
        for l, r, k in queries:
            cnt = sum((ss[r + 1][j] - ss[l][j]) & 1 for j in range(26))
            ans.append(cnt // 2 <= k)
        return ans
```

### **Java**

```java
class Solution {
    public List<Boolean> canMakePaliQueries(String s, int[][] queries) {
        int n = s.length();
        int[][] ss = new int[n + 1][26];
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < 26; ++j) {
                ss[i][j] = ss[i - 1][j];
            }
            ss[i][s.charAt(i - 1) - 'a']++;
        }
        List<Boolean> ans = new ArrayList<>();
        for (var q : queries) {
            int l = q[0], r = q[1], k = q[2];
            int x = 0;
            for (int j = 0; j < 26; ++j) {
                x += (ss[r + 1][j] - ss[l][j]) & 1;
            }
            ans.add(x / 2 <= k);
        }
        return ans;
    }
}
```

### **C++**

```cpp
class Solution {
public:
    vector<bool> canMakePaliQueries(string s, vector<vector<int>>& queries) {
        int n = s.size();
        int ss[n + 1][26];
        memset(ss, 0, sizeof(ss));
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < 26; ++j) {
                ss[i][j] = ss[i - 1][j];
            }
            ss[i][s[i - 1] - 'a']++;
        }
        vector<bool> ans;
        for (auto& q : queries) {
            int l = q[0], r = q[1], k = q[2];
            int x = 0;
            for (int j = 0; j < 26; ++j) {
                x += (ss[r + 1][j] - ss[l][j]) & 1;
            }
            ans.emplace_back(x / 2 <= k);
        }
        return ans;
    }
};
```

### **Go**

```go
func canMakePaliQueries(s string, queries [][]int) (ans []bool) {
	n := len(s)
	ss := make([][26]int, n+1)
	for i := 1; i <= n; i++ {
		for j := 0; j < 26; j++ {
			ss[i][j] = ss[i-1][j]
		}
		ss[i][s[i-1]-'a']++
	}
	for _, q := range queries {
		l, r, k := q[0], q[1], q[2]
		x := 0
		for j := 0; j < 26; j++ {
			x += (ss[r+1][j] - ss[l][j]) & 1
		}
		ans = append(ans, x/2 <= k)
	}
	return
}
```

### **TypeScript**

```ts
function canMakePaliQueries(s: string, queries: number[][]): boolean[] {
    const n = s.length;
    const ss: number[][] = Array(n + 1)
        .fill(0)
        .map(() => Array(26).fill(0));
    for (let i = 1; i <= n; ++i) {
        ss[i] = ss[i - 1].slice();
        ++ss[i][s.charCodeAt(i - 1) - 97];
    }
    const ans: boolean[] = [];
    for (const [l, r, k] of queries) {
        let x = 0;
        for (let j = 0; j < 26; ++j) {
            x += (ss[r + 1][j] - ss[l][j]) & 1;
        }
        ans.push(x >> 1 <= k);
    }
    return ans;
}
```

### **...**

```

```

<!-- tabs:end -->
