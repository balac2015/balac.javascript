<template>
	<aside class="sidebar">
		<section class="media">
			<img src="../assets/images/logo.png" />
			<h1 class="media-body">Adminator</h1>
		</section>
		<nav>
			<ul>
				<li v-for=" menu in menus ">
					<router-link to="/">
						<i class="icon"></i>
						<span>{{ menu.name }}</span>
					</router-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
	export default {
		props: ['menus']
	}
</script>

<style lang="scss">
	.sidebar {
		width: 70px;
		position: fixed;
		top: 0;
		left: 0;
		-webkit-backface-visibility: hidden;
		      backface-visibility: hidden;
		-webkit-transition: none;
		transition: none;
		will-change: transform;
		-webkit-transform: translate3d(0, 0, 0);
		      transform: translate3d(0, 0, 0);
		/*visibility: hidden;*/
		-webkit-overflow-scrolling: touch;
		height: 100% !important;
		max-height: 100%;
		border-radius: 0em !important;
		margin: 0em !important;
		overflow-y: auto !important;
		z-index: 102;
		border-right: 1px solid #ddd;

		> * {
			-webkit-backface-visibility: hidden;
		      backface-visibility: hidden;
		}

		nav li {
			list-style: none;
		}
	}
</style>