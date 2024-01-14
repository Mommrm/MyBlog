import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Community from '../views/Community'
import Search from '../views/Search'
import UserSpace from '../views/UserSpace'
import Other from '../views/Other'
import LandPage from '../views/LandPage'
import Register from '../views/Register'
import ArticleContent from '../views/ArticleContent'
import EditorPage from '../views/EditorPage'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/community', component: Community },
        { path: '/search', component: Search },
        { path: '/other', component: Other },
        { path: '/userspace/:userId', component: UserSpace },
        { path: '/landpage', component: LandPage },
        { path: '/register', component: Register },
        { path: '/articles/:articleId', component: ArticleContent },
        { path: '/editorpage', component: EditorPage },
    ]
})

export default router;