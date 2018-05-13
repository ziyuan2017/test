<template lang="html">
  <div class="login">

  </div>
</template>

<script>
import { querystring } from 'vux'
import {mapState,mapMutations,mapGetters,mapActions } from 'vuex';
export default {
  name:'login',
  created(){
      this.$router.go(1);
      const analysis = querystring.parse(window.location.href.split('?')[1])
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.$ajax({
        method: 'get',
        //url:'static/test/login.json', //<---本地地址
        url: `${API_ORIGIN}/v2/login/token?loginCode=`+analysis.loginCode,
      }).then(response=>{
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          this.UpdateToken( response.data.token);
          this.UpdateUserId(response.data.userId)
          if(analysis.from==0){
            this.$router.push('/user');
    			}else{
            this.$router.push('/bystages');
    			}
      }).catch(function(err){
          this.errorEnv(err);
          this.$vux.alert.show({
            title: '提示',
            content: this.errorText||"登录失败,请刷新页面！"
          });
      })
  },
  methods:{
    ...mapMutations(['UpdateToken','UpdateUserId'])
  },
  computed:{
    ...mapState(['errorText','userId','token']),
    ...mapGetters(['domain']),
  }
}
</script>

<style scoped>
</style>
