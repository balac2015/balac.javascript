export default function (instance) {
    return {
        // 注册
        register (data) {
            return instance.post('/api/register', data)
        },
        // 登录
        login (data) {
            return instance.post('/api/login', data)
        },
        // 查询所有用户
        all () {
            return instance.get('/api/user')
        },
        // 删除用户
        remove (id) {
            return instance.post('/api/remove', id)
        },
        // 查询单个用户信息
        info (id) {
            return instance.post('/api/info', id)
        },
        // 注销登录信息
        logout (id) {
            return instance.post('/api/logout', id)
        }
    }
}