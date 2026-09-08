---
title: QuickRead/Write 快读快写
description: 'Notes on QuickRead/Write 快读快写.'
publishDate: '2022-08-03'
tags: ['技巧']
---

### 快读

<!-- more -->

```cpp
inline int read(){
	int x=0,f=1;char c=getchar();
	for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
	for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
	return x*f;
}
```
### 快写
```cpp
void write(int x){
    if(x<0) putchar('-'),x=-x;
    if(x>9) write(x/10);
    putchar(x%10+'0');
}
```

### $cin$加速器(此时cin、cout和scanf、printf不可混用)
```cpp
std::ios::sync_with_stdio(false);
cin.tie(0),cout.tie(0);
```
