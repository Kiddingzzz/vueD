<template>
<div class="res ant-layout">
    <div class="tsall">
        <div class="filter-wraps" >
                <div class="search_bds" >
                    <div class="tishi">
                        <i class="iconfont icon-tishi"></i>贴心提示:
                    </div>
                    <div>
                        1.带“!”的房源可能图片质量较低，建议点击该符号根据提示修改。
                    </div>
                    <div class="search_bds_red">
                        2.为判断是否满足新三网视频高质量要求，请点击“一键同步”获取视频质量情况。<a-button type="primary" @click="showModal">一键同步</a-button>
                    </div>
                    <div>
                        3.在“低分辨率视频”Tab页面，可以快捷查看并处理低分辨率视频。
                    </div>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="step">
                <a-steps :current="1" >
                <a-step>
                <!-- <span slot="title">第一步</span> -->
                <template slot="title">
                    第一步
                </template>
                <span slot="description">选择房源</span>
                </a-step>
                <a-step title="第二步" description="选择网站" />
                <a-step title="第三步" description="操作完成" />
            </a-steps>
            </div>
            <!-- tab标签页 -->
            <div class="tabcontent">
                <a-tabs @change="callback" type="card">
                    <a-tab-pane tab="住宅" key="1"> 
                        <vtable></vtable>
                    </a-tab-pane>
                    <a-tab-pane tab="别墅" key="2">
                        <vtable></vtable>
                    </a-tab-pane>
                    <a-tab-pane tab="写字楼" key="3">
                        <vtable></vtable>
                    </a-tab-pane>
                </a-tabs>   
            </div>
    </div>
  </div>
</template>
<script>
import vtable from '../../components/vtable'

export default {
    data() {
      return {};
    },
    components: {
            vtable
        },
    methods: {
      callback(key) {
        console.log(key);
      },
    },
  };
</script>

<style lang="less">
    .tsall {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;
        padding: 0px 24px 0px 24px;
        .filter-wraps{
            padding: 24px 0px;
            position: relative;
            display: flex;
            flex: 0 0 auto;
            justify-content: center;
            .search_bds{
                display: flex;
                flex-direction: column;
                background: #ffffdd;
                width: 100%;
                padding: 12px;
                line-height: 26px;
                border-radius: 10px;
                border: 1px solid #ebedf0;
                .tishi{
                    display: flex;
                    align-items: center;
                }
                .search_bds_red{
                    color: red;
                }
            }
        }
        .step{
            padding: 25px 15px 20px 15px;
            background:#ffffff;
            border-radius: 10px;
        }
        .tabcontent{
            padding: 25px 15px;
            border-radius: 10px;
            background: #ffffff;
            margin-top: 20px;
            margin-bottom: 24px;
        }
    }
</style>