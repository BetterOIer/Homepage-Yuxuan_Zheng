---
title: P8481 Binary search 题解
description: 'Notes on P8481 Binary search 题解.'
publishDate: '2022-08-26'
tags: ['题解']
---


这题其实有最简单最暴力最直接的**DFS算法**。

我们可以看到，本题其实以及给出了**示例代码**：

<!-- more -->

```cpp
int find(int *num,int x,int len)
{
	int l=0,r=len-1,mid,cnt=0,w;
	while(l<r)
	{
		cnt++;
		w=rand()%2;
		mid=(l+r+w)/2;
		if(num[mid]-w<x) l=mid+!w;
		else r=mid-w;
	}
	return mid;
}

```

但是代码中给出的是`rand()`， 所以其实将`rand()`值改为固定的$0,1$,则有：

```cpp
int mid1=(l+r)>>1;
    if(num[mid1]>=search){
        dfs(cnt+1,l,mid1);
    }else{
        dfs(cnt+1,mid1+1,r);
    }
```

和

```cpp
int mid2=(l+r+1)>>1;
if(num[mid2]-1>=search){
        dfs(cnt+1,l,mid2-1);
    }else{
        dfs(cnt+1,mid2,r);
    }
```

~~其实完全就是改示例代码，根本就不需要动脑子。~~

最后我们只需要将上述代码整合，二分递归出最小的查找值即可。


<p><font size="10px">AC Code</font></p>

```cpp
#include<iostream>
using namespace std;
int num[1048578],search;
int dp[1048578][3];
int find(int *num,int x,int len)
{
	int l=0,r=len-1,mid,cnt=0,w;
	while(l<r)
	{
		cnt++;
		w=rand()%2;
		mid=(l+r+w)/2;
		if(num[mid]-w<x) l=mid+!w;
		else r=mid-w;
	}
	return mid;
}
long long ans=9223372036854775807ll;
void dfs(long long cnt,int l,int r){ //基本DFS。
    if(l==r){
        ans=min(ans,cnt);
        return ;
    }
    int mid1=(l+r)>>1,mid2=(l+r+1)>>1;  //两种方案分类讨论。
    if(num[mid1]>=search){
        dfs(cnt+1,l,mid1);
    }else{
        dfs(cnt+1,mid1+1,r);
    }
    if(num[mid2]-1>=search){
        dfs(cnt+1,l,mid2-1);
    }else{
        dfs(cnt+1,mid2,r);
    }
    
}
int main(){
    int n;
    cin>>n;
    for(int i = 1;i<=n;i++){
        cin>>num[i];
    }
    int m;
    cin>>m;
    for(int i = 1;i<=m;i++){
        cin>>search;
        ans=9223372036854775807ll; //一定要初始化最大值！！！
        dfs(0,1,n);
        cout<<ans<<endl;
    }
}
```

完结撒花！！！
