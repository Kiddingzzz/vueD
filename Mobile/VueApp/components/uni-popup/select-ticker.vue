<template>
	<view class="select-ticker">
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup-pay5" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='bottom'">
			<view class="popx5">
				<view class="header">
					<view class="line1">
						<view class="tickers">优惠券</view>
						<view class="comfire">确定</view>
					</view>
					<view class="line2">
						<view class="rdo"><radio value="r1"  /></view>
						<view><image src="/static/v2_pp4vcv.png" class="img"></image></view>
						<view class="line3">
							<view class="tittle1">
								满588减20
							</view>
							<view class="tittle2">
								2019.03.25~2019.03.27
							</view>
						</view>
					</view>
					<view class="line2">
						<view class="rdo"><radio value="r1"  /></view>
						<view><image src="/static/v2_pp4vgh.png" class="img"></image></view>
						<view class="line3">
							<view class="tittle1">
								满588减20
							</view>
							<view class="tittle2">
								2019.03.25~2019.03.27
							</view>
						</view>
					</view>
					<view class="line2">
						<view class="rdo"><radio value="r1"  /></view>
						<view><image src="/static/v2_pp4vho.png" class="img"></image></view>
						<view class="line3">
							<view class="tittle1">
								满588减20
							</view>
							<view class="tittle2">
								2019.03.25~2019.03.27
							</view>
						</view>
					</view>
				</view>
			</view>
			</view>
		</view>
</template>
<script>
export default {
    components: {},
    name: 'uni-popup',
    props: {
        /**
         * 页面显示
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * 对齐方式
         */
        position: {
            type: String,
            //top - 顶部， middle - 居中, bottom - 底部
            default: 'middle'
        },
        /**
         * 显示模式
         */
        mode: {
            type: String,
            default: 'insert'
        },
        /**
         * 额外信息
         */
        /**
         * h5遮罩是否到顶
         */
        h5Top: {
            type: Boolean,
            default: false
        },
        buttonMode: {
            type: String,
            default: 'bottom'
        }
    },
    data() {
        let offsetTop = 0;
        //#ifdef H5
        if (!this.h5Top) {
            offsetTop = 44;
        } else {
            offsetTop = 0;
        }
        //#endif
        return {
            offsetTop: offsetTop,
            type: ''
        };
    },
    watch: {
        h5Top(newVal) {
            console.log(newVal);
            if (newVal) {
                this.offsetTop = 44;
            } else {
                this.offsetTop = 0;
            }
        }
    },
    methods: {
        hide: function() {
            if (this.mode === 'insert' && this.position === 'middle') return;
            this.$emit('hidePopup');
        },
        closeMask() {
            if (this.mode === 'insert') {
                this.$emit('hidePopup');
            }
        },
        moveHandle() {},
        togglePopup(type) {
            this.type = type;
            // 				if (this.type) {
            // 					this.type = false;
            // 					this.hide();
            // 					return true;
            // 				}
        }
    },
    onBackPress() {
        if (this.show) {
            this.show = false;
            this.hide();
            return true;
        }
    }
};
</script>
<style lang="less">
view {
    font-size: 14px;
    flex-direction: row;
    flex-wrap: nowrap;
    display: block;
}
.select-ticker {
}
.uni-mask {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
}

.uni-popup {
    position: absolute;
    flex-direction: nowrap;
    flex-wrap: nowrap;
    z-index: 999;
    background-color: #ffffff;
    width: 300px;
    height: 500px;
    line-height: 20px;
    border-radius: 5px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Arial;
}

.uni-popup-pay5 {
    position: absolute;
    flex-direction: row;
    flex-wrap: nowrap;
    z-index: 999;
    background-color: #ffffff;
    height: 237px;
    line-height: 20px;
    border-radius: 5px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Arial;
}

.uni-popup-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.uni-popup-middle.uni-popup-insert {
    min-width: 380upx;
    min-height: 380upx;
    max-width: 100%;
    max-height: 80%;
    transform: translate(-50%, -65%);
    background: none;
    box-shadow: none;
}

.uni-popup-middle.uni-popup-fixed {
    border-radius: 10upx;
    padding: 0upx 20px;
}

.uni-close-bottom,
.uni-close-right {
    position: absolute;
    bottom: -180upx;
    text-align: center;
    border-radius: 50%;
    color: #f5f5f5;
    font-size: 14upx;
    font-weight: bold;
    opacity: 0.8;
    z-index: -1;
}

.uni-close-right {
    right: -60upx;
    top: -80upx;
}

.uni-close-bottom:after {
    content: '';
    position: absolute;
    width: 0px;
    border: 1px #f5f5f5 solid;
    top: -200upx;
    bottom: 56upx;
    left: 50%;
    transform: translate(-50%, -0%);
    opacity: 0.8;
}

.uni-popup-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
    text-align: center;
}

.popx5 {
    height: 322px;
    margin: 20px 20px;
    flex-flow: column;
	.header{
		padding: 10px 0px;
		 .line1 {
		    display: flex;
		    flex-direction: row;
		    flex-wrap: wrap;
		    justify-content: space-between;
		    height: 20px;
		    width: 100%;
		    .tickers {
		        color: rgba(30, 40, 45, 1);
		        font-size: 14px;
		        font-family: PingFangSC-regular;
		    }
		    .comfire {
		        width: 60px;
		        height: 20px;
		        line-height: 17px;
		        border-radius: 18px;
		        background-color: rgba(234, 84, 4, 1);
		        color: rgba(255, 255, 255, 1);
		        font-size: 10px;
		        font-family: Arial;
		    }
		}
		.line2 {
		    margin: 10px 0px;
		    display: flex;
		    flex-direction: row;
		    flex-wrap: wrap;
		    height: 40px;
		    width: 100%;
		    .rdo {
		        margin: 7px 0px;
		    }
		    .img {
		        margin: 0px 10px;
		        width: 40px;
		        height: 40px;
		    }
			.line3 {
				display: flex;
				height: 40px;
			    flex-flow: column;
			
			    .tittle1 {
			        width: 70px;
			        color: rgba(135, 135, 135, 1);
			        font-size: 14px;
			        font-family: PingFangSC-regular;
			    }
			    .tittle2 {
			        width: 134px;
			        color: rgba(220, 220, 220, 1);
			        font-size: 12px;
			        font-family: PingFangSC-regular;
			    }
			}
		}
	}
   
    
}

.input {
    padding-bottom: 60px;
    margin-top: 20px;
    text-align: left;
    height: 20px;
    width: 100%;
    background: #f5f5f5;
}

.just-content1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .img {
        margin: 4px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
    }
}

.texts {
    width: 64px;
    height: 34px;
    color: rgba(135, 135, 135, 1);
    font-size: 14px;
    text-align: left;
    font-family: 'PingFangSC-regular';
    background-color: #ffffff;
    margin-left: 0px;
    margin-top: 16px;
}
</style>
