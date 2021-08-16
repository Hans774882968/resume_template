<template>
  <div class="line-box">
    <div class="line-l" :style="{backgroundColor: themeColor}">
      <div class="line-l-triangle"
           :style="{borderColor: `transparent transparent transparent ${themeColor}`}">
      </div>
    </div>
    <div class="line-r">
      <div class="line-r-triangle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeSeparator',
  props: {
    themeColor: String
  }
}
</script>

<style scoped>
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
</style>
