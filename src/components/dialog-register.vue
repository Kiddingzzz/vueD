<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{title}}</div>
            <a-form class="content" :form="form" @submit="handleSubmit">
                <a-form-item>
                    <label>会员名称:</label>
                    <a-input type="text" class="inputs" placeholder="请输入5-25个字符组成的会员名，推荐使用中文" v-decorator="['userName', { 
                validateTrigger: 'blur',
                rules: [
                  { required: true, message: '会员名不能为空' },
                  { min: 5, max:25, message: '请输入5-25个字符组成的会员名' }
                ] }]">
                    </a-input>
                    <!-- <span class="message" v-if="!$v.userName.required">会员名不能为空</span>
            <span class="message" v-if="!$v.userName.minLength">fgdf</span> -->
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
                    <a-input type="password" class="inputs" placeholder="请确认您的登录密码" v-decorator="['respassword', { 
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
                    <button class="btns-code" @click="sendcode()">发送验证</button>
                </a-form-item>
                <a-form-item>
                    <label class="codecomfire">验证码:</label>
                    <a-input type="text" class="inputs-number" placeholder="请确认您手机收到的验证码" v-model="sendCode"></a-input>
                </a-form-item>
                <a-form-item class="font-size">
                    <a-checkbox v-decorator="['agreement', {
                valuePropName: 'checked',
                initialValue: false,
                rules: [
                    {
                      validator: checkagreement,
                    },
                  ]
                }]">
                        我同意开单网的
                        <a href="#" @click="showModal">《商家合作协议》</a>
                        <a-modal class="xieyi" title="《商家合作协议》" width="80vw" okText="确认" cancelText="取消"
                            v-model="visible" @ok="handleOk">
                            <strong>1、开单王服务条款的接受</strong>
                            <p>通过完成开单王注册程序，用户便表明其接受了本服务协议的条款，并同意受本服务协议的约束；同时，用户保证其提交的信息真实、准确、及时和完整。
                                本服务协议所称的用户是指完全同意所有条款(以下简称“服务条款”)并完成注册程序的服务接受者。</p>
                            <strong>2、 服务条款的变更和修改</strong>
                            <p>开单王保留依其自主判断在将来的任何时间变更、修改、增加或删除本服务协议条款的权利。所有修改的协议均构成本服务协议的一部分。开单王有权随时对服务条款进行修改，一旦发生服务条款的变动，开单王将提示修改的内容；当用户使用开单王的特殊服务时，应接受开单王随时提供的与该特殊服务相关的规则或说明，并且此规则或说明均构成本服务条款的一部分。用户如果不同意服务条款的修改，可以主动取消已经获得的网络服务；如果用户继续享用网络服务，则视为用户已经接受服务条款的修改。
                            </p>
                            <strong>3、 服务说明</strong>
                            <p>开单王运用自己的操作系统通过国际互联网向用户提供丰富的网上资源，包括各种信息工具，个性化服务等(以下简称本服务)。除非另有明确规定，增强或强化目前服务的任何新功能，包括新产品，均无条件地适用本服务条款。
                                <br />除非本协议中另有规定，否则开单王对网络服务不承担任何责任，即用户对网络服务的使用承担风险。开单王不保证服务一定会满足用户的使用要求，也不保证服务不会受中断，对服务的及时性、安全性、准确性也不作担保。
                                <br />A. 为使用本服务，用户必须：
                                <br />(1).自行配备进入国际互联网所必需的设备，包括计算机、数据机，其他存取装置或接受服务所需其它设备；
                                <br />(2).自行支付与此服务有关的费用；
                                <br />B. 用户接受本服务须同意：
                                <br />(1).提供完整、真实、准确、最新的个人资料；
                                <br />(2).不断更新注册资料。
                                <br />若用户提供任何错误、不实、过时或不完整的资料，或者开单王有合理理由怀疑前述资料为错误、不实、过时或不完整，开单王有权暂停或终止用户的帐号，并拒绝其现在或将来使用本服务的全部或一部分。
                                开单王有权规定并修改使用本服务的一般措施，包括但不限于决定保留电子邮件讯息或其他上载内容的时间、限制本服务一个帐号可接收信息的数量等措施。如开单王未能储存或删除本服务的内容或其他讯息，开单王不负担任何责任。对于用户3个月未使用的帐号，开单王有权(但无义务)予以删除。
                                <br />由于用户经由本服务张贴或传送内容、与本服务连线、违反本服务条款或侵害其他人的任何权利导致任何第三方提出权利主张或使开单王遭受任何形式的罚款或处罚，用户同意以适当方式充分消除对开单王的不利影响，赔偿开单王及其分公司、关联公司、代理人或其他合作伙伴及员工的损失，并使其免受损害。
                            </p>
                            <strong>4、用户应遵守以下法律及法规</strong>
                            <p>用户同意遵守中华人民共和国法律法规，尤其是《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》等有关计算机及互联网的法律法规和实施办法。在任何情况下，如果开单王有
                                合理理由认为用户的行为可能违反上述法律、法规，开单王可以在任何时候，不经事先通知终止向该用户提供服务。用户应了解国际互联网的无国界性，应特别注意遵守当地所有有关的法律和法规。
                            </p>
                            <strong>5、 用户隐私权</strong>
                            <p>当用户注册开单王的服务时，用户须提供个人信息。开单王收集个人信息的目的是为用户提供尽可能多的个人化网上服务以及为广告商提供一个方便的途径来接触到适合的用户，并且可以发送相关的信息和广告。在此过程中，广告商绝对不会接触到用户的个人信息。
                                <br />A. 开单王不会在未经合法用户授权时，公开、编辑或透露其个人信息及保存在开单王中的非公开内容，除非有下列情况：
                                <br />(1).有关法律规定或开单王合法服务程序规定；
                                <br />(2).在紧急情况下，为维护用户及公众的权益；
                                <br />(3).为维护开单王的合法权益；
                                <br />(4).其他需要公开、编辑或透露个人信息的情况。
                                <br />B. 在以下(包括但不限于)几种情况下，开单王有权使用用户的个人信息：
                                <br />(1).在进行促销或抽奖时，开单王可能会与赞助商共享用户的个人信息，在这些情况下开单王会在发送用户信息之前进行提示，并且用户可以通过不参与来终止传送过程。
                                <br />(2)开单王可以将用户信息与第三方数据匹配。
                                <br />(3).开单王会通过透露合计用户统计数据，向未来的合作伙伴、广告商及其他第三方以及为了其他合法目的而描述开单王的服务。
                                <br />开单王会向用户发送客户订制的信息或者开单王认为用户会感兴趣的其他信息。如果用户不希望收到这样的信息，只需在提供个人信息时或其他任何时候告知即可。另外，开单王会采取行业惯用措施保护用户信息的安全，但开单王不能确信或保证任何个人信息的安全性，用户须自己承担风险。比如用户联机公布可被公众访问的个人信息时，用户有可能会收到未经用户同意的信息；开单王的合作伙伴和可通过开单王访问的第三方因特网站点和服务；通过抽奖、促销等活动得知用户个人信息的第三方会进行独立的数据收集工作等活动。开单王对用户及其他任何第三方的上述行为，不承担任何责任。
                            </p>
                            <strong>6、 用户帐号、密码和安全</strong>
                            <p>用户一旦注册成功，便成为开单王的合法用户，将得到一个密码和帐号。用户应妥善使用和保管账号和密码，不得将本人账号以售卖，租赁、出借或免费使用等任何方式提供给任何其他第三方使用，亦不得购买、盗用、冒用、或窃取其他人的账号密码。如用户发现任何人未经授权使用您的开单王账号，或发生账号、密码泄露、被盗、未授权的使用、安全漏洞或其他任何情况，用户应当立即通知开单王，否则可能得不到开单王的安全保护。未经开单王许可，用户不得自行或授权、协助任何第三方非法抓取开单王内容，“非法抓取”是指采用程序或者非正常浏览等技术手段获取内容数据的行为。开单王不对因用户未能遵守本协议相关规则（包括但不限于妥善保管和使用账号密码等）而发生的任何数据丢失、泄密或财产损失等后果负责。用户有义务保证密码和帐号的安全，对利用该密码和帐号所进行的一切活动负全部责任；因此所衍生的任何损失或损害，开单王无法也不承担任何责任。
                            </p>
                            <strong>7、 对用户信息的存储和限制</strong>
                            <p>开单王不对用户所发布信息的删除或储存失败负责。开单王有权判断用户的行为是否符合开单王服务条款规定的权利，如果开单王认为用户违背了服务条款或《开单王新用户首发房源须知》的规定，开单王有权删除用户发布或发送的信息（包括但不限于对其执行《虚假房源处理系统规则》的处罚），乃至中断或终止向其提供网络服务。
                            </p>
                            <strong>8、 禁止用户从事以下行为：</strong>
                            <p>(1).上载、张贴、发送或传送任何非法、有害、淫秽、粗俗、猥亵的，胁迫、骚扰、中伤他人的，诽谤、侵害他人隐私或诋毁他人名誉或商誉的，种族歧视或其他不适当的信息或电子邮件，包括但不限于资讯、资料、文字、软件、音乐、照片、图形、信息或其他资料(以下简称内容)。
                                <br />(2).以任何方式危害未成年人。
                                <br />(3).冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或任何机构有关。
                                <br />(4).伪造标题或以其他方式操控识别资料，使人误认为该内容为开单王所传送。
                                <br />(5).上载、张贴、发送电子邮件或以其他方式传送无权传送的内容(例如内部资料、机密资料)。
                                <br />(6).上载、张贴、发送电子邮件或以其他方式传送侵犯任何人的专利、商标、著作权、商业秘密或其他专属权利之内容。
                                <br />(7).在开单王网站专供张贴广告的区域之外，上载、张贴、发送电子邮件或以其他方式传送广告函件、促销资料、"垃圾邮件"等。
                                <br />(8).上载、张贴、发送电子邮件或以其他方式传送有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料。
                                <br />(9).干扰或破坏本服务或与本服务相连的服务器和网络，或不遵守本服务协议之规定。
                                <br />(10).故意或非故意违反任何相关的中国法律、法规、规章、条例等其他具有法律效力的规范。
                                <br />(11).跟踪或以其他方式骚扰他人。
                                <br />(12).其它被开单王视为不适当的行为。
                                <br />用户对经由本服务上载、张贴、发送电子邮件或传送的内容负全部责任；对于经由本服务而传送的内容，开单王不保证前述内容的正确性、完整性或品质。用户在接受本服务时，有可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，开单王均不对任何内容负责，包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。开单王有权(但无义务)自行拒绝或删除经由本服务提供的任何内容。用户使用上述内容，应自行承担风险。
                                <br />开单王有权利在下述情况下，对内容进行保存或披露：
                                <br />(1) 法律程序所规定；
                                <br />(2) 本服务条款规定；
                                <br />(3) 被侵害的第三人提出权利主张；
                                <br />(4) 为保护开单王、其使用者及社会公众的权利、财产或人身安全。
                                <br />(5) 其他开单王认为有必要的情况。
                            </p>
                            <strong>9、 关于链接</strong>
                            <p>本服务可能会提供与其他国际互联网网站或资源进行链接。对于前述网站或资源是否可以利用，开单王不予担保。因使用或依赖上述网站或资源所产生的损失或损害，开单王也不承担任何责任。</p>
                            <strong>10、 服务的修改和终止</strong>
                            <p>开单王有权在任何时候，暂时或永久地修改或终止本服务或其中任何一部分，无论是否通知。开单王对本服务的修改或终止对用户和任何第三人不承担任何责任。开单王有权基于任何理由，终止用户的帐号、密码或拒绝其使用本服务，或删除、转移用户存储、发布在本服务的内容，开单王采取上述行为均不需通知，并且对用户和任何第三人不承担任何责任。
                            </p>
                            <strong>11、 通知</strong>
                            <p>开单王向用户发出的通知，可以采用短信、页面公告、常规信件或开单王认为适合的形式。服务条款的修改或其他事项变更时，开单王将会以上述形式进行通知。</p>
                            <strong>12 全部协议</strong>
                            <p>本服务协议规范用户使用本服务，将取代用户先前与开单王签署的任何协议。本服务协议和开单王的其他服务条款构成完整的协议。
                                <br />同时您也同意遵守以下两项服务管理规定和办法。
                                <br />《互联网电子公告服务管理规定》
                                <br />《互联网信息服务管理办法》
                            </p>
                            <strong>13、 法律的适用和管辖</strong>
                            <p>本服务条款的生效、履行、解释及争议的解决均适用中华人民共和国法律，发生的争议提交厦门仲裁委员会，其仲裁裁决是终局的。如果本服务协议中某项条款因与中华人民共和国现行法律相抵触而导致无效，将不影响其他部分的效力。
                            </p>
                            <strong>14、 生效条件</strong>
                            <p>除非另行通知，本协议自2020年01月01日起生效。</p>
                        </a-modal>
                    </a-checkbox>
                </a-form-item>
                <!-- <button class="btn-register" @click="doregister()">完成注册</button> -->
                <button class="btn-register" html-type="submit" :disabled="dis">完成注册</button>
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
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
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
                console.log("手动关闭后重置输入")
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('正确', values);
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
                    callback('请填写正确的手机号');
                } else {
                    callback();
                }
            },
            checkagreement(rule, value, callback) {
                //console.log("同意、、、、、、、、、、、、、"+value)
                if (value == false) {
                    callback('请勾选我同意');
                } else {
                    callback();
                }
            },
            // userblur(){ 
            //   if(this.userName.length < 5){
            //       this.$error({
            //       icon: "none",
            //       title: "会员名称长度不够"
            //     });
            //   }else{
            //     this.register = true;
            //   }
            // },
            // passblur(){ 
            //   if (this.password.length < 6){
            //     this.$error({
            //       icon: "none",
            //       title: "密码最短为 6 个字符"
            //     });
            //   }else{
            //     this.register = true;
            //   }
            // },
            // repassblur(){
            //   if(this.respassword == ''){
            //     this.$error({
            //       icon: "none",
            //       title: "确认密码不能为空"
            //     });
            //   }else if (this.password != this.respassword) {
            //     this.$error({
            //       icon: "none",
            //       title: "两次输入密码不一致"
            //     });
            //   }else{
            //     this.register = true;
            //   }
            // },
            // checkagree(){
            //   if (!this.hobby2) {
            //     this.register = true;
            //   }else{
            //     this.$error({
            //       icon: "none",
            //       title: "请勾选同意"
            //     });
            //   }
            // },

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
            async doregister(e) {
                console.log('正在注册，请耐心等待......')
                this.dis = 'disabled';
                const data = {
                    //userNameOrEmailAddress: this.phoneNumber,
                    userNameOrEmailAddress: e.userName,
                    password: e.password,
                    phoneNumber: e.phoneNumber
                    // sendCode: this.sendCode,
                    // surname: this.phoneNumber
                };
                console.log(`aaaaaaaaaaaaaaaaa` + data)
                try {
                    const Statu = `${this.$config.api}/api/cms/acount/register`;
                    const res = await this.$http.post(Statu, data);
                    console.log(this.phoneNumber);
                    this.$emit('childByValue', e.userName, e.password)
                    setTimeout(() => {
                        this.showMask = false;
                        this.form.resetFields();
                        console.log("注册成功后后重置输入")
                    }, 500);
                    this.dis = false;
                } catch (error) {
                    this.$error({
                        icon: "none",
                        title: "注册失败"
                    });
                    this.dis = false;
                }
            }
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

                    // margin-bottom: 30px;
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
                    // font-size: 16px;
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