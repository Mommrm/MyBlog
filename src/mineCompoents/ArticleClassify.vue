<template>
    <div>
        <div class="to-create-container">
            <button class="create-button" @click="toEditorPage">去创作</button>
        </div>
        <div class="article-classify-container">
            <div class="classify-item">
                <div class="item" :class="{ active: activeItem === 1 }" @click="selcetItem(1)">
                    <div>综合</div>
                </div>
            </div>
            <div class="classify-item">
                <div class="item" :class="{ active: activeItem === 2 }" @click="selcetItem(2)">
                    <div>前端</div>
                </div>
            </div>
            <div class="classify-item">
                <div class="item" :class="{ active: activeItem === 3 }" @click="selcetItem(3)">
                    <div>后端</div>
                </div>
            </div>
            <div class="classify-item">
                <div class="item" :class="{ active: activeItem === 4 }" @click="selcetItem(4)">
                    <div>工具</div>
                </div>
            </div>
            <div class="classify-item">
                <div class="item" :class="{ active: activeItem === 5 }" @click="selcetItem(5)">
                    <div>其他</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useArticleStore } from '@/stores/article';
import { storeToRefs } from 'pinia';

export default ({
    setup() {
        const articleStore = useArticleStore();

        const { articleRuleState } = storeToRefs(articleStore);
        const { setArticleRuleState } = articleStore;

        return {
            articleRuleState,
            setArticleRuleState,
        }
    },

    data() {
        return {
            activeItem: 1,
            ruleState: ["comprehensive", "fore-web", "rear-web", "tool", "other"],
        }
    },

    methods: {
        toEditorPage() {
            this.$router.push('/editorpage');
        },
        // 选择点击item
        selcetItem(index) {
            this.activeItem = index;
            this.setArticleRuleState(this.ruleState[index - 1]);
        }
    }
})

</script>

<style scoped>
.article-classify-container {
    display: block;
    width: 20vh;
    padding: 5vh 0;
    border: 1px solid rgb(247, 247, 247);
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.create-button {
    background-color: rgb(20, 109, 252);
    border: 1px solid grey;
    border-radius: 10px;
    color: white;
    width: 20vh;
    padding: 1vh 0px;
}

.create-button:hover {
    background-color: rgb(51, 129, 255);

}

.classify-item {
    width: 100%;
    margin-bottom: 5rem 0;
}

.classify-item:hover {
    color: rgb(68, 68, 252);
    background-color: rgb(252, 252, 252);
}

.item {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    font-size: larger;
}

.active {
    color: rgb(68, 68, 252);
    font-size: 30px;
    background-color: rgb(247, 247, 247);
}
</style>