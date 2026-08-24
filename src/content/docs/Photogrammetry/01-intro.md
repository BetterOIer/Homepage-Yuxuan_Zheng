---
title: '01 摄影测量学导论'
description: '摄影测量的定义、核心问题、传感器、应用领域与课程概览。'
order: 1
tags: ['摄影测量', '计算机视觉']
---

> **来源**：`/home/gracekite/Documents/MyFiles/CV_Learning/Slides/T1/2021-pho1-01-intro.pptx.pdf`
> **作者**：Cyrill Stachniss
> **页数**：共 61 页
> **说明**：本笔记依据该幻灯片整理，图片示例请直接参阅原 PDF 对应页码。

---

## 1. 摄影测量学的定义

### 1.1 词源

- **photos** = light（光）
- **gramma** = to draw（描绘）
- **metron** = to measure（测量）
- **Photogrammetry** = measuring with light (photographs)，即用光（照片）进行测量。

### 1.2 学术定义

> “Estimation of the geometric and semantic properties of objects based on images or observations from similar sensors.”
>
> 基于图像或类似传感器的观测，估计物体的几何与语义属性。

其中 **similar sensors** 指与相机类似的成像/测距传感器，例如激光雷达（LiDAR）等。

---

## 2. 两大核心问题

摄影测量主要解决两类问题：

| 问题 | 含义 | 示例（详见原幻灯片） |
|---|---|---|
| **几何估计（Estimating geometry）** | 从图像恢复三维结构、位置、形状 | 第 4、19、41、42 页 |
| **语义估计（Estimating semantics）** | 理解图像中物体的类别与含义 | 第 4、19、34、49 页 |

---

## 3. 我们测量什么？

- **Camera localization**：相机定位
- **Determine the location of objects**：确定物体位置
- **3D reconstruction**：三维重建
- **Similarities & data association**：相似性度量与数据关联
- **Object detection**：目标检测
- **Semantic interpretation**：语义解释

---

## 4. 涉及的学科与交叉领域

### 4.1 四大学科交叉

- Traditional photogrammetry（传统摄影测量）
- Computer vision（计算机视觉）
- Machine learning（机器学习）
- Robotics（机器人学）

### 4.2 与其他领域的联系

- 源于测绘需求，属于 **geodetic sciences（大地测量科学）** 的一部分；
- 是光学 **remote sensing（遥感）** 的一种形式；
- 数字摄影测量与 **image processing（图像处理）**、**computer vision（计算机视觉）** 联系紧密；
- 与 **state estimation（状态估计）**、**robotics（机器人学）** 有强关联；
- 越来越多地使用 **machine learning（机器学习）** 方法。

---

## 5. 摄影测量的优势

### 5.1 非接触式感知

- **Contact-free sensing**：无需接触被测对象。
- 适用场景：
  - 难以到达但可见的区域（inaccessible but visible areas）
  - 敏感材料（sensitive material）
  - 高温/低温材料（hot/cold material）
  - 有毒材料（toxic material）

### 5.2 数据获取与覆盖

- 相对容易获取大量测量数据；
- 可对较大区域进行密集覆盖；
- 分辨率灵活：可追求小而精确，也可追求大而粗略；
- 既支持 **2D sensing**，也支持 **3D sensing**。

### 5.3 其他优势

- 能够记录动态场景（dynamic scenes）；
- 不仅能获取几何，还能进行图像解释、语义推断、分类等；
- 数据可被人类直接理解；
- 记录的图像本身可作为测量过程的文档；
- 支持自动数据处理；
- 具备实时处理的可能性。

---

## 6. 摄影测量的劣势

> “There is no free lunch!”

- 需要光源（light source is needed）；
- 相机仅测量特定方向上的光强；
- 存在遮挡与可见性约束（occlusions and visibility constraints）；
- 单张图像是三维世界在二维像平面上的投影；
- 其他技术可能在测量精度上更高。

---

## 7. 从成像到三维感知

### 7.1 相机用于测量方向

图像中的一个像点定义了一条从相机光心指向物体点的射线（ray）。

> 详见原 PDF 第 15 页的示意图。

### 7.2 三维感知与三角化

- 从多个不同方向观测同一点，可通过 **triangulation（三角化）** 估计该点的三维位置。
- 这是摄影测量从 2D 图像恢复 3D 几何的核心原理。

> 详见原 PDF 第 16 页。

---

## 8. 正向映射与逆向映射

### 8.1 从物体到图像（正向过程）

```
object (geometry, location, type, ...)  ──┐
                                         ├──> physics ──> image
camera (intrinsics, extrinsics)  ────────┘
```

- **object**：物体的几何、位置、类别等属性；
- **camera**：相机的内参（intrinsics）与外参（extrinsics）；
- **physics**：成像物理过程；
- **image**：最终得到的图像。

### 8.2 逆向映射

摄影测量的目标是反过来的：从图像反推物体与相机参数。

```
images ──> algorithm <── physics
                │
                ├──> object ──> geometry, location, type, ...
                │
                └──> camera ──> intrinsics, extrinsics
                │
        background knowledge
```

- **background knowledge（先验知识）** 对求解至关重要；
- 算法同时估计 **object** 与 **camera** 的参数。

