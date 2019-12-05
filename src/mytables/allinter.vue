<template>
     <div style="max-width:100%">
         <a-table  :columns="columns" :dataSource="siteitem">
                        <span slot="name" slot-scope="name">
                            <a-tag v-for="tag in name" :key="tag"
                              :color="tag==='loser' ? 'volcano' : (tag.toUpperCase()!='允许发布'? 'rosybrown' : 'skyblue')"
                            >
                                {{tag.toUpperCase()}}
                            </a-tag>
                        </span>
                        <span slot="inter" slot-scope="text, record" >
                           <img class="openinterimg"" :src="record.inter"/>
                        </span>
                        <span slot="tiaojian" slot-scope="tiaojian">
                            <a-tag v-for="tag in tiaojian" @click="openceshi(tag)"
                                :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')" :key="tag">

                                {{tag.toUpperCase()}}
                            </a-tag>
                            <a-modal title="登录账号" v-model="openvisible" @ok="openhandleOk('房天下')">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="opensiteUserName"
                                    placeholder="请输入姓名"
                                    class="openinputs"
                                    autocomplete="new-opensiteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="opensitepwd"
                                    class="openinputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                            <a-modal title="登录账号" v-model="openvisible" @ok="openhandle58">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="opensiteUserName"
                                    placeholder="请输入姓名"
                                    class="openinputs"
                                    autocomplete="new-opensiteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="opensitepwd"
                                    class="openinputs"
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
     </div>
</template>
<script>
     const columns = [
        {
            title: '权限',
            dataIndex: 'name',
            key: 'name',
             width: '17%',
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
            width: '17%',
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
            scopedSlots: { customRender: 'action' },
            width:'32%'
        }
  ];
  export default {
    data() {
      return {
          columns,
          opensiteUserName: '',
          opensitepwd: '',
          openkeyId: "12345645",
          openbid: "s123",
          openret: [],
          openbyte: [],
          opentokens: '',
          opendespwd: '',
          //房源类型 售 或 租
          houseType: '',
          //请求API的授权码 令牌  
          opentoken: '',
          //请求API的服务域名
           openurl: '',
          //企业内部房源ID
          openinnerid: '',
          //房源详情页URL
          openhouseurl: '',
          // 房天下房源ID   
          openhouseid: '',
          //发布状态：1.已推广，2.未推广，5.房源违规
          openflag: '',
          openvisible: false,
          openaddress: '',
          siteitem:[],
       
      };
    },
   mounted() {
      let pwd = this.pwd;
      let openkeyId = this.openkeyId;
      const ddd = openkeyId.toString();
      // console.log(ddd);
     // const KeyHex =cryptoJs.enc.utf8.parse(ddd);
      const userName1 = this.encryptDes('gracemae', '058523bb')
       const pwd1 = this.encryptDes('jiayu6248', '058523bb')

      this.GetOpenSiteList();
   },
    methods: {
        ///获取站点列表
            async GetOpenSiteList(){
               // var query = await this.$http.get(`${this.$config.api}/api/cms/sites/openSite?UserId=`+this.$store.userId)
               var query = await this.$http.get(`${this.$config.api}/api/cms/sites/openSite?UserId=`+update.userId)
                this.siteitem = query.data.items;
                this.siteitem[0].name = ['允许发布', '允许推送'];
                this.siteitem[0].tiaojian = ['添加账号', '去注册'];
                this.siteitem[0].key = '1';
                this.siteitem[1].name = ['允许发布', '允许推送'];
                this.siteitem[1].tiaojian = ['添加账号', '去注册'];
                this.siteitem[1].key = '2';

            },
            ///58tongcheng
            async openhandle58(e) {
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    opensiteUserName: this.opensiteUserName,
                    sitePassword: this.opensitepwd,
                    userName: this.opensiteUserName,
                    opentoken:'aaa',
                    biaoshi:'58同城'
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetOpenSiteList();
                this.openvisible = false;
            },
            ///房天下
            async openhandleOk(e) {
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    opensiteUserName: this.opensiteUserName,
                    sitePassword: this.opensitepwd,
                    userName: this.opensiteUserName,
                    opentoken:'aaa',
                    biaoshi:'房天下'
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetOpenSiteList();
                this.openvisible = false;
            },
            openceshi(tag) {
                if(tag == '添加账号'){
                    this.openvisible = true;            
                }
                else{
                }
            },
     
    },
  };
</script>
<style  lang="less">
    // .ant-table-tbody>tr>td{  
    //       text-align: center;
    // }
    // .ant-table-thead > tr:first-child > th
    // {
    //     text-align: center;
    // }
    .wangyeimg{
      width: 200px;
      height: 70px;
    }
      .openinputs{
        margin-bottom: 20px;
    }
    .openinterimg{
      width:160px;
       height:65px;
    }
</style>