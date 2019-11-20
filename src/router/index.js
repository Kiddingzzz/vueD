import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/index'
import Pubulish from '@/views/home-second/pubulishHome/pubulish'
import Test from '@/views/pulishUrl/test'
import DashBoard from '@/components/Dashboard'
import Shops from '@/views/home/shop/shops'
import Lease from '@/views/houseluru/lease'
import Sell from '@/views/houseluru/Sell'

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
			path: "/pubulish",
			name: "Pubulish",
			component: Pubulish
			
		},
		{
			path: "/test",
			name: "Test",
			component: Test
			
		},
		{
			path: '/Dashboard',
			name: 'DashBoard',
			component: DashBoard
		},
		{
			 path:'/shops',
			 name:'Shops',
			 component:Shops
		},
		{
			path:'/lease',
			name:'Lease',
			component:Lease
	   },
	   {
		path:'/sell',
		name:'Sell',
		component:Sell
   },
		
  ]
})
