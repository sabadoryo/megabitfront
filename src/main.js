import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(VueRouter)
const routes = [
    {
        path : '/',
        name : 'main',
        component: () => import('./components/HelloWorld')
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/Table')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')