> 详见原 PDF 第 17–18 页。

---

## 9. 人类感知实验：算法的重要性

### 9.1 人类感知流程

```
object ──> eye ──> brain ──> interpretation
```

问题：eye 与 brain，谁完成了大部分工作？

### 9.2 实验

- 受试者：先天失明者；
- 相机记录场景；
- 图像通过“每像素一根针”的方式印在受试者皮肤上；
- 结果：受试者能够识别不同物体并解释场景。

### 9.3 结论

> “The brain does most of the work, so algorithms are central!”
>
> 大脑完成了大部分解释工作，因此**算法是核心**。

摄影测量中，从图像估计几何与语义需要强大的算法支撑；实现（implementation）是理解方法的关键，编程是必须掌握的工具。

> 详见原 PDF 第 20–23 页。

---

## 10. 典型传感器

| 传感器类型 | 说明 | 对应页 |
|---|---|---|
| **Industrial cameras（工业相机）** | 精度高、可控性强 | 第 25 页 |
| **Consumer cameras（消费级相机）** | 如单反、微单 | 第 26 页 |
| **Microsoft Ultracam（Bing Maps）** | 航空大幅面多光谱相机 | 第 27 页 |
| **Laser range finders（激光测距仪/LiDAR）** | 直接测量距离，如 Velodyne、Sick、Faro | 第 28 页 |

> 图片示例详见原 PDF 第 25–28 页。

---

## 11. 应用领域

### 11.1 地图（Maps）

- 利用航空/卫星影像生成地图。
- 详见原 PDF 第 30–31 页。

### 11.2 地形模型（Terrain Models）

- 构建数字高程模型（DEM/DSM）。
- 详见原 PDF 第 32 页。

### 11.3 环境监测（Environment Monitoring）

- 无人机航拍农田，分析作物生长状况。
- 详见原 PDF 第 33–34 页。

### 11.4 分割与实例（Segmentation and Instances）

- 区分作物与杂草，标记每株作物的实例。
- 详见原 PDF 第 35–36 页。

### 11.5 航空测绘（Aerial Mapping）

- 无人机采集数据，恢复建筑物等三维结构。
- 详见原 PDF 第 37–38 页。

### 11.6 正射影像（Orthophotos）

- 经几何纠正后的航拍影像，可直接用于量测。
- 详见原 PDF 第 39 页。

### 11.7 城市测绘（City Mapping）

- 车载/机载系统获取城市街景与三维信息。
- 详见原 PDF 第 40 页。

### 11.8 三维城市模型（3D City Models）

- 从多角度影像重建城市三维模型。
- 详见原 PDF 第 41–42 页。

### 11.9 文化遗产数字化保护（Digital Preservation of Cultural Heritage）

- 对洞穴、古迹等进行三维扫描与重建。
- 示例：罗马的 **Catacombs of Priscilla（普iscilla 地下墓穴）**。
- 详见原 PDF 第 43–47 页。

### 11.10 机器人学（Robotics）

- 割草机器人、扫地机器人、自动驾驶汽车、服务机器人等。
- 详见原 PDF 第 48 页。

### 11.11 机器人中的语义理解（Semantics in Robotics）

- 对道路场景进行语义分割，识别车辆、行人、植被等。
- 详见原 PDF 第 49 页。

### 11.12 视觉定位（Visual Localization）

- 判断不同时间、不同季节、不同光照下拍摄的场景是否为同一地点。
- 是极具挑战性的图像匹配问题。
- 详见原 PDF 第 50–52 页。

### 11.13 自动驾驶汽车（Robotic / Autonomous Cars）

- 车载 LiDAR 获取周围环境的点云；
- 相机与 LiDAR 均可用于语义分割；
- 需要同时估计：
  - **poses（位姿）**
  - **3D geometry（三维几何）**
  - **semantics（语义）**
  - **instances（实例）**
  - **tracking（跟踪）**
  - **predictions（预测）**

> 详见原 PDF 第 53–57 页。

---

## 12. 课程内容与目标

- 本模块（Photogrammetry I + II）旨在提供摄影测量的基础；
- 为后续有趣且激动人心的应用奠定关键基础模块。

---

## 13. 参考文献

课程使用的主要参考书目：

- Förstner & Wrobel: *Photogrammetric Computer Vision*
- Förstner: *Photogrammetrie I Skriptum*
- Szeliski: *Computer Vision: Algorithms and Applications*. Springer, 2010
- Alpaydin: *Introduction to Machine Learning*, 2009
- Hartley & Zisserman: *Multiple View Geometry in Computer Vision*, 2004

> 详见原 PDF 第 60 页。

---

## 14. 幻灯片版权信息

- 幻灯片由 Cyrill Stachniss 制作；
- 部分图片/视频来源于 Stingray、ImagingSource、UniQ、Nikon、Sony、Fuji、Microsoft、Velodyne、Sick、Faro、Google Maps、NEXTMap、SIGPAC、GeoAutomation、van Gool、Früh、Google/Waymo 等；
- 联系方式：cyrill.stachniss@igg.uni-bonn.de

> 详见原 PDF 第 61 页。
