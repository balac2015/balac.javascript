const router = [
    {
        path: '/zh-CN/component',
        redirect: '/zh-CN/component/installation',
        component: r => require.ensure([], () => r(require('../pages/zh-CN/' + name + '.vue'))),
        children: [
            {
                path: 'changelog',
                meta: {
                    title: '更新日志',
                    lang: 'zh-CN',
                    description: ''
                },
                name: 'component-zh-CN 更新日志',
                component: r => 
            }
        ]
    },
    {
        path: '/en-US/component', // ...
    },
    {
        path: '/es/component',  // ...
    },
    {
        path: '/zh-CN/guide',
        redirect: '/zh-CN/guide/design',
        children: []
    },
    {
        path: '/zh-CN/resource',
        name: 'resource-zn-CN',
        meta: {
            lang: 'zh-CN'
        }
    },
    {
        path: '/zh-CN',
        name: 'homezh-CN',
        meta: {
            lang: 'zh-CN'
        }
    },
    {
        path: '/en-US/guide',   // ...
    },
    {
        path: '/en-US/resource',    // ...
    },
    {
        path: '/en-US',    // ...
    },
    {
        path: '/es/guide',   // ...
    },
    {
        path: '/es/resource',    // ...
    },
    {
        path: '/es',    // ...
    },
    {
        path: '/play',
        name: play,
        component: require('../play/index.vue')
    },
    {
        path: '/',
        redirect: '/zh-CN'
    },
    {
        path: '*',
        redirect: '/zh-CN'
    }
];