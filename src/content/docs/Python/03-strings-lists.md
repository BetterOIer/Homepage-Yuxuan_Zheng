---
title: '字符串与列表'
description: '学习字符串与列表的索引、切片、格式化、修改和常用操作。'
order: 4
---



## 字符串索引、切片与长度

索引从 0 开始；切片遵循“左闭右开”。

```python
s = "Python"
print(s[0])    # P
print(s[1:4])  # yth
print(len("Python"))  # 6
```

## 拼接、重复与成员检测

```python
s1 = "Hello"
s2 = "World"
print(s1 + " " + s2)  # Hello World

print("Hi" * 3)  # HiHiHi

print("Py" in "Python")      # True
print("py" not in "Python")  # True（区分大小写）
```

## 格式化字符串

课件依次给出了直接转换拼接、`format()`、百分号格式化和 f-string。f-string 最直观，也是现代 Python 的推荐写法。

```python
name = "Alice"
age = 25

print("My name is " + str(name) + ", I'm " + str(age) + " years old.")
print("My name is {}, I'm {} years old.".format(name, age))
print("My name is %s, I'm %d years old." % (name, age))
print(f"My name is {name}, I'm {age} years old.")
```

## 创建列表

列表元素按顺序排列，可以是同一种类型，也可以混合类型、嵌套列表。

```python
lis1 = [1, 2, 3]
lis2 = [1.243, 2.3, 3.14159]
lis3 = ["Bike", "Bus", "Train"]
lis4 = [1, 2, 4.5, "Family", True]
lis5 = [["Dad", 45, 180], ["Mum", 44, 165], ["Sister", 14, 157]]
lis0 = []  # 空列表
```

## 访问、切片和修改列表

负索引从末尾开始，步长写在切片的第三个位置。

```python
my_list = [10, 20, 30, 40, 50]
print(my_list[0])   # 10
print(my_list[-1])  # 50

my_list = [0, 1, 2, 3, 4, 5]
print(my_list[1:4])  # [1, 2, 3]
print(my_list[::2])  # [0, 2, 4]
```

列表是可变对象，可以替换已有元素，也可以追加新元素。

```python
my_list = [1, 2, 3]
my_list[1] = 20
my_list.append(4)
print(my_list)
```
