<template>
    <div class="wrap">
        <a-layout>
            <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                <div style="margin-bottom: 16px;display:flex;flex-direction: row-reverse;margin-top:-55px;">
                    <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">
                        批量删除
                    </a-button>
                    <a-button style="margin-right: 8px" type="primary" @click="start" :disabled="!hasSelected"
                        :loading="loading">
                        批量发布
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected">
                            {{`Selected ${selectedRowKeys.length} items`}}
                        </template>
                    </span>
                </div>
                 <a-modal
                        style="margin-top:-36px;"
                        width='80vw'
                        title="修改房源"
                        v-model="visible"
                        @ok="hideModal"
                        okText="确认"
                        cancelText="取消"
                        :destroyOnClose="true"
                        >
                        <updatesalefang :list = updatelist ></updatesalefang>
                </a-modal>
                <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                    <span slot="operation" slot-scope="text, record" class="caozuo">
                        <a href="javascript:;" @click="updateItem(record)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="confirm(record.id)"  okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm>
                        <a href="javascript:;" @click="onfabu(record)">未发布</a>
                    </span>
                    <span slot="customTitles">
                        <a-icon type="smile-o" /> 标题</span>
                    <template slot="titles" slot-scope="text, record">
                        <span target="_blank">{{record.title}}</span>
                    </template>
                </a-table>
            </a-layout-content>
        </a-layout>
    </div>
</template>
<script>
    import updatesalefang from '../views/cloudrelease/components/updatesalefang'
    const columns = [
        {
            title: '小区',
            dataIndex: 'xiaoquName',
            key: 'det',
            width: '7.5%'
        },
        {
            dataIndex: 'title',
            key: 'biaoti',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'titles' },
            width: '12.5%'
        },
        // {
        //     title: '首页图',
        //     dataIndex: 'img',
        //     key:'duotu',
        //     width:90
        // },
        {
            title: '房型',
            dataIndex: 'huxing',
            key: 'fangwu',
            width: '7%'
        },
        {
            title: '面积',
            dataIndex: 'square',
            key: 'mianji',
            width: '5.5%'
        },
        {
            title: '价格',
            dataIndex: 'rice',
            key: 'rice',
            width: '5.5%'
        },
        {
            title: '朝向',
            dataIndex: 'chaoxiang',
            key: 'sq',
            width: '6%'
        },
        {
            title: '楼层',
            dataIndex: 'louceng',
            key: 'louceng',
            width: '6.7%'
        },
        {
            title: '更新日期',
            dataIndex: 'creationTime',
            key: 'update',
            width: '9.8%'
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key: 'upe',
            width: '8%'
        },
        {
            title: '房龄',
            dataIndex: 'fangwuDate',
            key: 'age',
            width: '7.3%'
        },
        {
            title: '状态',
            dataIndex: 'publishStatus',
            key: 'status',
            width: '7%'
        },
        // {
        //     title: '发布历史',
        //     dataIndex: 'history',
        //     key:'history',
        //     width:100
        // },
        {
            title: '均价/㎡',
            dataIndex: 'simpleRice',
            key: 'simplePrice',
            width: '7.2%'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
            key: 'donation',
            width: '12%'

        },
    ];

    export default {
        components: {
            updatesalefang,
        },
        data() {
            return {
                visible: false,
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                loading: false,
                list: [],
                updatelist: [],
            };
        },
        computed: {
            rowSelection() {
                const { selectedRowKeys } = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                    this.selectedRowKeys = selectedRows;
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                };
            },
            hasSelected() {
                console.log(this.selectedRowKeys)
                return this.selectedRowKeys.length > 0;
            },
        },
        mounted() {
            this.seachShow();
        },
        methods: {
            //修改
            updateItem(iditem) {
                this.visible = true
                this.updatelist = iditem
                // console.log(iditem)
            },
            hideModal() {
                this.visible = false
            },
            start() {
                this.loading = true;
                // ajax request after empty completing
                console.log("respones.house:" + JSON.stringify(this.selectedRowKeys))
                this.$emit("getDataList", this.selectedRowKeys);
                setTimeout(() => {
                    this.loading = false;
                    this.selectedRowKeys = [];
                }, 1000);
            },
            //删除
            async onDelete(id) {
                console.log("asdgsdfgsdrfgsdfsdfhsfdhsfthsfdtgsh")
                try {
                    await this.$http.post(`${this.$config.api}/api/cms/house/` + id + `/publishDelete`).then(Response => {
                        if (Response.status == 200) {
                            console.log(Response)
                            // const datas = [...this.data];
                            // this.datas = datas.filter(item => item.key !== key)
                            this.$message.success('删除成功！！！');
                            this.seachShow();
                        }
                    })
                }
                catch (e) {
                    this.$message.warning('系统繁忙，请稍后再试！！！');
                }

            },
            //传房源对象并判断此账号是否已有添加网站
            onfabu(record) {
                // // console.log("respones.house222:"+this.$store.userId)
                // let update = JSON.parse(localStorage.getItem('update'));
                // console.log("respones.house222:" + update.userId)
                // try {
                //     // await this.$http.get(`${this.$config.api}/api/cms/sites/userInter?userid=`+this.$store.userId).then(Response=>{
                //     await this.$http.get(`${this.$config.api}/api/cms/sites/userInter?userid=` + update.userId).then(Response => {
                //         console.log("respones.house2222:" + JSON.stringify(Response))
                //         if (Response.status == 200) {
                //             if (Response.data == "yes") {
                // console.log("respones.house:" + JSON.stringify(record))
                this.$emit("getData", record);
                // }
                //             else {
                //                 let that = this;
                //                 const h = that.$createElement;
                //                 that.$info({
                //                     title: '提示', okText: '去添加', content: h('div', {}, [h('p', '您还未添加发布网站，请先添加'),]),
                //                     onOk() {
                //                         that.$router.replace('/zhandian')
                //                     },
                //                 });
                //             }

                //         }
                //     })
                // }
                // catch (e) {
                //     this.$message.warning('系统遇到了点问题，请重试');
                // }
            },
            //获取房源列表
            async seachShow() {
                // const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
                let update = JSON.parse(localStorage.getItem('update'));
                const respones = await this.$http.get(`${this.$config.api}/api/cms/house/publishList/` + update.userId);
                if (respones.status == 200) {
                    //console.log("respones.status:"+JSON.stringify(respones))
                    this.list = respones.data.items;

                }
            },
            confirm(id) {

                this.onDelete(id)
            }
        },

    }

</script>
<style scoped lang="less">
    .caozuo{
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .wrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .filter-wrap {
        position: relative;

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

    .filter-wrap .search_bd .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>