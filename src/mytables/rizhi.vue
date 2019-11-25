<template>
  <div>
      <a-select :defaultValue="provinceData[0]" style="width: 150px" >
           <a-select-option v-for="(province,index) of provinceData" :key="index"
               :value="province">{{province}}
           </a-select-option>
      </a-select> 
      <a-select :defaultValue="wanglodata[0]" style="width: 150px"  class="">
           <a-select-option v-for="(pro,index) of wanglodata" :key="index"
               :value="pro">{{pro}}
          </a-select-option>
      </a-select> 
      <a-input  class="putbox" placeholder="请输入账号" />
      <a-button type="primary">搜索</a-button>
  </div>  
</template>
<script>
   
   
   const provinceData = ['操作类型', '安卓验证', '发布失效', '安装失效', '签到失效', '账号被挤掉', '房源同步失效', '系统生效', ];
   const wanglodata=['不限','搜狐帮API','安居客','58新版(安居客)','涪风房产网','点击开州','永川在线',];
    export default {
      name: 'rizhi',
      data() {
        return {
          provinceData, 
          wanglodata,
        };
      },
  };
</script>
<style lang="less">
    .putbox{
        width: 150px !important;
        margin-right:18px;
    }
</style>