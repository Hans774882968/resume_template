<template>
  <quill-editor
    class="description-editor"
    v-model="tmpContent"
    :options="editorOption">
  </quill-editor>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'

// 字号
let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = [
  false, '12px', '14px', '16px', '18px', '20px',
  '22px', '24px', '26px', '30px', '36px'
]
Quill.register(fontSizeStyle, true)

// 字体
let fontStyle = Quill.import('formats/font')
fontStyle.whitelist = [
  false, 'SimSun', 'SimHei', 'Microsoft-YaHei',
  'KaiTi', 'FangSong', 'Arial', 'sans-serif'
]
Quill.register(fontStyle, true)

export default {
  name: 'Editor',
  components: {quillEditor},
  props: {
    content: String,
    placeholder: String
  },
  data () {
    return {
      tmpContent: '',
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-2' }, { indent: '+2' }],
            [{ direction: 'rtl' }],

            [{ size: fontSizeStyle.whitelist }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ font: fontStyle.whitelist }],
            [{ align: [] }],

            ['link'],
            ['clean']
          ]
        }
      }
    }
  },
  watch: {
    content (val) {
      this.tmpContent = val
    },
    tmpContent (val) {
      this.$emit('update:content', val)
    }
  }
}
</script>

<style>
  .description-editor .ql-editor{
    height: 15rem;
  }
</style>
