const welcome = resolve => require(['../view/Welcome'], resolve)
import componentUsage from '../view/component_usage'

const routes = [
    {
        name: 'welcome',
        path: '/',
        component: welcome
    },
    {
        name: 'welcome',
        path: '/welcome',
        component: welcome
    },
    {
        name: 'c-usage',
        path: '/c-usage',
        component: componentUsage
    }
]

export default routes