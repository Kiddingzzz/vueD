<template>
    <div class="susswrap">
        <a-layout>
            <a-layout-content class="content" :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
               
                <!-- <div class="content_suss">
                    <i class="iconfont icon-chenggong"></i>
                    <div>房源已成功上传,系统审核完成后会通知您。</div>
                </div> -->
                <a-table class="fabutable" :columns="columns" :dataSource="listfb" >
                    <span slot="operation" slot-scope="text, record" class="caozuo">
                        <!-- <a href="javascript:;" @click="update(record.id)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="confirm(record.id)"  okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm> -->
                        <div class="yes" v-if="backMsg"><i class="iconfont icon-chenggong"></i><span>审核成功</span></div>
                        <div class="yes"><i class="iconfont icon-shibai"></i><span>审核失败</span></div>
                    </span>
                </a-table> 
                <div class="content_btn">
                    <a-button type="primary" class="goon_btn" @click="goon">继续发布</a-button>
                    <a-button type="primary" class="goon_btn" @click="redirct()">一键录入</a-button>
                </div>
            </a-layout-content>
        </a-layout>
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
        width:'40 %',
    }, {
        title: '审核信息',
        dataIndex: 'publishStatus',
        width:'25%'
    },{
        title: '审核结果',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width:'10%'
    },
];    
    export default {
        name: 'susstable',
        data() {
            return {
                listfb:[],
                columns,
                backMsg: false,
            };
        },
        mounted() {
            // this.seachShow();
            console.log(this.salevalue)
            this.GetShowList()
        },
        activated() {
           this.GetShowList()
        },
        methods: {
            // onDelete(key) {
            //     const datas = [...this.data];
            //     this.datas = datas.filter(item => item.key !== key);
            // },
            goon() {
                this.$emit('goonfun', 0)
            },
            redirct() {
                this.$router.replace('/sell')
            },
            backlist(){
                this.$router.replace('/fuburesult')
            },
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
                    
                        this.listfb = respones.data.items;

                    }
            }
        },
    };
</script>
<style scoped lang="less">
    .susswrap {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex: 0 0 auto;

        .content {
            display: flex;
            flex-direction: column;
            .fabutable{
                .caozuo{
                    .yes{
                        display: flex;
                        align-items: center;
                    }
                }
            }
            // .content_suss {
            //     display: flex;
            //     flex-direction: column;
            //     align-items: center;
            //     font-size: 25px;
            // }
            .content_btn {
                display: flex;
                justify-content: flex-end;
                .goon_btn {
                    margin: 20px 0 20px 20px;
                }
            }
        }
    }
</style>