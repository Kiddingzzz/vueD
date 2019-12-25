<template>
    <div class="forget" v-show="showMask">
        <div class="forget-container">
            <div class="forget-title">{{title}}</div>
            <a-form class="content" :form="form" @submit="handleSubmit">
                <a-form-item>
                    <label>会员名称:</label>
                    <a-input type="text" class="inputs" placeholder="请输入您的会员名" v-decorator="['userName', { 
                validateTrigger: 'blur',
                rules: [
                  { required: true, message: '会员名不能为空' },
                  { min: 5, max:25, message: '请输入5-25个字符组成的会员名' }
                ] }]">
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <label>登录密码:</label>
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
                <!-- <a-form-item>
                    <label>手机号码:</label>
                    <a-input type="text" class="inputs-code" placeholder="请输入您的手机号码" v-decorator="['phoneNumber', { 
                  validateTrigger: 'blur',
                  rules: [
                    {
                      validator: checkphoneNumber,
                    },
                  ] }]"></a-input>
                    <button class="btns-code" @click="sendcode()">发送验证</button>
                </a-form-item>
                <a-form-item>
                    <label class="codecomfire">验证码:</label>
                    <a-input type="text" class="inputs-number" placeholder="请确认您手机收到的验证码" v-model="sendCode"></a-input>
                </a-form-item> -->
                <button class="btn-forget" html-type="submit">提交</button>
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
                visible: false,
                showMask: false,
                hobby2: '',
                userName: '',
                phoneNumber: '',
                password: '',
                sendCode: '',
                surname: '',
                respassword: '',
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
            },
            closeMask() {
                this.showMask = false;
                this.form.resetFields();
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
            // checkphoneNumber(rule, value, callback) {
            //     if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
            //         callback('请填写正确的手机号');
            //     } else {
            //         callback();
            //     }
            // },
           
            // async doregister(e) {
            //     const data = {
            //         //userNameOrEmailAddress: this.phoneNumber,
            //         userNameOrEmailAddress: e.userName,
            //         password: e.password,
            //         phoneNumber: e.phoneNumber
            //         // sendCode: this.sendCode,
            //         // surname: this.phoneNumber
            //     };
            //     console.log(`aaaaaaaaaaaaaaaaa` + data)
            //     try {
            //         const Statu = `${this.$config.api}/api/cms/acount/register`;
            //         const res = await this.$http.post(Statu, data);
            //         console.log(this.phoneNumber);
            //         this.$emit('childByValue', e.userName, e.password)
            //         setTimeout(() => {
            //             this.showMask = false;
            //             this.form.resetFields();
            //             console.log("注册成功后后重置输入")
            //         }, 500);
            //     } catch (error) {
            //         this.$error({
            //             icon: "none",
            //             title: "注册失败"
            //         });
            //     }
            // }
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
</style>