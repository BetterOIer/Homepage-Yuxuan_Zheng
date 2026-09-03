---
title: '调用、导入与虚拟环境'
description: '介绍标准库、第三方库、自制模块、导入方式及 Python 虚拟环境。'
order: 8
---



“导入”是把工具箱带进当前程序，“调用”是使用其中的具体工具。

## 官方标准库

标准库随 Python 安装，不需要额外下载。导入整个模块后，使用 `模块名.成员名` 调用。

```python
import math

print(math.sqrt(16))
print(math.pi)
```

也可以只导入模块中的特定成员：

```python
from math import sqrt, pi

print(sqrt(25))  # 5
print(pi)        # 3.1415926...
```

## 第三方库与别名

第三方库要先在终端中安装，再在 Python 中导入。课件以 NumPy 为例：

```bash
pip install numpy
```

```python
import numpy as np

array = np.array([1, 2, 3, 4])
print(array)
print(np.mean(array))
```

课件还展示了不使用别名的写法：

```python
import numpy

a = numpy.array([1, 2, 3])
print(a.mean())
```

## 自制模块

假设同目录的 `my_tools.py` 定义了 `triangle_area` 和 `Dog`，可这样导入和调用：

```python
from my_tools import triangle_area, Dog

area = triangle_area(3, 4, 5)

dog = Dog("Coco")
dog.bark()
# 6.0 / Woof!
```

## 虚拟环境

虚拟环境为每个项目隔离依赖版本。以下命令都在终端执行：

```bash
# 1. 在项目目录中创建虚拟环境
python -m venv .venv
# 2. 激活虚拟环境（Linux / macOS）
source .venv/bin/activate
# 3. 在当前环境里安装第三方库
pip install opencv-python numpy
# 4. 退出虚拟环境
deactivate
# 5. 记录当前项目依赖
pip freeze > requirements.txt
# 6. 在另一台电脑复现环境
pip install -r requirements.txt
```

## 随机数库

`randint(a, b)` 是课件中特别强调的“左右端点都包含”的随机整数函数。

```python
from random import randint
n = randint(1, 10)
print(n)
```
