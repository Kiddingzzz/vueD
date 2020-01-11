<template>
	<view class="selectCondition">
		<view class="first">
			<button class="" type="default" @click="showSinglePicker">位置</button>
		</view>
		<view class="first">
			<button type="default" @click="showSinglePicker">总价</button>
		</view>
		<view class="first">
			<button type="default" @click="showSinglePicker">户型</button>
		</view>
		<view class="first">
			<button type="default" @click="showSinglePicker">更多</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		mounted() {
			
		},
		methods:{
			
		},
	}
</script>

<style lang="less">
	.selectCondition{
		margin-top: 30upx;
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
