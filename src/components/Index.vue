<template>
  <div>
    <Navbar :fontDialogVisible.sync="fontDialogVisible"></Navbar>

    <el-dialog
      title="字体设置"
      :visible.sync="fontDialogVisible"
      width="30%">
      <div class="font-dialog">
        <ul>
          <li class="font-item">
            <h3 class="left-title">字体大小</h3>
            <h3 class="title-right">：</h3>
            <el-select v-model="fontValue" placeholder="字体大小">
              <el-option v-for="item in fontValues" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li class="font-item">
            <h3 class="left-title">字体</h3>
            <h3 class="title-right">：</h3>
            <el-select v-model="fontFamily" placeholder="字体">
              <el-option v-for="item in fontFamilies" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fontDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="index-container">
      <div class="editor-container">
        <div class="skin-container">
          <div class="skin-title">
            <i class="webfont webicon-skin"></i>
            选择颜色：
          </div>
          <div class="theme-colors">
            <div class="color-item"
                 v-for="(c,idx) in skinColors" :key="idx"
                 :style="{backgroundColor: c,border: idx === colorIndex ? '3px solid red' : ''}"
                 @click="updateSkinColor(idx)">
            </div>
          </div>
        </div>
        <FAQ></FAQ>
      </div>

      <div id="resume" class="resume" :style="{fontFamily: fontFamily}">
        <div class="resume-head-container">
          <div class="right-box">
            <i class="myfont myicon-xueshimao"></i>
            <i class="myfont myicon-shoutibao"></i>
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

        <draggable
          class="resume-body"
          :style="{fontSize: fontValue + 'px'}"
          tag="div"
          v-bind="{
            animation: 200,
            group: 'description',
            disabled: false,
            ghostClass: 'ghost'
          }">
          <div class="module" v-show="resume.showBasicInfo">
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
          <div class="module" v-show="resume.skill">
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
          <div class="module" v-show="resume.honor">
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
        </draggable>
      </div>
    </div>

    <div class="editor">
      <div
        :title="showEditBody ? '收起编辑区' : '展开编辑区'"
        :class="['close','webfont',showEditBody ? 'webicon-arrowdown' : 'webicon-arrowup']"
        @click="changeShowEditBody">
      </div>
      <ul class="edit-top">
        <EditTopItem :show.sync="resume.showBasicInfo" :title="'基本信息'"></EditTopItem>
        <EditTopItem :show.sync="resume.skill" :title="'专业技能'"></EditTopItem>
        <EditTopItem :show.sync="resume.honor" :title="'荣誉证书'"></EditTopItem>
      </ul>
      <div class="edit-body" v-show="showEditBody">内容</div>
    </div>
  </div>
</template>

<script>
import ModuleHead from './ModuleHead'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Draggable from 'vuedraggable'
import EditTopItem from '@/components/EditTopItem'

export default {
  name: 'Index',
  components: {EditTopItem, ModuleHead, Navbar, FAQ, Draggable},
  data () {
    return {
      colorIndex: 0,
      skinColors: [
        '#4e7282', '#284967', '#333333', '#3978a3', '#1575bf', '#0e88ad',
        '#a08f75', '#c19f67', '#ed7d31', '#67a886', '#76ba31', '#f36c6c'
      ],
      theme: {
        color: '#4e7282'
      },
      fontValue: '14',
      fontValues: [
        {value: '12', label: '12'}, {value: '13', label: '13'}, {value: '14', label: '14'},
        {value: '15', label: '15'}, {value: '16', label: '16'}
      ],
      fontFamily: 'Microsoft YaHei,SimSun,PingFang SC,PingFang SC Regular',
      fontFamilies: [
        {value: 'Microsoft YaHei,SimSun,PingFang SC,PingFang SC Regular', label: '微软雅黑'},
        {value: 'SimSun,Microsoft YaHei', label: '宋体'},
        {value: 'SimHei,Microsoft YaHei', label: '黑体'},
        {value: 'Arial,Microsoft YaHei', label: 'Arial'},
        {value: 'PingFang SC,PingFang SC Regular,Heiti SC,Microsoft YaHei', label: '平方'},
        {value: 'KaiTi,Microsoft YaHei', label: '楷体'}
      ],
      fontDialogVisible: false,
      showEditBody: false,
      resume: {
        showBasicInfo: true,
        skill: true,
        honor: true
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
    updateSkinColor (idx) {
      this.colorIndex = idx
      this.theme.color = this.skinColors[idx]
    },
    changeShowEditBody () {
      this.showEditBody = !this.showEditBody
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

  .font-dialog .font-item{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
  .font-item .left-title{
    line-height: 40px;/* 和el-select默认高度相同 */
    min-width: 4.5rem;
    text-align-last: justify;
  }
  .font-item .title-right{
    line-height: 40px;/* 和el-select默认高度相同 */
    margin-left: 0.25rem;
  }

  .editor-container{
    width: 35%;
    background-color: #f9f9f9;
    position: sticky;
    top: calc(4.5rem + 1.25rem);/* Navbar的高度 + .index-container的padding-top */
  }
  .skin-container{
    background-color: white;
    display: flex;
    border: 1px solid #ddd;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
    padding: 1.25rem;
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
    width: 2rem;
    height: 2rem;
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
    padding: 1rem 4rem 1rem 2rem;
  }
  .right-box{
    float: right;
    margin-top: 0.35rem;
    display: flex;
  }
  .right-box i{
    margin-left: 10px;
    font-size: 22px;
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: #c19f67;
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
    flex: 1;
    margin-left: 1.5rem;
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
    min-width: 4rem;
  }
  .basic-info-item .tag{
    display: inline-block;
    width: 4rem;
    text-align-last: justify;/* 两端对齐 */
  }

  .editor{
    width: 100%;
    /*min-height: 10rem;*/
    position: fixed;
    bottom: 0;
    background-color: white;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }
  .close{
    position: absolute;
    top: calc(-3rem + 0.5rem);
    left: 50%;
    margin-left: -3rem;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
    color: #409EFF;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }
  .close:hover{
    top: -3rem;
  }
  .edit-top{
    position:relative;
    background-color: white;/* 起到遮挡效果 */
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
  }
  .edit-body{
  }
</style>
