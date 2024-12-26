// 定义store
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 参数一：名字，唯一
// 参数二：函数，定义状态
// 返回：函数
export const useTokenStore = defineStore('token', () => {
    // 定义状态，响应式变量
    const token = ref('')

    // 定义方法,修改token
    const setToken = (newToken) => {
        token.value = newToken
    }
    // 移除token
    const removeToken = () => {
        token.value = ''
    }

    // 返回状态和方法
    return { token, setToken, removeToken }
})

