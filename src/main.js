import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueJsonp from 'vue-jsonp'
import './assets/iconfont/iconfont.css';
import { encryptDes, decryptDes } from './des';
import Axios from 'axios';
import 'babel-polyfill';
import 'jquery';
Vue.use(ElementUI);
Vue.use(Antd);
Vue.use(VueJsonp);
//定义锚点跳转 
Vue.directive('anchor', {		
	inserted: function(el, binding) {
        el.onclick = function() {
			let total;
            if (binding.value == 0) {
                total = 0;
            } else {
                if(document.getElementById(`anchor-${binding.value}`) != null){
                    total = document.getElementById(`anchor-${binding.value}`).offsetTop;  
                }else{
                    total = document.getElementById(`anchor-save`).offsetTop; 
                } 
            }
            let distance = document.documentElement.scrollTop || document.body.scrollTop;
            let step = total / 50;
            if (total > distance) {
                (function smoothDown() {
                    if (distance < total) {
                        distance += step;
                        document.documentElement.scrollTop = distance;
                        setTimeout(smoothDown, 5);
                    } else {
                        document.documentElement.scrollTop = total;
                    }
                })();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                (function smoothUp() {
                    if (distance > total) {
                        distance -= step;
                        document.documentElement.scrollTop = distance;
                        setTimeout(smoothUp, 5);
                    } else {
                        document.documentElement.scrollTop = total;
                    }
                })();
            }

        }
    }
});
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

Vue.config.productionTip = false;
Vue.prototype.$config = {
	// api:'http://localhost:57992'
	api:'http://47.108.24.104:8072'
}
Vue.prototype.encryptDes=encryptDes;
Vue.prototype.decryptDes = decryptDes;
Vue.prototype.$store = store;
Vue.prototype.$http = Axios;
Vue.prototype.$axios=Axios;
Axios.defaults.baseURL="/api"
Axios.defaults.headers.post['Content-Type']='application/json';
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	} else {
		document.title = '开单王';
	}
	next();
	//  
	// if (to.meta.loginRequest) { // 判断跳转的路由是否需要登录
    //     if (this.$store.hasLogin == true) { // vuex.state判断token是否存在
    //         next() // 已登录
    //     } else {
    //         next({
    //             path: '/loginform',
    //             query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //         })
    //     }
    // } else {
    //    next()
	// }
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
if (sessionStorage.getItem("update")) {
	this.$store.replaceState(
	  Object.assign(
		{},
		this.$store.state,
		JSON.parse(sessionStorage.getItem("update"))
	  )
	);
	sessionStorage.removeItem("update")
  }

  //在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener("beforeunload", () => {
	sessionStorage.setItem("update", JSON.stringify(this.$store.state));
  });

// 添加请求拦截器
// Axios.interceptors.request.use(config => {
// 	// 在发送请求之前做些什么
// 	//判断是否存在token，如果存在将每个页面header都添加token
// 	if(store.state.token){
// 	config.headers.common['Authentication-Token']=store.state.token
// 	}
	  
// 	return config;
// 	}, error => {
// 	// 对请求错误做些什么
// 	return Promise.reject(error);
// 	});
	  
// 	// http response 拦截器
// 	Axios.interceptors.response.use(
// 	response => {
	  
// 	return response;
// 	},
// 	error => {
	  
// 	if (error.response) {
// 	switch (error.response.status) {
// 	case 401:
// 	this.$store.commit('del_token');
// 	router.replace({
// 	path: '/Loginform',
// 	query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
// 	})
// 	}
// 	}
// 	return Promise.reject(error.response.data)
// 	});
	
// router.push('home');
