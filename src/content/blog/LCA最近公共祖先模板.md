---
title: LCA最近公共祖先模板
description: 'Notes on LCA最近公共祖先模板.'
publishDate: '2022-08-02'
tags: ['算法']
---

## 题目描述

给定一棵有根多叉树，请求出指定两个点直接最近的公共祖先。
<!-- more -->
## 输入格式

第一行包含三个正整数 $N,M,S$，分别表示树的结点个数、询问的个数和树根结点的序号。

接下来 $N-1$ 行每行包含两个正整数 $x, y$，表示 $x$ 结点和 $y$ 结点之间有一条直接连接的边（数据保证可以构成树）。

接下来 $M$ 行每行包含两个正整数 $a, b$，表示询问 $a$ 结点和 $b$ 结点的最近公共祖先。

## 输出格式

输出包含 $M$ 行，每行包含一个正整数，依次为每一个询问的结果。

## 样例 #1

### 样例输入 #1

```
5 5 4
3 1
2 4
5 1
1 4
2 4
3 2
3 5
1 2
4 5
```

### 样例输出 #1

```
4
4
1
4
4
```

## 提示

对于 $30\%$ 的数据，$N\leq 10$，$M\leq 10$。

对于 $70\%$ 的数据，$N\leq 10000$，$M\leq 10000$。

对于 $100\%$ 的数据，$N\leq 500000$，$M\leq 500000$。


样例说明：

该树结构如下：

 ![](https://s1.ax1x.com/2022/08/02/vE76pt.png) 

第一次询问：$2, 4$ 的最近公共祖先，故为 $4$。

第二次询问：$3, 2$ 的最近公共祖先，故为 $4$。

第三次询问：$3, 5$ 的最近公共祖先，故为 $1$。

第四次询问：$1, 2$ 的最近公共祖先，故为 $4$。

第五次询问：$4, 5$ 的最近公共祖先，故为 $4$。

故输出依次为 $4, 4, 1, 4, 4$。


<div class="tabs is-toggle"><ul>
<li class="is-active"><a onclick="onTabClick(event)">
<span>算法分析</span>
</a></li>
<li><a onclick="onTabClick(event)">
<span>模板</span>
</a></li>
</ul></div>
{% raw %}<div id="算法分析" class="tab-content" style="display: block;">{% endraw %}

### 算法分析
本题通过**倍增**的方法实现  

首先我们要记录各个点的深度和他们$2^i$级的的祖先，用数组$\rm{depth}$表示每个节点的深度，$fa[i][j]$表示节点ii的$2^j$级祖先。
```cpp
void dfs(int now, int fath) {
	fa[now][0] = fath; depth[now] = depth[fath] + 1;
	for(int i = 1; i <= lg[depth[now]]; ++i)
		fa[now][i] = fa[fa[now][i-1]][i-1];
    for(int i = 0;i<=po[now].size()-1;i++){
        if(po[now][i]!=fath) dfs(po[now][i],now);
    }
}
```
加一个常数优化
```cpp
for(int i = 1;i<=n;i++)lg[i] = lg[i-1] + (1 << lg[i-1] == i);//解释: gl[深度]指向2的i次方，gl[]中存的是i。
```
倍增LCA，先把两个点提到同一高度，再统一开始跳。
```cpp
if(depth[x]<depth[y])swap(x,y);
for(;depth[x]>depth[y];){
    x = fa[x][lg[depth[x]-depth[y]] - 1];
}//提到同一高度
```
但我们在跳的时候不能直接跳到它们的LCA，因为这可能会误判，所以我们要跳到它们LCA的下面一层，然后输出它们的父节点，这样就不会误判了。
```cpp
if(x==y)return x;
for(int k = lg[depth[x]] - 1; k >= 0; --k)
	if(fa[x][k] != fa[y][k])
		x = fa[x][k], y = fa[y][k];
return fa[x][0];
```
{% raw %}</div>{% endraw %}
{% raw %}<div id="模板" class="tab-content">{% endraw %}
### $Model$
```cpp
#include<iostream>
#include<vector>
using namespace std;
vector <int> po[500005];
int depth[500001], fa[500001][22], lg[500001];
inline int read(){
	int x=0,f=1;char c=getchar();
	for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
	for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
	return x*f;
}
void dfs(int now, int fath) {
	fa[now][0] = fath; depth[now] = depth[fath] + 1;
	for(int i = 1; i <= lg[depth[now]]; ++i)
		fa[now][i] = fa[fa[now][i-1]][i-1];
    for(int i = 0;i<=po[now].size()-1;i++){
        if(po[now][i]!=fath) dfs(po[now][i],now);
    }
}
int LCA(int x,int y){
    if(depth[x]<depth[y])swap(x,y);
    for(;depth[x]>depth[y];){
        x = fa[x][lg[depth[x]-depth[y]] - 1];
    }
    if(x==y)return x;
    for(int k = lg[depth[x]] - 1; k >= 0; --k)
		if(fa[x][k] != fa[y][k])
			x = fa[x][k], y = fa[y][k];
    return fa[x][0];
}
int main(){
    int n=read(),m=read(),s=read(),g1,g2;
    for(int i = 1;i<n;i++){
        g1=read(),g2=read();
        po[g1].push_back(g2);
        po[g2].push_back(g1);
    }
    for(int i = 1;i<=n;i++)lg[i] = lg[i-1] + (1 << lg[i-1] == i);
    dfs(s,0);
    for(int i = 1;i<=m;i++){
        g1=read(),g2=read();
        cout<<LCA(g1,g2)<<endl;
    }
}
```
{% raw %}</div>{% endraw %}

<style type="text/css">
.content .tabs ul { margin: 0; }
.tab-content { display: none; }
</style>

<script>
function onTabClick (event) {
    var tabTitle = $(event.currentTarget).children('span:last-child').text();
    $('.article .content .tab-content').css('display', 'none');
    $('.article .content .tabs li').removeClass('is-active');
    $('#' + tabTitle).css('display', 'block');
    $(event.currentTarget).parent().addClass('is-active');
}
</script>
