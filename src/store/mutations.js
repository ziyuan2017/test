import { md5 } from 'vux'
export default {
    //修改token
    UpdateToken(state,token) {
        state.token = token;
    },
    //修改userid
    UpdateUserId(state, userId) {
        state.userId = userId;
    },
    //出错提示文案
    errorEnv(state,err) {
      let text='';
      if(state.env=='dev'){
        text=err.responseText;
      }else if(state.env=='test'){
        text=err.responseText;
      }else if(state.env=='pro'){
        if(txt.responseJSON){
          text= err.responseJSON.note||JSON.stringify(err);
        }else{
          text= err.responseText||JSON.stringify(err);
        }
      }
      state.errorText = text;
    },
    seterrorText(state,txt) {
      state.errorText = txt;
    },
    UpdateAuthMerges(state) {
      if(!state.token){
        state.token = localStorage.getItem("token");
        state.userId = localStorage.getItem("userId");
      }
      let timestamp =new Date().getTime();
      state.sign = md5(timestamp + state.token);
      state.authMerges = 'userId='+state.userId+'&timestamp='+timestamp+'&sign='+state.sign;
    },
    //修改userinfo
    setUserInfo(state, uinfo) {
        state.userInfo = uinfo;
        state.orderInfo = uinfo.order;
    },
    //修改orderinfo
    setOrdersInfo(state, oinfo) {
        state.orderInfo = oinfo;
    }
}
