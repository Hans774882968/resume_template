<template>
  <div>
    <Navbar
      :fontDialogVisible.sync="fontDialogVisible"
      :resumeTitleDialogVisible.sync="resumeTitleDialogVisible"
      :pageDialogVisible.sync="pageDialogVisible"
      :resume="resume">
    </Navbar>

    <el-dialog
      title="字体设置"
      :visible.sync="fontDialogVisible"
      width="30%">
      <div class="font-dialog">
        <ul>
          <li class="font-item">
            <h3 class="left-title">字体大小</h3>
            <h3 class="title-right">：</h3>
            <el-select v-model="resume.font.size" placeholder="字体大小">
              <el-option v-for="item in fontSizes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li class="font-item">
            <h3 class="left-title">字体</h3>
            <h3 class="title-right">：</h3>
            <el-select v-model="resume.font.family" placeholder="字体">
              <el-option v-for="item in fontFamilies" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fontDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="标题设置"
      :visible.sync="resumeTitleDialogVisible"
      width="30%">
      <div class="resume-title-dialog">
        <div class="resume-title-item">
          <h3 class="title">简历标题</h3>
          <el-input placeholder="个人简历" v-model="resume.title"></el-input>
        </div>
        <div class="resume-title-item">
          <h3 class="title">简历Slogan</h3>
          <el-input placeholder="我命由我不由天" v-model="resume.slogan"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resumeTitleDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="间距设置"
      :visible.sync="pageDialogVisible"
      width="30%">
      <div class="page-dialog">
        <div class="page-dialog-item">
          <h3 class="title">页面边距：<span style="color: #f60">{{ resume.spacing.padding }}</span></h3>
          <el-slider v-model="resume.spacing.padding" :step="2" :min="20" :max="50"></el-slider>
        </div>
        <div class="page-dialog-item">
          <h3 class="title">模块上下间距：<span style="color: #f60">{{ resume.spacing.moduleSpace }}</span></h3>
          <el-slider v-model="resume.spacing.moduleSpace" :step="1" :min="10" :max="30"></el-slider>
        </div>
        <div class="page-dialog-item">
          <h3 class="title">行间距：<span style="color: #f60">{{ resume.spacing.lineHeight }}</span></h3>
          <el-slider v-model="resume.spacing.lineHeight" :step="0.05" :min="0.3" :max="1.3"></el-slider>
        </div>
        <el-button @click="resetSpacing">重置</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pageDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="index-container">
      <div class="sticky-container">
        <div class="skin-container">
          <div class="skin-title">
            <i class="webfont webicon-skin"></i>
            选择颜色：
          </div>
          <div class="theme-colors">
            <div class="color-item"
                 v-for="(c,idx) in skinColors" :key="idx"
                 :style="{backgroundColor: c,border: idx === resume.theme.colorIndex ? '3px solid red' : ''}"
                 @click="updateSkinColor(idx)">
            </div>
          </div>
        </div>
        <FAQ></FAQ>
      </div>

      <div id="resume" class="resume" :style="{fontFamily: resume.font.family}">
        <div class="resume-head-container">
          <div class="right-box">
            <i class="myfont myicon-xueshimao"></i>
            <i class="myfont myicon-shoutibao"></i>
          </div>
          <dl id="resume-head" class="left-box" :style="{color: resume.theme.color}">
            <dt class="left" :style="{borderColor: resume.theme.color}">{{ resume.title }}</dt>
            <dd class="right">
              <p>{{ resume.slogan }}</p>
              Personal resume
            </dd>
          </dl>
        </div>

        <ResumeSeparator :themeColor="resume.theme.color"></ResumeSeparator>

        <draggable
          class="resume-body"
          :style="{
            fontSize: resume.font.size + 'px',
            paddingLeft: `${resume.spacing.padding}px`,
            paddingRight: `${resume.spacing.padding + 10}px`
          }"
          tag="div"
          v-bind="{
            animation: 200,
            group: 'description',
            disabled: false,
            ghostClass: 'ghost'
          }">
          <div class="module basic-info" v-show="resume.showBasicInfo">
            <ModuleHead title="基本信息" :color="resume.theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="moduleContentStyle">
              <li v-show="resume.name.length > 0" class="basic-info-item">
                <span class="tag">姓名</span>
                ：<span :class="{'red-name': toRedName}">{{ resume.name }}</span>
              </li>
              <li v-show="resume.birthDate" class="basic-info-item">
                <span class="tag">{{ toAge ? '年龄' : '出生年月'}}</span>
                ：{{ toAge ? monthDiff : resume.birthDate }}
              </li>
              <li v-show="resume.gender !== '不填'" class="basic-info-item">
                <span class="tag">性别</span>
                ：{{ resume.gender }}
              </li>
              <li v-show="resume.phone.length > 0" class="basic-info-item">
                <span class="tag">联系电话</span>
                ：{{ resume.phone }}
              </li>
              <li v-show="resume.email.length > 0" class="basic-info-item">
                <span class="tag">联系邮箱</span>
                ：{{ resume.email }}
              </li>
              <li v-show="resume.seniority !== '不填'" class="basic-info-item">
                <span class="tag">工作年限</span>
                ：{{ resume.seniority }}
              </li>
              <li v-show="resume.jobIntention.length > 0" class="basic-info-item">
                <span class="tag">求职意向</span>
                ：{{ resume.jobIntention }}
              </li>
            </ul>
          </div>
          <div class="module education-bg" v-show="resume.showTeach">
            <ModuleHead title="教育背景" :color="resume.theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="[
              {lineHeight: 1 + resume.spacing.lineHeight},
              moduleContentStyle
            ]">
              <li v-for="(edu,idx) in resume.educations" :key="idx">
                <div class="education-item-content">
                  <div class="time" v-if="edu.eDate">
                    {{ edu.eDate[0] }} ~ {{ edu.eDate[1] }}
                  </div>
                  <strong class="school">{{ edu.schoolName }}</strong>
                  <strong class="specialty">
                    {{ edu.specialty }}{{ edu.degree !== '不填' ? `（${edu.degree}）` : '' }}
                  </strong>
                </div>
                <DescriptionShow
                  :description="edu.description"
                  :lineHeight="resume.spacing.lineHeight"
                  marginTop="1rem"
                  marginBottom="1rem">
                </DescriptionShow>
              </li>
            </ul>
          </div>
          <div class="module" v-show="resume.showProject">
            <ModuleHead title="项目经历" :color="resume.theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="[
              {lineHeight: 1 + resume.spacing.lineHeight},
              moduleContentStyle
            ]">
              <li v-for="(project,idx) in resume.projects" :key="idx">
                <div class="project-item-content">
                  <div v-if="project.pDate">
                    {{ project.pDate[0] }} ~ {{ project.pDate[1] }}
                  </div>
                  <strong>{{ project.name }}</strong>
                  <strong v-show="project.role">{{ project.role }}</strong>
                </div>
                <DescriptionShow
                  :description="project.content"
                  :lineHeight="resume.spacing.lineHeight"
                  marginTop="1rem"
                  marginBottom="1rem">
                </DescriptionShow>
              </li>
            </ul>
          </div>
          <div class="module" v-show="resume.showSkill">
            <ModuleHead title="专业技能" :color="resume.theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="[
              {lineHeight: 1 + resume.spacing.lineHeight},
              moduleContentStyle
            ]">
              <DescriptionShow
                :description="resume.skillDescription"
                :lineHeight="resume.spacing.lineHeight">
              </DescriptionShow>
            </ul>
          </div>
          <div class="module" v-show="resume.showHonor">
            <ModuleHead title="荣誉证书" :color="resume.theme.color"
                        :darkerColor="darkerColor">
            </ModuleHead>
            <ul class="module-content" :style="[
              {lineHeight: 1 + resume.spacing.lineHeight},
              moduleContentStyle
            ]">
              <DescriptionShow
                :description="resume.honorDescription"
                :lineHeight="resume.spacing.lineHeight">
              </DescriptionShow>
            </ul>
          </div>
        </draggable>
      </div>
    </div>
    <!--5rem = the height of .edit-top-->
    <div class="editor-container" :style="{transform: showEditBody ? 'translateY(0)' : 'translateY(calc(100% - 5rem))'}">
      <div
        :title="showEditBody ? '收起编辑区' : '展开编辑区'"
        :class="['close','webfont',showEditBody ? 'webicon-arrowdown' : 'webicon-arrowup']"
        @click="changeShowEditBody">
      </div>
      <ul class="edit-top">
        <EditTopItem
          :active="tabIndexes[0] === showingTab"
          @click.native="changeShowingTab(tabIndexes[0])"
          :show.sync="resume.showBasicInfo"
          title="基本信息">
        </EditTopItem>
        <EditTopItem
          :active="tabIndexes[1] === showingTab"
          @click.native="changeShowingTab(tabIndexes[1])"
          :show.sync="resume.showTeach"
          title="教育背景">
        </EditTopItem>
        <EditTopItem
          :active="tabIndexes[2] === showingTab"
          @click.native="changeShowingTab(tabIndexes[2])"
          :show.sync="resume.showProject"
          title="项目经历">
        </EditTopItem>
        <EditTopItem
          :active="tabIndexes[3] === showingTab"
          @click.native="changeShowingTab(tabIndexes[3])"
          :show.sync="resume.showSkill"
          title="专业技能">
        </EditTopItem>
        <EditTopItem
          :active="tabIndexes[4] === showingTab"
          @click.native="changeShowingTab(tabIndexes[4])"
          :show.sync="resume.showHonor"
          title="荣誉证书">
        </EditTopItem>
      </ul>
      <div class="edit-body">
        <ul v-show="showingTab === tabIndexes[0]" class="basic-info-edit">
          <li>
            <p>您的姓名</p>
            <el-input v-model="resume.name" @input="updateResumeName" placeholder="姓名"></el-input>
            <el-checkbox v-model="toRedName">红名</el-checkbox>
          </li>
          <li>
            <p>出生年月</p>
            <el-date-picker
              v-model="resume.birthDate"
              type="month"
              value-format="yyyy-MM"
              :picker-options="resume.birthDateLegal"
              placeholder="出生年月"></el-date-picker>
            <el-checkbox v-model="toAge">转年龄</el-checkbox>
          </li>
          <li>
            <p>性别</p>
            <el-select v-model="resume.gender" placeholder="性别">
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>联系电话</p>
            <el-input v-model="resume.phone" placeholder="联系电话"></el-input>
          </li>
          <li>
            <p>联系邮箱</p>
            <el-input v-model="resume.email" placeholder="联系邮箱"></el-input>
          </li>
          <li>
            <p>工作年限</p>
            <el-select v-model="resume.seniority" placeholder="工作年限">
              <el-option
                v-for="item in seniorities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>求职意向</p>
            <el-input v-model="resume.jobIntention" placeholder="求职意向"></el-input>
          </li>
        </ul>
        <div v-show="showingTab === tabIndexes[1]" class="education-bg-edit">
          <div class="education-item-edit" v-for="(edu,idx) in resume.educations" :key="idx">
            <ul class="education-info-edit">
              <li>
                <p>学校名称</p>
                <el-input v-model="edu.schoolName" placeholder="学校名称"></el-input>
              </li>
              <li>
                <p>所学专业</p>
                <el-input v-model="edu.specialty" placeholder="所学专业"></el-input>
              </li>
              <li>
                <p>就读时间</p>
                <el-date-picker
                  v-model="edu.eDate"
                  value-format="yyyy-MM"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="入学年月"
                  end-placeholder="毕业年月">
                </el-date-picker>
              </li>
              <li>
                <p>学历</p>
                <el-select v-model="edu.degree" placeholder="学历">
                  <el-option
                    v-for="item in eduDegrees"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <Editor
              placeholder="所修课程、成绩排名、在校的职务、参赛获奖情况等有利于突出个人优势的信息。尽量简洁，突出重点。"
              :content.sync="edu.description"></Editor>
          </div>
          <el-button type="primary" class="btn-add" @click="addEducation">
            <i class="el-icon-plus"></i> 添加一条：教育背景
          </el-button>
        </div>
        <div v-show="showingTab === tabIndexes[2]" class="project-edit">
          <div class="project-item-edit" v-for="(project,idx) in resume.projects" :key="idx">
            <ul class="project-info-edit">
              <li>
                <p>项目名称</p>
                <el-input v-model="project.name" placeholder="项目名称"></el-input>
              </li>
              <li>
                <p>项目角色</p>
                <el-input v-model="project.role" placeholder="项目角色"></el-input>
              </li>
              <li>
                <p>项目时间</p>
                <el-date-picker
                  v-model="project.pDate"
                  value-format="yyyy-MM"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始年月"
                  end-placeholder="结束年月">
                </el-date-picker>
              </li>
            </ul>
            <Editor
              placeholder="请输入项目内容、成果和感悟，简洁突出重点。"
              :content.sync="project.content"></Editor>
          </div>
          <el-button type="primary" class="btn-add" @click="addProject">
            <i class="el-icon-plus"></i> 添加一条：项目经历
          </el-button>
        </div>
        <div v-show="showingTab === tabIndexes[3]" class="skill-edit">
          <Editor
            placeholder="技能特长文字描述，非必填。"
            :content.sync="resume.skillDescription"></Editor>
        </div>
        <div v-show="showingTab === tabIndexes[4]" class="honor-edit">
          <Editor
            placeholder="荣誉证书内容描述，非必填。"
            :content.sync="resume.honorDescription"></Editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleHead from './ModuleHead'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Draggable from 'vuedraggable'
