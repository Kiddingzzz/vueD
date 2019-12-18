<template>
  <div class="ts">
    <div class="filter-wrap" style="padding: 24px 24px 0px 24px;">
    <div class="search_bd">
      <dl class="secitem secitem_fist">
        <dt class="fl">区域：</dt>
        <dd>
          <a-radio-group defaultValue="不限" size="small" buttonStyle="solid" @change="quyuChange">
          <a-radio-button value="不限" @click="reset('不限')">不限</a-radio-button>
          <a-radio-button value="渝北" @click="reset('渝北')">渝北</a-radio-button>
          <a-radio-button value="南岸" @click="reset('南岸')">南岸</a-radio-button>
          <a-radio-button value="沙坪坝" @click="reset('沙坪坝')">沙坪坝</a-radio-button>
          <a-radio-button value="九龙坡" @click="reset('九龙坡')">九龙坡</a-radio-button>
          <a-radio-button value="江北" @click="reset('江北')">江北</a-radio-button>
          <a-radio-button value="渝中" @click="reset('渝中')">渝中</a-radio-button>
          <a-radio-button value="巴南" @click="reset('巴南')">巴南</a-radio-button>
          <a-radio-button value="北碚" @click="reset('北碚')">北碚</a-radio-button>
          <a-radio-button value="万州" @click="reset('万州')">万州</a-radio-button>  
          <a-radio-button value="璧山" @click="reset('璧山')">璧山</a-radio-button>
          <a-radio-button value="永川" @click="reset('永川')">永川</a-radio-button>
          <a-radio-button value="合川" @click="reset('合川')">合川</a-radio-button>
          <a-radio-button value="大渡口" @click="reset('大渡口')">大渡口</a-radio-button>
          <a-radio-button value="江津" @click="reset('江津')">江津</a-radio-button>
          <a-radio-button value="铜梁" @click="reset('铜梁')">铜梁</a-radio-button>
          <a-radio-button value="涪陵" @click="reset('涪陵')">涪陵</a-radio-button>
          <a-radio-button value="长寿" @click="reset('长寿')">长寿</a-radio-button>
          <a-radio-button value="荣昌" @click="reset('荣昌')">荣昌</a-radio-button>
          <a-radio-button value="潼南" @click="reset('潼南')">潼南</a-radio-button>
          <a-radio-button value="大足" @click="reset('大足')">大足</a-radio-button>
          <a-radio-button value="开州" @click="reset('开州')">开州</a-radio-button>
          <a-radio-button value="垫江" @click="reset('垫江')">垫江</a-radio-button>
          <a-radio-button value="綦江" @click="reset('綦江')">綦江</a-radio-button>
          <a-radio-button value="南川" @click="reset('南川')">南川</a-radio-button>
          <a-radio-button value="梁平" @click="reset('梁平')">梁平</a-radio-button>
          <a-radio-button value="万盛" @click="reset('万盛')">万盛</a-radio-button>
          <a-radio-button value="奉节" @click="reset('奉节')">奉节</a-radio-button>
          <a-radio-button value="云阳" @click="reset('云阳')">云阳</a-radio-button>
          <a-radio-button value="丰都" @click="reset('丰都')">丰都</a-radio-button>
          <a-radio-button value="彭水" @click="reset('彭水')">彭水</a-radio-button>
          <a-radio-button value="忠县" @click="reset('忠县')">忠县</a-radio-button>
          <a-radio-button value="秀山" @click="reset('秀山')">秀山</a-radio-button>
          <a-radio-button value="黔江" @click="reset('黔江')">黔江</a-radio-button>
          <a-radio-button value="武隆" @click="reset('武隆')">武隆</a-radio-button>
          <a-radio-button value="巫山" @click="reset('巫山')">巫山</a-radio-button>
          <a-radio-button value="石柱" @click="reset('石柱')">石柱</a-radio-button>
          <a-radio-button value="酉阳" @click="reset('酉阳')">酉阳</a-radio-button>
          <a-radio-button value="城口" @click="reset('城口')">城口</a-radio-button>
          <a-radio-button value="巫溪" @click="reset('巫溪')">巫溪</a-radio-button>
          </a-radio-group>
        </dd>
      </dl>
      <!--区域展示end-->

      <!--地铁展示start-->
      <!--地铁展示end-->

      <!-- 筛选条件 -->

      <!-- 租金 -->
      <dl id="secitem-rent" class="secitem">
        <dt class="fl" style="margin-top:2px;">租金：</dt>
        <dd>
          <a-radio-group defaultValue="租金不限" size="small" buttonStyle="solid">
          <a-radio-button value="租金不限"  class='select' @click="reset()">不限</a-radio-button>
          <a-radio-button value="0-80"  @click="reset('0-80')">80万以下</a-radio-button>
          <a-radio-button value="80-130"  @click="reset('80-130')">80-130万</a-radio-button>
          <a-radio-button value="130-180"  @click="reset('130-180')">130-180万</a-radio-button>
          <a-radio-button value="180以上"  @click="reset('180以上')">180万以上</a-radio-button>
            <span class="shaixuanbtn none">
              <a-radio-button value="万元/户"  href="javascript:;" onClick="clickLog('from=fcpc_list_cq_Zujin_shaixuan')">万元/户</a-radio-button>
            </span>
          </a-radio-group>
        </dd>
      </dl>

      <!-- 厅室 -->
      <dl class="secitem">
        <dt class="fl">厅室：</dt>
        <dd id="secitem-room">
          <a-radio-group defaultValue="厅室不限" size="small" buttonStyle="solid"  @change="huxingChange">
          <a-radio-button value="厅室不限" @click="reset('厅室不限')" class='select'>不限</a-radio-button>
          <a-radio-button value="1室"  @click="reset('1室')">一室</a-radio-button>
          <a-radio-button value="2室" @click="reset('2室')">两室</a-radio-button>
          <a-radio-button value="3室" @click="reset('3室')">三室</a-radio-button>
          <a-radio-button value="4室" @click="reset('4室')">四室</a-radio-button>
          <a-radio-button value="四室以上" @click="reset('四室以上')">四室以上</a-radio-button>
          </a-radio-group>
        </dd>
      </dl>

      <!-- 其他 -->
      <dl class="secitem">
        <dt style="margin-top: 7px;">其他：</dt>
        <dd id="secitem-other" style="display:flex;">
          <div class="moniselectcon">
            <!-- <a-dropdown>
            <a-menu slot="overlay">
            <a-menu-item key="0" @click="reset('朝向不限')"><a-icon type="user" />朝向不限</a-menu-item>
              <a-menu-item key="1" @click="reset('东')"><a-icon type="user" />东</a-menu-item>
              <a-menu-item key="2" @click="reset('南')"><a-icon type="user" />南</a-menu-item>
              <a-menu-item key="3" @click="reset('西')"><a-icon type="user" />西</a-menu-item>
              <a-menu-item key="4" @click="reset('北')"><a-icon type="user" />北</a-menu-item>
              <a-menu-item key="5" @click="reset('南北')"><a-icon type="user" />南北</a-menu-item>
              <a-menu-item key="6" @click="reset('东西')"><a-icon type="user" />东西</a-menu-item>
              <a-menu-item key="7" @click="reset('东南')"><a-icon type="user" />东南</a-menu-item>
              <a-menu-item key="8" @click="reset('西南')"><a-icon type="user" />西南</a-menu-item>
              <a-menu-item key="9" @click="reset('东北')"><a-icon type="user" />东北</a-menu-item>
              <a-menu-item key="10" @click="reset('西北')"><a-icon type="user" />西北</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> {{chaoxiangselect}} <a-icon type="down" /> </a-button>
          </a-dropdown> -->
          <a-select
            labelInValue
            :defaultValue="{ key: '朝向不限' }"
            style="width: 120px; margin-right:20px;"
            @change="chaoxiangChange"
          >
            <a-select-option value="朝向不限" @click="reset('朝向不限')">朝向不限</a-select-option>
            <a-select-option value="东" @click="reset('东')">东</a-select-option>
            <a-select-option value="南" @click="reset('南')">南</a-select-option>
            <a-select-option value="西" @click="reset('西')">西</a-select-option>
            <a-select-option value="北" @click="reset('北')">北</a-select-option>
            <a-select-option value="南北" @click="reset('南北')">南北</a-select-option>
            <a-select-option value="东西" @click="reset('东西')">东西</a-select-option>
            <a-select-option value="东南" @click="reset('东南')">东南</a-select-option>
            <a-select-option value="西南" @click="reset('西南')">西南</a-select-option>
            <a-select-option value="东北" @click="reset('东北')">东北</a-select-option>
            <a-select-option value="西北" @click="reset('西北')">西北</a-select-option>
          </a-select>
          </div><!-- moniselectcon -->
          <div class="moniselectcon">
            <!-- <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="11" @click="reset('装修不限')"><a-icon type="user" />装修不限</a-menu-item>
              <a-menu-item key="12" @click="reset('毛坯')"><a-icon type="user" />毛坯</a-menu-item>
              <a-menu-item key="13" @click="reset('简单装修')"><a-icon type="user" />简单装修</a-menu-item>
              <a-menu-item key="14" @click="reset('精装修')"><a-icon type="user" />精装修</a-menu-item>
              <a-menu-item key="15" @click="reset('豪华装修')"><a-icon type="user" />豪华装修</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> {{zhuangxiuselect}} <a-icon type="down" /> </a-button>
          </a-dropdown> -->
          <a-select
            labelInValue
            :defaultValue="{ key: '装修不限' }"
            style="width: 120px"
            @change="zhuangxiuChange"
          >
            <a-select-option value="装修不限" @click="reset('装修不限')">装修不限</a-select-option>
            <a-select-option value="毛坯" @click="reset('毛坯')">毛坯</a-select-option>
            <a-select-option value="简单装修" @click="reset('简单装修')">简单装修</a-select-option>
            <a-select-option value="精装修" @click="reset('精装修')">精装修</a-select-option>
            <a-select-option value="豪华装修" @click="reset('西北')">豪华装修</a-select-option>
          </a-select>
          </div><!-- moniselectcon -->
        </dd>
      </dl>
      </div>
    </div>
    <div class="wrap">
      <a-layout style="padding: 20px 20px 20px 20px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <a-table :columns="columns" :dataSource="list">
            <span slot="customTitle">
              <!-- <a-icon type="smile-o"/> --> 时间</span>
            <span slot="customTitles">
              <!-- <a-icon type="smile-o"/> --> 标题</span>
            <template slot="phones" slot-scope="text, record">
              <a :href="record.url" target="_blank">{{record.phone}}</a>
            </template>
            <template slot="titles" slot-scope="text, record">
              <a :href="record.url" target="_blank">{{record.title}}</a>
            </template>
            <template slot="def" slot-scope="text, record">
              <a :href="record.url" target="_blank">{{record.def}}</a>
            </template>
          </a-table>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>
