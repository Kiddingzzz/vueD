<template>
     <div style="width:100%">
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
                      <img class="wangyeimg" :src="record.inter"> 
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
             <span slot="zhanghao" slot-scope="text, record">
                     <a>{{record.zhanghao}}</a>
              </span>
             <span slot="action" slot-scope="text, record">
                  <a-button type="primary">删除</a-button>
                  <a-button type="primary" >修改密码</a-button>
                  <a-button type="primary" >登陆后台</a-button>
                  <a-button type="primary" >查看密码</a-button>
             </span>
         </a-table>    
     </div>
</template>
<script>
     const columnss = [
    {
      title: '权限',
      dataIndex: 'name',
      key: 'name',
      width:'25%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '网页',
      dataIndex: 'inter',
      key: 'inter',
      width:'17%',
      scopedSlots: { customRender: 'inter' },
    },
    {
      title: '条件',
      key: 'tiaojian',
      dataIndex: 'tiaojian',
      width:'17%',
      scopedSlots: { customRender: 'tiaojian' },
    },
    {
      title: '账号情况',
      dataIndex: 'zhanghao',
      width:'17%',
      key: 'zhanghao',
      scopedSlots: { customRender: 'zhanghao' },
    },
   
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width:'24%'
    },
  ];

  const datas = [
    {
      key: '1',
      name: ['允许发布','允许推送'],
      inter:'/static/img/logoJXW.2d85d52.png',
      zhanghao: '534653465',
      tiaojian: ['添加账号', '去注册'],
    },
    {
      key: '2',
      name:['自动登录','允许发布'],
      inter:'/static/img/jiemian.f5e0338.jpg',
      zhanghao: '524687',
      tiaojian: ['添加账号', '去注册'],
    },
    
  ];
   

  export default {
    name: 'allinter',
    data() {
      return {
        datas,
        columnss,
       
      };
    },
 
    methods: {
       
      callback(key) {
        console.log(key);
      },
      ceshi(){
          console.log("3333")
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
</style>