import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Results from '../views/Results.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    name: 'Results',
    path: '/results',
    component: Results,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
