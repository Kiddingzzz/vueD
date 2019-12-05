<template>
<div class="loginbg">
    <div class="wrapper-login">
      <div class="banner-login">
        <div class="imgs">
          <img src="../assets/logoJXW.png" class="img">
        </div>

        <div class="item-qcode">
          <div v-if="account == 'qcode'">
                  <img src="../assets/weixin.jpg" class="maimgs">
            <!-- <div class="icd">
              <div class="notification">
                <div v-if="type == 'pay'">
                  <img src="../assets/pay.png" class="maimgs">
                </div>
                <div v-if="type == 'weixin'">
                  <img src="../assets/weixin.jpg" class="maimgs">
                </div>
                <div v-if="type == 'qq'">
                  <img src="../assets/qq.png" class="maimgs">
                </div>
              </div>
              <div class="icons">
                <img src="../assets/paylogo.png" class="imgs" @click="type = 'pay'">
                <img src="../assets/weixinlogo.png" class="imgs"  @click="type = 'weixin'">
                <img src="../assets/qqlogo.png" class="imgs" @click="type = 'qq'">
              </div>           
            </div> -->
          </div>

          <div v-if="account == 'username'">
            <div class="logins">
              <el-input
                prefix-icon="iconfont icon-User"
                v-model="user"
                placeholder="请输入姓名"
                class="inputs"
                @keyup.enter.native="doLogin()"
              ></el-input>
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="password"
                class="inputs"
                @keyup.enter.native="doLogin()"
                prefix-icon="iconfont icon-mima"
              ></el-input>
              <button class="btns" @click="doLogin()">登录</button>
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

        <dialog-register v-model="sendVal" @childByValue="getDate" type="danger" title="欢迎注册开单网"></dialog-register>

        <div class="btm">
          <div class="tip2">开单网</div>
          <div class="pwd" v-if="account == 'username'">
            <div @click="openMask" class="reg">注册</div>
            <div class="forget">忘记密码</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import dialogRegister from "./dialog-register.vue";
