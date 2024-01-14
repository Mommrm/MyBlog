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
                <!-- 下滑加载 vuex 加载文章数据(根据文章分类) -->
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

export default ({
    components: {
        ArticleCard,
        ArticleClassify,
        ArticleMenu,
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
}

@media all and (max-width: 768px) {
    .article-classification {
        display: none;
    }

    .articles-container {
        width: 100%;
    }
}
</style>