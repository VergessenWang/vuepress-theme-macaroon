const path = require("path");
module.exports = {
  // 网站的标题。这将是所有页面标题的前缀，并显示在默认主题的导航栏中
  title: "wallen's blog",
  // 网站描述。这将在页面 HTML 中表现为一个 <meta> 标签。
  description: "I'm trying to develop my vuepress theme",
  // 被注入页面 HTML <head> 额外的标签。每个标签可以用 [tagName, { attrName: attrValue }, innerHTML?] 的形式指定
  // ico 不生效？好坑，这里默认引用的是同目录下的public,所以head引入资源最好统一放在该文件夹中
  head: [
    ['link', { rel: 'icon', type: "image/x-icon", href: '/img/web-title.ico' }]
  ],
  // 
  // 指定此选项来使用自定义主题。使用 “macaroon” 的值，VuePress 将尝试在 node_modules/vuepress-theme-macaroon/Layout.vue 加载主题组件。
  // 如果指定路径呢？
  theme: path.resolve(__dirname, "../../macaroon/"),
  // 为使用的主题提供配置选项。这些选项将根据你使用的主题而有所不同。这也是主题个性化的最重要配置
  themeConfig: {
    // 如下为一些数据结构示例
    // nav: [
    //   {
    //     text: 'Home',
    //     link: '/',
    //     icon: 'el-icon-house',
    //   },
    //   {
    //     text: 'Projects',
    //     link: '/projects/',
    //     icon: 'el-icon-folder',
    //   },
    // ],
    // about: {
    //   fullName: 'Ahmad Mostafa',
    //   bio: 'I am a passionate Software Engineer, I love Vue.js ♥ ...',
    //   image: 'https://www.ahmadmostafa.com/images/bg_1.png',
    // },
    // footer: {
    //   contact: [
    //     {
    //       type: 'github',
    //       link: 'https://github.com/z3by',
    //     },
    //     {
    //       type: 'instagram',
    //       link: 'https://instagram.com',
    //     },
    //     {
    //       type: 'linkedin',
    //       link: 'https://linkedin.com',
    //     },
    //     {
    //       type: 'twitter',
    //       link: 'https://twitter.com',
    //     },
    //   ],
    //   copyright: [
    //     {
    //       text: 'Privacy Policy',
    //       link: 'https://policies.google.com/privacy?hl=en-US',
    //     },
    //     {
    //       text: 'MIT Licensed | Copyright © 2018-present Vue.js',
    //       link: '',
    //     },
    //   ],
    // },
  },
  // 项目的插件
  plugins: [
    // 'crisp',
    // 'seo',
    // 'smooth-scroll',
    // 'reading-progress',
    // '@vuepress/medium-zoom',
    // '@vuepress/nprogress',
    // 'social-share',
    // '@vuepress/google-analytics',
    // [
    //   '@vuepress/pwa',
    //   {
    //     serviceWorker: true,
    //     updatePopup: true,
    //   },
    // ],
    // [
    //   'sitemap',
    //   {
    //     hostname: 'https://vp-modern.z3by.com',
    //   },
    // ],
  ],
}