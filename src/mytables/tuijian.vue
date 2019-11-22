<template>
  <div  class="heardbox">
        <a-tabs  type="card">
           <a-tab-pane tab="填写推荐" key="1">
               <div width="100%">
                    向我们推荐您需要的发布或采集网站：<label class="latitle">(只要符合要求的网站，我们会在近期给您加到网站列表里面) </label>
               </div>
               <div>
                    <a-radio-group :options="tiles" :defaultValue="value1"  />
               </div>
           </a-tab-pane>
           <a-tab-pane tab="历史推荐" key="2"></a-tab-pane>
        </a-tabs>
  </div>
</template>
 <script>
     const tiles=['发布','采集'];
    export default {
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
 </style>