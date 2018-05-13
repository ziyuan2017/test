<template lang="html">
  <div class="register">
    <section class="main_dw">
      <div class="register_logo">
        <img src="../../assets/images/hbm_logo.png" >
      </div>
      <div class="register_input">
        <div class="l_box">
          <img class="l_icon" src="../../assets/images/icon_lsj.png">
          <input type="tel" maxlength="11" placeholder="手机号" class="l_input yz_tel" v-model='mp'>
        </div>
        <div class="l_box">
          <img class="l_icon" src="../../assets/images/icon_lmm.png">
          <input type="text" maxlength="6" placeholder="验证码" class="l_input " v-model='yzm'>
          <a class="yz_btn" @click="verifyCode" v-text="yzmText"></a>
        </div>
      </div>

      <!-- 阅读协议 -->
      <div id="xy_btn"><i class="mn_radio" :class="{mn_radio_xz:isOk}" @click="read" data-tf="false"></i><p>我已阅读并同意<a @click="agreement" href="javascript:;">《用户注册须知》</a></p></div>
      <div class="register_input">
        <a class="qd_btn" id="reg_sbtn"  @click="register">注册</a>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters } from 'vuex';
export default {
  name:'register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mp:'',//手机号
      yzm:'',//验证码
      mpRegular:/^1[3|4|5|6|7|8]\d{9}$/, //验证手机号
      mpRegular:/^1[3|4|5|6|7|8]\d{9}$/, //验证手机号
      yzmText:'获取验证码',//验证码按钮文案
      code:0,//倒计时剩余秒数
      isOk:false//是否阅读
    }
  },
  computed:{
    ...mapState(['RegistrationAgreement','errorText']),
    ...mapGetters(['domain']),
  },
  methods:{
    ...mapMutations(['errorEnv']),
    //请求验证码
    verifyCode(){
      if(this.mp==''){
        this.$vux.alert.show({
          title: '提示',
          content: '手机号不能为空',
          //显示时加载
          onShow () {  },
          //隐藏时加载
          onHide () {  }
        })

      }else if(!this.mpRegular.test(this.mp)){
        this.$vux.alert.show({
          title: '提示',
          content: '请输入正确的手机号'
        });
	   	}else if(this.code>0){
        this.$vux.alert.show({
          title: '提示',
          content: '60秒内只允许获取一次验证码'
        })
      }else{
        this.$vux.loading.show({
            text: '验证码获取中'
        })
        this.$ajax({
          method: 'get',
          //url:'static/test/verifyCode.json', //<---本地地址
          url: `${API_ORIGIN}/v2/sms/verifyCode?type=1&mobile=`+this.tel,
        }).then(response=>{
            //setTimeout(()=>this.$vux.loading.hide(), 1000);
            this.$vux.loading.hide()
            this.code=60;
            this.timer();
        }).catch(function(err){
            this.$vux.loading.hide()
            this.errorEnv(err);
            this.$vux.alert.show({
              title: '提示',
              content: this.errorText
            });
        })
      }
    },
    //倒计时
    timer() {
      if (this.code > 0) {
        this.yzmText=this.code+'s';
        this.code--;
        setTimeout(this.timer, 1000);
      }else{
        this.yzmText='获取验证码';
      }
    },
    //注册请求
    register(){
      if(!this.mp){
        this.$vux.alert.show({
          title: '提示',
          content: '手机号不能为空'
        })
  		}else if(!this.yzm){
        this.$vux.alert.show({
          title: '提示',
          content: '验证码不能为空'
        })
  		}else if(!/^1[3|4|5|6|7|8]\d{9}$/.test(this.mp)){
        this.$vux.alert.show({
          title: '提示',
          content: '请输入正确的手机号'
        })
	   	}else if(!/^\d{6}$/.test(this.yzm)){
        this.$vux.alert.show({
          title: '提示',
          content: '请输入6位数字密码'
        })
	   	}else if(this.isOk==false){
        this.$vux.alert.show({
          title: '提示',
          content: '请阅读并同意《用户注册须知》'
        })
  		}else{
        this.$vux.loading.show({
            text: '注册中'
        })
        //this.$router.push(this.domain + '/v2/weixin/code/url?phoneNum='+this.mp+'&verifyCode='+this.yzm+'&from=0');
        window.location.href=`${API_ORIGIN}/v2/weixin/code/url?phoneNum=`+this.mp+'&verifyCode='+this.yzm+'&from=0';
        setTimeout(()=>this.$vux.loading.hide(), 1000);
  		}
    },
    //协议阅读状态
    read(){
      if(this.isOk){
        this.isOk=false
      }else{
        this.isOk=true
      }
    },
    //唤起协议弹窗
    agreement(){
      let _this=this
      this.$vux.confirm.show({
        title: '用户注册须知',
        content: this.RegistrationAgreement,
        onCancel () {
          //取消时操作
          _this.isOk=false
        },
        onConfirm () {
          //确定时操作
          _this.isOk=true
        }
      })
    }

  }
}
</script>

<style scoped>
/*登录*/
.register{ position: fixed; width:100%; height: 100%; background: url(../../assets/images/login_bg.jpg) no-repeat; background-size:100% 100%; }
.register_logo{ width: 1.74rem; margin:0.85rem auto 1.2rem; }
.register_input{ margin:0 auto; width: 5.5rem; font-size: 0.24rem; padding-bottom:0.75rem;}
.register_input .l_box{ position: relative; margin-bottom: 0.45rem; }
.register_input .l_input,.register_input .qd_btn{ display: block; width: 100%; border:1px solid #999; padding:0.24rem 0.5rem; line-height: 0.24rem; font-size: 0.24rem; color: #999; border-radius: 0.08rem;  background:rgba(0, 0, 0, 0); box-sizing: border-box;}
.register_input .yz_btn{ width: 1.86rem; height: 0.54rem; line-height: 0.54rem; border-left: 1px solid #999; text-align: center; position: absolute; z-index: 99; right:0.04rem; top:50%; margin-top: -0.27rem; color: #999;}
.register_input .qd_btn{ font-size: 0.3rem; color: #FF8200; text-align: center; border:1px solid #FF8200;}
.register_input .l_icon{ position: absolute; left: 0.2rem; top:50%; margin-top: -0.12rem; width: 0.24rem; height: 0.24rem; z-index: 66;}
.dialog_txtbox1 h3{ padding: 1.3em 1.6em .8em; font-size: .36rem; text-align: center;}
.register #xy_btn{width: 5.5rem; margin:0.5rem auto;}
.register .b2{text-decoration: underline;}
</style>
