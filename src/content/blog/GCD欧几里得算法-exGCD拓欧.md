---
title: GCD欧几里得算法&exGCD拓欧
description: 'Notes on GCD欧几里得算法&exGCD拓欧.'
publishDate: '2022-08-30'
tags: ['数学', '算法']
---

## 定义
$GCD$即**最大公约数**,
若$a_1,a_2,a_3$的最大公约数为$x$,则记为：
<!-- more -->
$
x=GCD(a_1,a_2,a_3)=(a_1,a_2,a_3);
$ 
$LCM$即**最小公倍数**,
若$a_1,a_2,a_3$的最小公倍数为$x$,则记为：
$
x=LCM(a_1,a_2,a_3)=(a_1,a_2,a_3);
$
$exGCD$即**拓展欧几里得定理**,用来在已知$(a,b)$时,求解一组$(p,
q)$,使得$p*a+q*b=GCD(a,b)$。

## 性质
1. $a,b$两个数的最大公约数乘以它们的最小公倍数就等于$a$和$b$本身的乘积。  
   证明：  
    设$d=gcd(a,b),ao=a/d,bo=b/d$。根据最大公约数的定义,有$gcd(ao,bo)=1$。再根据最小公倍数的定义,有$lcm(ao,bo)$=$ao*b0$于是$lcm(a,b)=lcm(ao*d,bo*d)=lcm(ao,bo)*d=ao*bo*d=a*b/d$。证毕。

## 求解

### $GCD$
1. 辗转相除法
    用来求两个数的最大公约数,又称欧几里得算法,  
    其原理就是：$GCD(x,y)=GCD(x,y-x)$。  
    原理的证明如下：
    设$z|x,z|y$,则$z|(y-x)$。
    设$z$不是$x$的因子,则$z$不是$x,y-x$的公因子。
    设$z|x,z$不是$y$的因子,则$z$不是$x,y-x$的公因子。
    代码实现如下：
    ```cpp
    int GCD(int x,int y){
        return y==0? x:GCD(y,x%y);
    }
    //或者下面这个
    int GCD(int x,int y){
        while(y^=x^=y^=x%=y);return x;
    }
    ```
    使用欧几里得算法求最大公约数的复杂度为$O(\log(a+b))$。欧几里得算法是最常用的求最大公约数的方法。不过,因为高精度除法(取模)不容易实现,需要做高精度运算时,可考虑用更相减损术代替欧几里得算法。

2. 更相减损术  
    $\forall a,b \in N,a \geq b$,有$gcd(a,b)=gcd(b,a-b)=gcd(a,a-b)$  
    $\forall a,b \in N,gcd(2a,2b)=2gcd(a,b)$
    证明：  
        根据最大公约数的定义,后者显然成立,我们主要证明前者。对于$a,b$的任意公约数$d$,因为$d|a,d|b$,所以$d|(a-b)$。因此$d$也是$b,a-b$的公约数。反之亦成立。故$a,b$的公约数集合与$b,a一b$的公约数集合相同。于是它们的最大公约数自然也相等。对于$a,a-b$同理。  
    证毕。

### $exGCD$
扩展欧几里德算法是用来在已知$(a,b)$时,求解一组$(p,q)$,使得$p*a+q*b=GCD(a,b)$。  
因为$GCD(a,b)=GCD(b,a%b)$ ,所以$p*a+q*b=GCD(a,b)=GCD(b,a\%b)=p*b+q*a%b=p*b+q*(a-a/b*b=q*a+(p-a/b*q)*b$,这样它就将$a$与$b$的线性组合化简为$b$与$a%b$的线性组合。
根据前边的结论：$a$和$b$都在减小,当$b$减小到$0$时,就可以得出$p=1,q=0$。然后递归回去就可以求出最终的p和q了。  
```cpp
int extended_gcd(int a，int b，int &x，int &y){
    int ret，tmp; 
    if (!b){
        x=1;
        y=0;
        return a;
    } 
    ret=extended_gcd(b，a % b，x，y); 
    tmp=x;
    x=y; 
    y=tmp-a / b * y;
    return ret; 
} 
```

一种更为高效简单的做法：

```cpp
int exgcd(int a,int b,int &x,int &y){
    if(b==0){
        x=1,y=0;
        return a;
    }
    int d=exgcd(b, a%b, y, x);
    y-=a/b*x;
    return d;
}
```
