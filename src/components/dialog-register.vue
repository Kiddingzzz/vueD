<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <div class="content">
        <div>
          <label>会员名称:</label>
          <input
            type="text"
            class="inputs"
            placeholder="请输入5-25个字符组成的会员名，推荐使用中文"
            v-model="userName"
          >
        </div>
        <div>
          <label>登录密码:</label>
          <input
            type="password"
            class="inputs"
            placeholder="请输入6-20个由大小字母、数字、标点组成的密码"
            v-model="password"
          >
        </div>
        <div>
          <label>确认密码:</label>
          <input type="password" class="inputs" placeholder="请确认您的登录密码" v-model="respassword">
        </div>
        <div>
          <label>手机号码:</label>
          <input type="text" class="inputs-code" placeholder="请输入您的手机号码" v-model="phoneNumber">
          <button class="btns-code" @click="sendcode()">发送验证</button>
        </div>
        <div>
          <label class="codecomfire">验证码:</label>
          <input type="text" class="inputs-number" placeholder="请确认您手机收到的验证码" v-model="sendCode">
        </div>
        <div class="font-size">
          <input type="checkbox" v-model="hobby2" value="游泳" class="checkout">
          我同意开单网的
          <a href="#">《商家合作协议》</a>
        </div>
        <button class="btn-register" @click="doregister()">完成注册</button>
      </div>
      <div class="close-btn" @click="closeMask">
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    // 类型包括 defalut 默认， danger 危险， confirm 确认，
    type: {
      type: String,
      default: "default"
    },
    content: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    dangerText: {
      type: String,
      default: "删除"
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      showMask: false,
      hobby2: '',
      userName: '',
      phoneNumber: '',
      password: '',
      sendCode: '',
      surname: '',
      respassword:'',
    };
  },
  methods: {
    closeMask() {
      this.showMask = false;
    },

    // async sendcode() {
    //   if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
    //     this.$error({
    //       title: "请填写正确手机号码",
    //       icon: "none"
    //     });
    //     return false;
    //   }
    //   const data = {
    //     phoneNumber: this.phoneNumber,
    //     type: 10
    //   };
    //   // const res = this.$http.post('api/Account/SendCode', data);
    //   const Statu = `${this.$config.api}/api/Account/SendCode`;
    //   const res = await this.$http.post(Statu, data);
    //   console.log(123);
    //   this.getCodeText = "发送中...";
    //   this.disabled = true;
    //   this.getCodeisWaiting = true;
    //   this.getCodeBtnColor = "rgba(135,135,135,1)";
    //   //示例用定时器模拟请求效果
    //   setTimeout(() => {
    //     this.$success({
    //       title: "验证码已发送",
    //       icon: "none"
    //     });
    //     this.disabled = false;
    //     //示例默认1234，生产中请删除这一句。
    //     //this.code=1234;
    //     this.setTimer();
    //   }, 1000);
    // },
    // setTimer() {
    //   let holdTime = 60;
    //   this.getCodeText = "重新获取(60)";
    //   this.Timer = setInterval(() => {
    //     if (holdTime <= 0) {
    //       this.getCodeisWaiting = false;
    //       this.getCodeBtnColor = "#878787";
    //       this.getCodeText = "获取验证码";
    //       clearInterval(this.Timer);
    //       return;
    //     }
    //     this.getCodeText = "重新获取(" + holdTime + ")";
    //     holdTime--;
    //   }, 1000);
    // },
    async doregister() {
      if (this.userName.length < 5) {
        this.$error({
          icon: "none",
          title: "会员名称长度不够"
        });
        return;
      }
      if (this.password.length < 6) {
        this.$error({
          icon: "none",
          title: "密码最短为 6 个字符"
        });
        return;
      }
      if (this.password != this.respassword) {
        this.$error({
          icon: "none",
          title: "两次输入密码不一致"
        });
        return;
      }
      const data = {
        //userNameOrEmailAddress: this.phoneNumber,
        userNameOrEmailAddress: this.userName,
        password: this.password,
        // sendCode: this.sendCode,
        // surname: this.phoneNumber
      };
      try {
        const Statu = `${this.$config.api}/api/cms/acount/register`;
        const res = await this.$http.post(Statu, data);
        console.log(res);
        console.log(this.phoneNumber);
        setTimeout(() => {
            this.showMask = false;
          }, 500);
          this.$success({
            icon: "none",
            title: "注册成功"
          });
          this.$emit('childByValue',this.userName,this.password)

      } catch (error) {}
    }
  },
  mounted() {
    this.showMask = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  .dialog-container {
    width: 550px;
    height: 632px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    .dialog-title {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      color: #696969;
      padding: 50px 0px 0 0px;
      box-sizing: border-box;
    }
    .content {
      margin-top: 60px;
      color: #797979;
      line-height: 26px;
      padding: 0 20px;
      box-sizing: border-box;
      label {
        line-height: 38px;
      }
      div {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;

        .codecomfire {
          margin-left: 10px;
        }
        .inputs {
          margin-left: 10px;
          width: 350px;
          text-indent: 10px;
          height: 36px;
          border-radius: 5px;
          background-color: rgba(245, 245, 245, 1);
          color: rgba(135, 135, 135, 1);
          font-size: 12px;
          text-align: left;
          font-family: Microsoft Yahei;
          border: none;
        }
        .inputs-code {
          margin-left: 10px;
          width: 268px;
          height: 36px;
          line-height: 5px;
          border-radius: 5px;
          background-color: rgba(245, 245, 245, 1);
          color: rgba(16, 16, 16, 1);
          font-size: 12px;
          text-align: left;
          font-family: Roboto;
          border: none;
          text-indent: 10px;
        }
        .inputs-number {
          margin-left: 10px;
          text-indent: 10px;
          width: 350px;
          height: 36px;
          border-radius: 5px;
          background-color: rgba(245, 245, 245, 1);
          color: rgba(135, 135, 135, 1);
          font-size: 12px;
          text-align: left;
          font-family: Microsoft Yahei;
          border: none;
        }
        .btns-code {
          border: none;
          margin-left: 10px;
          width: 72px;
          height: 36px;
          line-height: 17px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0);
          color: rgba(135, 135, 135, 1);
          font-size: 8px;
          text-align: center;
          font-family: Roboto;
          border: 1px solid rgba(135, 135, 135, 1);
        }
      }
      .font-size {
        margin-top: 30px;
        color: rgba(135, 135, 135, 1);
        font-size: 16px;
        font-family: SourceHanSansSC-regular;

        .checkout {
          width: 16px;
          height: 16px;
          margin-top: 6px;
        }
        a {
          color: #023179;
          font-size: 16px;
          font-family: SourceHanSansSC-regular;
          text-decoration: none;
        }
      }
      .btn-register {
        border: none;
        width: 350px;
        height: 36px;
        line-height: 30px;
        border-radius: 5px;
        background-color: #023179;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
      }
    }
    .inp {
      margin: 10px 0 0 20px;
      width: 200px;
      height: 40px;
      padding-left: 4px;
      border-radius: 4px;
      border: none;
      background: #efefef;
      outline: none;
      &:focus {
        border: 1px solid #509ee3;
      }
    }
    .btns {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: right;
      padding: 0 16px;
      box-sizing: border-box;
      & > div {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
        color: #ffffff;
        background: #f1f1f1;
        border-radius: 8px;
        margin-right: 12px;
        cursor: pointer;
      }
      .default-btn {
        color: #787878;
        &:hover {
          color: #509ee3;
        }
      }
      .danger-btn {
        background: #ef8c8c;
        &:hover {
          background: rgb(224, 135, 135);
        }
        &:active {
          background: #ef8c8c;
        }
      }
      .confirm-btn {
        color: #ffffff;
        background: #509ee3;
        &:hover {
          background: #6fb0eb;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
      .icon-guanbi{
           font-size: 30px !important;
      }
    }
  }
}
</style>