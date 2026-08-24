---
title: '03 图像直方图与简单点运算'
description: '图像直方图、点算子、直方图均衡化与噪声方差均衡化。'
order: 3
tags: ['摄影测量', '图像处理']
---

## 来源

- `2021-pho1-03-img-histo-1-histograms.pptx.pdf`，共 36 页（Part 1：直方图基础）
- `2021-pho1-04-img-histo-2-transformations.pptx.pdf`，共 53 页（Part 2：直方图变换）
- 作者：Cyrill Stachniss

---

# Part 1: Image Histograms and Simple Point Operators

## 1. 灰度图像与图像函数

- 灰度图像可视为二维强度测量网格，也常表示为 $I \times J$ 矩阵，像素值取值范围为 $[0, \dots, 255]$。
- 图像强度可表示为函数
  $$
  g(i,j): \mathcal{B} \mapsto \mathcal{G}
  $$
  其中通常
  $$
  \mathcal{B} = [0, \dots, I-1] \times [0, \dots, J-1], \quad \mathcal{G} = [0, \dots, 255].
  $$

## 2. 图像直方图（Image Histogram）

- 直方图是数值数据分布的近似表示；图像直方图则表示图像强度值的分布。
- 定义：
  $$
  h(g) = \#\{\text{pixel with value } g\}
  $$
  即统计图像中取值为 $g$ 的像素个数。
- 概率（经验概率密度函数，empirical PDF）：
  $$
  p(g) = \frac{h(g)}{N}, \qquad N = I \times J.
  $$
- 计算算法：创建长度为 256 的向量 $h$ 并初始化为 0，对每个像素 $(i,j)$ 执行 $h(g(i,j)){+}{+}$。时间复杂度为 $O(N)$，与像素数成线性关系。

### 累积直方图与经验 CDF

- 累积直方图（cumulative histogram）定义为
  $$
  H(g) = \sum_{x=0}^{g} h(x) = \#\{\text{pixel with } g(i,j) \le g\}.
  $$
- 经验累积分布函数（empirical CDF）为
  $$
  F(g) = P(g(i,j) \le g) = \frac{H(g)}{N}.
  $$
- $p(g)$ 是强度值的经验 PDF，$F(g)$ 是经验 CDF。

## 3. 直方图反映的图像信息

- 强度分布描述图像的亮度、对比度等属性：
  - **Mean（均值）** 描述 **brightness（亮度）**；
  - **Variance（方差）** 描述 **contrast（对比度）**；
  - **Median（中位数）** 是亮度的稳健描述。
- 改变均值的变换会改变图像亮度；改变方差的变换会改变图像对比度（增大方差即增大对比度）。

## 4. 图像算子（Operators）

- 三类算子：
  - **Global operator（全局算子）**：整幅图像参与运算；
  - **Local operator（局部算子）**：基于局部邻域运算；
  - **Point operator（点算子）**：仅根据单个像素的输入值计算输出值。

### 点算子（Point Operator）

- 点算子仅依据输入像素的强度值映射到新值，与其他像素值无关：
  $$
  v_{\text{new}} = f(v).
  $$
- 一般形式为
  $$
  b(i,j) = f(a(i,j), \boldsymbol{p}),
  $$
  其中 $a(i,j)$ 为输入，$b(i,j)$ 为输出，$\boldsymbol{p}$ 为参数。

### 线性函数

- 最基本的函数类为线性函数：
  $$
  f(a, \boldsymbol{p}) = k + m a, \qquad \boldsymbol{p} = [k, m]^\top.
  $$
  因此
  $$
  b(i,j) = k + m \, a(i,j).
  $$
- 线性函数下均值与标准差的传播为
  $$
  \mu_b = k + m \, \mu_a, \qquad \sigma_b = |m| \, \sigma_a.
  $$

### 常见图像变换

