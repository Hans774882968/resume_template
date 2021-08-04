<template>
  <div class="nav">
    <el-menu
      :default-active="`2`"
      background-color="#f0f8ff"
      mode="horizontal"
      text-color="#000">
      <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/">模板中心</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/" >面试辅导</router-link>
      </el-menu-item>
      <el-menu-item @click="fontDialog">
        字体设置
      </el-menu-item>
      <el-menu-item @mouseenter.native="colorMaintain">
        <el-button type="primary" @click="getPDF">导出为PDF</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import html2PDF from '@/html2PDF'

export default {
  name: 'Navbar',
  props: {
    fontDialogVisible: Boolean
  },
  methods: {
    getPDF () {
      html2PDF.downloadPDF(document.getElementById('resume'), '我的简历')
    },
    colorMaintain (e) {
      e.target.style.backgroundColor = '#f0f8ff'
    },
    fontDialog () {
      this.$emit('update:fontDialogVisible', !this.fontDialogVisible)
    }
  }
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