<script>
  const columns = [
    {
      dataIndex: 'def',
      key: 'def',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'def' },
      width:'6.7%'
    },
    {
      title: '用途',
      dataIndex: 'yongtu',
      key: 'yongtu',
      width:'5.7%'
    },
    {
      title: '小区',
      dataIndex: 'xiaoquName',
      key: 'xiaoquName',
      width:'7%'
    },
    {
      dataIndex: 'title',
      key: 'title',
      slots: { title: 'customTitles' },
      scopedSlots: { customRender: 'titles' },
      width:'10%'
    },
    {
      title: '价格/万',
      dataIndex: 'rice',
      key: 'rice',
      width:'7%'
    },
    {
      title: '单价/元',
      dataIndex: 'simpleRice',
      key: 'simpleRice',
      width:'7.2%'
    },
    {
      title: '面积㎡',
      dataIndex: 'square',
      key: 'square',
      width:'7%'
    },
    {
      title: '朝向',
      dataIndex: 'chaoxiang',
      key: 'chaoxiang',
      width:'5%'
    },
    {
      title: '户型',
      dataIndex: 'huxing',
      key: 'huxing',
      width:'6%'
    },
    {
      title: '楼层',
      dataIndex: 'louceng',
      key: 'louceng',
      width:'5.5%'
    },
    {
      title: '装修',
      dataIndex: 'zhuangxiu',
      key: 'zhuangxiu',
      width:'7%'
    },
    {
      title: '联系人',
      dataIndex: 'lianxiPeople',
      key: 'lianxiPeople',
      width:'6.7%'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      scopedSlots: { customRender: 'phones' },
      width:'7.2%'
     
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width:'7.5%'
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width:'6.5%'
    },
  ];
  export default {
    data() {
      return {
        columns,
        list: [],
        listt: [],
        searchName:'11',
        chaoxiangselect: '',
        zhuangxiuselect: '',
        quyu: '',
        huxingselect: '',
      };
    },
    mounted() {
      this.getDashboard();
    },
    methods: {
      quyuChange(e){
        if(e.target.value != '不限'){
          this.quyu = e.target.value
        }
      },
      huxingChange(e){
        if(e.target.value != '厅室不限'){
          this.huxingselect = e.target.value
        }
      },
      zhuangxiuChange(value) {
        if(value.key != '朝向不限'){
          this.zhuangxiuselect = value.key
        }
      },
      chaoxiangChange(value) {
        if(value.key != '朝向不限'){
          this.chaoxiangselect = value.key
        }
      },
      async getDashboard(pi) {
          // @param condition 过滤条件
          //@param data 需要过滤的数据
          let filter=(condition,filterdata)=>{
              return filterdata.filter( item => {
                  return Object.keys( condition ).every( key => {
                    return String( item[ key ] ).toLowerCase().includes( 
                    String( condition[ key ] ).trim().toLowerCase() )
                  } )
              } )
          }
          const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList`);
          const res = respones.data;
          if(pi == undefined){
              this.list = res.items;
              return
          }else{
            if(pi == '不限'){
              this.quyu = ''
            }
            if(pi == '厅室不限'){
              this.huxingselect = ''
            }
            if(pi == '朝向不限'){
              this.chaoxiangselect = ''
            }
            if(pi == '装修不限'){
              this.zhuangxiuselect = ''
            }
            let condition={chaoxiang:this.chaoxiangselect,zhuangxiu:this.zhuangxiuselect,address:this.quyu,huxing:this.huxingselect}
            this.list = filter(condition,res.items) 
            console.log(res.items)
            console.log(this.list)
          }
      },
      // async getDashboard(pi) {      
      //   //@param condition 过滤条件
      //   //@param data 需要过滤的数据
      //   let filter=(condition,filterdata)=>{
      //       return filterdata.filter( item => {
      //           return Object.keys( condition ).every( key => {
      //             return String( item[ key ] ).toLowerCase().includes( 
      //              String( condition[ key ] ).trim().toLowerCase() )
      //           } )
      //       } )
      //   }
      //   const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList`);
      //       console.log(respones)
      //       const res = respones.data;
      //       console.log(res.items)
      //   if(pi == undefined){
      //       // const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList`);
      //       // console.log(respones)
      //       // const res = respones.data;
      //       this.list = res.items;
      //       return;
      //   }
        
      //   let condition={chaoxiang:this.chaoxiangselect,zhuangxiu:this.zhuangxiuselect,address:this,quyu}
      //   this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
        //     const data = {
        //       SearchName:pi
        //     }
        //     const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList?Searchname=`+ data.SearchName);
        //     const res = respones.data;
        // if(this.zhuangxiuselect == '装修不限' & this.chaoxiangselect != '朝向不限'){
        //     //假设选择的条件为具体的朝向
        //     let condition={chaoxiang:this.chaoxiangselect,quyu:this.quyu}
        //     this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
        // }else if(this.zhuangxiuselect != '装修不限' & this.chaoxiangselect == '朝向不限'){
        //     //假设选择的条件为具体的装修
        //     let condition={zhuangxiu:this.zhuangxiuselect,quyu:this.quyu}
        //     this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
        // }else if(this.zhuangxiuselect != '装修不限' & this.chaoxiangselect != '朝向不限'){
        //     //假设选择的条件为具体的装修 和 具体的朝向
        //     let condition={zhuangxiu:this.zhuangxiuselect,chaoxiang:this.chaoxiangselect,address:this.quyu}
        //     this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
        // }else{
        //      this.list = res.items;
        // }
      // },
      // reset(data){
      //   //确定选项里的值是属于装修还是朝向
      //     const  hh = data
      //     const str = "装修不限毛坯简单装修精装修豪华装修";
      //     const str2 = "朝向不限东西南北东南西南东北西北";
      //     const reg = new RegExp(hh);
      //     if(reg.test(str)){
      //         this.zhuangxiuselect = data;
      //     }
      //     if(reg.test(str2)){
      //         this.chaoxiangselect = data;
      //     }
      //       this.getDashboard(data)
      // },
      reset(data){
        this.getDashboard(data)
      },
    }
  }
