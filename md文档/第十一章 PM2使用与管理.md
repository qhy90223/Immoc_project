## 第十一章、 PM2使用与管理

#### 1、安装与启动

```sh
npm i pm2 -g   #安装pm2
```

需要在package.json中配置启动

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"cross-env NODE_ENV=production nodemon app.js",
    "prd":"cross-env NODE_ENV=production pm2 start app.js"
  },
```

启动后可以看到与管理进程

![image-20190415172558084](/Users/qinhuanyu/Library/Application Support/typora-user-images/image-20190415172558084.png)

#### 2、基本常用命令命令

##### (1) pm2启动、重启

```sh
pm2 start <path>[list] #启动pm2，可以为多个文件
pm2 restart <appid>/<app_name>  #查看进程
pm2 delete <appid>/<app_name>  	#删除进程
pm2 stop <appid><app_name>      #停止进程
```

##### (2) 查看信息

通过pm2 info 可以查看pm2进程信息

```sh
pm2 info <appid>/<app_name>  		#查看进程
```

![image-20190415173935812](/Users/qinhuanyu/Library/Application Support/typora-user-images/image-20190415173935812.png)

##### (3) 日志

命令：`pm2 log`

将代码中直接增加`console.log(...)/console.err(…)`,pm2能够自动将信息吸入日志之中



##### (4) 线上监听

命令：`pm2 monit`

能够在线上，看到日志信息

![image-20190415181755154](/Users/qinhuanyu/Library/Application Support/typora-user-images/image-20190415181755154.png)

#### 3、PM2进程守护、常用配置、多进程

##### (1) 进程守护

***<u>PM2进程守护是指服务进程报错时，会自动重启进程，保证正常的服务能够进行，甚至当kill -9 pm2进程时，也会重启开启另一个进程，保证同样服务，比如 访问localhost:8000/err 抛出`throw new Error()`，服务崩溃后，又重新访问正常的localhost:8000时，服务能够保证正常。</u>***

#####  (2) 常用配置与多进程

进程占用内存是受限的，1个进程无法利用全部内存和多核cpu，多进程内存数据无法共享，可以使用redis进行内存多进程内存共享。

```json
{
  "apps":{
    "name":"pm2-test-server",     
    "script":"app.js",        		 //入口文件
    "watch":true,                  //文件改变监听，不用重启进程
    "ignore_watch":[               //忽略监听的文件夹
      "node_modules",
      "logs"
    ],
    "error_file":"logs/err.log",   //错误日志路径
    "out_file":"logs/out.log",		 //模拟日志路径
    "log_date_format":"YYYY-MM-DD HH:mm:ss"  //日志前面时间
    "instances":4                  //进程设置，与<=nignx最大进程数量
  }
}
```



