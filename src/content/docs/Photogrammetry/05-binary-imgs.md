---
title: '05 二值图像与常用操作'
description: '二值图像、连通域、距离变换与形态学操作。'
order: 5
tags: ['摄影测量', '图像处理']
---

> 来源：`/home/gracekite/Documents/MyFiles/CV_Learning/Slides/T1/2021-pho1-05-binary-imgs.pptx.pdf`  
> 页数：63 页  
> 作者：Cyrill Stachniss（Photogrammetry & Robotics Lab）

---

## 1. 二值图像（Binary Image）

### 1.1 定义

- 与灰度图像（每个像素通常取 $0 \sim 255$）不同，**二值图像**的色深为 **1 bit**。
- 每个像素只能是 **黑或白**，对应取值为 $0$ 或 $1$（也常表示为 $0$ 或 $255$）。

### 1.2 典型应用场景

| 应用 | 说明 |
|------|------|
| 扫描文档（Scanned documents） | 文字与背景的分离 |
| 手写数字（Handwritten digits） | 字符识别预处理 |
| 背景减除（Background subtraction） | 提取运动前景目标 |

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 2–3 页。

---

## 2. 连通域（Connected Components）

### 2.1 直观目标

在很多应用中，需要判断哪些前景像素属于同一个连通整体，例如把字符彼此分开。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 4–5 页。

### 2.2 连通性定义

两点 $A$、$B$ 称为连通的，当且仅当存在一条从 $A$ 到 $B$ 的路径，且路径上的所有点都属于同一连通分量。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 6 页。

### 2.3 像素邻域（Neighborhoods on Grids）

为了判断连通性，需要先定义像素之间的邻域关系。幻灯片中介绍了两种最常用的邻域：

#### 2.3.1 N4 邻域（4-邻域 / 城市街区 / Manhattan）

只考虑上下左右四个像素：

$$
\mathcal{N}_4(i,j) = \{ (i,j-1),\, (i-1,j),\, (i,j+1),\, (i+1,j) \}
$$

#### 2.3.2 N8 邻域（8-邻域）

除上下左右外，还包括四个对角像素：

$$
\begin{aligned}
\mathcal{N}_8(i,j) = \{ &(i,j-1),\, (i-1,j-1),\, (i-1,j),\, (i-1,j+1),\\
&(i,j+1),\, (i+1,j+1),\, (i+1,j),\, (i+1,j-1) \}
\end{aligned}
$$

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 7–9 页。

### 2.4 基于图的方法（Graph-based Labeling）

#### 2.4.1 思路

1. 把每个前景像素看成图中的一个节点；
2. 若两个前景像素互为 N8（或 N4）邻居，则在它们之间连一条边；
3. 对图中的节点进行标号，同一连通分量使用同一标号。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 10–11 页。

#### 2.4.2 标号算法的非形式化描述

1. 任选一个未标号的节点，赋予一个新标号；
2. 对已标号节点的所有未标号邻居，赋予相同标号；
3. 重复步骤 2，直到没有新的未标号邻居；
4. 重复步骤 1，直到所有节点都被标号。

这种方法也被称为 **"brushfire" 方法**。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 12 页。

#### 2.4.3 形式化算法

输入：二值图像 $b(i,j) \in \{0,1\}$  
输出：连通分量数 $K$，分量图像 $k(i,j) \in \{0:K\}$

```
1  K = 0, k(i,j) = 0
2  repeat
3      找到 (i,j) 满足 b(i,j)=1 且 k(i,j)=0
4      S := {(i,j)}
5      K := K + 1
6      k(i,j) := K
7      repeat
8          找到 S 中未标号的前景邻居 N(S | b=1, k=0)
9          对所有 (i,j) ∈ N(S)，令 k(i,j) = K
10         S := S ∪ N(S)
11     until N(S) = ∅
12 until 不存在未标号的前景像素
```

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 13–16 页。

#### 2.4.4 算法性质

- 能找到所有连通分量；
- 对一般图都适用；
- **缺点**：没有利用图像网格化的邻域结构，效率可进一步提升。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 17 页。

### 2.5 利用网格结构的单遍标号算法

#### 2.5.1 核心思想

