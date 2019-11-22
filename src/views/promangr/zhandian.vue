<template>
    <div class="ts">
        <button @click="det()">1124124</button>
        <div class="filter-wraps" style="padding: 15px 15px 0px 15px;">
            <div class="search_bds" style="height:180px;">
                <div>
                    贴心提示:
                </div>
                <div>
                    1、删除账号后刷新计划要重新设置。
                </div>
                <div>
                    2、如果要修改账号名，请先删除旧账号再添加新账号。
                </div>
                <div>
                    3、如果您添加的帐号在对应网站修改了密码，请及时同步更新在本站对应帐号的密码，如果没及时同步更新，将会造成发布或者刷新失败。
                </div>
                <div>
                    4、每个网站最多可添加1个账号,请猛击“添账号”按钮！
                </div>
                <div>
                    5、鉴于几大主流付费网站对账号登录限制严格，我们增加了绑定成功的账号在24小时内不能删除的限制
                </div>
            </div>
        </div>
            <div style="padding: 12px 25px 0px 25px;">
                <a-tabs defaultActiveKey="1" @change="callback">
                    <a-tab-pane tab="全部网站" key="1"> 
                        <allinter></allinter>
                </a-tab-pane>
                <a-tab-pane tab="已开通网站" key="2">
                </a-tab-pane>
                <a-tab-pane tab="未开通网站" key="3">Content of Tab Pane 3</a-tab-pane>
                    <a-tab-pane tab="操作日志" key="4">
                       <rizhi></rizhi>
                    </a-tab-pane>
                <a-tab-pane tab="向平台推荐网站" key="5">Content of Tab Pane 3</a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import { encryptDes, decryptDes } from '../../des.js';
  import allinter from '../../mytables/allinter'
  import rizhi from '../../mytables/rizhi'
    export default {
        data() {
            return {
                datas,
                columnss,
                userName: "admin",
                pwd: "abc123",
                keyId: "12345645",
                bid: "s123",
                ret: [],
                byte: [],
                tokens: '',
                despwd: '',
                //房源类型 售 或 租
                houseType: '',
                //请求API的授权码 令牌  
                token: '',
                //请求API的服务域名
                url: '',
                //企业内部房源ID
                innerid: '',
                //房源详情页URL
                houseurl: '',
                // 房天下房源ID   
                houseid: '',
                //发布状态：1.已推广，2.未推广，5.房源违规
                flag: '',
            };
        },
    components: {
            allinter,
            rizhi,
        },
        mounted() {

            let pwd = this.pwd;
            let keyId = this.keyId;
            const ddd = keyId.toString();
            // console.log(ddd);
            // const KeyHex =cryptoJs.enc.utf8.parse(ddd);
            const userName1 = this.encryptDes('gracemae', '058523bb')
            const pwd1 = this.encryptDes('jiayu6248', '058523bb')


        },
        methods: {

            callback(key) {
                console.log(key);
            },
            ceshi() {
                console.log("3333")
            },
            async det() {

                const url = '/unity/authenticate'
                const data = {
                    userName: "13436189252",
                    pwd: "TFYQa2r1Tm9T6YWXayYzJg==",
                    keyId: "10568"
                }
                const res = await this.$axios.post(url, data);
                this.tokens = res.data.returnmsgs.token;
                console.log('token:' + this.tokens)
                const userNmae = res.data.returnmsgs.userName;

                const plist = {
                    houseType: "Sale",
                    purposeType: "House",
                    newcode: 0,
                    projname: "长阳半岛",
                    district: "房山",
                    comarea: "长阳",
                    address: "紫玉路11号院",
                    createTime: "1988",
                    price: 300,
                    buildingArea: 80,
                    liveArea: 70,
                    innerid: "gz1213",
                    baseService: "煤气/天然气,暖气,电梯,车位/车库,储藏室/地下室,花园/小院,露台,阁楼",
                    feature: "平台标签",
                    trafficinfo: "交通便利，距离地铁500米以内，多路公交车",
                    subwayinfo: "其他：万豪南苑大酒店、鄞州公园、国际影院、建材超市百安居、数码广场、多家五星级酒店；",
                    title: "真是一个好房子吖特别漂亮",
                    content: "满五唯一住房，契税1个点",
                    infocode: "1231",
                    forward: "南北",
                    payInfo: "个人产权",
                    lookhouse: "随时看房",
                    room: 2,
                    toilet: 1,
                    hall: 1,
                    kitchen: 1,
                    balcony: 1,
                    floor: 2,
                    allfloor: 6,
                    fitment: "豪华装修",
                    buildingType: "板楼",
                    houseStructure: "平层",
                    propertySubType: "普通住宅",
                    photoUrl: "http://cdnsfb.soufunimg.com/1/2019_6/16/M13/41/46ff41bf0e0943729962aac0b5ede92e.jpg",
                    ownerMentality: "房东置换，诚心出售，欢迎看房，随时恭候您的到来。",
                    communityMatching: "小区环境优雅，配套成熟，周边，居住舒适。",
                    serviceIntroduction: "本人从事房多年，公司有大量好房源，欢迎进入我的店铺查看，欢迎随时电话咨询，相信我的，为您置业安家保驾护航。",
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
                    image1: [{
                        name: "室内图1",
                        url: "http://cdnsfb.soufunimg.com/1/2019_6/16/M13/41/46ff41bf0e0943729962aac0b5ede92e.jpg"
                    }],
                    image2: [{
                        name: "123123",
                        url: "http://cdnsfb.soufunimg.com/1/2019_6/16/M13/41/46ff41bf0e0943729962aac0b5ede92e.jpg"
                    }],
                    image3: [{
                        name: "123123",
                        url: "http://cdnsfb.soufunimg.com/1/2019_6/16/M13/41/46ff41bf0e0943729962aac0b5ede92e.jpg"
                    }]
                }
                const SaleUrl = '/agent/house/input'
                // ?token='+this.tokens+'&Content-Type='+'application/json'+'&keyId='+'10568'+'&FangRequestID='+'fangusername_input_410661884'
                const res1 = await this.$axios.post(SaleUrl, plist,
                    {
                        headers: {
                            'token': this.tokens,
                            'Content-Type': 'application/json',
                            'keyId': '10568',
                            'FangRequestID': 'fangusername_input_410661884'
                        }
                    }
                ).then(res1 => {
                    console.log(`出售住宅房源:` + JSON.stringify(res1));
                    if (res1.code == 1) {
                        console.log("操作成功")
                        this.innerid = res.returnmsgs.innerid;
                        this.houseurl = res.returnmsgs.houseurl;
                        this.flag = res.returnmsgs.flag;
                        this.houseid = res.returnmsgs.houseid;

                    }
                })

                // 出售住宅房源
                // const res=await this.$http.post('https://openapi.fang.com/unity/authenticate?userName=gracemae&pwd=wFqqwpLO2yeYtlQlyNotig==&keyId=10568')
                // console.log(`asdasdasd`+res);
            },
            //获取接口权限
            async gettoken() {

                //获取token
                userName = this.encryptDes('admin', '058523bb')
                pwd = this.encryptDes('', '058523bb')
                const data = {
                    userName: "13436189252",
                    pwd: "TFYQa2r1Tm9T6YWXayYzJg==",
                    keyId: "10568"
                }
                const res = await this.$http.get('https://openapi.fang.com/unity/authenticate', data);
                if (res.code == 1 || res.code == "1") {
                    console.log("令牌获取成功");
                    this.token = res.returnmsgs.token;
                    this.url = res.url;
                    const houselist = await this.$http.post(this.url + '/agent/house/input?token=' + this.token + '&keyId=' + keyId + '&FangRequestID=' + 'seaname_465436')
                    if (houselist.code == 1 || houselist.code == "1") {

                        console.log("操作成功");
                    }
                    else {
                        console.log("操作失败");
                    }

                }
                else {
                    console.log("令牌获取失败")
                }

            },




            //出售别墅房源
            async pbieshu() {
                const plist = {
                    houseType: "Sale",//	房源类型 
                    purposeType: "Villa",//物业类型 
                    newcode: "ds565",//楼盘ID
                    projname: "fada45",//楼盘名称(楼盘ID无法对应时必填)
                    district: "safvcasdva",//区县(楼盘ID无法对应时必填)
                    comarea: "adfvadsa",//商圈(楼盘ID无法对应时必填)
                    address: "fasdfvcasd",//物业地址(楼盘ID无法对应时必填)
                    createtime: "2010",//建筑年代，只能为四位数据，如2010
                    price: 2315,	//价格(万/套)，出售价格应大于2万小于20亿元
                    buildingarea: 152,//建筑面积，建筑面积应大于2小于10000平方米
                    livearea: 123.01,//使用面积，应小于建筑面积
                    innerid: "asdfasd",//内网房源编号
                    baseservice: "dfasfa",//配套设施(露台,阁楼,游泳池,阳光房)以“,”隔开
                    feature: "asdfgvasd",//平台标签，最多3个，且必须为系统定义的那几个标签(可通过房源录入页查询到)以“,”隔开
                    title: "asdfasd",//房源标题，10-30个汉字
                    content: "dfa",//核心卖点，最多300个汉字
                    infocode: "dcads",//房源核验编号
                    forward: "dafa",//进门朝向(东、南、西、北)
                    lookhouse: "dafads",//看房时间(随时看房、非工作时间、电话预约)
                    room: 5,//室(默认值：0)，>=1，<=99，整数
                    toilet: 5,//卫(默认值：0)，>=0，<=9，整数
                    hall: 6,//厅(默认值：0)，>=0，<=9，整数
                    kitchen: 4,//厨,(默认值：0)，>=0，<=9，整数
                    balcony: 6,//阳台(默认值：0)，>=0，<=9，整数
                    workshoparea: 31.5,//地下室面积，>=0，<=99999
                    shoptype: "asdfas",//地下室类型(全明，半明，暗)
                    spacearea: 124.2,//花园面积，>=0，<=99999
                    garage: 55,//车库数量，>0，<=99
                    parkingplace: 47,//车位数量，>0，<=99
                    allfloor: 23,//地上层数(地上层数>0)，>0，<=99，整数
                    fitment: "dfvasdfvcasdvc",///装修程度(简装修、豪华装修、精装修、中装修、毛坯)
                    buildingtype: "dsfasedasd",//建筑形式(独栋、双拼、联排、叠加)
                    housestructure: "dasdadva",//厅结构(平层、挑高)
                    ownerMentality: "fgadsfgsdf",//业主心态，最多300个汉字
                    communityMatching: "safased",//小区配套，最多300个汉字
                    serviceIntroduction: "sgfasdgvas",//否	服务信息，最多300个汉字
                    taxAnalysis: "asdfasdasd",//税费信息，最多300个汉字
                    ptype: 2,//	2(新搜房帮)，0（只发布不推广）
                    photourl: "gsergs",//标题图
                    image1: "fmaskldmas,dgasdgassa",//(格式:[{"url":"url","name":name},{"url":"url","name":name}],url表示图片地址，name表示名称) 各种类型的图片数总和不能超过30张
                    image2: "asdfasdfas,asdfasdfasd",//	string	否	小区图，最多10张，格式同上
                    image3: "gasdfgva,asdgfar,adgada",//户型图，最少1张，最多3张，格式同上
                    videourl: "faefaeaa",	//视频地址，传入为空时，默认的操作是房源的视频不做任何修改，即使传入的视频的标题，标题也不会修改。当传入的值为null(是字符串的“null”)，如果有房源视频标识删除房源视频。
                    videotitle: "fwefae",//视频标题
                    buildingnumber: "dfawe",//楼栋号，最多20个字符
                    landuseyea: 70,//产权年限（40，50，70，-1（永久产权））
                    payinfo: "限价房",//是	产权性质(限价房、央产房、个人产权、使用权、单位产权、经济适用房、军产房)
                    houseservicelife: "满二",//	房本年限，（满五、满二、不满二）
                    floorHeight: 2,//		楼层净高，>0，<20
                };
                const res = await this.$http.post(this.url + '/openapi.fang.com/agent/house/input?token=' + this.token + '&Content-Type=' + ' application/json' + '&keyId=' + keyId + '&FangRequestID=' + 'fang123' + '&plist=' + plist)
                if (res.code == 1) {
                    console.log("操作成功")
                    this.innerid = res.returnmsgs.innerid;
                    this.houseurl = res.returnmsgs.houseurl;
                    this.flag = res.returnmsgs.flag;
                    this.houseid = res.returnmsgs.houseid;

                }
            },
            //修改售房源信息
            //  async pupdatezhuzhai(){
            //     const plist={
            //       houseType: "Sale",
            //       purposeType: "House",
            //       houseid: 410661884,
            //       createTime: "1984",
            //       price: 310,
            //       buildingArea: 85,
            //       liveArea: 70,
            //       innerid: "gz1213",
            //       baseService: "煤气/天然气,暖气,电梯,车位/车库,储藏室/地下室,花园/小院,露台,阁楼",
            //       feature: "平台标签",
            //       trafficinfo: "交通便利，距离地铁500米以内，多路公交车",
            //       subwayinfo: "其他：万豪南苑大酒店、鄞州公园、国际影院、建材超市百安居、数码广场、多家五星级酒店；",
            //       title: "测试房源，请勿点击",
            //       content: "满五唯一住房，契税1个点",
            //       infocode: "1231",
            //       forward: "南北",
            //       payInfo: "个人产权",
            //       lookhouse: "随时看房",
            //       room: 2,
            //       toilet: 1,
            //       hall: 1,
            //       kitchen: 1,
            //       balcony: 1,
            //       floor: 2,
            //       allfloor: 6,
            //       fitment: "豪华装修",
            //       buildingType: "板楼",
            //       houseStructure: "平层",
            //       propertySubType: "普通住宅",
            //       photoUrl: "http://cdnsfb.soufunimg.com/1/2019_6/16/M13/41/46ff41bf0e0943729962aac0b5ede92e.jpg",
            //       ownerMentality: "房东置换，诚心出售，欢迎看房，随时恭候您的到来。",
            //       communityMatching: "小区环境优雅，配套成熟，周边，居住舒适。",
            //       serviceIntroduction: "本人从事房多年，公司有大量好房源，欢迎进入我的店铺查看，欢迎随时电话咨询，相信我的，为您置业安家保驾护航。",
            //       taxAnalysis: "满2年以上就交契税+90平以下首套1+90平以上1.5+未2年的要交土地税5.3+此房满2年",
            //       ptype: 2,
            //       videourl: "",
            //       videotitle: "",
            //       delegateNum: "12",
            //       delegateCompanyName: "21世纪在线",
            //       buildingnumber: "12",
            //       buildingnumbertype: "弄",
            //       unitnumber: "1",
            //       unitnumbertype: "幢",
            //       housenumber: "201",
            //       houseservicelife: "满五",
            //       landUseYear: 70,

            //       image1: [{
            //           name: "室内图1",
            //           url: "https://cdnsfb.soufunimg.com/viewimage/1/2019_5/18/M9/45/acb73923142c4ae9a1e8032035e86a42/690x440c.jpg"
            //       }],
            //       image2: [{
            //           name: "小区图",
            //           url: "https://cdnsfb.soufunimg.com/viewimage/1/2019_5/18/M9/45/cf17c0165ef54e85a17b72b322a9da27/690x440c.jpg"
            //       }],
            //       image3: [{
            //           name: "户型图",
            //           url: "https://cdnsfb.soufunimg.com/viewimage/3/2019_5/18/M9/45/c2e6534153d842aa9fca31fa049b52ae/690x440.jpg"
            //       }]
            //     },
            //     const res=await this.$http.post(this.url+'/openapi.fang.com/agent/house/modify?token='+this.token+'&Content-Type='+' application/json'+'&keyId='+keyId+'&FangRequestID='+'fang123'+'&plist='+plist)
            //     if(res.code==1)
            //     {
            //       console.log("操作成功")
            //       this.innerid=res.returnmsgs.innerid;
            //       this.houseurl=res.returnmsgs.houseurl;
            //       this.flag=res.returnmsgs.flag;
            //       this.houseid=res.returnmsgs.houseid;

            //     }
            //  },

            //删除房源
            async pdetelezhusu() {
                const res = $http.post(url + '/agent/house/delete?token=' + token + '&Content-Type=' + 'application/json' + '&keyId=' + keyId + '&FangRequestID=' + 'fang123' + '&houseType=' + houseType + '&houseid=' + houseid);
                if (res.code == 1 || res.code == "1") {
                    Console.log("删除成功")
                }
            },
        },
    };
</script>
<style>
    .ant-table-tbody>tr>td {
        border: 1px solid rgb(224, 220, 220);
        text-align: center;
    }

    .ant-table-thead>tr:first-child>th {
        border: 1px solid rgb(224, 220, 220);
        text-align: center;
    }

    .filter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .search_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        border: 1px solid #ebedf0;
        border-radius: 8px;
    }
   .ts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        background-color: white;
    }
    .titlebox{
      color:red;
    }
</style>