---
title: Competition-2022/7/30
description: 'Notes on Competition-2022/7/30.'
publishDate: '2022-07-31'
tags: ['题解']
---

# T1

### 题目描述

小明有一个正整数$n$，小明把它用汉字写出来。 但是小明比较笨，不会写正整数格式，只会把每一位写成汉字。
<!-- more -->
比如说，小明会把$324$写成“三二四”，而不是“三百二十四”。

接下来，小明比较无聊，他会数出他写出的这些字的笔画总数，作为新的$n$，然后重新开始这个过程。

现在已经知道小明一开始的正整数$n$，并且已知他会把这个过程进行$n$次。请你求出他第$k$次写下的所有字的笔画数，以帮助小明验证自己的答案。

### 输入格式

第一行一个正整数$T$，表示数据组数。

接下来$T$行，每行两个正整数$n,k$。

### 输出格式

$T$行，每行一个正整数，表示答案。

### 输入输出样例
#### 输入 #1
```
4
234 2
102 3
111 2
394 1
```
#### 输出 #1
```
14
4
3
10
```
#### 输入 #2
```
9
1 1
2 1
3 1
4 1
5 1
6 1
7 1
8 1
9 1
```
#### 输出 #2
```
1
2
3
5
4
4
2
2
2
```
### 说明/提示
样例 #1 解释如下：

对第一组数据，小明第一次会写下“二三四”，共 10 画；第二次会写下“一零”，共 14 画（“零”有 13 画）。  
对第二组数据，小明第一次会写下“一零二”，共 16 画；第二次会写下“一六“，共 5 画；第三次会写下“五”，共四画。  
对第三组数据，小明第一次会写下“一一一”，共 3 画；第二次会写下“三”，共 3 画。  
对第四组数据，小明第一次会写下“三九四”，共 10 画。  

样例 #2 提供了 1…9 的每个数的汉字笔画数。而“零”共有 13 画。

### 数据范围
对 30% 的数据，$n \leq 1000, k \leq 2$。

对 70% 的数据，$n \leq 10^9, k \leq 1000$。

对 100% 的数据，$n \leq 10^{18}, k \leq 10^9, T \leq 500$。

### $AC$ $Code$
{% codeblock "T1.cpp" lang:cpp >folded %}
#include <algorithm>
#include <cstdio>
#include <cstring>

typedef long long LL;

const int a[10] = { 13, 1, 2, 3, 5, 4, 4, 2, 2, 2 };

LL f(LL n) { if (n) return a[n % 10] + f(n / 10); else return 0; }

int main() {
  int T;
  scanf("%d", &T);
  while (T--) {
    LL n; int k;
    scanf("%lld%d", &n, &k);
    while (k) {
      n = f(n); k--;
      if (1 <= n && n <= 3) break;
      if (n == 4 || n == 5) {
        if (k & 1) n ^= 1;
        break;
      }
    }
    printf("%lld\n", n);
  }
  return 0;
}
{% endcodeblock %}
---
# T2
### 题目描述
小北写了一份 `thoypn` 语言代码。

`thoypn` 语言代码里只有两种语句：输出语句和循环语句。

而且 `thoypn` 语言类似 `python` 语言，用缩进来决定语法：

1. 每一行只能写一条语句。
2. 如果某条循环语句前面有 n 个 tab 的缩进，那么他后面至少一行要有大于等于 n + 1 个 tab 的缩进，这些行就是这条循环语句的循环体。而且他后面一行必须恰好有 n + 1个 tab 的缩进，不能多不能少。
3. 不能凭空出现缩进，也就是说输出语句后面不能增加缩进。程序的第一行也必须不缩进。
由于小北水平不行，他总是忘记加缩进。

华华想知道，通过给这份代码添加缩进，可以得到多少种不同的合法 `thoypn` 程序？

### 输入格式
第一行一个正整数 T，表示数据组数。

接下来每组数据中：

第一行一个正整数 n， 表示小北写的数据组数；

第二行一个长为 n、仅包含 F 和 P 的字符串 s。 如果 s 中第 i 个字符是 F，表示小北写的代码中第 i 行有一条循环语句；反之表示小北写的代码中第 i 行有一条输出语句。  

