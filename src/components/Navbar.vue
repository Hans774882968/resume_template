<template>
  <div class="nav">
    <el-menu
      :default-active="`2`"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/">模板中心</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/" >面试辅导</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
  .nav{
    height: 4.5rem;
  }
  .el-menu{
    position: fixed;
    width: 100%;
    z-index: 9;
    height: 4.5rem;
  }
  a {
    color: #42b983;
    text-decoration: none;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
