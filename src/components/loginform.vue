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
                        <div style="    position: absolute;text-align: center;left: 98px;top: 112px;font-size: 16px;font-weight: 550;color: #1f9dcb;">
                            房源群发 一键采集 开单就是这么简单！
                        </div>
                        <div class="logins">
                            <!-- <el-input prefix-icon="iconfont icon-User" v-model="user" placeholder="请输入姓名" class="inputs"
                                @keyup.enter.native="doLogin()"></el-input> -->
                                <el-autocomplete
                                prefix-icon="iconfont icon-User"
                                class="inline-input"
                                v-model="user"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入会员名称或手机号码"
                                value-key="userNameOrEmailAddress"
                                @input = "reset"
                                @select="handleSelect"
                                @keyup.enter.native="doLogin()"
                                ></el-autocomplete>
                                
                            <el-input type="password" autocomplete="off" placeholder="请输入密码" v-model="password" class="inputs"
                                @keyup.enter.native="doLogin()" prefix-icon="iconfont icon-mima"></el-input>
              		        <el-checkbox v-model="checked" style="color:#023179;">记住密码</el-checkbox>
                            <a-button class="btns" @click="doLogin()" :disabled="dis" :loading="loading">登录</a-button>
                            <a-button class="btns" @click="openMask" :disabled="dis">注册</a-button>
                        </div>
                    </div>
                </div>
                <!-- <div class="account">
                    <div class="g2-cad" :class="{'active':account == 'qcode'}" @click="account = 'qcode'">二维码</div>
                    <div class="g2-cad" :class="{'active':account == 'username'}" @click="account = 'username'">账号</div>
                </div> -->

                <dialog-register v-model="sendVal" @childByValue="getDate" type="danger" title="欢迎注册开单王">
                </dialog-register>
                <forget v-model="forgetVal" @childValue="getforgetVal" type="danger" title="找回密码">
                </forget>

                <div class="btm">
                    <div class="pwd" v-if="account == 'username'">
                        <!-- <div @click="openMask" class="reg">注册</div> -->
                        <div @click="openforget" class="forget">忘记密码</div>
                    </div>
                </div>
            
            
            
            </div>
            <div style="position: absolute;bottom: 20px;left: 10px;">
                <a href="http://www.beian.miit.gov.cn" target="_blank">备案号:渝ICP备20000393号-1</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import dialogRegister from "./dialog-register.vue";
    import forget from './forget.vue'
    import md5 from 'js-md5';
    import { encryptDes, decryptDes } from '../des';

    export default {
        components: {
            dialogRegister,
            forget,
        },
        data() {
            return {
                loading:false,
                //取消禁止点击
                dis: false,
      		    checked: false,
                payvisible: false,
                weixinvisible: false,
                qqvisible: false,
                type: "pay",
                imgType: "",
                account: "username",
                sendVal: false,
                forgetVal: false,
                user: "",
                password: "",
                TokenRES: {},
                RefreshTokenRES: {},
                openId: '',
                access_token: '',
                refresh_token: '',
                ip: '',
                remember: '',
                //用户名下拉框
                restaurants: [],
                test: [],
                ip: '',
                AccountType:'',
                sitecookie:'',
            };
        },
        computed: {
            alipay() {
                return this.type == "pay"
                    ? "/assets/v2_prlna1.png"
                    : "../../assets/alipay.png";
            }
        },
        mounted() {
            //获取登录前的localStorage存的账号
            let BackUserPwd =[]
            BackUserPwd = JSON.parse(localStorage.getItem("BackUserPwd"))
            if(BackUserPwd != null){
                this.restaurants = BackUserPwd
            }
            this.getUserIP((ip) => {
                this.ip = ip;
            });
        },
        methods: {
            //重置
            reset (){
                this.password = ''
               this.checked = false
            },
            //获取内网ip
            getUserIP(onNewIP) {
                let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                let pc = new MyPeerConnection({
                    iceServers: []
                });
                let noop = () => {
                };
                let localIPs = {};
                let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
                let iterateIP = (ip) => {
                if (!localIPs[ip]) onNewIP(ip);
                localIPs[ip] = true;
                };
                pc.createDataChannel('');
                pc.createOffer().then((sdp) => {
                sdp.sdp.split('\n').forEach(function (line) {
                    if (line.indexOf('candidate') < 0) return;
                    line.match(ipRegex).forEach(iterateIP);
                });
                pc.setLocalDescription(sdp, noop, noop);
                }).catch((reason) => {
                });
                pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
                ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
                };
            },
            ///获取已登录用户及密码
            //  async BackUserPwd()
            // {
            //   console.log("ip地址："+this.ip)
            //     await this.$http.get(`${this.$config.api}/api/cms/acount/backUserPwd?AdressIp=`+this.ip).then(Response=>{
            //         if(Response.status == 200)
            //         {
            //             if(Response.data.items.length != 0){
            //                 this.restaurants = Response.data.items
            //             }
            //         }
            //     })
            // },
            //用户名下拉框
            querySearch(queryString, cb) {
                // console.log(this.restaurants)
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据            
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                return (restaurant.userNameOrEmailAddress.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                if(item.remPasspwd == '是'){
                    this.password = decryptDes(item.password, '08h0c42y') 
                    this.checked = true
                }
                if(item.remPasspwd == '否'){
                    this.checked = false
                }
            },
            ...mapMutations(['login', 'update']),
            onChange(e) {
            },
            getDate(userName, password) {
                // childValue就是子组件传过来的值
                this.user = userName;
                this.password = password;
            },
            getforgetVal(userName, password) {
                // childValue就是子组件传过来的值
                this.user = userName;
                this.password = password;
            },
            hide() {
                this.payvisible = false;
                this.weixinvisible = false;
                this.qqvisible = false;
            },
            openMask(index) {
                this.sendVal = true;
            },
            openforget(index) {
                this.forgetVal = true;
            },
            async doLogin() {
                if(this.user==""||this.password==""){
                   this.$error({
                        title: '提示',
                        content:"账号或密码不能为空！" ,
                    });
                    return;
                }
                this.dis = 'disabled'
                this.loading = true
                if(this.checked == true){
                    this.remember = '是'
                }else{
                    this.remember = '否'
                }

                const datas = {
                    userNameOrEmailAddress: this.user,
                    password: this.password,
                    adressIp: '129.122.023',
                    remPasspwd: this.remember,
                };
                const jiamidatas = {
                    userNameOrEmailAddress: this.user,
                    password: encryptDes(this.password, '08h0c42y'),
                    adressIp: '129.122.023',
                    remPasspwd: this.remember,
                };
                const statu = `${this.$config.api}/api/cms/acount/loginAuthentic`;
                try {
                    await this.$http.post(statu, datas).then(Response => {
                        let that = this;
                       
                        if (Response.data.returnValue.code == "200") {
                              if(Response.data.sitename!='' && Response.data.refreshCookie == '需要刷新'){
                                const that=this
                                const cookes={username:Response.data.sitename,userpwd:Response.data.sitepwd,userid:Response.data.userId,cookie:that.sitecookie,types: that.AccountType}
                                $.ajax({
                                        type: 'GET',
                                        async:true,
                                        url: 'http://47.108.24.104:8084/get_user?data=' + JSON.stringify(cookes),
                                        dataType: 'jsonp', //希望服务器返回json格式的数据
                                        jsonp: "callback",
                                        jsonpCallback: "successCallback",//回调方法
                                        success: function (data) {
                                            if(data=="100"){
                                                that.AccountType="不可用"
                                            }
                                            else{
                                                that.AccountType="可用"
                                                that.sitecookie=data
                                            }
                                        }
                                    });
                              }
                             this.dis = false;
                             this.loading = false;
                            //判断保存的
                          //  let hh = JSON.parse(localStorage.getItem("BackUserPwd"))

                          
                            if(this.restaurants != ''){
                                for(let i=0;i<this.restaurants.length;i++){
                                    if(this.restaurants[i].userNameOrEmailAddress == jiamidatas.userNameOrEmailAddress){
                                        this.restaurants.splice(i,1)
                                    }
                                }
                                this.restaurants.push(jiamidatas)
                                localStorage.setItem("BackUserPwd",JSON.stringify(this.restaurants))
                            }else{
                                this.restaurants.push(jiamidatas)
                                localStorage.setItem("BackUserPwd",JSON.stringify(this.restaurants))
                            }


                            // window.location.reload();
                            //this.$store.login(Response.data.userNameOrEmailAddress)
                            // this.$store.userId = Response.data.userId; 
                            // this.$store.hasLogin = true; 
                            // this.$store.userName = Response.data.username;
                            var update = {
                                hasLogin: true,
                                userName: Response.data.username,
                                userId: Response.data.userId,
                            }
                            localStorage.setItem('update', JSON.stringify(update));
                            
                            this.$router.replace('/index')
                            
                        }
                        else{
                             this.$error({
                                title: '提示',
                                content:Response.data.returnValue.msg ,
                            });
                        }
                    })
                }
                catch (e) {
                    this.$error({
                        title: '提示',
                        content: '系统错误，请重试',
                        });
                    }
                    this.dis = false; 
                    this.loading = false;
                      // uni.setStorageSync('UserInfo', res.user);
                },
        },
       
    };
</script>
<style lang="less" scoped>
    // @import "../../styles";
    //@import "~@/assets/iconfont.css";
/deep/.el-input,/deep/.el-input--prefix{
    width: 350px;
    margin-bottom: 35px;
}
.el-checkbox{
    width: 350px;
    display: flex;
    align-items: center;
 }
    .loginbg {
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
        background: url("/static/bg1.jpg");
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
            background-color: rgba(255, 255, 255, 0.6);

            .img {
                width: 300px;
                height: 150px;
                // margin: 30px 0;
            }

            .item-qcode {
                margin-top: 5px;

                .icons {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    // justify-content: center;
                    margin: -20px 90px;
                    height: 50px;

                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }
                }

                .maimgs {
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
                    height: 250px;

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
                        background-color: #023179;
                        color: rgba(255, 255, 255, 1);
                        font-size: 14px;
                        text-align: center;
                        font-family: Roboto;
                        border: none;
                        margin-top: 5px;
                    }
                }
            }

            .account {
                display: flex;
                // justify-content: space-between;
                justify-content: center;
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
                        border: 1px solid rgba(2, 49, 121, 0.8);
                        ;
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
                        margin-left: 344px;
                        margin-top: 30px;
                    }
                }
            }
        }
    }
</style>