// const Home = () => import(/* webpackChunkName: "home" */ './pages/Home.vue');
// const Portfolio = () => import(/* webpackChunkName: "portfolio" */ './pages/Portfolio.vue');
const NotFound = () => import(/* webpackChunkName: "not_found" */ './pages/404.vue');

import Home from './pages/Home.vue'
import Portfolio from './pages/Portfolio.vue'

export default [
    { 
        path: '/', 
        component: Home,
        children: [
            {
                path: 'portfolio/:id',
                name: 'portfolio',
                component: Portfolio
            } 
        ]
    }
]