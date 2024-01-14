import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8077',
})

// 登录
export const postLogin = (user_email, user_password) => {
    return api.post('/user/login', {
        userEmail: user_email,
        userPassword: user_password,
    });
};
// 注册
export const postRegister = (user_name, user_password, user_email) => {
    return api.post('/user/register', {
        userName: user_name,
        userPassword: user_password,
        userEmail: user_email,
    })
};
// 根据token查询用户信息 post方法
export const getUserInfoByToken = (token) => {
    return api.post('/user/infobytoken', {
        token: token,
    });
};
// 根据用户名获得用户Id
export const getUserIdByName = (userName) => {
    return api.get('/user/userspace', {
        params: {
            userName: userName,
        }
    })
}
//根据用户Id获得用户信息
export const getUserInfoByUserId = (userId) => {
    return api.get('/user/infobyid', {
        params: {
            userId: userId,
        }
    })
}



