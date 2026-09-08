---
title: DEBUG备忘录
description: 'Notes on DEBUG备忘录.'
publishDate: '2023-07-21'
tags: ['技巧']
---

## 写代码

1. 题目中要输入$n$、$m$,不要在应该用$n$的地方用$m$。
2. `long long`要开吗？你开了吗？哪些要开那些不要开？整形默认是`int`,`1`要写成`1LL`。
3. 树形结构：递归往下的时候$l$和$r$有写反吗？
4. 取模了吗？你真的取完了吗？有些取模是负数，需要`(a%mod+mod)%mod`
5. 未完待续。。。




## 知识性



1. ASCII码是**7**位二进制编码，以**8**位存储。
<!-- more -->
2. 二分查找找不到数据时：
    - 最多查找次数： $\left \lfloor \log_2n \right \rfloor+1$
    - 最少查找次数：$\left \lfloor \log_2(n+1) \right \rfloor$
3. 布尔型变量占用**1**字节，**8**比特。
4. 冒泡排序为**稳定排序**，时间复杂度为$O(n^2)$。
5. 十进制小数转二进制：乘2取整，顺序排列
    ```
    如：0.625=（0.101）B
    0.625*2=1.25======取出整数部分1
    0.25*2=0.5========取出整数部分0
    0.5*2=1==========取出整数部分1

    再如：0.7=（0.1 0110 0110...）B
    0.7*2=1.4========取出整数部分1
    0.4*2=0.8========取出整数部分0
    0.8*2=1.6========取出整数部分1
    0.6*2=1.2========取出整数部分1
    0.2*2=0.4========取出整数部分0
    0.4*2=0.8========取出整数部分0
    0.8*2=1.6========取出整数部分1
    0.6*2=1.2========取出整数部分1
    0.2*2=0.4========取出整数部分0
    ```
6. 各种排序的时间复杂度:  
    |类型|最好|平均|最坏|稳定性|
    |:--:|:--:|:--:|:--:|:--:|
    |插入排序|$O(n)$|$O(n^2)$|$O(n^2)$|稳定|
    |希尔排序(插入排序优化)|$O(n)$|$O(n \times 1.3)$|$O(n^2)$|不稳定|
    |选择排序|$O(n)$|$O(n^2)$|$O(n^2)$|不稳定|
    |堆排序|$O(n \log_2n)$|$O(n \log_2n)$|$O(n \log_2n)$|不稳定|
    |冒泡排序|$O(n)$|$O(n^2)$|$O(n^2)$|稳定|
    |快速排序|$O(n \log_2n)$|$O(n \log_2n)$|$O(n^2)$|不稳定|
    |归并排序|$O(n \log_2n)$|$O(n \log_2n)$|$O(n \log_2n)$|稳定|

7. 逻辑运算符优先级:
   $﹁$高于$∧$，$∧$高于$∨$，$∨$高于$→$
8. 时间复杂度主定理：   
   对于时间复杂度满足如下递推式：$T(n)=aT(\frac{n}{b})+f(n)$  
   如果$f\left ( n \right ) < O\left ( n^{log_ba} \right )$，则$T\left ( n \right ) = \Theta \left ( n^{log_ba} \right )$  
    如果$f\left ( n \right ) = \Theta \left ( n^{log_ba}log^{k}n \right )$，则$T\left ( n \right ) = \Theta \left ( n^{log_ba} log^{k+1}n \right )$  
    如果$f\left ( n \right ) > \Omega \left ( n^{log_ba} \right )$，则$T\left ( n \right ) = \Theta \left (f\left ( n \right ) \right )$   
    例子：  
    $T\left ( n \right ) = 3T\left ( n/2 \right ) + n^{2}$ 解$a = 3, b = 2, f\left ( n \right ) = n^{2}$ 那么$log_ba = log_23$ ，那么$f\left ( n \right ) > n^{2}$，根据主定理有$T\left ( n \right ) = O\left ( n^{2} \right )$  

    $T\left ( n \right ) = 4T\left ( n/2 \right ) + n^{2}$解$a = 4, b = 3, f\left ( n \right ) = n^{2}$那么$log_ba = log_24$，那么$f\left ( n \right ) = n^{2}$，根据主定理有$T\left ( n \right ) = O\left ( n^{2}log_2n \right )$    

    $T\left ( n \right ) = T\left ( n/2 \right ) + 2^{n}$，解$a = 1, b = 2, f\left ( n \right ) = 2^{n}$那么$log_ba = log_21$，那么$f\left ( n \right ) > n^{0}$，根据主定理有$T\left ( n \right ) = O\left ( 2^{n} \right )$  

    $T\left ( n \right ) = 2^{n}T\left ( n/2 \right ) + n^{n}$，解$a = 2^{n}, b = 2, f\left ( n \right ) = n^{n}$那么因为a不是常数，所以不适用于主定理  

    $T\left ( n \right ) = 16T\left ( n/4 \right ) + n$，解$a=16, b = 4, f\left ( n \right ) = n$那么$log_ba = log_416$，那么$f\left ( n \right ) < n^{2}$，根据主定理有$T\left ( n \right ) = O\left ( n^{2} \right )$  
9. 渐进符号
    |符号|含义|想当于|
    |---|---|---|
    |Θ（西塔）|	紧确界。|相当于"="|
    |O （大欧）|上界。|相当于"<="|
    |o（小欧）	|非紧的上界。|相当于"<"|
    |Ω（大欧米伽）|下界。|相当于">="|
    |ω（小欧米伽）|非紧的下界。|相当于">"|
