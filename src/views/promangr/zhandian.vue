<template>
       <div class="ts">
            <div class="filter-wraps" style="padding: 15px 15px 0px 15px;">
                <div class="search_bds" style="height:180px;">
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
                <a-tabs defaultActiveKey="1" @change="callback">
                    <a-tab-pane tab="全部网站" key="1"> 
                            <a-table :columns="columnss" :dataSource="datas">
                                    <span slot="name" slot-scope="name">
                                            <a-tag
                                              v-for="tag in name"
                                              :key="tag"
                                            >
                                              {{tag.toUpperCase()}}
                                            </a-tag>
                                    </span>
                                    <span slot="inter" slot-scope="text, record">
                                            <img class="logo" :src="record.inter"> 
                                    </span>
                                    <span slot="tiaojian" slot-scope="tiaojian">
                                      <a-tag
                                        v-for="tag in tiaojian"
                                        @click="ceshi()"
                                        :color="tag==='loser' ? 'volcano' : (tag.length > 3? 'geekblue' : 'green')"
                                        :key="tag"
                                      >
                                       
                                       {{tag.toUpperCase()}}
                                      </a-tag>
                                    </span>
                                    <span slot="action" slot-scope="text, record">
                                            <a-button type="primary">删除</a-button>
                                            <a-button type="primary" >修改密码</a-button>
                                            <a-button type="primary" >登陆后台</a-button>
                                            <a-button type="primary" >查看密码</a-button>
                                    </span>
                            </a-table>     
                    </a-tab-pane>
                    <a-tab-pane tab="已开通网站" key="2">
                    </a-tab-pane>
                    <a-tab-pane tab="未开通网站" key="3">Content of Tab Pane 3</a-tab-pane>
                    <a-tab-pane tab="操作日志" key="4">Content of Tab Pane 3</a-tab-pane>
                    <a-tab-pane tab="向平台推荐网站" key="5">Content of Tab Pane 3</a-tab-pane>
                  </a-tabs>
             </div>
       </div>
</template>
<script>
import cryptoJs from 'crypto-js';

     const columnss = [
    {
        title: '权限',
      dataIndex: 'name',
      key: 'name',
      width:'10%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '网页',
      dataIndex: 'inter',
      key: 'inter',
      width:'25%',
      scopedSlots: { customRender: 'inter' },
    },
    {
      title: '条件',
      key: 'tiaojian',
      dataIndex: 'tiaojian',
      width:'15%',
      scopedSlots: { customRender: 'tiaojian' },
    },
    {
      title: '账号情况',
      dataIndex: 'address',
      width:'25%',
      key: 'address',
    },
   
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];

  const datas = [
    {
      key: '1',
      name: ['允许发布','允许推送'],
      inter:'/static/img/logoJXW.2d85d52.png',
      address: '534653465',
      tiaojian: ['添加账号', '去注册'],
    },
    {
      key: '2',
      name:['自动登录','允许发布'],
      inter:'/static/img/jiemian.f5e0338.jpg',
      address: '524687',
      tiaojian: ['添加账号', '去注册'],
    },
    
  ];
  export default {
    data() {
      return {
        datas,
        columnss,
        userName:"admin",
        pwd:"abc123",
        keyId:"12345645",
        bid:"s123",
        ret:[],
        byte:[],
        despwd:'',
        houseType:'',
      };
    },
    mounted() {
        
            let pwd = this.pwd;
            let keyId = this.keyId;
            const ddd=keyId.toString();
            console.log(ddd);
            const KeyHex =cryptoJs.enc.utf8.parse(ddd);
           

           const encrypt = CryptoJS.AES.encrypt(message, KeyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
                }).toString();
                console.log(encrypt);
    },
    methods: {
       
      callback(key) {
        console.log(key);
      },
      ceshi(){
          console.log("3333")
      },
     
      async gettoken(){

           //获取token
         const res=await $http.get('https://openapi.fang.com/unity/authenticate?userName='+'admin'+'&pwd='+'adfaF'+'&keyId='+'123456'+'bid='+'s123');
         if(res.code==1||res.code=="1")
         {
            console.log("令牌获取成功");
             const token=res.token;
             const url=res.url;
             const houselist= await $http.post(''+url+'/agent/house/input?token='+token+'&keyId='+keyId+'&FangRequestID='+'seaname_465436'+'&houseType='+'Save')
             if(houselist.code==1||houselist.code=="1")
             {
                 this.houseType=houselist.returnmsgs.houseType;
                 console.log("操作成功");
             }
             else   
             {
                console.log("操作失败");
             }

         }
         else{
            console.log("令牌获取失败")
         }

      },

    },
  };
</script>
<style>
    .ant-table-tbody>tr>td{
          border:1px  solid rgb(224, 220, 220);
          text-align: center;
    }
    .ant-table-thead > tr:first-child > th
    {
        border:1px  solid rgb(224, 220, 220);
        text-align: center;
    }
   .filter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }
     .search_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        border: 1px solid #ebedf0;
    }
   .ts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        background-color: white;
    }
</style>