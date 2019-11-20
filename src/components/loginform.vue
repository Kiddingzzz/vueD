<template>
  <div class="wrapper-login">
    <div class="banner-login">
      <div class="imgs">
        <img src="../assets/logoJXW.png" class="img">
      </div>

      <div class="item-qcode">
        <div v-if="account == 'qcode'">
          <div class="icd">
            <div class="icons">
              <!--支付宝  -->
              <a-popover placement="right" trigger="click" v-model="payvisible">
                <template @click="hide" slot="content">
                  <!-- 支付宝二维码 -->
                  <img src="../assets/pay.png" class="imgs">
                </template>
                <img src="../assets/paylogo.png" class="imgs" @click="type = 'pay'">
              </a-popover>
              <!--微信  -->
              <a-popover placement="right" trigger="click" v-model="weixinvisible">
                <template @click="hide" slot="content">
                  <!-- 微信二维码 -->
                  <img src="../assets/weixin.jpg" class="imgs weixin">
                </template>
                <img src="../assets/weixinlogo.png" class="imgs"  @click="type = 'weixin'">
              </a-popover>
              <!--QQ  -->
              <a-popover placement="left" trigger="click" v-model="qqvisible">
                <template @click="hide" slot="content">
                  <!-- QQ二维码 -->
                  <img src="../assets/qq.png" class="imgs">
                </template>
                <img src="../assets/qqlogo.png" class="imgs" @click="type = 'qq'">
              </a-popover>

            </div>
            <div class="notification">
              <div v-if="type == ''"> 请选择扫码登陆</div>
              <div v-if="type == 'pay'">请打开支付宝验证您的二维码</div>
              <div v-if="type == 'weixin'">请打开微信验证您的二维码</div>
              <div v-if="type == 'qq'">请打开QQ验证您的二维码</div>
            </div>
          </div>
        </div>

        <div v-if="account == 'username'">
          <div class="logins">
            <el-input
              prefix-icon="iconfont icon-User"
              v-model="user"
              placeholder="请输入姓名"
              class="inputs"
            ></el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              class="inputs"
              prefix-icon="iconfont icon-mima"
            ></el-input>
            <button class="btns" @click="doLogin()">登陆</button>
          </div>
        </div>
      </div>
      <div class="account">
        <div class="g2-cad" :class="{'active':account == 'qcode'}" @click="account = 'qcode'">二维码</div>
        <div
          class="g2-cad"
          :class="{'active':account == 'username'}"
          @click="account = 'username'"
        >账号</div>
      </div>

      <dialog-register v-model="sendVal" type="danger" title="欢迎注册开单网"></dialog-register>

      <div class="btm">
        <div class="tip2">开单网</div>
        <div class="pwd">
          <div @click="openMask" class="reg">注册</div>
          <div class="forget">忘记密码</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dialogRegister from "./dialog-register.vue";

export default {
  components: {
    dialogRegister
  },
  data() {
    return {
      payvisible: false,
      weixinvisible: false,
      qqvisible: false,
      type: "",
      imgType: "",
      account: "qcode",
      sendVal: false,
      user: "",
      password: ""
    };
  },
  computed: {
    alipay() {
      return this.type == "pay"
        ? "/assets/v2_prlna1.png"
     :"../../assets/alipay.png";
    }
  },
  methods: {
     hide() {
        console.log(111);
        this.payvisible = false;
        this.weixinvisible = false;
        this.qqvisible = false;
      },
    openMask(index) {
      this.sendVal = true;
    },
    async doLogin() {
      // const statu =`${this.config}/api/`;
      // const response = await this.$http.get(statu);
      // const data = response.data;
			try {
				// if (this.user.length < 5) {
				// 	this.$message({
				// 		icon: 'none',
				// 		title: '账号最短为 5 个字符'
				// 	});
				// 	return;
				// }
				// if (this.password.length < 6) {
				// 	this.$message({
				// 		icon: 'none',
				// 		title: '密码最短为 6 个字符'
				// 	});
				// 	return;
				// }

				const data = {
					userNameOrEmailAddress: this.user,
					password: this.password
				};
        const statu = `${this.$config.api}/api/TokenAuth/Authenticate`;
        const res = await this.$http.post(statu,data);
        console.log(1)

				console.log(JSON.stringify(res));
				// uni.setStorageSync('UserInfo', res.user);
			} catch (e) {
				console.log(e);
			}
		},
		// toMain() {
		// 	uni.reLaunch({
		// 		url: '/pages/tabBar/home'
		// 	});
		// }
  }
};
</script>
<style lang="less">
// @import "../../styles";
 //@import "~@/assets/iconfont.css";
.wrapper-login {
  height:80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  //background: url("../assets/bg1.jpg");
  //background: #001529;
  background-size: 100% 100%;
  box-sizing: boder-box;
  .banner-login {
    width: 650px;
    position: absolute;
    right: 10vw;
    top: 90px;
    bottom: 90px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;

    .img {
      width: 150px;
      height: 80px;
      margin-top: 50px;

    }
    .item-qcode {
      margin-top: 55px;

      .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 0px 100px;
        height: 80px;
        img{
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
      }
      .notification {
        div {
          margin-top: 78px;
          margin-bottom: 60px;
          color: rgba(181, 181, 181, 1);
          font-size: 14px;
          text-align: center;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          font-family: SourceHanSansSC-regular;
        }
      }
      .icd {
        height: 228px;
      }
      .logins {
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 228px;

        .el-input__inner {
          background-color: rgba(245, 245, 245, 1);
          border: none;
        }
        .inputs {
          width: 350px;
          height: 36px;
          border-radius: 0px 5px 5px 0px;
          // background-color: rgba(245, 245, 245, 1);
          color: rgba(135, 135, 135, 1);
          font-size: 14px;
          border: none;
          text-align: left;
          margin-bottom: 30px;
          font-family: Microsoft Yahei;
        }
        .btns {
          width: 350px;
          height: 36px;
          line-height: 20px;
          border-radius: 5px;
          background-color: rgba(0, 193, 145, 1);
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          text-align: center;
          font-family: Roboto;
          border: none;
        }
      }
    }

    .account {
      display: flex;
      justify-content: space-between;
      width: 184px;
      height: 36px;
      margin: 0px 233px;
      .g2-cad {
        width: 72px;
        line-height: 30px;
        border-radius: 5px;
        color: rgba(135, 135, 135, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;

        &.active {
          border: 1px solid rgba(135, 135, 135, 1);
        }
      }
    }
    .btm {
      position: absolute;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      bottom: 27px;
      height: 21px;
      width: 100%;

      .tip2 {
        margin-left: 20px;
        color: #dcdcdc;
      }
      .pwd {
        display: flex;
        flex-direction: row;
        .reg {
          width: 72px;
        }
        .forget {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>