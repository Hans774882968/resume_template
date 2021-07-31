<template>
  <div class="module-head" :style="{backgroundColor: color}">
    <div class="module-title" :style="{backgroundColor: color}">{{ title }}</div>
    <div class="shade">
      <div class="shade-inner"></div>
    </div>
    <div class="down-triangle"
         :style="{borderColor: `${darkerColor} transparent transparent`}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleHead',
  props: {
    title: String,
    color: String,
    darkerColor: String
  }
}
</script>

<style scoped>
  .module-head{
    position: relative;/* 配合.down-triangle标签定位 */
    display: inline-block;/* 不铺满父元素 */
    min-width: 9rem;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #fff;
    white-space: nowrap;/* 文本不换行 */
    margin-left: -1rem;
  }
  .module-title{
    padding-left: 1.5625rem;
    padding-right: 3.125rem;
  }
  .module-head .shade{
    width: 3.125rem;/* 与.module-title同 */
    height: 1.5rem;/* 与.module-head同 */
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
  }
  .shade .shade-inner{
    transform: rotate(45deg);
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    top: -5px;/* 试验得此处可遮挡 */
    left: 20px;
  }
  .module-head .shade::after{
    content: "";
    box-sizing: border-box;
    border: 0.125rem solid white;
    width: 0.5rem;
    height: 3rem;
    position: absolute;
    top: -14px;/* 试验得此处可遮挡 */
    left: 15px;
    transform: rotate(-45deg);
  }
  .module-head .down-triangle {
    position: absolute;/* 实现斜边在左下方的直角三角形 */
    left: 0;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    border-style: solid;
    border-width: 0.625rem 0 0 1rem;
  }
</style>
