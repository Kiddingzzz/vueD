<template>
    <div class="ant-layout">
        <div class="fabuall">
            <div class="fabufilter-wraps">
                <div class="fabusearch_bds">
                    <div class="saletishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.带“!”的房源可能图片质量较低，建议点击该符号根据提示修改。
                    </div>
                    <div class="search_bds_red">
                        2.为判断是否满足新三网视频高质量要求，请点击“一键同步”获取视频质量情况。
                    </div>
                    <div>
                        3.在“低分辨率视频”Tab页面，可以快捷查看并处理低分辨率视频。
                    </div>
                </div>
            </div>   
            <a-table class="fabutable" :columns="columns" :dataSource="data" >
                    <span slot="operation" slot-scope="text, record" class="caozuo">
                        <a href="javascript:;" @click="update(record)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="confirm(record.id)"  okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </a-popconfirm>
                    </span>
            </a-table>   
        </div>
    </div>
</template>
<script>
const columns = [{
        title: 'Name',
        dataIndex: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
    },{
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default {
    data() {
        return {
            data,
            columns,
        }
    },
    methods: {
        update(record){
            alert('等待修改')
        },
        confirm(id) {
            alert('等待删除')
        }
    },
}
</script>

<style lang="less" scoped>
.fabuall {
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 0 auto;
    padding: 24px 24px 0px 24px;
    .fabufilter-wraps {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        .fabusearch_bds {
            display: flex;
            flex-direction: column;
            background: #ffffdd;
            width: 100%;
            padding: 12px;
            line-height: 26px;
            border-radius: 10px;
            border: 1px solid #ebedf0;
            .saletishi {
                display: flex;
                align-items: center;
            }
            .search_bds_red {
                color: red;
            }
        }
    }
    .fabutable{
        background: white;
        margin: 20px 0;
        padding: 25px 15px;
        border-radius: 10px; 
    }
}
</style>