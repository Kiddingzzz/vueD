<template>
	<view class="payment-deal">
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup-pay6" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='bottom'">
			<view class="popx6">
				<view class="title">选择支付方式</view>
				<view class="line">
					<view>
						<image src="/static/v2_pp4uzp.png" class="img"></image>
					</view>
					<view class="font">支付宝</view>
				</view>
				<view class="line">
					<view>
						<image src="/static/v2_pp4v0i.png" class="img"></image>
					</view>
					<view class="font">微信</view>
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
        togglePopup1(type) {
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
.payment-deal {
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
    height: 158px;
    line-height: 20px;
    border-radius: 5px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Arial;
}

.uni-popup-pay6 {
    position: absolute;
    flex-direction: row;
    flex-wrap: nowrap;
    z-index: 999;
    background-color: #ffffff;
    height: 158px;
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

.popx6 {
    height: 158px;
    margin: 20px 20px;
    flex-flow: column;
	
	.title{
			display: flex;
			color: rgba(30, 40, 45, 1);
			font-size: 14px;
			font-family: PingFangSC-regular;

	}
	.line{
		margin: 15px 0px;
		display: flex;
		width: 100%;
		height: 32px;
		
		.img{
			width: 32px;
			height: 32px;
			display: flex;
		}
		.font{
			margin: 5px 15px;
			display: flex;
			color: rgba(135, 135, 135, 1);
			font-size: 14px;
			font-family: PingFangSC-regular;

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
