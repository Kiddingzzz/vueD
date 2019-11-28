<template>
        <div class="wrap">
            <a-layout>
                <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                        <span slot="operation" slot-scope="text, record">
                        <a href="javascript:;" @click="onDelete(record.key)">删除</a>
                        <a href="javascript:;" @click="onfabu(record)" >未发布</a>
                        </span>
                        <span slot="customTitles">
                        <a-icon type="smile-o" /> 标题</span>
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
            title: '小区',
            dataIndex: 'xiaoquName',
            key:'det',
            width:'7%'
        },
        {
            dataIndex: 'title',
            key:'biaoti',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'titles' },
            width:'12%'
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
            key:'fangwu',
            width:'8%'
        },
        {
            title: '面积',
            dataIndex: 'square',
            key:'mianji',
            width:'2%'
        },
        {
            title: '价格/万',
            dataIndex: 'rice',
            key:'rice',
            width:'5%'
        },
        {
            title: '朝向',
            dataIndex: 'chaoxiang',
            key:'sq',
            width:'4.5%'
        },
        {
            title: '楼层',
            dataIndex: 'louceng',
            key:'louceng',
            width:'5%'
        },
        {
            title: '更新日期',
            dataIndex: 'creationTime',
            key:'update',
            width:'9%'
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key:'upe',
            width:'8%'
        },
        {
            title: '房龄',
            dataIndex: 'fangwuDate',
            key:'age',
            width:'7%'
        },
        {
            title: '状态',
            dataIndex: 'publishStatus',
            key:'status',
            width:'8%'
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
            key:'simplePrice',
            width:'8%'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
            key:'donation',
            width:'10%'
          
        },
    ];

    export default {
        data() {
            return {
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                list:[],
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
                            text: '全选',
                          
                            onSelect: () => {
                                this.selectedRowKeys = [...Array(46).keys()]; // 0...45
                            },
                        },
                        {
                            key: 'odd',
                            text: '单选',
                            
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
                            text: '双选',
                            
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
                this.selectedRowKeys = selectedRowKeys;
            },
            onDelete(key) {
                const datas = [...this.data];
                this.datas = datas.filter(item => item.key !== key);
            },
            //传房源对象
            onfabu(house) {
               this.$emit("getData",house);
            },
            //
            async seachShow(){
                 const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
                 if(respones.status == 200)
                 {
                    this.list=respones.data.items;
                 }
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