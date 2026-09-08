---
title: Ubuntu关闭图形界面
description: 'Notes on Ubuntu关闭图形界面.'
publishDate: '2023-01-06'
tags: ['IT', 'Ubuntu', 'Linux']
---

实际上本方法不仅仅适用于`Ubuntu22.04`版本，应该也适用于`20.04`等其他版本。

<!-- more -->

关闭图形界面，启用`tty`终端登录的方法如下：

```
sudo systemctl set-default multi-user.target
```

重新启用图形界面的方法：

```
sudo systemctl set-default graphical.target
```

最后重启
```
reboot
```
