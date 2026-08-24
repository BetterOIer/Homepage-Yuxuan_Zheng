---
title: '10 视觉特征：关键点'
description: '结构矩阵、Harris、Shi–Tomasi、Förstner 与 DoG 关键点。'
order: 10
tags: ['摄影测量', '视觉特征']
---

对应课件：`2021-pho1-10-features-keypoints.pptx.pdf`。

## 1. 关键点与角点

关键点是图像中局部显著的位置；描述子则概括该位置附近的局部结构（第 5--7 页）。角点通常显著，因为它是近似正交的两条边的交汇；边只在一个方向有突变（第 9--10 页）。本课件包括两类方法：基于结构矩阵的角点，以及跨尺度的 DoG 关键点。

## 2. 从 SSD 到结构矩阵

在 $(x,y)$ 的窗口 $W_{xy}$ 内，对位移 $(\delta u,\delta v)$ 计算 SSD：

$$
f(x,y)=\sum_{(u,v)\in W_{xy}}\left(I(u,v)-I(u+\delta u,v+\delta v)\right)^2.
$$

一阶 Taylor 展开：

$$
I(u+\delta u,v+\delta v)\approx I(u,v)+[J_x\;J_y]\begin{bmatrix}\delta u\\\delta v\end{bmatrix}.
$$

代回后，常数项相消，得到

$$
f(x,y)\approx\sum_{W_{xy}}
\begin{bmatrix}\delta u\\\delta v\end{bmatrix}^\mathsf{T}
\begin{bmatrix}J_x^2&J_xJ_y\\J_xJ_y&J_y^2\end{bmatrix}
\begin{bmatrix}\delta u\\\delta v\end{bmatrix}.
$$

把求和移入矩阵，定义结构矩阵

$$
M=\begin{bmatrix}
\sum_WJ_x^2&\sum_WJ_xJ_y\\
\sum_WJ_yJ_x&\sum_WJ_y^2
\end{bmatrix},
\qquad
f(x,y)\approx\delta^\mathsf{T}M\delta.
$$

（第 11--15 页。）$J_x,J_y$ 可用 Sobel 或 Scharr 卷积求得；例如 $J_x^2=(D_x*I)^2$、$J_xJ_y=(D_x*I)(D_y*I)$（第 16--17 页）。

结构矩阵的两个特征值表达两个主方向的变化：一个大、一个近零是边；都近零是平坦区；两个都大才是角点（第 18--21 页；图示详见第 19--20 页）。

## 3. Harris、Shi-Tomasi 与 Förstner

Harris 响应为

$$
R=\det(M)-k(\operatorname{trace}(M))^2
=\lambda_1\lambda_2-k(\lambda_1+\lambda_2)^2,
\qquad k\in[0.04,0.06].
$$

课件的判别为：$|R|\approx0$ 对应两特征值均近零的平坦区域；$R<0$ 对应一大一小的边；$R\gg0$ 对应两个大特征值的角点（第 23--24 页）。

Shi-Tomasi 直接阈值化较小特征值：

$$
\lambda_{\min}(M)=\frac{\operatorname{trace}(M)}2-
\frac12\sqrt{\operatorname{trace}(M)^2-4\det(M)},
\qquad
\lambda_{\min}(M)\ge T\Rightarrow\text{角点}.
$$

Förstner 在 $M$ 的逆（可能位移的协方差矩阵）上工作，以误差椭圆的尺寸和圆度作相似判别，并可扩展到亚像素估计（第 25--27 页）。在局部区域只保留响应 $R$ 或 $\lambda_{\min}$ 最大的位置，称为非极大值抑制（第 28 页）。实际实现应先转灰度，且因真实图像含噪，建议先平滑（第 29 页）。

## 4. Difference of Gaussians（DoG）

DoG 在尺度空间中寻找关键点：每一金字塔层先高斯平滑，再对不同平滑尺度作差并寻找极值，最后在边缘处做极大值抑制（第 37--39 页）。两个不同模糊版本相减会突出角点、边缘等细节；平滑去除高频，差分仅保留两个模糊级别之间的频率，因此 DoG 是带通滤波器（第 40--46 页）。

DoG 可响应角点、边缘和 blob；blob 是与周围不同、内部大致恒定的区域。因为边缘对匹配不可靠，仍需基于特征值测试将其剔除（第 38、48 页）。尺度空间、DoG 极值与例图详见第 40--47 页。

## 5. 复习要点

- 角点检测本质是检测两个独立方向上的强度变化。
- 结构矩阵将局部梯度的方向和强度汇总为两个特征值。
- Harris、Shi-Tomasi、Förstner共享结构矩阵，但使用不同判据。
- DoG 将“局部显著性”扩展到多个平滑尺度，能够检出 blob 和角点。
