<template>
  <div class="user">
    <!-- 个人中心-个人信息1 -->
    <section class="main_dw diy_m0">
      <div class="personal_info">
        <!-- 头像 -->
        <div class="info_tx">
          <img src="../../assets/images/logo.jpg" alt="">
        </div>
        <!-- 手机号码 -->
        <p class="info_tel">手机号:{{userInfo.phoneNum}}</p>
        <!-- 可用额度 -->
        <p class="info_quota">
          可用额度：¥
          <em v-if="userInfo.auditStatus==1">{{newfinalQuota}}</em>
          <em v-else>0</em>
        </p>
        <router-link  v-if="userInfo.quotaStatus==2" to="/quotaAdd" class="btn_quota btn_quota2">增加额度</router-link>
        <p v-else class="btn_quota btn_quota2" id="jcBtn">获取额度</p>
        <!-- this.$router.push('/bystages'); -->
      </div>
    </section>
    <!-- 个人中心-个人信息 -->

    <!-- 个人中心-功能 -->
    <section class="main_dw">
      <!-- 订单 -->
      <div class="hbm-cells" v-if="orderInfo.orderNo==undefined">
        <div class="hbm-cell hbm-cell_access" @click="noOrder">
          <div class="hbm-cell_bd">
            <p class="tit_type1"><img class="tit_icon" src="../../assets/images/icon_dd.png"/>我的订单</p>
          </div>
          <div class="hbm-cell_ft"></div>
        </div>
      </div>
      <div class="hbm-cells diy_bbot20" v-else>
        <div class="hk_url hbm-cell_access"  @click="urlSel">
          <div class="hbm-cell">
            <div class="hbm-cell_bd">
              <p class="tit_type1"><img class="tit_icon" src="../../assets/images/icon_dd.png"/>我的订单</p>
            </div>
            <div class="hbm-cell_ft" v-if="otxt" v-text="otxt"></div>
          </div>
          <div class="mer_info">
            <div class="m_pic">
              <img :src="orderInfo.logo">
            </div>
            <div class="m_mk">
              <p class="m_tit"><span v-text='orderInfo.merchantName'></span><em  v-text='newPerid'></em></p>
              <p class="m_txt1">订单状态：<em  v-text='stateText' :style="{color:stateColor}">></em></p>
              <p class="m_txt2">
                代付金额：￥<i  v-text='newAmount'></i><br/>
                订单编号：<i  v-text='orderInfo.orderNo'></i>
                <br/>交易时间：<i v-text="newtime"></i><br/>
                <span v-if="orderInfo.depositMoney>0">保证金：￥<i>{{orderInfo.depositMoney/100}}</i></span>
              </p>
            </div>
          </div>
        </div>
        <router-link to="/voucher" class="m_voucher" v-if="vouShow">保证金凭证</router-link>
      </div>
      <!-- 订单 -->

      <div class="hbm-cells order_history">
        <router-link to="/order/history" class="hbm-cell hbm-cell_access">
          <div class="hbm-cell_bd">
              <p class="tit_type1"><img class="tit_icon" src="../../assets/images/icon_lsdd.png"/>历史订单</p>
          </div>
          <div class="hbm-cell_ft"></div>
        </router-link>
      </div>

      <div class="hbm-cells">
        <router-link to="/bankcard" class="hbm-cell hbm-cell_access">
          <div class="hbm-cell_bd">
              <p class="tit_type1"><img class="tit_icon" src="../../assets/images/iocn_yhk.png"/>我的银行卡</p>
          </div>
          <div class="hbm-cell_ft"></div>
        </router-link>
      </div>

      <div class="hbm-cells">
          <!-- <a class="hbm-cell hbm-cell_access my_kq" href="/user/discount.html?order=1"> -->
        <router-link :to="/discount/+(pao)" class="hbm-cell hbm-cell_access">
          <div class="hbm-cell_bd">
              <p class="tit_type1"><img class="tit_icon" src="../../assets/images/icon_yhq.png"/>我的卡券</p>
          </div>
          <div class="hbm-cell_ft"></div>
        </router-link>
      </div>

      <div class="hbm-cells">
        <router-link to="/about" class="hbm-cell hbm-cell_access">
          <div class="hbm-cell_bd">
              <p class="tit_type1"><img class="tit_icon" src="../../assets/images/icon_gy.png"/>关于我们</p>
          </div>
          <div class="hbm-cell_ft"></div>
        </router-link>
      </div>

    </section>
    <!-- 个人中心-功能 -->
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions } from 'vuex';
import { dateFormat } from 'vux'
export default {
  name: 'user',
  data () {
    return {
      msg: 'user',
      errText:'',
      stateColor:'#ff8200',
      pao:0,//能否下单 0不能1能
      vouShow:false,
      stateText:'',
      otxt:'',
      ourl:''
    }
  },
  created(){
    // 获取订单信息
    this.getOrderinfo().then(response => {
      //console.log(response)
      this.orderHandle();
    }).catch(err => {
      this.errorEnv(err)
      this.$vux.alert.show({
        title: '出错提示',
        content: this.errorText||'获取订单信息出错！'
      });
    });

    // 获取个人信息
    this.getUserinfo().then(response => {
      if(response.quotaStatus==2&&response.auditStatus==0){
        this.$router.push('/userInAudit');
      }
    }).catch(err => {
      this.errorEnv(err)
      this.$vux.alert.show({
        title: '出错提示',
        content: this.errorText||'获取个人信息出错！'
      });
    });

  },
  filters:{
    dateFormat
  },
  computed:{
    ...mapState(['errorText','authMerges','userInfo','orderInfo']),
    newfinalQuota(){
      return this.userInfo.finalQuota/100;
    },
    newAmount(){
      return this.orderInfo.amount/100
    },
    newPerid(){
      return this.orderInfo.merchantLoanPattern.interestPerid +"期"
    },
    newtime(){
      return dateFormat(this.orderInfo.createTime, 'YYYY年MM月DD日');
    }
  },
  methods:{
    ...mapMutations(['errorEnv']),
    ...mapActions(['getUserinfo','getOrderinfo']),
    noOrder(){
      const _this=this;
      this.$vux.confirm.show({
        title: '提示',
        content: '您还没有下过单，快去我要分期下单吧！',
        onCancel () {
          //取消时操作
        },
        onConfirm () {
          //确定时操作
          _this.$router.push('/bystages');
        }
      })
    },
    orderHandle(){
      if(this.orderInfo.auditState==0){
        this.stateText='审核中';
        this.stateColor='red';
        this.ourl='/userInAudit';
      }else if(this.orderInfo.auditState==2){
          this.stateText='审核不通过';
          this.stateColor='red';
          this.ourl='/bystages';
          this.otxt='再次下单'
          this.pao=1;
      }else{
          if(this.orderInfo.confirmState==0){
              if(this.orderInfo.depositState==1||(new Date().getTime()>(this.orderInfo.auditTime-0+3600*24*1000))){
                  this.stateText='待确认';
                  this.stateColor='red';
                  this.ourl='/confirm';
                  this.otxt='去确认订单'
              }else{
                  this.stateText='待缴纳';
                  this.stateColor='red';
                  this.ourl='/deposit';
                  this.otxt='缴纳保证金'
              }
          }else{
              if(this.orderInfo.loanState==0){
                this.stateText='已确认';
              }else if(this.orderInfo.loanState==1){
                if(this.orderInfo.completeState==0){
                  this.stateText='还款中';
                  this.stateColor='blue';
                  this.ourl='/repayment';
                  this.otxt='去还款'
                }else{
                  this.stateText='还款完成';
                  this.stateColor='greed';
                  this.ourl='/bystages';
                  this.otxt='再次下单'
                  this.pao=1;
                }
              }else if(this.orderInfo.loanState==2||this.orderInfo.loanState=='2'){
                this.stateText='已退款';
                this.stateColor='red';
                this.ourl='/bystages';
                this.otxt='再次下单'
                this.pao=1;
              }
              //是否有保证金
              if(this.orderInfo.depositMoney>0){
                this.vouShow=true;
              }
          }
      }
    },
    urlSel(){
      if(this.ourl){
        this.$router.push(this.ourl);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*个人中心-头部*/
.user{ background: #fff; }
.personal_info{ height: 4rem; background: url(../../assets/images/personal_bg.jpg) no-repeat; background-size: 100% 100%;  position: relative; overflow: hidden;}
.personal_info .btn_quota{ display: block; position: absolute; z-index: 99; right: 0.44rem; top:0.46rem; width: 1.58rem; line-height: 0.46rem; text-align: center; border:1px solid #fff; color: #fff; background: #f79047; border-radius: 0.08rem; letter-spacing: 0.02rem; font-size:0.28rem;}
.personal_info .info_tx{ width: 1.72rem; height: 1.72rem; border-radius: 50%;  overflow: hidden; margin:0.5rem auto 0; position: relative;}
.personal_info .info_tx img{ width: 100%; height: 100%;}
.personal_info p{ text-align: center;  }
.personal_info .info_tel{ line-height: 0.42rem; font-size: 0.28rem; margin-top:0.2rem; }
.personal_info .info_quota{ line-height: 0.5rem; font-size: 0.36rem; margin-top:0.12rem; }
</style>
