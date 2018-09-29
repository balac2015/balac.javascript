<template>
    <div class="usage">
        <icon name="标签形式使用组件：传入的 props 值"></icon>

        <button @click="showMessage">js 中调用组件</button>
    </div>
</template>

<script>
export default {
    name: 'component-usage',
    methods: {
        showMessage () {
            this.$message('js 中调用组件成功！');
        }
    }
}    
</script>