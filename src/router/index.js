import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getRouterName from '@/util/verifyMenu';
import List from '@/views/list.vue';
import Add from '@/views/add.vue';
import Category from '@/views/category.vue';
import Container from '@/views/Container.vue';
import Home from '../views/Home.vue';
import login from '../views/login.vue';
import logon from '../views/logon.vue';

Vue.use(VueRouter);

const asyncRouter = [{
  path: '/home',
  name: 'home',
  component: Home,
  redirect: '/home/statistics',
  meta: {
    title: '首页',
  },
  icon: 'home',
  children: [{
    path: 'statistics',
    name: 'statistics',
    index: 1,
    component: Container,
    meta: {
      title: '统计',
    },
    icon: 'pie-chart',
  }],
},
{
  path: '/product',
  name: 'product',
  icon: 'shop',
  component: Home,
  redirect: '/product/list',
  meta: {
    title: '商品',
  },
  children: [{
    path: 'list',
    name: 'productList',
    icon: 'container',
    index: 2,

    meta: {
      title: '商品列表',
    },
    component: List,
  }, {
    path: 'add',
    name: 'productAdd',
    icon: 'import',
    index: 3,

    meta: {
      title: '添加商品',
    },
    component: Add,
  }, {
    path: 'category',
    name: 'category',
    icon: 'database',
    index: 4,

    meta: {
      title: '商品类别',
    },
    component: Category,
  }],
},
];

const routes = [{
  path: '/login',
  name: 'login',
  component: login,
},
{
  path: '/logon',
  name: 'logon',
  component: logon,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
let flag = false; // 必须放在外面,若放在里面还是存在栈溢出问题
// 还没想明白的问题，为什么向product跳转会执行两beforeEach
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/logon') {
    return next();
  }

  if (to.path !== '/login') {
    if (store.state.userInfo.appkey && store.state.userInfo.username && store.state.userInfo
      .role) {
      if (!flag) {
        const routerMenu = getRouterName(store.state.userInfo.role, asyncRouter);
        store.dispatch('changeAsyncMenuList', routerMenu);
        store.dispatch('changeMenuList', routes.concat(routerMenu)).then(() => {
          router.addRoute(routerMenu[0]);
          router.addRoute(routerMenu[1]);
          next({
            name: 'statistics',
          });
        });
        flag = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
