---
title: '基本数据类型与运算'
description: '介绍字符串、数值、布尔值、运算符、输入输出和类型转换。'
order: 3
---



## 字符串 `str`

用单引号或双引号括起来的字符序列都是字符串。

```python
"This is a string."
'This is also a string.'
```

三引号可以创建跨行字符串；课件用三对双引号包住了 `Hello World`。

```python
"""Hello World"""
```

## 整数 `int` 与浮点数 `float`

下面把课件交互式解释器中的四则运算改写成可一次运行的表达式。

```python
print(3 + 2)  # 5
print(3 - 2)  # 1
print(2 * 3)  # 6
print(3 / 2)  # 1.5
```

只要运算中有浮点数，结果通常也是浮点数；普通除法 `/` 的结果也是浮点数。

```python
print(0.1 + 0.1)  # 0.2
print(0.2 - 0.1)  # 0.1
print(2 * 0.1)    # 0.2
print(2 / 0.2)    # 10.0
```

浮点数使用有限位二进制表示，因此某些十进制小数不能被精确存储。

```python
print(0.2 + 0.1)  # 0.30000000000000004
print(3 * 0.1)    # 0.30000000000000004（显示细节依 Python 版本而异）
```

## 算术运算符

```python
print(3 + 2)   # 加法：5
print(5 - 3)   # 减法：2
print(2 * 3)   # 乘法：6
print(10 / 2)  # 除法：5.0
print(10 // 3) # 整除：3
print(10 % 3)  # 取余：1
print(2 ** 3)  # 幂运算：8
```

`=` 不是“等于”，而是赋值：

```python
num = 1
num
```

## 布尔值与比较

布尔值 `bool` 只有 `True` 和 `False` 两种取值。

```python
print(3 == 3)  # True
print(3 != 2)  # True
print(5 > 3)   # True
print(2 < 1)   # False
print(5 >= 5)  # True
print(4 <= 3)  # False
```

逻辑运算符用于组合条件，成员运算符用于判断一个元素是否属于某个序列。

```python
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

print("a" in "apple")       # True
print(10 not in [1, 2, 3])   # True
```

## 输入与类型转换

`input()` 返回字符串；若需要整数或小数，要用 `int()` 或 `float()` 转换。

```python
num = int(input("请输入一个数"))
print(num)
```

函数的返回值、变量和值都可以继续作为另一个函数的参数。上例的执行顺序是：`input()` → `int()` → 赋值给 `num` → `print()`。
