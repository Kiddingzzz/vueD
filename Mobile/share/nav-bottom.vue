<template>
	<view class="layout">
		<view class="lianxiren">
			<image src="../static/HM-PersonalCenter/face.jpg"></image>
			<view class="info">
				
			</view>
		</view>
		<view class="tab-bottom" v-for="(item,index) in options" :key="index">
			<view class="item">
				<image class="image" :src="item.icon"/>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:[{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
						text: '店铺'
					}, {
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
						text: '购物车'
					}]
			};
		}
	}
</script>

<style lang="less">
.layout{
	width: 100%;
}
.tab-bottom{
	display:flex;
	.item{
		display:flex;
		flex-direction: column;
	}
}
.image {
		width: 20px;
		height: 20px;
	}
</style>
