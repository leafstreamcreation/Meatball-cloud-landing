import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Meatball.Cloud — Your restaurant in one cloud' }
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('../views/FeaturesView.vue'),
    meta: { title: 'Features — Meatball.Cloud' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact — Meatball.Cloud' }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Meatball.Cloud';
});

export default router;
