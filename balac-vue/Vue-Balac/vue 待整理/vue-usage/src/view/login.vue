<template>
    <div class="modal-box">
        <div class="mask"></div>
        <transition name="bounce">
            <form class="login" v-if="type === 'login'">
                <h2 class="title">用户登录</h2>
                <div class="check-password" v-if="!!loginError">{{loginError}}</div>
                <label class="form-control">
                    <span class="name">用户名：</span>
                    <input class="text" type="text" v-model="username" @keyup="typing">
                </label>
                <label class="form-control">
                    <span class="name">密  码：</span>
                    <input class="text" type="password" v-model="password" @keyup="typing">
                </label>
                <div class="form-control">
                    <a class="button btn-look" @click="onLogin">登录</a>
                </div>
                <p class="form-control">
                    <a class="link" href="javascript:;" @click="goRegister">新用户注册</a>
                </p>
            </form>
            <form class="login" v-if="type === 'register'">
                <h2 class="title">用户注册</h2>
                <div class="check-password" v-if="!!loginError">{{loginError}}</div>
                <label class="form-control">
                    <span class="name">用户名：</span>
                    <input class="text" type="text" v-model="regname">
                </label>
                <label class="form-control">
                    <span class="name">密  码：</span>
                    <input class="text" type="password" v-model="regpasword">
                </label>
                <label class="form-control">
                    <span class="name">确认密 码：</span>
                    <input class="text" type="password" v-model="regsureword">
                </label>
                <div class="form-control">
                    <a class="button btn-look" @click="onRegister">注册</a>
                </div>
            </form>
        </transition>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                type: 'login', // 'login'、'register'
                username: '',
                password: '',
                regname: '',
                regpasword: '',
                regsureword: '',
                loginError: ''
            };
        },
        methods: {
            // 点击登录按钮
            onLogin () {
            	  var self = this;

                let username = self.username,
                    password = self.password;

                if (!username) {
                    return self.loginError = '用户名不能为空';
                }

                if (!password) {
                  return self.loginError = '密码不能为空';
                }

                self.$store.dispatch('adminLogin', {
                    name: username,
                    password: password
                }).then(function(response) {
                    if (response) {
                    	  if (response.status === 'success') {
                            localStorage.setItem('front-token', response.data.token);
                            self.$store.state.token = response.data.token;
//                            return self.$emit('onlogin');
                        } else {
                            return self.loginError = '用户名或密码错误';
                        }
                    }
                });
            },
            // 新用户注册
            goRegister () {
            	  this.loginError = '';
            	  this.type = 'register';
            },
            // 点击注册按钮
            onRegister () {
            	  var left = this;
                let name = left.regname,
                        password = left.regpasword,
                        resword = left.regsureword;

                if (!name) {
                    return self.loginError ='用户名不能为空';
                }

                if (!password) {
                  return self.loginError ='密码不能为空';
                }

                if (password !== resword) {
                  return self.loginError ='两次密码输入不一致';
                }

                this.$store.dispatch('createUser', {
                    name: name,
                    password: password
                });
            },
            // 正在输入
            typing (event) {
            	  var key = event.keyCode;
            	  this.loginError = '';

            	  if (key === 13) {
            	  	  this.onLogin();
                }
            }
        }
    }
</script>
