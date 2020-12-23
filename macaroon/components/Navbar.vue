<template>
  <header class="navbar">
    <nav>
      <div class="nav-title">
        <img class="nav-logo" src="../assets/nav/nav-logo.svg" />
        <p class="site-name">{{ this.$site.title }}</p>
      </div>
      <div class="pc-search-link">
        <div>pc页面搜索框</div>
        <nav-links></nav-links>
      </div>
      <div class="mo-search-link"></div>
    </nav>
  </header>
</template>

<script>
import NavLinks from "./NavLinks.vue";
export default {
  name: "NavBar",
  components: {
    NavLinks,
  },
};
</script>

<style lang="stylus">
@import '../styles/_varibles.styl';

.navbar {
  background-color: $navbar-bg;
  box-shadow: $buttom-shadow;
  // border: 3px solid red;
  height: 5vh;
  width: 100%;

  nav {
    height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
    margin: 0 auto;

    .nav-title {
      display: flex;
      height: 100%;
      align-items: center;
      margin: 0 auto;

      // border: red solid 3px;
      .nav-logo {
        height: 80%;
        // border: red solid 3px;
      }

      .site-name {
        // border: blue solid 3px;
        font-weight: bold;
        font-size: 1.5rem;
        vertical-align: middle;
        padding-left: 0.5rem;
      }
    }
  }
}

@media screen and (max-width: $MQMobile) {
  .navbar {
    .site-name {
      // display: none;
    }
  }
}
</style>