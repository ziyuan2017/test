<template>
  <div class="bystages">
    <!-- 商户列表 -->
		<section class="main_dw main_lb">
			<!-- 定位 -->
			<div id="container"></div>
			<p class="dw_txt"><i class="h_range"></i>当前位置：<em v-text="dwTxt"></em></p>

			<!-- 搜索框 -->
      <div class="hbm_search" id="searchBar">
      <div class="sea_barbox">
          <i @click="getmerList" class="sea_icon weui-icon weui_icon_search weui-icon-search"></i>
          <input type="search" @keyup.enter="getmerList()" class="sea_input" id="searchInput" placeholder="输入商户名称" v-model="searchTxt">
          <!-- <a class="sea_clear_icon weui-icon" href="javascript:" id="searchClear"></a> -->
      </div>
      </div>

			<!-- 商户列表 -->
			<div class="merchant_box">
				<p class="mer_tit">相关商户</p>
				<ul class="mer_list">
          <li v-for="item in merList" @click="urlDetails(item)">
            <div class="mer_info">
              <div class="m_pic">
                <img :src="item.logo">
              </div>
              <div class="m_mk">
                <p class="m_tit" v-text="item.name"></p>
                <p class="m_dis" v-text="item.description"></p>
              </div>
            </div>
  				</li>
        </ul>
        <p class="mer_tst" v-html="txText"></p>
				<!-- <p class="mlist_ts" ><a class="add_list abtn_type1" href="javascript:;">更多商户</a></p> -->
			</div>
		</section>
		<!-- 商户列表 结束 -->

  </div>
</template>

<script>
import {mapState,mapMutations,mapActions } from 'vuex';
export default {
  name: 'bystages',
  data () {
    return {
      msg: 'bystages',
      dwTxt:'',
      searchTxt:'',
      merList:[],
      txText:'请输入商户名称进行搜索。'
    }
  },
  created(){
    // 获取订单信息
    // this.getOrderinfo().then(response => {
    //   //console.log(response);
    //   this.getCount++;
    //   this.getHandle();
    // }).catch(err => {
    //   this.errorEnv(err)
    //   this.$vux.alert.show({
    //     title: '出错提示',
    //     content: this.errorText||'获取订单信息出错！'
    //   });
    // });

    // 获取个人信息
    this.getUserinfo().then(response => {
      const info=response.data;
      if(info.stepState==1){
        this.$router.push('/validate');//身份认证
      }else if((info.stepState==2||info.stepState==4)&&info.status==0){
          this.$router.push('/userInAudit');//审核中
      }else if(info.stepState==3){
          if(info.ocrState==1){
            this.$router.push('/auditList');//身份认证
          }else{
            this.$router.push('/validate');//身份认证
          }
      }else{
      	//请求定位
      }
    }).catch(err => {
      this.errorEnv(err)
      this.$vux.alert.show({
        title: '出错提示',
        content: this.errorText||'获取个人信息出错！'
      });
    });

  },
  computed:{
    ...mapState(['errorText','authMerges','userInfo','orderInfo']),
  },

  methods:{
    ...mapMutations(['errorEnv','UpdateAuthMerges']),
    ...mapActions(['getUserinfo','getOrderinfo']),
    urlDetails(item){
      console.log(item);
      this.$router.push('/bystagesDetails/'+item.mid);
    },
    getmerList(){
      if(this.searchTxt==''){
        return;
      }
      this.UpdateAuthMerges();
      this.$ajax({
        method: 'get',
        url:'static/test/merchantsList.json', //<---本地地址
        //url: `${API_ORIGIN}/v2/merchants/?`+this.authMerges+'&name='+this.searchTxt,
      }).then(response=>{
        console.log(response)
        if(response.data.length>0){
          this.txText="";
          this.merList=response.data;
        }else{
          this.merList=[];
          this.txText="很抱歉，没有找到相关的商户，<br/>请输入商户名称进行搜索。"
        }

      }).catch(function(err){
          this.$vux.loading.hide()
          this.errorEnv(err);
          this.$vux.alert.show({
            title: '提示',
            content: this.errorText
          });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*定位文案样式*/
.dw_txt{padding: 0.14rem 0.2rem 0.18rem; line-height: 0.3rem; font-size: 0.28rem; color: #FF8200;}

/*搜索框*/
.hbm_search{ position: relative; padding: 0.1rem 0.16rem; display: -webkit-box; display: -webkit-flex; display: flex; box-sizing: border-box;}
.sea_barform { position: relative; -webkit-box-flex: 1; -webkit-flex: auto; flex: auto; }
.sea_barbox{ border:0.02rem solid #ccc; border-radius: 0.1rem; height: 0.58rem; position: relative; padding-left:0.6rem; padding-right:0.2rem; width: 100%; box-sizing: border-box; z-index: 1;}
.sea_icon{ color: #B2B2B2; font-size: 0.28rem; position: absolute; left: 0.15rem; top: 0; line-height: 0.58rem;z-index: 99;}
.sea_icon:before { display: inline-block; margin-left: .2em; margin-right: .2em; content: "\EA0E"; }
.sea_input{ width: 100%; height: 0.28rem; border: 0; line-height:0.28rem; font-size: 0.28rem; padding:0.13rem 0; box-sizing: content-box; background: transparent; }
.sea_clear_icon{ position: absolute; z-index: 99; top: 0; right: 0; padding: 0 0.15rem;  line-height: 0.58rem; font-size: 0.28rem;}
/* .sea_clear_icon:before { content: "\EA0F";} */
.hbm_search .sea_clear_icon{ color: #B2B2B2; }
.sea_input:not(:valid) ~ .sea_clear_icon { display: none; }

.merchant_box{ font-size: 0.32rem;}
.mer_tit{ padding: 0 0.2rem; line-height: 0.86rem; }
.mer_tst{ padding-top: 0.5rem; line-height: 0.44rem; text-align: center;}
.mer_list{ padding-bottom: 0.5rem; }
.mer_list .mer_info{ padding-bottom: 0px; }
.mer_list .mer_info .m_mk{ padding-bottom:0.25rem; border-bottom: 2px solid #eee;}

/*我要分期*/
#container{ width: 300px; height: 150px; position: fixed; left: -600px; top: -300px;}
.mlist_ts{ text-align: center; width: 5.5rem; font-size: .32rem; line-height: .76rem; margin: 0 auto; color: #666;}

</style>
