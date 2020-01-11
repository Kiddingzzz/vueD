<template>
	<view class="table">
		<search-Input class="searchInput"></search-Input>
		<view class="selectCondition">
			<view class="first">
				<button class="btn" type="default" @click="showSinglePicker">位置</button>
			</view>
			<view class="first">
				<button class="btn" type="default" @click="showSinglePickerRice">总价</button>
			</view>
			<view class="first">
				<button class="btn" type="default" @click="showSinglePickerHuxing">户型</button>
			</view>
			<view class="first">
				<button class="btn" type="default" @click="showSinglePicker">更多</button>
			</view>
		</view>
		<view class="selectCondition">
			<view class="bors" :class="['bors',double == 'Active'?'active':'']" @click="doChange('double')">双重验真</view>
			<view class="bors" :class="['bors',video == 'Active'?'active':'']" @click="doChange('video')">视频看房</view>
			<view class="bors" :class="['bors',vr == 'Active'?'active':'']" @click="doChange('vr')">VR看房</view>
			<view class="bors" :class="['bors',fuli == 'Active'?'active':'']" @click="doChange('fuli')">优惠福利</view>
		</view>
		<view class="fangList">
			<card-detail v-for="(item,index) of houseList" :value="item" :key="index" @click="gotoDetail($event)"></card-detail>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import searchInput from '@/share/search-Input.vue';
	import cardDetail from '@/share/card-detail.vue';
	export default {
		components: {
			mpvuePicker,
			searchInput,
			cardDetail,
		},
		data() {
			return {
				double:'',
				video:'',
				vr:'',
				fuli:'',
				houseList:[{},{}],
				pickerText: '',
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				pickerSingleArrayRice: [{
						label: '不限',
						value: 1,
					},
					{
						label: '40-60万',
						value: 2
					},
					{
						label: '60-80万',
						value: 3
					},
					{
						label: '80-100万',
						value: 4
					},
					{
						label: '100-120万',
						value: 5
					},
					{
						label: '120-150万',
						value: 6
					},
					{
						label: '150-200万',
						value: 7
					},
					{
						label: '200-300万',
						value: 8
					},
					{
						label: '300万以上',
						value: 9
					}
				],
				pickerSingleArrayHuxing: [{
						label: '不限',
						value: 1
					},
					{
						label: '一居',
						value: 2
					},
					{
						label: '二居',
						value: 3
					},
					{
						label: '三居',
						value: 4
					},
					{
						label: '四居',
						value: 5
					},
					{
						label: '四居以上',
						value: 6
					}
				],
				pickerValueArray: [],
				mode: '',
				deepLength: 1,
				themeColor: '#007AFF',
				pickerValueDefault: [0],
				list: [],
			}
		},
		onLoad() {
			// this.FangDetail()
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			showSinglePickerRice() {
				this.pickerValueArray = this.pickerSingleArrayRice
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			showSinglePickerHuxing() {
				this.pickerValueArray = this.pickerSingleArrayHuxing
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				console.log(this.pickerText)
				//条件
				let condition = this.pickerText.label
				// this.FangDetail(condition)
			},
			async FangDetail(pi){
				if(pi === ''){
					var res = await this.$http.get('')
					this.list = res.items
				}
				else{
					var res = await this.$http.get('',pi)
					this.list = res.items
				}
			},
			doChange(index){
				if(index == 'double'){
					if(this.double == '')
						this.double = 'Active';
					else
						this.double = '';
				}
				if(index == 'video'){
					if(this.video == '')
						this.video = 'Active';
					else
						this.video = '';
				}
				if(index == 'vr'){
					if(this.vr == '')
						this.vr = 'Active';
					else
						this.vr = '';
				}
				if(index == 'fuli'){
					if(this.fuli == '')
						this.fuli = 'Active';
					else
						this.fuli = '';
				}
			},
			gotoDetail(e){
				console.log(JSON.stringify(e))
				uni.navigateTo({
					url:'/pages/home/ershoufang/ershouDetails'
				})
			},
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
		}
	}
</script>

<style lang="less">
	.table {
		display: flex;
		height: 100vh;
		padding: 20upx 20upx;
		flex-flow: column;
		box-sizing: border-box;

		.searchInput {
			width: 100%;
		}

		.selectCondition {
			margin-top: 30upx;
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: space-around;
			.first{
				display: flex;
				width: 21%;
				
				.btn{
					font-size: 28upx;
					background: #fff;
					width: 100%;
				}
			}
			
			
			.bors{
				text-align: center;
				height: 52upx;
				line-height: 52upx;
				background: #F8F8F8;
				font-size: 26upx;
				width: 21%;
				color: #565C67!important;
				
				.active{
					background: #FFEAEA;
					color: #FF5350!important;
					border: 1px solid #FFA19F;
				}
			}
			.active{
				background: #FFEAEA;
				color: #FF5350!important;
				border: 1px solid #FFA19F;
			}
		}
		
		.fangList{
			display: flex;
			width: 100%;
			flex-flow: column;
		}
	}
</style>
