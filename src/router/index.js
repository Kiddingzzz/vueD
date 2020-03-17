import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/index'
import DashBoard from '@/components/Dashboard'
import Shops from '@/views/home/shop/shops'
import Lease from '@/views/houseluru/lease'
import Sell from '@/views/houseluru/Sell'
import Zhandian from '@/views/promangr/Zhandian'
import Loginform from '@/components/loginform'
import Rentrelease from '@/views/cloudrelease/rentrelease'
import Salerelease from '@/views/cloudrelease/salerelease'
import vtable from '@/components/vtable'
import Allinter from '@/mytables/allinter'
import Rizhi from '@/mytables/rizhi'
import Tuijian from '@/mytables/tuijian'
import Seleinter from '@/components/seleinter'
import Susstable from '@/components/susstable'
import Rentusstable from '@/components/rentsusstable'
import Rentvtable from '@/components/rentvtable'
import Rentinter from '@/components/rentinter'
import Shangpuluru from '@/views/houseluru/shangpuluru'
import Zufang from '@/views/home/zufang'
import Rentshangpu from '@/views/cloudrelease/components/rentshangpu'
import Saleshangpu from '@/views/cloudrelease/components/saleshangpu'
import Shangpuzuluru from '@/views/houseluru/shangpuzuluru'
import Fuburesult from '@/views/cloudrelease/fuburesult'
import Video from '@/views/videos/video'
Vue.use(Router)

export default new Router({
  routes: [

	   //页面
		{
			path: '/',
			redirect: '/Loginform',
			meta: {
				keepAlive: false
			  }		
		},
		{
			path:'/index',
			name:'Index',
			component:Index,
			// meta:{
			// 	requireAuth: true
			// }	
			meta: {
				keepAlive: true
			  }		
		},
		{
			path:'/shops',
			name:'Shops',
			component:Shops,
		   //  meta: {
		   // 	requireAuth: true
		   // }
		   meta: {
			   keepAlive: true
			 }
	    },
		{
			path:'/lease',
			name:'Lease',
			component:Lease,
			// meta: {
			// 	requireAuth: true
			// }
			meta: {
				keepAlive: true
			  }
		},
		{
			path:'/sell',
			name:'Sell',
			component:Sell,
			// meta: {
			// 	requireAuth: true
			// }
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/rentrelease',
			name: 'Rentrelease',
			component: Rentrelease,
			// meta: {
			// 	requireAuth: true
			// }
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/salerelease',
			name: 'Salerelease',
			component: Salerelease,
			// meta: {
			// 	requireAuth: true
			// }
			meta: {
				keepAlive: true
			  }
		},
		{
			path:'/zhandian',
			name:'Zhandian',
			component:Zhandian,
			// meta: {
			// 	requireAuth: true
			// }
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/tuijian',
			name: 'Tuijian',
			component: Tuijian,
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/shangpuluru',
			name: 'Shangpuluru',
			component: Shangpuluru,
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/shangpuzuluru',
			name: 'Shangpuzuluru',
			component: Shangpuzuluru,
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/zufang',
			name: 'Zufang',
			component: Zufang,
			meta: {
				keepAlive: true
			  }
		},
		{
			path: '/fuburesult',
			name: 'Fuburesult',
			component: Fuburesult,
			meta: {
				keepAlive: true
			  }
		},


		//组件
		{
			path: '/Dashboard',
			name: 'DashBoard',
			component: DashBoard,
		},
		
	    {
			path: '/loginform',
			name: 'Loginform',
			component: Loginform
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
			path: '/seleinter',
			name: 'Seleinter',
			component: Seleinter
		},
		{
			path: '/susstable',
			name: 'Susstable',
			component: Susstable
		},
		{
			path: '/rentsusstable',
			name: 'Rentusstable',
			component: Rentusstable
		},
		{
			path: '/rentvtable',
			name: 'Rentvtable',
			component: Rentvtable,			
		},
		{
			path: '/rentinter',
			name: 'Rentinter',
			component: Rentinter
		},
		{
			path: '/rentshangpu',
			name: 'Rentshangpu',
			component: Rentshangpu,			
		},
		{
			path: '/saleshangpu',
			name: 'Saleshangpu',
			component: Saleshangpu,			
		},
		{
			path: '/video',
			name: 'Video',
			component: Video,		
			meta: {
				keepAlive: true
			  }	
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
