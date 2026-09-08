---
title: CMD操作
description: 'Notes on CMD操作.'
publishDate: '2022-08-05'
tags: ['技巧']
---

### 设置全屏

<!-- more -->

```cpp
void full_screen()
{   
    HWND hwnd = GetForegroundWindow();
    int cx = GetSystemMetrics(SM_CXSCREEN);            /* 屏幕宽度 像素 */
    int cy = GetSystemMetrics(SM_CYSCREEN);            /* 屏幕高度 像素 */

    LONG l_WinStyle = GetWindowLong(hwnd,GWL_STYLE);   /* 获取窗口信息 */
    /* 设置窗口信息 最大化 取消标题栏及边框 */
    SetWindowLong(hwnd,GWL_STYLE,(l_WinStyle | WS_POPUP | WS_MAXIMIZE) & ~WS_CAPTION & ~WS_THICKFRAME & ~WS_BORDER);

    SetWindowPos(hwnd, HWND_TOP, 0, 0, cx, cy, 0);
}
```
### 获取字体大小
```cpp
COORD get_font_size()
{
    COORD font_size;
    HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
    /* 字体信息 */
    struct CONSOLE_FONT
    {
        DWORD index;
        COORD dim;
    } cfi;
    typedef COORD (WINAPI *PROCGETCONSOLEFONTSIZE)(HANDLE, DWORD);
    typedef BOOL (WINAPI *PROCGETCURRENTCONSOLEFONT)(HANDLE, BOOL, struct CONSOLE_FONT*);

    HMODULE hKernel32 = GetModuleHandle("kernel32");
    PROCGETCONSOLEFONTSIZE GetConsoleFontSize = (PROCGETCONSOLEFONTSIZE)GetProcAddress(hKernel32,"GetConsoleFontSize");
    PROCGETCURRENTCONSOLEFONT GetCurrentConsoleFont = (PROCGETCURRENTCONSOLEFONT)GetProcAddress(hKernel32,"GetCurrentConsoleFont");

    GetCurrentConsoleFont(handle, FALSE, &cfi);             /* 获取当前字体索引信息 */
    font_size = GetConsoleFontSize(handle, cfi.index);      /* 获取当前字体宽高信息[字符宽度及高度所占像素数] */

    return font_size;
}
```

### 获取窗口大小(单位：像素)
```cpp
COORD get_screen_size()
{
    HWND hwnd = GetForegroundWindow();
    COORD size;
    size.cx = GetSystemMetrics(SM_CXSCREEN);            /* 屏幕宽度 */
    size.cy = GetSystemMetrics(SM_CYSCREEN);          /* 屏幕高度 */
    return size;
}
```

### 获取窗口大小(单位：字符)(依赖于get_font_size())
```cpp
COORD get_screen_size()
{
    HWND hwnd = GetForegroundWindow();
    HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);   /* 标准输出缓冲区句柄 */
    int cx = GetSystemMetrics(SM_CXSCREEN);            /* 屏幕宽度 */
    int cy = GetSystemMetrics(SM_CYSCREEN);            /* 屏幕高度 */

    COORD size = get_font_size();
    char cmd[32] = { 0 };
    
    size.X=cx/size.X,
    size.Y=cy/size.Y;
    return size;
}
```

### 设置颜色
```cpp
void SetColor(int fore=7,int back=0)
{
	unsigned char m_color = fore;
	m_color += (back << 4);
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), m_color);
	return;
}
```

### 隐藏光标
```cpp
void HideCursor(){
    CONSOLE_CURSOR_INFO cursor_info={1,0};
    SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE),&cursor_info);
}
```
### 光标移动
```cpp
void GoToxy(int x,int y){
    COORD coord;
    coord.X=y;//这里调换了顺序，否则就是将输出指针移到y行，x列
    coord.Y=x;
    HANDLE a=GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(a,coord);
}
```
### 缓慢输出
```cpp
void slowout(char *p){
    while(1){
        if(*p!=0) printf("%c",*p++);
        else break;
        Sleep(20);
    }
    Sleep(500);
}
```

