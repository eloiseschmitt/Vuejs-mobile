import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import store from '../store/store';

import TopStories from '../views/TopStories.vue';
import CodeExamples from '../views/CodeExamples.vue';
import MyFavorites from '../views/MyFavorites.vue';

Vue.use(Router)

class RouteMeta {
  title: string;

  constructor({ title }: { title: string }) {
    this.title = title;
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'top-stories',
    component: TopStories,
    meta: new RouteMeta({ title: 'Top Stories' })
  },
  {
    path: '/code-examples',
    name: 'code-examples',
    component: CodeExamples,
    meta: new RouteMeta({ title: 'Code Examples' })
  },
  {
    path: '/my-favorites',
    name: 'my-favorites',
    component: MyFavorites,
    meta: new RouteMeta({ title: 'Favorites' })
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {

  const routeMeta = to.meta as RouteMeta;
  store.dispatch('topToolbar/changeTitle', routeMeta.title);
  next();
});

export default router
