<template>
    <div class="body">
        <div class="register-container">
            <div class="register-text">
                <div class="topic-text">
                    注册
                </div>
            </div>
            <div class="register-message-container">
                <p>{{ registerMessage }}</p>
            </div>
            <div class="register-input">
                <div class="user-input-container">
                    <input class="user-input" type="text" placeholder="用户名(必须包含三个字符)" v-model="user.username">
                </div>
                <div class="user-input-container">
                    <input class="user-input" type="password" placeholder="密码(必须大于六位)" v-model="user.password">
                </div>
                <div class="user-input-container">
                    <input class="user-input" type="text" placeholder="邮箱" v-model="user.email">
                </div>
                <div class="register-other">
                    <router-link to="/landpage">已有账号?去登录</router-link>
                    <button class="register-button" @click="register">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
const { postRegister } = require("../axios/userRequest");

export default ({
    data() {
        return {
            user: {
                username: "",
                password: "",
                email: "",
            },
            registerMessage: ""
        }
    },

    methods: {
        register() {
            const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            console.log(this.user.username);
            console.log(this.user.password);
            if (this.user.username == "" || this.user.password == "") {
                return; // 返回
            }
            else if (this.user.username.length < 3 && this.user.password.length < 6) {
                this.registerMessage = "用户名或密码不符合要求!请修改再试!";
                return; // 返回
            }
            else if (!this.user.email.match(pattern)) {
                this.registerMessage = "邮箱不符合要求!请修改再试!";
                return; // 返回
            }
            else {
                postRegister(this.user.username, this.user.password, this.user.email)
                    .then((res) => {
                        if (res.data == -1) {
                            this.registerMessage = "已有重复用户!换个名称吧!";
                        }
                        else if (res.data == 1) {
                            console.log(res, "注册成功");
                            this.$router.push("/landpage")
                        }
                        else if (res.data == 0) {
                            this.registerMessage = "注册失败未知异常!";
                        }


                    }).catch((error) => {
                        this.registerMessage = "服务器异常!注册失败!";
                    })
            }
        }
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

.register-container {
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



.register-input {
    display: block;
}

.user-input-container {
    padding: 5px;
}

.user-input {
    padding: 5px;
    width: 100%;
}

.register-other {
    display: flex;
    justify-content: space-between;
}

.register-button {
    padding: 5px;
    background-color: rgb(238, 238, 238);
    border: 1px solid grey;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.register-button:hover {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.register-button:active {
    box-shadow: none;
}

.register-message-container {
    color: red;
}

@media all and (max-width: 800px) {
    .register-container {
        width: 90%;
        display: block;
        padding: 2vh;
        border: 1px solid grey;
        border-radius: 15px;
    }
}
</style>