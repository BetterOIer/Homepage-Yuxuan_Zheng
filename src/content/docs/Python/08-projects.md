---
title: '综合练习'
description: '通过猜数游戏和计算器类综合练习 Python 基础知识。'
order: 9
---



本章保留课件最后两项任务，并提供可运行的参考实现。建议先独立完成，再展开答案。

## 猜数游戏

任务：程序随机生成一个数，让用户反复猜测；每次提示猜大了或猜小了，直到猜中。

### 参考实现

```python
from random import randint

answer = randint(1, 10)

while True:
    guess = int(input("请猜一个 1 到 10 之间的整数："))
    if guess > answer:
        print("猜大了")
    elif guess < answer:
        print("猜小了")
    else:
        print("猜对了！")
        break
```

## 入社考核：计算器类

任务：编写一个计算器类，用静态方法实现加、减、乘、除、整除、平方和开方。

### 参考实现

```python
import math

class Calculator:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def subtract(a, b):
        return a - b

    @staticmethod
    def multiply(a, b):
        return a * b

    @staticmethod
    def divide(a, b):
        return a / b

    @staticmethod
    def floor_divide(a, b):
        return a // b

    @staticmethod
    def square(a):
        return a ** 2

    @staticmethod
    def square_root(a):
        return math.sqrt(a)

print(Calculator.add(8, 3))
print(Calculator.subtract(8, 3))
print(Calculator.multiply(8, 3))
print(Calculator.divide(8, 3))
print(Calculator.floor_divide(8, 3))
print(Calculator.square(8))
print(Calculator.square_root(9))
```

## 继续挑战

- 为除法和整除处理除数为 0 的情况。
- 为开方处理负数输入，或改用 `cmath.sqrt()` 支持复数。
- 给猜数游戏增加输入校验、猜测次数统计与自定义范围。
