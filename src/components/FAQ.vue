<template>
  <div class="container">
    <div class="head">常见问题</div>
    <ul class="qa-list">
      <li class="item" v-for="(item,idx) in qa" :key="idx">
        <div class="question"
             :style="{color: idx === activeIndex ? '#409EFF' : ''}"
             @click="changeActiveIndex(idx)">
          {{ item.q }}
        </div>
        <div class="answer" v-show="idx === activeIndex">{{ item.a }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  data () {
    return {
      activeIndex: 0,
      qa: [
        {
          q: '简历怎么保存？',
          a: '点击简历编辑页右上角“保存”按钮。并且简历随时可以编辑和下载。'
        },
        {
          q: '想清除简历缓存，怎么做？',
          a: '点击简历编辑页右上角“清除缓存”按钮。'
        },
        {
          q: '怎么下载 / 导出简历？',
          a: '简历编辑页左上角有“导出为PDF”按钮。'
        },
        {
          q: '怎么更换模块顺序？',
          a: '拖动右侧简历模块更换顺序。'
        },
        {
          q: '不想要的模块怎么隐藏？',
          a: '点击模块分类上面的绿色圆点开关，可以隐藏模块。'
        }
      ]
    }
  },
  methods: {
    changeActiveIndex (idx) {
      this.activeIndex = idx
    }
  }
}
</script>

<style scoped>
  .container{
    margin-top: 1rem;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
    border-radius: 1rem;
    overflow: hidden;/* 隐藏.head的尖角 */
  }
  .container .head{
    background-color: #f2f2f2;
    font-weight: bold;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px #cccccc dotted;
  }
  .qa-list{
    padding: 0 1.25rem 0.25rem 1.25rem;
  }
  .item:first-child{
    border: 0;/* 头部li去除虚线分割线 */
  }
  .item{
    border-top: 1px #cccccc dotted;
    padding: 1rem 0;
  }
  .question{
    color: #333;
    cursor: pointer;
  }
  .question:hover{
    color: #409EFF;
  }
  .answer{
    padding-top: 0.5rem;
    font-size: 14px;
    color: #606266;
  }
</style>
