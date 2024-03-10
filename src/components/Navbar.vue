<template>
    <div>
        <div class="div-navbar">
            <div class="title-text-button">
                <ul>
                    <li>
                        <a @click="toPath(toCode.toHome)">主页</a>
                    </li>
                    <li>
                        <a @click="toPath(toCode.toSearch)">搜索</a>
                    </li>
                    <li>
                        <a @click="toPath(toCode.toComm)">社区</a>
                    </li>
                    <li class="dropdown">
                        <a class="dropbtn">我的空间</a>
                        <div class="dropdown-content">
                            <a @click="toPath(toCode.toLand)" v-if='userInfo.userId == "-1"'>登录</a>
                            <div v-else>
                                <a @click="toPath(toCode.toMine)">我的空间</a>
                                <a @click="toPath(toCode.toLogout)">退出登录</a>
                            </div>
                        </div>
                    </li>
                    <li style="color: white;">
                        <a>{{ userInfo.userName }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useIndexStore } from '../stores/index'
import { storeToRefs } from 'pinia';
const { getUserInfoByToken } = require("../axios/userRequest");

export default {
    setup() {
        const store = useIndexStore()

        const { userInfo } = storeToRefs(store);
        const { clearUser, setUser } = store;

        return {
            userInfo,
            clearUser,
            setUser,
        }
    },
    data() {
        return {
            active: true,
            index: 1, //当前标题选择
            toCode: {
                toHome: 0,
                toComm: 1,
                toSearch: 2,
                toMine: 3,
                toOther: 4,
                toLand: 5,
                toLogout: 6,
            },
        }
    },
    created() {
        //有token就获取用户信息
        let token = localStorage.getItem("token");
        if (token) {
            getUserInfoByToken(token).then((res) => {
                this.setUser(res.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    },
    methods: {
        toPath(path) {
            if (path === 0) {
                this.$router.push("/home");
            }
            else if (path === 1) {
                this.$router.push("/community");
            }
            else if (path === 2) {
                this.$router.push("/search");
            }
            else if (path === 3) {
                this.$router.push({
                    path: "/userspace/" + this.userInfo.userId,
                });
            }
            else if (path === 4) {
                this.$router.push("/other");
            }
            else if (path == 5) {
                this.$router.push("/landpage")
            }
            else if (path == 6) {
                this.clearUser();
                localStorage.removeItem("token");
            }
        },
    }
}

</script>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    cursor: pointer;
}

li {
    float: left;
}

li a,
.dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover,
.dropdown:hover .dropbtn {
    color: black;
    background-color: rgb(212, 212, 212);
}

li.dropdown {
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>