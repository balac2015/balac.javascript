条件渲染 Conditional Rendering


// v-if
<template v-if="ok"></template>

// v-if ... v-else
<div v-if="Math.random() > 0.5"></div><div v-else></div>

// v-if...v-else-if...v-else
<div v-if=" type === A' "></div>
<div v-else-if=" type === B' "></div>
<div v-else-if=" type === C' "></div>
<div v-else></div>

// v-show
v-show 不支持 <template> 上添加