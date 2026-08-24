---
title: '06–07 局部算子与卷积'
description: '局部算子、卷积、平滑、图像梯度与边缘检测。'
order: 6
tags: ['摄影测量', '卷积']
---

对应课件：

- `2021-pho1-06-local-op-part1.pptx.pdf`（以下简称 Part 1）
- `2021-pho1-07-local-op-part2.pptx.pdf`（以下简称 Part 2）

## 1. 从局部算子到卷积

点算子只使用一个强度值，因而难以处理噪声和局部结构；局部算子（neighborhood operator）改为在像素邻域内组合强度值。Part 1 第 2--4 页给出点、局部、全局算子的区分，并将卷积作为定义局部线性算子的统一框架。

令输入图像为 $f$，输出为 $g$，权重函数（核）为 $w$。二维局部加权和为

$$
g(i,j)=\sum_{k,l}w(k,l)f(i-k,j-l).
$$

这里 $w$ 就是 kernel；该式可简记为 $g=w*f$（Part 1 第 13、15 页）。滤波器 $L$ 若满足

$$
g(i,j)=L(f(i,j)),\qquad
L(\alpha_1f_1+\alpha_2f_2)=\alpha_1g_1+\alpha_2g_2,
$$

以及对位移输入给出相同位移的输出 $L(f(i-k,j-l))=g(i-k,j-l)$，则称为线性、平移不变（Part 1 第 14 页）。

## 2. 平滑：方框核、边界与二项式核

### 方框滤波

方框滤波以邻域平均值替换中心像素。对三点一维邻域，课件的展开为

$$
\begin{aligned}
g(i)&=\sum_{k=-1}^{1}w(k)f(i-k)\\
&=w(-1)f(i+1)+w(0)f(i)+w(1)f(i-1)\\
&=\frac13f(i+1)+\frac13f(i)+\frac13f(i-1).
\end{aligned}
$$

即 $g=R^{(1)}_3*f$，其中 $R^{(1)}_3=\frac13[1\;1\;1]^\mathsf{T}$；三乘三二维方框核为 $R^{(2)}_3=\frac19\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$（Part 1 第 16--23 页）。核权重和为 1，因此图像均值不变；下划线元素是索引 $(0,0)$ 的参考像素。

这种平均会降低噪声，但也会平滑结构。中值滤波以邻域中位数替代均值，抗离群点，但不再是线性滤波（Part 1 第 24--25 页）。边界没有完整邻域时可采用常数填充、循环、夹持或镜像填充（第 26--27 页；图示详见第 27 页）。

### 二项式滤波

二项式滤波是高斯形状的离散近似，权重来自 $B(0.5,n)$ 的二项分布/帕斯卡三角形。课件给出的例子为

$$
B^{(1)}_2=\frac14[1\;2\;1]^\mathsf{T},\qquad
B^{(1)}_4=\frac1{16}[1\;4\;6\;4\;1]^\mathsf{T}.
$$

二维核由一维核外积得到：

$$
B^{(2)}_2=\frac1{16}
\begin{bmatrix}1\\2\\1\end{bmatrix}[1\;2\;1]
=\frac1{16}\begin{bmatrix}1&2&1\\2&4&2\\1&2&1\end{bmatrix}.
$$

这也是可分离计算的一个实例。对于相同邻域，二项式滤波较方框滤波平滑得更温和；其噪声关系、平滑度和核尺寸的关系见 Part 1 第 35--36 页，系数与二维例子见第 29--34 页。

## 3. 卷积的定义、性质与计算

离散一维、二维卷积定义分别为

$$
c(i)=\sum_{k=-\infty}^{+\infty}a(k)b(i-k),\qquad
c(i,j)=\sum_{k,l=-\infty}^{+\infty}a(k,l)b(i-k,j-l),
$$

记作 $c=a*b$（Part 1 第 39 页）。

**交换律推导。**

$$
\begin{aligned}
c(i)&=\sum_k a(k)b(i-k)\\
&\overset{j=i-k}{=}\sum_j a(i-j)b(j)\\
&=b*a,
\end{aligned}
$$

故 $a*b=b*a$（第 40 页）。此外还有结合律 $a*b*c=(a*b)*c=a*(b*c)$、分配律 $(a+b)*c=a*c+b*c$，以及标量关系 $\lambda(a*b)=(\lambda a)*b=a*(\lambda b)$（第 41 页）。单位冲激与平移、反卷积的说明见第 42--45 页。

**可分离核。** 若多维核能拆为各维的一维核，则称为可分离。课件例子：

$$
B^{(2)}_2=\frac1{16}
\begin{bmatrix}1&2&1\\2&4&2\\1&2&1\end{bmatrix}
=\frac14\begin{bmatrix}1\\2\\1\end{bmatrix}*\frac14[1\;2\;1]
=B^{(1)}_2*(B^{(1)}_2)^\mathsf{T}.
$$

