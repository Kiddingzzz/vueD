<template>
    <div class="forget" v-show="showMask">
        <div class="forget-container">
            <div class="forget-title">{{title}}</div>
            <a-form class="content" :form="form" @submit="handleSubmit">
                <!--<a-form-item>
                    <label>会员名称:</label>
                    <a-input type="text" class="inputs" placeholder="请输入您的会员名" v-decorator="['userName', { 
                validateTrigger: 'blur',
                rules: [
                  { required: true, message: '会员名不能为空' },
                  { min: 5, max:25, message: '请输入5-25个字符组成的会员名' }
                ] }]">
                    </a-input>
                </a-form-item>-->
                <a-form-item>
                    <label>新密码:</label>
                    <a-input type="password" class="inputs" placeholder="请输入6-20个由大小字母、数字、标点组成的密码" v-decorator="['password', { 
                validateTrigger: 'blur',
                rules: [
                  { required: true, message: '密码不能为空' },
                  { min: 6, max:20, message: '请输入6-20个由大小字母、数字、标点组成的密码' },
                  {
                    validator: validateToNextPassword,
                  },
                ] }]">
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <label>确认密码:</label>
                    <a-input type="password" class="inputs" placeholder="请确认您的新密码" v-decorator="['respassword', { 
                validateTrigger: 'blur',
                rules: [
                  { required: true, message: '确认密码不能为空' },
                  {
                    validator: compareToFirstPassword,
                  },
                ] }]" @blur="handleConfirmBlur"></a-input>
                </a-form-item>
                <a-form-item>
                    <label>手机号码:</label>
                    <a-input type="text" class="inputs-code" placeholder="请输入您的手机号码" v-decorator="['phoneNumber', { 
                  validateTrigger: 'blur',
                  rules: [
                    {
                      validator: checkphoneNumber,
                    },
                  ] }]"></a-input>
                <a-button class="btns-code" @click="sendcodeh()" :disabled='disabled'>{{getCodeText}}</a-button> 
                </a-form-item>
                <a-form-item>
                    <label class="codecomfire">验证码:</label>
                    <a-input type="text" class="inputs-number" placeholder="请确认您手机收到的验证码" v-model="sendCode"></a-input>
                </a-form-item>
                <button class="btn-forget" html-type="submit" :disabled="dis" :loading="loading">提交</button>
            </a-form>
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
                loading:false,
                //取消禁止点击
                dis:false,
                visible: false,
                showMask: false,
                hobby2: '',
                userName: '',
                phoneNumber: '',
                password: '',
                sendCode: '',
                surname: '',
                respassword: '',
                getCodeText: '获取验证码',
                disabled: false,
                Yztext:'',
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'forget' });
        },
        mounted() {
            this.showMask = this.value;
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
                this.sendCode = '';
                this.loading = false;
                 this.phoneNumber = ''
            },
            closeMask() {
                this.showMask = false;
                this.form.resetFields();
                this.sendCode = '';
                this.loading = false;
                this.phoneNumber = ''
                //console.log("手动关闭后重置输入")
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        //console.log('正确', values);
                        this.doregister(values);
                    }
                });
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('password')) {
                    callback('两次输入密码不一致!');
                } else {
                    callback();
                }
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['respassword'], { force: true });
                }
                callback();
            },
            checkphoneNumber(rule, value, callback) {
                if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
                    this.phoneNumber=''
                    callback('请填写正确的手机号');
                } else {
                    this.phoneNumber=value
                    callback();
                }
            },
            async  sendcodeh() {
                console.log("发送验证码前的电话号码:"+this.phoneNumber)
                this.disabled = true;
                if(this.phoneNumber=='' || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)){
                    this.$message.error('手机号码不能为空,且手机号码必须格式正确！');
                    this.disabled = false;
                    return;
                }
              
                console.log("电话号码：")
                console.log(this.phoneNumber)
                if(this.phoneNumber=='')
                {
                    this.$message.error('手机号码为空！');
                    return;
                }
                var pones=  await this.$http.post(`${this.$config.api}/api/cms/acount/phoneIS?phNumber=` + this.phoneNumber)
                if(pones.data.code=="200"){
                    this.$message.error('该手机号未注册，请查实！');
                    this.disabled = false;
                    return;
               }
               else{
                    this.getCodeText = "发送中...";
                await this.$http.post(`${this.$config.api}/api/cms/acount/sendyanm?phNumber=` + this.phoneNumber).then(pones => {
                    console.log(pones.data)
                            if(pones.data.backCode=="OK"){
                                this.Yztext=pones.data.context;
                                    //示例用定时器模拟请求效果
                                    setTimeout(() => {
                                        this.$message.success('验证码发送成功！');
                                        this.setTimer();
                                    }, 1000);
                            }
                            else{
                                this.disabled = false;
                                 clearInterval(this.Timer);
                                 this.getCodeText = "获取验证码"
                                this.$message.error('验证码发送失败！');
                           }
                })
               }
               
            },
            setTimer() {
                let holdTime = 60;
                this.getCodeText = "重新获取(60)";
                this.Timer = setInterval(() => {
                    if (holdTime <= 0) {
                    //   this.getCodeisWaiting = false;
                    //   this.getCodeBtnColor = "#878787";     
                    this.getCodeText = "获取验证码";
                    clearInterval(this.Timer);
                    this.disabled = false;
                    return;
                    }
                    this.getCodeText = "重新获取(" + holdTime + ")";
                    holdTime--;
                }, 1000);
            },
            async doregister(e) {
                  console.log(e)
                if( this.Yztext!=this.sendCode){
                    this.$message.error('验证码错误！');
                    return;
                }
              
               else{
                    const data = {
                    UserPwd: e.respassword,
                    phonenumbei: e.phoneNumber
                    };
                console.log(`aaaaaaaaaaaaaaaaa` + data)
                try {
                    const Statu = `${this.$config.api}/api/cms/acount/rempwd`;
                    const res = await this.$http.post(Statu, data).then(res=>{
                       
                        // this.$emit('childValue', e.userName, e.respassword)
                        setTimeout(() => {
                            this.showMask = false;
                            this.form.resetFields();
                        }, 500);

                    });
                   
                } catch (error) {
                    this.$error({
                        icon: "none",
                        title: "注册失败"
                    });
                }
               }
            }
        },
        watch: {
            value(newVal, oldVal) {
                this.showMask = newVal;
                if(this.showMask==false){
                    this.phoneNumber = ''
                }
            },
            showMask(val) {
                clearInterval(this.Timer);
                this.getCodeText = "获取验证码";
                this.disabled = false;
                this.$emit("input", val);
            }
        }
    };
