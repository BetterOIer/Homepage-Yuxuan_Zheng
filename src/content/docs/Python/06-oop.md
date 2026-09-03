---
title: '类与面向对象编程'
description: '介绍类、对象、属性、实例方法、静态方法、继承和方法重写。'
order: 7
---



类是对一种事物的描述，对象是按照这份描述创建的具体实例。类把数据（属性）和行为（方法）放在一起管理。

## `__init__` 与 `self`

创建对象时，`__init__()` 会自动运行；`self` 表示当前对象。

```python
class Cat:
    def __init__(self, name, color):
        self.name = name
        self.color = color

cat1 = Cat("小橘", "orange")
cat2 = Cat("小黑", "black")
```

## 属性与实例方法

方法的第一个参数通常是 `self`，借此访问当前对象的属性。

```python
class Dog:
    def __init__(self, name):
        self.name = name  # 属性

    def bark(self):       # 方法
        print(self.name + "：汪！")

dog = Dog("旺财")
dog.bark()
```

## 实例变量与类变量

实例变量属于每个对象；类变量由该类的所有对象共享。

```python
class Cat:
    species = "cat"  # 类变量：所有猫共享

    def __init__(self, name):
        self.name = name  # 实例变量：每只猫不同

cat1 = Cat("小橘")
cat2 = Cat("小黑")

print(cat1.name)     # 小橘
print(cat2.name)     # 小黑
print(cat1.species)  # cat
```

## 静态方法

静态方法不需要 `self`。它与类的主题有关，但不依赖任何具体对象的属性。

```python
class Animal:
    @staticmethod
    def is_valid_age(age):
        return 0 <= age <= 40

print(Animal.is_valid_age(3))   # True
print(Animal.is_valid_age(-1))  # False
```

对比两种方法的最小结构：

```python
class Example:
    def eat(self):
        pass

    @staticmethod
    def check(x):
        pass
```

## 继承与方法重写

子类通过 `class Cat(Animal)` 继承父类。`super().__init__(name)` 调用父类初始化逻辑，再补充子类自己的属性。

```python
class Animal:
    def __init__(self, name):
        self.name = name
        self.species = "animal"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name)
        self.species = "cat"
        self.age = 5
```

子类也可以用同名方法覆盖父类方法：

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def whoami(self):
        print("I'm an animal.")

class Cat(Animal):
    def whoami(self):
        print("I'm a cat.")

class Dog(Animal):
    def whoami(self):
        print("I'm a dog.")

    def bark(self):
        print("Woof!")
```