因此两个一维卷积比一次二维卷积高效（第 46--47 页）。多个平滑核串接仍是平滑核；二项式核满足 $B_n=B_1*\cdots*B_1$（共 $n$ 次，见第 48 页）。积分图 $s(i,j)=\sum_{i'=1}^{i}\sum_{j'=1}^{j}f(i',j')$ 储存左上矩形累计强度，可高效求任意矩形和并执行方框滤波（第 49--50 页；矩形求和图示详见第 50 页）。

## 4. 一阶导数与梯度

对单位采样间隔，前向差分从定义得到

$$
f'(i)\approx\frac{\Delta f}{\Delta x}
=\frac{f(i+1)-f(i)}{i+1-i}
=f(i+1)-f(i).
$$

令 $\Delta=[1\;-1]^\mathsf{T}$，按卷积的索引写法有

$$
\Delta*f=\sum_{k=-1}^{0}\Delta(k)f(i-k)=f(i+1)-f(i),
$$

从而 $f'(i)\approx\Delta*f$（Part 2 第 16--18 页）。为同时考虑左右像素，中心差分为

$$
f'(i)\approx\frac{f(i+1)-f(i-1)}{2},
\qquad
\Delta=\frac12[1\;0\;-1]^\mathsf{T}.
$$

该核又可由二项平滑核与梯度核的卷积得到：

$$
\frac12[1\;0\;-1]^\mathsf{T}
=\frac12[1\;1]^\mathsf{T}*[1\;-1]^\mathsf{T}.
$$

故它是原始梯度核的平滑版本（第 19--22 页）。导数核含负权重且权重和为 0，所以常量信号的一阶导数为 0（第 23 页）。

二维中 $\nabla=[\partial/\partial x\;\;\partial/\partial y]^\mathsf{T}$，因此

$$
\nabla g=\nabla*g=\begin{bmatrix}g_x\\g_y\end{bmatrix},\qquad
|\nabla g|=\sqrt{g_x^2+g_y^2},\qquad
\alpha=\operatorname{atan2}(g_y,g_x).
$$

它们分别给出梯度的两个图像分量、幅值与方向（第 25--27 页）。示例图详见第 28 页。

## 5. Sobel、Scharr、二阶导数与 Laplace

Sobel 把二项平滑与一阶梯度组合为 3×3 核：

$$
\begin{aligned}
\Delta_x&=(B^{(2)}_2)^\mathsf{T}*\frac12[1\;0\;-1]
=\frac18\begin{bmatrix}1&2&1\\0&0&0\\-1&-2&-1\end{bmatrix},\\
\Delta_y&=B^{(2)}_2*\frac12[1\;0\;-1]
=\frac18\begin{bmatrix}1&0&-1\\2&0&-2\\1&0&-1\end{bmatrix}.
\end{aligned}
$$

第 29--31 页给出了这两个方向核和边缘检测例子。Scharr 使用不同的平滑核；课件指出其梯度方向估计约比 Sobel 准 10 倍、典型误差小于 0.5 度（第 32--34 页）。

**二阶导数推导。** 用一阶差分核连续卷积：

$$
\frac{\partial^2f}{\partial x^2}
=\frac{\partial}{\partial x}*\frac{\partial}{\partial x}*f
=\begin{bmatrix}1\\-1\end{bmatrix}*
\begin{bmatrix}1\\-1\end{bmatrix}*f
=\begin{bmatrix}1\\-2\\1\end{bmatrix}*f.
$$

二维二阶信息由 Hessian 矩阵

$$
H(f)=\begin{bmatrix}
\partial^2f/\partial x^2&\partial^2f/(\partial x\partial y)\\
\partial^2f/(\partial y\partial x)&\partial^2f/\partial y^2
\end{bmatrix}
$$

组织（第 36--40 页）。Laplace 用于边缘检测：

$$
\Delta_L=\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}
=\frac12\begin{bmatrix}1&0&1\\0&-4&0\\1&0&1\end{bmatrix}.
$$

课件还给出较平滑版本 $\Delta_L=\frac14\begin{bmatrix}1&2&1\\2&-12&2\\1&2&1\end{bmatrix}$（第 42--43 页）；效果例子详见第 44 页。

## 6. 复习要点

- 卷积把“邻域加权组合”写成统一算子；核的形状决定平滑或导数性质。
- 方框核是均匀平均；二项式核用帕斯卡系数构造更接近高斯的平滑。
- 一阶差分核求变化，平滑后形成中心差分与 Sobel；二阶差分形成 Hessian 和 Laplace。
- 可分离核和积分图分别降低常规卷积与方框滤波的计算代价。
