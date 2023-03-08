import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import CanvasView from '../views/CanvasView.vue'
import TeamView from '../views/TeamView.vue'
import SignUpView from '../views/SignUpView.vue'
import FAQView from '../views/FAQView.vue'


const routes = [
    {
        path: '/SignUpView',
        name: 'SignUpView',
        component: SignUpView
    },
    {
        path: '/TeamView',
        name: 'TeamView',
        component: TeamView
    },
    {
        path: '/CanvasView',
        name: 'CanvasView',
        component: CanvasView
    },
    {
        path: '/',
        name: 'LandingView',
        component: LandingView
    },
    {
        path: '/HomeView',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/FAQView',
        name: 'FAQView',
        component: FAQView
    },
    {
        path: '/LoginView',
        name: 'LoginView',
        component: LoginView
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
