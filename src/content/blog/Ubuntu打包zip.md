---
title: Ubuntu打包zip
description: 'Notes on Ubuntu打包zip.'
publishDate: '2023-06-09'
tags: ['IT', 'Ubuntu']
---

在`Linux`系统中，压缩文件夹是经常使用到的操作之一。`zip`是一种常见的压缩格式，`Ubuntu`自带的`zip`命令可以方便地完成文件夹的压缩。本文将介绍`Ubuntu`中使用`zip`命令压缩文件夹的详细步骤。

## 一、安装zip命令
如果您的`Ubuntu`系统没有安装`zip`命令，可以使用以下命令进行安装：
```shell
sudo apt-get update
sudo apt-get install zip
```
输入密码并等待安装完成。

## 二、压缩单个文件夹
在命令行中，使用`zip`命令压缩单个文件夹非常简单。以下是基本的命令格式：

`zip -r 压缩包名.zip` 要压缩的文件夹路径
其中，`-r`参数表示递归压缩子目录。

例如，如果要将目录`/home/user/documents`压缩为`documents.zip`，可以使用以下命令：
```shell
zip -r documents.zip /home/user/documents
```
执行上述命令后，压缩包`documents.zip`将会生成在当前命令行所在目录下。

## 三、压缩多个文件夹
如果要同时压缩多个文件夹，可以在命令行中依次指定要压缩的文件夹路径，并用空格进行分隔。例如，要同时压缩`/home/user/documents`和`/home/user/pictures`两个文件夹，可以使用以下命令：
```shell
zip -r archive.zip /home/user/documents /home/user/pictures
```
执行上述命令后，压缩包`archive.zip`将会生成在当前命令行所在目录下。

## 四、使用过滤器
有时候，在压缩文件夹时，您可能只需要压缩其中的部分文件或目录。`zip`命令提供了一些过滤器选项，可以满足您的需求。

以下是几个常用的过滤器：

`-x`：排除指定的文件或目录。
`-i`：仅包括指定的文件或目录。
例如，要压缩目录`/home/user/documents`，但排除其中的`/home/user/documents/cache`目录，可以使用以下命令：
```shell
zip -r documents.zip /home/user/documents -x /home/user/documents/cache
```
执行上述命令后，压缩包`documents.zip`将会生成在当前命令行所在目录下，其中不包含`/home/user/documents/cache`目录。
