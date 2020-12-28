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