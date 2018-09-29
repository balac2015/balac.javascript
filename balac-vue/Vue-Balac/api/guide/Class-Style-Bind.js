Class 与 Style 绑定


都是属性用 v-bind 处理


绑定 Class
    
    v-bind:class=" { active: isActive, 'text-danger': hasError} "   // 渲染为 class="className active"

    v-bind:class=" classObject "                                    // 直接绑定数据里的对象，也可以绑定返回对象的计算属性

        data: {
            classObject: {                  // 直接绑定数据里的对象
                active: true,
                'text-danger': false
            }
        }

        data: {
            isActive: true,
            error: null
        },
        computed: {
            classObject: function() {       // 绑定返回对象的计算属性
                return {
                    active: this.isActive && !this.error,
                    'text-danger': this.error && this.error.type === 'fatal'
                };
            }
        }


    v-bind:class=" [activeClass, errorClass] "                     // 数组语法

        data: {
            activeClass: 'active',
            errorClass: 'text-danger'
        }

    v-bind:class=" [isActive ? activeClass : '', errorClass] "    // 数组中的三元

    v-bind:class=" [{ active: isActive }, errorClass] "           // 数组中使用对象

    组件中定义的 class 将会和引用时的 class 连接在一起，引用时可用 v-bind:class



绑定内联样式：

    v-bind:style=" { color: activeColor, fontSize: fontSize + 'px' } " // 绑定的为对象，驼峰式 camelCase 或 短横分隔命名 kebab-case

    v-bind:style=" styleObject "                                       // 直接绑定对象，返回对象的计算属性

    v-bind:style=" [baseStyle, overridingStyles] "                     // 数组语法

    v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。
