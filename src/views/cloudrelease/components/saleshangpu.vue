<template>
    <div class="wrap">
        <a-layout>
            <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                    <span slot="operation" slot-scope="text, record">
                        <p title="确定删除么？" @confirm="sconfirm(record.id)" okText="确认" cancelText="取消">
                            <a href="#">删除</a>
                        </p>
                        <a href="javascript:;" @click="shoponfabu(record)">未发布</a>
                    </span>
                    <span slot="customTitles">
                        <a-icon type="smile-o" /> 创建时间</span>
                    <template slot="creationTime" slot-scope="text, record">
                        <a target="_blank">{{record.creationTime}}</a>
                    </template>
                </a-table>
            </a-layout-content>
        </a-layout>
    </div>
</template>
<script>
    const columns = [
        {
            title: '标题',
            dataIndex: 'shopTitle',
            key: 'shopTitle',
            width: '13%'
        },
        {
            dataIndex: 'cretime',
            key: 'creationTime',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'creationTime' },
            width: '10%'
        },
        // {
        //     title: '首页图',
        //     dataIndex: 'img',
        //     key:'duotu',
        //     width:90
        // },
        {
            title: '价格',
            dataIndex: 'shopRice',
            key: 'shopRice',
            width: '6%'
        },
        {
            title: '面积',
            dataIndex: 'shopSquare',
            key: 'shopSquare',
            width: '5.5%'
        },
        {
            title: '物业类型',
            dataIndex: 'shopWuyeType',
            key: 'shopWuyeType',
            width: '7.5%'
        },
        {
            title: '楼层',
            dataIndex: 'shoplouceng',
            key: 'shoplouceng',
            width: '5.5%'
        },
        {
            title: '地址',
            dataIndex: 'shopAdress',
            key: 'shopAdress',
            width: '8.7%'
        },
        {
            title: '经营状态',
            dataIndex: 'jingyingZt',
            key: 'jingyingZt',
            width: '7.8%'
        },
        {
            title: '预期收入',
            dataIndex: 'yuqiShouyi',
            key: 'yuqiShouyi',
            width: '8%'
        },
        {
            title: '相关费用',
            dataIndex: 'xiangguanFy',
            key: 'xiangguanFy',
            width: '7.3%'
        },
        {
            title: '状态',
            dataIndex: 'shopReleaseType',
            key: 'shopReleaseType',
            width: '6%'
        },
        // {
        //     title: '发布历史',
        //     dataIndex: 'history',
        //     key:'history',
        //     width:100
        // },
        {
            title: '来源',
            dataIndex: 'shopSource',
            key: 'shopSource',
            width: '7%'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
            key: 'donation',
            width: '11%'

        },
    ];

    export default {
        data() {
            return {
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                list: [],
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
            this.ShopseachShow();
        },
        methods: {
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },

            //删除
            async shoponDelete(id) {
                 console.log(id)
                try{
                   await this.$http.post(`${this.$config.api}/api/cms/shopPub/`+id+`/shoplishDelete`).then(Response=>{
                       if(Response.status==200)
                       {
                           console.log(Response)
                        // const datas = [...this.data];
                        // this.datas = datas.filter(item => item.key !== key)
                        this.$message.success('删除成功！！！');
                        this.ShopseachShow();
                       }   
                   })
                }
                catch(e){    
                    this.$message.warning('系统繁忙，请稍后再试！！！');
                }

            },
             async shoponfabu(record) {
              // console.log("respones.house222:"+this.$store.userId)
              let update = JSON.parse(localStorage.getItem('update'));
                  try{
                      // await this.$http.get(`${this.$config.api}/api/cms/sites/userInter?userid=`+this.$store.userId).then(Response=>{
                     await this.$http.get(`${this.$config.api}/api/cms/sites/userInter?userid=`+update.userId).then(Response=>{
                       if(Response.status==200)
                       {
                            if(Response.data=="yes"){
                              this.$emit("getData",record);
                            }
                            else{
                                let that = this;
                                const h = that.$createElement;
                                that.$info({ title: '提示', okText:'去添加', content: h('div', {}, [h('p', '您还未添加发布网站，请先添加'), ]),
                                onOk() {
                                    that.$router.replace('/zhandian')
                                },
                                }); 
                            }
                          
                       }   
                   })
                }
                catch(e){    
                    this.$message.warning('系统遇到了点问题，请重试');         
                }
            },
            
            async ShopseachShow() {
                //const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
                let update = JSON.parse(localStorage.getItem('update'));
                const respones = await this.$http.get(`${this.$config.api}/api/cms/shopPub/showlishList/` + update.userId);
                if (respones.status == 200) {
                    console.log("商铺数据：" + JSON.stringify(respones))
                    this.list = respones.data.items;
                }
            },
            sconfirm(id) {
                this.shoponDelete(id)
            }
        },

    }

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