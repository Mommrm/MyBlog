<template>
    <div class="body">
        <div class="land-container">
            <div class="land-text">
                <div class="topic-text">
                    登陆
                </div>
            </div>
            <div class="login-message-container">
                <p>{{ loginMessage }}</p>
            </div>
            <div class="land-input">
                <div class="user-input-container">
                    <input class="user-input" type="text" placeholder="邮箱" v-model="user.email">
                </div>
                <div class="user-input-container">
                    <input class="user-input" type="password" placeholder="密码" v-model="user.password" @keyup.enter="login">
                </div>
                <div class="land-other">
                    <router-link to="/register">没有账号？去注册</router-link>
                    <button class="land-button" @click="login">登陆</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
const { postLogin, getUserInfoByToken } = require('../axios/userRequest')
import { useIndexStore } from '../stores/index'

export default ({
    setup() {
        const store = useIndexStore()

        const { userInfo } = store.$state;
        const { setUser, clearUser } = store;

        return {
            userInfo,
            setUser,
            clearUser,
        }
    },
    data() {
        return {
            user: {
                password: "",
                email: "",
            },
            stateCode: -1,
        }
    },
    computed: {
        //自动处理登录后的message
        loginMessage() {
            if (this.stateCode == 2) {
                return "服务器异常，请稍后再试!";
            }
            else if (this.stateCode == 1) {
                return "邮箱或密码错误，请认真检查一下吧!"
            }
            else {
                return ""
            }
        }
    },
    methods: {
        //登录
        login() {
            if (this.user.email == "" || this.user.password == "") {
                alert("邮箱和密码不能为空");
                return; // 返回
            }
            else {
                //可以改为Promise链式优化代码
                postLogin(this.user.email, this.user.password)
                    .then((res) => {
                        if (res.data == "") {
                            console.log(res, '登录失败!');
                            this.stateCode = 0;
                        }
                        else {
                            console.log("登录成功!");
                            //token存在localStorage中
                            localStorage.setItem("token", res.data);
                            //获取到用户信息 存储到pinia中
                            getUserInfoByToken(res.data)
                                .then((info) => {
                                    this.setUser(info.data);
                                    console.log(this.userInfo);
                                })
                            this.stateCode = 1;
                            this.$router.push("/home");
                        }
                    })
                    .catch((error) => {
                        console.log(error, "登录失败，出现异常");
                        this.stateCode = 2;
                    })
            }
        },
    }
})

</script>

<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
}

.land-container {
    width: 30%;
    display: block;
    padding: 2vh;
    border: 1px solid grey;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.topic-text {
    font-size: 2rem;
    user-select: none;
}

.land-input {
    display: block;
}

.user-input-container {
    padding: 5px;
}

.user-input {
    padding: 5px;
    width: 100%;
}

.land-other {
    display: flex;
    justify-content: space-between;
}

.land-button {
    padding: 5px;
    background-color: rgb(238, 238, 238);
    border: 1px solid grey;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.land-button:hover {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.land-button:active {
    box-shadow: none;
}

.login-message-container {
    color: red;
}

@media all and (max-width: 800px) {
    .land-container {
        width: 90%;
        display: block;
        padding: 2vh;
        border: 1px solid grey;
        border-radius: 15px;
    }
}
</style>