import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(Vuex);
// Vue.use(VueResource)
Vue.use(VueRouter);


const state = {
  selectBusInfo: null,
  isLoading: false
};

const mutations = {
  setSelectBusInfo(state, data){
    state.selectBusInfo = data;
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
};
const getters = {
  getSelectBusInfo(state){
    return state.selectBusInfo;
  }
};
const action = {};

export default new Vuex.Store({
  state,
  getters,
  mutations
})
