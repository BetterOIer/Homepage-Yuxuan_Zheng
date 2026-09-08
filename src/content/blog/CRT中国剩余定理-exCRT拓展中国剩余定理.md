---
title: CRT中国剩余定理-exCRT拓展中国剩余定理
description: 'Notes on CRT中国剩余定理-exCRT拓展中国剩余定理.'
publishDate: '2023-07-29'
tags: ['数学', '算法']
---

# 中国剩余定理

## 定义

中国剩余定理 (Chinese Remainder Theorem, CRT) 可求解如下形式的一元线性同余方程组（其中 $n_1, n_2, \cdots, n_k$ 两两互质）：

$$
\begin{cases}
x &\equiv a_1 \pmod {n_1} \\
x &\equiv a_2 \pmod {n_2} \\
  &\vdots \\
x &\equiv a_k \pmod {n_k} \\
\end{cases}
$$

## 过程

1.  计算所有模数的积 $n$；
2.  对于第 $i$ 个方程：
    1.  计算 $m_i=\frac{n}{n_i}$；
    2.  计算 $m_i$ 在模 $n_i$ 意义下的逆元  $m_i^{-1}$；
    3.  计算 $c_i=m_im_i^{-1}$（**不要对 $n_i$ 取模**）。
3.  方程组在模 $n$ 意义下的唯一解为：$x=\sum_{i=1}^k a_ic_i \pmod n$。


## 证明

我们需要证明上面算法计算所得的 $x$ 对于任意 $i=1,2,\cdots,k$ 满足 $x\equiv a_i \pmod {n_i}$。

当 $i\neq j$ 时，有 $m_j \equiv 0 \pmod {n_i}$，故 $c_j \equiv m_j \equiv 0 \pmod {n_i}$。
当 $i = j$ 时, 有 $c_i \equiv m_i \cdot (m_i^{-1} \bmod {n_i}) \equiv 1 \pmod {n_i}$，所以我们有：

$$
\begin{aligned}
x&\equiv \sum_{j=1}^k a_jc_j                      &\pmod {n_i} \\
 &\equiv a_ic_i                                   &\pmod {n_i} \\
 &\equiv a_i \cdot m_i \cdot (m^{-1}_i \bmod n_i) &\pmod {n_i} \\
 &\equiv a_i                                      &\pmod {n_i}
\end{aligned}
$$

**即对于任意 $i=1,2,\cdots,k$，上面算法得到的 $x$ 总是满足 $x\equiv a_i \pmod{n_i}$，即证明了解同余方程组的算法的正确性。**

因为我们没有对输入的 $a_i$ 作特殊限制，所以任何一组输入 $\{a_i\}$ 都对应一个解 $x$。

另外，若 $x\neq y$，则总存在 $i$ 使得 $x$ 和 $y$ 在模 $n_i$ 下不同余。

**故系数列表 $\{a_i\}$ 与解 $x$ 之间是一一映射关系，方程组总是有唯一解。**

## 实现

```cpp
int CRT(int a[], int n[]){
    int N=1, ans=0;
    for(int i =1;i<=n;i++) N*=n[i];//计算所有模数的乘积
    for(int i = 1;i<=n;i++){
        int c=N/n[i],x,y;
        exgcd(c,n[i],x,y);//exgcd求逆元 其中x即为逆元
        (ans+=(a[i]*c*x%N))%=N;
    }
    return (ans%N+N)%N;//映射到范围内的最小整数
}
```



----

# 拓展中国剩余定理

## 定义

拓展中国剩余定理可求解如下形式的一元线性同余方程组（其中 $n_1, n_2, \cdots, n_k$ **不一定两两互质**）：

$$
\begin{cases}
x &\equiv a_1 \pmod {n_1} \\
x &\equiv a_2 \pmod {n_2} \\
  &\vdots \\
x &\equiv a_k \pmod {n_k} \\
\end{cases}
$$

此时CRT已不可行

其构造解 $x = \sum_{i=1}^{n}r_ic_ic_i^{-1} \pmod {M}$  
其中$c_ix \equiv 1 \pmod {m_i}$, 即$c_ix+ m_iy=1=\gcd(c_i,mi)$
根据裴蜀定理，$c_i,m_i$应该互质，$c_i = \frac{m_i \times \cdots \times m_n}{m_i}$  
如果$c_i,m_i$不互质，则$c_i^{-1}$不存在，算法无效

## 过程

1. 前两个方程：$x \equiv r_1 \pmod {m_i}, \ x \equiv r_2 \pmod {m_2}$  
   转化为不定方程：$x=m_1p+r_1=m_2q+r_2$,  
   则$m_1p-m_2q=r_2-r_1$
2. 由裴蜀定理，  
   当$\gcd(m_1,m_2) \nmid (r_1-r_2)$时，无解
   当$\gcd(m_1,m_2) \mid (r_1-r_2)$时，有解  
   可以通过扩展欧几里得算法解出来一组可行解 $(p, q)$；
3. 则原来的两方程组成的模方程组的解
   $x\equiv b\pmod M$，其中 $b=m_1p+a_1$，$M=\text{lcm}(m_1, m_2)$。
4. 多个方程按照$1$至$3$合并即可，$n$个方程合并$n-1$次。

## 实现

```cpp
long long mul(long long a,long long b,long long mod)
{
    long long c=a*b-(long long)((long double)a*b/mod+0.5)*mod;
    return c<0?c+mod:c;
}//有些情况下会暴longlong 用龟速乘解决一下
long long exCRT(){
    for(long long i = 2,x,y;i<=n;i++){
        long long d=exgcd(m[i-1],m[i],x,y);
        if((r[i]-r[i-1])%d!=0)return -1;
        x=mul(x,((r[i]-r[i-1])/d),(m[i]/d));
        x=(x%(m[i]/d)+m[i]/d)%(m[i]/d);
        r[i]=m[i-1]*x+r[i-1];
        m[i]=m[i-1]*m[i]/d;
    }
    return (r[n]%m[n]+m[n])%m[n];//区范围内最小正值
}
```
