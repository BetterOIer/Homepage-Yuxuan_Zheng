---
title: Floyed算法
description: 'Notes on Floyed算法.'
publishDate: '2022-08-01'
tags: ['算法']
---

### 题目描述

**有向图**中存在$n$个节点，每个节点之间有道路相连，共有$m$条道路，给出$Q$此询问，包含起点和终点,请输出两点间最短距离$L\min$.

<!-- more -->

### 输入描述
第一行$3$个整数$n,m,Q$.  
第$2$到$(m+1)$行，输入每条路的起点$u_i$，终点$v_i$，权值$w_i$.  
第$(m+2)$到$(m+Q+2)$行，输入起点$U_i$，终点$V_i$. 

### 输出描述
$m$行，每行一个整数，表示$U_i$到$V_i$的最短路径$L_i\min$,如果到不了，输出`No way.`.

---

### $Model:$
```cpp
#include<iostream>
#include<cstring>
#define MAXN 105
#define refer127 2139062143
using namespace std;
int dist[MAXN][MAXN],p[MAXN][MAXN],n,m,q;
int main(){
    memset(p,255,sizeof(p));
    memset(dist,127,sizeof(dist));
    int u,v,w;
    scanf("%d%d%d",&n,&m,&q);
    for(int i = 1;i<=m;i++){
        scanf("%d%d%d",&u,&v,&w);
        dist[u][v]=w;
        p[u][v]=u;
    }
    for(int i = 1;i<=n;i++) dist[i][i]=0;
    for(int i = 1;i<=n;i++){
        for(int j = 1;j<=n;j++){
            if(dist[j][i]!=0&&dist[j][i]!=refer127){
                for(int w = 1;w<=n;w++){
                    if(dist[i][w]!=refer127){
                        if(dist[j][w]>dist[j][i]+dist[i][w]){
                            dist[j][w]=dist[j][i]+dist[i][w];
                            p[j][w]=p[i][w];
                        }
                    }
                }
            }
        }
    } 
    for(int i = 1;i<=q;i++){
        scanf("%d%d",&u,&v);
        if(dist[u][v]==refer127){
            printf("No way.\n");
        }else printf("%d\n",dist[u][v]);
    }
}
```
