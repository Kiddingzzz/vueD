import Vue from 'vue';
import Vuex from 'Vuex';
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userName:'',
		loginProvider: "",
		openid: null,
		userId:'',
		user: {},
		token:'',
		isUpdateHome: true
	},
	mutations: {
		/**
		 * 在main.js例引入
		 * import store from './store/index'
		 * 把store挂载到全局
		 * Vue.prototype.$store = store;
		 */

		/**
		 * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
		 * 使用方法 例:
		 * this.$store.update({"cityName":"北京"})
		 * 
		 *  config需要传入对象
		 * @param {*} state 
		 * @param {*Object} config 
		 */
		update(state, config) {
			// console.log(`update-state: ${JSON.stringify(config)}`);
			Object.keys(config).map((item, key) => {
				state[item] = config[item];
			})
		},
		remove(state, props) {
			props.map((item) => {
				if(state[item])
					delete state[item];
			});
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.ope
			nid = null
		},
		set_token(state, token) {
		state.token = token
		sessionStorage.token = token
		},
		del_token(state) {
		state.token = ''
		sessionStorage.removeItem('token')
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	plugins: [
		// createPersistedState({
		// 	storage: {
		// 		getItem: key => uni.getStorageSync(key),
		// 		setItem: (key, value) => {
		// 			// console.log(`${key}-${value}`);
		// 			uni.setStorageSync(key, value);
		// 		},
		// 		removeItem: key => uni.removeStorageSync(key)
		// 	  }
		// })
	]
})

export default store;