### 输出格式
对每组数据，输出一行一个正整数，表示答案。由于答案可能很大，你只需要输出对$10^9+7$取模得到的结果

### 输入输出样例

#### 输入

```
3
4
FFFP
4
FPFP
4
FPPP
```
#### 输出
```
1
2
3
```
### 说明/提示
对第一组数据，只有
```python
for
  for
    for
      print
```
这一种方案。

对第二组数据，有
```python
for
  print
  for
    print
```
和
```python
for
  print
for
  print
```
两种方案。

对第三组数据，循环语句可能包含 1 或者 2 或者 3 条输出语句，因此有三种方案。

### 数据范围

对 30% 的数据，$n \leq 10$。

对 50% 的数据，$n \leq 100$。

另有 20% 的数据，至多有 1010 个 F。

对 100% 的数据，$T \leq 5, n \leq 1000$。

### $AC$ $Code$
{% codeblock "T2.cpp" lang:cpp >folded %}
#include <algorithm>
#include <cstdio>

const int N = 1050;
const int mod = 1000000007;

char s[N];
int f[N];

int main() {
  int T;
  scanf("%d", &T);
  while (T--) {
    int n;
    scanf("%d%s", &n, s);
    f[0] = 1;
    int k = 0;
    for (int i = 0; i < n - 1; ++i)
      if (s[i] == 'F') {
        for (int j = ++k; j > 0; --j) f[j] = f[j - 1];
        f[0] = 0;
      } else {
        for (int j = k, t = 0; j >= 0; --j)
          f[j] = t = (t + f[j]) % mod;
      }
    int ans = 0;
    for (int j = 0; j <= k; ++j) ans = (ans + f[j]) % mod;
    printf("%d\n", s[n - 1] == 'P' ? ans : 0);
  }
  return 0;
}
{% endcodeblock %}

---

# T3

### 题目描述

在很久很久以前，有一个王国。王国的国王手下有一些骑士。

我们把骑士们编号为骑士 1，骑士 2，...，骑士$n$。他们每次都是按照这个顺序出行，因此只有相邻的骑士（即骑士$i$和骑士$i+1$）之间才会认识。

某天国王需要他们做一件任务。为了做这件任务，骑士们需要分为若干队伍；每个队伍要么只有一名骑士，要么有两名互相认识的骑士（即相邻的骑士）。

每名骑士被评定了一个能力值。如果一个队伍只有一名骑士，那么队伍能力值就是这名骑士的能力值；如果队伍里有两名骑士，那么队伍能力值就是这两名骑士的能力值的和。

为了尽可能完成任务，国王需要队伍能力值的极差最小。 即设$A$是所有队伍能力值的最小值$B$是队伍能力值的最大值，则国王需要最小化$B-A$。请你计算出这个最小值。

### 输入格式

第一行一个正整数$n$，表示骑士的数量。

第二行$n$个正整数$a_1, \dots, a_n$，其中$a_i$表示第$i$名骑士的能力值。

### 输出格式
一行一个正整数，表示答案。

### 输入输出样例
#### 输入 #1
```
4
1 2 3 4
```
#### 输出 #1
```
1
```
#### 输入 #2
```
10
8 6 3 4 9 2 7 2 9 3
```
#### 输出 #2
```
6
```

### 说明/提示
样例解释：

对样例 1，可以把骑士$1, 2$划分为一队，骑士$3$和骑士$4$各自分为一队。

对样例 2，可以$8, 6, [3, 4], [9, 2], [7, 2], [9, 3]$这样分组（方括号括起来的表示分在同一组），队伍能力值分别为$8, 6, 7, 11, 9, 12$，最大值减最小值为$12 - 6 = 6$。

### 数据范围
对 10% 的数据，$n \leq 5$。

对 20% 的数据，$n \leq 25$。

对 40% 的数据，$n \leq 100$。

对 60% 的数据，$n \leq 1000$。

对 100% 的数据，$3 \leq n \leq 10^5, 1 \leq a_i \leq 10^9$。

