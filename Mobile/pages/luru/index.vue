<template>
	<view class="layout">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-orange cur' : ''" v-for="(item, index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					{{ tabname[index] }}
				</view>
			</view>
		</scroll-view>
		<button class="lurubtn" @click="showModal" data-target="Modal">秒录</button>
		<view class="zufang" v-if="TabCur == 0">
			<view class="sellsearch_bds">
				<view class="tishi-wraps">
					<view class="selltishi">
						<i class="iconfont icon-tishi"></i>
						贴心提示:
					</view>
					<view>1.随时抓取经纪人在外网发布的任意一套房源信息，方便、快捷、高效。</view>
					<view>
						2.针对房源图片可以完美去除网站LOGO水印。
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">秒录房源</view>
						<view class="action" @click="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="model-top">
							<text>1.点击网站logo可以快速进入对应的网站查看房源:(不会使用?查看帮助)</text>
							<text>2.把需要获取的房源地址粘贴到文本框中,点击“立即秒录”:</text>
							<view class="">
								
							</view>
							<view class="model-img">
								tu
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<!-- 表单 -->
			<view class="zufang-form">
				<form >
					<view class="cu-form-group">
						<view class="title">小区</view>
						<input placeholder="房源所属小区" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">区域</view>
						<input placeholder="区域" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">地址</view>
						<input placeholder="房源地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">建筑面积</view>
						<input placeholder="占地面积" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">新三网户室号</view>
						<input placeholder="地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">户型</view>
						<input placeholder="地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">价格</view>
						<input placeholder="" name="input"></input>元/月
					</view>
					<view class="cu-form-group">
						<view class="title">建造年代</view>
						<input placeholder="" name="input"></input>年
					</view>
					<view class="cu-form-group">
						<view class="title">所在楼层</view>
						<input placeholder="地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">租赁方式</view>
						<radio-group class="radio-list" @change="radioChange">
						    <label v-for="(item,index) in radioItems" :key="index">
								<view>
									<radio class='blue radio' :value="item.name" :checked="checkedList"></radio>
								</view>
								<view>
									<label class="label-2-text" :for="item.name">
										<text>{{item.value}}</text>
									</label>
								</view>
						    </label>
						</radio-group>
					</view>
					<view class="cu-form-group">
						<view class="title">户型</view>
						<input placeholder="地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">户型</view>
						<input placeholder="地址" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">户型</view>
						<input placeholder="地址" name="input"></input>
					</view>
				</form>
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			tabname: ['租房录入', '售房录入', '商铺出租录入', '商铺出售录入'],
			modalName: null,
			radioItems: [{
					name: 'USA',
					value: '合租',
					checked: 'true',
			    },
			    {
			        name: 'CHN',
			        value: '整租',
			    }
			],
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
	}
};
</script>

<style lang="less">
@import '../../colorui/main.css';
@import '../../colorui/icon.css';
.layout {
	display: flex;
	width: 100%;
	height: 100%;
	flex-flow: column;
}
.lurubtn{
	position: absolute;
	bottom: 0upx;
	right: 10upx;
	height: 100upx;
	width: 100upx;
	background: #1579f4;
	color: #FFFFFF;
	border-radius: 50%;
	font-size: 28upx;
	padding: 0 0;
}
.zufang {
	padding: 24upx;
	font-size: 28upx !important;
	.sellsearch_bds {
		width: 100%;
		.tishi-wraps {
			width: 100%;
			padding: 20upx;
			line-height: 40upx;
			display: flex;
			flex-direction: column;
			background: #ffffdd;
			border-radius: 20upx;
			border: 1upx solid #ebedf0;
		}
	}
	.zufang-form{
		padding: 0 24upx;
		border-radius: 20upx;
		background: #FFFFFF;
		.radio-list{
			display: flex;
			label{
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
