<template>
        <div class="shopts">
          <div class="shopfilter-wrap" style="padding: 24px 24px 0px 24px;">
          <div class="shopsearch_bd">
            <dl class="secitem secitem_fist">
              <dt class="fl">区域：</dt>
              <dd>
                <a-radio-group defaultValue="不限" v-model="requyu" size="small" buttonStyle="solid" @change="quyuChange">
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
              <dt class="fl" style="margin-top:2px;">价格：</dt>
               <dd v-if="this.chaoxiangselect == ''">
                <a-radio-group value="租金不限" size="small" buttonStyle="solid"  @change="zujinChange">
                  <a-radio-button value="租金不限" @click="reset('租金不限')" class='select'>不限</a-radio-button>
                </a-radio-group>
              </dd>
              <dd v-if="this.chaoxiangselect == '出租'">
                <a-radio-group defaultValue="租金不限" v-model="zujinAny" size="small" buttonStyle="solid"  @change="zujinChange">
                  <a-radio-button value="租金不限" @click="reset('租金不限')" class='select'>不限</a-radio-button>
                  <a-radio-button value="100-1500"  @click="reset('100-1500')">1500元/月以下</a-radio-button>
                  <a-radio-button value="1500-3500"  @click="reset('1500-3500')">1500-3500元/月</a-radio-button>
                  <a-radio-button value="3500-5000"  @click="reset('3500-5000')">3500-5000元/月</a-radio-button>
                  <a-radio-button value="5000-7000"  @click="reset('5000-7000')">5000-7000元/月</a-radio-button>
                  <a-radio-button value="7000-10000"  @click="reset('7000-10000')">7000-10000元/月</a-radio-button>
                  <a-radio-button value="0-100"  @click="reset('0-100')">1万以上/月</a-radio-button>
                </a-radio-group>
              </dd>
              <dd v-if="this.chaoxiangselect == '出售'">
                <a-radio-group defaultValue="租金不限" v-model="zujinAny" size="small" buttonStyle="solid"  @change="zujinChange">
                  <a-radio-button value="租金不限" @click="reset('租金不限')" class='select reselect'>不限</a-radio-button>
                  <a-radio-button value="0-50"  @click="reset('0-50')">50万以下</a-radio-button>
                  <a-radio-button value="50-100"  @click="reset('50-100')">50-100万</a-radio-button>
                  <a-radio-button value="100-150"  @click="reset('100-150')">100-150万</a-radio-button>
                  <a-radio-button value="150-200"  @click="reset('150-200')">150-200万</a-radio-button>
                  <a-radio-button value="200-300"  @click="reset('200-300')">200-300万</a-radio-button>
                  <a-radio-button value="300-500"  @click="reset('300-500')">300-500万</a-radio-button>
                  <a-radio-button value="500-800"  @click="reset('500-800')">500-800万</a-radio-button>
                  <a-radio-button value="800-more"  @click="reset('800-more')">800万以上</a-radio-button>
                </a-radio-group>
              </dd>
            </dl>
            <!-- 厅室 -->
            <!-- <dl class="secitem">
              <dt>厅室：</dt>
              <dd id="secitem-room">
                <a-radio-group defaultValue="厅室不限" size="small" buttonStyle="solid"  @change="huxingChange">
                  <a-radio-button value="厅室不限" @click="reset('厅室不限')" class='select'>不限</a-radio-button>
                  <a-radio-button value="1室"  @click="reset('1室')">一室</a-radio-button>
                  <a-radio-button value="2室" @click="reset('2室')">两室</a-radio-button>
                  <a-radio-button value="3室" @click="reset('3室')">三室</a-radio-button>
                  <a-radio-button value="4室" @click="reset('4室')">四室</a-radio-button>
                  <a-radio-button value="moreroom" @click="reset('四室以上')">四室以上</a-radio-button>
                </a-radio-group>
              </dd>
            </dl> -->
      
            <!-- 其他 -->
            <dl class="secitem">
              <dt style="margin-top: 7px;">其他：</dt>
              <dd id="secitem-other" style="display:flex;">
                <div class="moniselectcon">
                  <a-select
                    v-model="retype"
                    :defaultValue="{ key: '商铺类型' }"
                    style="width: 120px; margin-right:20px;"
                    @change="chaoxiangChange"
                  >
                    <a-select-option value="商铺类型" @click="reset('商铺类型')">商铺类型</a-select-option>
                    <a-select-option value="出租" @click="reset('出租')">出租</a-select-option>
                    <a-select-option value="出售" @click="reset('出售')">出售</a-select-option>
                  </a-select>
                </div><!-- moniselectcon --><!-- moniselectcon -->
              </dd>
            </dl>
            </div>
          </div>
          <div class="shopwrap">
            <a-layout style="padding: 24px 24px 24px 24px">
              <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                <a-table :columns="columns" :dataSource="list" :loading="loading" @change="handleTableChange" :pagination="pagination">
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
            title: '价格',
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
            title: '租赁方式',
            dataIndex: 'saleType',
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
              requyu: '不限',//重置区域
              retype: '商铺类型',
              columns,
              list: [],
              listt: [],//每步筛选结果
              zujinAny: '租金不限',//重置租金
              searchName:'11',
              chaoxiangselect: '',
              zhuangxiuselect: '',
              quyu: '',
              huxingselect: '',
              zujin: '',
              ricehigh: '',
              ricelow: '',
              ricehighinput: '',
              pagination: {
                    total: 0,
                    pageSize: 20,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                loading: true,
                // 查询参数
                queryParam: {
                    page: 1,//第几页
                    size: 20,//每页中显示数据的条数
                    hosName: "",
                    hosCode: "",
                    province: "",
                    city: ""
                },
            };
          },
          watch:{   //监听路由变化重置筛选条件
            $route( to , from ){   
                // console.log( to , from )
                if(to.path == '/shops'){
                    this.requyu = '不限'
                    this.zujinAny = '租金不限'
                    this.retype = '商铺类型'
                }
            }
        },
          mounted() {
            this.getDashboard();
          },
          activated(){
            this.getDashboard();
          },
          methods: {
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.pageSize = pagination.pageSize;
                this.queryParam.page = pagination.current;
                this.queryParam.size = pagination.pageSize;
                this.pagination = pagination;
            },
            quyuChange(e){
              if(e.target.value != '不限'){
                this.quyu = e.target.value
              }
            },
            zujinChange(e) {
              if(e.target.value != '租金不限'){
                this.zujin = e.target.value
                this.ricelow = e.target.value.split("-")[0]
                this.ricehigh = e.target.value.split("-")[1]
              }
            },
            chaoxiangChange(value) {
              if(value != '商铺类型'){
                this.chaoxiangselect = value
              }
              if(this.chaoxiangselect != value){
                this.radio = "上海"
                this.zujinAny = '租金不限'  
                this.zujin = ""
                this.ricelow = ""
                this.ricehigh = ""
              }
            },
            async getDashboard(pi) {        
              //@param condition 过滤条件
              //@param data 需要过滤的数据
              let filter=(condition, filterdata)=>{
                        return filterdata.filter(item => {
                            return Object.keys(condition).every(key => {
                                return String(item[key]).toLowerCase().includes(
                                    String(condition[key]).trim().toLowerCase() 
                                )
                        } )
                    } )
              }
              const respones = await this.$http.get(`${this.$config.api}/api/cms/shopPub/shopPythonHomeList`);
              // console.log(respones)
              const res = respones.data;
              // if(pi == undefined || (this.zhuangxiuselect == '装修不限')){
              //     this.list = res.items;
              //     return;
              // }
              if(pi == undefined){
                // const respones = await this.$http.get(`${this.$config.api}/api/cms/shopPub/shopPythonHomeList`);
                // const res = respones.data;
                const pagination = { ...this.pagination };
                // pagination.total = res.totalCount;
                this.pagination = pagination;
                this.loading = false;
                this.list = res.items;
                return
              }
              else{
                    // const data = {
                    //   SearchName:pi
                    // }
                    // const respones = await this.$http.get(`${this.$config.api}/api/cms/shopPub/shopPythonHomeList?SearchName=`+ data.SearchName);
                    // const res = respones.data;
                    const pagination = { ...this.pagination };
                    // pagination.total = res.totalCount;
                    this.pagination = pagination;
                    this.loading = false;
                    this.list = res.items;
                    if (pi == '不限') {
                        this.quyu = '';
                    }
                    if (pi == '租金不限') {
                        this.zujin = ''
                        this.ricehigh = ''
                    }
                    if (pi == '商铺类型') {
                        this.chaoxiangselect = ''
                    }
                    //筛选地区
                    let condition = { address: this.quyu }
                    this.listt = filter(condition, res.items) 

                    //筛选商铺类型
                    let chaoxiangcondition = { saleType: this.chaoxiangselect }
                    this.listt = filter(chaoxiangcondition, this.listt);

                    //筛选租金
                    const that = this;
                    // if (this.ricehighinput == '') {
                        this.listt = this.listt.filter(function (item) {
                            if (that.ricehigh == 'more') {
                                return that.ricelow <= Number(item.rice)
                            } else if (that.ricehigh == '') {
                                return 0 <= Number(item.rice)
                            } else {
                                return that.ricelow <= Number(item.rice) & Number(item.rice) <= that.ricehigh
                              // if(that.chaoxiangselect == '出租'){  
                              //   return that.ricelow <= Number(item.rice) & Number(item.rice) <= that.ricehigh
                              // }
                            }
                        });
                    // }
                    this.list = this.listt
                }
              
            },
            reset(data){
              //确定选项里的值是属于装修还是朝向
              // const  hh = data
              // const str = "装修不限毛坯简单装修精装修豪华装修";
              // const reg = new RegExp(hh);
              this.getDashboard(data)
            },
          }
        }
      </script>
<style lang="less">
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