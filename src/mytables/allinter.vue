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
                           <img class="openinterimg" :src="record.inter"/>
                        </span>
                        <span slot="tiaojian" slot-scope="text, record">
                            <a-tag v-for="tag in record.tiaojian" @click="openceshi(tag,record.siteName)"
                                :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')" :key="tag">

                                {{tag.toUpperCase()}}
                            </a-tag>
                            <a-modal title="登录账号" v-model="openvisible" @ok="openhandleOk()">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="opensiteUserName"
                                    placeholder="请输入姓名"
                                    class="inputs"
                                    autocomplete="new-siteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="opensitepwd"
                                    class="inputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                        </span>
                        <span slot="userName" slot-scope="text, record">
                                <a>{{record.userName}}</a>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a-button type="primary" @click="openDeleteSite(record.id,record.siteName)">删除</a-button>
                            <a-button type="primary">修改密码</a-button>
                            <a-button type="primary" @click="openlookpwdbotton()">查看密码</a-button>
                            <a-modal title="查看密码" v-model="openlookvisible" @ok="openlookpwd(record.id,record.siteName)">
                                <label>为了您的账户安全，请输入您在开单王的登陆密码</label>
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="openlookpwdput"
                                    placeholder="请输入密码"
                                    class="inputs"
                                    autocomplete="new-openlookpwdput"
                                    ></el-input>
                            </a-modal>
                            <a-modal title="查看密码" v-model="openlookpwdvisible" @ok="openlookpwdoks()">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="openloolnameok"
                                    class="inputs"
                                    autocomplete="new-openloolnameok"
                                    ></el-input>
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="openlookpwdok"
                                    class="inputs"
                                    autocomplete="new-openlookpwdok"
                                    ></el-input>
                            </a-modal>
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
             dataIndex: 'action',
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
          opensiteUserName:'',
          opensitepwd:'',
          openlookpwdput:'',
          openloolnameok:'',
          openlookpwdok:'',
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
          openlookvisible:false,
          openlookpwdvisible:false,
          openaddress: '',
          siteitem:[],
          opensiteName:'',
       
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
               let update = JSON.parse(localStorage.getItem('update'));
               var query = await this.$http.get(`${this.$config.api}/api/cms/sites/openSite?UserId=`+update.userId)
                this.siteitem = query.data.items;
                this.siteitem[0].name = ['允许发布', '允许推送'];
                this.siteitem[0].tiaojian = ['添加账号', '去注册'];
                this.siteitem[0].key = '1';
                this.siteitem[1].name = ['允许发布', '允许推送'];
                this.siteitem[1].tiaojian = ['添加账号', '去注册'];
                this.siteitem[1].key = '2';

            },
            ///房天下
            async openhandleOk(e) {
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    siteUserName: this.opensiteUserName,
                    sitePassword: this.opensitepwd,
                    userName: this.opensiteUserName,
                    token:'aaa',
                    biaoshi:this.opensiteName,
                }
                
               try{
                     var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data).then(Response=>{
                        if(Response.status==200)
                        {
                            this.$message.success('添加账号成功');
                            this.visible = false;
                            this.GetOpenSiteList();
                
                        }
                    });
               }
               catch(e){
                  
                    this.$message.success('您已添加账号');
                     this.openvisible = false;
               }
            },
            //删除房源
            async openDeleteSite(sid,gname){
                 await this.$http.get(`${this.$config.api}/api/cms/sites/`+sid+`/siteShow?name=`+gname).then(Response=>{
                    if(Response.status==200) {
                         if(Response.data=="yes"){
                             //this.Deletesiteuser(id);
                        
                              this.GetOpenSiteList();
                              this.$message.success('删除成功！！');
                         }
                          else{
                              this.$message.success('您还没有添加网站的账号，请先添加！');
                         }

                           
                    }
                    else{
                        this.$message.success('删除错误，请重新删除！');
                    }   

                 })
            },
            lookpwdbotton(){
                    this.lookvisible=true;
            },
            openceshi(tag,hname) {
                console.log("23135213")
                this.opensiteName=hname;
                if(tag == '添加账号'){
                    this.openvisible = true;            
                }
                else{
                    if(hname=="房天下")
                    {
                        window.open('https://passport.fang.com/NewRegister.aspx?backurl=https://cq.fang.com/');
                    }
                    else if(hname=="58同城")
                    {
                        window.open('https://passport.58.com/reg/?path=https%3A//cq.58.com/%3Futm_source%3Dmarket%26spm%3Du-2d2yxv86y3v43nkddh1.BDPCPZ_BT&utm_source=market&spm=u-2d2yxv86y3v43nkddh1.BDPCPZ_BT&PGTID=0d100000-0002-567b-16c7-57dafcb3c605&ClickID=2');
                    }
                }
            },
            openlookpwdbotton(){
                    this.openlookvisible=true;
            },
             async openlookpwd(pid,lsitename)
            {
                const data={
                     userid:update.userid,
                     password:this.openlookpwdput,
                     lookpid:pid,
                     looksitename:lsitename,
                };
              console.log("id:"+update.userid+"密码："+this.lookpwdput)
                try{
                        await this.$http.post(`${this.$config.api}/api/cms/acount/lookPwd`,data).then(Response=>{
                        console.log(Response)
                        if(Response.status==200)
                        {
                            this.openloolnameok=Response.data.username;
                            this.openlookpwdok=Response.data.userpwd;
                            this.openlookvisible=false;
                            this.openlookpwdvisible=true;
                            
                        }
                })
                }
                catch(e)
                {
                    this.$message.success('密码输入错误');
                }
            },
             openlookpwdoks(){
               this.openlookpwdvisible=false;
           }
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