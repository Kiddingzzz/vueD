<template>
        <div class="susswrap">
            <a-layout>
                <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                        <span slot="inter" slot-scope="res,record">
                            <img class="wangyeimg" :src="record.inter">
                        </span>
                        <span slot="customTitles">
                            <a-icon type="smile-o" /> 标题
                        </span>
                        <template slot="titles" slot-scope="text, record">
                            <a  target="_blank">{{record.title}}</a>
                        </template>
                    </a-table>
                </a-layout-content>
            </a-layout>
        </div>
</template>
<script>
    const columns = [
        {
            title: '已发布网站',
            dataIndex: 'inter',
            key: 'inter',
            scopedSlots: { customRender: 'inter' },
        },
        {
            title: '小区',
            dataIndex: 'xiaoquName',
            key:'det',
            
        },
        {
            dataIndex: 'title',
            key:'biaoti',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'titles' },
           
        },
        // {
        //     title: '首页图',
        //     dataIndex: 'img',
        //     key:'duotu',
        //     width:90
        // },
        {
            title: '面积',
            dataIndex: 'square',
            key:'mianji',
         
        },
        {
            title: '价格/万',
            dataIndex: 'rice',
            key:'rice',
            
        },
        {
            title: '更新日期',
            dataIndex: 'creationTime',
            key:'update',
           
        },
        {
            title: '状态',
            dataIndex: 'publishStatus',
            key:'status',
        },
        // {
        //     title: '发布历史',
        //     dataIndex: 'history',
        //     key:'history',
        //     width:100
        // },
    ];

    export default {
        name: 'susstable',
        data() {
            return {
                columns,
                list:[],
            };
        },
        mounted() {
            this.seachShow();
        },
        methods: {
            onDelete(key) {
                const datas = [...this.data];
                this.datas = datas.filter(item => item.key !== key);
            },
            // //传房源对象
            // onfabu(house) {
            //    this.$emit("getData",house);
            // },
            // //
            // async seachShow(){
            //      const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
            //      if(respones.status == 200)
            //      {
            //         this.list=respones.data.items;
            //      }
            //    },
        },
    };
</script>
<style scoped lang="less">

    .susswrap {
        width: 100%;
        margin: 0 auto;
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