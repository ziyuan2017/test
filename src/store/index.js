import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';//Mutations修改状态
import actions from './actions'//actions异步修改状态
import getters from './getters'//getters计算过滤操作
import state from './state'//state访问状态对象

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
