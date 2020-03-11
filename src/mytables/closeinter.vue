<template>
     <div style="width:100%">
         <a-table  :columns="column" :dataSource="closesiteitem" :customRow="handleClickRow">
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
                            <a-modal title="登录账号" v-model="closevisible" @ok="closehandleOk(record.key,'房天下')" @cancel="close" okText='确定' cancelText='取消'>
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="closesiteUserName"
                                    placeholder="请输入账号"
                                    class="closeinputs"
                                    autocomplete="new-closesiteUserName"
                                    @blur="blur('user')"
                                    ></el-input>
                                    <div class="erre" v-if='usererre'>账号不能为空</div>
                                    <el-input
                                    type="password"
                                    autocomplete="new-password"
                                    placeholder="请输入密码"
                                    v-model="closesitepwd"
                                    class="closeinputs"
                                    prefix-icon="iconfont icon-mima"
                                    @blur="blur('pwd')"
                                    ></el-input>
                                    <div class="erre" v-if='pwderre'>密码不能为空</div>
                            </a-modal>
                            <a-modal title="登录账号" v-model="closevisible" @ok="closehandle58(record.siteName)">
                                <el-input
                                    prefix-icon="iconfont icon-User"
                                    v-model="closesiteUserName"
                                    placeholder="请输入账号"
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
    // 接收站点父组件传过来的值
    props:{
        item: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            usererre: false,
            pwderre: false,
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
            index: '',
            colsesiteAccountType:'',
            colsesiteCookie:'',
            
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
        this.closesiteitem = this.item;
        this.GetCloseSiteList();
    },
     watch:{
        item:{
            handler(newValue,oldValue){
                //console.log('发生变化'+JSON.stringify(newValue))
                this.closesiteitem = newValue;
                this.closesiteitem = this.closesiteitem.filter(function (item) {
                    return item.userName == undefined
                });
            },
            deep:true
        }
    },
    methods: {
        handleClickRow(record, index){
            return {
                on: {
                    click: () => {
                        // console.log('序号索引index' + index)
                        this.index = index
                    }
                }
            }
        },
        ///获取站点列表
         GetCloseSiteList(){
            //筛选已开通网站
            this.closesiteitem = this.closesiteitem.filter(function (item) {
                return item.userName == undefined
            });
            for(let i=0;i<this.closesiteitem.length;i++){
                this.closesiteitem[i].name = ['允许发布', '允许推送'];
                this.closesiteitem[i].tiaojian = ['添加账号', '去注册'];
                this.closesiteitem[i].key = ''+(i+1)+'';
            }
        },
        blur(data) {
            if (data == "user" && this.closesiteUserName == '') {
                this.usererre = true
            } else if (data == "user" && this.closesiteUserName != '') {
                this.usererre = false
            }else if (data == "pwd" && this.closesitepwd == '') {
                this.pwderre = true
            } else if (data == "pwd" && this.closesitepwd != '') {
                this.pwderre = false
            }
        },    
            
            async closehandle58(e) {
                 const that=this
                const cookes={username:this.closesiteUserName,userpwd:this.closesitepwd}
                if(this.siteName=="58同城"){
                       $.ajax({
                           type: 'GET',
                           async:true,
                           url: 'http://47.108.24.104:8084/get_user?data=' + JSON.stringify(cookes),
                           dataType: 'jsonp', //希望服务器返回json格式的数据
                           jsonp: "callback",
                           jsonpCallback: "successCallback",//回调方法
                           success: function (data) {
                               console.log("返回cookie:")
                               console.log(data)
                              if(data=="100"){
                                  that.colsesiteAccountType="不可用"
                              }
                              else{
                                  that.colsesiteAccountType="可用"
                                  that.colsesiteCookie=data
                              }
                           }
                       });
                }
                let update = JSON.parse(localStorage.getItem('update'));
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    siteUserName: this.closesiteUserName,
                    sitePassword: this.closesitepwd,
                    token:'aaa',
                    biaoshi:e
                }
                
                var query = await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data);
                this.GetCloseSiteList();
                this.closevisible = false;
            },
            ///房天下
            async closehandleOk(index,e) {
                if(this.closesiteUserName == ''){
                    this.usererre = true
                    return;
                }
                if(this.closesitepwd == ''){
                    this.pwderre = true
                    return;
                }
                let update = JSON.parse(localStorage.getItem('update'));
                const data = {
                    // userId: this.$store.userId,
                    userId:update.userId,
                    siteUserName: this.closesiteUserName,
                    sitePassword: this.closesitepwd,
                    opentoken:'aaa',
                    biaoshi: this.intername,
                }
                 try{
                      await this.$http.post(`${this.$config.api}/api/cms/sites/modifyUser`,data).then(Response=>{
                        if(Response.status==200)
                        {
                            this.$message.success('添加账号成功');

                            this.closesiteitem.splice(this.index,1)
                            this.closevisible = false;
                            // this.GetCloseSiteList(); 
                        }
                      });
               }
               catch(e){
                   console.log(e)
                    this.$message.success('您已添加账号');
                    this.closevisible = false;
               }
               ///关闭添加账号model框时，清空input框数据
               this.close()
                
            },
            openceshi(tag,name) {
                this.intername=name;
                if(tag == '添加账号'){
                    this.closevisible = true;            
                }
                else{
                    if(name=="房天下")
                    {
                        window.open('https://passport.fang.com/NewRegister.aspx?backurl=https://cq.fang.com/');
                    }
                    else if(name=="58同城")
                    {
                        window.open('https://vip.anjuke.com');
                    }
                }
            },
            //关闭添加账号、查看密码model框时，清空input框数据
            close(){
                this.closesiteUserName = '';
                this.closesitepwd = '';
                this.usererre = false
                this.pwderre = false
            },
          
          
     
    },
  };
</script>
<style  lang="less">
   .erre{
        margin-top: -18px;
        color: red;
    }
    .closeinputs{
        margin-bottom: 20px;
    }
    .closeinterimg{
      width:160px;
     height:65px;
    }
</style>