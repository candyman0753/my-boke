## 目前问题

代码开发环境与生产环境差异引起的兼容性问题

## 解决方案

1. 虚拟机；系统级别，资源占用多；启动慢，分钟级；性能较弱
2. linux 容器：进程级别，资源占用少；启动快，秒级；性能接近原生

```
Docker 就是基于 linux 容器的封装，提供容器使用接口
```

## 应用

1. 提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
2. 提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
3. 组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

## 常用命令

### 镜像管理

1. 拉取镜像；镜像标签可省略，默认拉取最新版本；本地无镜像时会自动去 docker hub 下载
   ```
   docker pull image-name[:tag]
   ```
2. 查看本地所有镜像

   ```
   docker images
   ```

3. 删除镜像；若镜像被某个容器引用，则需要先销毁容器

   ```
   docker rmi -f image-name[:tag]/image-id
   # -f 强制删除
   ```

4. 搜索镜像；在 docker hub 搜索

   ```
   docker search keywords
   ```

5. 更新镜像

   ```
   docker commit -m="descrition" -a="author" container-name/id image-name[:tag]
   # -m 描述
   # -a 作者
   ```

6. 构建镜像

   -- 创建 Dockerfile 文件

   ```
   FROM python
   MAINTAINER auth-name <auth@gamil.com>
   COPY . /app
   WORKDIR /app
   RUN pip install -r requirements.txt
   EXPORT 5000
   ENTRYPOINT ["python"]
   CMD ['app.py']
   ```

   ```
    # FROM <images-name> 指定基础镜像

    # MAINTAINER 指定镜像作者信息

    # COPY <src> <dest> 复制主机目录<src>到容器目录<dest>

    # WORKDIR /path/to/work/dir 为容器命令设置当前工作路径

    # RUN <command> 用于容器内部执行命令，在 image 构建阶段执行，每个命令相当于在原有镜像基础上添加一个改动层

    # EXPOSE <port> [<port>...] 指定对外开放的端口

    # ENTRYPOINT ['executable', 'param1', 'param2'] 让容器变为可执行程序，存在多个时，最后一个生效

    # CMD ['executable', 'param1', 'param2'] 用于启动容器后的默认执行指令，存在多个时，最后一个生效
   ```

   -- 构建新镜像

   ```
   docker build ./ -t demo/tomcat:v1.0.0
   # ./ Dockerfile 路径，默认当前目录
   # -t 指定新镜像名字和 tag
   ```

### 容器管理

1.  查看容器

    ```
    docker ps -a -q

    # -a 查看所有运行及未运行的容器
    # -q 只查看容器 id
    ```

2.  运行容器

    ```
    docker run --name CustomName -i -t --rm -p HostPort:ContainerPort -d -v HostDirectory:ContainerDirectory:ro container-name/id

    # --name 自定义容器名 CustomName
    # -i 以交互模式运行
    # -t 分配一个伪终端，即命令行工具
    # -p 映射端口，将主机端口 HostPort 映射到容器端口 ContainerPort
    # -d 后台运行
    # -v 指定挂载主机目录 HostDirectory 到容器目录 ContainerDirectory，默认 rw 可读写，ro 只读
    # --rm 容器退出时自动删除
    ```

3.  进入容器；docker 后台必须运行一个进程，否则容器会退出

    ```
    docker attach container-name/id

    docker exec -it container-name/id /bin/bash

    # 推荐使用 exec，使用 exit 退出容器时不会停止容器

    # /bin/bash 表示进入容器后启动 bash
    ```

4.  操作容器

    ```
    #启动 重启 停止
    docker start container-name/id
    docker restart container-name/id
    docker stop container-name/id
    ```

5.  查看日志
    ```
    docker logs container-name/id
    ```
6.  删除已停止的容器，-f 表强制删除
    ```
    docker rm -f container-name/id
    ```
7.  拷贝文件

    ```
    # 主机 -> 容器
    docker cp HostFilePath container-name/id:ContainerFilePath

    # 容器 -> 主机
    docker cp container-name/id:ContainerFilePath HostFilePath
    ```
