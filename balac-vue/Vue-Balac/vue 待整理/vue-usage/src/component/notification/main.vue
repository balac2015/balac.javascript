<template>
    <transition name="notification-fade">
        <div role="alert"
            :class="['notification', customClass, horizontalClass]" v-show="visible" :style="positionStyle"
            @mouseenter="clearTime" @mouseleave="startTimer" @click="click">
            
            <i class="notification__icon"
                :class="[typeClass, iconClass]" v-if="type || iconClass"></i>
            <div class="notification__group"
                :class="{ 'is-with-icon': typeClass || iconClass }">
                
                <h2 class="notification__title"
                    v-text="title"></h2>
                <div class="notification__content">
                    <slot>
                        <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                        <p v-else v-html="message"></p>
                    </slot>
                </div>
                <div class="notification__closeBtn icon-close"
                    v-if="showClose"
                    @click.stop="close"></div>
            </div>
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
        }
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
        clearTimer () {
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