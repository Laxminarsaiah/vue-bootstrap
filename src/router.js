import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./components/user/login')
        }, {
            path: '/register',
            name: 'register',
            component: () => import('./components/user/register')
        }, {
            path: '/listuser',
            name: 'userlist',
            component: () => import('./components/user/list')
        },
        {
            path: '/edituser/:id?',
            name: 'edituser',
            component: () => import('./components/user/edit')
        }
    ]
})