<template>
    <div class="ant-layout">
        <div class="fabuall">
            <div class="fabufilter-wraps">
                <div class="fabusearch_bds">
                    <div class="saletishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div class="search_bds_red">
                        1.如果审核失败，请回到" 第一步 " 重新发布。
                    </div>
                    <div>
                        2.如果您希望修改"库存满时"与"房源重复"的发送处理方式，请进入<a-button type="link">个人设置</a-button>。
                    </div>
                    <div>
                        3.库存满时，不想自动删除最旧房源，发布时推送设置可以选择待上架，再去网站后台上架房源。
                    </div>
                    <div>
                        4.发布结果只会显示三天之内发布的。请妥善处理
                    </div>
                </div>
            </div>   
            <a-table class="fabutable" :columns="columns" :dataSource="listfb" >
                    <span slot="operation" slot-scope="text, record" class="caozuo">
                        <a v-if="record.publishStatus!='已发布'" href="javascript:;" @click="update(record)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="confirm(record)"  okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm>
                    </span>
                    <span slot="jieguo" slot-scope="text, record" class="caozuo">
                        <div class="yes" v-if="record.publishStatus=='已发布'"><i class="iconfont icon-chenggong"></i><span>审核成功</span></div>
                        <div class="yes" v-else><i class="iconfont icon-shibai"></i><span>审核失败</span></div>
                    </span>
            </a-table>   
        </div>
    </div>
</template>
<script>
const columns = [{
        title: '小区名称',
        dataIndex: 'xiaoquName',
        width:'15%',
    }, {
        title: '发布房源标题',
        dataIndex: 'title',
        width:'30 %',
    }, {
        title: '发布信息',
        dataIndex: 'publishStatus',
        width:'20%'
    },{
        title: '房源类型',
        dataIndex: 'houseType',
        scopedSlots: { customRender: 'houseType' },
        width:'15%'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width:'15%'
    },
    {
        title: '结果',
        dataIndex: 'jieguo',
        scopedSlots: { customRender: 'jieguo' },
        width:'10%'
    },
];


export default {
    data() {
        return {
            listfb:[],
            columns,
            backMsg: false,
        }
    },
     activated() {
           this.GetShowList()
        },
    mounted() {
        this.GetShowList()
    },
    methods: {
        update(list){
              const that = this.$router
            if(list.houseType=="二手房"){
                that.replace({
                        name: 'Sell',
                            params: { id: list.id }
                    })   
            }
             if(list.houseType=="整租"||list.houseType=="合租"){
               that.replace({
                        name: 'Lease',
                            params: { id: list.id }
                    })   
            }
           
        },
        confirm(list) {
            this.onDeletefb(list)
        },
        async onDeletefb(list) {
              if(list.houseType=="二手房")
                     this.ErDelete(list.id);
              if(list.houseType=="整租"||list.houseType=="合租")
                      this.RtDelete(list.id);
                           

            },
        async ErDelete(id){
                try {
                    await this.$http.post(`${this.$config.api}/api/cms/house/` + id + `/publishDelete`).then(Response => {
                        if (Response.data.code == 200) {
                            this.$message.success(Response.data.msg);
                            this.GetShowList();
                        }
                    })
                }
                catch (e) {
                    this.$message.warning(Response.data.msg);
                }
        },
        async RtDelete(id){
            try {
                    await this.$http.post(`${this.$config.api}/api/cms/renTing/` + id + `/renTingPubDelete`).then(Response => {
                        if (Response.data.code == 200) {
                          this.GetShowList()
                            this.$message.success(Response.data.msg);
                        }
                    })
                }
                catch (e) {
                    this.$message.warning(Response.data.msg);
                }

        },
        async GetShowList(){
                let update = JSON.parse(localStorage.getItem('update'));
                console.log( update.userId)
                const respones = await this.$http.get(`${this.$config.api}/api/cms/house/publishAllList/` + update.userId);
                if (respones.status == 200) {
                    console.log(respones)
                    this.listfb = respones.data.items;
                   
                }
        }
    },
}
</script>

<style lang="less" scoped>
.fabuall {
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 0 auto;
    padding: 24px 24px 0px 24px;
    .fabufilter-wraps {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        .fabusearch_bds {
            display: flex;
            flex-direction: column;
            background: #ffffdd;
            width: 100%;
            padding: 12px;
            line-height: 26px;
            border-radius: 10px;
            border: 1px solid #ebedf0;
            .saletishi {
                display: flex;
                align-items: center;
            }
            .search_bds_red {
                color: red;
            }
        }
    }
    .fabutable{
        background: white;
        margin: 20px 0;
        padding: 25px 15px;
        border-radius: 10px; 
        .yes{
            display: flex;
            align-items: center;
        }
    }
}
</style>