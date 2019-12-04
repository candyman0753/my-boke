# Git 常用命令

1.  一处修改多支提交  
    场景：公用基础版本，定制功能版本，修改基础版本代码提交到各定制版本，实现代码同步

    操作：

    - 修改 base 分支提交后，通过`git log`查看日志，并记下需要同步的 commit-id，一般是一串 SHA-1

    ```js
    git log
    commit A88643xx63... // 我是commit-id_3
    commit AAAAAAxx63... // 我是commit-id_2
    commit BBBBBBxx63... // 我是commit-id_1
    ```

    - 切换需要同步的分支

    ```js
    git branch // 查看分支
    *base
     example_1

    git checkout example_1 // 切换到目标分支
    ```

    - 提交代码至目标分支，使用`git cherry-pick commit-id`提交代码

    ```js
    // 提交单个
    git cherry-pick BBBBBBxx63
    // 提交多个
    git cherry-pick BBBBBBxx63..A88643xx63
    ```

    ::: tip
    注意 .. 表示`git log`树中 commit-id_1 到 commit-id_3 之间所有 commit，但不包括第一个(此处为 commit-id_1)
    :::

    - 当出现冲突时，先解决冲突，然后使用`git add`添加已解决冲突的文件到暂存区，最后继续同步

    ```js
    git chery-pick --continue
    ```
