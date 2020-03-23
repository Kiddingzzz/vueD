<template>
    <div class="wrap">
        <a-layout>
            <a-layout-content :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
            <div style="margin-bottom: 16px;display:flex;flex-direction: row-reverse;margin-top:-55px;">
                    <a-button type="primary" @click="RtDeleteList" :disabled="!hasSelected" :loading="loadingRenTing">
                        批量删除
                    </a-button>
                    <a-button style="margin-right: 8px" type="primary" @click="start" :disabled="!hasSelected"
                        :loading="loadingFb">
                        批量发布
                    </a-button>
                    <!--<span style="margin-left: 8px">
                        <template v-if="hasSelected">
                            {{`Selected ${selectedRowKeys.length} items`}}
                        </template>
                    </span>-->
                </div>
                <a-table :scroll="{ x:'calc(750px + 50%)'}" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="list" :customRow="handleClickRow">
                    <span slot="operation" slot-scope="text, record">
                        <a href="javascript:;" @click="ZuupdateItem(record.id)">修改</a>
                        <a-popconfirm title="确定删除么？" @confirm="confirm(record.id)" okText="确认" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm>
                        <!-- <a href="javascript:;" @click="onfabu(record)">未发布</a> -->
                    </span>
                    <span slot="customTitles">
                        <a-icon type="smile-o" /> 标题</span>
                    <template slot="renTingTitle" slot-scope="text, record">
                        <a target="_blank">{{record.renTingTitle}}</a>
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
            key: 'xiaoquName',
            width: '8%'
        },
        {
            dataIndex: 'renTingTitle',
            key: 'renTingTitle',
            slots: { title: 'customTitles' },
            scopedSlots: { customRender: 'renTingTitle' },
            width: '13%'
        },
        // {
        //     title: '首页图',
        //     dataIndex: 'img',
        //     key:'duotu',
        //     width:90
        // },
        {
            title: '房型',
            dataIndex: 'renTingHuXing',
            key: 'renTingHuXing',
            width: '7%'
        },
        {
            title: '面积',
            dataIndex: 'renTingMianji',
            key: 'renTingMianji',
            width: '6.5%'
        },
        {
            title: '价格',
            dataIndex: 'renTingZujin',
            key: 'renTingZujin',
            width: '5.5%'
        },
        {
            title: '朝向',
            dataIndex: 'renTingChaoxiang',
            key: 'renTingChaoxiang',
            width: '6.5%'
        },
        {
            title: '楼层',
            dataIndex: 'renTingLouceng',
            key: 'renTingLouceng',
            width: '5.7%'
        },
        {
            title: '更新日期',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '9.8%'
        },
        {
            title: '装修',
            dataIndex: 'zhuangxiu',
            key: 'zhuangxiu',
            width: '8%'
        },
        {
            title: '租房方式',
            dataIndex: 'renTingType',
            key: 'renTingType',
            width: '7.6%'
        },
       
        // {
        //     title: '发布历史',
        //     dataIndex: 'history',
        //     key:'history',
        //     width:100
        // },
        {
            title: '区域',
            dataIndex: 'renTingQuyu',
            key: 'renTingQuyu',
            width: '7%'
        },
         {
            title: '状态',
            dataIndex: 'renTingComplet',
            key: 'RenTingComplet',
            width: '7%'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
            key: 'donation',
            // width: '12%',
            width: 70,
            fixed: 'right',
        },
    ];

    export default {
        data() {
            return {
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                list: [],
                loadingRenTing:false,
                loadingFb:false,
                selectedRows: [],
                select: true,
            };
        },
         computed: {
            // rowSelection() {
            //     const { selectedRowKeys } = this;
            //     return {
            //         onChange: (selectedRowKeys, selectedRows) => {
            //             this.selectedRowKeys = selectedRows;
            //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            //             this.index = selectedRowKeys
            //         },
            //         // getCheckboxProps: record => ({
            //         //     props: {
            //         //         // disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //         //         // name: record.name,console.log(record),
            //         //     }
            //         // }),
            //     };
            // },
            hasSelected() {
                // console.log(this.selectedRowKeys)
                return this.selectedRowKeys.length > 0;
            },
        },
        mounted() {
            this.RtseachShow();
        },
        activated(){
            this.RtseachShow();
        },
        methods: {
            handleClickRow(record, index){
                return {
                    on: {
                        click: () => {
                            if(this.select==true){
                                this.selectedRowKeys.push(index)
                                this.selectedRows.push(record)
                            }else{
                                this.selectedRowKeys = [] 
                                this.selectedRows = []
                            }
                            // this.select = !this.select   
                        }
                    }
                }
            },
            onSelectChange (selectedRowKeys,selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
           start() {
                this.loadingFb = true;
                this.$emit("RtgetDataList", this.selectedRows);
                    setTimeout(() => {
                        this.loadingFb = false;
                        this.selectedRowKeys = [];
                    }, 1000);
            },
            
            //删除
            async onRenDelete(id) {
                try {
                    await this.$http.post(`${this.$config.api}/api/cms/renTing/` + id + `/renTingPubDelete`).then(Response => {
                        if (Response.status == 200) {
                            // const datas = [...this.data];
                            // this.datas = datas.filter(item => item.key !== key)
                            // this.list.splice(index,1)
                            this.$message.success('删除成功！！！');
                            this.selectedRowKeys = [];
                            // console.log(this.selectedRowKeys)
                            this.RtseachShow();
                        }
                    })
                }
                catch (e) {
                    this.$message.warning('系统繁忙，请稍后再试！！！');
                }

            },
            ZuupdateItem(sid) {           
                const that = this.$router
                that.replace({
                        name: 'Lease',
                            params: { id: sid }
                    })  
            },
            ///多条删除
            async  RtDeleteList(){
                  this.loadingRenTing = true;
                  let that=this
                 const idlist=[]
                 for(var i=0;i<this.selectedRows.length;i++){
                   idlist.push(this.selectedRows[i].id)
                }
               try{
                    await this.$http.post(`${this.$config.api}/api/cms/renTing/renTingDeletelist`,idlist).then(Response => {
                    if(Response.data.code=="200")
                    {       
                           that.$message.success(Response.data.msg);  
                           that.RtseachShow();
                           that.loadingRenTing = false;
                           that.selectedRowKeys = [];
                    }
                })
               }
               catch(e){
                   that.$error({
                        title: '提示',
                        content: '删除失败，系统繁忙，请重新执行',
                        okText:'确定',
                        onOk(){
                           that.loadingRenTing = false;
                           that.selectedRowKeys = [];
                        }
                    });
                    
               }
              

            },

            async  onfabu(house) {
              this.$emit("getRenTingData", house);
            },
            //
            async RtseachShow() {
                //const respones = await this.$http.get(`${this.$config.api}/api/cms/pubulish/publishList/`+this.$store.userId);
                let update = JSON.parse(localStorage.getItem('update'));
                const respones = await this.$http.get(`${this.$config.api}/api/cms/renTing/renTingPubList/` + update.userId);
                if (respones.status == 200) {
                    this.list = respones.data.items;
                }
            },
            confirm(id) {
                this.onRenDelete(id)
            }
        },

    }

</script>
<style scoped lang="less">
/deep/.ant-table-tbody>tr>td {
        padding: 16px 10px !important;
    }
 /deep/.ant-table-tbody>tr>td a{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;  // 控制多行的行数
        -webkit-box-orient: vertical;
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