<template>
    <div style="width:100%" @click="$emit('click',value)">
    <div>出租发布</div>
        <a-table :columns="columnss" :dataSource="datas">
            <span slot="inter" slot-scope="res,record">
                <img class="wangyeimg" :src="record.inter[hsd]">
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
                <a-select default-value="58同城" v-model="wangvalue" @change="changeimg(wangvalue)" class="seleshangjia">
                    <a-select-option value="58同城">
                        58同城
                    </a-select-option>
                    <a-select-option value="房天下">
                        房天下
                    </a-select-option>
                </a-select>
            </span>
            <span slot="caozuo" slot-scope="text, record">
                <a-button type="primary" @click="Renfabuok(record)" :disabled="disabled" :loading="loading">确认发布
                </a-button>
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
            width: '13%'
        },
        {
            title: '房源重复发送处理',
            key: 'houschongfu',
            scopedSlots: { customRender: 'houschongfu' },
            width: '13%'
        },
        {
            title: '发布网站',
            key: 'tuiaction',
            scopedSlots: { customRender: 'tuiaction' },
            width: '12%'
        },
        {
            title: '操作',
            key: 'caozuo',
            scopedSlots: { customRender: 'caozuo' },
            width: '9%'
        },
    ];

    const datas = [
        {
            key: '1',
            // inter: '/static/img/logoJXW.2d85d52.png',
            inter: [require('../assets/logo/jingjiren.png'), require('../assets/logo/fang.png')],
            acctionkey: ['15624687', '可用'],
            leibie: ['第一个', '第二个'],

        }


    ];


    export default {
        data() {
            return {
                current: 2,
                disabled: false,
                loading: false,
                datas,
                columnss,
                tzvisible:false,
                defRenTing: {},
                RenTingrav: [],
                spinning: false,
                pdef: {},
                bid: 'a',
                hsd: 1,
                wangvalue: '58同城',
                username:'',
                userpwd:'',
                sitecookie:'',
                sitetoken:'',
            };
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            array: {
                type: Array,
                default() {
                    return []
                }
            },

        },
        mounted() {
            this.defRenTing = this.value;
            this.RenTingrav = this.array;
            console.log(">>>>>>>>>>>>")
           console.log( "哈哈哈哈哈哈："+this.RenTingrav)
             

        },
       
        methods: {
            changeimg(e) {
             
                switch (e) {
                    case "58同城": this.hsd = 0
                        break;
                    case "房天下": this.hsd = 1
                        break;

                }
            
            },
            async Renfabuok(e) {
                //禁止再次点击
                console.log('正在发布中，请耐心等待......333')
                this.disabled = true;
                this.loading = true
                let update = JSON.parse(localStorage.getItem('update'));
                let that=this
                
                try {
                    await this.$http.get(`${this.$config.api}/api/cms/sites/userInter?userid=` + update.userId + '&sitename=' + this.wangvalue).then(Response => {
                            console.log("e嗯哼："+JSON.stringify(Response))
                           
                            if (Response.data.returnValue.code == "200") {
                                
                                 that.username=Response.data.userName;
                                 that.userpwd=Response.data.passWord;
                                 that.sitecookie=Response.data.siteCookie
                                 console.log("cookie:"+that.sitecookie)
                                 if(that.wangvalue=="58同城"){
                                    if(that.RenTingrav.length!=0){
                                     console.log("e嗯哼："+JSON.stringify(that.wangvalue))
                                  console.log("e嗯哼："+JSON.stringify(Response.data.userName))
                                        that.WuFbList()}
                                    else
                                        that.WuFb()
                                   }
                            }
                            else {
                                let that = this;
                                const h = that.$createElement;
                                this.tzvisible=true;
                                that.$confirm({
                                    title: '提示',
                                    content: Response.data.returnValue.msg,
                                    okText: '去添加',
                                    cancelText: '取消',
                                    onOk() {
                                        that.$router.replace('/zhandian')
                                    },
                                });
                               
                            }
                        
                    })
                    this.loading = false
                    this.disabled = false;
                }
                catch (e) {
                    this.$message.warning('系统遇到了点问题，请重试');
                    this.loading = false
                    this.disabled = false;
                }
            },
            async WuFb(){
                console.log("ttttttt")
                console.log(this.defRenTing)
                let that=this
               
                let text= that.defRenTing
                let typeCom='';
                let ids=text.id;
                let shi = text.renTingHuXing.indexOf("室");
                let ting = text.renTingHuXing.indexOf("厅");
                let wei = text.renTingHuXing.indexOf("卫");
                let selectedShi = text.renTingHuXing.substring(0, shi);
                let selectedTing = text.renTingHuXing.substring(shi + 1, ting);
                let selectedWei = text.renTingHuXing.substring(ting + 1, wei);
                let louceng1=text.renTingLouceng.split('/')[0];
                let louceng2=text.renTingLouceng.split('/')[1];
                let mianji=text.renTingMianji;
                let allmianji=(parseInt(selectedShi)+1.5)*parseInt(mianji)
                let rtype="12"
                if(text.renTingType=="整租"){
                      rtype="11";
                     allmianji=mianji;
                }  
                const xingzhis=['普通住宅','公寓','别墅','平房','其他']
                const xingi=['1','4','2','5','6']
                let xingzhi='1'
               for(var i=0;i<xingzhis.length;i++){
                     if(text.houseXingzhi==xingzhis[i])
                            xingzhi=xingi[i];
               }
                const zhuangxius=['毛坯','简单装修','精装修','豪华装修']
                const xiui=['1','2','4','6']
                let zhuangxiu='2'
               for(var i=0;i<zhuangxius.length;i++){
                     if(text.zhuangxiu==zhuangxius[i])
                            zhuangxiu=xiui[i];
               }
                const chaoxiangs=['东','南','西','北','东南','东北','西南','西北','南北','东西']
                let chaoxiang=''
                for(var i=0;i<chaoxiangs.length;i++){
                     if(text.renTingChaoxiang==chaoxiangs[i])
                            chaoxiang=i+1;
                }
                const xianzhis=['男女不限','限男生','限女生','限夫妻']
                let xianzhi=''
                for(var i=0;i<xianzhis.length;i++){
                     if(text.renTingRoot==xianzhis[i])
                            xianzhi=(i+1);
                }
                var iv= Math.ceil(Math.random()*4)
                let woshi="1"
                if(iv==4)
                   woshi="2"
                let fukuan=text.fuKuanType
                fukuan=fukuan.replace('一','1').replace('二','2').replace('三','3').replace('一','1')
                
                const fukuans=['押1付1','押2付1','押1付2','押2付2','押1付3','押2付3','面议','半年付','年付','半年付押1','半年付不押','年付不押','年付押1'];
                
                for(var i=0;i<fukuans.length;i++){
                    if(fukuan==fukuans[i])
                       fukuan=i+1;
                }
            //      let ele = document.createElement('span')
            // ele.appendChild(document.createTextNode(str))
            // return ele.innerHTML
            let cookies=[]
            cookies.push(that.sitecookie)
            let ss=that.sitecookie

                const list={
                    weiyiurl:text.weiYiUrl,
                    username:that.username,
                    userpwd:that.userpwd,
                    cateId:rtype,
                    params_86:text.xiaoquName,
                    shi:selectedShi,
                    ting:selectedTing,
                    wei:selectedWei,
                    suoZaiLouCeng:louceng1,
                    zongLouCeng:louceng2,
                    mianJi:allmianji,
                    params_16:xingzhi,
                    zhuangXiuQingKuang:zhuangxiu,
                    chaoXiang:chaoxiang,
                    params_196:selectedShi,
                    hidden_total_flatshare:selectedShi,
                    params_197:woshi,
                    params_103:chaoxiang,
                    params_199:xianzhi,
                    params_12:mianji,
                    params_200:"随时",
                    jiaGe:text.renTingZujin,
                    params_198:fukuan,
                    title:text.renTingTitle,
                    content_fangyuanxiangqing:text.renTingHouse,
                    cookies:encodeURIComponent(String(ss))
                };
            
            console.log("传送的值：")
            console.log(list)
            $.ajax({
                     type: 'GET',
                     async:true,
                      url: 'http://47.108.24.104:8086/get_user?data=' + JSON.stringify(list),
                      dataType: 'jsonp', //希望服务器返回json格式的数据
                      contentType:"application/json",
                     jsonp: "callback",
                     jsonpCallback: "successCallback",//回调方法
                     success: function (data) {
                         console.log("返回值：")
                          console.log(data)
                           if(RegExp(/发布成功/).exec(data))
                                 typeCom="已发布";
                             else
                                typeCom="发布失败";
                        }
                    });
            let yuming=`${that.$config.api}/api/cms/renTing/xiuGaiComPlet/`
            const interval= setInterval(async () => {
                         if(typeCom!=''){
                         const datas={houserid:ids, type:typeCom}
                         that.$http.post(yuming,datas).then(Responses=>{
                                 clearInterval(interval);
                           })
                         }
                                  
             },2000);  
            },
           async WuFbList() {
                let arrays = this.RenTingrav;
                // console.log("rrr:"+JSON.stringify(this.RenTingrav))
               
                let that=this
                let number=arrays.length-1
               let yuming=`${that.$config.api}/api/cms/renTing/xiuGaiComPlet/`
                for (let i = 0; i < arrays.length; i++) {
                    (function (i) {
                        setTimeout(function () {
                            
                            console.log(i)
                            let text=arrays[i]
                           
                            let ids=text.id;
                            let typeCom='';
                            let shi = text.renTingHuXing.indexOf("室");
                            let ting = text.renTingHuXing.indexOf("厅");
                            let wei = text.renTingHuXing.indexOf("卫");
                            let selectedShi = text.renTingHuXing.substring(0, shi);
                            let selectedTing = text.renTingHuXing.substring(shi + 1, ting);
                            let selectedWei = text.renTingHuXing.substring(ting + 1, wei);
                            let louceng1=text.renTingLouceng.split('/')[0];
                            let louceng2=text.renTingLouceng.split('/')[1];
                            let mianji=text.renTingMianji;
                            let allmianji=(parseInt(selectedShi)+1.5)*parseInt(mianji)
                            let rtype="12"
                            if(text.renTingType=="整租"){
                                rtype="11";
                                allmianji=mianji;
                            }  
                            const xingzhis=['普通住宅','公寓','别墅','平房','其他']
                            const xingi=['1','4','2','5','6']
                            let xingzhi='1'
                            for(var j=0;j<xingzhis.length;j++){
                                    if(text.houseXingzhi==xingzhis[j])
                                            xingzhi=xingi[j];
                            }
                                const zhuangxius=['毛坯','简单装修','精装修','豪华装修']
                                const xiui=['1','2','4','6']
                                let zhuangxiu='2'
                            for(var j=0;j<zhuangxius.length;j++){
                                    if(text.zhuangxiu==zhuangxius[j])
                                            zhuangxiu=xiui[j];
                            }
                            const chaoxiangs=['东','南','西','北','东南','东北','西南','西北','南北','东西']
                            let chaoxiang=''
                            for(var j=0;j<chaoxiangs.length;j++){
                                if(text.renTingChaoxiang==chaoxiangs[j])
                                        chaoxiang=j+1;
                            }
                            const xianzhis=['男女不限','限男生','限女生','限夫妻']
                            let xianzhi='1'
                            for(var j=0;j<xianzhis.length;j++){
                                if(text.renTingRoot==xianzhis[j])
                                        xianzhi=(j+1);
                            }
                            var iv= Math.ceil(Math.random()*4)
                            let woshi="1"
                            if(iv==4)
                            woshi="2"
                            let fukuan=text.fuKuanType
                            fukuan=fukuan.replace('一','1').replace('二','2').replace('三','3').replace('一','1')
                            
                            const fukuans=['押1付1','押2付1','押1付2','押2付2','押1付3','押2付3','面议','半年付','年付','半年付押1','半年付不押','年付不押','年付押1'];
                            
                            for(var j=0;j<fukuans.length;j++){
                                if(fukuan==fukuans[j])
                                fukuan=j+1;
                            }

                            const list={
                                weiyiurl:text.weiYiUrl,
                                username:that.username,
                                userpwd:that.userpwd,
                                cateId:rtype,
                                params_86:text.xiaoquName,
                                shi:selectedShi,
                                ting:selectedTing,
                                wei:selectedWei,
                                suoZaiLouCeng:louceng1,
                                zongLouCeng:louceng2,
                                mianJi:allmianji,
                                params_16:xingzhi,
                                zhuangXiuQingKuang:zhuangxiu,
                                chaoXiang:chaoxiang,
                                params_196:selectedShi,
                                hidden_total_flatshare:selectedShi,
                                params_197:woshi,
                                params_103:chaoxiang,
                                params_199:xianzhi,
                                params_12:mianji,
                                params_200:"随时",
                                jiaGe:text.renTingZujin,
                                params_198:fukuan,
                                title:text.renTingTitle,
                                content_fangyuanxiangqing:text.renTingHouse,
                                cookies:encodeURIComponent(String(that.sitecookie))
                            };
                             $.ajax({
                                    type: 'GET',
                                    async:true,
                                    url: 'http://47.108.24.104:8086/get_user?data=' + JSON.stringify(list),
                                    dataType: 'jsonp', //希望服务器返回json格式的数据
                                    jsonp: "callback",
                                    jsonpCallback: "successCallback",//回调方法
                                    success: function (data) {
                                        console.log("返回值：")
                                        console.log(data)
                                        if(RegExp(/发布成功/).exec(data))
                                            typeCom="已发布";
                                        else
                                            typeCom="发布失败";
                                    }
                                });
                            const interval= setInterval(async () => {
                                    if(typeCom!=''){
                                        const datas={houserid:ids, type:typeCom}
                                        that.$http.post(yuming,datas).then(Responses=>{
                                            if(i==number){
                                                clearInterval(interval);
                                                // that.$message.success('您的房源已全部审核完毕，可在发布结果查看发布结果',5);
                                                that.Msg('success')
                                            }
                                        })
                                    }
                                  
                                },2000);  
                        }, i*7000);
                    })(i)
                }
                
                setTimeout(function(){
                      that.$emit('getSeconde', 2, arrays.length)
                        //  that.$message.success('已上传，等待系统审核',2);      
                         that.loading = true 
                        
                   },1000) 
                ///消息接收
                // console.log('this.finalResult:'+this.finalResult)
               
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

                    this.$emit("getSeconde", this.bid);
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
            Msg(type){
                if (type == 'success') {
                    this.$notification[type]({
                        message: '审核成功',
                        placement: 'bottomRight',
                        bottom: '50px',
                        right: '500px',
                        description:
                            '您的房源已全部审核完毕，可在发布结果查看发布结果',
                    });
                }
            }
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

    .opseles {
        width: 160px;
    }

    .seleshangjia {
        width: 90px;
    }

    .ant-checkbox-wrapper+.ant-checkbox-wrapper {
        margin-left: 0px;
    }
</style> 