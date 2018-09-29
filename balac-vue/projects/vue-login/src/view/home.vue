<template>
    <div id="home">
        <button @click="register">註冊 register</button>
        <button @click="select">查詢 user</button>
        <button @click="login">登錄 login</button>
        <button @click="remove">刪除 remove</button>
    </div>
</template>

<script>
    // import axios from 'axios'
    // import api from '../api'
    var token = '',
        email = '';

    export default {
        methods: {
            register () {
                return;
                var param = {
                    email: 'yantp@163.com',
                    password: '123456',
                    checkPass: '123456'
                }
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/register',
                    data: param
                }).then((response) => {
                    console.log(response)
                })
            },
            select () {
                return;
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/api/user',
                    headers: {
                        Authorization: token
                    }
                }).then((response) => {
                    console.log(response)
                })
            },
            login () {
                return;
                console.log(this)
                //
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/login',
                    data: {
                        email: 'yantp@163.com',
                        password: '123456'
                    }
                }).then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            alert('登录成功！');
                            token = response.data.token;
                            email = response.data.email;
                        }
                })
            },
            remove () {
                return;
                axios({
                    method: 'delete',
                    url: 'http://127.0.0.1:3000/api/delUser',
                    data: {}
                })
            }
        },
        mounted () {
        },
        created () {
            console.log('--------------')
        }
    }
</script>