import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
  },
  mutations: {

  },
  actions: {
    changeCollapsed() {
      this.state.collapsed = !this.state.collapsed;
    },
  },
  modules: {},
});