- 只遍历图像一次（从左到右、从上到下）完成临时标号；
- 对当前前景像素，根据其已处理的邻居（如上方、左方）决定标号；
- 若同一个连通分量被赋予了不同临时标号，则使用 **等价表（equivalence table）** 记录它们之间的等价关系；
- 最后再用等价表把所有临时标号归并到最小标号。

对于 N4 邻域，当前像素的判断规则如下：

| 情况 | 操作 |
|------|------|
| 上方和左方均无前景 | 赋予新标号 |
| 上方和左方标号相同 | 复制该标号 |
| 上方和左方标号不同 | 复制其中一个（如 min 或 max），并在等价表中记录等价关系 |

该思想可直接推广到 N8 邻域。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 18–20 页。

#### 2.5.2 形式化算法

输入：二值图像 $b(i,j) \in \{0,1\}$  
输出：连通分量数 $K$，分量图像 $k(i,j) \in \{0:K\}$

```
1  K = 0, 等价表 E = ∅
2  for i = 0 : I-1
3      for j = 0 : J-1
4          if b(i,j) == 1
5              A = N(i,j) 中已标号的邻居
6              if |A| == 0
7                  K := K + 1
8                  k(i,j) := K
9              if |A| ≥ 1
10                 k(i,j) := min(k(A))     // 也可用 max
11                 for all x ∈ A 且 k(x) ≠ k(i,j)
12                     E := E ∪ {k(i,j), k(x)}
13  用前面的算法计算等价表 E 的连通分量
14  将 k(i,j) 替换为等价图中最小的标号
```

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 21 页。

#### 2.5.3 算法性质

- 利用网格邻域结构；
- 标号阶段只需一次遍历；
- 需要第二次遍历消除重复标号；
- 复杂度关于前景像素数线性。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 24 页。

---

## 3. 距离变换（Distance Transform）

### 3.1 目的

距离变换用于计算图像中每个像素到其所在连通分量边界的距离。典型应用包括：

- 最近邻问题；
- 测距传感器模型；
- 地图可视化；
- 用户交互界面。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 25–26 页。

### 3.2 定义

对前景像素的距离变换定义为：

$$
d(r,c) = \begin{cases}
\displaystyle \min_{(u,v) \in \partial R} D_x\bigl((r,c),(u,v)\bigr), & \text{if } b(r,c)=1 \\[6pt]
0, & \text{otherwise}
\end{cases}
$$

其中 $\partial R$ 表示区域边界，$D_x$ 为所选距离函数。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 27 页。

### 3.3 常用距离函数

幻灯片中主要给出两种近似距离：

| 名称 | 公式 | 说明 |
|------|------|------|
| N4 距离（Manhattan） | $D_4\bigl((r,c),(u,v)\bigr) = |u-r| + |v-c|$ | 只能沿四个方向移动 |
| N8 距离（Chebyshev） | $D_8\bigl((r,c),(u,v)\bigr) = \max(|u-r|,|v-c|)$ | 允许沿八个方向移动 |

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 27 页。

### 3.4 两遍扫描算法

距离变换可以通过类似连通域的方式，用两次遍历完成：

1. **第一遍**：从上到下、从左到右扫描；
2. **第二遍**：从下到上、从右到左扫描；
3. 始终保留当前遇到的最小距离。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 29–33 页。

#### 3.4.1 N4 距离变换

**初始化：**

$$
\forall (r,c),\quad d(r,c) = \begin{cases}
\text{max}, & \text{if } b(r,c)=1 \\
0, & \text{otherwise}
\end{cases}
$$

**第一遍（左上到右下）：**

$$
d(r,c) = \min\bigl[ d(r,c),\, d(r,c-1)+1,\, d(r-1,c)+1 \bigr]
$$

**第二遍（右下到左上）：**

$$
d(r,c) = \min\bigl[ d(r,c),\, d(r,c+1)+1,\, d(r+1,c)+1 \bigr]
$$

#### 3.4.2 N8 距离变换

**初始化**与 N4 相同。

**第一遍（左上到右下）：**

$$
\begin{aligned}
d(r,c) = \min\bigl[ &d(r,c),\, d(r,c-1)+1,\, d(r-1,c)+1,\\
&d(r-1,c-1)+1,\, d(r-1,c+1)+1 \bigr]
\end{aligned}
$$

**第二遍（右下到左上）：**

