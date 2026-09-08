---
title: NOIP考试准备
description: 'Notes on NOIP考试准备.'
publishDate: '2022-11-25'
tags: ['生活']
---


# 进场前
1. 身份证
2. 准考证
3. 水、零食、巧克力
4. 防疫资料
5. 代码模板准备

<!-- more -->

# 进场
1. 检查有没有`VSCode`并检查`TDM-GCC`或`MinGW`。添加到`Path`。
2. 检查`DevCpp`设中文,编译调试信息
3. 模板书写
```cpp
#include<iostream>
using namespace std;
inline int read(){
	int x=0,f=1;char c=getchar();
	for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
	for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
	return x*f;
}
int main(){
    freopen(".in","r",stdin);
    freopen(".out","w",stdout);
    fclose(stdin);
    fclose(stdout);
    return 0;
}
```
> 有时间(应该没时间)
```json
//launch.json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "g++.exe - 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "internalConsoleOptions": "neverOpen",
            "MIMode": "gdb",
            "miDebuggerPath": "D:\\Program Files (x86)\\TDM-GCC\\bin\\gdb.exe",
            "setupCommands": [
                {
                    "description": "为 gdb 启用整齐打印",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                },
                {
                    "description": "将反汇编风格设置为 Intel",
                    "text": "-gdb-set disassembly-flavor intel",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "C/C++: g++.exe 生成活动文件"
        }
    ]
}
```
```json
//tasks.json
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: g++.exe 生成活动文件",
            "command": "D:\\Program Files (x86)\\TDM-GCC\\bin\\g++.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe",
                "-Wall",
                "-std=c++14"
            ],
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "调试器生成的任务。"
        }
    ],
    "version": "2.0.0"
}
```
```json
//c_cpp_properties.json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "compilerPath": "D:\\Program Files (x86)\\TDM-GCC\\bin\\gcc.exe",
            "cStandard": "gnu17",
            "cppStandard": "gnu++14",
            "intelliSenseMode": "windows-gcc-x64"
        }
    ],
    "version": 4
}
```
## 朕用算法模板
先打高精模板
> 高精加
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
const int N=100005;
int A[N],B[N],C[N],la,lb,lc; 
/* 高精加 */
void add(int A[],int B[],int C[]){
	for(int i = 0;i<lc;i++){
		C[i]+=A[i]+B[i];
		C[i+1]=C[i]/10;
		C[i]%=10;
	}
	if(C[lc])lc++;
}
/* 高精减 */
bool cmp(int A[],int B[]){
	for(int i = la-1;~i;i--)if(A[i]!=B[i])return A[i]>B[i];
	return true;
}
void sub(int A[],int B[],int C[]){
	for(int i = 0;i<lc;i++){
		if(A[i]<B[i])A[i+1]--,A[i]+=10;
		C[i]=A[i]-B[i];
	}
	while(lc&&C[lc]==0)lc--;
}
/* 高精乘 */
void mul(int A[],int B[],int C[]){
	for(int i = 0;i<la;i++){
		for(int j =0;j<lb;j++){
			C[i+j]+=A[i]*B[j];
			C[i+j+1]+=C[i+j]/10;
			C[i+j]%=10;
		}
	}
	while(lc&&C[lc]==0)lc--;
}
/* 高精除 */
void div(int A[],int b,int C[]){
	long long r=0;
	for(int i = la-1;~i;i--){
		r=(r<<1)+(r<<3)+A[i];
		C[la-i-1] = r/b;
		r%=b;
	}
	reverse(C,C+lc);
	while(lc&&C[lc]==0)lc--;
}
int main(){
	string a,b;
	cin>>a>>b;
	la=a.length(),lb=b.length(),lc=max(la,lb);
	for(int i = la-1;~i;i--)A[la-i-1]=a[i]-'0';
	for(int i = lb-1;~i;i--)B[lb-i-1]=b[i]-'0';
	/* 高精加 */
	add(A,B,C);
	/* 高精减 */
	if(cmp(A,B))swap(A,B),cout<<'-';
	sub(A,B,C);
	/* 高精乘 */
	lc=la+lb;
	mul(A,B,C);
	/* 高精除 */
	int bb;
	cin>>bb;
	lc=la=a.size();
	div(A,bb,C);
	
	for(int i = lc-1;~i;i--)cout<<C[i];
    return 0;
}
```
再打一遍线段树
```cpp
#include<iostream>
using namespace std;
int a[100005];
struct node{
    int l;
    int r;
    long long val;
    int lazy;
}tree[6000005];
inline long long read(){
	long long x=0,f=1;char c=getchar();
	for(;!isdigit(c);c=getchar())if(c=='-')f=-1;
	for(;isdigit(c);c=getchar())x=(x<<3)+(x<<1)+(c^48);
	return x*f;
}
void pushup(int pos){
    tree[pos].val=tree[pos<<1].val+tree[pos<<1|1].val;
}
void pushdown(int pos){
    if(tree[pos].lazy){
        tree[pos<<1].val+=tree[pos].lazy*(tree[pos<<1].r-tree[pos<<1].l+1);
        tree[pos<<1|1].val+=tree[pos].lazy*(tree[pos<<1|1].r-tree[pos<<1|1].l+1);
        tree[pos<<1].lazy+=tree[pos].lazy;
        tree[pos<<1|1].lazy+=tree[pos].lazy;
        tree[pos].lazy=0;
    }
    return;
}
void updata(int pos,int l,int r,int data){
    if(tree[pos].l>=l&&tree[pos].r<=r){
        tree[pos].val+=((tree[pos].r-tree[pos].l+1)*data);
        tree[pos].lazy+=data;
        return;
    }
    pushdown(pos);
    int mid=(tree[pos].l+tree[pos].r)>>1;
    if(mid>=l) updata(pos<<1,l,r,data);
    if(mid<r) updata(pos<<1|1,l,r,data);
    pushup(pos);
}
long long query(int x,int y,int pos){
    pushdown(pos);
    if(x<=tree[pos].l&&y>=tree[pos].r) return tree[pos].val;
    int mid=(tree[pos].l+tree[pos].r)>>1;
    long long ans=0;
    if(mid>=x)ans+=query(x,y,pos<<1);
    if(mid<y)ans+=query(x,y,pos<<1|1);
    return ans;
}
void build(int pos,int l,int r){
    tree[pos].l=l,tree[pos].r=r;
    if(l==r){
        tree[pos].val=read();
        return;
    }
    int mid=(l+r)>>1;
    build(pos<<1,l,mid);
    build(pos<<1|1,mid+1,r);
    pushup(pos);
    return;
}
int main(){
    int n,m,opt,x,y,k;
    cin>>n>>m;
    build(1,1,n);
    for(int i = 1;i<=m;i++){
        cin>>opt;
        if(opt==1){
            cin>>x>>y>>k;
            updata(1,x,y,k);
        }else{
            cin>>x>>y;
            cout<<query(x,y,1)<<endl;
        }
    }
}
```
> 有时间

快速幂
```cpp
const int mod = 1e9+9;
long long fastpow(long long x,long long y){
	if(y==1)return x;
	long long w=fastpow(x,y>>1)%mod;
	if(y&1==0) return (w*w)%mod;
	else return ((w*w)%mod*x%mod)%mod;
}
```
KMP
```cpp
int ne[1000006];
int main(){
    string s,p;
    cin>>s>>p;
    int n=s.size(),m=p.size();
    for (int i = 1, j = 0; i < m; i ++ ){
        while (j && p[i] != p[j]) j = ne[j];
        if (p[i] == p[j]) j++,ne[i+1] =j;
    }
    for (int i=0, j = 0; i < n; i ++ ){
        while (j && s[i] != p[j]) j = ne[j];
        if (s[i] == p[j]) j ++ ;
        if (j == m) cout<<i-m+2<<endl;
    }
    for (int i=1;i<=m;i++) cout<<ne[i]<<" ";
    return 0;
}
```
