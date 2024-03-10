<template>
    <div>
        <div class="community-container">
            <div class="article-classification">
                <ArticleClassify></ArticleClassify>
            </div>
            <div class="articles-container">
                <div class="articlemenu">
                    <ArticleMenu></ArticleMenu>
                </div>
                <!--当手机屏幕时才显示-->
                <div class="phone-articlemenu">
                    <PhoneArticleMenu></PhoneArticleMenu>
                </div>
                <div class="articlecard">
                    <ArticleCard></ArticleCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArticleCard from '@/mineCompoents/ArticleCard.vue';
import ArticleClassify from '@/mineCompoents/ArticleClassify.vue';
import ArticleMenu from '@/mineCompoents/ArticleMenu.vue';
import PhoneArticleMenu from '@/mineCompoents/PhoneArticleMenu.vue';

export default ({
    components: {
        ArticleCard,
        ArticleClassify,
        ArticleMenu,
        PhoneArticleMenu
    },
    created() {
        sessionStorage.setItem("method", "recommend");
        sessionStorage.setItem("rule", "comprehensive");
    },
    data() {
        return {

        }
    },
    methods: {
        toEditorPage() {
            this.$router.push('/editorpage');
        }
    },
})

</script>

<style scoped>
.community-container {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: space-evenly;
}

.article-classification {
    display: flex;
    justify-content: center;
    width: 15%;
}

.articles-container {
    width: 80%;
}

.articlemenu {
    margin-bottom: 1vh;
    display: block;
}

.phone-articlemenu {
    display: none;
    margin-bottom: 1vh;
}

@media all and (max-width: 768px) {
    .article-classification {
        display: none;
    }

    .articlemenu {
        display: none;
    }

    .phone-articlemenu {
        display: block;
    }

    .articles-container {
        width: 100%;
    }
}
</style>