$$
\begin{aligned}
d(r,c) = \min\bigl[ &d(r,c),\, d(r,c+1)+1,\, d(r+1,c)+1,\\
&d(r+1,c+1)+1,\, d(r+1,c-1)+1 \bigr]
\end{aligned}
$$

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 35–36 页。

### 3.5 N4 与 N8 距离的几何特征

- **N4 邻域**会**高估**真实的欧氏距离；
- **N8 邻域**会**低估**真实的欧氏距离。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 37–38 页。

### 3.6 组合距离（Combined Distance）

为了得到更接近欧氏距离的近似，可利用 N4 与 N8 的互补性：

- 对角移动的真实代价为 $\sqrt{2}$，可近似为 $\sqrt{2} \approx 3/2$；
- $D_4 + D_8$ 是两倍距离的更好近似；
- 因此定义平均距离：

$$
D_o = \frac{1}{2}(D_4 + D_8)
$$

若直接使用 $D_o = D_4 + D_8$，则可以完全用整数运算实现。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 39 页。

### 3.7 欧氏距离变换（Euclidean Distance Transform, EDT）

- 计算每个像素到最近边界的真实欧氏距离更困难；
- Python（scipy）：`ndimage.morphology.distance_transform_edt`；
- Matlab：`bwdist()`；
- 可参考 Breu et al., 1995。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 40 页。

---

## 4. 形态学操作（Morphological Operators）

### 4.1 从阈值化说起

二值图像通常由阈值化（point operator）得到：

$$
b(a) = \begin{cases}
0, & \text{if } a < T \\
1, & \text{otherwise}
\end{cases}
$$

阈值化后的图像常含有噪声：前景内部有孔洞、背景中有离散的前景噪点等。形态学操作可用于修复这些问题。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 41–44 页。

### 4.2 形态学操作概览

| 操作 | 效果 |
|------|------|
| 腐蚀（erosion） | 收缩前景 |
| 膨胀（dilation） | 扩张前景 |
| 闭运算（closing） | 填充前景内部孔洞 |
| 开运算（opening） | 去除背景中离散的前景噪点 |

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 45 页。

### 4.3 腐蚀（Erosion）

**定义**：若一个前景像素（此处为黑色）的 N4 邻居中存在背景像素，则把它改为背景。

效果：

- 前景收缩；
- 去除小的前景噪点。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 46–49 页。

### 4.4 膨胀（Dilation）

**定义**：若一个背景像素（此处为白色）的 N4 邻居中存在前景像素，则把它改为前景。

效果：

- 前景扩张；
- 填充前景中的小孔洞。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 50–53 页。

### 4.5 腐蚀与膨胀的总结

- **腐蚀**：收缩前景，去除前景离群点；
- **膨胀**：扩张前景，填充孔洞。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 54 页。

### 4.6 开运算与闭运算

#### 4.6.1 开运算（Opening）

- **目的**：去除背景中离散的前景杂点；
- **步骤**：先腐蚀，后膨胀。

#### 4.6.2 闭运算（Closing）

- **目的**：填充前景内部的孔洞；
- **步骤**：先膨胀，后腐蚀。

在实际处理流程中，常先进行开运算再闭运算，可同时去除杂点并填充孔洞。详见 2021-pho1-05-binary-imgs.pptx.pdf 第 55–60 页。

### 4.7 形态学操作的性质

- 可用于消除噪声掩膜；
- 开运算 + 闭运算组合可同时去除杂点并填充孔洞；
- 腐蚀和膨胀都是**局部操作**。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 60 页。

---

## 5. 总结

- 二值图像是多种图像处理应用中的重要工具；
- 核心概念与操作包括：
  - **连通域（Connected Components）**：通过 N4/N8 邻域判断像素连通性；
  - **距离变换（Distance Transforms）**：计算像素到边界的距离，可用两遍扫描实现；
  - **形态学操作（Morphological Operators）**：腐蚀、膨胀、开运算、闭运算，用于修复二值掩膜的噪声。

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 61 页。

---

## 6. 参考文献

- Szeliski, *Computer Vision: Algorithms and Applications*, Chapter 3.3
- Förstner, *Scriptum Photogrammetrie I*, Chapter 6

详见 2021-pho1-05-binary-imgs.pptx.pdf 第 62 页。
