<template>
	<view class="input">
		<image src="/static/search.png" class="search"></image>
		<input type="text" value="" placeholder="搜索" />
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}
	.input {
		height: 64upx;
		color: #fff;
		width: 100%;
		font-size: 28upx;
		background: #6FA2F8;
		border-radius: realSize(30px);
		display: flex;
		flex-direction: row;
		align-items: center;
	
		.search {
			width: realSize(30px);
			height: realSize(30px);
			margin-left: realSize(20px);
			margin-right: realSize(20px);
		}
	}
</style>
