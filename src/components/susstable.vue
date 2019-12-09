<template>
    <div class="susswrap">
        <a-layout>
            <a-layout-content class="content" :style="{ background: '#fff',margin: 0, minHeight: '280px' }">
                <!-- <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="list">
                    <span slot="inter" slot-scope="res,record">
                        <img class="wangyeimg" :src="record.inter">
                    </span>
                    <span slot="customTitles">
                        <a-icon type="smile-o" /> 标题
                    </span>
                    <template slot="titles" slot-scope="text, record">
                        <a  target="_blank">{{record.title}}</a>
                    </template>
                </a-table> -->
                <div class="content_suss">
                    <i class="iconfont icon-chenggong"></i>
                    <div>您填写的房源出售信息已经发布成功！</div>
                </div>
                <div class="content_btn">
                    <a-button class="goon_btn" type="primary" @click="goon">继续发布</a-button>
                    <a-button @click="redirct()" type="primary">一键录入</a-button>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>
<script>
    // const columns = [
    //     {
    //         title: '已发布网站',
    //         dataIndex: 'inter',
    //         key: 'inter',
    //         scopedSlots: { customRender: 'inter' },
    //     },
    //     {
    //         title: '小区',
    //         dataIndex: 'xiaoquName',
    //         key:'det',

    //     },
    //     {
    //         dataIndex: 'title',
    //         key:'biaoti',
    //         slots: { title: 'customTitles' },
    //         scopedSlots: { customRender: 'titles' },

    //     },
    //     {
    //         title: '面积',
    //         dataIndex: 'square',
    //         key:'mianji',

    //     },
    //     {
    //         title: '价格/万',
    //         dataIndex: 'rice',
    //         key:'rice',

    //     },
    //     {
    //         title: '更新日期',
    //         dataIndex: 'creationTime',
    //         key:'update',

    //     },
    //     {
    //         title: '状态',
    //         dataIndex: 'publishStatus',
    //         key:'status',
    //     },
    // ];

    export default {
        name: 'susstable',
        data() {
            return {
                // columns,
                // list:[],
                current: 0,
            };
        },
        mounted() {
            // this.seachShow();
            console.log(this.salevalue)
        },
        methods: {
            // onDelete(key) {
            //     const datas = [...this.data];
            //     this.datas = datas.filter(item => item.key !== key);
            // },
            goon() {
                this.$emit('goonfun', this.current)
            },
            redirct() {
                this.$router.replace('/sell')
            },
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
            align-items: center;
            justify-content: space-around;

            .content_suss {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 25px;
            }

            .content_btn {
                display: flex;

                .goon_btn {
                    margin-right: 20px;
                }
            }
        }
    }

    // .filter-wrap {
    //     position: relative;
    //     display: flex;
    //     flex: 0 0 auto;
    //     justify-content: center;
    // }

    // .filter-wrap .search_bd .secitem dd a.select {
    //     color: #ff552e;
    // }

    // .search_bd {
    //     background: #fff;
    //     display: flex;
    //     flex-flow: column;
    //     width: 100%;
    //     padding: 24px 24px 0px 24px;
    //     border-radius: 10px;
    //     border: 1px solid #ebedf0;
    // }

    // .filter-wrap .search_bd .secitem dt {
    //     color: #888;
    //     width: 36px;
    //     font-size: 12px;
    //     height: 18px;
    //     line-height: 18px;
    //     float: left;
    // }

    // .ant-table-row ant-table-row-level-0 {
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // }
</style>