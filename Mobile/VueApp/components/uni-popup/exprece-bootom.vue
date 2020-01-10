
<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup13" :class="['uni-popup13-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position == 'middle'">
			<view class="popx-exprience-end">
				<view class="title1">请选择运动目标</view>
				<view class="just-content1" @tap="goaddexprece('减肥')">
					<image src="/static/img/exprice/v2_pp6jgm.png" class="imgs"></image>
					<view class="texts">减肥</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('瘦腰')">
					<image src="/static/img/exprice/v2_pp6jhn.png" class="imgs"></image>
					<view class="texts">瘦腰</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('增加肺活量')">
					<image src="/static/img/exprice/v2_pp6jj8.png" class="imgs"></image>
					<view class="texts">增加肺活量</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('增重')">
					<image src="/static/img/exprice/v2_pp6jnk.png" class="imgs"></image>
					<view class="texts">增重</view>
				</view>
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
		},
		goaddexprece(name) {
			uni.navigateTo({
				url: '/pages/experience/layout/detail/exprece-create?name=' + name
			});
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

.uni-popup13 {
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

.uni-popup13-middle {
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
		margin: 0px 0px 20upx 40upx;
	}
}

.just-content1 {
	display: flex;
	justify-content: flex-start;
    margin: 40upx 0upx 0px 40upx;
	.imgs {
		margin: 8upx;
		width: 64upx;
		height: 64upx;
		border-radius: 10upx;
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
.texts {
		width: 80px;
		height: 34px;
		color: rgba(135, 135, 135, 1);
		font-size: 14px;
		text-align: left;
		font-family: 'PingFangSC-regular';
		background-color: #ffffff;
		margin-left: 0px;
		margin-top: 12upx;
	}
</style>

<!-- <template>
	<view class="layout-exprece">
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup12" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position == 'middle'">
			<view class="popxexprice">
				<view class="title">请选择运动目标</view>
				<view class="just-content1" @tap="goaddexprece('减肥')">
					<image src="/static/img/face.jpg" class="img"></image>
					<view class="texts">减肥</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('瘦腰')">
					<image src="/static/img/face.jpg" class="img"></image>
					<view class="texts">瘦腰</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('增加肺活量')">
					<image src="/static/img/face.jpg" class="img"></image>
					<view class="texts">增加肺活量</view>
				</view>
				<view class="just-content1" @tap="goaddexprece('增重')">
					<image src="/static/img/face.jpg" class="img"></image>
					<view class="texts">增重</view>
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
		moveHandle() {},
		togglePopup(type) {
			this.type = type;
			// 				if (this.type) {
			// 					this.type = false;
			// 					this.hide();
			// 					return true;
			// 				}
		},
		goaddexprece(name) {
			uni.navigateTo({
				url: '/pages/experience/layout/detail/exprece-create?name=' + name
			});
		}
	},
	onBackPress() {
		if (this.show) {
			this.show = false;
			this.hide();
			return true;
		}
	}
};
</script>
<style lang="less">
.layout-exprece {
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

	.uni-popup-exprece {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		width: 100%;
		height: 700upx;
		line-height: 40upx;
		border-radius: 10upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		/* #ifdef MP */
		margin-top: -410upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin-top: -400upx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: -380upx;
		/* #endif */
	}

	.uni-popup13-middle.uni-popup-insert {
		min-width: 380upx;
		min-height: 380upx;
		max-width: 100%;
		max-height: 80%;
		transform: translate(-50%, -65%);
		background: none;
		box-shadow: none;
	}

	.uni-popup13-middle.uni-popup13-fixed {
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

	.popxexprice {
		display: flex;
		height: 100%;
		width: 100%;
		padding: 20px 0px;
		flex-direction: nowrap;
		flex-wrap: nowrap;
		display: flex;
		flex-flow: column;
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
		background: #f5f5f5;
	}

	.just-content1 {
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

	.texts {
		width: 80px;
		height: 34px;
		color: rgba(135, 135, 135, 1);
		font-size: 14px;
		text-align: left;
		font-family: 'PingFangSC-regular';
		background-color: #ffffff;
		margin-left: 0px;
		margin-top: 16px;
	}
}
</style>
 -->