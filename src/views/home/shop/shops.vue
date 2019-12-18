<template>
        <div class="shopts">
          <div class="shopfilter-wrap" style="padding: 24px 24px 0px 24px;">
          <div class="shopsearch_bd">
            <dl class="secitem secitem_fist">
              <dt class="fl">区域：</dt>
              <dd>
                <a class='select' @click="getDashboard()">不限</a>
                <a @click="reset('渝北')">渝北</a>
                <a @click="reset('南岸')">南岸</a>
                <a @click="reset('沙坪坝')">沙坪坝</a>
                <a @click="reset('九龙坡')">九龙坡</a>
                <a @click="reset('江北')">江北</a>
                <a @click="reset('渝中')">渝中</a>
                <a @click="reset('巴南')">巴南</a>
                <a @click="reset('北碚')">北碚</a>
                <a @click="reset('万州')">万州</a>
                <a @click="reset('璧山')">璧山</a>
                <a @click="reset('永川')">永川</a>
                <a @click="reset('合川')">合川</a>
                <a @click="reset('大渡口')">大渡口</a>
                <a @click="reset('江津')">江津</a>
                <a @click="reset('铜梁')">铜梁</a>
                <a @click="reset('涪陵')">涪陵</a>
                <a @click="reset('长寿')">长寿</a>
                <a @click="reset('荣昌')">荣昌</a>
                <a @click="reset('潼南')">潼南</a>
                <a @click="reset('大足')">大足</a>
                <a @click="reset('开州')">开州</a>
                <a @click="reset('垫江')">垫江</a>
                <a @click="reset('綦江')">綦江</a>
                <a @click="reset('南川')">南川</a>
                <a @click="reset('梁平')">梁平</a>
                <a @click="reset('万盛')">万盛</a>
                <a @click="reset('奉节')">奉节</a>
                <a @click="reset('云阳')">云阳</a>
                <a @click="reset('丰都')">丰都</a>
                <a @click="reset('彭水')">彭水</a>
                <a @click="reset('忠县')">忠县</a>
                <a @click="reset('秀山')">秀山</a>
                <a @click="reset('黔江')">黔江</a>
                <a @click="reset('武隆')">武隆</a>
                <a @click="reset('巫山')">巫山</a>
                <a @click="reset('石柱')">石柱</a>
                <a @click="reset('酉阳')">酉阳</a>
                <a @click="reset('城口')">城口</a>
                <a @click="reset('巫溪')">巫溪</a>
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
                <a class='select' @click="getDashboard()">不限</a>
                <a href="https://cq.58.com/chuzu/0/b1/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_0_500')">500元以下</a>
                <a href="https://cq.58.com/chuzu/0/b2/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_500_1000')">500-1000元</a>
                <a href="https://cq.58.com/chuzu/0/b3/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_1000_1500')">1000-1500元</a>
                <a href="https://cq.58.com/chuzu/0/b4/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_1500_2000')">1500-2000元</a>
                <a href="https://cq.58.com/chuzu/0/b5/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_2000_3000')">2000-3000元</a>
                <a href="https://cq.58.com/chuzu/0/b6/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_3000_4500')">3000-4500元</a>
                <a href="https://cq.58.com/chuzu/0/b7/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Zujin_4500_9999999')">4500元以上</a>
                <span class="prifilter">
                  <span class="text">
                    <input type="text" para="minprice" muti="1" min="0" max="999999" name="b_q" autocomplete="off">
                  </span>
                  <span class="dev"> - </span>
                  <span class="text">
                    <input type="text" para="minprice" muti="1" min="0" max="999999" name="b_q" autocomplete="off">
                  </span>
                  <span class="dev">元</span>
                  <span class="shaixuanbtn none">
                    <a rel='nofollow' href="javascript:;" onClick="clickLog('from=fcpc_list_cq_Zujin_shaixuan')">价格筛选</a>
                  </span>
                </span>
              </dd>
            </dl>
      
            <!-- 厅室 -->
            <dl class="secitem">
              <dt>厅室：</dt>
              <dd id="secitem-room">
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/?pagetype=area" class='select'
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_')">不限</a>
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/j1/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_j1')">一室</a>
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/j2/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_j2')">两室</a>
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/j3/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_j3')">三室</a>
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/j4/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_j4')">四室</a>
                <a rel='nofollow' href="https://cq.58.com/chuzu/0/j5/?pagetype=area"
                  onClick="clickLog('from=fcpc_list_cq_Tingshi_j5')">四室以上</a>
              </dd>
            </dl>
      
            <!-- 其他 -->
            <dl class="secitem">
              <dt style="margin-top: 7px;">其他：</dt>
              <dd id="secitem-other" style="display:flex;">
                <div class="moniselectcon">
                  <a-dropdown>
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
                </a-dropdown>
                </div><!-- moniselectcon -->
                <div class="moniselectcon">
                  <a-dropdown>
                    <a-menu slot="overlay">
                      <a-menu-item key="11" @click="reset('装修不限')"><a-icon type="user" />装修不限</a-menu-item>
                      <a-menu-item key="12" @click="reset('毛坯')"><a-icon type="user" />毛坯</a-menu-item>
                      <a-menu-item key="13" @click="reset('简单装修')"><a-icon type="user" />简单装修</a-menu-item>
                      <a-menu-item key="14" @click="reset('精装修')"><a-icon type="user" />精装修</a-menu-item>
                      <a-menu-item key="15" @click="reset('豪华装修')"><a-icon type="user" />豪华装修</a-menu-item>
                    </a-menu>
                    <a-button style="margin-left: 8px"> {{zhuangxiuselect}} <a-icon type="down" /> </a-button>
                  </a-dropdown>
                </div><!-- moniselectcon -->
              </dd>
            </dl>
            </div>
          </div>
          <div class="shopwrap">
            <a-layout style="padding: 24px 24px 24px 24px">
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
            width: '8%'
          },
          {
            title: '用途',
            dataIndex: 'yongtu',
            key: 'yongtu',
            width:'7%'
          },
          {
            title: '小区',
            dataIndex: 'xiaoquName',
            key: 'xiaoquName',
            width:'8%'
            
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
            title: '面积㎡',
            dataIndex: 'square',
            key: 'square',
             width:'7%'
          },
          {
            title: '户型',
            dataIndex: 'huxing',
            key: 'chaoxiang',
             width:'8%'
          },
          {
            title: '楼层',
            dataIndex: 'louceng',
            key: 'louceng',
             width:'6%'
          },
          {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key: 'zhuangxiu',
            width:'8%'
          },
          {
            title: '联系人',
            dataIndex: 'lianxiPeople',
            key: 'lianxiPeople',
            width:'7%'
          },
          {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            scopedSlots: { customRender: 'phones' },
            width:'9%'
          },
          {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width:'8%'
          },
          {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            width:'6%'
          },
        ];
        export default {
          data() {
            return {
              columns,
              list: [],
              searchName:'11',
              chaoxiangselect: '朝向不限',
              zhuangxiuselect: '装修不限',
            };
          },
          mounted() {
            this.getDashboard();
          },
          methods: {
            async getDashboard(pi) {        
              //@param condition 过滤条件
              //@param data 需要过滤的数据
              let filter=(condition,filterdata)=>{
                  return filterdata.filter( item => {
                      return Object.keys( condition ).every( key => {
                        return String( item[ key ] ).toLowerCase() == String( condition[ key ] ).trim().toLowerCase() ? true : false
                          } )
                  } )
              }
              const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList`);
              console.log(respones)
              const res = respones.data;
              if(pi == undefined || (this.zhuangxiuselect == '装修不限' & this.chaoxiangselect == '朝向不限')){
                  this.list = res.items;
                  return;
              }else if(this.zhuangxiuselect == '装修不限' & this.chaoxiangselect != '朝向不限'){
                  //假设选择的条件为具体的朝向
                  let condition={chaoxiang:this.chaoxiangselect}
                  this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
              }else if(this.zhuangxiuselect != '装修不限' & this.chaoxiangselect == '朝向不限'){
                  //假设选择的条件为具体的装修
                  let condition={zhuangxiu:this.zhuangxiuselect}
                  this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
              }else{
                  //假设选择的条件为具体的装修 和 具体的朝向
                  let condition={zhuangxiu:this.zhuangxiuselect,chaoxiang:this.chaoxiangselect}
                  this.list = filter(condition,res.items) //[ {name: 'Andy',age: 13}]
              }
              // const data = {
              //   SearchName:pi
              // }
              // const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList?Searchname=`+ data.SearchName);
              // const res = respones.data;
              // this.list = res.items;
            },
            reset(data){
              //确定选项里的值是属于装修还是朝向
              const  hh = data
              const str = "装修不限毛坯简单装修精装修豪华装修";
              const reg = new RegExp(hh);
              if(reg.test(str)){
                this.zhuangxiuselect = data;
              }else{
                this.chaoxiangselect = data;
              }
              this.getDashboard(data)
            },
          }
        }
      </script>
      <style lang="less">
        .shopwrap {
          width: 100%;
          display: flex;
          flex: 0 0 auto;
        }
        .shopts{
          display: flex;
          width: 100%;
          flex-flow: column;
          margin: 0 auto;
        }
        .shopfilter-wrap{
          position: relative;
          z-index: 1;
          display: flex;
          flex: 0 0 auto;
          justify-content: center;
        }
        .shopfilter-wrap .shopsearch_bd .secitem dd a.select {
          color: #ff552e;
        }
        .shopsearch_bd{
          background: #fff;
          display: flex;
          flex-flow: column;
          width: 100%;
          padding: 24px 24px 0px 24px;
          border-radius: 10px;
          border: 1px solid #ebedf0;
        }
        .shopfilter-wrap .shopsearch_bd .secitem dt {
          color: #888;
          width: 36px;
          font-size: 12px;
          height: 18px;
          line-height: 18px;
          float: left;
        }
        .ant-table-row ant-table-row-level-0{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
      </style>