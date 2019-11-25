<template>
     <div style="width:100%">
         <a-table :columns="columnss" :dataSource="datas">
               <span slot="inter" slot-scope="res,record">
                     <img class="wangyeimg" :src="record.inter"> 
               </span>
               <span slot="acctionkey" slot-scope="acctionkey, record">
                      <a-checkbox ></a-checkbox>
                      <label class="organlabel">{{record.acctionkey[0]}}</label>
                      <label class="organlabel">{{record.acctionkey[1]}}</label>

               </span>
               <span slot="leibie"   slot-scope="leibie">
                     <a-checkbox
                            v-for="tag in leibie"
                         
                       :key="tag"
                        >
                                       
                     {{tag.toUpperCase()}}
                  </a-checkbox>
                     
             </span>
            <span slot="kumansing" slot-scope="text, record">
                  <a-select default-value="2">
                       <a-select-option value="1">
                         不发送  
                      </a-select-option>
                      <a-select-option value="2">
                        删除旧房源再发送
                      </a-select-option>
                   </a-select>
             </span>
             <span slot="houschongfu" slot-scope="text, record">
                    <a-select default-value="2">
                       <a-select-option value="1">
                         不发送  
                      </a-select-option>
                      <a-select-option value="2">
                        先删除后发送
                      </a-select-option>
                   </a-select>
             </span>
             <span slot="tuiaction" slot-scope="text, record">
                  <a-select default-value="2">
                       <a-select-option value="1">
                         上架  
                      </a-select-option>
                      <a-select-option value="2">
                        待上架
                      </a-select-option>
                   </a-select>
             </span>
              <span slot="caozuo" slot-scope="text, record">
                  <a-button type="primary" @click="fabuok(record)">确认发布</a-button>
             </span>
         </a-table>    
     </div>
</template>
<script>
     const columnss = [
    {
      title: '网站',
      dataIndex: 'inter',
      key: 'inter',
      width:'10%',
      scopedSlots: { customRender: 'inter' },
    },
    {
      title: '账号状态',
      dataIndex: 'acctionkey',
      key: 'acctionkey',
      width:'25%',
      scopedSlots: { customRender: 'acctionkey' },
    },
    {
      title: '类别',
      key: 'leibie',
      dataIndex: 'leibie',
      width:'15%',
      scopedSlots: { customRender: 'leibie' },
    },
    {
      title: '库存满时发送处理',
      key: 'kumansing',
      scopedSlots: { customRender: 'kumansing' },
    },
     {
      title: '房源重复发送处理',
      key: 'houschongfu',
      scopedSlots: { customRender: 'houschongfu' },
    },
     {
      title: '推送设置',
      key: 'tuiaction',
      scopedSlots: { customRender: 'tuiaction' },
    },
     {
      title: '操作',
      key: 'caozuo',
      scopedSlots: { customRender: 'caozuo' },
    },
  ];

  const datas = [
    {
       key:'1',
       inter:'/static/img/logoJXW.2d85d52.png',
       acctionkey:['15624687','可用'],
       leibie:['第一个','第二个'],

    },
    {
       key:'2',
       inter:'/static/img/logoJXW.2d85d52.png',
       acctionkey:['451245','不可用'],
       leibie:['第一个','第二个'],
    },
    
  ];
   

  export default {
    data() {
      return {
        datas,
        columnss,
       
      };
    },
    mounted() {
        
    },
    methods: {
       
      callback(key) {
        console.log(key);
      },
      fabuok(){
        console.log("wefaedadsa")
      }
    },
  };
</script>
<style  lang="less">
    .ant-table-tbody>tr>td{  
        text-align: center;
    }
    .ant-table-thead > tr:first-child > th
    {
        text-align: center;
    }
    .wangyeimg{
      width: 200px;
      height: 70px;
    }
    .organlabel{
        color:orange;
    }
</style>