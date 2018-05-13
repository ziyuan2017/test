import axios from 'axios'
import _ from 'lodash'
export default {
  // getOmSub({ commit, state }, { relatedId, callback }) {
  //     const params = {
  //         'relatedId': relatedId,
  //         "token": state.token,
  //         "status": 0
  //     }
  //
  //     return axios.post(`${API_ORIGIN}/api/om/omSub`, params)
  //         .then(res => {
  //             let subAccounts = res.data.data;
  //             // 如果有回调则调用回调，否则执行默认操作
  //             typeof callback === "function" ? callback(subAccounts) :
  //                 commit('SettlementAddUpdateSubAccounts', { subAccounts })
  //         });
  // }
  getUserinfo ({ commit, state ,getters }) {
    commit('UpdateAuthMerges')
    return new Promise((resolve, reject) => {
              axios({
                method: 'get',
                url:'/static/test/userinfo.json', //<---本地地址
                //url: `${API_ORIGIN}/v2/users/step?`+state.authMerges,
              }).then(response=>{
                  console.log(response)
                  commit('setUserInfo', response.data);
                  resolve(response)
              }).catch(function(err){
                  reject(err);
              });
           });
  },
  getOrderinfo ({ commit, state }) {
    commit('UpdateAuthMerges')
    return new Promise((resolve, reject) => {
              axios({
                method: 'get',
                url:'static/test/orderinfo.json', //<---本地地址
                //url: `${API_ORIGIN}/v2/users/quota?`+state.authMerges,
              }).then(response=>{
                  commit('setOrdersInfo', response.data);
                  resolve(response)
              }).catch(function(err){
                  reject(err);
              });
           });
  },
  getIdentify ({ commit, state }) {
    commit('UpdateAuthMerges')
    return new Promise((resolve, reject) => {
              axios({
                method: 'get',
                url:'static/test/identify.json', //<---本地地址
                //url: `${API_ORIGIN}//v2/users/identify?`+state.authMerges,
              }).then(response=>{
                  commit('setOrdersInfo', response.data);
                  resolve(response)
              }).catch(function(err){
                  reject(err);
              });
           });
  }

    // users/quota
}
