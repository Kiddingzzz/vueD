<template>
    <div class="res ant-layout">
        <div class="tsall">
            <div class="tsfilter-wraps" v-if="current==0">
                <div class="tssearch_bds">
                    <div class="saletishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.带“!”的房源可能图片质量较低，建议点击该符号根据提示修改。
                    </div>
                    <div class="search_bds_red">
                        2.为判断是否满足新三网视频高质量要求，请点击“一键同步”获取视频质量情况。<a-button type="primary">一键同步</a-button>
                    </div>
                    <div>
                        3.在“低分辨率视频”Tab页面，可以快捷查看并处理低分辨率视频。
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
            <div class="tsfilter-wraps" v-if="current==1">
                <div class="tssearch_bds">
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
            <div class="tsfilter-wraps" v-if="current==2">
                <div class="tssearch_bds">
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
                <a-tabs type="card" v-model="activeKey" @change="callback">
                    <a-tab-pane tab="住宅" :key="1">
                        <vtable @getData="getMag" @getDataList="getMagList"></vtable>
                    </a-tab-pane>
                    <a-tab-pane tab="商铺" :key="2">
                        <saleshangpu @getData="getMag"></saleshangpu>
                    </a-tab-pane>
                    <!-- <a-tab-pane tab="写字楼" :key="3">
                        <vtable></vtable>
                    </a-tab-pane> -->
                </a-tabs>
            </div>

            <div class="tabcontent" v-if="current==1">
                <seleinter @getSeconde="getSeconds" :array='QunFalist' :value="bieshu"></seleinter>
            </div>

            <div class="tabcontent" v-if="current==2">
                <susstable @goonfun="getcurrentFormSon"></susstable>
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
    import vtable from '../../components/vtable'
    import seleinter from '../../components/seleinter'
    import susstable from '../../components/susstable'
    import saleshangpu from '../cloudrelease/components/saleshangpu'

    export default {
        components: {
            vtable,
            seleinter,
            susstable,
            saleshangpu
        },
        data() {
            return {
                activeKey: 1,
                current: 0,
                selectedRowKeys: [], // Check here to configure the default column
                list: [],
                houselist: {},
                bieshu: {},
                array:[],
                QunFalist:[],
            };
        },
        watch:{   //监听路由变化
            $route( to , from ){   
           //  console.log( to , from )
            if(to.path == '/salerelease'&& from.path == '/shangpuluru'){
                this.activeKey = 2
            }
            if(to.path == '/salerelease'&& from.path == '/zhandian'){
                this.current = 0;
            }
                // to , from 分别表示从哪跳转到哪，都是一个对象
                // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
            }
        },
        methods: {
            callback(key) {
               // console.log('点击tab改变'+key);
                this.activeKey = key
            },
            adduser() {
                this.$router.replace('/zhandian')
            },

            pre() {
                if (this.current-- < 1){
                     this.current = 0;
                     this.bieshu = [];
                     this.QunFalist = [];
                }
                    this.bieshu = [];
                     this.QunFalist = [];
            },
            //继续发布
            //   goon(){           
            //         this.current = 0;
            //   },
            getcurrentFormSon(data) {
                this.current = data
            },
            //接受house对象 
            getMag(house) {
                console.log("house:"+JSON.stringify(house))
                if (house != "" && house != undefined) {
                this.current = 1;
                this.bieshu = house;
                }
                
            },
            getMagList(houseLists){
                console.log("house:"+JSON.stringify(houseLists))
                if (houseLists.length>0) {
                    this.current = 1;
                    this.QunFalist = houseLists;
                }
            },
            //第二步操作跳转第三步
            getSeconds(message) {
                if (message == 'a') {
                    this.current = 2;
                }
            }
        },
    };
</script>

<style lang="less">
    .saletishi {
        display: flex;
        align-items: center;
    }
    .tsall {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        padding: 24px 24px 0px 24px;

    }

    .tsfilter-wraps {
        padding: 24px 0px;
        position: relative;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;

    }

    .tssearch_bds {
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