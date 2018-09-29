<template>
  	<section class="full-height">
    	<header class="top_tips">
			<span class="num_tip">{{level}}</span>
    	</header>
    	<router-view></router-view>
		<!-- 开始 -->
    	<a :class="['button_style', btnClass]" @click="next"></a>   	
  	</section>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
	name: 'topic',
	data() {
		return {
            level: ''
		}
	},
  	computed: {
        ...mapState([
            'topics',
            'answerid'
        ]),
        btnClass: function () {
            let num = this.$route.params.num;

            if (num === undefined) {
                this.level = '第一周';
                return 'start';
            }
            this.level = '题目' + num;
            if (num == this.topics.length) {
                return 'submit_item';
            }

            return 'next_item';
        }
	  },
  	methods: {
        ...mapActions([]),
        ...mapMutations([]),
        next () {
            let num = this.$route.params.num;

            if (num === undefined) {
                return this.$router.push('topic/1');
            }

            if (num == this.topics.length) {
                return this.$router.push('/score');
            }

            if (this.answerid[num - 1] === undefined) {
                return alert('您还没有选择答案哦');
            }

            num = ++num + '';
            return this.$router.push(num);
        },
	},
	created () {
		//初始化信息
		this.$store.dispatch('getTopic');
	},
    mounted () {
		this.$el.style.backgroundImage = 'url(./static/img/1-1.jpg)';
    }
}
</script>

<style lang="less">
	.top_tips{
		position: absolute;
		height: 7.35rem;
		width: 3.25rem;
		top: -1.3rem;
		right: 1.6rem;
		background: url(../images/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		z-index: 10;
		.num_tip{
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
	}
	.item_container_style{
		height: 11.625rem;
		width: 13.15rem;
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;
		left: 1rem;
	}	

	
	.button_style{
        display: block;
        height: 2.1rem;
        width: 4.35rem;
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%;
        margin-left: -2.4rem;
        background-repeat: no-repeat;
	}
	.start{
        background-image: url(../images/1-4.png);
    }
    .next_item{
    	background-image: url(../images/2-2.png);
    }
    .submit_item{
    	background-image: url(../images/3-1.png);
    }
    
</style>
