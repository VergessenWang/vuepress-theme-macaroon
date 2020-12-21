<template>
  <!-- 如果配置了layout，那么此组件将会代替docs中的readme作为主页 -->
  <div class="site-container">
    <nav-bar></nav-bar>
  </div>
</template>
<script>
import NavBar from "../components/Navbar.vue";
export default {
  name: "Layout",
  components: {
    NavBar,
  },
  created() {
    console.log("是否创建layout");
    // window.alert("这是layout页面吗？？？");
  },
};
</script>

<style lang="stylus">
@import './../styles/global.styl';
</style>

