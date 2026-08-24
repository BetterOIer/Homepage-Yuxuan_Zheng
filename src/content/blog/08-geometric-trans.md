---
title: '08 几何变换、插值与重采样'
description: '图像几何变换、插值、重采样、抗混叠与图像金字塔。'
publishDate: 2026-08-24
tags: ['摄影测量', '几何变换']
language: '中文'
draft: false
---

对应课件：`2021-pho1-08-geometric-trans.pptx.pdf`。

## 1. 几何变换的对象与表示

几何变换用于：畸变校正（rectification）、将已校正图像映射到物体表面（rendering/texture mapping），以及配准两幅不同畸变的图像（registration）（第 2--4 页；示例图分别详见这些页）。每张图像拥有自己的坐标系：图像 $a(x,y)$ 在 $S_a$，图像 $b(x,y)$ 在 $S_b$。

从 $S_b$ 到 $S_a$ 的坐标变换写作

$$
{}^a\mathbf{x}={}^{a}T_b({}^{b}\mathbf{x}),
\qquad
{}^b\mathbf{x}={}^{b}T_a'({}^{a}\mathbf{x}).
$$

其中左上标表示坐标系；${}^a\mathbf{x}$ 是二维坐标列向量，简写表示其两个分量均由 ${}^{a}T_b$ 计算（第 5--7 页）。

### 平移与仿射例子

平移是

$$
\begin{bmatrix}{}^ax\\{}^ay\end{bmatrix}
=\begin{bmatrix}{}^bx\\{}^by\end{bmatrix}
+\begin{bmatrix}t_x\\t_y\end{bmatrix}.
$$

更一般的仿射变换为

$$
\begin{bmatrix}{}^ax\\{}^ay\end{bmatrix}
=\begin{bmatrix}h_{11}&h_{12}\\h_{21}&h_{22}\end{bmatrix}
\begin{bmatrix}{}^bx\\{}^by\end{bmatrix}
+\begin{bmatrix}h_{13}\\h_{23}\end{bmatrix}.
$$

课件的数值例子取线性部分 $\mathrm{diag}(0.25,0.25)$，平移为 $[10\;10]^\mathsf{T}$，即图像缩小为原来的 1/4，再向 $x,y$ 方向各移动 10 像素（第 8--12 页）。

## 2. 非整数坐标与插值

变换后的像素坐标通常不是整数，不能直接索引原图；为在输入与输出间赋予强度，必须插值。完成离散化与量化的过程称为重采样（第 13--14 页）。

### 最近邻、双线性、双三次

- **最近邻（NN）**：取最近像素的同一颜色值，相当于将位置取整（第 15 页）。速度最快、质量最低。
- **双线性**：先沿 $x$ 做线性插值，再沿 $y$ 做线性插值，使用四个邻点（第 17--23 页）。
- **双三次**：先沿 $x$ 做三次插值再沿 $y$ 做；结果取决于 16 个系数，产生三次样条插值（第 24--34 页）。速度最慢、质量最高。

课件的速度/质量比较见第 36 页，三种效果图见第 35、37--40 页。

### 双线性插值的严格展开

设采样点在左上邻点 $a_{00}$ 的局部坐标为 $(\Delta x,\Delta y)$，四个邻点为 $a_{00},a_{10},a_{01},a_{11}$。先后两次一维线性插值给出

$$
\begin{aligned}
b({}^bx,{}^by)
={}&a_{00}(1-\Delta x)(1-\Delta y)
+a_{01}(1-\Delta x)\Delta y\\
&+a_{10}\Delta x(1-\Delta y)+a_{11}\Delta x\Delta y.
\end{aligned}
$$

按课件继续合并同类项：

$$
\begin{aligned}
b({}^bx,{}^by)
={}&a_{00}+\Delta x(a_{10}-a_{00})+\Delta y(a_{01}-a_{00})\\
&+\Delta x\Delta y(a_{00}-a_{01}-a_{10}+a_{11}).
\end{aligned}
$$