### $AC$ $Code$
{% codeblock "T3.cpp" lang:cpp >folded %}
#include <algorithm>
#include <cstdio>

const int N = 100050;

struct Msg {
  bool f[2][2];
  Msg() {}

  Msg(bool a) {
    f[0][0] = a;
    f[0][1] = f[1][0] = true;
    f[1][1] = false;
  }

  friend Msg Merge(const Msg &l, const Msg &r, bool b) {
    Msg ans;
    for (int i = 0; i < 2; ++i)
      for (int j = 0; j < 2; ++j)
        ans.f[i][j] = (l.f[i][0] && r.f[0][j]) || (l.f[i][1] && r.f[1][j] && b);
    return ans;
  }
} msgv[N * 4];

bool A[N], B[N];

inline void upd(int o, int l, int r) {
  if (l == r) msgv[o] = Msg(A[l]);
  else {
    int mid = (l + r) / 2;
    msgv[o] = Merge(msgv[o << 1], msgv[o << 1 | 1], B[mid]);
  }
}

void Build(int o, int l, int r) {
  if (l == r) A[l] = false;
  else {
    int mid = (l + r) / 2;
    B[mid] = false;
    Build(o << 1, l, mid);
    Build(o << 1 | 1, mid + 1, r);
  }
  upd(o, l, r);
}

void ModifyA(int o, int l, int r, int x, bool a) {
  if (l > x || r < x) return;
  if (l == r) A[l] = a;
  else {
    int mid = (l + r) / 2;
    ModifyA(o << 1, l, mid, x, a);
    ModifyA(o << 1 | 1, mid + 1, r, x, a);
  }
  upd(o, l, r);
}

void ModifyB(int o, int l, int r, int x, bool b) {
  if (l > x || r <= x) return;
  int mid = (l + r) / 2;
  ModifyB(o << 1, l, mid, x, b);
  ModifyB(o << 1 | 1, mid + 1, r, x, b);
  if (mid == x) B[mid] = b;
  upd(o, l, r);
}

int n, V[N];

struct Team {
  int ty, i, v; // 0 : A, 1 : B
  Team() {}
  Team(int ty, int i) : ty(ty), i(i) { v = V[i] + ty * V[i + 1]; }
  bool operator<(const Team &r) const { return v < r.v; }
} T[N * 2];

int main() {
  scanf("%d", &n);
  for (int i = 1; i <= n; ++i) scanf("%d", &V[i]);
  int m = 0;
  for (int i = 1; i <= n; ++i) T[m++] = Team(0, i);
  for (int i = 1; i < n; ++i) T[m++] = Team(1, i);
  Build(1, 1, n);
  std::sort(T, T + m);
  int ans = 0x7fffffff;
  for (int i = 0, j = 0; i < m; ++i) {
    while (!msgv[1].f[0][0] && j < m) {
      (T[j].ty ? ModifyB : ModifyA)(1, 1, n, T[j].i, true);
      ++j;
    }
    if (!msgv[1].f[0][0]) break;
    if (T[j - 1].v - T[i].v < ans)
      ans = T[j - 1].v - T[i].v;
    (T[i].ty ? ModifyB : ModifyA)(1, 1, n, T[i].i, false);
  }
  printf("%d\n", ans);
}

{% endcodeblock %}

---

# T4
### 题目描述
猫猫（这是一个人名）想要去魔法王国旅游。

魔法王国有$n$座城市。

由于魔法王国的人会传送，他们懒得修道路，只建了$n-1$条道路供旅行者通行。每条道路连接两座城市，并且这$n-1$条道路恰好把$n$座城市都连了起来。

猫猫在旅行前给每座城市评定了一个“魅力值”。她想要多逛一些城市，让自己经过的城市的魅力值总和最大。（即使她多次经过同一座城市，也不会重复计算魅力值）

但是魔法王国由于某些原因，不允许旅行者通过同一座城经过$k$次，因此猫猫不一定能把所有城市全部经过一遍。 （每进入一次城市就算经过一次，不允许路过城市而不进去）

请你帮猫猫规划路线，并输出最大的魅力值总和。

