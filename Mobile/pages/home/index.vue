<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header">
				<view>
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="quyu">
							<image src="/static/icon_main.png" class="btn"></image>
							<view class="picker">{{array[index].name}}</view>
						</view>
					</picker>
				</view>
				<view class="input">
					<image src="/static/search.png" class="search"></image>
					<input type="text" value="" placeholder="搜索" />
				</view>
				<image src="/static/msg.png" class="btn"></image>
			</view>
			<view class="header_content">
				<view class="left">
					<text class="sub_title">每日最新房源----捷祥旺助手提示</text>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<view class="hight" v-for="(it,index) in menus" :key="index">
					<view class="item" :key="'menu_'+index" @tap="gotoReact(it.url)">
						<view class="img_view" :style="{background: it.bg}">
							<image :src="it.icon" class="image"></image>
						</view>
						<text class="txt">{{it.txt}}</text>
					</view>
				</view>
			</view>
			<view class="ad">
			</view>
		</view>
		<view class="tips">
			<view class="tishi">为您推荐</view>
			<scroll-view scroll-x="true" class="slider">
				<template v-for="(it, i) in records">
					<view class="item" :key="'slider_item_'+i" :style="{background: it.bg, marginRight: i === records.length - 1 ? '15px' : '0px'}">
						<view class="item_content">
							<view class="title">
								<text class="first">{{it.title}}</text>
								<text class="main">主讲：{{it.mainTeacher}}</text>
								<text class="sub" :style="{color:it.subColor}">标题名称</text>
							</view>
							<image class="image" :src="it.icon"></image>
							<text class="free">免\n费</text>
						</view>
					</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				array: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}],
				index: 0,
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本'],
					['北京', '上海', '广州']
				],
				multiIndex: [0, 0, 0],
				menus: [{
						bg: 'linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))',
						icon: '/static/graduation.png',
						txt: '二手房',
						url: '/pages/home/ershoufang/ershouIndex',
						isFree: true
					},
					{
						bg: 'linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))',
						icon: '/static/live.png',
						url: '/pages/home/shop/shopIndex',
						txt: '商铺',
						isFree: false
					},
					{
						bg: 'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
						icon: '/static/emblem.png',
						txt: '租房',
						url: '/pages/home/zufang/zufangIndex',
						isFree: true
					},
					{
						bg: 'linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))',
						icon: '/static/question_bank.png',
						txt: '每日推荐',
						url: '/pages/home/tuijian/tuijianIndex',
						isFree: true
					}
				],
				second_menus: [{
						icon: '/static/exam.png',
						txt: '考试教案'
					},
					{
						icon: '/static/textbook.png',
						txt: '教材教案',
					},
					{
						icon: '/static/book_ticket.png',
						txt: '青书券'
					},
					{
						icon: '/static/more.png',
						txt: '全部课程'
					}
				],
				records: [{
						bg: 'linear-gradient(-30deg,rgba(171,218,255,1),rgba(215,239,255,1))',
						title: '教师考情分析',
						mainTeacher: '小A',
						subTitle: '标题名称',
						subColor: '#15639F',
						icon: '/static/test2.png',
						isFree: true
					},
					{
						bg: 'linear-gradient(-30deg,rgba(192,253,227,1),rgba(224,252,240,1))',
						title: '查看详情',
						mainTeacher: '小B',
						subTitle: '标题名称',
						subColor: '#07B77B',
						icon: '/static/test.png',
						isFree: false
					},
					{
						bg: 'linear-gradient(-30deg,rgba(171,218,255,1),rgba(215,239,255,1))',
						title: '教师考情分析',
						mainTeacher: '小A',
						subTitle: '标题名称',
						subColor: '#15639F',
						icon: '/static/test2.png',
						isFree: true
					}
				]
			}
		},
		onLoad() {
			// this.getequiment();

		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			gotoReact(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>
<style>
	page {
		width: 100%;
		background-color: #ebebeb;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_edu {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-flow: column;
		background: #fff;
	}

	.page_edu_header {
		padding-top: var(--status-bar-height);
		background-color: #0bc99d;
		width: 100%;
		height: realSize(280px);

		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.quyu {
				display: flex;
				flex-direction: row;
				align-items: center;

				.picker {
					color: #fff;
					font-size: 32upx;
				}
			}

			.btn {
				width: realSize(36px);
				height: realSize(30px);
			}

			.input {
				height: 64upx;
				width: 400upx;
				color: #fff;
				font-size: 28upx;
				margin-left: realSize(20px);
				margin-right: realSize(20px);
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
		}

		.header_content {
			display: flex;
			flex-direction: row;

			.left {
				display: flex;
				flex-direction: column;
				width: 57%;
				margin-top: 10px;
				margin-left: 15px;
				margin-right: 15px;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(47px);
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}

				.sub_title {
					margin-top: 3px;
					font-size: realSize(18px);
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}

				.btn {
					margin-top: 3px;
					width: realSize(198px);
					height: realSize(60px);
					background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
					box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
					border-radius: realSize(30px);
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.page_content {
		width: 100%;
		margin-top: -74px;

		.menu {
			margin-left: 10px;
			margin-right: 10px;
			padding-left: 10px;
			padding-right: 10px;
			height: realSize(176px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;

			.hight {
				margin-top: 40upx;
			}

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.img_view {
					width: 60px;
					height: 60px;
					border-radius: 30px;
					display: flex;
					align-items: center;
					justify-content: center;

					.image {
						width: 50px;
						height: 50px;
					}
				}

				.txt {
					margin-top: 5px;
					font-size: 14px;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.ad {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;



		}
	}

	.tips {
		display: flex;
		background: #fff;
		flex-flow: column;

		.tishi {
			margin-left: 30upx;
			margin-top: 26upx;
			color: #000;
			font-size: 32upx;

		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;
		background-color: white;

		.item {
			display: inline-block;
			margin-left: 15px;
			margin-top: 6px;
			margin-bottom: 13px;
			width: 60%;
			height: 125px;
			border-radius: 10px;

			.item_content {
				display: flex;
				flex-direction: row;

				.title {
					width: 36%;
					margin: 20px;
					display: flex;
					flex-direction: column;

					.first {
						font-size: 16px;
						color: rgba(46, 65, 69, 1);
					}

					.main {
						font-size: 13px;
						color: rgba(79, 103, 101, 1);
						margin-top: 5px;
					}

					.sub {
						width: 60px;
						font-size: 10px;
						margin-top: 20px;
						background: rgba(255, 255, 255, 0.4);
						border-radius: 5px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.image {
					margin-top: 35px;
					width: 80px;
					height: 80px;
				}

				.free {
					background: rgba(11, 147, 252, 1);
					border-radius: 0px 0px 22px 22px;
					width: 25px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 14px;
				}
			}
		}
	}
</style>