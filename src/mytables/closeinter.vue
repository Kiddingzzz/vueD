<template>
     <div style="width:100%">
         <a-table  :columns="column" :dataSource="closesiteitem">
                        <span slot="name" slot-scope="name">
                            <a-tag v-for="tag in name" :key="tag"
                              :color="tag==='loser' ? 'volcano' : (tag.toUpperCase()!='允许发布'? 'rosybrown' : 'skyblue')"
                            >
                                {{tag.toUpperCase()}}
                            </a-tag>
                        </span>
                        <span slot="inter" slot-scope="text, record" >
                           <img class="closeinterimg" :src="record.inter"/>
                        </span>
                        <span slot="tiaojian" slot-scope="text, record">
                            <a-tag v-for="tag in record.tiaojian" @click="openceshi(tag,record.siteName)"
                                :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')" :key="tag">

                                {{tag.toUpperCase()}}
                            </a-tag>
                            <a-modal title="登录账号" v-model="closevisible" @ok="closehandleOk('房天下')">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="closesiteUserName"
                                    placeholder="请输入姓名"
                                    class="closeinputs"
                                    autocomplete="new-closesiteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="closesitepwd"
                                    class="closeinputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                            <a-modal title="登录账号" v-model="closevisible" @ok="closehandle58">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="closesiteUserName"
                                    placeholder="请输入姓名"
                                    class="closeinputs"
                                    autocomplete="new-closesiteUserName"
                                    ></el-input>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="closesitepwd"
                                    class="closeinputs"
                                    prefix-icon="iconfont icon-mima"
                                    ></el-input>
                            </a-modal>
                        </span>
                        <span slot="userName" slot-scope="text, record">
                                <a>{{record.userName}}</a>
                        </span>
                        <span slot="action" slot-scope="text, record" >
                            <a>暂无操作</a>
                           
                        </span>
                    </a-table>   
     </div>
</template>
<script>
     const column = [
        {
            title: '权限',
            dataIndex: 'name',
            key: 'name',
             width: '22%',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '网页',
            dataIndex: 'inter',
            key: 'inter',
             width: '23%',
            scopedSlots: { customRender: 'inter' },
        },
        {
            title: '条件',
            key: 'tiaojian',
            dataIndex: 'tiaojian',
            width: '23%',
            scopedSlots: { customRender: 'tiaojian' },
        },
        {
            title: '账号情况',
            dataIndex: 'userName',
            width: '22%',
            key: 'userName',
            scopedSlots: { customRender: 'userName' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            width:'10%'
        }
  ];
  export default {
    data() {
      return {
          column,
          closesiteUserName: '',
          closesitepwd: '',
          closekeyId: "12345645",
         closebid: "s123",
          closeret: [],
         closebyte: [],
         closetokens: '',
         closedespwd: '',
          //房源类型 售 或 租
          closehouseType: '',
          //请求API的授权码 令牌  
          closetoken: '',
          //请求API的服务域名
           closeurl: '',
          //企业内部房源ID
          closeinnerid: '',
          //房源详情页URL
          closehouseurl: '',
          // 房天下房源ID   
          closehouseid: '',
          //发布状态：1.已推广，2.未推广，5.房源违规
         closeflag: '',
          closevisible: false,
          closeaddress: '',
          closesiteitem:[],
          intername:'',
       
      };
    },
   mounted() {
      let pwd = this.pwd;
      let closekeyId = this.closekeyId;
      const ddd = closekeyId.toString();
      // console.log(ddd);
     // const KeyHex =cryptoJs.enc.utf8.parse(ddd);
      const userName1 = this.encryptDes('gracemae', '058523bb')
       const pwd1 = this.encryptDes('jiayu6248', '058523bb')

      this.GetCloseSiteList();
   },
    methods: {
        ///获取站点列表
            async GetCloseSiteList(){
                //var query = await this.$http.get(`${this.$config.api}/api/cms/sites/closeSite?UserId=`+this.$store.userId)
                let update = JSON.parse(localStorage.getItem('update'));
                var query = await this.$http.get(`${this.$config.api}/api/cms/sites/closeSite?UserId=`+update.userId)
                
                this.closesiteitem = query.data.items; 
                for(var i=0;i<this.closesiteitem.length;i++){
                     this.closesiteitem[i].name = ['允许发布', '允许推送']
                     this.closesiteitem[i].key = ''+(i+1)+'';
                     this.closesiteitem[i].tiaojian = ['添加账号', '去注册']
                }
                // this.closesiteitem[0].name = ['允许发布', '允许推送'];
                // this.closesiteitem[0].tiaojian = ['添加账号', '去注册'];
                // this.closesiteitem[0].key = '1';
                // this.closesiteitem[1].name = ['允许发布', '允许推送'];
                // this.closesiteitem[1].tiaojian = ['添加账号', '去注册'];
                // this.closesiteitem[1].key = '2';
            },
            ///58tongcheng
            async closehandle58(e) {
                let update = JSON.parse(localStorage.getItem('update'));
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    closesiteUserName: this.closesiteUserName,
                    sitePassword: this.closesitepwd,
                    userName: this.closesiteUserName,
                    opentoken:'aaa',
                    biaoshi:'58同城'
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetCloseSiteList();
                this.closevisible = false;
            },
            ///房天下
            async closehandleOk(e) {
                let update = JSON.parse(localStorage.getItem('update'));
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    closesiteUserName: this.closesiteUserName,
                    sitePassword: this.closesitepwd,
                    userName: this.closesiteUserName,
                    opentoken:'aaa',
                    biaoshi: this.intername,
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetCloseSiteList();
                this.closevisible = false;
            },
            openceshi(tag,name) {
                this.intername=name;
                if(tag == '添加账号'){
                    this.closevisible = true;            
                }
                else{
                }
            },
            //删除站点账号
          
          
     
    },
  };
</script>
<style  lang="less">
   
    .closeinputs{
        margin-bottom: 20px;
    }
    .closeinterimg{
      width:160px;
       height:65px;
    }
</style>