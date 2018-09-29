<!--
  官网示例：Markdown 编辑器
  主要用到：computed
-->

<template>
  <div id="editor">
    <textarea :value="input" @input="update" row="5"></textarea>
    <div v-html="computedEditor"></div>
  </div>
</template>

<script>
  import marked from 'marked';

  export default {
    name: 'editor',
    data: function () {
      return {
        input: '# hello'
      };
    },
    computed: {
      computedEditor: function () {
        return marked(this.input);
      }
    },
    methods: {
      update: function (e) {
        var _this = this;
        var tar = e.target;

        tar.style.height = 'auto';
        tar.style.height = tar.scrollHeight + 'px';

        setTimeout(function () {
          _this.input = e.target.value;
        }, 300)
      }
    }
  };
</script>

<style>
  html, body, #editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  #editor {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: left;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }

</style>
