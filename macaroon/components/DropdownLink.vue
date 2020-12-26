<template>
  <!-- 下拉导航组件 -->
  <div class="dropdown-wrapper" :class="{ open }">
    <a class="dropdown-title" @click="toggle">
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'"></span>
    </a>
    <dropdown-transition>
      <!-- v-show动态渲染 -->
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(subItem,index)in item.items"
          :key="subItem.link || index"
          class="dropdown-item"
        >
          <!--如果是多链接，渲染第三级？ -->
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul v-if="subItem.type === 'links'" class="dropdown-subitem-wrapper">
            <li
              v-for="childSubItem in subItem.items"
              :key="childSubItem.link"
              class="dropdown-item"
            >
              <nav-link :item="childSubItem"></nav-link>
            </li>
          </ul>

          <!-- 单链接渲染一个导航块即可 -->
          <nav-link v-else :item="subItem"></nav-link>
        </li>
      </ul>
    </dropdown-transition>
  </div>
</template>


<script>
import DropdownTransition from "./DropdownTransition.vue";
import NavLink from "./NavLink.vue";
export default {
  components: {
    DropdownTransition,
    NavLink,
  },
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      // 根据是否打开，动态绑定类
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

