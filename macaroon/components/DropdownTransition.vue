<template>
  <!-- 下拉导航组件的动画,@绑定js钩子函数 -->
  <transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
    ><slot />
  </transition>
</template>

<script>
export default {
  name: "DropdownTransition",
  methods: {
    // js动画钩子函数第一个参数为el---触发动画的元素？
    // scrollHeight和元素本身的高度完全无关，是浏览器根据元素padding和子元素的盒模型高度累加计算出来的。
    // scrollHeight计算高度时，会累加上以自身为定位祖先元素的所有后代定位元素的可视高度。
    // 因为高度需要根据dom元素算出来，所以要用js实现高度变化的动画
    setHeight(items) {
      items.style.height = items.scrollHeight + "px";
    },
    unsetHeight(items) {
      items.style.height = "";
    },
  },
};
</script>

<style lang="stylus">
// 刚进入和完全离开时高度设为0
.dropdown-enter, .dropdown-leave-to {
  height: 0 !important;
}
</style>