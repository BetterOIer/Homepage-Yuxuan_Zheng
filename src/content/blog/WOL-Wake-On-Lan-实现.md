---
title: WOL(Wake On Lan)实现
description: 'Notes on WOL(Wake On Lan)实现.'
publishDate: '2022-12-24'
tags: ['IT', '算法']
---

花了几个月钻研，终于成功啦👏👏👏

<!-- more -->

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <WinSock2.h>
#include<iostream>
#include<fstream>
using namespace std;

const int maxn=1005;
struct node{
    int id;
    string name;
    unsigned char mac[6];
    int port;
}mach[maxn];
int choose,tot=0;
hostent *host;
string s;

void init(){
    ifstream ifs;
    ifs.open("save.bak0", ios::in);
    int temp;
    ifs >>s;
    ifs >>tot;
    for(int i = 0;i<tot;i++){
        ifs >>mach[i].name;
        ifs >>mach[i].id;
        for(int j = 0;j<=5;j++){
            ifs >>temp;
            mach[i].mac[j]=temp;
        }
        ifs >>mach[i].port;
    }
    ifs.close();
}
void save(){
    freopen("save.bak0","w",stdout);
    cout<<s<<endl<<endl;
    cout<<tot<<endl<<endl;
    for(int i = 0;i<tot;i++){
        cout<<mach[i].name<<endl;
        cout<<mach[i].id<<endl;
        cout<<(int)mach[i].mac[0]<<endl;
        cout<<(int)mach[i].mac[1]<<endl;
        cout<<(int)mach[i].mac[2]<<endl;
        cout<<(int)mach[i].mac[3]<<endl;
        cout<<(int)mach[i].mac[4]<<endl;
        cout<<(int)mach[i].mac[5]<<endl;
        cout<<mach[i].port<<endl<<endl;
    }
    fclose(stdin);
}

bool wol(int which){
    unsigned char packet[102];
    struct sockaddr_in addr;
    int sockfd, i,j, on = 1; 

    for(i=0;i<6;i++){
        packet[i] = 0xFF;    
    }
    for(i=1;i<17;i++){
        for(j=0;j<6;j++){
            packet[i*6+j] = mach[which].mac[j];
        }
    }

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST,(char*)&on, sizeof(on));
    if(sockfd < 0){
        return false;
    }
    memset((void*)&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(mach[which].port);
    addr.sin_addr.s_addr = inet_addr(inet_ntoa(*(struct in_addr *)host->h_addr_list[0]));
    sendto(sockfd,(char*)&packet, sizeof(packet), 0, (struct sockaddr *)&addr, sizeof(addr));
    return true;
}
int main(){
    init();
    printf("Welcome back, Better_OIer!\n\n");
    printf("Checking Server IP...");
    
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
    host = gethostbyname(s.c_str());
    while(!host)
    {
        printf("\nGet IP address error!\n");
        printf("Change server name?(y/n):(Default=N)  ");
        char flag;
        cin>>flag;
        if(flag!='y'&&flag!='Y')goto en;
        printf("Enter your new server name: ");
        cin>>s;
        host = gethostbyname(s.c_str());
    }
    printf("Successful!\n");
    printf("Address type: %s\n", (host->h_addrtype == AF_INET) ? "AF_INET" : "AF_INET6");
    printf("IP address: %s\n\n", inet_ntoa(*(struct in_addr *)host->h_addr_list[0]));
    printf("Choose machines you want to wake up:\n");
    for(int i = 0;i<tot;i++){
        printf("%3d %s\n",mach[i].id,mach[i].name.c_str());
    }
    printf("Enter 1 to %d:(0 to wake up all the %d machine): ",tot,tot);
    cin>>choose;
    puts("");
    if(choose==0){
        printf("Waking up all the machine...\n");
        for(int i = 0;i<tot;i++){
            if(wol(i)){
                printf("Successfully wake up %s(id=%d)!!!\n",mach[i].name.c_str(),mach[i].id);
            }else{
                printf("Error when waking up %s(id=%d)!!!\n",mach[i].name.c_str(),mach[i].id);
            }
        }
    }
    else if(choose == 'q'||choose=='Q')goto en;
    else{
        if(wol(--choose)){
            printf("Successfully wake up %s(id=%d)!!!\n",mach[choose].name.c_str(),mach[choose].id);
        }else{
            printf("Error when waking up %s(id=%d)!!!\n",mach[choose].name.c_str(),mach[choose].id);
        }
    }
    en:
    printf("\nQuit in 3s...");
    save();
    Sleep(3000);
    return 0;
}
```

当前配置的`save.bak0`:
```
BetterOIer.tpddns.cn

2

Server
1
80
229
73
23
24
68
10

NEW_DESKTOP
2
180
46
153
235
10
59
9

```
