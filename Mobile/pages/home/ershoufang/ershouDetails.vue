<template>
	<view class="layout">
		<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper>
		<view class="xiangqing-table">
			<view class="title"><h1 class="biaoti">渝能国际精装小3房+南坪商圈靠南山正轻轨站渝能国际精装小3房+南坪商圈靠南山正轻轨站</h1></view>
			<view class="detail-bar">
				<view class="item01">
					<text>售价</text>
					<text>76.5万</text>
				</view>
				<view class="item01">
					<text>户型</text>
					<text>76.5万</text>
				</view>
				<view class="item01">
					<text>面积</text>
					<text>76.5万</text>
				</view>
			</view>
			<view class="jinbenInfo">
				<view class="jinbenInfo-item">
					<view>
						<text class="item-ti">单价</text>
						<text class="item-zi">59471元/平米</text>
					</view>
					<view>
						<text class="item-ti">朝向</text>
						<text class="item-zi">南</text>
					</view>
				</view>
				<view class="jinbenInfo-item">
					<view>
						<text class="item-ti">楼层</text>
						<text class="item-zi">59471元/平米</text>
					</view>
					<view>
						<text class="item-ti">装修</text>
						<text class="item-zi">南</text>
					</view>
				</view>
				<view class="jinbenInfo-item">
					<view>
						<text class="item-ti">年代</text>
						<text class="item-zi">59471元/平米</text>
					</view>
					<view>
						<text class="item-ti">房本年限</text>
						<text class="item-zi">南</text>
					</view>
				</view>
				<view class="jinbenInfo-item">
					<view>
						<text class="item-ti">类型</text>
						<text class="item-zi">59471元/平米</text>
					</view>
					<view>
						<text class="item-ti">产权</text>
						<text class="item-zi">南</text>
					</view>
				</view>
			</view>
			<view class="desc-container">
				<view class="desc-title">
					<h2>房源详情</h2>
				</view>
				<view class="desc-section">
					<h3>核心卖点</h3>
					<text>户型结构：建筑面积121平米，3室2厅2卫，钢混结构，户型方正，楼层适中，三面采光。紧凑的户型没有浪费面积，是*的闹市区经典房源。装修情况：精致新装。</text>
				</view>
				<view class="desc-section">
					<h3>业主心态</h3>
					<text>房子是准备自己住一辈子的，现在工作换地方，诚心出售，遇有缘人</text>
				</view>
				<view class="desc-section">
					<h3>服务介绍</h3>
					<text>本人从事房地产多年，公司有大量好房源，欢迎进入我的店铺查看，欢迎随时电话*，相信我的专业，为您置业安家保驾护航</text>
				</view>
			</view>
			<view class="map-bar">
				<view class="xiaoqu">
					<h2>小区：申佳上海时光</h2>
				</view>
				<view class="address">渝北－银梭大道1号</view>
			</view>
		</view>
		<nav-bottom></nav-bottom>
		<!-- <uni-goods-nav class="dibu" :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav> -->
	</view>
</template>
<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
import navBottom from '@/share/nav-bottom.vue';
export default {
	components: { 
		uniGoodsNav,
		navBottom
	},
	data() {
		return {
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				},
				{
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				},
				{
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				},
				{
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}
			],
			dotStyle: false,
			options: [
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
					text: '客服'
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '店铺'
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '电话联系',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即收藏',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '瑜能国际'
		});
		this.TowerSwiper('swiperList');
		// 初始化towerSwiper 传已有的数组名即可
	},
	methods: {
		// 初始化towerSwiper
		TowerSwiper(name) {
			let list = this[name];
			for (let i = 0; i < list.length; i++) {
				list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2));
				list[i].mLeft = i - parseInt(list.length / 2);
			}
			this.swiperList = list;
		},
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			console.log(e);
			this.options[2].info++;
		}
	}
};
</script>

<style lang="less">
@import '../../../colorui/main.css';
@import '../../../colorui/icon.css';
.layout {
	display: flex;
	width: 100%;
	height: 100%;
	flex-flow: column;
}
.xiangqing-table {
	padding: 30upx 30upx 110upx 30upx;
	.biaoti {
		font-size: 34upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.detail-bar{
		width: 100%;
		display: flex;
		border-bottom: 1upx solid #f0f0f0;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
		}
	}
	.jinbenInfo{
		border-bottom: 1upx solid #f0f0f0;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 38upx 0 10upx 0;
		font-size: 30upx;
		color: #333;
		.jinbenInfo-item{
			width: 100%;
			display: flex;
			margin-bottom: 28upx;
			view{
				width: 50%;
				.item-ti{
					margin-right: 12px;
					color: #9AA0A6;
				}
			}
		}
	}
	.desc-container{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 28upx 0;
		font-size: 28upx;
		border-bottom: 1upx solid #f0f0f0;
		color: #333;
		view{
			display: flex;
			flex-direction: column;
			padding: 14upx 0;
		}
	}
	.map-bar{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 28upx 0;
		font-size: 26upx;
		.address{
			color: #999;
			margin: 14upx 0;
		}
	}
}
.dibu{
	width: 100%;
	position: fixed;
	bottom: 0upx;
	right: 0upx;
}
h2{
	font-size: 32upx;
	padding: 0 0;
}
h3{
	color: #999;
	font-weight: 400;
	margin-bottom: 12upx;
}
</style>
