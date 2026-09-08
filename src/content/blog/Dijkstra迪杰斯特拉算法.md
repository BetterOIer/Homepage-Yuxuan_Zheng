---
title: Dijkstra迪杰斯特拉算法
description: 'Notes on Dijkstra迪杰斯特拉算法.'
publishDate: '2022-08-03'
tags: ['算法']
---

## 题目描述

给定一个 $n$ 个点，$m$ 条有向边的带非负权图，请你计算从 $s$ 出发，到每个点的距离。
<!-- more -->
数据保证你能从 $s$ 出发到任意点。

## 输入格式

第一行为三个正整数 $n, m, s$。
第二行起 $m$ 行，每行三个非负整数 $u_i, v_i, w_i$，表示从 $u_i$ 到 $v_i$ 有一条权值为 $w_i$ 的有向边。

## 输出格式

输出一行 $n$ 个空格分隔的非负整数，表示 $s$ 到每个点的距离。

## 样例

### 样例输入 #1

```
4 6 1
1 2 2
2 3 2
2 4 1
1 3 5
3 4 3
1 4 4
```

### 样例输出 #1

```
0 2 4 3
```

## 提示


$1 \leq n \leq 10^5$；

$1 \leq m \leq 2\times 10^5$；

$s = 1$；

$1 \leq u_i, v_i\leq n$；

$0 \leq w_i \leq 10 ^ 9$,

$0 \leq \sum w_i \leq 10 ^ 9$。

## 算法分析

使用堆优化（优先队列）
```cpp
struct Qnode{
    int w;
    int po;
    inline bool operator <(const Qnode &x)const{
        return w>x.w;
    }
};
priority_queue<Qnode>q;
```
初始化dis为极大值

```cpp
for(int i = 1;i<=n;i++) dis[i]=2147483647;
    dis[f]=0;
```

主体
```cpp
dis[f]=0;
    q.push((Qnode){0,f});
    while(!q.empty()){
        Qnode now =q.top();q.pop();
        int u=now.po;
        if(vis[u]) continue;
        vis[u]=1;
        if(road[u].size()){
            for(int i = 0;i<=road[u].size()-1;i++){
                if(dis[road[u][i].to]>dis[u]+road[u][i].val){
                    dis[road[u][i].to]=dis[u]+road[u][i].val;//更新路径
                    pre[road[u][i].to]=u;
                    q.push((Qnode){dis[road[u][i].to],road[u][i].to});
                }
            }
        }
    }
```


## Model
```cpp
#include<iostream>
#include<vector>
#include<queue>
using namespace std;
struct node{
    int to;
    int val;
};
struct Qnode{
    int w;
    int po;
    inline bool operator <(const Qnode &x)const{
        return w>x.w;
    }
};
priority_queue<Qnode>q;
vector <node> road[100004];
int vis[100004],pre[100004];
int dis[100004];
int main(){
    int n,m,f,u,v,w;
    scanf("%d%d%d",&n,&m,&f);
    for(int i = 1;i<=m;i++){
        scanf("%d%d%d",&u,&v,&w);
        road[u].push_back(node{v,w});
    }
    for(int i = 1;i<=n;i++) dis[i]=2147483647;
    dis[f]=0;
    q.push((Qnode){0,f});
    while(!q.empty()){
        Qnode now =q.top();q.pop();
        int u=now.po;
        if(vis[u])continue;
        vis[u]=1;
        if(road[u].size()){
            for(int i = 0;i<=road[u].size()-1;i++){
                if(dis[road[u][i].to]>dis[u]+road[u][i].val){
                    dis[road[u][i].to]=dis[u]+road[u][i].val;
                    pre[road[u][i].to]=u;
                    q.push((Qnode){dis[road[u][i].to],road[u][i].to});
                }
            }
        }
    }
    for(int i=1;i<=n;i++){
        printf("%d ",dis[i]);
    }
    return 0;
}
```