import md5 from 'js-md5';
export default {
  components: {
    dialogRegister,
  },
  data() {
    return {
      payvisible: false,
      weixinvisible: false,
      qqvisible: false,
      type: "pay",
      imgType: "",
      account: "qcode",
      sendVal: false,
      user: "",
      password: "",
      TokenRES:{},
      RefreshTokenRES:{},
      openId:'',
      access_token:'',
      refresh_token:'',
    };
  },
  computed: {
    alipay() {
      return this.type == "pay"
        ? "/assets/v2_prlna1.png"
     :"../../assets/alipay.png";
    }
  },
  mounted(){
      //获取58令牌
        // const WuBaApi = 'https://openapi.58.com/v2/auth/show?app_key=e36309f80bd9030c879d69ba4155a74b&redirect_uri=http://972133.vip'

        // const resWuba = this.$http.get(WuBaApi);
        // console.log(`resWuba:`+JSON.stringify(resWuba))
        //获取授权令牌
        // var sortList = [{code:resWuba.code},{timestamp:'1496829295748'},{app_key:'e36309f80bd9030c879d69ba4155a74b'}];

        // //排序
        // var cc = sortList.sort(function (a,b) {
        //     return Object.keys(a) > Object.keys(b)
        // });

        // // console.log(cc);//获得一个新数组
        // //转成字符串数组
        // var strArr = [];
        // cc.forEach(function (value,currentIndex) {
        //     //取出key值和value值
        //     var arrValue = Object.keys(value)+'='+value[Object.keys(value)];
        //     strArr.push(arrValue)
        // });
        // var sortValue = strArr[0]+'&'+strArr[1]+'&'+strArr[2]+'&1b879acf2eb74ce52a6a1c0023cda398'
        // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+sortValue) 
        
        // //结果转换为小写并MD5加密
        // var MD5SortValue =  md5(sortValue).toLowerCase();
        // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+MD5SortValue)
        // const TokenApi = 'https://openapi.58.com/v2/auth/access_token?code='+resWuba.code+'&timestamp='+'1496829295748'+'&app_key='+'e36309f80bd9030c879d69ba4155a74b'+'&sig='+MD5SortValue
        
        //获取token令牌以及refreshtoken和openId
        //  await this.$http.get(TokenApi).then(response => {
        //    if(response.code == 0){
        //       this.TokenRES = TokenApi.data;
        //       this.openId = TokenApi.data.openid;
        //       this.access_token = TokenApi.data.access_token;
        //       this.refresh_token = TokenApi.data.refresh_token;

        //       var refreshsortList = [{openid:this.openId},{access_token:this.access_token},{refresh_token:this.refresh_token},{timestamp:'1496829295748'},{app_key:'e36309f80bd9030c879d69ba4155a74b'}];
        //       var bb = refreshsortList.sort(function (a,b) {
        //           return Object.keys(a) > Object.keys(b)
        //       });
        //       var RefreshstrArr = [];
        //       bb.forEach(function (value,currentIndex) {
        //           //取出key值和value值
        //           var fresharrValue = Object.keys(value)+'='+value[Object.keys(value)];
        //           RefreshstrArr.push(fresharrValue)
        //       });
        //       var RefreshsortValue = RefreshstrArr[0]+'&'+RefreshstrArr[1]+'&'+RefreshstrArr[2]+'&'+RefreshstrArr[3]+'&'+RefreshstrArr[4]+'&1b879acf2eb74ce52a6a1c0023cda398'
        //       var RefreshMD5SortValue =  md5(RefreshsortValue).toLowerCase();
        //       console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+RefreshMD5SortValue) 
        //       const RefreshTokenApi = 'https://openapi.58.com/v2/auth/access_token?openid='+this.openId+'&access_token'+this.access_token+'&refresh_token'+this.refresh_token+'&timestamp='+'1496829295748'+'&app_key='+'e36309f80bd9030c879d69ba4155a74b'+'&sig='+RefreshMD5SortValue
              
        //       this.$http.get(RefreshTokenRES).then(response =>{
        //         if(response.code == 0){
        //           this.RefreshTokenRES = response.data;
        //           const data = {
        //             openid: this.RefreshTokenRES.openId,
        //             access_token: this.RefreshTokenRES.access_token,
        //             access_token_expires: this.RefreshTokenRES.access_token_expires,
        //             refresh_token: this.RefreshTokenRES.refresh_token,
        //             refresh_token_expires: this.RefreshTokenRES.refresh_token_expires,
        //             UserName:'15523358281',
        //             WubaPassword:'Admin',
        //             UserId:this.userId,
        //           }
        //           this.$http.post('',data).then(response => {
        //             if(response.data == 200){
        //               console.log('刷新令牌成功')
        //             }
        //           })

        //         }
        //       })
        //    }
        //  });
        },
  methods: {
    ...mapMutations(['login', 'update']),
    getDate(userName,password) {
        // childValue就是子组件传过来的值
        this.user = userName;
        this.password = password;
      },
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

        //获取58令牌
        // const WuBaApi = 'https://openapi.58.com/v2/auth/show?app_key=e36309f80bd9030c879d69ba4155a74b&redirect_uri=http://972133.vip'

        // const resWuba = await this.$http.get(WuBaApi);
        // console.log(`resWuba:`+resWuba)
        // //获取授权令牌
        // var sortList = [{code:resWuba.code},{timestamp:'1496829295748'},{app_key:'e36309f80bd9030c879d69ba4155a74b'}];

        // //排序
        // var cc = sortList.sort(function (a,b) {
        //     return Object.keys(a) > Object.keys(b)
        // });

        // // console.log(cc);//获得一个新数组
        // //转成字符串数组
        // var strArr = [];
        // cc.forEach(function (value,currentIndex) {
        //     //取出key值和value值
        //     var arrValue = Object.keys(value)+'='+value[Object.keys(value)];
        //     strArr.push(arrValue)
        // });
        // var sortValue = strArr[0]+'&'+strArr[1]+'&'+strArr[2]+'&1b879acf2eb74ce52a6a1c0023cda398'
        // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+sortValue) 
        
        // //结果转换为小写并MD5加密
        // var MD5SortValue =  md5(sortValue).toLowerCase();
        // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+MD5SortValue)
        // const TokenApi = 'https://openapi.58.com/v2/auth/access_token?code='+resWuba.code+'&timestamp='+'1496829295748'+'&app_key='+'e36309f80bd9030c879d69ba4155a74b'+'&sig='+MD5SortValue
        
        // //获取token令牌以及refreshtoken和openId
        //  await this.$http.get(TokenApi).then(response => {
        //    if(response.code == 0){
        //       this.TokenRES = TokenApi.data;
        //       this.openId = TokenApi.data.openid;
        //       this.access_token = TokenApi.data.access_token;
        //       this.refresh_token = TokenApi.data.refresh_token;

        //       var refreshsortList = [{openid:this.openId},{access_token:this.access_token},{refresh_token:this.refresh_token},{timestamp:'1496829295748'},{app_key:'e36309f80bd9030c879d69ba4155a74b'}];
        //       var bb = refreshsortList.sort(function (a,b) {
        //           return Object.keys(a) > Object.keys(b)
        //       });
        //       var RefreshstrArr = [];
        //       bb.forEach(function (value,currentIndex) {
        //           //取出key值和value值
        //           var fresharrValue = Object.keys(value)+'='+value[Object.keys(value)];
        //           RefreshstrArr.push(fresharrValue)
        //       });
        //       var RefreshsortValue = RefreshstrArr[0]+'&'+RefreshstrArr[1]+'&'+RefreshstrArr[2]+'&'+RefreshstrArr[3]+'&'+RefreshstrArr[4]+'&1b879acf2eb74ce52a6a1c0023cda398'
        //       var RefreshMD5SortValue =  md5(RefreshsortValue).toLowerCase();
        //       console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`+RefreshMD5SortValue) 
        //       const RefreshTokenApi = 'https://openapi.58.com/v2/auth/access_token?openid='+this.openId+'&access_token'+this.access_token+'&refresh_token'+this.refresh_token+'&timestamp='+'1496829295748'+'&app_key='+'e36309f80bd9030c879d69ba4155a74b'+'&sig='+RefreshMD5SortValue
              
        //       this.$http.get(RefreshTokenRES).then(response =>{
        //         if(response.code == 0){
        //           this.RefreshTokenRES = response.data;
        //           const data = {
        //             openid: this.RefreshTokenRES.openId,
        //             access_token: this.RefreshTokenRES.access_token,
        //             access_token_expires: this.RefreshTokenRES.access_token_expires,
        //             refresh_token: this.RefreshTokenRES.refresh_token,
        //             refresh_token_expires: this.RefreshTokenRES.refresh_token_expires,
        //             UserName:'15523358281',
        //             WubaPassword:'Admin',
        //             UserId:this.userId,
        //           }
        //           this.$http.post('',data).then(response => {
        //             if(response.data == 200){
        //               console.log('刷新令牌成功')
        //             }
        //           })

        //         }
        //       })
        //    }
        //  });


      
				const datas = {
					userNameOrEmailAddress: this.user,
					password: this.password
				};
        const statu = `${this.$config.api}/api/cms/acount/loginAuthentic`;
       try{
          await this.$http.post(statu,datas).then(Response => {
            let that = this;
            console.log(JSON.stringify(Response))
            if(Response.status == 200){
              //this.$store.login(Response.data.userNameOrEmailAddress)
              // this.$store.userId = Response.data.userId; 
              // this.$store.hasLogin = true; 
              // this.$store.userName = Response.data.username;
              var update={
                  hasLogin: true,
                  userName:Response.data.username,
                  userId:Response.data.userId,
              }
              localStorage.setItem('update', JSON.stringify(update));
              // this.update({
              //     hasLogin: true,
              //     userName:Response.data.username,
              //     userId:Response.data.userId,
              //   });
                this.$router.replace('/index')
            }
          })
       }
       catch(e)
       {
          console.log(e)
          this.$error({
          title: '提示',
          content: '账号或密码错误！！！',});
             
       }

				// uni.setStorageSync('UserInfo', res.user);
			
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
.loginbg{
  height: 100%;
  width: 100%;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
}
.wrapper-login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  background: url("/static/bg.jpg");
  background-size: 100% 100%;
  box-sizing: boder-box;
  .banner-login {
    width: 450px;
    height: 505px;
    position: absolute;
    top: 22vh;
    right: 10vw;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.3);
    background-color: rgba(255,255,255,0.6);
    .img {
      width: 300px;
      height: 150px;
     // margin: 30px 0;
    }
    .item-qcode {
      margin-top: -10px;
      .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: -20px 90px;
        height: 50px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
      }
      .maimgs{
        height: 230px;
        width: 230px;
      }
      // .notification {
      //   div {
      //     margin-top: 78px;
      //     margin-bottom: 60px;
      //     color: rgba(181, 181, 181, 1);
      //     font-size: 14px;
      //     text-align: center;
      //     display: flex;
      //     flex-direction: column-reverse;
      //     align-items: center;
      //     font-family: SourceHanSansSC-regular;
      //     .maimgs{
      //       margin-top: -55px;
      //       height: 230px;
      //       width: 230px;
      //     }
      //   }
      // }
      .icd {
        height: 230px;
      }
      .logins {
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 230px;

        .el-input__inner {
          background-color: rgba(255, 255, 255, 1);
          border: none;
        }
        .inputs {
          width: 350px;
          height: 36px;
          border-radius: 0px 5px 5px 0px;
          color: rgba(135, 135, 135, 1);
          font-size: 14px;
          border: none;
          text-align: left;
          margin-bottom: 35px;
          font-family: Microsoft Yahei;
        }
        .btns {
          width: 350px;
          height: 36px;
          line-height: 20px;
          border-radius: 5px;
          background-color:#023179;
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
      margin: 35px auto;
      .g2-cad {
        width: 72px;
        line-height: 34px;
        border-radius: 5px;
        color: rgba(2, 49, 121, 0.8);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
        &.active {
          border: 1px solid rgba(2, 49, 121, 0.8);;
        }
      }
    }
    .btm {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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