vuepress 主题开发中....
试图整点可爱的东西抢救一下我的直女审美....


### 踩坑记录

+ 在config.js的head中引入静态资源，需放在同文件夹下的public目录中。这与webpack打包方式有关
+ 答应我，没事别照着官方文档瞎建templates目录，这会导致layout组件无法正确挂载。之前被这个bug卡了一天，在各种目录，配置文件和路径调整之间反复横跳，最后不得已一个一个文件夹排查，终于发现是这个目录导致的。
+ [vuepress各种插件](https://github.com/vuepress/awesome-vuepress#plugins)
