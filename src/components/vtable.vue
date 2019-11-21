<template>
        <div class="wrap">
            <a-layout>
                <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
                        <span slot="operation" slot-scope="text, record">
                        <a href="javascript:;" @click="onDelete(record.key)">删除</a>
                        <a href="javascript:;" @click="onfabu(record.key)" >未发布</a>
                        </span>
                    </a-table>
                </a-layout-content>
            </a-layout>
        </div>
</template>
<script>
    const columns = [
        {
            title: '小区',
            dataIndex: 'xiaoQuName',
        },
        {
            title: '标题',
            dataIndex: 'name',
        },
        {
            title: '多图',
            dataIndex: 'imglist',
        },
        {
            title: '房型',
            dataIndex: 'houseType',
        },
        {
            title: '面积',
            dataIndex: 'square',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '朝向',
            dataIndex: 'see',
        },
        {
            title: '楼层',
            dataIndex: 'louceng',
        },
        {
            title: '更新日期',
            dataIndex: 'modifyCreationtime',
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
        },
        {
            title: '房龄',
            dataIndex: 'age',
        },
        {
            title: '状态',
            dataIndex: 'type',
        },
        {
            title: '发布历史',
            dataIndex: 'history',
        },
        {
            title: '均价',
            dataIndex: 'simplePrice',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];

    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            xiaoQuName:'花卉园',
            name: `Edward King ${i}`,
            age: 32,
            simplePrice: ` ${i+1}元`,
        });
    }

    export default {
        name: 
        'vtable',
        data() {
            return {
                data,
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
            onfabu(key) {
                console.log(key);
               
            },
        },
    };
</script>
<style scoped lang="less">

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