<template>
	<view class="uni-input-view">
		<view class="input-prefix">
			<icon v-if="prefixIcon !== ''" :type="prefixIcon" size="28" icontype="iconfont"></icon>
		</view>
		<input :type="inputType" :value="value" @input="onInput" class="uni-input-input" :placeholder="placeholder"
		 :password="type==='password'&&!showPassword" @blur="onBlur" placeholder-style="color:#878787;" :maxlength="maxlength" />
		<!-- 优先显示密码可见按钮 -->
		<uni-icon v-if="clearable_&&!displayable_&&value.length" color="#878787" type="clear" size="20" @click="clear"></uni-icon>
		<uni-icon v-if="displayable_" :color="showPassword?'#878787':'#878787'" type="eye" size="20" @click="display"></uni-icon>
		<slot name="subfix"></slot>
	</view>
</template>

<script>
	import uniIcon from './uni-icon/uni-icon.vue';
	import icon from './icon/icon.vue';

	export default {
		components: {
			uniIcon,
			icon
		},
		props: {
			/**
			 * 输入类型
			 */
			type: String,
			/**
			 * 值
			 */
			value: String,
			/**
			 * 占位符
			 */
			placeholder: String,
			/**
			 * 是否显示清除按钮
			 */
			clearable: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 是否显示密码可见按钮
			 */
			displayable: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 自动获取焦点
			 */
			focus: {
				type: [Boolean, String],
				default: false
			},
			prefixIcon: {
				type: [String],
				default: ''
			},
			maxlength: {
				type: Number,
				default: 11
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				/**
				 * 显示密码明文
				 */
				showPassword: false,
				/**
				 * 是否获取焦点
				 */
				isFocus: false
			}
		},
		computed: {
			inputType() {
				const type = this.type
				return type === 'password' ? 'text' : type
			},
			clearable_() {
				return String(this.clearable) !== 'false'
			},
			displayable_() {
				return String(this.displayable) !== 'false'
			},
			focus_() {
				return String(this.focus) !== 'false'
			}
		},
		methods: {
			clear() {
				this.value = ''
			},
			display() {
				this.showPassword = !this.showPassword
			},
			onFocus() {
				// this.isFocus = true
			},
			onBlur() {
// 				this.$nextTick(() => {
// 					this.isFocus = false
// 				})
			},
			onInput(e) { 
				// setTimeout(d=>{
				// 	this.$emit('input', e.target.value);
				// }, 20);
				this.$emit('input', e.target.value);
			}
		}
	}
</script>

<style lang="less">
	.uni-input-view {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		width: 100%;
		flex: 1;
		padding: 0 10upx;
		background: #F5F5F5;
		.input-prefix {
			position: absolute;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
			line-height: 0;
		}

		.uni-input-input {
			flex: 1;
			width: 100%;
			padding-left: 31upx;

			&:not(:first-child) {
				padding-left: 102upx;
			}
		}
	}
</style>
