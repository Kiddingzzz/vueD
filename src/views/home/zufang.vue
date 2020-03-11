<template>
    <div class="zufangts">
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
                        <!-- <a class='select' @click="getDashboard()">不限</a>
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
                    onClick="clickLog('from=fcpc_list_cq_Zujin_4500_9999999')">4500元以上</a> -->
                        <a-radio-group v-model="zujinvalue" size="small" buttonStyle="solid" @change="zujinChange">
                            <a-radio-button value="租金不限" @click="reset('租金不限')" class='select'>不限</a-radio-button>
                            <a-radio-button value="0-500" @click="reset('0-500')">500元以下</a-radio-button>
                            <a-radio-button value="500-1000" @click="reset('500-1000')">500-1000元</a-radio-button>
                            <a-radio-button value="1000-1500" @click="reset('1000-1500')">1000-1500元</a-radio-button>
                            <a-radio-button value="1500-2000" @click="reset('1500-2000')">1500-2000元</a-radio-button>
                            <a-radio-button value="2000-3000" @click="reset('2000-3000')">2000-3000元</a-radio-button>
                            <a-radio-button value="3000-4500" @click="reset('3000-4500')">3000-4500元</a-radio-button>
                            <a-radio-button value="4500-more" @click="reset('4500-more')">4500元以上</a-radio-button>
                        </a-radio-group>
                        <span class="prifilter">
                            <span class="text">
                                <input type="number" style="width:60px;" v-model="ricelowinput" @focus="inputFocus" />
                            </span>
                            <span class="dev"> - </span>
                            <span class="text">
                                <input type="number" style="width:60px;" v-model="ricehighinput" @focus="inputFocus" />
                            </span>
                            <span class="dev">元</span>
                            <span class="shaixuanbtn none">
                                <a-button type="primary" v-if="inputChange" @click="reset('shaiRice')">价格筛选</a-button>
                            </span>
                            <span class="errorMsg">{{errorMsg}}</span>
                        </span>
                    </dd>
                </dl>
                <!-- 厅室 -->
                <dl class="secitem">
                    <dt>厅室：</dt>
                    <dd id="secitem-room">
                        <a-radio-group defaultValue="厅室不限" size="small" buttonStyle="solid" @change="huxingChange">
                            <a-radio-button value="厅室不限" @click="reset('厅室不限')" class='select'>不限</a-radio-button>
                            <a-radio-button value="1室" @click="reset('1室')">一室</a-radio-button>
                            <a-radio-button value="2室" @click="reset('2室')">两室</a-radio-button>
                            <a-radio-button value="3室" @click="reset('3室')">三室</a-radio-button>
                            <a-radio-button value="4室" @click="reset('4室')">四室</a-radio-button>
                            <a-radio-button value="moreroom" @click="reset('四室以上')">四室以上</a-radio-button>
                        </a-radio-group>
                    </dd>
                </dl>

                <!-- 其他 -->
                <dl class="secitem">
                    <dt style="margin-top: 7px;">其他：</dt>
                    <dd id="secitem-other" style="display:flex;">
                        <div class="moniselectcon">
                            <a-select labelInValue :defaultValue="{ key: '朝向不限' }"
                                style="width: 120px; margin-right:20px;" @change="chaoxiangChange">
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
                            <a-select labelInValue :defaultValue="{ key: '装修不限' }" style="width: 120px"
                                @change="zhuangxiuChange">
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
            <a-layout style="padding: 24px">
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
            width: '6.7%'
        },
        {
            title: '用途',
            dataIndex: 'yongtu',
            key: 'yongtu',
            width: '5.7%'
        },
        {
            title: '小区',
            dataIndex: 'xiaoquName',
            key: 'xiaoquName',
            width: '7%'
        },
        {
            dataIndex: 'title',
            key: 'title',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'titles' },
            width: '10%'
        },
        {
            title: '价格元/月',
            dataIndex: 'rice',
            key: 'rice',
            width: '7.2%'
        },
        {
            title: '单价',
            dataIndex: 'simpleRice',
            key: 'simpleRice',
            width: '7%'
        },
        {
            title: '面积㎡',
            dataIndex: 'square',
            key: 'square',
            width: '7%'
        },
        {
            title: '朝向',
            dataIndex: 'chaoxiang',
            key: 'chaoxiang',
            width: '4.5%'
        },
        {
            title: '楼层',
            dataIndex: 'louceng',
            key: 'louceng',
            width: '5.5%'
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key: 'zhuangxiu',
            width: '6%'
        },
        {
            title: '联系人',
            dataIndex: 'lianxiPeople',
            key: 'lianxiPeople',
            width: '7.4%'
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            scopedSlots: { customRender: 'phones' },
            width: '7.7%'

        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width: '7.5%'
        },
        {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            width: '6.8%'
        },
    ];
    export default {
        data() {
            return {
                columns,
                list: [],
                searchName: '11',
                chaoxiangselect: '',
                zhuangxiuselect: '',
                quyu: '',
                huxingselect: '',
                zujin: '',
                ricehigh: '',
                ricelow: '',
                ricehighinput: '',
                ricelowinput: '',
                inputChange: false,
                zujinvalue: '租金不限',
                errorMsg: '',
            };
        },
        mounted() {
            this.getDashboard();
        },
        activated(){
            this.getDashboard();
          },
        methods: {
            inputFocus() {
                this.inputChange = true
            },
            quyuChange(e) {
                if (e.target.value != '不限') {
                    this.quyu = e.target.value
                }
            },
            huxingChange(e) {
                if (e.target.value != '厅室不限') {
                    this.huxingselect = e.target.value
                }
            },
            zujinChange(e) {
                if (e.target.value != '租金不限') {
                    this.zujin = e.target.value
                    this.ricelow = e.target.value.split("-")[0]
                    this.ricehigh = e.target.value.split("-")[1]
                }
            },
            zhuangxiuChange(value) {
                if (value.key != '朝向不限') {
                    this.zhuangxiuselect = value.key
                }
            },
            chaoxiangChange(value) {
                if (value.key != '朝向不限') {
                    this.chaoxiangselect = value.key
                }
            },
            async getDashboard(pi) {
                // @param condition 过滤条件
                //@param data 需要过滤的数据
                let mohufilter = (condition, filterdata) => {
                    return filterdata.filter(item => {
                        return Object.keys(condition).every(key => {
                            return String(item[key]).toLowerCase().includes(
                                String(condition[key]).trim().toLowerCase())
                        })
                    })
                }
                let chaoxiangfilter = (condition, filterdata) => {
                    return filterdata.filter(item => {
                        return Object.keys(condition).every(key => {
                            return String(item[key]).toLowerCase() == String(condition[key]).trim().toLowerCase() ? true : false
                        })
                    })
                }
                const respones = await this.$http.get(`${this.$config.api}/api/cms/homeIn/pythonHomeList`);
                const res = respones.data;
                if (pi == undefined) {
                    this.list = res.items;
                    return
                } else {
                    if (pi == '不限') {
                        this.quyu = ''
                    }
                    if (pi == '厅室不限') {
                        this.huxingselect = ''
                    }
                    if (pi == '朝向不限') {
                        this.chaoxiangselect = ''
                    }
                    if (pi == '装修不限') {
                        this.zhuangxiuselect = ''
                    }
                    if (pi == '租金不限') {
                        this.zujin = ''
                        this.ricehigh = ''
                    }
                    //筛选装修和地区
                    let condition = { chaoxiang: this.chaoxiangselect, zhuangxiu: this.zhuangxiuselect, address: this.quyu }
                    this.listt = mohufilter(condition, res.items)
                    //筛选具体朝向
                    if (this.chaoxiangselect != '') {
                        let chaoxiangcondition = { chaoxiang: this.chaoxiangselect }
                        this.listt = chaoxiangfilter(chaoxiangcondition, this.listt);
                    }
                    //筛选户型huxing:this.huxingselect
                    if (this.huxingselect != 'moreroom') {
                        let huxingcondition = { huxing: this.huxingselect }
                        this.listt = mohufilter(huxingcondition, this.listt);
                    }
                    if (this.huxingselect == 'moreroom') {
                        this.listt = this.listt.filter(function (item) {
                            return 5 <= item.huxing.split("室")[0]
                        });
                    }
                    //筛选租金
                    const that = this
                    if (this.ricehighinput == '') {
                        this.listt = this.listt.filter(function (item) {
                            if (that.ricehigh == 'more') {
                                return that.ricelow <= item.rice
                            } else if (that.ricehigh == '') {
                                return 0 <= item.rice
                            } else {
                                return that.ricelow <= item.rice & item.rice <= that.ricehigh
                            }
                        });
                    }
                    //根据输入的价格进行筛选
                    if (this.ricehighinput != '' & this.ricelowinput != '') {
                        this.listt = this.listt.filter(function (item) {
                            return that.ricelowinput <= item.rice & item.rice <= that.ricehighinput
                        });
                        this.inputChange = false
                    }
                    this.list = this.listt
                }
            },
            reset(data) {
                if (data == '租金不限' || data == '0-500' || data == '500-1000' || data == '1000-1500' ||
                    data == '1500-2000' || data == '2000-3000' || data == '3000-4500' || data == '4500-more') {
                    this.errorMsg = ''
                    this.ricehighinput = ''
                    this.ricelowinput = ''
                    this.inputChange = false
                    this.getDashboard(data)
                } else if (data == 'shaiRice') {
                    console.log('ff最高' + this.ricehighinput)
                    console.log('ff最低' + this.ricelowinput)
                    this.zujinvalue = '租金不限'
                    if (this.ricehighinput == '' || this.ricelowinput == '') {
                        console.log('最低' + this.ricelowinput)
                        this.errorMsg = '价格不能为空'
                    } else if (this.ricehighinput != '' && this.ricelowinput != '') {
                        // if(parseFloat(this.ricelowinput)<0){
                        //   this.ricelowinput = 0
                        // }
                        // if(parseFloat(this.ricelowinput)>9999999){
                        //   this.ricelowinput = 9999999
                        // }
                        // if(parseFloat(this.ricehighinput)<0){
                        //   this.ricehighinput = 0
                        // } 
                        // if(parseFloat(this.ricehighinput)>9999999){
                        //   this.ricehighinput = 9999999
                        // }
                        if (parseFloat(this.ricelowinput) > parseFloat(this.ricehighinput)) {
                            this.errorMsg = '最高价格不能低于最低价格'
                        } else {
                            this.errorMsg = ''
                            this.getDashboard(data)
                        }
                    }
                } else {
                    this.errorMsg = ''
                    this.inputChange = false
                    this.getDashboard(data)
                }
            },

        },
    }
</script>
<style lang="less" scoped>
    /deep/ .ant-table-thead>tr>th,
    /deep/.ant-table-tbody>tr>td {
        padding: 16px 10px !important;
    }

    .errorMsg {
        color: red;
    }

    .ant-radio-button-wrapper {
        border: 0px !important;
    }

    .ant-radio-button-wrapper:not(:first-child)::before {
        background-color: #fff !important;
    }

    .ant-radio-button-wrapper {
        border: 0px !important;
    }

    .ant-radio-group-small .ant-radio-button-wrapper {
        line-height: 24px;
    }

    .secitem_fist {
        display: flex;
    }

    .ant-radio-button-wrapper {
        color: #1890ff;
    }

    dt {
        color: #888;
        width: 45px;
        font-size: 14px;
        height: 18px;
        line-height: 24px;
        float: left;
        word-break: keep-all;
        white-space: nowrap;
    }

    .wrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .zufangts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
    }

    .filter-wrap {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .filter-wrap .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .search_bd {
        background: #fff;
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 24px 24px 0px 24px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>