### 键盘、鼠标检测
#### 初始化
```cpp
#define KEY_DOWN(VK_NONAME) ((GetAsyncKeyState(VK_NONAME) & 0x8000) ? 1:0)
```
#### 键符对照
```
常量名				   对应按键						取值
—————————————————————————————————————————————————————————
VK_LBUTTON             鼠标左键                      0x01
VK_RBUTTON             鼠标右键                      0x02
VK_CANCEL              Ctrl + Break                  0x03
VK_MBUTTON             鼠标中键                      0x04
VK_BACK                Backspace 键       		     0x08
VK_TAB                 Tab 键                        0x09
VK_RETURN              回车键                        0x0D
VK_SHIFT               Shift 键                      0x10
VK_CONTROL             Ctrl 键                       0x11
VK_MENU                Alt 键                        0x12
VK_PAUSE               Pause 键                      0x13
VK_CAPITAL             Caps Lock 键                  0x14
VK_ESCAPE              Esc 键                        0x1B
VK_SPACE               空格键         				 0x20
VK_PRIOR               Page Up 键                    0x21
VK_NEXT                Page Down 键                  0x22
VK_END                 End 键                        0x23
VK_HOME                Home 键                       0x24
VK_LEFT                左箭头键                      0x25
VK_UP                  上箭头键                      0x26
VK_RIGHT               右箭头键                      0x27
VK_DOWN                下箭头键                      0x28
VK_SNAPSHOT            Print Screen 键               0x2C
VK_Insert              Insert 键                     0x2D
VK_Delete              Delete 键                     0x2E
'0' – '9'              数字 0 - 9             0x30 - 0x39
'A' – 'Z'              字母 A - Z             0x41 - 0x5A
VK_LWIN                左WinKey(104键盘才有)         0x5B
VK_RWIN                右WinKey(104键盘才有)         0x5C
VK_APPS                AppsKey(104键盘才有)          0x5D
VK_NUMPAD0            小键盘 0 键                    0x60
VK_NUMPAD1            小键盘 1 键                    0x61
VK_NUMPAD2            小键盘 2 键                    0x62
VK_NUMPAD3            小键盘 3 键                    0x63
VK_NUMPAD4            小键盘 4 键                    0x64
VK_NUMPAD5            小键盘 5 键                    0x65
VK_NUMPAD6            小键盘 6 键                    0x66
VK_NUMPAD7            小键盘 7 键                    0x67
VK_NUMPAD8            小键盘 8 键                    0x68
VK_NUMPAD9            小键盘 9 键                    0x69
VK_F1 - VK_F24        功能键F1 – F24          0x70 - 0x87
VK_NUMLOCK            Num Lock 键                   0x90
VK_SCROLL             Scroll Lock 键                0x91
```
#### 检测鼠标按下
```cpp
while (1){
    if (KEY_DOWN(MOUSE_MOVED)){//判断左键
        printf("你按了鼠标左键");
    }
    else{
        printf("你没按鼠标左键");
    }
    printf("\n");
    if (KEY_DOWN(MOUSE_EVENT)){//判断右键
        printf("你按了鼠标右键");
    }
    else{
        printf("你没按鼠标右键");
    }
    printf("\n");
    if (KEY_DOWN(MOUSE_WHEELED)){//判断滚轮
        printf("你按了鼠标滚轮");
    }
    else{
        printf("你没按鼠标滚轮");
    }
    system("cls");
}
```
#### 检测鼠标位置
```cpp
POINT p;
GetCursorPos(&p);
printf("(%d,%d)\n",p.x,p.y);
```

### 多线程
```cpp
#include<iostream>
#include<thread>
using namespace std;
int main(){
    thread th1(...);//第一个参数为函数名，第二个参数为该函数的第一个参数，如果该函数接收多个参数就依次写在后面。此时线程开始执行。
    thread th2(...);//第一个参数为函数名，第二个参数为该函数的第一个参数，如果该函数接收多个参数就依次写在后面。此时线程开始执行。
}
```
