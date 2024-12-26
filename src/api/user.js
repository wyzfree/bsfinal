// 导入request
import request from '@/utils/request.js'



// 定义用户注册接口
export const userRegisterService = (registerData) => {
    // 借助 URLSearchParams 将对象转换为查询字符串
    const params = new URLSearchParams(registerData);

    // 返回请求结果
    return request.post('/user/register', params);
};

// 定义用户登录接口
// 传入的loginData是全部欸
export const userLoginService = (loginData) => {
    const params = new URLSearchParams(loginData);
    return request.post('/user/login', params)
}

