<template>
    <div class="item_back item_container_style">
        <div class="item_list_container" v-if="topic !== undefined">
            <header class="item_title">{{topic.topic_name}}</header>
            <ul>
                <li v-for="(item, index) in topic.topic_answer" @click="choosed(item.topic_answer_id)" class="item_list">
                    <span class="option_style" v-bind:class="{'has_choosed': id === item.topic_answer_id}">{{formCharCode(index)}}</span>
                    <span class="option_detail">{{item.answer_name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'question',
        data () {
            return {
                id: ''
            };
        },
        computed: {
            ...mapState([
                'topics',
                'answerid'
            ]),
            num () {
                return this.$route.params.num - 1;
            },
            topic () {
                this.id = this.answerid[this.num] || '';

                return this.topics[this.num];
            }
        },
        methods: {
            ...mapMutations([
                'REMBER_ANSWER'
            ]),
            choosed (id) {
                this.id = id;
                this.REMBER_ANSWER({
                    key: this.num,
                    value: id
                });
            },
            formCharCode (index) {
                return String.fromCharCode(65 + index);
            }
        }
    };
</script>

<style lang="less" scoped>
	.item_back{
		background-image: url(../images/2-1.png);
		background-size: 100% 100%;
	}
    .item_list_container{
    	position: absolute;
    	height: 7.0rem;
    	width: 8.0rem;
    	top: 2.4rem;
    	left: 3rem;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 0.65rem;
		color: #fff;
		line-height: 0.7rem;
	}
	.item_list{
		font-size: 0;
		margin-top: 0.4rem;
		width: 10rem;
		span{
			display: inline-block;
			font-size: 0.6rem;
			color: #fff;
			vertical-align: middle;
		}
		.option_style{
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}
		.has_choosed{
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}
		.option_detail{
			width: 7.5rem;
			padding-top: 0.11rem;
		}
	}
</style>