</script>
<style lang="less" scoped>
    //@import '~@/assets/changeantd.less';

    /deep/.ant-form-item-children {
        bottom: 4px;
    }

    /deep/.ant-form-explain {
        margin-left: 75px;
        display: flex;
    }

    .xieyi {
        width: 50vh;

        strong {
            color: #000000;
            line-height: 26px;
            font-size: 14px;
        }

        p {
            font-size: 12px;
            color: rgb(112, 111, 111);
            //line-height: 22px;
            text-align: justify;
            text-justify: inter-ideograph;
        }
    }

    .forget{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;

        .forget-container {
            width: 500px;
            height: 510px;
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

            .forget-title {
                width: 100%;
                font-size: 18px;
                font-weight: 600;
                color: #696969;
                padding: 50px 0px 0 0px;
                box-sizing: border-box;
            }

            .content {
                margin-top: 40px;
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

                    // margin-bottom: 30px;
                    .codecomfire {
                        margin-left: 10px;
                    }

                    .inputs {
                        margin-left: 10px;
                        width: 280px;
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
                        width: 180px;
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
                        width: 280px;
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
                        width: 90px;
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

                .btn-forget {
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

                &>div {
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

                .icon-guanbi {
                    font-size: 30px !important;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        /deep/.ant-form-explain{
            font-size: 12px;
        }
        /deep/.ant-form-item-control-wrapper{
            width: 100% !important;
        }
         .forget-container {
            width: 75% !important;
            height: 400px !important;
            line-height: 20px;          
            .forget-title {
                font-size: 16px !important;
                padding: 20px 0px 0 0px !important;
            }
            .content {
                margin-top: 20px !important;
                padding: 0 10px !important;
                label {
                    line-height: 25px !important;
                    font-size: 12px !important;
                }
                div {
                    .inputs {
                        margin-left: 5px !important;
                        width: 70% !important;
                        text-indent: 5px !important;
                    }

                    .inputs-code {
                        margin-left: 5px !important;
                        width: 40% !important;
                        text-indent: 5px !important;
                    }

                    .inputs-number {
                        margin-left: 5px !important;
                        width: 70% !important;
                        text-indent: 5px !important;
                    }

                    .btns-code {
                        margin-left: 5px !important;
                        width: 30% !important;
                        text-indent: 5px !important;
                        padding: 0px;
                    }
                }
                .font-size {
                    margin-top: 10px !important;
                    .checkout {
                        width: 16px;
                        height: 16px;
                        margin-top: 6px;
                    }

                    a {
                        font-size: 12px !important;
                    }
                }

                .btn-forget {
                    width: 70% !important;
                }
            }
        }
   
    }
</style>