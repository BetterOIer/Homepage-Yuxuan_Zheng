---
title: '函数与变量作用域'
description: '学习函数定义、参数与返回值，以及局部变量和全局变量的作用域。'
order: 6
---



## 定义与调用函数

函数把输入（参数）、处理过程和输出（返回值）封装起来。课件的第一个函数直接打印问候语：

```python
def greetings(name):
    print(f"Hello {name}, welcome to ARES!")
    return
```

可以传入变量，也可以传入 `input()` 的返回值。

```python
my_name = "Bob"
greetings(my_name)

user_name = input()
greetings(user_name)
```

第二个版本返回字符串，由调用者决定是否打印：

```python
def greetings(name):
    return f"Hello {name}, welcome to ARES!"

my_name = "Bob"
print(greetings(my_name))

user_name = input()
print(greetings(user_name))
```

## 用函数消除重复：海伦公式

课件先写了两遍相同的面积计算：

```python
import math

# 第一个三角形
a1 = 3
b1 = 4
c1 = 5
s1 = (a1 + b1 + c1) / 2
area1 = math.sqrt(s1 * (s1 - a1) * (s1 - b1) * (s1 - c1))
print("第一个三角形面积：", area1)

# 第二个三角形
a2 = 5
b2 = 5
c2 = 6
s2 = (a2 + b2 + c2) / 2
area2 = math.sqrt(s2 * (s2 - a2) * (s2 - b2) * (s2 - c2))
print("第二个三角形面积：", area2)
```

把共同逻辑封装成函数后，主程序更短，也更容易复用和测试：

```python
import math

def triangle_area(a, b, c):
    s = (a + b + c) / 2
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    return area

area1 = triangle_area(3, 4, 5)
area2 = triangle_area(5, 5, 6)

print("第一个三角形面积：", area1)
print("第二个三角形面积：", area2)
```

## 全局变量与局部变量

函数外定义的是全局变量；函数内定义的是局部变量。函数可以读取全局变量，但函数外不能直接访问函数的局部变量。

```python
x = 10  # 全局变量

def test():
    y = 20  # 局部变量
    print(x) # 可以访问全局变量
    print(y)

test()
print(x)  # 可以
print(y)  # NameError
```

内层同名变量会优先于外层变量：

```python
x = 10

def test():
    x = 20
    print("函数内：", x)

test()
print("函数外：", x)
```

使用 `global` 可以在函数内修改全局变量，但会增加代码间的隐式依赖，应尽量少用。

```python
x = 10

def test():
    global x
    x = 20

test()
print(x)
```
