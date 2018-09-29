/**
 * 我的模块相关路由
 */
const profile = resolve => require(['../component/profile'], resolve)
const login = resolve => require(['../component/login'], resolve)
const logout = resolve => require(['../component/logout'], resolve)

module.exports = {
    name: 'profile',
    path: '/profile',
    component: profile,
    children: [
        {
            name: 'profile.login',
            path: '/profile/login',
            component: login
        }
    ]
}