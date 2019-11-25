<template>
    <div class="ts">
        <div class="wrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                        <span slot="operation" slot-scope="text, record">
                        <a href="javascript:;" @click="onDelete(record.id)">删除</a>
                        <a href="javascript:;" @click="onfabu(record)" >未发布</a>
                        </span>
                    </a-table>
                </a-layout-content>
            </a-layout>
        </div>
    </div>
</template>
<script>
    const columns = [
        {
            title: '小区',
            dataIndex: 'xiaoQuName',
            key:'188'
        },
        {
            title: '标题',
            dataIndex: 'title',
            key:'177'
        },
        {
            title: '室内图',
            dataIndex: 'imgHeader',
            key:'166'
        },
        {
            title: '房型',
            dataIndex: 'huxing',
            key:'122'
        },
        {
            title: '面积',
            dataIndex: 'square',
            key:'144'
        },
        {
            title: '价格',
            dataIndex: 'rice',
            key:'133'
        },
        {
            title: '朝向',
            dataIndex: 'chaoxiang',
            key:'125'
        },
        {
            title: '楼层',
            dataIndex: 'louceng',
            key:'19'
        },
        {
            title: '更新日期',
            dataIndex: 'creationTime',
            key:'18'
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key:'17'
        },
        {
            title: '房龄',
            dataIndex: 'fangwuDate',
            key:'16'
        },
        {
            title: '状态',
            dataIndex: 'publishStatus',
            key:'15'
        },
        {
            title: '发布历史',
            dataIndex: 'houseType',
            key:'14'
        },
        {
            title: '均价',
            dataIndex: 'simpleRice',
            key:'13'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
            key:'12'
        },
    ];

    export default {
        data() {
            return {
                list:[],
                columns,
                selectedRowKeys: [], // Check here to configure the default column
            };
        },
        computed: {
            rowSelection() {
                const { selectedRowKeys } = this;
                return {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                    hideDefaultSelections: true,
                    selections: [
                        {
                            key: 'all-data',
                            text: 'Select All Data',
                            onSelect: () => {
                                this.selectedRowKeys = [...Array(46).keys()]; // 0...45
                            },
                        },
                        {
                            key: 'odd',
                            text: 'Select Odd Row',
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return false;
                                    }
                                    return true;
                                });
                                this.selectedRowKeys = newSelectedRowKeys;
                            },
                        },
                        {
                            key: 'even',
                            text: 'Select Even Row',
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return true;
                                    }
                                    return false;
                                });
                                this.selectedRowKeys = newSelectedRowKeys;
                            },
                        },
                    ],
                    onSelection: this.onSelection,
                };
            },
        },
        mounted() {
           this.seachShow();
        },
        methods: {
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },
            onDelete(key) {
                console.log(key);
                const data = [...this.data];
                this.data = data.filter(item => item.key !== key);
            },
           async onfabu(id) {
                //  const res=await this.$http.get('${this.$config.api}/api/cms/pubulish/publishList/{id}')
            },
            async seachShow(){
                console.log(`aaa`+this.$store.userId)
                const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
                this.list=respones.data;
            },
        },
    };
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