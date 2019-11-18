<template>
    <div class="ts">
        <div class="wrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">

                    <a-table :columns="columns" :dataSource="list">
                        <span slot="customTitle">
                            <a-icon type="smile-o" />编号</span>
                    </a-table>
                </a-layout-content>
            </a-layout>
        </div>
    </div>
</template>
<script>
    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'id' },
            width: 100
        },
        {
            title: '路径',
            dataIndex: 'url',
            key: 'url',
            width: 140
        },
        {
            title: '是否发布',
            dataIndex: 'isLife',
            key: 'isLife',
            width: 110
        },
        {
            title: '创建时间',
            dataIndex: 'creationTime',
            key: 'creationTime',
            width: 140
        },
    ];
    export default {
        data() {
            return {
                url: '11',
                visible: false,
                spinning: false,
                confirmLoading: false,
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                columns,
                list: [],
                visible: false,
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                },
            }
        },
        mounted() {
            this.GetList();
        },
        methods: {
            async GetList() {
                var res = await this.$http.get(`http://localhost:57992/api/cms/urls/urllist`)
                console.log(JSON.stringify(res.data.items))
                this.list = res.data.items;
            }
        },
    }

</script>
<style lang="less">
    .wrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .ts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
    }

    .filter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .filter-wraps .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .sale-content-tip {
        margin: 8px 0;
        background-color: #ffffdd;
        padding: 8px;
        border: 1px solid #fcfcb3;
        border-radius: 5px;
        font-size: 12px;
    }

    .search_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;
        height: 110px;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .filter-wraps .search_bds .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .fontU {
        position: absolute;
        bottom: 50px;
        right: 0px;
    }

    .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sale-content-tip li {
        line-height: 20px;
        font-size: 12px;
        list-style: none;
    }

    .ant-modal-content {
        width: 800px;
        height: 700px;
    }

    li {
        list-style: none;
    }

    .ant-modal-body {
        height: 85%;
    }
</style>