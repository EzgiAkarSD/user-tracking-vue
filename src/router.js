import Vue from 'vue';
import VueRouter from 'vue-router';
import TodosPage from '../src/components/TodosPage.vue';
import HomePage from '../src/components/HomePage.vue';
import PostsPage from '../src/components/PostsPage.vue';
import AlbumsPage from '../src/components/AlbumsPage.vue';
import PhotoPage from '../src/components/PhotoPage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: "HomePage", component: HomePage, path: "/" },
    { name: "TodosPage", component: TodosPage, path: "/todo/:userId" },
    { name: "PostsPage", component: PostsPage, path: "/posts" },
    { name: "AlbumsPage", component: AlbumsPage, path: "/albums" },
    { name: "PhotoPage", component: PhotoPage, path: "/photo" }
  ]
});

export default router;