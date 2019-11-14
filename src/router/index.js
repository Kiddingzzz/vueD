import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/index'
import Simple from '@/views/home/simple'
import Pubulish from '@/views/home-second/pubulishHome/pubulish'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			redirect: '/index',
		},
		{
			path:'/index',
			name:'Index',
			component: Index
		},
		{
			path: '/',
			redirect: '/simple',
		},
		{
			path: "/simple",
			name: "Simple",
			component: Simple
			
		},
		{
			path: "/simple",
			name: "Simple",
			component: Simple
			
		},
		{
			path: "/pubulish",
			name: "Pubulish",
			component: Pubulish
			
		},
  ]
})
