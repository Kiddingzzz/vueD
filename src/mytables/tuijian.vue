<template>
  <div  class="heardbox">
        <a-tabs  type="card">
           <a-tab-pane tab="填写推荐" key="1">
               <div class="rowbox" >
                    向我们推荐您需要的发布或采集网站：<label class="latitle">(只要符合要求的网站，我们会在近期给您加到网站列表里面) </label>
               </div>
               <div class="rowbox">
                    <a-radio-group :options="tiles" :defaultValue="value1"  />
               </div>
               <div class="rowbox">
                        <label for="">网站名称：</label>
                        <a-input  class="putbox" placeholder="" />
               </div>
               <div class="rowbox">
                    <label for="">网站地址：</label>
                    <a-input  class="putbox" placeholder="" />
               </div>
               <div class="rowbox">
                  <label for="">网站账号：</label>
                  <a-input  class="putbox" placeholder="" />
               </div>
               <div class="rowbox">
                   <label for="">网站密码：</label>
                   <a-input  class="putbox" placeholder="" />
               </div> 
               <div class="rowbox">
                   <label for="">补充说明：</label>
                   <a-input  class="putbox" placeholder="" />
               </div>
               <div>

               </div>
           </a-tab-pane>
           <a-tab-pane tab="历史推荐" key="2">
               <a-table :columns="columns" :dataSource="data">
                   <!-- <span slot="ation" slot-scope="text, record">
                        <a href="javascript:;" @click="onDelete(record.key)">删除</a>
                        <a href="javascript:;" @click="onfabu(record.key)" >未发布</a>
                         </span> -->
                </a-table>
           </a-tab-pane>
        </a-tabs>
  </div>
</template>
 <script>
    const tiles=['发布','采集'];
    const columns = [
        {
            title: '网站名称',
            dataIndex: 'name',
        },
        {
            title: '网站地址',
            dataIndex: 'url',
        },
        {
            title: '网站账号',
            dataIndex: 'wzzhanghao',
        },
        {
            title: '推荐时间',
            dataIndex: 'time',
        },
        {
            title: '审核状态',
            dataIndex: 'auditstatus',
        },
        {
            title: '操作',
            dataIndex: 'active',
            scopedSlots: { customRender: 'action' },
        },
    ];

   const data = [];
    for (let i = 0; i < 6; i++) {
        data.push({
            key: i,
            name:'花卉园',
            url: 'https://cq.fang.com',
            wzzhanghao: '08042',
            time: '20191116',
            auditstatus: '审核中',
        });
    }
    export default {
        name:'tuijian',
        data() {
            return {
                value1:'发布',
                tiles,
                columns,
                data
            };
            
            },
       
       
    };
    
 </script>
 <style>
       
       .heardbox{
           margin: 10px;
           width:100%;
          
       }
       .latitle{
           color: green;
           font-size: 14px;
       }
       .rowbox{
           width: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           margin-top: 20px;
       }
       .putbox{
           width:27%;
       }
 </style>