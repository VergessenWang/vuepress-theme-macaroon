<template>
  <!-- 如果配置了layout，那么此组件将会代替docs中的readme作为主页 -->
  <div id="home">
    <Content />
  </div>
</template>
<script>
export default {
  name: "macaroon",
  created() {
    console.log("是否创建layout");
  },
};
</script>