<template>
  <nav v-if="userLinks.length || repolink" class="nav-links">
    <!-- nav根据type为links和link分别渲染  -->
    <div v-for="item in userlinks" :key="item.link" class="nav-item">
      <dropdown-link v-if="item.type === 'links'" :item="item"></dropdown-link>
      <nav-link v-else :item="item"></nav-link>
    </div>
    <!-- repo仓库地址 -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
      >{{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
//用于判断的nav的type是links还是link
import { resolveNavLinkItem } from "../lib/utils";
import DropdownLink from "./DropdownLink.vue";
import NavLink from "./NavLink.vue";
export default {
  components: { DropdownLink, NavLink },
  name: "NavLinks",
  computed: {
    // 获取用户配置的nav
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },
    //
    // 映射type
    userLinks() {
      return (this.nav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },
    // 生成多语言切换路径  以及分类和标签
    nav() {
      const {
        $site: { locales },
        userNav,
      } = this;
      // 如果有多语言配置，展示切换路径
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || "Languages",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) ||
              locale.languageDropdown;
            let link;
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              link = currentLink.replace(this.$localeConfig.path, path);
              if (!routes.some((route) => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };
        return [...userNav, languageDropdown];
      }

      // blogConfig 的处理，根据配置自动添加分类和标签
      const blogConfig = this.$themeConfig.blogConfig || {};
      const isHasCategory = userNav.some((item) => {
        if (blogConfig.category) {
          return item.text === (blogConfig.category.text || "分类");
        } else {
          return true;
        }
      });
      const isHasTag = userNav.some((item) => {
        if (blogConfig.tag) {
          return item.text === (blogConfig.tag.text || "标签");
        } else {
          return true;
        }
      });

      if (
        !isHasCategory &&
        Object.hasOwnProperty.call(blogConfig, "category")
      ) {
        const category = blogConfig.category;
        const $categories = this.$categories;
        userNav.splice(parseInt(category.location || 2) - 1, 0, {
          items: $categories.list.map((item) => {
            item.link = item.path;
            item.text = item.name;
            return item;
          }),
          text: category.text || "分类",
          type: "links",
        });
      }

      if (!isHasTag && Object.hasOwnProperty.call(blogConfig, "tag")) {
        const tag = blogConfig.tag;
        userNav.splice(parseInt(tag.location || 3) - 1, 0, {
          link: "/tag/",
          text: tag.text || "标签",
          type: "links",
        });
      }

      return userNav;
    },
    // 项目仓库地址
    repoLink() {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }
      return "";
    },
    // 仓库对应的label
    repoLabel() {
      if (!this.repoLink) return;
      if (this.$themeConfig.repoLabel) return this.$themeConfig.repoLabel;
      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];
      platforms.forEach((item, index) => {
        if (new RegExp(item, index).test(repoHost)) {
          return item;
        }
      });
      return "Source";
    },
  },
};
</script>