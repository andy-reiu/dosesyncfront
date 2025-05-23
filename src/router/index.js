import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import LoginView from "@/views/LoginView.vue";
import NotAuthorizedView from "@/views/NotAuthorizedView.vue";
import StudyView from "@/views/StudyView.vue";
import UsersView from "@/views/UsersView.vue";
import TechnicConfigurationView from "@/views/TechnicConfigurationView.vue";


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
        path: '/not-authorized',
        name: 'notAuthorizedRoute',
        component: NotAuthorizedView
    },
    {
        path: '/study',
        name: 'studyRoute',
        component: StudyView
    },
    {
        path: "/users",
        name: 'usersRoute',
        component: UsersView
    },
    {
        path: '/technic',
        name: 'technicRoute',
        component: TechnicConfigurationView
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
