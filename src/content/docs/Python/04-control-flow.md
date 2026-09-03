---
title: '程序结构：顺序、分支与循环'
description: '通过 BMI 等示例学习顺序执行、条件分支、循环和流程控制。'
order: 5
---



## 顺序结构：BMI 示例

程序默认从上到下执行。下面依次输入数据、计算 BMI，再格式化输出两位小数。

```python
# 输入身高（米）和体重（千克）
height = float(input("请输入您的身高（米）："))
weight = float(input("请输入您的体重（千克）："))

# 计算 BMI
bmi = weight / (height ** 2)

# 输出 BMI 值
print(f"您的BMI值为：{bmi:.2f}")
```

## `if` 与 `else`

```python
speed = 15

if speed > 10:
    print("超速啦！")
else:
    print("未超速。")
```

## `elif` 多分支

一个分支结构必须有 `if`，可以有任意个 `elif`，也可以没有 `else`。

```python
speed = 15

if speed > 10:
    print("高速！")
elif 5 < speed and speed <= 10:
    print("中速！")
elif 0 < speed and speed <= 5:
    print("低速！")
else:
    print("输入错误！")
```

链式比较能让条件更像数学表达式，例如 `5 < speed <= 10`。

## 嵌套分支

下面用嵌套 `if` 实现与上一段相同的判断。每进入一层代码块，统一缩进 4 个空格。

```python
speed = 15

if speed > 10:
    print("高速！")
else:
    if 5 < speed and speed <= 10:
        print("中速！")
    else:
        if 0 < speed and speed <= 5:
            print("低速！")
        else:
            print("输入错误！")
```

## `for` 循环

`range(start, stop, step)` 依次产生从 `start` 开始、步长为 `step`、严格小于 `stop` 的整数。在 Python 3 中它是可迭代的 `range` 对象；若要看到列表，可写 `list(range(...))`。

```python
print(list(range(1, 11, 1)))
```

课件用 `for` 求 `1 + 2 + ... + n`：

```python
n = int(input("从1加到？"))
sum = 0
for i in range(1, n + 1, 1):
    sum = sum + i
print(sum)
```

> **命名提示**
>
> 这里沿用课件的变量名 `sum`。实际项目中最好改成 `total`，以免遮蔽 Python 内置函数 `sum()`。

## `while` 循环

课件先给出待补全版本，空白处需要让 `i` 递增，否则条件一直为真，会形成死循环：

```python
n = int(input("从1加到？"))
sum = 0
i = 1
while i <= n:
    sum = sum + i
    # 此处必须更新 i
print(sum)
```

补全后的版本如下：

```python
n = int(input("从1加到？"))
sum = 0
i = 1
while i <= n:
    sum = sum + i
    i = i + 1
print(sum)
```

也可以让循环条件恒为真，再在达到目标时用 `break` 退出：

```python
n = int(input("从1加到？"))
sum = 0
i = 1
while True:
    sum = sum + i
    i = i + 1
    if i > n:
        break
print(sum)
```
