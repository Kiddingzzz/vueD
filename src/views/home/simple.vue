<template>
    <div class="ts">
        <div class="filter-wraps" style="padding: 24px 24px 0px 24px;">
            <div class="search_bds">
                <div>
                    贴心提示:
                </div>
                <div>
                    1.随时抓取经纪人在外网发布的任意一套房源信息，方便、快捷、高效。
                </div>
                <div>
                    2.针对房源图片可以完美去除网站LOGO水印。<a-button type="primary" @click="showModal">一键录入</a-button>
                </div>
                </div>
            </div>
            <a-modal title="秒录房源" v-model="visible" @ok="handleOk">
                <p>1.点击网站logo可以快速进入对应的网站查看房源:(不会使用?查看帮助)</p>
                <p>2.把需要获取的房源地址粘贴到文本框中,点击“立即秒录”:
                    <br /><br />
                    <a-input-search
                    placeholder="复制链接"
                    @search="onSearch"
                    enterButton="立即秒录"
                    size="large"
                    />
                </p>
                <div class="fontU">
                <ul class="sale-content-tip clear" style="margin:0px">
                    <li><span>贴心提示:</span></li>
                    <li><span>1.由于最近安居客、58、赶集对图片审核比较严格，尽量不要秒录图片带有网站水印的房源;图例</span></li>
                    <li><span>2.秒入图片小于600*450自动过滤;</span></li>
                    <li><span>3.本功能暂时只支持秒录 58同城、安居客、房天下、
                    今题网、去114网、新浪网、焦点网、列表网、第一时间房源网、
                    赶场网、久久厂房网、开州在线网、优优好房、阿里司法拍卖、
			        京东司法拍卖、公拍网、人民法院诉讼资产网、中国拍卖行业协会的房源;</span></li>
                </ul>
                </div>
            </a-modal>
        <div class="wrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Fail"
                            validate-status="error" help="Should be combination of numbers & alphabets">
                            <a-input id="error" placeholder="unavailable choice" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Warning"
                            validate-status="warning">
                            <a-input id="warning" placeholder="Warning" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Validating" has-feedback
                            validate-status="validating" help="The information is being validated...">
                            <a-input id="validating" placeholder="I'm the content is being validated" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Success" has-feedback
                            validate-status="success">
                            <a-input id="success" placeholder="I'm the content" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Warning" has-feedback
                            validate-status="warning">
                            <a-input id="warning2" placeholder="Warning" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Fail" has-feedback
                            validate-status="error" help="Should be combination of numbers & alphabets">
                            <a-input id="error2" placeholder="unavailable choice" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Success" has-feedback
                            validate-status="success">
                            <a-date-picker style="width: 100%" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Warning" has-feedback
                            validate-status="warning">
                            <a-time-picker style="width: 100%" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Error" has-feedback
                            validate-status="error">
                            <a-select default-value="1">
                                <a-select-option value="1">
                                    Option 1
                                </a-select-option>
                                <a-select-option value="2">
                                    Option 2
                                </a-select-option>
                                <a-select-option value="3">
                                    Option 3
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Validating" has-feedback
                            validate-status="validating" help="The information is being validated...">
                            <a-cascader :default-value="['1']" :options="[]" />
                        </a-form-item>

                        <a-form-item label="inline" :label-col="labelCol" :wrapper-col="wrapperCol"
                            style="margin-bottom:0;">
                            <a-form-item validate-status="error" help="Please select the correct date"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                                <a-date-picker style="width: 100%" />
                            </a-form-item>
                            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                                -
                            </span>
                            <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                                <a-date-picker style="width: 100%" />
                            </a-form-item>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Success" has-feedback
                            validate-status="success">
                            <a-input-number style="width: 100%" />
                        </a-form-item>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: '11',
                visible: false,
                spinning: false,
                confirmLoading: false,
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                visible: false,
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                },
            }
        },
        mounted() {

        },
        methods: {
            //插入一条url数据链接
            async InsertUrl(params){
                const res = await this.$http.get(`${this.config.api}/`) 
            },
            showModal() {
                this.visible = true;
            },
            search(value){  

            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
        }
    }
</script>
<style lang="less">
.wrap {
    width: 100%;    
    display: flex;
    flex: 0 0 auto;
  }
  .ts{
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 0 auto;
  }
  .filter-wraps{
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
  }
  .filter-wraps .search_bd .secitem dd a.select {
    color: #ff552e;
  }
  .sale-content-tip{
    margin: 8px 0;
    background-color: #ffffdd;
    padding: 8px;
    border: 1px solid #fcfcb3;
    border-radius: 5px;
    font-size: 12px;
  }
  .search_bds{
    background: #ffffdd;
    display: flex;
    flex-flow: column;
    height: 110px;
    width: 100%;
    padding: 12px;
    line-height: 26px;
    border-radius: 10px;
    border: 1px solid #ebedf0;
  }
  .filter-wraps .search_bds .secitem dt {
    color: #888;
    width: 36px;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    float: left;
  }
  .fontU{
      position: absolute;
      bottom: 50px;
      right: 0px;
  }
  .ant-table-row ant-table-row-level-0{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sale-content-tip li{
    line-height: 20px;
    font-size: 12px;
    list-style:none;
  }
  .ant-modal-content{
      width: 800px;
      height: 700px;
  }
  li{
      list-style:none;
  }
  .ant-modal-body{
      height: 85%;
  }
</style>