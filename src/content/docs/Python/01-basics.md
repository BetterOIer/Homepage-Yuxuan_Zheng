---
title: '输出、变量与纠错'
description: '从 Hello World、变量和命名规则开始，学习阅读并修复 Python 报错。'
order: 2
---



## 从 Hello World 开始

`print()` 是 Python 的内置输出函数。字符串需要放在引号中。

```python
print("Hello World!")
```

## 使用变量

变量把名字与一个值关联起来。`msg` 是 `message` 的缩写。

```python
msg = "Hello World!"
print(msg)
```

变量的值可以随时改变；后一次赋值会替换原来的值。

```python
msg = "Hello World!"
print(msg)

msg = "I love python!"
print(msg)
```

## 变量命名

变量名只能包含字母、数字和下划线，不能以数字开头；变量名区分大小写，也不能使用 `if`、`for`、`class` 等关键字。`my_var`、`_name` 合法，`my-var`、`2name` 非法。

## 读懂 Traceback

下面是课件中的故意错误：定义的是 `message`，输出时却写成了 `mesage`。

```python
message = "Hello World!"
print(mesage)
```

运行后会得到 `NameError`。Traceback 会指出出错文件、行号、异常类型，并常常给出拼写建议。修正方法是统一变量名：

```python
message = "Hello World!"
print(message)
```
