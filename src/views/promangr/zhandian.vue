<template>
    <div class="ts4">
        <div class="filter-wraps1" style="padding: 15px 15px 0px 15px;">
            <div class="search_bds1" style="height:180px;">
                <div>
                    贴心提示:
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
        <div style="padding: 15px 15px 0px 15px;">
            <a-tabs defaultActiveKey="1" @change="callback" style=" border-bottom: none;">
                <a-tab-pane tab="全部网站" key="1">
                    <a-table :columns="columnss" :dataSource="item">
                        <span slot="name" slot-scope="name">
                            <a-tag v-for="tag in name" :key="tag"
                              :color="tag==='loser' ? 'volcano' : (tag.toUpperCase()!='允许发布'? 'rosybrown' : 'skyblue')"
                            >
                                {{tag.toUpperCase()}}
                            </a-tag>
                        </span>
                        <span slot="inter" slot-scope="text, record" >
                           <img class="logo" :src="record.inter"/>
                        </span>
                        <span slot="tiaojian" slot-scope="tiaojian">
                            <a-tag v-for="tag in tiaojian" @click="ceshi(tag)"
                                :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')" :key="tag">

                                {{tag.toUpperCase()}}
                            </a-tag>
                            <a-modal title="登录账号" v-model="visible" @ok="handleOk('房天下')">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="siteUserName"
                                    placeholder="请输入姓名"
                                    class="inputs"
                                    autocomplete="new-siteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="sitepwd"
                                    class="inputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                            <a-modal title="登录账号" v-model="visible" @ok="handle58">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="siteUserName"
                                    placeholder="请输入姓名"
                                    class="inputs"
                                    autocomplete="new-siteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="sitepwd"
                                    class="inputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                        </span>
                        <span slot="userName" slot-scope="text, record">
                                <a>{{record.userName}}</a>
                        </span>
                        <span slot="action">
                            <a-button type="primary">删除</a-button>
                            <a-button type="primary">修改密码</a-button>
                            <a-button type="primary">登陆后台</a-button>
                            <a-button type="primary">查看密码</a-button>
                        </span>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane tab="已开通网站" key="2">
                    <allinter></allinter>
                </a-tab-pane>
                <a-tab-pane tab="未开通网站" key="3">
                    <allinter></allinter>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="4">
                    <rizhi></rizhi>
                </a-tab-pane>
                <a-tab-pane tab="向平台推荐网站" key="5">
                    <tuijian></tuijian>
                </a-tab-pane>
            </a-tabs>
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
            width: '19%',
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
            width: '18%',
            key: 'userName',
            scopedSlots: { customRender: 'userName' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        }
    ];

    const datas = [
        {
            key: '1',
            name: ['允许发布', '允许推送'],
            inter: '/static/img/logoJXW.2d85d52.png',
            address: '',
            tiaojian: ['添加账号', '去注册'],
        },
        {
            key: '2',
            name: ['自动登录', '允许发布'],
            inter: '/static/img/jiemian.f5e0338.jpg',
            address: '',
            tiaojian: ['添加账号', '去注册'],
        },

    ];

    import axios from 'axios';
    import qs from 'qs';
    import { encryptDes, decryptDes } from '../../des.js';
    import allinter from '../../mytables/allinter';
    import rizhi from '../../mytables/rizhi';
    import tuijian from '../../mytables/tuijian';

    export default {
        data() {
            return {
                datas,
                columnss,
                siteUserName: '',
                sitepwd: '',
                keyId: "12345645",
                bid: "s123",
                ret: [],
                byte: [],
                tokens: '',
                despwd: '',
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
                address: '',
                item:[],
            };
        },
        components:{
            allinter,
            rizhi,
            tuijian
        },
        mounted() {

            let pwd = this.pwd;
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
            ///获取站点列表
            async GetSiteList(){
                console.log(this.$store.userId)
                var query = await this.$http.get(`${this.$config.api}/api/cms/sites/siteList?UserId=`+this.$store.userId)
                this.item = query.data.items;
                this.item[0].name = ['允许发布', '允许推送'];
                this.item[0].tiaojian = ['添加账号', '去注册'];
                this.item[0].key = '1';
                this.item[1].name = ['允许发布', '允许推送'];
                this.item[1].tiaojian = ['添加账号', '去注册'];
                this.item[1].key = '2';

                console.log(JSON.stringify(this.item))
            },
            ///58tongcheng
            async handle58(e) {
                console.log(e)
                const data = {
                    // userId: this.$store.userId,
                    userId:this.$store.userId,
                    siteUserName: this.siteUserName,
                    sitePassword: this.sitepwd,
                    userName: this.siteUserName,
                    token:'aaa',
                    biaoshi:'58同城'
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetSiteList();
                this.visible = false;
            },
            ///房天下
            async handleOk(e) {
                console.log(e)
                const data = {
                    // userId: this.$store.userId,
                    userId:this.$store.userId,
                    siteUserName: this.siteUserName,
                    sitePassword: this.sitepwd,
                    userName: this.siteUserName,
                    token:'aaa',
                    biaoshi:'房天下'
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetSiteList();
                this.visible = false;
            },
            
            callback(key) {
                console.log(key);
            },
            ceshi(tag) {
                if(tag == '添加账号'){
                    console.log(tag);                  
                    this.visible = true;            
                }
                else{
                    console.log(tag)
                }
            },


            //删除房源
            async pdetelezhusu() {
                const res = $http.post(url + '/agent/house/delete?token=' + token + '&Content-Type=' + 'application/json' + '&keyId=' + keyId + '&FangRequestID=' + 'fang123' + '&houseType=' + houseType + '&houseid=' + houseid);
                if (res.code == 1 || res.code == "1") {
                    Console.log("删除成功")
                }
            },
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
</style>