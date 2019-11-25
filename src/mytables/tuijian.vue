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
           <a-tab-pane tab="历史推荐" key="2"></a-tab-pane>
        </a-tabs>
  </div>
</template>
 <script>
    const tiles=['发布','采集'];
    export default {
        name:'tuijian',
        data() {
            return {
                value1:'发布',
                tiles,
            };
            
            },
       
       
        };
 </script>
 <style>
       .ant-layout, .ant-layout *{
           border-bottom: none;
       }
       .heardbox{
           margin: 10px;
           width:100%;
           border-color: red;
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