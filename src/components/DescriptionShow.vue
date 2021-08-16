<template>
  <div class="description-show ql-container ql-snow"
       v-show="description"
       :style="{marginTop: marginTop,marginBottom: marginBottom}">
    <div class="ql-editor">
      <div :style="{lineHeight: 1 + lineHeight}"
           class="description"
           v-html="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionShow',
  props: {
    description: String,
    lineHeight: Number,
    marginTop: {
      type: String,
      required: false,
      default: ''
    },
    marginBottom: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
  .description{
    white-space: pre-wrap;
  }

  .description-show{
    border: 0;
  }
  .description-show .ql-editor{
    padding: 0;
  }
  .description-show >>> ul,.description-show >>> ol{
    padding-left: 0;/* 覆盖quill原有样式 */
  }
</style>
