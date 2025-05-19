import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import LoginView from "@/views/LoginView.vue";
import NotAuthorizedView from "@/views/NotAuthorizedView.vue";
import CalculationView from "@/views/CalculationView.vue";

const routes = [
    {
        path: '/',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/home',
        name: 'homeRoute',
        component: HomeView
    },
    {
        //kas seda on vaja?
        path: '/not-authorized',
        name: 'notAuthorizedRoute',
        component: NotAuthorizedView
    },

    //rollide põhised pathid - kas lähevad siia või mujale???

    {
        path: '/calculation',
        name: 'calculationRoute',
        component: CalculationView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
