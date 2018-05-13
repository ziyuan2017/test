<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      document.getElementById('loadingDiv').remove();
      //console.log('4-mounted 被挂载之后');
  }
}
</script>

<style>

/* html{ font-size:100px; } */
body, html { height: 100%; -webkit-tap-highlight-color: transparent; }
*,body{padding:0; margin:0;word-wrap:break-word;}
ul,ol{ list-style:none;}
a { text-decoration: none;outline:none; color: #FF8200; /* FF Opera */}
a:hover { text-decoration: none; }
i,em,strong{ font-style: normal; }
input:focus { outline: none; }

/*vux 字体设为初始值*/
.vux-alert,.vux-loading,.vux-confirm{font-size: initial;}
.weui-dialog__btn_primary{color: #FF8200;}

/*-----花贝猫页面样式-----*/
/*主体*/
#app{ width:100%; min-height: 100%; min-width:320px; max-width:750px;  position:relative!important; margin:0 auto; overflow:hidden; color: #333; font-size:0.22rem;font-family: 'helvetica neue',tahoma,'hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif; background: #fff; }
img{border:none; display:block; width: 100%; min-height: 0.1rem; }
.hbm_bg_huise{ background:#f2f2f2 }
.hbm_bg_huise .main_dw{ background: #fff; }
.main_dw{ position:relative; overflow:hidden; width:100%; margin-bottom: 0.2rem;}
.main_dw2{ margin:0rem; border-bottom: 0.2rem solid #f2f2f2;}

/*模块标题*/
.title_type1{ padding: 0.22rem 0.2rem; line-height: 0.4rem; font-size: 0.32rem; background: #fff;}
.title_type1 i { display: block; float: left; width: 0.08rem; height: 0.4rem; background: #FF8200; border-radius: 0.05rem; margin-right: 0.2rem;}
.title_type2{ padding: 0.2rem; line-height: 0.4rem; font-size: 0.3rem; background: #fff; }
.title_type2 i{ display: block; float: left; width: 0.08rem; height: 0.4rem; background: #FF8200; border-radius: 0.05rem; margin-right: 0.15rem;}


/*底部固定*/
.footer_bntmould{ position: fixed; z-index: 99; bottom: 0; left: 0; width: 100%; min-height: 1px; }
.fbtn_type1{ display: block; text-align: center; width: 100%; height: 0.88rem; font-size: 0.32rem; color: #fff; line-height: 0.88rem; background: #FF8200;}
.footer_bntmould2{ background: #fff; border-top: 2px solid #ddd; }
.fbtn_type2{ width: 3rem; float: right; }
.fts_type1{ width: 4.2rem; float: left; height: 0.88rem; line-height: 0.88rem; font-size: 0.28rem; color: #ff8200; padding-left: 0.22rem; overflow: hidden;}
.fts_type1 span{ float:left; display: inline-block; width: 2.52rem;}
.fts_type1 em{ font-size: 0.36rem; }
.mntxt_type1 { font-size: 0.24rem; display: initial; text-decoration: underline; }

/*商户信息*/
.mer_info { background: #fff; position: relative; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: flex-start; -webkit-align-items: flex-start; align-items: flex-start; padding: 0.25rem 0rem 0.25rem 0.48rem;}
.mer_info .m_pic{ padding-right:0.4rem ; width: 1rem; height: 1rem; }
.mer_info .m_pic img{ border-radius: 50%; width: 1rem;height: 1rem;}
.mer_info .m_mk{max-width:5rem; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; padding-right: 0.48rem;}
.mer_info .m_mk p{ overflow: hidden; white-space:nowrap; text-overflow:ellipsis;}
.mer_info .m_tit{ height: 0.44rem; line-height: 0.44rem; font-size: 0.32rem; color: #333; }
.mer_info .m_tit span{ float: left; height: 0.44rem; line-height: 0.44rem; display: inline-block; max-width: 12em; overflow: hidden; white-space:nowrap; text-overflow:ellipsis;}
.mer_info .m_tit em{ float: left; display: block; margin-left: 0.4rem; margin-top:0.04rem; padding:0 0.21rem; line-height: 0.36rem; font-size: 0.2rem; color: #fff; background: #FF8200; border-radius: 0.08rem;}
.mer_info .m_txt1{ height: 0.32rem; line-height: 0.32rem; font-size: 0.28rem; color: #666; margin-top: 0.25rem;  }
.mer_info .m_txt1 .em_cheng{ color: #FF8200; }
.mer_info .m_txt1 .em_lan{ color: #4A90E2; }
.mer_info .m_txt2{ line-height: 0.36rem; font-size: 0.24rem; color: #999; margin-top: 0.24rem;  }
.mer_info .m_txt3{ line-height: 0.52rem; }
.mer_info .m_dis{ font-size: 0.28rem; color: #999; margin-top: 0.16rem; line-height: 0.32rem; height: 0.32rem;}
.mer_info .m_btn1{ position: absolute; z-index: 99; right:0.48rem; top:50%; -webkit-transform: translate(0%,-50%); transform: translate(0%,-50%); font-size: 0.24rem; line-height: 0.24rem; border:1px solid #FF8200; color: #FF8200; display: block; padding:0.1rem 0.3rem; max-width: 8em; border-radius: 0.08rem; }
.mer_info2 { padding-top: 0.15rem; padding-bottom: 0.15rem; }
.mer_info2 .m_tit{ height: 0.36rem; line-height: 0.36rem; font-size: 0.28rem; }
.mer_info2 .m_txt2{ line-height: 0.26rem; margin-top: 0.05rem; }
.m_voucher{ position: absolute; z-index: 99; font-size: 0.28rem; top: 1.94rem; right: 0.5rem; text-decoration: underline; }

/*模块隐藏*/
/* .tab_box{ overflow: hidden; height: 0rem; }
.tab_box_sel{ height: initial; }
.single_mk2{ height: 0rem; overflow: hidden; } */

/*阅读协议*/
.sqts_txt{ line-height: 0.3rem; min-height: 0.3rem; padding: 0.13rem 0.3rem; font-size: 0.2rem; background: #f2f2f2; }
.sqts_txt p{ float: left; height: 0.3rem;}
.sqts_txt span{ font-size: 0.22rem; }
.sqts_txt em{ color: #D0021B;}
.sqts_txt a{ color:#FF8200; text-decoration:underline;}
.tc_protxt{ padding: 0.8rem 0; }

/*模拟单选框*/
.mn_radio{ display: inline-block; margin-right: 0.1rem; float: left; width: 0.3rem; height: 0.3rem; font: normal normal normal 14px/1 weui; font-size: 0.3rem;}
.mn_radio:before { display: inline-block; width: 0.3rem; height: 0.3rem; content: "\EA01"; color: #ff8200;}
.mn_radio.mn_radio_xz:before{ display: inline-block; width: 0.3rem; height: 0.3rem; content: "\EA06"; color: #ff8200;}

/*协议*/
.dialog_txtbox1 { text-align: left; max-height: 7rem; overflow-y: scroll;}
.dialog_txtbox1 .info_dbox1 .b_tit{ text-align: center; font-size: 0.32rem; text-indent: 0em; font-weight: bold;}
.dialog_txtbox1 p { padding-bottom: 0.24rem; font-size: 0.24rem;}
.dialog_txtbox1 p.tit{ text-indent: 2em;}
.dialog_txtbox1 i{ color: red; /*text-decoration: underline;*/}
.dialog_txtbox1 div{ padding-left:1em;}
.dialog_txtbox1 div p{ text-indent: 0em;}
.dialog_txtbox1 .info_dbox1 .d_u1 p{ padding-bottom: 0rem; }

/*结果页*/
.hbm_msg{ padding-top: 2.05rem; }
.hbm_msg .m_pic{ width: 100%; height: 2rem; }
.hbm_msg .m_pic img{ width: 2rem; height: 2rem; margin:0 auto; }
.hbm_msg .m_tit{ line-height: 0.56rem; margin-top: 0.4rem; font-size: 0.32rem; padding:0 0.8rem; text-align: center;}
.hbm_msg .m_tit:last-child{ margin-top: 0.9rem; }
.hbm_msg .m_tit em{font-size: 0.4rem;display: inline-block;padding-bottom: 0.5rem;}
.hbm_msg .m_txt{ line-height: 0.54rem; margin-top: 0.6rem; font-size: 0.28rem; padding:0 0.8rem; color: #666;}
.hbm_msg .m_txt em{ color: #FF8200; }
.hbm_msg .m_txt_cen{ text-align: center; }
.hbm_msg .m_txt2{ text-align: center; }

/*weiui转hbm*/
.hbm-cells { background-color: #fff; line-height: 1.47058824; font-size: 0.3rem; overflow: hidden; position: relative;}
.hbm-cells:before { content: " "; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e5e5e5; color: #e5e5e5; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); z-index: 2; }
.hbm-cells:after { content: " "; position: absolute; left: 0; bottom: 0; right: 0; height: 1px; border-bottom: 1px solid #e5e5e5; color: #e5e5e5; -webkit-transform-origin: 0 100%; transform-origin: 0 100%; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); z-index: 2;}
.hbm-cell { padding: 0.3rem 0.35rem; position: relative; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center;}
.hbm-cell2{ padding:0rem; }
.hbm-cell:before { content: " "; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e5e5e5; color: #e5e5e5; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); z-index: 2;}
.hbm-cell:first-child:before { display: none;}
.hbm-cell_bd { -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #333;}
.hbm-cell_bd .tit_type1{ line-height: 0.36rem; position: relative;}
.hbm-cell_bd .tit_type1 em{ font-size: 0.24rem; color: #999; margin-left: 0.1rem;}
.hbm-cell_bd .tit_type1 .tit_icon { float: left; width: 0.36rem; height: 0.36rem; margin-right: 0.25rem;}
.hbm-cell_bd .tit_type1 .t_ts{position: absolute;z-index: 99; bottom: -0.24rem; left: 0.55rem; font-size: 0.2rem; line-height: 0.24rem; color: #ff8200; }
.hbm-cell_bd .tit_type2{ line-height: 0.54rem;}
.hbm-cell_bd .tit_type2 .tit_icon { float: left; width: 0.54rem; height: 0.54rem; margin-right: 0.22rem;}
.hbm-cell_ft { text-align: right; color: #999;}
.hbm-cell_access { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); color: inherit;}
.hbm-cell_access .hbm-check_box{ margin-right:0.25rem; }
.hbm-cell_access .hbm-cell_ft { padding-right: 13px; position: relative;}
.hbm-cell_access .hbm-cell_ft:after { content: " "; display: inline-block; height: 6px; width: 6px; border-width: 2px 2px 0 0; border-color: #C8C8CD; border-style: solid; -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); position: relative; top: -2px; position: absolute; top: 50%; margin-top: -4px; right: 2px;}
.hbm-cell_access .picker_box:after{-webkit-transform: rotate(135deg); transform: rotate(135deg);}
.hbm-cell_access .picker_box.pSel:after{-webkit-transform: rotate(-45deg); transform: rotate(-45deg);}
.hbm-cell_access2 .hbm-cell_ft { padding-right: 0; font-size: 0.24rem;}
.hbm-cell_access2 .hbm-cell_ft:after{display: none;}
.hbm-input { width: 100%; border: 0; outline: 0; -webkit-appearance: none; background-color: transparent; font-size: inherit; color: inherit; height:0.36rem; line-height: 0.36rem;}
.hbm-input::-webkit-outer-spin-button, .hbm-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
/*文本框-填写资料类型1*/
.hbm-cells_fltype1.hbm-cells:before{ border-top:0px; }
.hbm-cells_fltype1 .hbm-cell_bd{ max-width:6em; font-size: 0.28rem; }
.hbm-cells_fltype1 .sr_info{ border-top: 0.2rem solid #f2f2f2; }
.hbm-cells_fltype1 .sr_info .hbm-cell_bd{ max-width:8em; }
.hbm-cells_fltype1 .hbm-cell_ft{ -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; font-size: 0.24rem; color: inherit;}
/**/
.hbm-cells .mer_info{ border-top:1px solid #e5e5e5; }

/*换路由*/
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
