import Vue from 'vue'
import Router from 'vue-router'

import bookDetil from '@/components/commonComponents/book/bookDetil'
import authorDetil from '@/components/commonComponents/book/authorDetil'
import bookContent from '@/components/commonComponents/book/bookContent'
import postDetil from '@/components/commonComponents/post/postDetail'
import newsDetil from '@/components/commonComponents/news/newsDetail'
import activityDetil from '@/components/commonComponents/activity/activityDetil'

import Index from '@/components/index'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Manage from '@/components/manage/index'

//管理端
import newsManage from '@/components/manage/children/newsManage'
import novelManage from '@/components/manage/children/novelManage'
import activityManage from '@/components/manage/children/activityManage'
import postManage from '@/components/manage/children/postManage'
import applyManage from '@/components/manage/children/applyManage'
import tagManage from '@/components/manage/children/tagManage'
//用户端
import Bookshop from '@/components/serveComponents/Bookshop/index'
import CreatPost from '@/components/serveComponents/Forum/creatPost'
import CreatActivity from '@/components/serveComponents/Bookshop/children/creatActivity'

import Works from '@/components/serveComponents/Mine/children/works'
import Edit from '@/components/serveComponents/Mine/children/edit'
import mySet from '@/components/serveComponents/Mine/children/set'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
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
    {
      path: '/novelManage',
      name: 'novelManage',
      component: novelManage,
      meta: {
        keepAlive: true //需要被缓存的组件
      }
    },
    {
      path: '/activityManage',
      name: 'activityManage',
      component: activityManage
    },
    {
      path: '/postManage',
      name: 'postManage',
      component: postManage,
      meta: {
        keepAlive: true //需要被缓存的组件
      }
    },
    {
      path: '/applyManage',
      name: 'applyManage',
      component: applyManage
    },
    {
      path: '/tagManage',
      name: 'tagManage',
      component: tagManage
    },
    // 用户端
    {
      path: '/Bookshop',
      name: 'Bookshop',
      component: Bookshop
    },
    {
      path: '/creatActivity',
      name: 'CreatActivity',
      component: CreatActivity
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
    {
      path: '/postDetil',
      name: 'postDetil',
      component: postDetil
    },
    {
      path: '/newsDetil',
      name: 'newsDetil',
      component: newsDetil,
    },
    {
      path: '/activityDetil',
      name: 'activityDetil',
      component: activityDetil,
    },
    // {
    //     path: '/catalog',
    //     name: 'catalog',
    //     component: catalog
    // },
    {
      path: '/creatPost',
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
    }
  ]
})