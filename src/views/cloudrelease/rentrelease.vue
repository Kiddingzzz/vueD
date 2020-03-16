<template>
    <div class="res ant-layout">
        <div class="rentall">
            <div class="rentfilter-wraps" v-if="current==0">
                <div class="rentsearch_bds">
                    <div class="renttishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.需要发布的房源请进行勾选，勾选后选择“批量发布”按钮即可进行发布。
                    </div>
                    <div class="search_bds_red">
                        2.修改房源后请记得保存。
                    </div>
                    <div>
                        3.发布后的房源结果在“发布结果”界面可进行查看。
                    </div>
                </div>
            </div>
            <!-- 导航进度条 -->
            <div class="step">
                <a-steps :current="current">
                    <a-step title="第一步" description="选择房源" />
                    <a-step title="第二步" description="选择网站" />
                    <a-step title="第三步" description="操作完成" />
                </a-steps>
            </div>
            <!-- 2、3步提示 -->
            <div class="rentfilter-wraps" v-if="current==1">
                <div class="rentsearch_bds">
                    <div class="tishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.如果您希望使用的账号不在其中，您可以马上<a-button type="link" @click="adduser">添加账号</a-button> 。
                    </div>
                    <div>
                        2.如果您希望修改"库存满时"与"房源重复"的发送处理方式，请进入<a-button type="link">个人设置</a-button>。
                    </div>
                    <div>
                        3.库存满时，不想自动删除最旧房源，发布时推送设置可以选择待上架，再去网站后台上架房源。
                    </div>
                </div>
            </div>
            <div class="rentfilter-wraps" v-if="current==2">
                <div class="rentsearch_bds">
                    <div class="tishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.如果您希望使用的账号不在其中，您可以马上<a-button type="link">添加账号</a-button> 。
                    </div>
                    <div>
                        2.如果您希望修改"库存满时"与"房源重复"的发送处理方式，请进入<a-button type="link">个人设置</a-button>。
                    </div>
                    <div>
                        3.库存满时，不想自动删除最旧房源，发布时推送设置可以选择待上架，再去网站后台上架房源。
                    </div>
                </div>
            </div>
            <!-- tab标签页 -->
            <div class="tabcontent" v-if="current==0">
                <a-tabs type="card" v-model="activeKey">
                    <a-tab-pane tab="住宅" :key="1">
                        <rentvtable @getRenTingData="getRenTingMag"  @RtgetDataList="RtgetMagList"></rentvtable>
                    </a-tab-pane>
                    <!-- <a-tab-pane tab="商铺" :key="2">
                        <rentshangpu></rentshangpu>
                    </a-tab-pane> -->
                    <!-- <a-tab-pane tab="写字楼" key="3">
                        <rentvtable></rentvtable>
                    </a-tab-pane> -->
                </a-tabs>
            </div>

            <div class="tabcontent" v-if="current==1">
                <rentinter @getSeconde="getSeconds" :array='RtQunFalist' :value="RenTingbieshu"></rentinter>
            </div>

            <div class="tabcontent" v-if="current==2">
                <rentsusstable @goonfun="getcurrentFormSon" :spintime="spintime" :checkedKey="activeKey"></rentsusstable>
            </div>
            <!-- 上/下一步 -->
            <div class="pre">
                <a-button type="primary" @click="pre" v-if="current==1">上一步</a-button>
                <!-- <a-button type="primary"  @click="goon" v-if="current==2">继续发布</a-button> -->
            </div>

        </div>
    </div>
</template>
<script>
    import rentvtable from '../../components/rentvtable'
    import rentinter from '../../components/rentinter'
    import rentsusstable from '../../components/rentsusstable'
    import rentshangpu from '../cloudrelease/components/rentshangpu'

    export default {
        data() {
            return {
                activeKey: 1,
                current: 0,
                selectedRowKeys: [], // Check here to configure the default column
                list: [],
                houselist: {},
                RenTingbieshu: {},
                RtQunFalist: [],
                spintime: '',
            };
        },
        components: {
            rentvtable,
            rentinter,
            rentsusstable,
            rentshangpu,
        },
        watch:{   //监听路由变化
            $route( to , from ){   
           //  console.log( to , from )
                this.current = 0;
                if(to.path == '/rentrelease'&& from.path == '/shangpuzuluru'){
                    this.activeKey = 2
                }
            }
        },
        methods: {
            adduser() {
                this.$router.replace('/zhandian')
            },

            pre() {
                if (this.current-- < 1){
                    this.current = 0;
                    this.RtQunFalist = []
                }
                  this.RtQunFalist = []
            },
            //继续发布
            //   goon(){           
            //         this.current = 0;
            //   },
            getcurrentFormSon(data) {
                this.current = data
            },
            //接受house对象 
            getRenTingMag(house) {
                this.houselist = house;
                if (this.houselist != "" && this.houselist != undefined) {
                    this.current = 1;
                    this.RenTingbieshu = this.houselist;
                }
            },
            RtgetMagList(houseLists){
                // console.log("house:"+JSON.stringify(houseLists))
                if (houseLists.length>0) {
                    this.current = 1;
                    this.RtQunFalist = houseLists;
                }
            },
            //第二步操作跳转第三步
            getSeconds(current,length) {
                this.current = current
                this.spintime = length
                this.spintime = length
            }
        },
    };
</script>

<style lang="less" >
    .renttishi {
        display: flex;
        align-items: center;
    }
    .rentall {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        padding: 24px 24px 0px 24px;

    }

    .rentfilter-wraps {
        padding: 24px 0px;
        position: relative;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .rentsearch_bds {
        display: flex;
        flex-direction: column;
        background: #ffffdd;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .search_bds_red {
        color: red;
    }

    .step {
        padding: 25px 15px 20px 15px;
        background: #ffffff;
        border-radius: 10px;
    }

    .tabcontent {
        padding: 25px 15px;
        border-radius: 10px;
        background: #ffffff;
        margin-top: 20px;
        margin-bottom: 24px;
    }

    .pre {
        height: 60px;
        width: 100%;
        margin: 20px 24px 50px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .next {
        margin-right: 20px;
    }
</style>