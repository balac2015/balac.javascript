import axios from 'axios'
import user from './user'

const instance = axios.create()
// instance.defaults.baseURL = 'http://127.0.0.1:3000/'
instance.defaults.timeout = 5000
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use((config) => {
    var token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = token.replace(/(^\")|(\"$)/g, '')
    }

    return config;
}, (err) => {
    return Promise.reject(err)
})
// axios 拦截响应
instance.interceptors.request.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export const USER = user(instance)