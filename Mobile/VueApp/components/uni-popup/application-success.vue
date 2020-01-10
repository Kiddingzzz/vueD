<template>
	<view class="sunccess">
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @tap="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup-application" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='middle'">
			<view class="popx">
				<view class="title"></view>
				<view class="just-content">
					<view class="img">
					</view>
					<view class="font-application">
						申请提交成功
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'uni-success',
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
				offsetTop: offsetTop
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
				console.log("00000");
				if (this.mode === 'insert' && this.position === 'middle') return;
				uni.reLaunch({
					url:'/pages/experience/layout/experience-home'
				})
			},
			closeMask() {
				if (this.mode === 'insert') {
					this.$emit('hidePopup');
				}
			},
			moveHandle() {
				
			}
		}
	};
</script>
<style lang="less">
	.sunccess {
		font-size: 14px;
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

	.uni-popup-application {
		margin-top: -30px;
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		width: 300px;
		height: 200px;
		line-height: 20px;
		border-radius: 5px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;

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
		padding: 30upx;
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

		.title {
			height: 20px;
			color: rgba(30, 40, 45, 1);
			font-size: 14px !important;
			text-align: left;
			font-family: PingFangSC-regular;

		}
	}

	.just-content {
		display: flex;
		justify-content: flex-start;
		.img {
			width: 50px;
			height: 50px;
			border-radius: 5px;

		}
	}
	.just-content1{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.img {
			margin: 4px;
			width: 50px;
			height: 50px;
			border-radius: 5px;
		
		}
	}
	.font-application{
		margin:20px 40px;
	}
</style>
