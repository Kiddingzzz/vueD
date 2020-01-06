<template>
    <div class="ant-layout">
        <div class="fabuall">
            <div class="fabufilter-wraps">
                <div class="fabusearch_bds">
                    <div class="saletishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.带“!”的房源可能图片质量较低，建议点击该符号根据提示修改。
                    </div>
                    <div class="search_bds_red">
                        2.为判断是否满足新三网视频高质量要求，请点击“一键同步”获取视频质量情况。
                    </div>
                    <div>
                        3.在“低分辨率视频”Tab页面，可以快捷查看并处理低分辨率视频。
                    </div>
                </div>
            </div>   
            <a-table class="fabutable" :columns="columns" :dataSource="listfb" >
                    <span slot="operation" slot-scope="text, record" class="caozuo">
                        <a href="javascript:;" @click="update(record.id)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="confirm(record.id)"  okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm>
                    </span>
            </a-table>   
        </div>
    </div>
</template>
<script>
const columns = [{
        title: '小区名称',
        dataIndex: 'xiaoquName',
        width:'25%',
    }, {
        title: '发布房源标题',
        dataIndex: 'title',
        width:'30 %',
    }, {
        title: '发布信息',
        dataIndex: 'publishStatus',
        width:'35%'
    },{
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width:'10%'
    },
];


export default {
    data() {
        return {
            listfb:[],
            columns,
        }
    },
     activated() {
           this.GetShowList()
        },
    mounted() {
        this.GetShowList()
    },
    methods: {
        update(sid){
            const that = this.$router
            that.replace({
                       name: 'Sell',
                        params: { id: sid }
                 })   
        },
        confirm(id) {
            this.onDeletefb(id)
        },
        async onDeletefb(id) {
                try {
                    await this.$http.post(`${this.$config.api}/api/cms/house/` + id + `/publishDelete`).then(Response => {
                        if (Response.status == 200) {
                            this.$message.success('删除成功！！！');
                            this.GetShowList();
                        }
                    })
                }
                catch (e) {
                    this.$message.warning('系统繁忙，请稍后再试！！！');
                }

            },
        async GetShowList(){
                let update = JSON.parse(localStorage.getItem('update'));
                console.log( update.userId)
                const respones = await this.$http.get(`${this.$config.api}/api/cms/house/publishNoList/` + update.userId);
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
    }
}
</style>