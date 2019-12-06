<template>
    <div style="width:100%" @click="$emit('click',value)">
        <a-table :columns="columnss" :dataSource="datas">
            <span slot="inter" slot-scope="res,record">
                <img class="wangyeimg" :src="record.inter">
            </span>
            <span slot="acctionkey" slot-scope="acctionkey, record">
                <a-checkbox></a-checkbox>
                <label class="organlabel">{{record.acctionkey[0]}}</label>
                <label class="organlabel">{{record.acctionkey[1]}}</label>

            </span>
            <span slot="leibie" slot-scope="leibie">
                <a-checkbox v-for="tag in leibie" :key="tag">
                    {{tag.toUpperCase()}}
                </a-checkbox>

            </span>
            <span slot="kumansing" slot-scope="text, record">
                <a-select default-value="2" class="opseles">
                    <a-select-option value="1">
                        不发送
                    </a-select-option>
                    <a-select-option value="2">
                        删除旧房源再发送
                    </a-select-option>
                </a-select>
            </span>
            <span slot="houschongfu" slot-scope="text, record">
                <a-select default-value="2" class="opseles">
                    <a-select-option value="1">
                        不发送
                    </a-select-option>
                    <a-select-option value="2">
                        先删除后发送
                    </a-select-option>
                </a-select>
            </span>
            <span slot="tuiaction" slot-scope="text, record">
                <a-select default-value="2" class="seleshangjia">
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
                <a-spin :spinning="spinning">
                </a-spin>
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
            width: '8%',
            scopedSlots: { customRender: 'inter' },
        },
        {
            title: '账号状态',
            dataIndex: 'acctionkey',
            key: 'acctionkey',
            width: '20%',
            scopedSlots: { customRender: 'acctionkey' },
        },
        {
            title: '类别',
            key: 'leibie',
            dataIndex: 'leibie',
            width: '17%',
            scopedSlots: { customRender: 'leibie' },
        },
        {
            title: '库存满时发送处理',
            key: 'kumansing',
            scopedSlots: { customRender: 'kumansing' }, 
            width:'13%'
        },
        {
            title: '房源重复发送处理',
            key: 'houschongfu',
            scopedSlots: { customRender: 'houschongfu' },
            width:'13%'
        },
        {
            title: '推送设置',
            key: 'tuiaction',
            scopedSlots: { customRender: 'tuiaction' },
            width:'12%'
        },
        {
            title: '操作',
            key: 'caozuo',
            scopedSlots: { customRender: 'caozuo' },
            width:'9%'
        },
    ];

    const datas = [
        {
            key: '1',
            inter: '/static/img/logoJXW.2d85d52.png',
            acctionkey: ['15624687', '可用'],
            leibie: ['第一个', '第二个'],

        }

    ];


    export default {
        data() {
            return {
                datas,
                columnss,
                def: {},
                spinning: false,
                pdef: {},
                shineiImgList:[],
                xiaoquImgList:[],
                huxingImgList:[],
                bid:'a'
            };
        },
        props: {
            value: {
                type: Object,
                default: {}
            }
        },
        mounted() {
            this.def = this.value;

        },
        methods: {

            callback(key) {
                console.log(key);
            },
            async fabuok(e) {
                this.spinning = true;
                this.pdef = this.value;
                var end =  this.pdef.address.indexOf('－');
                this.pdef.addressDetail = this.pdef.address.substring(end+1,this.pdef.address.length);
                this.pdef.address = this.pdef.address.substring(0,end)
                this.pdef.fangwuDate = this.pdef.fangwuDate.substring(0,this.pdef.fangwuDate.length-1);
                var roomLength = this.pdef.huxing.indexOf('室');
                var room = this.pdef.huxing.substring(0,roomLength);
                var toiletLength = this.pdef.huxing.indexOf('厅')
                var toilet = this.pdef.huxing.substring(roomLength+1,toiletLength)
                var hallLength = this.pdef.huxing.indexOf('卫')
                var hall = this.pdef.huxing.substring(toiletLength+1,hallLength)
                if(this.pdef.fangyuanBiaoqian.indexOf('唯一住房') != -1){
                    this.pdef.fangyuanBiaoqian = '不满二';
                }
                if(this.pdef.fangyuanBiaoqian.indexOf('满两年') != -1 || this.pdef.fangyuanBiaoqian.indexOf('满二唯一') != -1){
                    this.pdef.fangyuanBiaoqian = '满二';
                }
                if(this.pdef.fangyuanBiaoqian.indexOf('满五') != -1){
                    this.pdef.fangyuanBiaoqian = '满五';
                }
                var cengshuLength = this.pdef.louceng.indexOf('/');
                var cengshu = this.pdef.louceng.substring(0,cengshuLength);
                var zongceng = this.pdef.louceng.substring(cengshuLength+1,this.pdef.louceng.length);

                var shineiImg = this.pdef.shineiImg.replace(/'/g, '').replace('[', '').replace(']', '');
                var ss = shineiImg.split(",")
                for(let i = 0;i<ss.length;i++){
                    var imgUrl = {};
                    var l = i + 1;
                    imgUrl.name = "室内图"+l;
                    imgUrl.url = ss[i];
                    this.shineiImgList.push(imgUrl);
                }

                var xiaoquImg = {};
                xiaoquImg.name = "小区照片";
                xiaoquImg.url = this.pdef.xiaoquImg.replace(/'/g, '').replace('[', '').replace(']', '');
                this.xiaoquImgList.push(xiaoquImg);

                var HuxingImg = {};
                HuxingImg.name = "房型照片";
                HuxingImg.url = this.pdef.fangxinImg.replace(/'/g, '').replace('[', '').replace(']', '');
                this.huxingImgList.push(HuxingImg);

                var chanquanLength = this.pdef.chanquanNianxian.indexOf('年');
                this.pdef.chanquanNianxian = this.pdef.chanquanNianxian.substring(0,chanquanLength);

                //var query = await this.$http.get(`${this.$config.api}/api/cms/sites/getUserFang/` + this.$store.userId);
                let update = JSON.parse(localStorage.getItem('update'));
                var query = await this.$http.get(`${this.$config.api}/api/cms/sites/getUserFang/` + update.userId);
                let datas = query.data;
                const urls = 'unity/authenticate';
                const data = {
                    userName: datas.userName,
                    pwd: datas.passWord,
                    keyId: "10568"
                }
                const res = await this.$axios.post(urls, data);
                const userName = res.data.returnmsgs.userName;
                this.tokens = res.data.returnmsgs.token;
                const list = {
                    houseType: "Sale",
                    purposeType: "House",
                    newcode: 0,
                    projname: this.pdef.xiaoquName,
                    district: this.pdef.address,
                    comarea: "长阳",
                    address: this.pdef.addressDetail,
                    createTime: "1988",
                    price: this.pdef.rice,
                    buildingArea: this.pdef.square,
                    liveArea: this.pdef.square,
                    innerid: "gz1213",
                    baseService: "煤气/天然气,暖气,电梯,车位/车库,储藏室/地下室,花园/小院,露台,阁楼",
                    feature: "平台标签",
                    trafficinfo: "交通便利，距离地铁500米以内，多路公交车",
                    subwayinfo: "其他：万豪南苑大酒店、鄞州公园、国际影院、建材超市百安居、数码广场、多家五星级酒店；",
                    title: this.pdef.title,
                    content: this.pdef.note,
                    infocode: "1231",
                    forward: this.pdef.chaoxiang,
                    payInfo: this.pdef.fangwuChanquan,
                    lookhouse: "随时看房",
                    room:room,
                    toilet:toilet,
                    hall: hall,
                    kitchen: 1,
                    balcony: 1,
                    floor: cengshu,
                    allfloor: zongceng,
                    fitment: this.pdef.zhuangxiu,
                    buildingType: "板楼",
                    houseStructure: "平层",
                    propertySubType: this.pdef.fangwuLeixing,
                    photoUrl: this.pdef.imgHeader,
                    ownerMentality: this.pdef.atittude,
                    communityMatching: this.pdef.peitaoBiaoqain,
                    serviceIntroduction: this.pdef.fuwuCondition,
                    taxAnalysis: "满2年以上就交契税+90平以下首套1+90平以上1.5+未2年的要交土地税5.3+此房满2年",
                    ptype: 2,
                    videourl: "",
                    videotitle: "",
                    delegateNum: "12",
                    delegateCompanyName: "21世纪在线",
                    buildingnumber: "12",
                    buildingnumbertype: "弄",
                    unitnumber: "1",
                    unitnumbertype: "幢",
                    housenumber: "201",
                    houseservicelife: "满五",
                    landUseYear: 70,
                    houseservicelife: this.pdef.fangyuanBiaoqian,
                    landUseYear: this.pdef.chanquanNianxian,
                    image1: this.shineiImgList,
                    image2: this.xiaoquImgList,
                    image3: this.huxingImgList,
              }
                const SaleUrl = '/agent/house/input';
                // ?token='+this.tokens+'&Content-Type='+'application/json'+'&keyId='+'10568'+'&FangRequestID='+'fangusername_input_410661884'
                const res1 = await this.$axios.post(SaleUrl, list,
                    {
                        headers: {
                            'token': res.data.returnmsgs.token,
                            'Content-Type': 'application/json',
                            'keyId': '10568',
                            'FangRequestID': 'fangusername_input_410661884'
                        }
                    }
                ).then(res1 => {
                    // console.log(`出售住宅房源:` + JSON.stringify(res1));
                    if (res1.data.code == "1") {
                        // this.innerid = res1.returnmsgs.innerid;
                        // this.houseurl = res1.returnmsgs.houseurl;
                        // this.flag = res1.returnmsgs.flag;
                        // this.houseid = res1.returnmsgs.houseid;
                        var renders = this.$http.post(`${this.$config.api}/api/cms/pubulish/modifyHouseStatus/`+this.value.id)
                        this.openNotificationWithIcon('success')
                    }
                })
            },
           
            //aaa
            openNotificationWithIcon(type) {
                if (type == 'success') {
                    this.spinning = false;
                    this.$notification[type]({
                    message: '发布成功',
                    description:
                        '房源发布成功请在网站后台查看',
                    });
                    
                    this.$emit("getSeconde",this.bid);
                }
                if (type == 'error') {
                    this.$notification[type]({
                        message: '发布失败',
                        placement: 'bottomRight',
                        bottom: '50px',
                        right: '500px',
                        description:
                            '房源失败数据不能为空',
                    });
                }
            },
        },
        
    };
</script>
<style lang="less">
    .wangyeimg {
        width: 200px;
        height: 70px;
    }

    .organlabel {
        color: orange;
    }
    .opseles{
      width:160px;
    }
    .seleshangjia{
        width:90px;
    }
    .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
}
</style>