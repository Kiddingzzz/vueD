<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup12" :class="['uni-popup12-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position == 'middle'">
			<view class="popx-exprience-end">
				<view class="title1">提前结束处方</view>
				<view class="just-content"><view class="content1">我们留心发现，你就知道现在越来越多的城市都在举行各种体育比赛···</view></view>
				<input type="text" class="input1" placeholder="请输入您的体重" />
				<view class="btn-style">
					<button class="return" @click="hide">返回</button>
					<!-- <view class="share">确认结束</view> -->
					<button type="button" @click="end()" class="end-button">确认结束</button>
					<!-- <application-success :show="type === 'middle'" position="middle" mode="fixed"></application-success> -->
				</view>
				<view class="font"></view>
			</view>
		</view>
	</view>
</template>
<script>
import applicationSuccess from '@/components/uni-popup/application-success.vue';
export default {
	components: {
		applicationSuccess
	},
	name: 'uni-popup-bottom',
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
			type: ''
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
		end() {
			uni.showToast({
				title: '已结束当前处方',
				duration: 1500,
				success() {
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/experience/layout/experience-home'
						});
					}, 2000);
				}
			});
		},
		moveHandle() {},
		togglePopup(type) {
			this.type = type;
		}
	}
};
</script>
<style lang="less">
// view {
// 	font-size: 14px;
// }

.uni-mask {
	position: fixed;
	z-index: 998;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
}

.uni-popup12 {
	position: absolute;
	z-index: 999;
	background-color: #ffffff;
	width: 300px;
	//height: 274px;
	line-height: 20px;
	border-radius: 5px;
	color: rgba(16, 16, 16, 1);
	font-size: 14px;
	text-align: center;
}

.uni-popup12-middle {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 35%;
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
	//bottom: -180upx;
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

.popx-exprience-end {
	display: flex;
	height: 85%;
	width: 100%;
	padding: 20px 0px;
	flex-flow: column;
	.title1 {
		height: 20px;
		font-size: 14px !important;
		text-align: left;
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
.content1 {
	color: rgba(0, 0, 0, 0.3);
	width: 270px;
	height: 50px;
	text-align: -webkit-auto;
}
.input1 {
	background-color: #f5f5f5;
	margin-top: 5px;
}
.return {
	width: 180upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 30upx;
	background-color: rgba(245, 245, 245, 1);
	color: rgba(135, 135, 135, 1);
	font-size: 28upx;
	margin: 0px 0px 20upx 0px;
}
.end-button {
	margin: 0px 0px 0px 240upx;
	width: 180upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 36upx;
	background-color: rgba(234, 84, 4, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 20upx;
	justify-content: center;
	align-items: center;
}
.btn-style {
	display: flex;
	flex-flow: row;
	margin: 40px 0px 0px 0px;
}
</style>
