<template>
	<view>
		<view v-if="icontype == 'iconfont'" class="iconfont" :class="['icon-'+type]" :style="{color:color,'font-size':fontSize}"
		 @click="onClick()"></view>
		<view v-if="icontype == 'uni'" class="uni-icon" :class="['uni-icon-'+type]" :style="{color:color,'font-size':fontSize}"
		 @click="onClick()"></view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon/uni-icon.vue';
	import iconfont from '../iconfont/iconfont.vue';

	export default {
		components: {
			uniIcon,
			iconfont
		},
		props: {
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: String,
			/**
			 * 图标大小
			 */
			size: Number,
			icontype: {
				type: [String],
				default: 'iconfont'
			}
		},
		computed: {
			fontSize() {
				return `${this.size}px`
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
