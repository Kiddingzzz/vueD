<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='middle'">
			<view class="popx">
				<view class="title">分享本篇文章</view>
				<view class="just-content">
					<view class="img">
					</view>
					<view class="font">
						<view class="head">
							耐力跑的学问，你真的知道吗？
						</view>
						<view class="content">
							我们留心发现，你就知道现在越来越
							多的城市都在举行各种体育比赛···
						</view>
					</view>
				</view>
				<input type="text" class="input" placeholder="请输入电话号码" v-model="searchText">
				<view class="btns">
					<view class="return">返回</view>
					<view class="share">确认分享</view>
				</view>
				<view class="font">
				</view>
			</view>
		</view>
		<view class="uni-popup-pay" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='bottom'">
			<view class="popx">
				<view class="title">请选择支付方式</view>
				<view class="just-content1">
					<view class="img">
					</view>
					<button type="button" @click="togglePopup('middle')" class="pays">支付宝</button>
					<uni-success :show="type === 'middle'" position="middle" mode="fixed" msg="底部弹出popup" @hidePopup="togglePopup('')"></uni-success>
					<!-- <view class="font">
							支付宝
						</view> -->
				</view>
				<view class="just-content1">
					<view class="img">

					</view>
					<button type="button" @click="togglePopup('middle')" class="pays">微信</button>
				</view>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	import uniSuccess from './uni-success.vue';
	export default {
		components: {
			uniSuccess
		},
		name: 'uni-popup',
		props: {
			/**
			 * 页面显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 对齐方式
			 */
			position: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle'
			},
			/**
			 * 显示模式
			 */
			mode: {
				type: String,
				default: 'insert'
			},
			/**
			 * 额外信息
			 */
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
			buttonMode: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			if (!this.h5Top) {
				offsetTop = 44;
			} else {
				offsetTop = 0;
			}
			//#endif
			return {
				offsetTop: offsetTop,
				type: '',
			};
		},
		watch: {
			h5Top(newVal) {
				console.log(newVal);
				if (newVal) {
					this.offsetTop = 44;
				} else {
					this.offsetTop = 0;
				}
			}
		},
		methods: {
			hide: function() {
				if (this.mode === 'insert' && this.position === 'middle') return;
				this.$emit('hidePopup');
			},
			closeMask() {
				if (this.mode === 'insert') {
					this.$emit('hidePopup');
				}
			},
			moveHandle() {},
			togglePopup(type) {
				this.type = type;
				// 				if (this.type) {
				// 					this.type = false;
				// 					this.hide();
				// 					return true;
				// 				}
			}
		},
		onBackPress() {
			if (this.show) {
				this.show = false;
				this.hide();
				return true;
			}
		}
	}
</script>
<style lang="less">
	view {
		font-size: 14px;
		flex-direction: nowrap;
		flex-wrap: nowrap;
		display: flex;
	}

	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.uni-popup {
		position: absolute;
		flex-direction: nowrap;
		flex-wrap: nowrap;
		z-index: 999;
		background-color: #ffffff;
		width: 300px;
		height: 274px;
		line-height: 20px;
		border-radius: 5px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		font-family: Arial;
	}

	.uni-popup-pay {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		width: 300px;
		height: 150px;
		line-height: 20px;
		border-radius: 5px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		font-family: Arial;
	}

	.uni-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.uni-popup-middle.uni-popup-insert {
		min-width: 380upx;
		min-height: 380upx;
		max-width: 100%;
		max-height: 80%;
		transform: translate(-50%, -65%);
		background: none;
		box-shadow: none;
	}

	.uni-popup-middle.uni-popup-fixed {
		border-radius: 10upx;
		padding: 0upx 20px;
	}

	.uni-close-bottom,
	.uni-close-right {
		position: absolute;
		bottom: -180upx;
		text-align: center;
		border-radius: 50%;
		color: #f5f5f5;
		font-size: 14upx;
		font-weight: bold;
		opacity: 0.8;
		z-index: -1;
	}

	.uni-close-right {
		right: -60upx;
		top: -80upx;
	}

	.uni-close-bottom:after {
		content: '';
		position: absolute;
		width: 0px;
		border: 1px #f5f5f5 solid;
		top: -200upx;
		bottom: 56upx;
		left: 50%;
		transform: translate(-50%, -0%);
		opacity: 0.8;
	}

	.uni-popup-top {
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.popx {
		display: flex;
		height: 100%;
		width: 100%;
		padding: 20px 0px;
		flex-direction: nowrap;
		flex-wrap: nowrap;
		display: flex;

		.title {
			height: 20px !important;
			color: rgba(30, 40, 45, 1);
			font-size: 14px !important;
			text-align: left;
			font-family: PingFangSC-regular;

		}

		.just-content {
			flex-direction: row;
			flex-wrap: wrap;
			display: flex;
			width: 100%;
			margin-top: 10px;

			.img {
				width: 50px;
				height: 50px;
				border-radius: 5px;
				display: flex;
			}

			.font {
				padding: 0px 5px;
				display: flex;
				flex-flow: column;
				height: 50px;
				width: 198px;

				.head {
					width: 196px;
					margin-top: -5px;
					height: 14px;
					color: rgba(135, 135, 135, 1);
					font-size: 14px;
					font-family: PingFangSC-regular;

				}

				.content {
					margin-top: 5px;
					line-height: 15px;
					width: 196px;
					color: rgba(181, 181, 181, 1);
					font-size: 11px;
					font-family: PingFangSC-regular;

				}
			}
		}

		.btns {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			display: flex;
			width: 100%;
			margin: 20px 0px;

			.return {
				width: 90px;
				height: 30px;
				line-height: 26px;
				border-radius: 15px;
				background-color: rgba(245, 245, 245, 1);
				color: rgba(135, 135, 135, 1);
				font-size: 14px;
				text-align: center;
				font-family: Arial;

			}

			.share {
				width: 90px;
				height: 30px;
				line-height: 26px;
				border-radius: 18px;
				background-color: rgba(234, 84, 4, 1);
				color: rgba(255, 255, 255, 1);
				font-size: 14px;
				text-align: center;
				font-family: Arial;

			}
		}


	}






	.input {
		padding-bottom: 60px;
		margin-top: 20px;
		text-align: left;
		height: 20px;
		width: 100%;
		background: #F5F5F5;
	}

	.just-content1 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 5px;

		.img {
			margin: 4px;
			width: 32px;
			height: 32px;
			border-radius: 5px;
			background-color: aqua;
		}
	}

	.pays {
		margin-left: 10px;
		margin-top: 10px;
		width: 72px;
		height: 35px;
		background-color: #ffffff;
		border-bottom-color: #ffffff;
		color: rgba(135, 135, 135, 1);
		font-size: 14px;
		text-align: left;
		font-family: "PingFangSC-regular";

	}
</style>
