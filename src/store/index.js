import Vue from 'vue';
import Vuex from 'vuex';
import {
  getCookie,
  setCookie,
  delCookie,
} from '../util/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    username: '',
    loginStatus: false,
    userInfo: getCookie(),
    menuList: [],
    filterList: [],
    headTitle: [{
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '描述',
      dataIndex: 'desc',
    }, {
      title: '类目',
      dataIndex: 'categoryName',

    }, {
      title: '标签',
      dataIndex: 'tags',
    }, {
      title: '价格',
      dataIndex: 'price',
    }, {
      title: '折扣价',
      dataIndex: 'price_off',
    }, {
      title: '状态',
      dataIndex: 'upStatus',
    }, {
      title: '库存量',
      dataIndex: 'inventory',
    }, {
      title: '销量',
      dataIndex: 'sale',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      scopedSlots: {
        customRender: 'action',
      },
    },
    ],
    category: [],
    breadcrumb: [],
  },
  mutations: {
    changeUser(state, user) {
      state.username = user;
    },
    userSetCookie(state, info) {
      state.userInfo = info;
    },
    userDelCookie(state, info) {
      state.userInfo = info;
    },
    changeList(state, list) {
      state.menuList = list;
    },
    changeFilterList(state, list) {
      state.filterList = list;
    },
    setBreadcrumb(state, data) {
      state.breadcrumb.push(data);
    },
    delBreadcrumb(state, index) {
      state.breadcrumb.splice(index, 1);
    },
    setCategory(state, data) {
      state.category = data;
    },
  },
  actions: {
    changeCollapsed() {
      this.state.collapsed = !this.state.collapsed;
    },
    setUserInfo({
      commit,
    }, info) {
      commit('userSetCookie', info);
      setCookie(info);
    },
    delUserInfo({
      commit,
    }) {
      // 改store的数据
      commit('userDelCookie', delCookie());
      // 改cookie数据
    },
    changeMenuList({
      commit,
    }, menuList) {
      commit('changeList', menuList);
    },
    changeAsyncMenuList({
      commit,
    }, filterList) {
      commit('changeFilterList', filterList);
    },
    setBreadcrumbInfo({
      commit,
    }, data) {
      commit('setBreadcrumb', data);
    },
    delBreadcrumbInfo({
      commit,
    }, index) {
      commit('delBreadcrumb', index);
    },
    setCategoryInfo({
      commit,
    }, data) {
      commit('setCategory', data);
    },
  },
  modules: {},
});
