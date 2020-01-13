<template>
	<view class="topsd">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper1" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<!-- <swiper-item class="swiper-shifts" v-for="(item,index) in bannerlist.items" :key="index" :value="item">
							<image :src="item.imageKey" class="swiper-item uni-bg-red1" ></image>
						</swiper-item> -->
						<swiper-item>
							<view class="swiper-item uni-bg-red">A</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'swiper',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				bannerlist: {},
				linkurl:'',
			}
		},
		mounted() {
			//this.getBannerList();
		},
		methods: {
			async getBannerList() {
				var data = {
					providerName: '资讯'
				};

				var res = await this.$http.get(
					`api/eShop/banner/mobileBannerList`, data
				);
				Object.assign(this.$data, res);
				this.bannerlist = res;
				console.log(JSON.stringify(this.bannerlist));
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
		}
	}
</script>

<style>
	.topsd{
		width: 100%;
		height: 100%;
	}
	.swiper1 {
		height: 300upx;
	}

	.swiper-item {
		display: block;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.uni-bg-red1{
		width: 710upx;
		line-height: 300upx;
	}
	.swiper-shifts{
		border-radius: 10upx;
	}
	.swiper-list {
		margin-top: 40upx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60upx;
		position: relative;
	}

	.page-section-spacing {
		flex-flow: column;
		justify-content: center;
	}

	.info {
		position: absolute;
		right: 20upx;
	}
</style>
