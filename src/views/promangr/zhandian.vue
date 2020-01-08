<template>
    <div class="ts4">
        <div class="filter-wraps1" style="padding: 24px 24px 0px;">
            <div class="search_bds1" >
                <div class="zhandiantishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                <div>
                    1、删除账号后刷新计划要重新设置。
                </div>
                <div>
                    2、如果要修改账号名，请先删除旧账号再添加新账号。
                </div>
                <div>
                    3、如果您添加的帐号在对应网站修改了密码，请及时同步更新在本站对应帐号的密码，如果没及时同步更新，将会造成发布或者刷新失败。
                </div>
                <div>
                    4、每个网站最多可添加1个账号,请猛击“添账号”按钮！
                </div>
                <div>
                    5、鉴于几大主流付费网站对账号登录限制严格，我们增加了绑定成功的账号在24小时内不能删除的限制
                </div>
            </div>
        </div>
        <div style="padding: 24px 24px 0px;">
         <a-spin tip="玩命提交中,请稍等......" :spinning="zhanspinning">
             <a-tabs @change="callback" type="card">
             
                <a-tab-pane tab="全部网站" key="1">
                    <a-table width="1120px" :columns="columnss" :dataSource="item">
                        <span slot="name" slot-scope="name">
                            <a-tag v-for="tag in name" :key="tag"
                              :color="tag==='loser' ? 'volcano' : (tag.toUpperCase()!='允许发布'? 'rosybrown' : 'skyblue')"
                            >
                                {{tag.toUpperCase()}}
                            </a-tag>
                        </span>
                         <!-- <img src="../../assets/logo/fang.png"/> -->
                        <span slot="inter" slot-scope="text, record" >
                            
                            <img class="interimg" :src="record.inter">
                          <!-- <a>{{record.inter}}</a>-->
                        </span>
                        <span slot="tiaojian" slot-scope="text, record">
                            <a-tag v-for="tag in record.tiaojian" @click="ceshi(tag,record.siteName,record.userName)"
                                :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')" :key="tag">

                                {{tag.toUpperCase()}}
                            </a-tag>
                            <a-modal title="登录账号" v-model="visible" @ok="handleOk()" @cancel="close" cancelText="取消" okText="确定" >
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="siteUserName"
                                    placeholder="请输入账号"
                                    class="inputs"
                                    autocomplete="new-siteUserName"
                                    @blur="blur('user')"
                                    ></el-input>
                                    <div class="erre" v-if='usererre'>账号不能为空</div>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="sitepwd"
                                    class="inputs"
                                    prefix-icon="iconfont icon-mima"
                                    @blur="blur('pwd')"
                                    ></el-input>
                                    <div class="erre" v-if='pwderre'>密码不能为空</div>
                            </a-modal>
                        </span>
                        <span slot="userName" slot-scope="text, record">
                                <a>{{record.userName}}</a><label class="yangshi">{{record.siteAccountType}}</label>
                        </span>
                        <span slot="action" slot-scope="text, record" >
                            <a-spin :spinning="zspinning"></a-spin>
                            <a-button type="primary" @click="DeleteSite(record.id)">删除</a-button>
                            <a-button type="primary">修改密码</a-button>
                            <a-button type="primary" @click="lookpwdbotton(record.siteName)">查看密码</a-button>
                            <a-modal title="查看密码" v-model="lookvisible" @ok="lookpwd" @cancel="close" cancelText="取消" okText="确定">
                                <label>为了您的账户安全，请输入您在开单王的登陆密码</label>
                                <a-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="lookpwdput"
                                    placeholder="请输入密码"
                                    class="inputs"
                                    autocomplete="new-lookpwdput"
                                    ></a-input>
                            </a-modal>
                            <a-modal title="查看密码" v-model="lookpwdvisible" @ok="lookpwdoks()">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="loolnameok"
                                    class="inputs"
                                    autocomplete="new-loolnameok"
                                    ></el-input>
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="lookpwdok"
                                    class="inputs"
                                    autocomplete="new-lookpwdok"
                                    ></el-input>
                            </a-modal>
                        </span>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane tab="已开通网站" key="2">
                    <allinter :item = 'item'></allinter>
                </a-tab-pane>
                <a-tab-pane tab="未开通网站" key="3">
                    <closeinter :item = 'item'></closeinter>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="4">
                    <rizhi></rizhi>
                </a-tab-pane>
                <a-tab-pane tab="向平台推荐网站" key="5">
                    <tuijian></tuijian>
                </a-tab-pane>
            </a-tabs>
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columnss = [
        {
            title: '权限',
            dataIndex: 'name',
            key: 'name',
             width: '18%',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '网页',
            dataIndex: 'inter',
            key: 'inter',
             width: '17%',
            scopedSlots: { customRender: 'inter' },
        },
        {
            title: '条件',
            key: 'tiaojian',
            dataIndex: 'tiaojian',
            width: '18%',
            scopedSlots: { customRender: 'tiaojian' },
        },
        {
            title: '账号情况',
            dataIndex: 'userName',
            width: '17%',
            key: 'userName',
            scopedSlots: { customRender: 'userName' },
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width:'30%'
        }
    ];

    const datas = [
        {
            key: '1',
            name: ['允许发布', '允许推送'],
            // inter: '/static/img/logoJXW.2d85d52.png',
            inter: '房天下',
            address: '',
            tiaojian: ['添加账号', '去注册'],
        },
        {
            key: '2',
            name: ['自动登录', '允许发布'],
            // inter: '/static/img/jiemian.f5e0338.jpg',
            inter: '58同城',
            address: '',
            tiaojian: ['添加账号', '去注册'],
        },

    ];

    import axios from 'axios';
    import qs from 'qs';
    import { encryptDes, decryptDes } from '../../des.js';
    import allinter from '../../mytables/allinter';
    import closeinter from '../../mytables/closeinter';
    import rizhi from '../../mytables/rizhi';
    import tuijian from '../../mytables/tuijian';

    export default {
        data() {
            return {
                usererre: false,
                pwderre: false,
                datas,
                columnss,
                siteUserName: '',
                sitepwd: '',
                lookpwdput:'',
                zspinning:false,
                loolnameok:'',
                lookpwdok:'',
                keyId: "12345645",
                bid: "s123",
                ret: [],
                byte: [],
                tokens: '',
                zhanspinning:false,
                despwd: '',
                looksitename:'',
                //房源类型 售 或 租
                houseType: '',
                //请求API的授权码 令牌  
                token: '',
                //请求API的服务域名
                url: '',
                //企业内部房源ID
                innerid: '',
                //房源详情页URL
                houseurl: '',
                // 房天下房源ID   
                houseid: '',
                //发布状态：1.已推广，2.未推广，5.房源违规
                flag: '',
                visible: false,
                lookvisible:false,
                lookpwdvisible:false,
                address: '',
                item:[],
                siteName:'',
                zhandiantu: [require('../../assets/logo/fang.png'),require('../../assets/logo/jingjiren.png')],
                siteCookie:'',
                siteAccountType:'',
                sitesusername:null,
            };
        },
        components:{
            allinter,
            rizhi,
            tuijian,
            closeinter,
        },
        mounted() {
            
            let sitepwd = this.sitepwd;
            let keyId = this.keyId;
            const ddd = keyId.toString();
            // console.log(ddd);
            // const KeyHex =cryptoJs.enc.utf8.parse(ddd);
            const userName1 = this.encryptDes('gracemae', '058523bb')
            const pwd1 = this.encryptDes('jiayu6248', '058523bb')

            this.GetSiteList();
            // this.GetSiteList58()
        },
        methods: {
            callback (key) {
            // console.log(key)
                this.GetSiteList();
            },
            blur(data) {
                if (data == "user" && this.siteUserName == '') {
                    this.usererre = true
                } else if (data == "user" && this.siteUserName != '') {
                    this.usererre = false
                }else if (data == "pwd" && this.sitepwd == '') {
                    this.pwderre = true
                } else if (data == "pwd" && this.sitepwd != '') {
                    this.pwderre = false
                }
            },
            ///获取站点列表
            async GetSiteList(){
                //var query = await this.$http.get(`${this.$config.api}/api/cms/sites/siteList?UserId=`+this.$store.userId)
                let update = JSON.parse(localStorage.getItem('update'));
                var query = await this.$http.get(`${this.$config.api}/api/cms/sites/siteList?userId=`+update.userId)
                 this.item = query.data.items
                 for(var i=0;i<this.item.length;i++){
                     this.item[i].name = ['允许发布', '允许推送']
                     this.item[i].key = ''+(i+1)+'';
                     this.item[i].tiaojian = ['添加账号', '去注册']
                     this.item[i].inter = this.zhandiantu[i]
                }
                // this.item = query.data.items;
                // this.item[0].name = ['允许发布', '允许推送'];
                // this.item[0].tiaojian = ['添加账号', '去注册'];
                // this.item[0].key = '1';
                // this.item[1].name = ['允许发布', '允许推送'];
                // this.item[1].tiaojian = ['添加账号', '去注册'];
                // this.item[1].key = '2';

            },
            ///房天下
            async handleOk() {
              
                if(this.sitesusername!=null){
                     this.zhanspinning=false;
                     this.$message.error("您已添加账号eee，请勿重复操作！");
                     return;
                }

                this.visible = false;
                this.zhanspinning=true
                if(this.siteUserName == ''){
                    this.usererre = true
                    return;
                }
                if(this.sitepwd == ''){
                    this.pwderre = true
                    return;
                }
                console.log(this.siteName)
                const that=this
                const cookes={username:this.siteUserName,userpwd:this.sitepwd}
                if(this.siteName=="58同城"){
                       $.ajax({
                           type: 'GET',
                           async:true,
                           url: 'http://47.108.24.104:8090/Authentic?data=' + JSON.stringify(cookes),
                           dataType: 'jsonp', //希望服务器返回json格式的数据
                           jsonp: "callback",
                           jsonpCallback: "successCallback",//回调方法
                           success: function (data) {
                               console.log("返回cookie:")
                               console.log(data)
                              if(data=="100"){
                                  that.siteAccountType="不可用"
                              }
                              else{
                                  that.siteAccountType="可用"
                                  that.siteCookie=data
                              }
                           }
                       });
                }
                
                setTimeout(function(){
                    let update = JSON.parse(localStorage.getItem('update'));
                    console.log(that.siteAccountType)
                     console.log(that.siteCookie)
                    const data = {
                        // userId: this.$store.userId,
                        userId:update.userId,
                        siteUserName: that.siteUserName,
                        sitePassword: that.sitepwd,
                        token:that.siteToken,
                        biaoshi:that.siteName,
                        siteCookie:that.siteCookie,
                        SiteAccountType:that.siteAccountType,
                    }
                        
                    try{
                            that.$http.post(`${that.$config.api}/api/cms/sites/modifyUser`,data).then(Response=>{
                                console.log("kkkkkk")
                                if(Response.data.code=="200")
                                {
                                    that.zhanspinning=false;
                                    that.$message.success('添加账号成功');
                                   
                                    that.GetSiteList();
                        
                                }
                                else{
                                    that.zhanspinning=false;
                                    that.$message.error(Response.data.msg);
                                   
                                }
                            });
                    }
                    catch(e){
                        console.log(e)
                            that.$message.success('系统错误，请重试');
                            
                            that.zhanspinning=false;
                    }
                    ///关闭添加账号model框时，清空input框数据
                        that.close()
              }, 12000)    
                            
            },
            ceshi(tag,hname,e) {
                this.siteName=hname;
                this.sitesusername=e;
                if(tag == '添加账号'){
                    this.visible = true;            
                }
                else{
                    if(hname=="房天下")
                    {
                        window.open('https://passport.fang.com/NewRegister.aspx?backurl=https://cq.fang.com/');
                    }
                    else if(hname=="58同城")
                    {
                        window.open('https://vip.anjuke.com');
                    }
                }
            },
            //删除房源
            async DeleteSite(sid){
               this.zspinning=true
                 await this.$http.get(`${this.$config.api}/api/cms/sites/`+sid+`/siteShow`).then(Response=>{
                         if(Response.data.code=="200"){
                              this.GetSiteList();
                              this.zspinning=false
                              this.$message.success('删除成功！！');
                         }
                          else{
                              this.zspinning=false
                              this.$message.warning(Response.data.msg);
                         }
                 })
            },
            lookpwdbotton(e){
              
                    this.looksitename=e
                    this.lookvisible=true;
            },
            //关闭添加账号、查看密码model框时，清空input框数据
            close(){
                this.lookpwdput = '';
                this.siteUserName = '';
                this.sitepwd = '';
                this.usererre = false
                this.pwderre = false
            },

            //查看密码
            async lookpwd()
            {
                 let update = JSON.parse(localStorage.getItem('update'));
                const data={
                     userid:update.userId,
                     password:this.lookpwdput,
                     siteName:this.looksitename,
                    
                };
              console.log("id:"+update.userId+"密码："+this.lookpwdput)
                try{
                        await this.$http.post(`${this.$config.api}/api/cms/acount/lookPwd`,data).then(Response=>{
                        console.log(Response)
                        if(Response.data.returnValue.code=="200")
                        {
                            this.loolnameok=Response.data.username;
                            this.lookpwdok=Response.data.userpwd;
                            this.lookvisible=false;
                            this.lookpwdvisible=true;
                        }
                        else{
                             this.$message.error(Response.data.returnValue.msg);
                        }
                })
                }
                catch(e)
                {
                    this.$message.warning('系统繁忙，请重试！！！');
                }
                //关闭查看密码model框时，清空input框数据
                this.lookpwdput = '';
            },
           lookpwdoks(){
               this.lookpwdvisible=false;
               this.loolnameok="";
               this.lookpwdok="";
           }
        },
    };
</script>
<style>
    /* .ant-table-tbody>tr>td {
        border: 1px solid rgb(224, 220, 220);
        text-align: center;
    }

    .ant-table-thead>tr:first-child>th {
        border: 1px solid rgb(224, 220, 220);
        text-align: center;
    } */
    .zhandiantishi {
        display: flex;
        align-items: center;
    }
    .filter-wraps1 {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .search_bds1 {
        background: #ffffdd;
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        /* border: 1px solid #ebedf0; */
    }

    .ts4 {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        background-color: white;
    }
    .inputs{
        margin-bottom: 20px;
    }
    .erre{
        margin-top: -18px;
        color: red;
    }
    .interimg{
      width:160px;
       height:65px;
    }
    .yangshi{
       color: orange;
       margin-left:20%;
    }
</style>