import EditTopItem from '@/components/EditTopItem'
import Editor from './Editor'
import DescriptionShow from '@/components/DescriptionShow'
import ResumeSeparator from '@/components/ResumeSeparator'

class Education {
  constructor (schoolName = '', specialty = '', degree = '不填') {
    this.schoolName = schoolName
    this.specialty = specialty
    this.eDate = ''
    this.degree = degree
    this.description = ''
  }
}

class Project {
  constructor () {
    this.name = ''
    this.role = ''
    this.pDate = ''
    this.content = ''
  }
}

export default {
  name: 'Index',
  components: {ResumeSeparator, DescriptionShow, EditTopItem, ModuleHead, Navbar, FAQ, Draggable, Editor},
  data () {
    return {
      skinColors: [
        '#4e7282', '#284967', '#333333', '#3978a3', '#1575bf', '#0e88ad',
        '#a08f75', '#c19f67', '#ed7d31', '#67a886', '#76ba31', '#f36c6c'
      ],
      fontSizes: [
        {value: '12', label: '12'}, {value: '13', label: '13'}, {value: '14', label: '14'},
        {value: '15', label: '15'}, {value: '16', label: '16'}
      ],
      fontFamilies: [
        {value: 'Microsoft YaHei,SimSun,PingFang SC,PingFang SC Regular', label: '微软雅黑'},
        {value: 'SimSun,Microsoft YaHei', label: '宋体'},
        {value: 'SimHei,Microsoft YaHei', label: '黑体'},
        {value: 'Arial,Microsoft YaHei', label: 'Arial'},
        {value: 'PingFang SC,PingFang SC Regular,Heiti SC,Microsoft YaHei', label: '平方'},
        {value: 'KaiTi,Microsoft YaHei', label: '楷体'}
      ],
      fontDialogVisible: false,
      resumeTitleDialogVisible: false,
      pageDialogVisible: false,
      toRedName: false, /* cf红名（大雾） */
      toAge: false,
      tabIndexes: [0, 1, 2, 3, 4],
      resume: {
        theme: {
          colorIndex: 0,
          color: '#4e7282'
        },
        spacing: {
          padding: 32,
          moduleSpace: 20,
          lineHeight: 0.35
        },
        font: {
          size: '14',
          family: 'Microsoft YaHei,SimSun,PingFang SC,PingFang SC Regular'
        },
        title: '个人简历',
        slogan: '努力超越自己，每天进步一点点',
        // 基本信息
        name: 'hans774882968',
        birthDate: '',
        birthDateLegal: {
          disabledDate: time => {
            let now = new Date()
            if (time.getFullYear() < now.getFullYear()) return false
            if (time.getFullYear() > now.getFullYear()) return true
            return time.getMonth() > now.getMonth()
          }
        },
        gender: '不填',
        phone: '15888888888',
        email: '774882968@qq.com',
        seniority: '应届生',
        jobIntention: '前端工程师',
        // 教育背景
        educations: [new Education('四川大学', '计算机科学与技术', '本科')],
        // 项目经历
        projects: [new Project()],
        // 专业技能
        skillDescription: '',
        // 荣誉证书
        honorDescription: '',
        // 简历模块是否展示
        showBasicInfo: true,
        showTeach: true,
        showProject: true,
        showSkill: true,
        showHonor: true
      },
      seniorities: [
        {value: '不填', label: '不填'},
        {value: '应届生', label: '应届生'},
        {value: '1年经验', label: '1年经验'},
        {value: '2年经验', label: '2年经验'},
        {value: '3年经验', label: '3年经验'},
        {value: '4年经验', label: '4年经验'},
        {value: '5年经验', label: '5年经验'}
      ],
      genders: [
        {value: '不填', label: '不填'}, {value: '男', label: '男'}, {value: '女', label: '女'}
      ],
      eduDegrees: [
        {value: '不填', label: '不填'}, {value: '中专', label: '中专'},
        {value: '大专', label: '大专'}, {value: '本科', label: '本科'},
        {value: '学士', label: '学士'}, {value: '硕士', label: '硕士'},
        {value: '博士', label: '博士'}, {value: 'MBA', label: 'MBA'}
      ]
    }
  },
  computed: {
    moduleContentStyle () {
      return {
        borderTop: `1px solid ${this.resume.theme.color}`,
        borderLeft: `1px solid ${this.resume.theme.color}`,
        paddingTop: `${this.resume.spacing.moduleSpace}px`,
        paddingBottom: `${this.resume.spacing.moduleSpace}px`
      }
    },
    darkerColor () {
      let r = parseInt(this.resume.theme.color.substring(1, 3), 16)
      let g = parseInt(this.resume.theme.color.substring(3, 5), 16)
      let b = parseInt(this.resume.theme.color.substring(5), 16)
      return `rgb(${r - 40},${g - 40},${b - 40})`
    },
    monthDiff () {
      if (!this.resume.birthDate) return null
      const st = new Date(this.resume.birthDate)
      const ed = new Date()
      let year = ed.getFullYear() - st.getFullYear()
      let month = ed.getMonth() - st.getMonth()
      if (month < 0) {
        --year
        month += 12
      }
      return year
    },
    showingTab () {
      return this.$store.state.showingTab
    },
    showEditBody () {
      return this.$store.state.showEditBody
    }
  },
  mounted () {
    let resumeObj = localStorage.getItem('resume')
    if (resumeObj) {
      resumeObj = JSON.parse(resumeObj)
      for (let ky in resumeObj) {
        this.resume[ky] = resumeObj[ky]
      }
    }
  },
  methods: {
    addEducation () {
      this.resume.educations.push(new Education())
    },
    addProject () {
      this.resume.projects.push(new Project())
    },
    resetSpacing () {
      this.resume.spacing = {padding: 32, moduleSpace: 20, lineHeight: 0.35}
    },
    updateSkinColor (idx) {
      this.resume.theme.colorIndex = idx
      this.resume.theme.color = this.skinColors[idx]
    },
    updateResumeName () {
      if (this.resume.name.length === 0) {
        this.resume.name = 'hans774882968'
      }
    },
    changeShowEditBody () {
      this.$store.commit('changeShowEditBody')
    },
    changeShowingTab (idx) {
      this.$store.commit('changeShowingTab', idx)
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

  .resume-title-item {
    margin: 1rem 0;
    display: flex;
  }
  .resume-title-item .title{
    min-width: 6rem;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;/* 和el-input默认高度相同 */
  }

  .page-dialog{
    display: flex;
    flex-direction: column;
  }
  .page-dialog button{
    align-self: center;
  }

  .sticky-container{
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
    margin-bottom: 25rem;
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

  .resume-body{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .module{

  }

  .module-content{
    padding: 1.25rem;
  }
  .basic-info .module-content{
    line-height: normal;/*不受全局的lineHeight设置影响*/
    overflow: hidden;/* bfc */
  }
  .basic-info-item{
    padding: 3px 3px 3px 0;
    float: left;
    min-width: 50%;
  }
  .basic-info-item .tag{
    display: inline-block;
    width: 4rem;
    text-align-last: justify;/* 两端对齐 */
  }
  /* cf红名（大雾） */
  .basic-info-item .red-name {
    color: red;
    font-weight: bold;
  }
  .education-item-content,.project-item-content{
    display: flex;
    justify-content: space-between;
  }

  .editor-container{
    width: 100%;
    /*min-height: 10rem;*/
    position: fixed;
    bottom: 0;
    background-color: white;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    transition: all 0.3s;
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
    width: 75rem;
    margin: 0 auto;
  }

  .basic-info-edit{
    margin: 1rem 0;
  }
  /* .basic-info-edit,.education-info-edit,.project-info-edit共享样式 */
  .basic-info-edit,.education-info-edit,.project-info-edit{
    display: grid;
    grid-template-columns: repeat(4,1fr);
  }
  .basic-info-edit .el-date-editor{
    width: 120px;/* 日期选择器宽度限制 */
  }
  .basic-info-edit li,.education-bg-edit li,.project-edit li{
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    column-gap: 0.5rem;
  }
  .basic-info-edit p,.education-bg-edit p,.project-edit p{
    min-width: 72px;
    text-align: right;
  }

  /* .education-bg-edit,.project-edit共享样式 */
  .education-bg-edit,.project-edit{
    max-height: 20rem;
    overflow-y: scroll;
  }
  .education-item-edit,.project-item-edit{
    padding-top: 1rem;
    padding-right: 1.5rem;
  }
  .education-info-edit,.project-info-edit{
    margin-bottom: 1rem;
  }
  .education-bg-edit .btn-add,.project-edit .btn-add{
    margin: 1.5rem 0;
  }

  .skill-edit,.honor-edit{
    padding: 1.5rem 0;
  }
</style>