| 操作 | 参数条件 | 效果 |
|------|----------|------|
| 增加亮度 | $k > 0$ | 整体变亮 |
| 降低亮度 | $k < 0$ | 整体变暗 |
| 增加对比度 | $m > 1$ | 拉伸强度范围 |
| 降低对比度 | $0 < m < 1$ | 压缩强度范围 |
| 对比度反转 / 负片 | $m = -1$ | 黑白反转 |

- 注：由于像素值被限制在 $[0, 255]$，实际线性映射常需要截断（clamping），并非完全线性。

### 非线性函数

- **阈值化（Thresholding）**：
  $$
  b(a) = \begin{cases} b_0, & a < T \\ b_1, & \text{otherwise} \end{cases}
  $$
  常见取值为 $(b_0, b_1) = (0, 255)$ 或 $(255, 0)$。
- 当 $(b_0, b_1) = (1, 0)$ 或 $(0, 1)$ 时，得到**二值图像（binary image）**。
- **量化（Quantization）**：二值图像是量化的特例；量化即将灰度值舍入到一组离散值。最优编码应选择使舍入误差最小的量化方式。

### 点算子的实现

- 点算子可通过查找表（look-up tables）高效实现：预先计算 256 种可能输出并存入数组，实际运算只需读取内存。

## 5. 彩色图像与摄影中的色调曲线

- 对彩色图像，通常对每个颜色通道分别建立直方图。
- 摄影软件中的 **Tone Curve（色调曲线）** 本质上就是点算子：通过曲线调整输入与输出强度的映射关系，以改变亮度、对比度等。详见 `2021-pho1-03-img-histo-1-histograms.pptx.pdf` 第 34 页。

---

# Part 2: Histogram Transformations

## 1. 从变换函数预测输出直方图

- 已知单调变换 $b = f(a)$ 与输入直方图 $h_a(a)$，可计算输出直方图 $h_b(b)$，并据此设计 $f$。

### PDF 的变换

- 区间 $[a, a+da]$ 内的“面积”被映射到 $[b, b+db]$，像素总数保持不变，因此
  $$
  h_b(b) \, db = h_a(a) \, da.
  $$
