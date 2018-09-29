<template>
    <transition name="message-fade">
        <div role="alert"
            :class="['el-message', type && !iconClass ? `el-message--${ type }` : '', center ? 'is-center' : '', customClass]" v-show="visible"
            @mouseenter="clearTime" @mouseleave="startTimer">
            
            <i :class="iconClass" v-if="iconClass"></i>
            <i :class="typeClass" v-else></i>
            <slot>
                <p class="el-message__content"
                    v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                <p class="el-message__content"
                    v-else v-html="message"></p>
            </slot>
            <i class="el-message__closeBtn el-icon-close"
                v-if="showClose"
                @click="close"></i>
        </div>
    </transition>
</template>

<script type="text/babel">
    const typeMap = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error'
    }
    export default {
        data () {
            return {
                visible: false,
                message: '',
                duration: 3000,
                type: 'info',
                iconClass: '',
                customClass: '',
                showClose: false,
                closed: false,
                timer: null,
                dangerouslyUseHTMLString: false,
                center: false
            }
        },
        computed: {
            iconWrapClass () {
                const classes = ['el-message__icon'];

                if (this.type && !this.iconClass) {
                    classes.push(`el-message__icon--${ this.type } `);
                }

                return classes;
            },
            typeClass () {
                return this.type && !this.iconClass
                    ? `el-message__icon el-icon-${ typeMap[this.type] }`
                    : ''
            }
        },
        watch: {
            closed (newVal) {
                if (newVal) {
                    this.visible = false
                    this.$el.addEventListener('transitionend', this.destoryElement)
                    
                }
            }
        },
        methods: {
            destoryElement () {
                this.$el.removeEventListener('transitionend', this.destoryElement)
                this.$destory(true)
                this.$el.parentNode.removeChild(this.$el)
            },
            close () {
                this.closed = true

                if (typeof this.onClose === 'function') {
                    this.onClose(this)
                }
            },
            clearTime () {
                clearTimeout(this.timer)
            },
            startTimer () {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close()
                        }
                    }, this.duration)
                }
            },
            keydown (e) {
                //ESC 关闭消息
                if (e.keyCode === 27) {
                    if (!this.closed) {
                        this.close()
                    }
                }
            }
        },
        mounted () {
            this.startTimer()
            document.addEventListener('keydown', this.keydown)
        },
        beforeDestory () {
            document.addEventListener('keydown', this.keydown)
        }
    }    
</script>

<style>
    .el-message {
        min-width: 380px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: #ebeef5;
        position: fixed;
        left: 50%;
        top: 20px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-color: #edf2fc;
        -webkit-transition: opacity .3s,-webkit-transform .4s;
        transition: opacity .3s,-webkit-transform .4s;
        transition: opacity .3s,transform .4s;
        transition: opacity .3s,transform .4s,-webkit-transform .4s;
        padding: 15px 15px 15px 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .el-message.is-center {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center
    }

    .el-message p {
        margin: 0
    }

    .el-message--info .el-message__content {
        color: #909399
    }

    .el-message--success {
        background-color: #f0f9eb;
        border-color: #e1f3d8
    }

    .el-message--success .el-message__content {
        color: #67c23a
    }

    .el-message--warning {
        background-color: #fdf6ec;
        border-color: #faecd8
    }

    .el-message--warning .el-message__content {
        color: #e6a23c
    }

    .el-message--error {
        background-color: #fef0f0;
        border-color: #fde2e2
    }

    .el-message--error .el-message__content {
        color: #f56c6c
    }

    .el-message__icon {
        margin-right: 10px
    }

    .el-message__content {
        padding: 0;
        font-size: 14px;
        line-height: 1
    }

    .el-message__closeBtn {
        position: absolute;
        top: 50%;
        right: 15px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
        color: #c0c4cc;
        font-size: 16px
    }

    .el-message__closeBtn:hover {
        color: #909399
    }

    .el-message .el-icon-success {
        color: #67c23a
    }

    .el-message .el-icon-error {
        color: #f56c6c
    }

    .el-message .el-icon-info {
        color: #909399
    }

    .el-message .el-icon-warning {
        color: #e6a23c
    }

    .el-message-fade-enter,.el-message-fade-leave-active {
        opacity: 0;
        -webkit-transform: translate(-50%,-100%);
        transform: translate(-50%,-100%)
    }
</style>