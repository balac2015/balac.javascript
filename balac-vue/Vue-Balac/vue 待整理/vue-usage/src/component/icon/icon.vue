<template>
    <i :class="name">原本数据{{ name }}</i>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        name: String
    }
}    
</script>