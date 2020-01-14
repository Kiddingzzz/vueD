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
			<view class="item01"></view>
			<view class="item01"></view>
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
	padding: 30upx 30upx 100upx 30upx;
	.biaoti {
		font-size: 34upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.detail-bar{
		display: flex;
	}
}
.dibu{
	width: 100%;
	position: fixed;
	bottom: 0upx;
	right: 0upx;
}
</style>