</script>
<style lang="less" scoped>
  /deep/.ant-table-thead > tr > th, /deep/.ant-table-tbody > tr > td{
      padding: 16px 10px !important;
  }
  .ant-radio-button-wrapper{
      border: 0px !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before{
      background-color: #fff !important;
  }
  .ant-radio-button-wrapper{
      border: 0px !important;
  }
  .ant-radio-group-small .ant-radio-button-wrapper{
      line-height: 24px;
  } 
  .secitem_fist{
      display: flex;
  }
 .ant-radio-button-wrapper{
    color: #1890ff;
  }
  .wrap {
    width: 100%;
    display: flex;
    flex: 0 0 auto;
  }
  .ts{
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 0 auto;
  }
  .filter-wrap{
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
  }
  .filter-wrap .search_bd .secitem dd a.select {
    color: #ff552e;
  }
  .search_bd{
    background: #fff;
    display: flex;
    flex-flow: column;
    width: 100%;
    padding: 24px 24px 0px 24px;
    border-radius: 10px;
    border: 1px solid #ebedf0;
  }
  dt{
    color: #888;
    width: 45px;
    font-size: 14px;
    height: 18px;
    line-height: 24px;
    float: left;
    word-break:keep-all; 
    white-space:nowrap; 
  }
  .ant-table-row ant-table-row-level-0{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>