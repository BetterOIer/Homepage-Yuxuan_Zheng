---
title: BalanceTree平衡树
description: 'Notes on BalanceTree平衡树.'
publishDate: '2022-11-20'
tags: ['算法']
---

## 题目描述

您需要写一种数据结构（可参考题目标题），来维护一些数，其中需要提供以下操作：

<!-- more -->

1. 插入 $x$ 数
2. 删除 $x$ 数(若有多个相同的数，因只删除一个)
3. 查询 $x$ 数的排名(排名定义为比当前数小的数的个数 $+1$ )
4. 查询排名为 $x$ 的数
5. 求 $x$ 的前驱(前驱定义为小于 $x$，且最大的数)
6. 求 $x$ 的后继(后继定义为大于 $x$，且最小的数)

## 输入格式

第一行为 $n$，表示操作的个数,下面 $n$ 行每行有两个数 $\text{opt}$ 和 $x$，$\text{opt}$ 表示操作的序号( $ 1 \leq \text{opt} \leq 6 $ )

## 输出格式

对于操作 $3,4,5,6$ 每行输出一个数，表示对应答案

## 样例 #1

### 样例输入 #1

```
10
1 106465
4 1
1 317721
1 460929
1 644985
1 84185
1 89851
6 81968
1 492737
5 493598
```

### 样例输出 #1

```
106465
84185
492737
```

## 数据范围

对于 $100\%$ 的数据，$1\le n \le 10^5$，$|x| \le 10^7$

## 分析

### 平衡树可以做什么
1. 插入 $x$ 数
2. 删除 $x$ 数(若有多个相同的数，因只删除一个)
3. 查询 $x$ 数的排名(排名定义为比当前数小的数的个数 $+1$ )
4. 查询排名为 $x$ 的数
5. 求 $x$ 的前驱(前驱定义为小于 $x$，且最大的数)
6. 求 $x$ 的后继(后继定义为大于 $x$，且最小的数)

### 算法分析
#### 旋转树（平衡树核心）
```cpp
void pushup(int pos){
    tree[pos].size=tree[tree[pos].s[0]].size+tree[tree[pos].s[1]].size+tree[pos].cnt; //合并当前节点数据
}
void rotate(int pos){
    int fa=tree[pos].fa,grandfa=tree[fa].fa; //父节点，父亲的父亲节点
    int fich = tree[fa].s[1]==pos;
    tree[fa].s[fich]=tree[pos].s[fich^1];
    tree[tree[pos].s[fich^1]].fa=fa;
    tree[pos].s[fich^1]=fa;
    tree[fa].fa=pos;
    tree[grandfa].s[tree[grandfa].s[1]==fa]=pos;
    tree[pos].fa=grandfa;
    pushup(fa),pushup(pos);
}
```

#### 插入
```cpp
void insert(int val){
    int pos=root,fa=0; //从根开始
    while(pos&&tree[pos].val!=val) fa=pos,pos=tree[pos].s[val>tree[pos].val]; //根据BIT性质寻找离val最接近的值
    if(pos)tree[pos].cnt++; //如果已经存在当前值的点，直接将次数加1
    else{ //如果没有
        pos=++idx; //新建点
        tree[fa].s[val>tree[fa].val]=pos; //根据BIT性质选择插入位置
        tree[pos].init(fa,val); //初始化
    }
    splay(pos,0); //为方便后续操作，将当前节点设为根
}
```

## $Model$
```cpp
#include<iostream>
using namespace std;
const int N = 1000005;  
inline int read(){
	int x=0,f=1;char c=getchar();
	for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
	for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
	return x*f;
}
struct node{
    int s[2];
    int fa;
    int val;
    int cnt;
    int size;
    void init(int fanew,int valnew){
        fa=fanew,val=valnew;
        cnt=size=1;
    }
}tree[N];
int root,n,idx;
void pushup(int pos){
    tree[pos].size=tree[tree[pos].s[0]].size+tree[tree[pos].s[1]].size+tree[pos].cnt;
}
void rotate(int pos){
    int fa=tree[pos].fa,grandfa=tree[fa].fa;
    int fich = tree[fa].s[1]==pos;
    tree[fa].s[fich]=tree[pos].s[fich^1];
    tree[tree[pos].s[fich^1]].fa=fa;
    tree[pos].s[fich^1]=fa;
    tree[fa].fa=pos;
    tree[grandfa].s[tree[grandfa].s[1]==fa]=pos;
    tree[pos].fa=grandfa;
    pushup(fa),pushup(pos);
}
void splay(int pos,int goal){
    while(tree[pos].fa!=goal){
        int fa=tree[pos].fa,grandfa=tree[fa].fa;
        if(grandfa!=goal) ((tree[fa].s[0]==pos)^(tree[grandfa].s[0]==fa))? rotate(pos):rotate(fa);
        rotate(pos);
    }
    if(goal==0) root=pos;
}
void find(int val){
    int pos=root;
    while(tree[pos].s[val>tree[pos].val]&&val!=tree[pos].val)pos=tree[pos].s[val>tree[pos].val];
    splay(pos,0);
}
int get_pre(int val){
    find(val);
    int pos=root;
    if(tree[pos].val<val)return pos;
    pos=tree[pos].s[0];
    while(tree[pos].s[1])pos=tree[pos].s[1];
    return pos;
}
int get_aft(int val){
    find(val);
    int pos=root;
    if(tree[pos].val>val)return pos;
    pos=tree[pos].s[1];
    while(tree[pos].s[0])pos=tree[pos].s[0];
    return pos;
}
void del(int val){
    int pre=get_pre(val);
    int aft=get_aft(val);
    splay(pre,0);splay(aft,pre);
    int del=tree[aft].s[0];
    if(tree[del].cnt>1)tree[del].cnt--,splay(del,0);
    else tree[aft].s[0]=0; 
}
int get_rank(int val){
    find(val);
    return tree[tree[root].s[0]].size;
}
int get_kth(int k){
    int pos=root;
    while(true){
        int fich=tree[pos].s[0];
        if(tree[fich].size+tree[pos].cnt<k){
            k-=(tree[fich].size+tree[pos].cnt);
            pos=tree[pos].s[1];
        }else{
            if(tree[fich].size>=k)pos=tree[pos].s[0];
            else break;
        }
    }
    splay(pos,0);
    return tree[pos].val;
}
void insert(int val){
    int pos=root,fa=0;
    while(pos&&tree[pos].val!=val) fa=pos,pos=tree[pos].s[val>tree[pos].val];
    if(pos)tree[pos].cnt++;
    else{
        pos=++idx;
        tree[fa].s[val>tree[fa].val]=pos;
        tree[pos].init(fa,val);
    }
    splay(pos,0);
}
int main(){
    insert(-1e9);insert(1e9);
    n=read();
    while(n--){
        int opt=read(),num=read();
        if(opt==1)insert(num);
        if(opt==2)del(num);
        if(opt==3)cout<<get_rank(num)<<endl;
        if(opt==4)cout<<get_kth(num+1)<<endl;
        if(opt==5)cout<<tree[get_pre(num)].val<<endl;
        if(opt==6)cout<<tree[get_aft(num)].val<<endl;
    }
    return 0;
}
```
