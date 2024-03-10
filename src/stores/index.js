import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
    state: () => ({
        userInfo: {
            userId: "-1",
            userName: "游客",
            userEmail: "",
        },
        landState: 0,
    }),

    actions: {
        //设置用户变量
        setUser(userInfo) {
            this.userInfo.userId = userInfo.userId;
            this.userInfo.userName = userInfo.userName;
            this.userInfo.userEmail = userInfo.userEmail;
        },
        //退出登录 把用户变量初始化
        clearUser() {
            this.userInfo.userId = "-1";
            this.userInfo.userName = "游客";
            this.userInfo.userEmail = "";
        },
    },

})
