import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/index'
import Pubulish from '@/views/home-second/pubulishHome/pubulish'
import Test from '@/views/pulishUrl/test'
import DashBoard from '@/components/Dashboard'
import Shops from '@/views/home/shop/shops'
import Lease from '@/views/houseluru/lease'
import Sell from '@/views/houseluru/Sell'
import Zhandian from '@/views/promangr/Zhandian'
import Loginform from '@/components/loginform'
import Salerelease from '@/views/cloudrelease/salerelease'
import vtable from '@/components/vtable'
import Allinter from '@/mytables/allinter'
import Rizhi from '@/mytables/rizhi'
import Tuijian from '@/mytables/tuijian'
import Seleinter from '@/components/seleinter'
Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			redirect: '/Loginform',
		},
		{
			path:'/index',
			name:'Index',
			component: Index,
			// meta: {
			// 	loginRequest: true
			// }	
    	},
		{
			path: "/pubulish",
			name: "Pubulish",
			component: Pubulish,
			// meta: {
			// 	loginRequest: true
			// }
		},
		{
			path: "/test",
			name: "Test",
			component: Test,
			// meta: {
			// 	loginRequest: true
			// }
			
		},
		{
			path: '/Dashboard',
			name: 'DashBoard',
			component: DashBoard
		},
		{
			 path:'/shops',
			 name:'Shops',
			 component:Shops,
			//  meta: {
			// 	 loginRequest: true
			//  }
		},
		{
			path:'/lease',
			name:'Lease',
			component:Lease,
			// meta: {
			// 	loginRequest: true
			// }
	   },
	   {
			path:'/sell',
			name:'Sell',
			component:Sell,
			// meta: {
			// 	loginRequest: true
			// }
		},
		{
			path:'/zhandian',
			name:'Zhandian',
			component:Zhandian,
			// meta: {
			// 	loginRequest: true
			// }
	   },
	    {
			path: '/loginform',
			name: 'Loginform',
			component: Loginform
		},
		{
			path: '/salerelease',
			name: 'Salerelease',
			component: Salerelease,
			// meta: {
			// 	loginRequest: true
			// }
		},
		{
			path: '/vtable',
			name: 'Vtable',
			component: vtable
		},
		{
			path: '/allinter',
			name: 'Allinter',
			component: Allinter
		},
		{
			path: '/rizhi',
			name: 'Rizhi',
			component: Rizhi
		},
		{
			path: '/tuijian',
			name: 'Tuijian',
			component: Tuijian,
			// meta: {
			// 	loginRequest: true
			// }
		},
		{
			path: '/seleinter',
			name: 'Seleinter',
			component: Seleinter
		},

	]
})
// if (sessionStorage.getItem('token')) {
// store.commit('set_token', sessionStorage.getItem('token'))
// }
	