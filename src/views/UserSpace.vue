<template>
    <div>
        <div class="">{{ user.userName }}的空间</div>
    </div>
</template>

<script>
const { getUserInfoByUserId } = require("../axios/userRequest")

export default ({
    created() {
        this.user.userId = this.$route.params.userId;
        getUserInfoByUserId(this.user.userId).then((res) => {
            this.user = res.data;
        })
    },
    watch: {
        user: {
            handler(newValue, oldValue) {
                console.log("new: ", newValue, " old: ", oldValue);
            }
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

<style scoped></style>