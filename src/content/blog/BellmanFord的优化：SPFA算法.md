---
title: BellmanFord的优化：SPFA算法
description: 'Notes on BellmanFord的优化：SPFA算法.'
publishDate: '2023-08-11'
tags: ['算法']
---

# 关于SPFA

- 它死了

--- 

致敬NOI凉心出题人以及……

单源最短路奇技淫巧之SPFA算法😎😎😎

# 用途

- 可以用SPFA求有**负边权**图的最短路
- 求出图中是否存在**负环**

# 代码

```cpp
#include<iostream>
#include<vector>
#include<cstring>
#include<queue>
using namespace std;
inline int read(){int x=0,f=1;char c=getchar();for(;!isdigit(c);c=getchar())if(c=='-')f=-1;for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);return x*f;}
int n,m,s;
struct node{
    int to;
    int val;
};
vector<node>ro[100005];
int dis[100005],cnt[100005];
bool vis[100005];
queue<int>Q;
bool spfa(){
    memset(dis,0x3f3f3f3f,sizeof dis);
    dis[s]=0,vis[s]=true/* 这里的vis[]表示的是当前点是否在队列中 */;Q.push(s);
    while(Q.size()){
        int now = Q.front();Q.pop();
        vis[now]=false;
        for(node to:ro[now]){
            if(dis[to.to]>dis[now]+to.val){
                dis[to.to]=dis[now]+to.val;//进行一次松弛操作
                cnt[to.to]=cnt[now]+1;//松弛次数+1
                if(cnt[to.to]>=n)return false;
                /* 
                每一轮松弛最少使一条边松至最短,那么最多松弛n-1次就能找到最短路
                如果松弛了超过n-1次,则说明存在负环
                 */
                if(!vis[to.to])Q.push(to.to),vis[to.to]=true;
            }
        }
    }
    return true;
}
int main(){
    n=read(),m=read(),s=read();
    for(int i = 1,u,v,w;i<=m;i++){
        u=read(),v=read(),w=read();
        ro[u].push_back((node){v,w});
    }
    bool NO_NEGTIVE_CIRCLE = spfa();//判断有无负环
    if(NO_NEGTIVE_CIRCLE){
        for(int i = 1;i<=n;i++){
            cout<<dis[i]<<" ";
        }
    }else cout<<-1;
    return 0;
}
```

# 后话

使用SPFA,我们可以完成[差分约束](../posts/8856.html)
