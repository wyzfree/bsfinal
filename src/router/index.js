import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import LayoutVue from '../views/layout.vue'
import LoginVue from '../views/login.vue'
import SearchVue from '../views/product/search.vue'
import HistoryVue from '../views/product/history.vue'
import UserInfoVue from '../views/user/UserInfo.vue'
import UserResetPasswordVue from '../views/user/UserResetPassword.vue'

// 定义路由关系，创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LayoutVue ,redirect: '/product/search',
            children:[
            {path: '/product/search', component: SearchVue},
            {path: '/product/history', component: HistoryVue},
            {path: '/user/userInfo', component: UserInfoVue},
            {path: '/user/userResetPassword', component: UserResetPasswordVue},
            ]
        },
        { path: '/login', component: LoginVue }
    ]
})
// 导出路由器
export default router