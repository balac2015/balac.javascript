import App from '../App';

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '/topic',
            component: r => require.ensure([], () => r(require('../views/topic')), 'topic'),
            children: [
                {
                    path: '',
                    component: r => require.ensure([], () => r(require('../views/prefix')), 'prefix')
                },
                {
                    path: ':num',
                    component: r => require.ensure([], () => r(require('../views/question')), 'question')
                }
            ]
        },
        {
            path: '/score',
            component: r => require.ensure([], () => r(require('../views/score')), 'score')
        }
    ]
}];