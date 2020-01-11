<template>
	<view class="bg-s" @click="$emit('click')">
		<view class="img"></view>
		<view class="jieshao">
			<view class="biaoti">渝能国际精装小3房+南坪商圈靠南山正轻轨站+</view>
			<view class="xiangqing">
				<view class="gnt">
					<view class="cit">94㎡</view>
					<view class="cit">3室2厅</view>
					<view class="cit">东</view>
				</view>
				<view class="price">
					118万
				</view>
			</view>
			<view class="local">
				<view>瑜能国际</view>
				<view>12400元/㎡</view>
			</view>
			<view class="biaoqian">
				<view style="color:#FFA19F;">佣金优惠</view>
				<view>满五</view>
				<view>近地铁</view>
				<view>配套成熟</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			
		},
		methods:{
			
		},
	}
</script>

<style lang="less">
	.bg-s{
		height: 250upx;
		width: 100%;
		border-bottom:1px solid #E5E5E5;
		display: flex;
		align-items: center;
		flex-direction: row;
		
		.img{
			width: 30%;
			height: 172upx;
			border-radius: 20upx;
			border: 1px solid #000000;
		}
		.jieshao{
			width: 70%;
			height: 200upx;
			padding:0upx 20upx;
			display: flex;
			flex-flow: column;
			
			.biaoti{
				color: #000;
				font-size: 34upx;
				font-family: PingFangSC-regular;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-weight: bold;
				margin-bottom: 20upx;
			}
			
			.xiangqing{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				
				.gnt{
					display: flex;
					flex-direction: row;
					
					.cit{
						font-size: 24upx;
						margin-right: 20upx;
					}
				}
				
				.price{
					font-size: 30upx;
					color: #FFA19F;
				}
				
			}
			
			.local{
				display: flex;
				justify-content: space-between;
				font-size: 24upx;
			}
			.biaoqian{
				border: 1px solid #F6F6F6;
				background: #F6F6F6;
				font-size: 24upx;
				display: flex;
				view{
					margin-right: 26upx;
				}
			}
		}
	}
</style>
