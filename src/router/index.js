import Vue from 'vue'
import Router from 'vue-router'
//import state from '@/store/state'
Vue.use(Router)


// import Login from '@/pages/login'
// 登录注册
const Login = r => require.ensure([], () => r(require('@/pages/login')), 'Login')
const Register = r => require.ensure([], () => r(require('@/pages/register')), 'Register')

//个人中心
const User = r => require.ensure([], () => r(require('@/pages/user')), 'User')
const UserInAudit = r => require.ensure([], () => r(require('@/pages/userInAudit')), 'UserInAudit')
const About = r => require.ensure([], () => r(require('@/pages/about')), 'About')

//商户
const Bystages = r => require.ensure([], () => r(require('@/pages/bystages')), 'Bystages')
const BystagesDetails = r => require.ensure([], () => r(require('@/pages/bystagesDetails')), 'BystagesDetails')

//订单
const Discount = r => require.ensure([], () => r(require('@/pages/orderDiscount')), 'Discount')

//公共
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld')
const Error = r => require.ensure([], () => r(require('@/components/Error')), 'Error')


const MyRouter= new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/bystages',
      name: 'Bystages',
      component: Bystages
    },{
      path: '/bystagesDetails/:mId(\\d+)',
      name: 'BystagesDetails',
      component: BystagesDetails
    },
    {
      path: '/userInAudit',
      name: 'UserInAudit',
      component: UserInAudit
    },
    {
        path:'/discount/:newsId(\\d+)',
        name:'Discount',
        component:Discount
    },
    // {
    //     path:'/confirm',
    //     name:'Confirm',
    //     component:Confirm
    // },
    {
        path:'/about',
        name:'About',
        component:About
    },
    {
       path:'*',
       component:Error
    }
  ],
  mode:'history'
})

export default MyRouter
