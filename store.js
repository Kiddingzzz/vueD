import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
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
			});
		},
		remove(state, props) {
			props.map(item => {
				if (state[item]) delete state[item];
			});
		}
	},
	actions: {},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	]
});
