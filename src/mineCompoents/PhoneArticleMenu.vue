<template>
    <div>
        <div class="menu-container">
            <div class="menu-bar">
                <div class="menu-item" :class="{ active: activeItem === 1 }" @click="selcetItem(1)">综合</div>
                <div class="menu-item" :class="{ active: activeItem === 2 }" @click="selcetItem(2)">前端</div>
                <div class="menu-item" :class="{ active: activeItem === 3 }" @click="selcetItem(3)">后端</div>
                <div class="menu-item" :class="{ active: activeItem === 4 }" @click="selcetItem(4)">工具</div>
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
            ruleState: ["comprehensive", "fore-web", "rear-web", "tool"],
        }
    },
    methods: {
        // 选择点击item
        selcetItem(index) {
            this.activeItem = index;
            this.setArticleRuleState(this.ruleState[index - 1]);
        }
    },
})

</script>

<style scoped>
.menu-bar {
    display: flex;
}

.menu-item {
    cursor: pointer;
    margin-right: 5px;
    border: 1px solid grey;
    padding: 5px 10px;
    border-radius: 5px;
}

.active {
    color: white;
    background-color: grey;
}
</style>