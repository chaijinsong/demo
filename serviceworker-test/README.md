用来测试service worker的特性

eg:
1. 一个service worker监听多次fetch


### 结论
1. service worker的scope首先是控制页面，既html需要在这个指定的scope下，这个页面才会被托管。
2. service worker作用域，如果用户没指定 scope，则service worker作用域就是该sw的js文件所在的目录。 如果指定了 scope ，则service worker作用域就是指定的scope，和sw文件在哪个目录无关。
3. 如果一个sw的scope不是 '/'，那么只有当html文件在sw的scope下，并且发起的请求url符合这个 scope，才能被拦截。否则无法拦截
