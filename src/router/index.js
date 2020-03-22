import Vue from 'vue'
import Router from 'vue-router'

import bookDetil from '@/components/commonComponents/book/bookDetil'
import authorDetil from '@/components/commonComponents/book/authorDetil'
import bookContent from '@/components/commonComponents/book/bookContent'
//import catalog from '@/components/commonComponents/book/catalog'

import Index from '@/components/index'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Manage from '@/components/manage/index'

//管理端
import newsManage from '@/components/manage/children/newsManage'
//用户端
import Bookshop from '@/components/serveComponents/Bookshop/index'

import CreatPost from '@/components/serveComponents/Forum/creatPost'

import Works from '@/components/serveComponents/Mine/children/works'
import Edit from '@/components/serveComponents/Mine/children/edit'
import mySet from '@/components/serveComponents/Mine/children/set'
import Feedback from '@/components/serveComponents/Mine/children/feedback'



Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true //需要被缓存的组件
      }
    },
    {
      path: '/manage', // 管理员进入页面
      name: 'Manage',
      component: Manage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // 管理端
    {
      path: '/newsManage',
      name: 'newsManage',
      component: newsManage
    },
    // 用户端
    {
      path: '/Bookshop',
      name: 'Bookshop',
      component: Bookshop
    },
    {
      path: '/bookDetil',
      name: 'bookDetil',
      component: bookDetil,
      meta: {
        keepAlive: true //需要被缓存的组件
      },
    },
    {
      path: '/authorDetil',
      name: 'authorDetil',
      component: authorDetil
    },
    // {
    //     path: '/catalog',
    //     name: 'catalog',
    //     component: catalog
    // },
    {
      path: '/creatpost',
      name: 'CreatPost',
      component: CreatPost
    },
    {
      path: '/bookContent',
      name: 'bookContent',
      component: bookContent
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/set',
      name: 'mySet',
      component: mySet
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
  ]
})