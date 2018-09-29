<template>
	<div class="news-view">
		<transition :name="transition">
			<div class="news-list" v-if=" list.length ">
				<transition-group tag="ul" name="item">
					<item v-for=" item in list" :key=" item.objectId " :item=" item " />
				</transition-group>
			</div>
		</transition>
			<div class="news-list-nav">
				<a @click="previous" :class="{ disabled: disabled }">&lt; prev</a>
				<a @click="next">next &gt;</a>
			</div>
	</div>
</template>

<script>
	import Item from './Item.vue';
	import Category from '../scripts/category.js';

	export default {
		name: 'item-list',
		components: {
			Item
		},
		props: {
			type: String
		},
		data: () => ({
			transition: 'slide-right',
			list: []
		}),
		computed: {
			disabled () {
				return this.$store.state.rankIndex.length === 0;
			}
		},
		beforeCreate () {
			this.$store.dispatch('FETCH_LIST_DATA')
				.then((res) => {
					this.list = res.d.entrylist;
				});
		},
		mounted () {
			console.log( this.$route.params.page )
		},
		methods: {
			previous () {
				this.transition = 'slide-right';
				this.$store.commit('DEL_RANK_INDEX');
				this.fetchListData();
			},
			next () {
				this.transition = 'slide-left';
				this.$store.commit('ADD_RANK_INDEX', this.list[this.list.length - 1].rankIndex);
				this.fetchListData();
			},
			fetchListData () {
				this.$store.dispatch('FETCH_LIST_DATA')
					.then((res) => {
						this.list = res.d.entrylist;
					});
			}
		}
	}
</script>

<style scoped>
	.disabled {
		pointer-events: none;
	}
	.news-view {
		padding-top: 45px;
	}
	.news-list-nav, .news-list {
		background-color: #fff;
		border-radius: 2px;
	}
	.news-list-nav {
		padding: 15px 30px;
		position: fixed;
		text-align: center;
		top: 55px;
		left: 0;
		right: 0;
		z-index: 998;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	}
	.news-list-nav a {
		margin: 0 1em;
	}
	.news-list-nav .disabled {
		color: #ccc;
	}
	.news-list {
		position: absolute;
		width: 100%;
		margin: 30px 0;
		transition: all .5s cubic-bezier(.55, 0, .1, 1);
	}
	.news-list ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.slide-left-enter, .slide-right-leave-to {
        opacity: 0;
        transform: translate(30px, 0);
   }

    .slide-left-leave-to, .slide-right-enter {
        opacity: 0;
        transform: translate(-30px, 0);
    }

    .item-move, .item-enter-active, .item-leave-active {
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .item-enter{
        opacity: 0;
        transform: translate(30px, 0);
    }

    .item-leave-active{
        position: absolute;
        opacity: 0;
        transform: translate(30px, 0);
    }

    @media (max-width 600px) {
        .news-list {
            margin: 10px 0;
        }
    }
</style>