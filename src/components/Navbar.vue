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
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <div class="set-btn" @click="fontDialog">
          <i class="set-font webfont webicon-font"></i>
          <div class="set-title">字体设置</div>
        </div>
      </el-menu-item>
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <div class="set-btn" @click="resumeTitleDialog">
          <i class="set-font webfont webicon-cover"></i>
          <div class="set-title">标题设置</div>
        </div>
      </el-menu-item>
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <div class="set-btn" @click="pageDialog">
          <i class="set-font webfont webicon-page"></i>
          <div class="set-title">间距设置</div>
        </div>
      </el-menu-item>
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <el-button type="primary" @click="getPDF">导出为PDF</el-button>
      </el-menu-item>
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <el-button type="primary" @click="saveResume">保存</el-button>
      </el-menu-item>
      <el-menu-item @mouseenter.native="bgColorMaintain">
        <el-button type="primary" @click="clearResumeCache">清除缓存</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import html2PDF from '@/html2PDF'
import utils from '@/utils'

const disableTime = 5000

export default {
  name: 'Navbar',
  props: {
    fontDialogVisible: Boolean,
    resumeTitleDialogVisible: Boolean,
    pageDialogVisible: Boolean,
    resume: Object
  },
  data () {
    return {
      getPDF: () => {}
    }
  },
  mounted () {
    this.getPDF = utils.debounce(this,
      disableTime,
      '导出PDF成功',
      `导出PDF操作不能太频繁哦，请耐心等待${disableTime / 1000}秒吧qwq`,
      html2PDF.downloadPDF,
      document.getElementById('resume'),
      '我的简历')
    this.saveResume = utils.debounce(this,
      disableTime,
      '',
      `保存操作不能太频繁哦，请耐心等待${disableTime / 1000}秒吧qwq`,
      this.saveResume)
    this.clearResumeCache = utils.debounce(this,
      disableTime,
      '',
      `清除缓存操作不能太频繁哦，请耐心等待${disableTime / 1000}秒吧qwq`,
      this.clearResumeCache)
  },
  methods: {
    saveResume () {
      try {
        let {title, slogan, name, birthDate, gender, phone, email,
          seniority, jobIntention, educations, projects,
          skillDescription, honorDescription} = this.resume
        let resumeObj = {
          title,
          slogan,
          name,
          birthDate,
          gender,
          phone,
          email,
          seniority,
          jobIntention,
          educations,
          projects,
          skillDescription,
          honorDescription
        }
        localStorage.setItem('resume', JSON.stringify(resumeObj))
        this.$message({
          message: '简历保存成功',
          type: 'success'
        })
      } catch (e) {
        this.$message({
          message: '简历保存失败！localStorage已满，请精简简历内容！',
          type: 'warning'
        })
      }
    },
    clearResumeCache () {
      localStorage.removeItem('resume')
      this.$message({
        message: '简历缓存清除成功',
        type: 'success'
      })
    },
    bgColorMaintain (e) {
      e.target.style.backgroundColor = '#f0f8ff'
    },
    fontDialog () {
      this.$emit('update:fontDialogVisible', !this.fontDialogVisible)
    },
    resumeTitleDialog () {
      this.$emit('update:resumeTitleDialogVisible', !this.resumeTitleDialogVisible)
    },
    pageDialog () {
      this.$emit('update:pageDialogVisible', !this.pageDialogVisible)
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
  .set-btn{
    position: relative;
    width: 80px;
    height: 100%;
  }
  .set-btn *{
    color: #39394d;
  }
  .set-btn:hover *{
    color: #409EFF;
  }
  .set-font{
    position: absolute;
    top: 8px;
    line-height: 100%;
    left: 50%;
    margin-left: -15px;
    font-size: 30px;
  }
  .set-title{
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    margin-left: calc(-1 * 80px / 2);
    font-weight: bold;
    font-size: 16px;
    text-align: center;
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
