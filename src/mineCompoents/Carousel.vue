<template>
    <div class="body">
        <div class="shell">
            <div class="content">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 30em;
    background-image: linear-gradient(to top #9795f0 0%, #fbc8d4 100%);
    overflow: hidden;
}

.shell {
    position: relative;
    width: 60vw;
    height: 40vw;
    max-width: 380px;
    max-height: 250px;
    margin: 0;
    color: white;
    perspective: 1000px;
    transform-origin: center;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: translateZ(-30vw) rotateY(0);
    animation: carousel 9s infinite cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.item {
    position: absolute;
    width: 60vw;
    height: 40vw;
    max-width: 380px;
    max-height: 250px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    background-size: cover;
    -webkit-box-reflect: below 25px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
}

/* 第一个项目样式 */
.item:nth-child(1) {
    background-image: url(../resources/images/a.jpg);
    /* 背景图片为01.jpg */
    transform: rotateY(0) translateZ(35vw);
    /* 变换：绕y轴旋转0度，沿z轴平移35vw */
}

/* 第二个项目样式 */
.item:nth-child(2) {
    background-image: url(../resources/images/b.jpg);
    /* 背景图片为02.jpg */
    transform: rotateY(120deg) translateZ(35vw);
    /* 变换：绕y轴旋转120度，沿z轴平移35vw */
}

/* 第三个项目样式 */
.item:nth-child(3) {
    background-image: url(../resources/images/c.jpg);
    /* 背景图片为03.jpg */
    transform: rotateY(240deg) translateZ(35vw);
    /* 变换：绕y轴旋转240度，沿z轴平移35vw */
}

/* 定义动画 */
@keyframes carousel {

    0%,
    17.5% {
        transform: translateZ(-35vw) rotateY(0);
        /* 变换：沿z轴平移-35vw，绕y轴旋转0度 */
    }

    27.5%,
    45% {
        transform: translateZ(-35vw) rotateY(-120deg);
        /* 变换：沿z轴平移-35vw，绕y轴旋转-120度 */
    }

    55%,
    72.5% {
        transform: translateZ(-35vw) rotateY(-240deg);
        /* 变换：沿z轴平移-35vw，绕y轴旋转-240度 */
    }

    82.5%,
    100% {
        transform: translateZ(-35vw) rotateY(-360deg);
        /* 变换：沿z轴平移-35vw，绕y轴旋转-360度 */
    }
}
</style>