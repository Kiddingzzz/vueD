<template>
	<view class="layout">
		<view class="tab-bottom">
			<view class="lianxiren">
				<image class="imageinfo" src="https://pic1.ajkimg.com/display/anjuke/237c94b741db9d0b3508e652ba32a4f4/200x265x0x45/100x133.jpg"></image>
				<view class="info">
					张媛媛
				</view>
			</view>
			<view class="item1">
				<image class="image" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png" />
				<view class="text">电话</view>
			</view>
			<view class="item2">
				<image class="image" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png" />
				<view class="text">收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	}
};
</script>

<style lang="less">
.layout {
	width: 100%;
}
.tab-bottom {
	display: flex;
	align-items: center;
	height: 100upx;
	width: 100%;
	position: fixed;
	bottom: 0upx;
	right: 0upx;
	background: #fff;
	z-index: 999;
	box-shadow: 0px -1px 6px 0 rgba(0, 0, 0, 0.14);
	color: #FFFFFF;
	.lianxiren{
		height: 100%;
		width: 33.33%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
	}
	.item1{
		height: 100%;
		width: 33.33%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(90deg, #3CDC50 0%, #3CB950 100%);
	}
	.item2{
		height: 100%;
		width: 33.33%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(90deg, #FF9800 0%, #FF7500 100%);
	}
}
.image {
	width: 40upx;
	height: 40upx;
	margin-right: 20upx;
}
.imageinfo{
	width: 70upx;
	height: 70upx;
	border-radius: 50%;
	margin-right: 20upx;
}
</style>
