<template>
  <div class="bystagesDetails">
    <section class="main_dw main_dw2">
				<div class="det_banner">
          <!-- <div class="swiper_box"> -->
            <!-- <swiper :list="minfo.descPic"></swiper> -->
            <swiper class="swiper_box" height="3rem" :list="picList" auto dots-class="custom-bottom" dots-position="center"></swiper>

            <!-- <div class="" for="pic in minfo.descPic">
              pic
            </div> -->
            <!-- <img v-for="pic in minfo.descPic" :src="pic" /> -->
          <!-- </div> -->
          <p class="b_name" v-text="minfo.name"></p>
        </div>
				<p class="title_type2"><i></i>机构介绍</p>
				<div class="det_itxt" v-text="minfo.description||'暂无介绍'"></div>
			</section>
			<!-- 机构信息 结束 -->

			<!-- 商户介绍 -->
			<section class="main_dw">
				<p class="title_type2"><i></i>热门活动</p>

        <div class="dis_list" v-if="minfo.txState==1">
          <img src="../../assets/images/icon_txhd.png" alt="" style="margin:0.6rem 0.24rem 0 0.3rem; width: 1.88rem; float: left;">
          <p class="hd_text" style="padding-top:0.6rem; margin-right:0.1rem; line-height: 0.48rem; color:#666;"  v-text="minfo.txms"></p>
        </div>

        <ul class="dis_list" v-else>
          <li v-for="interest in minfo.interests">111{{interest}}</li>
          <li class="dis_text">暂无活动！</li>
        </ul>
			</section>
			<!-- 商户介绍 结束 -->

			<!-- 下单按钮 -->
			<section class="footer_bntmould footer_bntmould2" v-if="isOk">
        <router-link class="fbtn_type1" :to="/orderEdit/+($route.params.mId)">去下单</router-link>
			</section>
			<!-- 下单按钮 结束 -->


  </div>
</template>

<script>
import {mapState,mapMutations,mapActions } from 'vuex';
import { Swiper } from 'vux'
export default {
  name: 'bystagesDetails',
  data () {
    return {
      isOk:false,
      minfo:{
        name:"华山整形",
        descPic:[],
        description:""
      }
    }
  },
  components: {
    Swiper
  },
  created(){
    //sconsole.log(this.userInfo)
    if(this.userInfo==null){
      // 获取个人信息
      this.getUserinfo().then(response => {
        console.log(11)
        this.getHandle();
      }).catch(err => {
        console.log(11)
        this.errorEnv(err)
        this.$vux.alert.show({
          title: '出错提示',
          content: this.errorText||'获取个人信息出错！'
        });
      });
    }else{
      console.log(22)
      this.getHandle();
    }
    this.UpdateAuthMerges();
    this.$ajax({
      method: 'get',
      url:'/static/test/merchant.json', //<---本地地址
      //url: `${API_ORIGIN}/v2/merchants/?`+this.authMerges+'&number='+this.$route.params.mId,
    }).then(response=>{
      console.log(response)
      this.minfo=response.data[0]
    }).catch(function(err){
        this.errorEnv(err);
        this.$vux.alert.show({
          title: '提示',
          content: this.errorText
        });
    })
    // 获取订单信息
    // this.getOrderinfo().then(response => {
    //   //console.log(response);
    // }).catch(err => {
    //   this.errorEnv(err)
    //   this.$vux.alert.show({
    //     title: '出错提示',
    //     content: this.errorText||'获取订单信息出错！'
    //   });
    // });

  },
  mounted(){

  },
  computed:{
    ...mapState(['errorText','authMerges','userInfo','orderInfo']),
    picList(){
      const pics=this.minfo.descPic.map(function (item) { return {"img":item} });
      return pics;
    }
  },
  methods:{
    ...mapMutations(['errorEnv','UpdateAuthMerges']),
    ...mapActions(['getUserinfo','getOrderinfo']),
    getHandle(){
      const info = this.userInfo;
      if(info.stepState==0||info.stepState==2){
        this.isOk=true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*机构详情*/
.det_banner{ width: 100%; height: 3rem; overflow: hidden; position: relative;}
.det_banner img{ width: 100%; height: 100%; }
.det_banner .b_name{ position: absolute;z-index: 99; left: 0.25rem; bottom:0.25rem; text-align: right; width: 7rem; height: 0.4rem; line-height: 0.4rem; font-size: 0.36rem; color: #fff; overflow: hidden; white-space:nowrap; text-overflow:ellipsis;}
.det_itxt{ padding: 0 0.25rem 0.35rem; }
.det_itxt p{ line-height: 0.4rem; font-size: 0.26rem; color: #666;}

.swiper_box{ width: 100%; height: 3rem; position: relative; overflow: hidden; }.swiper_box img{ position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index:80; display: none; }

.dis_list{ padding-bottom: 1.5rem; }
.dis_list .dis_text{display: none;}
.dis_list li:first-child.dis_text{display: block;;}
/*优惠券*/
.dis_list{ padding: 0rem 0.12rem;}
.dis_list li{ width: 7.26rem; height: 2rem; position: relative; margin-bottom: 0.2rem; }
.dis_list li.dis_type1{ background: url('/static/images/yhq_bg1.png') no-repeat; background-size:100% 100%; height: 2.4rem;}
.dis_list li.dis_type1 .botTxt{ position: absolute; z-index: 99; left: 0; bottom: 0; width: 100%; font-size: 0.26rem; text-align: center; line-height: 0.56rem; height: 0.56rem; color: #fff;}
.dis_list li.dis_type2{ background: url('/static/images/yhq_bg2.png') no-repeat; background-size:100% 100%;}
.dis_list li.dis_type3{ background: url('/static/images/yhq_bg3.png') no-repeat; background-size:100% 100%;}
.dis_list li a{ display: block; width: 100%; height: 100%; }
.dis_list li .inv_box{ position: absolute; z-index: 99; top: 0.14rem; right: 0.8rem; width: 1.2rem; height: 1.2rem; }
.type_ysy{ background: url('/static/images/type_ysy.png') no-repeat; background-size:100% 100%; }
.type_ygq{ background: url('/static/images/type_ygq.png') no-repeat; background-size:100% 100%;}
.dis_info{ width: 7.06rem; padding: 0.15rem 0.1rem; color: #fff; font-size: 0.24rem; }
.dis_info p{ line-height: 0.36rem; height: 0.36rem;}
.dis_info .lefBox{ float: left; width: 1.94rem; padding-left:0.2rem;}
.dis_info .lefBox p:first-child{ font-size: 0.38rem; line-height: 1.1rem; height: 1.1rem;}
.dis_info .lefBox p:first-child em{ font-size: 1rem; font-weight:bold; margin-right:0.06rem; letter-spacing: -2px;}
.dis_info .rigBox{ float: right; width: 4.3rem; padding-top: 0.2rem;}
.dis_info .rigBox p:first-child{ font-size: 0.28rem; line-height: 0.4rem; height: 0.4rem; padding-bottom:0.14rem;}
.dis_info .rigBox p:first-child em{ display: block; float: left; width:1.08rem; margin-right: 0.42rem; text-align: center; border:0.02rem solid #fff; border-radius: 0.08rem; line-height: 0.36rem;}

</style>
