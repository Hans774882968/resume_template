<template>
  <div>
    <Navbar></Navbar>
    <div class="index-container">
      <div class="editor-container">
        <div>编辑表单</div>
        <el-button type="primary" @click="getPDF">导出为PDF</el-button>
        <div class="skin-container">
          <div class="skin-title">选择颜色：</div>
          <div class="theme-colors">
            <div class="color-item"
                 v-for="(c,idx) in skinColors" :key="idx"
                 :style="{backgroundColor: c,border: idx === colorIndex ? '3px solid red' : ''}"
                 @click="updateSkinColor(idx)">
            </div>
          </div>
        </div>
      </div>

      <div id="resume" class="resume">
        <div class="resume-head-container">
          <div class="right-box">
            <i class="qmfont qmicon-xueshimao"></i>
            <i class="qmfont qmicon-shoutibao"></i>
          </div>
          <dl id="resume-head" class="left-box" :style="{color: theme.color}">
            <dt class="left" :style="{borderColor: theme.color}">个人简历</dt>
            <dd class="right">
              <p>努力超越自己，每天进步一点点</p>
              Personal resume
            </dd>
          </dl>
        </div>

        <div class="line-box">
          <div class="line-l" :style="{backgroundColor: theme.color}">
            <div class="line-l-triangle"
                 :style="{borderColor: `transparent transparent transparent ${theme.color}`}">
            </div>
          </div>
          <div class="line-r">
            <div class="line-r-triangle"></div>
          </div>
        </div>

        <div class="resume-body">
          <div class="module">
            <ModuleHead :title="`基本信息`" :color="theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="moduleContentBorder">
              <li class="basic-info-item">
                <span class="tag">姓名</span>
                ：hans
              </li>
              <li class="basic-info-item">
                <span class="tag">年龄</span>
                ：22
              </li>
              <li class="basic-info-item">
                <span class="tag">性别</span>
                ：男
              </li>
              <li class="basic-info-item">
                <span class="tag">求职意向</span>
                ：前端工程师
              </li>
            </ul>
          </div>
          <div class="module">
            <ModuleHead :title="`专业技能`" :color="theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="moduleContentBorder">
              <li class="basic-info-item">
                1
              </li>
              <li class="basic-info-item">
                2
              </li>
              <li class="basic-info-item">
                3
              </li>
              <li class="basic-info-item">
                4
              </li>
            </ul>
          </div>
          <div class="module">
            <ModuleHead :title="`荣誉证书`" :color="theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="moduleContentBorder">
              <li class="basic-info-item">
                ICPC贺州站银牌
              </li>
              <li class="basic-info-item">
                蓝桥杯国一
              </li>
              <li class="basic-info-item">
                连续三年获得国家奖学金
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleHead from './ModuleHead'
import Navbar from './Navbar'
import html2PDF from '@/html2PDF'

export default {
  name: 'Index',
  components: {ModuleHead, Navbar},
  data () {
    return {
      colorIndex: 0,
      skinColors: [
        '#4e7282', '#284967', '#333333', '#3978a3', '#1575bf', '#0e88ad',
        '#a08f75', '#c19f67', '#ed7d31', '#67a886', '#76ba31', '#f36c6c'
      ],
      theme: {
        color: '#4e7282'
      }
    }
  },
  computed: {
    moduleContentBorder () {
      return {
        borderTop: `1px solid ${this.theme.color}`,
        borderLeft: `1px solid ${this.theme.color}`
      }
    },
    darkerColor () {
      let r = parseInt(this.theme.color.substring(1, 3), 16)
      let g = parseInt(this.theme.color.substring(3, 5), 16)
      let b = parseInt(this.theme.color.substring(5), 16)
      return `rgb(${r - 40},${g - 40},${b - 40})`
    }
  },
  methods: {
    getPDF () {
      html2PDF.downloadPDF(document.getElementById('resume'), '我的简历')
    },
    updateSkinColor (idx) {
      this.colorIndex = idx
      this.theme.color = this.skinColors[idx]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-container{
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-evenly;
    min-height: 100vh;
    padding-top: 1.25rem;
    align-items: flex-start;/* 不拉伸 */
  }

  .editor-container{
    width: 35%;
    background-color: white;
    padding: 1.5rem;
  }
  .skin-container{
    margin-top: 0.5rem;
    display: flex;
  }
  .skin-container .skin-title{
    font-weight: bold;
    margin-right: 1rem;
  }
  .skin-container .theme-colors{
    display: grid;
    grid-gap: 0.6rem;
    grid-template-columns: repeat(6,1fr);
  }
  .skin-container .color-item{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
  }
  .skin-container .color-item:hover{
    transform: scale(1.1);
    cursor: pointer;
    border: 2px solid red;
  }

  .resume{
    width: 50%;
    background-color: white;
    box-shadow: 0 0 1rem rgba(0,0,0,0.16);
  }
  .resume-head-container{
    padding: 1rem 2rem 1rem 2rem;
  }
  .left-box{
    overflow: hidden;/* bfc */
  }
  .left-box .left {
    float: left;
    font-size: 38px;
    border-right: 2px solid #4e7282;
    height: 52px;
    line-height: 52px;
    padding-right: 15px;
  }
  .left-box .right{
    float: left;
    line-height: 26px;
    font-size: 24px;
    padding-left: 15px;
    max-width: 560px;
  }
  .left-box .right p{
    font-size: 14px;
  }

  .line-box{
    height: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .line-box .line-l,.line-box .line-r{
    position: relative;
  }
  .line-box .line-l{
    width: 60%;
    height: 100%;
  }
  .line-l-triangle{
    position: absolute;/* 实现直角三角形 */
    left: 100%;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    border-style: solid;
    border-width: 1rem 0 0 1rem;
  }
  .line-box .line-r{
    margin-top: 0.3rem;
    flex: 0.9;
    background-color: #c19f67;
  }
  .line-r-triangle{
    position: absolute;/* 实现直角三角形 */
    right: 100%;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    border-style: solid;
    --w: calc(1rem - 0.3rem);
    border-width: var(--w) 0 0 var(--w);
    border-color: #c19f67 transparent transparent transparent;
  }

  .resume-body{
    padding: 0.5rem 2rem 1rem 2rem;
  }

  .module{

  }

  .module-content{
    padding: 1.25rem;
  }
  .basic-info-item{
    font-size: 13px;
    min-width: 4rem;
  }
  .basic-info-item .tag{
    display: inline-block;
    width: 4rem;
    text-align-last: justify;/* 两端对齐 */
  }
</style>
