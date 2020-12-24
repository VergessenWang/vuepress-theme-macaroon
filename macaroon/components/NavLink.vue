<template>
  <!-- 内部链接，需要匹配组件 -->
  <router-link
    class="nav-link"
    v-if="!isExternal(link)"
    :to="link"
    :exact="exact"
  >
    {{ item.text }}
  </router-link>
  <!-- 外部链接，根据类型做不同的跳转 -->
  <!-- rel 属性指定从源文档到目标文档的关系 -->
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <OutboundLink />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../lib/utils.js";
export default {
  name: "NavLink",
  // 从父组件传进来的带有路由信息的对象
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    // 返回外部链接或者规范后的html url
    link() {
      return ensureExt(this.item.link);
    },
    /*   // 多语言支持
    locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  } */
    exact() {
      // 如果支持多语言，则匹配对应的根目录
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          (rootLink) => rootLink === this.link
        );
      }
      return this.link === "/";
    },
  },
  methods: {
    isExternal,
    isMailto,
    isTel,
  },
};
</script>