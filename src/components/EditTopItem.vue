<template>
  <li class="container" :style="{
      borderBottom: show ? '' : '2px solid #ddd',
      color: show ? '' : '#ddd'
    }">
    <el-tooltip :content="remind" placement="top">
      <el-switch
        v-model="tmp"
        active-color="rgb(19,206,102)">
      </el-switch>
    </el-tooltip>
    <h4 class="title">{{ title }}</h4>
  </li>
</template>

<script>
export default {
  name: 'EditTopItem',
  props: {
    show: Boolean,
    title: String
  },
  computed: {
    remind () {
      return this.tmp ? '点击可隐藏模块' : '点击可显示模块'
    }
  },
  data () {
    return {
      tmp: this.show
    }
  },
  watch: {
    show (val) {
      this.tmp = val
    },
    tmp (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>

<style scoped>
  .container{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 2px solid #f60;
  }
  .container:hover{
    color: #f60;
  }
  .title{
    margin-top: 0.5rem;
  }
</style>
