<template>
	<div class="layout">
		<div class="bgImg">
			<div class="areaSearch">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				dataitem: []
			}
		},
		onLoad() {
			// this.getequiment();
		},
		methods: {
			// async getequiment() {
			// 	var res = await this.$http.get('/api/cms/homeIn/pythonHomeList');
			// 	console.log(JSON.stringify(res))
			// 	// this.dataitem = res.items;
			// },
		}
	}
</script>

<style lang="less">
	.layout{
		display: flex;
		width: 100%;
		height: 100%;
		flex-flow: column;
		
		.bgImg{
			height: 300upx;
			border: 2upx solid red;
			padding: 10upx 20upx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.areaSearch{
				
			}
		}
	}
</style>
