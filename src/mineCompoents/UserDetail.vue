<template>
    <div>
        <div class="user-detail-container">
            <div class="user-follow-container">
                <div class="user-follow">关注者：{{ user.userFollowers }}</div>
                <div class="user-follow">关注了：{{ user.userFollowed }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    data() {
        return {
            user: {
                userFollowers: 0, //被关注人数
                userFollowed: 0,    //关注人数
            }
        }
    },
    methods: {

    }
})

</script>

<style scoped>
.user-detail-container {
    display: block;
    border: 1px solid grey;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    padding: 5px;
}

.user-follow-container {
    display: flex;
    justify-content: space-between;
}

.user-follow {
    padding-right: 5px;
    cursor: pointer;
}
</style>