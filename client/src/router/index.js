import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'


const routes = [
    
    {
        path: '/HomeView',
        name: 'HomeView',
        component: HomeView
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