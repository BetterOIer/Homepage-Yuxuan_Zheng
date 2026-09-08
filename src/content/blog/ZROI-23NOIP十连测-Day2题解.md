---
title: ZROI-23NOIP十连测-Day2题解
description: 'Notes on ZROI-23NOIP十连测-Day2题解.'
publishDate: '2023-09-03'
tags: ['题解']
---

# T1
有两个正整数$a \le b < 109$,给定$a \div b$的值(精确到小数点后19位), 要求还原$a,b$

$\Large{\textbf{Sol.}}$

70分和90分是留给写线性和用double的人的

100分先写结论：

把小数写成连分数的形式：$\dfrac{1}{a_1+\dfrac{2}{a_2+ \cdots}}$，暴力枚举每一层检验是否合法

考虑一个分数会被写成什么形式

$\dfrac{a}{b} = \dfrac{1}{\lfloor b/a \rfloor+ \dfrac{b \bmod a}{a}}$

这样类似gcd的递归下去
由于两个分数的差至少是$10^{-18}$而误差只有$10^{-19}$所以不会影响取整 归纳容易证明

# T3

定义一个数是好的，当且仅当能够找到三个正整数 $a,b,c$ 满足 $n=ab+ac+bc$ 且 满足 $n=xp^2$。

$\Large{\textbf{Sol.}}$

<!-- 当$p \le x$的时候，令$a = p, b = p(p-1),c = \dfrac{n-(p-1)p^2}{p^2}$

当$p-1=x$的时候，令$a=6,b=p-3,c=p^2-4p+6$,注意这里可能出现$b,c$为负数，所以要对$p \le 5$也就是$n \le 20$爆搜

当$p-1>x$的时候,$n = ab+bc+ac \Longleftrightarrow n+a^2 = (a+b)(a+c)$<br>
故我们需要找到某个正整数$a$，使得$n+a^2$可以分解为两个大于$a$的正整数之积即可<br>
$n+a^2 \bmod (x+1) = n+p^2 \bmod(x+1) = (x+1)p^2 mod (x+1) = 0$<br>
考虑$a = p mod (x+1),b = x+1 - a,c = \dfrac{n+a^2}{x+1}-a$
 -->

$$
n = ab+bc+ac \Longleftrightarrow n+a^2 = (a+b)(a+c)
$$

因为$a+b>a$且$a+c>a$

因此我们只需要找到某个正整数$a$,使得$n+a^2$可以分解为两个 正整数之积即可

考虑$x+1$是大于$p$的数的情况

因为 $n = xp^2$,~~显然~~我们可以让$a=p$

那么$n+a^2 = (x+1)p^2$

---

若$x+1$是合数(可以判掉，但没必要)：存在$s,t \ge 2$,使得$st=x+1$
$\Longrightarrow sp>p,tp>p$
$\Longrightarrow \begin{cases}a = p\\ b = (s-1)p\\c = (t-1)p\end{cases}$

---

若$x+1>p$：$(x+1)>p,p^2>p$
$\Longrightarrow \begin{cases}a = p\\b = x+1-p\\c = p^2-p\end{cases}$

---

接下来再来考虑$x+1$是不大于$p$的数的情况

若$x+1 = p$,那么$n = (p-1)p^2 = p^3-p^2$

利用{% label 瞪眼法 blue %}瞪出当$a = 6$的时候

$n+a^2 = p^3-p^2+36 = (p+3)(p^2-4p+12)$可以因式分解

所以我们需要使$p+3>6,b = p-3 >0$且$p$是质数,所以$p \ge 5$因此对于$p \le 3$即$n \le 18$的情况爆搜出答案(没有就是没有)

此时$p+3>6, p^2-4p+12=(p-2)^2+8>6$，所以取$\begin{cases}a = 6\\b = p-3\\c = p^2-4p+6\end{cases}$

---

若$x+1<p$，设$g = x+1$，那么$n = (g-1)p^2$

此时$\gcd(g,p)=1$

不妨设 $p = kg+r(1 \le r \le g-1)$

$\begin{aligned}n & = (g-1)(kg+r)^2 \\ & = (g-1)(k^2g^2+2krg+r^2) \\ & = k^2g^3+2krg^2+r^2g-k^2g^2-2krg-r^2\end{aligned}$

将$r^2$移到左边，即让$a=r$
$\Longrightarrow n+r^2 = g(k^2g^2+2krg+r^2-k^2g-2kr)$

- $g>r$
- $k^2g^2+2krg+r^2-k^2g-2kr = k^2g(g-1)+2kr(g-1)+r^2 > r^2 \ge r$

得到一组解为$\begin{cases}a = r\\b = g-r\\c = k^2g(g-1)+2kr(g-1)+r^2 - r\end{cases}$
即$\begin{cases}a = p \bmod (x+1)\\b = x+1-a\\c = \dfrac{xp^2+a^2}{x+1}-a\end{cases}$

#  T4

给定一个排列$p$.要求计算$p$的每个前缀的中位数.

$\Large{\textbf{Sol.}}$

开一个对顶堆，维护一下即可
