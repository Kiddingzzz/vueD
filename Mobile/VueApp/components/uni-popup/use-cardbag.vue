<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup5" :class="['uni-popup-' + position, 'uni-popup-' + mode]" v-show="show" v-if="position=='middle'">
			<view class="popx1">
				<view class="title">你已领取满288减50券</view>
				<view class="title1">可用于鞋子、衣裤、消耗品等部分商品的折扣</view>
				<view class="btns">
					<view class="return">放卡卷包</view>
					<view class="share">立即使用</view>
				</view>
				<view class="font">
				</view>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
import uniSuccess from './uni-success.vue';
export default {
    components: {
        uniSuccess
    },
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
    flex-direction: nowrap;
    flex-wrap: nowrap;
    display: flex;
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

.uni-popup5 {
    position: absolute;
    flex-direction: nowrap;
    flex-wrap: nowrap;
    z-index: 999;
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    line-height: 20px;
    border-radius: 5px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Arial;
}

.uni-popup-pay8 {
    position: absolute;
    z-index: 999;
    background-color: #ffffff;
    width: 200px;
    height: 150px;
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

.uni-popup-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 100upx;
    line-height: 100upx;
    text-align: center;
}

.popx1 {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 20px 0px;
    flex-direction: nowrap;
    flex-wrap: nowrap;
    display: flex;

    .title {
        height: 20px !important;
        color: rgba(30, 40, 45, 1);
        font-size: 14px !important;
        font-family: PingFangSC-regular;
    }

    .title1 {
        display: flex;
        color: rgba(181, 181, 181, 1);
        font-size: 12px;
        text-align: left;
        font-family: PingFangSC-regular;
    }

    .btns {
        position: fixed;
        bottom: 20px;
        flex-direction: row;
        display: flex;
        width: 76%;
        margin-left: 16px;
        justify-content: space-between;

        .return {
            width: 90px;
            height: 30px;
            line-height: 22px;
            border-radius: 15px;
            background-color: rgba(245, 245, 245, 1);
            color: rgba(135, 135, 135, 1);
            font-size: 14px;
            text-align: center;
            font-family: Arial;
        }
        .share {
            width: 90px;
            height: 30px;
            line-height: 25px;
            border-radius: 18px;
            background-color: rgba(234, 84, 4, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            text-align: center;
            font-family: Arial;
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
</style>
