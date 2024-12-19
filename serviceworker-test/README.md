用来测试service worker的特性

eg:
1. 一个service worker监听多次fetch




### 结论
1. service worker的scope首先是控制页面，既html需要在这个指定的scope下，这个页面才会被托管。
2. service worker作用域，如果用户没指定 scope，则service worker作用域就是该sw的js文件所在的目录。 如果指定了 scope ，则service worker作用域就是指定的scope，和sw文件在哪个目录无关。