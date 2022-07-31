import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListView from '@/views/UserList.vue'
import UserProfileView from '@/views/UserProfile.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/userlist/',
        name: 'userlist',
        component: UserListView
    },
    {
        path: '/userprofile/:userId/',
        name: 'userprofile',
        component: UserProfileView
    },
    {
        path: '/login/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register/',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/notfound/',
        name: 'notfound',
        component: NotFoundView
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/notfound/'
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