猫猫会从$1$号城市进入魔法王国；首次进入也算一次经过。并且由于魔法王国所有城市中都提供传送到王国外的服务，她不需要最后回到$1$号城市。

### 输入格式
第一行两个正整数$n, k$，表示城市数量，每座城市能经过的次数。

第二行$n$个正整数$a_1, \dots, a_n$，其中  $a_k$表示第$k$座城市的魅力值。

接下来$n-1$行，每行两个正整数$x$和$y$，表示存在一条连接第$x$座城市和第$y$座城市的道路。

保证这$n-1$条道路一定能把$n$座城市都连接起来。

### 输出格式
一行一个正整数，表示经过城市的魅力值总和的最大值。

### 输入输出样例
#### 输入 #1
```
10 1
5 6 6 4 7 3 9 9 3 9
1 3
2 10
2 3
1 8
1 7
5 2
6 2
3 9
2 4
```
#### 输出 #1
```
26
```
#### 输入 #2
```
10 2
5 6 6 4 7 3 9 9 3 9
1 3
2 10
2 3
1 8
1 7
5 2
6 2
3 9
2 4
```
#### 输出 #2
```
45
```
#### 输入 #3
```
30 3
3 88 109 39 83 8 152 172 176 41 151 29 149 151 189 147 125 50 184 117 115 40 195 102 107 176 188 43 67 15
1 4
1 10
1 21
1 27
1 3
2 29
3 6
3 25
3 28
3 5
5 24
7 26
8 30
9 14
9 30
11 15
11 17
11 30
12 16
12 18
13 24
16 19
16 20
16 23
16 26
16 30
18 24
22 28
29 30
```
#### 输出 #3
```
2667
```

### 说明/提示
在样例 1 中，可以沿$1, 3, 2, 10$这样的路线走，可以获得$1, 2, 3, 10$四个城市的魅力值，一共为$5 + 6 + 6 + 9 = 26$。

在样例 2 中，可以沿$1, 8, 1, 3, 9, 3, 2, 5, 2, 10$这样的路线走，可以获得$1, 2, 3, 5, 8, 9, 10$七个城市的魅力值，一共为$5 + 6 + 6 + 7 + 9 + 3 + 9 = 45$。

### 数据范围
|数据占比|n 的范围|k 的范围|
|-------|--------|-------|
|10%|$n \leq 10$|$k \leq 10$|
|20%|$n \leq 10^5$|$k = 1$|
|20%|$n \leq 10^5$|$k = 2$|
|20%|$n \leq 1000$|$k \leq 10^5$|
|30%|$n \leq 10^54$|$k \leq 10^5$|

对所有数据$a_n \leq 2000$。

### $AC$ $Code$
{% codeblock "T4.cpp" lang:cpp >folded %}
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <vector>

const int N = 100050;
std::vector<int> T[N];

int n, A[N], f[N], g[N], k;

inline bool cmp(int x, int y) { return f[x] > f[y]; }

void dfs(int x, int fa) {
  for (int y : T[x]) if (y != fa) dfs(y, x);
  std::sort(T[x].begin(), T[x].end(), cmp);
  if (fa) T[x].pop_back();
  int l = T[x].size(), S = 0, u = 0;
  for (int i = 0; i < k - 1 && i < l; ++i) S += f[T[x][i]];
  f[x] = S + A[x]; g[x] = 0;
  if (k - 1 < l) u = f[T[x][k - 1]];
  for (int i = 0; i < k - 1 && i < l; ++i)
    g[x] = std::max(g[x], S - f[T[x][i]] + g[T[x][i]] + u);
  for (int i = k - 1; i < l; ++i)
    g[x] = std::max(g[x], S + g[T[x][i]]);
  g[x] += A[x];
}

int main() {
  scanf("%d%d", &n, &k);
  for (int i = 1; i <= n; ++i) scanf("%d", &A[i]);
  for (int i = 1, x, y; i < n; ++i) {
    scanf("%d%d", &x, &y);
    T[x].push_back(y); T[y].push_back(x);
  }
  dfs(1, 0);
  printf("%d\n", std::max(f[1], g[1]));
  return 0;
}
{% endcodeblock %}
