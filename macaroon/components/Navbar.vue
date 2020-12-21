<template>
  <header class="navbar">
    <div class="nav-title">
      <img class="nav-logo" src="../assets/nav/nav-logo.svg" />
      <p>{{ this.$site.title }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="stylus">
$navbar-bg = #fff;
$navbar-shadow = 0px 0px 15px rgba(0, 0, 0, 0.1);

.navbar {
  background-color: $navbar-bg;
  box-shadow: $navbar-shadow;
  // border: 3px solid red;
  height: 5vh;
  width: 100%;

  .nav-title {
    display: flex;
    height: 100%;

    // margin: auto;
    // border: red solid 3px;

    // padding: 1rem;
    .nav-logo {
      // padding: 1rem;
      height: 100%;
      // width: 3rem;
      // border: red solid 3px;
      // margin: auto;
    }

    p {
      height: 100%;
      // border: blue solid 3px;
      font-weight: bold;
      font-size: 1.5rem;
      margin: 1rem;
      // line-height: @height;
    }
  }
}
</style>