<template>
    <div class="user-space">
        <div class="user-space-container">
            <div class="user-info-container">
                <div class="user-info">
                    <div class="user-name">
                        {{ user.userName }}的空间
                    </div>
                    <div class="user-id">
                        uid: {{ user.userId }}
                    </div>
                </div>
            </div>
            <div class="user-articles-container">
                <div class="user-articles">
                    <userArticles :authorId="user.userId"></userArticles>
                </div>
                <div class="user-detail-container">
                    <UserDetail></UserDetail>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { getUserInfoByUserId } = require("../axios/userRequest")
import UserArticles from "@/mineCompoents/UserArticles.vue";
import UserDetail from "@/mineCompoents/UserDetail.vue";
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";


export default ({
    setup() {
        const userStore = useIndexStore();
        const { userInfo } = storeToRefs(userStore);

        return {
            userInfo,
        }
    },
    components: {
        UserArticles,
        UserDetail
    },
    created() {

        //进入用户空间获取对应用户的信息
        this.user.userId = this.$route.params.userId;
        getUserInfoByUserId(this.user.userId).then((res) => {
            this.user = res.data;
        })
    },
    //在未进入该组件时就执行
    beforeRouteEnter(to, from, next) {
        // 检查用户是否有权限访问该路由
        if (localStorage.getItem("token")) {
            next(); // 继续路由导航
        } else {
            next('/landpage'); // 重定向到错误页面或其他路由
        }
    },
    data() {
        return {
            userArticles: [],
            user: {
                userId: "",
                userName: "",
                userEmail: "",
            }
        }
    },
})


</script>

<style scoped>
.user-space {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.user-space-container {
    width: 80%;
    display: block;
}

.user-info {
    width: 100%;
    display: flex;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid grey;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
}

.user-name {
    font-size: 25px;
}

.user-id {
    display: flex;
    align-items: center;
}

.user-articles-container {
    display: flex;

}

.user-articles {
    display: block;
    width: 85%;
    padding: 5px;
    align-items: center;
    justify-content: center;
}

.user-detail-container {
    margin-left: 5px;
    width: 15%;
}

@media all and (max-width: 768px) {
    .user-detail-container {
        display: none
    }

    .user-articles {
        width: 100%;
        padding: 0;
    }
}
</style>