- 由此得到
  $$
  h_b(b) = \frac{h_a(a)}{\left|\frac{db}{da}\right|} = \frac{h_a(a)}{|f'(a)|}.
  $$
- 由于 $h_b(b)$ 应依赖于 $b$ 而非 $a$，利用逆函数 $a = f^{-1}(b)$，有
  $$
  h_b(b) = \frac{h_a\bigl(f^{-1}(b)\bigr)}{\bigl|f'\bigl(f^{-1}(b)\bigr)\bigr|}.
  $$

### 线性函数示例

- 若 $b = f(a) = k + m a$，则 $f'(a) = m$，逆函数 $a = f^{-1}(b) = \frac{b-k}{m}$。
- 代入上式得
  $$
  h_b(b) = \frac{h_a\left(\frac{b-k}{m}\right)}{|m|}.
  $$
- 这对应于直方图平移 $k$ 并缩放 $1/m$。

## 2. 直方图均衡化（Histogram Equalization）

- 目标：设计变换，使得输出图像在每个直方图 bin 中的像素数相同，即
  $$
  h_b(b) = \text{const.}
  $$
- 对于单调递增的 $f$，结合 PDF 变换公式
  $$
  h_b(b) = \frac{h_a(a)}{\frac{db}{da}} = k,
  $$
  可得
  $$
  db = \frac{1}{k} h_a(a) \, da.
  $$
- 两边积分：
  $$
  \int db = \int \frac{1}{k} h_a(a) \, da.
  $$
  右侧是输入直方图的积分，即累积直方图 $H(a)$，因此
  $$
  b = f(a) = \frac{1}{k} H(a) + C.
  $$
- 参数 $k, C$ 通常按边界条件选取：
  $$
  f(0) = 0, \qquad f(255) = 255.
  $$
  由于 $H(255) = N$，代入得
  $$
  \frac{1}{k} H(0) + C = 0, \qquad \frac{1}{k} N + C = 255.
  $$
  解得
  $$
  k = \frac{N - H(0)}{255}, \qquad C = -H(0) \frac{255}{N - H(0)}.
  $$
- 最终得到直方图均衡化的点算子：
  $$
  f(a) = \text{round}\left( \frac{255 \, \bigl(H(a) - H(0)\bigr)}{N - H(0)} \right).
  $$
  该式将输入强度谱映射到完整的 $[0, 255]$ 范围。

### 均衡化的效果与说明

- 通常能增强对比度；局部对比度较低的区域获得更大的对比度提升。
- 将强度分布“铺开”到整个直方图。
- **连续情形与离散情形**：连续世界中可得到完全平坦的输出直方图；离散图像由于像素值和 bin 数有限，只能做到“尽可能平坦”，输出直方图呈阶梯状。
- 变体：
  - **AHE（Adaptive Histogram Equalization）**：在局部小块而非整幅图像上做均衡化。
  - **CLAHE（Contrast Limited AHE）**：限制 AHE 在均匀区域中的过度放大。

## 3. 噪声方差均衡化（Noise Variance Equalization）

### 动机：泊松分布

- 光子到达传感器的数量服从泊松分布：
  $$
  P(k) = \frac{(\beta t)^k}{k!} e^{-\beta t},
  $$
  其中 $\beta$ 为每秒平均入射光子数，$t$ 为曝光时间。
- 均值与方差均为
  $$
  \mu_k = \beta t, \qquad \sigma_k^2 = \beta t.
  $$
- 标准差 $\sigma_k = \sqrt{\beta t}$，相对精度为
  $$
  \frac{\sigma_k}{\mu_k} = \frac{1}{\sqrt{\beta t}} = \frac{1}{\sqrt{\mu_k}}.
  $$
- 因此，光子计数越高，方差越大；强度测量带有噪声，且噪声水平与强度相关。

### 方差均衡化推导

- 假设强度 $a$ 的方差与强度成正比：
  $$
  \sigma_a^2 = m a.
  $$
- 目标：使输出 $b$ 的标准差对所有强度均为常数：
  $$
  \sigma_b = \sigma_0 = \text{const.}
  $$
- 对单调递增函数 $b = f(a)$，方差传播给出
  $$
  \sigma_b = \frac{db}{da} \sigma_a \stackrel{!}{=} \sigma_0.
  $$
- 代入 $\sigma_a = \sqrt{m a}$ 并整理：
  $$
  db = \frac{\sigma_0}{\sigma_a} da = \frac{\sigma_0}{\sqrt{m}} a^{-\frac{1}{2}} da.
  $$
- 积分得
  $$
  b = f(a) = \frac{2 \sigma_0}{\sqrt{m}} \sqrt{a} + C.
  $$
- 取 $C = 0$ 使得 $a = 0 \Rightarrow b = 0$；再选择 $\sigma_0$ 使得 $a = 255 \Rightarrow b = 255$，即
  $$
  255 = \frac{2 \sigma_0}{\sqrt{m}} \sqrt{255}.
  $$
- 最终得到
  $$
  b = f(a) = \sqrt{255} \, \sqrt{a}.
  $$
- 该平方根函数会**拉伸暗部**、**压缩亮部**，从而使所有像素强度具有相同的噪声方差。

---

# 总结

1. **图像直方图**表示图像强度分布，可用于分析亮度、对比度等特性。
2. **点算子**是最简单的图像变换，仅依据单个像素值进行映射，可用查找表高效实现。
3. **线性变换**调整亮度（$k$）和对比度（$m$）；**阈值化/量化**是非线性点运算的重要例子。
4. 单调点算子下输出直方图可由输入直方图与变换函数导出：$h_b(b) = h_a(a) / |f'(a)|$。
5. **直方图均衡化**通过累积直方图将强度映射到整个动态范围，增强对比度。
6. **噪声方差均衡化**利用方差传播推导平方根变换，使不同强度的像素具有相同的噪声方差。
