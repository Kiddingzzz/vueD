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
			component:Index,
			// meta:{
			// 	requireAuth: true
			// }	
    	},
		{
			path: "/pubulish",
			name: "Pubulish",
			component: Pubulish,
			// meta: {
			// 	requireAuth: true
			// }
		},
		{
			path: "/test",
			name: "Test",
			component: Test,
			// meta: {
			// 	requireAuth: true
			// }
			
		},
		{
			path: '/Dashboard',
			name: 'DashBoard',
			component: DashBoard,
			// meta: {
			// 	requireAuth: true
			// }
		},
		{
			 path:'/shops',
			 name:'Shops',
			 component:Shops,
			//  meta: {
			// 	requireAuth: true
			// }
		},
		{
			path:'/lease',
			name:'Lease',
			component:Lease,
			// meta: {
			// 	requireAuth: true
			// }
	   },
	   {
			path:'/sell',
			name:'Sell',
			component:Sell,
			// meta: {
			// 	requireAuth: true
			// }
		},
		{
			path:'/zhandian',
			name:'Zhandian',
			component:Zhandian,
			// meta: {
			// 	requireAuth: true
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
			// 	requireAuth: true
			// }
		},
		{
			path: '/vtable',
			name: 'Vtable',
			component: vtable,
			
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
			
		},
		{
			path: '/seleinter',
			name: 'Seleinter',
			component: Seleinter
		},

	]
	
});


// export default router
// router.beforeEach((to, from, next) => {
// 	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
// 	  if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
// 		next()
// 	  } else {
// 		// 未登录,跳转到登陆页面
// 		next({
// 		  path: '/loginform'
// 		})
// 	  }
// 	} else {
// 	  if(sessionStorage.getItem("token") == 'true'){
// 		next('/index');
// 	  }else{
// 		next();
// 	  }
// 	}
//   })
 
  //blog.csdn.net/duansamve/article/details/90733884
// if (sessionStorage.getItem('token')) {
// store.commit('set_token', sessionStorage.getItem('token'))
// }