因此它可写成双变量多项式 $z=\sum_{i\le1,j\le1}c_{ij}\Delta x^i\Delta y^j$（第 20--23 页）。局部格点和强度图示详见第 18--23 页。

## 3. 前向与逆向 warping

**前向映射**：遍历输入图 $b$ 的每个像素并放到输出 $a$：

$$
\forall\,{}^b\mathbf{x}\qquad {}^a\mathbf{x}={}^{a}T_b({}^{b}\mathbf{x}).
$$

由于映射后点落在不规则位置，输出规则网格可能缺像素，需要从不规则黑点重建规则蓝点强度（第 42--46 页；过程图详见这些页）。

**逆向映射**：改为遍历输出图的每个像素，并在输入图中寻找其来源：

$$
\forall\,{}^a\mathbf{x}\qquad
{}^b\mathbf{x}=({}^{a}T_b)^{-1}({}^{a}\mathbf{x})={}^{b}T_a({}^{a}\mathbf{x}).
$$

此时输出的每一个规则格点都有输入位置可供双线性或双三次插值。故课件结论是：前向方法会导致输出缺像素，**总是使用逆向 warping**（第 47--52 页）。复杂 warping、对齐后平均人脸的应用图示详见第 53--59 页。

## 4. 下采样、抗混叠与尺度

将图像尺寸减半的简单方式是每隔一行、一列丢弃一个样本（第 60--62 页）。直接下采样会造成 aliasing 并丢失细节；先用二项式滤波平滑，再下采样可缓解该问题（第 63--67 页，效果图详见第 63--66 页）。所需平滑强度取决于核及其宽度，也取决于变换尺度（第 68 页）。

### 核宽度

课件用标准差定义核宽度：

$$
\sigma=\left(\sum_i i^2w(i)\right)^{1/2}.
$$

对方框核和二项式核，分别给出

$$
\sigma_{R_n}=\left(\frac{n^2-1}{12}\right)^{1/2},
\qquad
\sigma_{B_n}=\left(\frac n4\right)^{1/2}.
$$

（第 69--70 页。）

### 变换的局部平均尺度

令 $T(\mathbf{x})=[T_x(\mathbf{x}),T_y(\mathbf{x})]^\mathsf{T}$。课件定义

$$
m=\sqrt{\frac12\left\lVert\frac{\partial T}{\partial\mathbf{x}}\right\rVert^2},
$$

其中雅可比的平方范数按分量展开为

$$
\frac12\left\lVert\frac{\partial T}{\partial\mathbf{x}}\right\rVert^2
=\frac12\left[
\left(\frac{\partial T_x}{\partial x}\right)^2+
\left(\frac{\partial T_x}{\partial y}\right)^2+
\left(\frac{\partial T_y}{\partial x}\right)^2+
\left(\frac{\partial T_y}{\partial y}\right)^2
\right].
$$

对 $[T_x\;T_y]^\mathsf{T}=\begin{bmatrix}2&0\\0&4\end{bmatrix}[x\;y]^\mathsf{T}+[3\;2]^\mathsf{T}$，代入偏导数 $2,0,0,4$：

$$
m=\sqrt{\frac12(2^2+0^2+0^2+4^2)}=\sqrt{10}\approx3.16.
$$

这正是课件第 71--72 页的推导。重采样的建议是：$m<1$ 时图像缩小，取 $\sigma\approx m/2$；$m=1$ 时用双线性，要求高质量则用双三次；$m>1$ 时图像放大，使用双三次（第 73 页）。

## 5. 图像金字塔

图像金字塔是一个图像列表；每一层尺寸为前一层的一半（第 74 页）。它把前述的平滑与下采样逐层组合。金字塔结构和实例分别详见第 74--76 页。

## 6. 复习要点

- 几何变换改变坐标；插值负责在非整数位置重建强度。
- 双线性是四邻域加权平均，双三次使用 16 个系数以取得更高质量。
- 逆向 warping 保证每个输出像素有来源，便于直接插值。
- 下采样前需平滑以防混叠；局部尺度决定所需的平滑程度和插值选择。
