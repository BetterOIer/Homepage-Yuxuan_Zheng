---
title: 可持久化字典树-01Trie
description: 'Notes on 可持久化字典树-01Trie.'
publishDate: '2023-08-05'
tags: ['算法']
---

## 例题


### 题目描述

给定一个非负整数序列 $\{a\}$，初始长度为 $N$。  

有 $M$ 个操作，有以下两种操作类型：  

1. `A x`：添加操作，表示在序列末尾添加一个数 $x$，序列的长度 $N$ 加 $1$。  
2. `Q l r x`：询问操作，你需要找到一个位置 $p$，满足 $l \le p \le r$，使得：$a[p] \oplus a[p+1] \oplus ... \oplus a[N] \oplus x$ 最大，输出最大值。

### 输入格式

第一行包含两个整数 $N, M$，含义如问题描述所示。     
第二行包含 $N$ 个非负整数，表示初始的序列 $A$。   
接下来 $M$ 行，每行描述一个操作，格式如题面所述。

### 输出格式

假设询问操作有 $T$ 个，则输出应该有 $T$ 行，每行一个整数表示询问的答案。

### 样例 #1

#### 样例输入 #1

```
5 5
2 6 4 3 6
A 1 
Q 3 5 4 
A 4
Q 5 7 0 
Q 3 6 6
```

#### 样例输出 #1

```
4
5
6
```

### 提示

- 对于所有测试点，$1\le N,M \le 3\times 10 ^ 5$，$0\leq a_i\leq 10 ^ 7$。

## AC Code

```cpp
#include<iostream>
using namespace std;
inline int read(){
    int x=0,f=1;char c=getchar();
    for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
    for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
    return x*f;
}
int n,m,len=25;
int a[600005],xor_sum[600005];
int root[600005],idx=0;
struct node{
    int ch[2];
    int ver[2]={-1,-1};
}tr[600000*20+5];
void insert(int pre, int &pos, int r,int val,int ver){
    pos=++idx;
    int c=(val>>r)&1;
    tr[pos].ch[!c]=tr[pre].ch[!c];
    tr[pos].ver[!c]=tr[pre].ver[!c];
    tr[pos].ver[c]=ver;
    r? insert(tr[pre].ch[c],tr[pos].ch[c],r-1,val,ver):void();
}
int query(int pos,int lim,int r,int val){
     int c=(val>>r)&1;
     return (r? ((tr[pos].ver[!c]>=lim ? query(tr[pos].ch[!c],lim,r-1,val)+(1<<r):query(tr[pos].ch[c],lim,r-1,val))):(tr[pos].ver[!c]>=lim ? 1:0));
}
int main(){
    n=read(),m=read();
    insert(0,root[0],len,0,0);
    for(int i = 1;i<=n;i++){
        a[i]=read();xor_sum[i]=xor_sum[i-1]^a[i];
        insert(root[i-1],root[i],len,xor_sum[i],i);
    }
    for(int i = 1,x,l,r;i<=m;i++){
        char opt;
        cin>>opt;
        if(opt=='A'){
            ++n;
            a[n]=read();xor_sum[n]=xor_sum[n-1]^a[n];
            insert(root[n-1],root[n],len,xor_sum[n],n);
        }else{
            l=read(),r=read(),x=read();
            cout<<(query(root[r-1],l-1,len,x^xor_sum[n]))<<endl;
        }
    }
    return 0;
}
```
## 解释

01trie主要解决异或问题

信息存储在边上，表示这一位是$0$还是$1$
