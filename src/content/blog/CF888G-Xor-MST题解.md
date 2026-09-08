---
title: CF888G Xor-MST题解
description: 'Notes on CF888G Xor-MST题解.'
publishDate: '2023-08-05'
tags: ['题解']
---

## 题意

- 给定 $n$ 个结点的无向完全图。每个点有一个点权为 $a_i$。连接 $i$ 号结点和 $j$ 号结点的边的边权为 $a_i\oplus a_j$。
- 求这个图的 MST 的权值。
- $1\le n\le 2\times 10^5$，$0\le a_i< 2^{30}$。

## 分析

这道题是对`01Trie`的应用

乍一看以为是`Kruskal`,然后发现边数太多不现实。

我们将点权插入`01Trie`，任意两个点权之间的异或值就是它们到根节点路径上的对应节点的异或值的累加，那么我们就不难发现，树上两个叶子节点的`LCA`深度越深，它们的异或结果也就越小。

观察到 我们在`01Trie`中插入点权时，只有$n-1$个节点是有$2$个儿子，其他节点都只有$0/1$个儿子，这$n-1$个节点正好符合树形结构。

那我们只需要递归查找`01Trie`,对于每个有$2$个子节点的节点，我们对左子树包含的所有点权与右子树中异或值最小的子树合并即可。

另外，我们可以发现，若将点权从小到大排序后插入，可以得到每一颗子树所代表的点权值是连续的，这可以方便我们的查询。


## AC Code

```cpp
#include<iostream>
#include<algorithm>
using namespace std;
inline int read(){
    int x=0,f=1;char c=getchar();
    for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
    for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
    return x*f;
}
int n,root,idx=0;
long long a[200005];
struct node{
    int ch[2];
    int l_lim,r_lim;
}tr[200005*20];
void insert(int &pos,int dep,long long val,int id){
    if(!pos)pos=++idx;
    if(!tr[pos].l_lim)tr[pos].l_lim=id;//维护当前子树所代表点权范围
    tr[pos].r_lim=id;//维护当前子树所代表点权范围
    if(dep==-1)return;
    int c = (val>>dep)&1;
    insert(tr[pos].ch[c],dep-1,val,id);
}
long long query(int pos,int dep,long long val){//查询异或和最小的板子
    if(dep==-1)return 0;
    int c = (val>>dep)&1;//当前位的值
    if(tr[pos].ch[c])return query(tr[pos].ch[c],dep-1,val); //如果存在这个子树，那么当前位异或和可以为0
    else return query(tr[pos].ch[c^1],dep-1,val)+(1<<dep); //如果不存在，那么当前位异或和为1<<dep
}
long long dfs(int pos,long long dep){
    if(dep==-1)return 0;
    if(tr[pos].ch[0]&&tr[pos].ch[1]){//如果存在2个子节点
        long long res= 9223372036854775807ll;
        for(int i = tr[tr[pos].ch[0]].l_lim;i<=tr[tr[pos].ch[0]].r_lim;i++){//遍历左子树所代表的点权范围
            res=min(res,query(tr[pos].ch[1],dep-1,a[i])/* 在右子树中查询与点权i异或和最小值 */+1LL*(1<<dep)/* 当前pos位的下一位一定是不同的，加上该点异或值 */);
        }
        return dfs(tr[pos].ch[0],dep-1)+dfs(tr[pos].ch[1],dep-1)+res;//统计左右子树答案
    }else if(tr[pos].ch[0]) return dfs(tr[pos].ch[0],dep-1);
    else return dfs(tr[pos].ch[1],dep-1);
}
int main(){
    n=read();
    for(int i = 1;i<=n;i++) a[i]=read();
    sort(a+1,a+n+1);//将点权排序后插入
    for(int i =1;i<=n;i++) insert(root,31,a[i],i);
    cout<<dfs(root,31);
    return 0;
}
```
