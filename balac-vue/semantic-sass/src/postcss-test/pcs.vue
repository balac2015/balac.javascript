<template>
	<main>
		<section class="autoprefixer">
			<h2>autoprefixer 插件</h2>
			<p>
				根据配置信息，自动添加供应商前缀
			</p>
		</section>
		<section class="postcss-custom-properties">
			<h2><a href="https://github.com/postcss/postcss-custom-properties">postcss-custom-properties</a> 插件</h2>
			<p>实现对W3C自定义属性规范（又名本地变量）的支持。它允许您在具有任意值的选择器中定义自定义属性，并在样式表的其他位置引用这些属性。</p>
			<p>与Less和Sass变量的用途类似：存储公共值并消除代码重复。主要区别在于范围机制略有不同; 与常规属性类似，CSS自定义属性沿元素级联传播，而不是块作用域</p>
			[自定义属性规范](https://www.w3.org/TR/css-variables/)
		</section>
		<section class="postcss-custom-selectors">
			<h2><a href="https://github.com/postcss/postcss-custom-selectors">postcss-custom-selectors</a>插件</h2>
			<p>实现的自定义选择规范。这允许您预先定义选择器并在代码中稍后引用它们</p>
			[自定义选择规范](https://drafts.csswg.org/css-extensions/#custom-selectors)
		</section>
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	export default class pcs extends Vue {}
</script>

<style scoped>
	.autoprefixer {
		display: flex;
		flex: 1;
	}

	:root {
		--container-width: 300px;
	}
	.postcss-custom-properties {
		width: var(--container-width);
		background: #efefef;
	}

	@custom-selector :--headings h1, h2, h3, h4, h5, h6, p;
	:--headings {
		color: mediumblue;
	}
</style>