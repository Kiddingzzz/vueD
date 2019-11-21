<template>
    <div class="ts">
        <div class="filter-wraps" style="padding: 24px 24px 0px 24px;">
            <div class="search_bds">
                <div class="tishi">
                    <i class="iconfont icon-tishi"></i>贴心提示:
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
                <a-input-search placeholder="复制链接" @search="onSearch" enterButton="立即秒录" size="large" />
                <a-spin :spinning="spinning">
                </a-spin>
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
        <a-modal title="添加小区" v-model="addxq" @ok="addok">
            <div style="width:100%">
                <div>
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区名称:"
                            validate-status="error" help="">
                            <a-input id="error" style="width:50%;" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区类型:"
                            validate-status="error" help="">
                            <a-select default-value="1" class="shihaoselw mianji" style="width:50%">
                                <a-select-option value="1">
                                    住宅
                                </a-select-option>
                                <a-select-option value="2">
                                    商铺
                                </a-select-option>
                                <a-select-option value="3">
                                    别墅
                                </a-select-option>
                                <a-select-option value="3">
                                    写字楼
                                </a-select-option>
                                <a-select-option value="3">
                                    厂房
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*所属区域:"
                            validate-status="error" help="">
                            <a-select :defaultValue="proquyuseData[0]" style="width: 120px">
                                <a-select-option v-for="proquyuse in proquyuseData" :key="proquyuse">{{proquyuse}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建筑年代:"
                            validate-status="error" help="">
                            <a-date-picker :defaultValue="moment('2015/01/01', dateFormat)" :format="dateFormat" />
                            <br />


                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区地址:"
                            validate-status="error" help="">
                            <a-input id="error" placeholder="房源所属小区" style="width:50%;" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </a-modal>
        <a-modal title="查看相似小区" v-model="addshowxqu" @ok="addshowok">
            <div style="width:100%">
                <div>
                    没有类似小区
                </div>

            </div>
        </a-modal>
        <div class="wrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <div class="auto">
                <a-layout-content class="content">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区:"
                            validate-status="" help="">
                            <a-input id="error" v-model="ref.xiaoquName" placeholder="小区" style="width:50%;" />
                            <label class="addshowxq">找不到小区？</label>
                            <a class="addshowxq" @click="addshowxaqu">查看相似小区</a>
                            <a class="addshowxq" @click="addxiaoqu">我要添加小区</a>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*区域:" validate-status="">
                            <a-select :defaultValue="provinceData[0]" style="width: 120px" v-model="address">
                                <a-select-option v-for="(province,index) of provinceData" :key="index"
                                    :value="province">{{province}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="地址" has-feedback
                            validate-status="" help="">
                            <a-input v-model="ref.address" id="validating" placeholder="房源地址" /> 
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建筑面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.square" id="success" placeholder="占地面积"
                                class="mianji" />
                            <label class="smianij">平方米</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.square" id="warning2" placeholder="活动面积"
                                class="mianji" />
                            <label class="smianij">平方米</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="新三网户室号:" has-feedback
                            validate-status="" help="">
                            <a-input id="error2" placeholder="" class="shihaow" />
                            <a-select default-value="1" class="shihaoselw mianji">
                                <a-select-option value="1">
                                    栋
                                </a-select-option>
                                <a-select-option value="2">
                                    弄
                                </a-select-option>
                                <a-select-option value="3">
                                    座
                                </a-select-option>
                                <a-select-option value="3">
                                    号
                                </a-select-option>
                                <a-select-option value="3">
                                    号楼
                                </a-select-option>
                                <a-select-option v-model="hutong" value="3">
                                    胡同
                                </a-select-option>
                            </a-select>
                            <a-input id="" placeholder="" class="shihaow" />
                            <a-select default-value="1" class="shihaoselw mianji">
                                <a-select-option value="1">
                                    西永
                                </a-select-option>
                                <a-select-option value="2">
                                    磁器口
                                </a-select-option>
                                <a-select-option value="3">
                                    大学城
                                </a-select-option>
                            </a-select>
                            <a-input id="" placeholder="" class="shihaow" />
                            <label>室</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*户型" has-feedback
                            validate-status="">
                            <a-select default-value="1" class="huxing marginall" v-model="selectedShi">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>室</label>
                            <a-select default-value="1" class="huxing" v-model="selectedTing">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厅</label>
                            <a-select default-value="1" class="huxing" v-model="selectedChu">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厨</label>
                            <a-select default-value="1" class="huxing" v-model="selectedWei">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>卫</label>
                            <a-select default-value="1" class="huxing" v-model="selectedTai">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>阳台</label>

                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*价格" has-feedback
                            validate-status="">
                            <a-input type="number" id="" v-model="ref.rice" placeholder="" class="mianji" />
                            <label>元/月</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*租赁方式" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionzf" :defaultValue="value1" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*合租方式" has-feedback
                            validate-status="">
                            <a-select default-value="1" class="hezuf marginall">

                            </a-select>
                            <label>户合租</label>
                            <a-select default-value="1" class="hezuf">

                            </a-select>
                            <label>户已租</label>
                            <a-select default-value="1" class="hezuf">
                                <a-select-option value="1">
                                    主卧
                                </a-select-option>
                                <a-select-option value="2">
                                    次卧
                                </a-select-option>
                                <a-select-option value="3">
                                    床位
                                </a-select-option>
                            </a-select>

                            <a-select default-value="1" class="hezuf">
                                <a-select-option value="1">
                                    性别不限
                                </a-select-option>
                                <a-select-option value="2">
                                    限男生
                                </a-select-option>
                                <a-select-option value="3">
                                    限女生
                                </a-select-option>
                                <a-select-option value="3">
                                    限夫妻
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*支付方式" has-feedback
                            validate-status="">
                            <a-select default-value="1" class="zhifuf">
                                <a-select-option value="1">
                                    押一付一
                                </a-select-option>
                                <a-select-option value="2">
                                    押一付二
                                </a-select-option>
                                <a-select-option value="3">
                                    押一付三
                                </a-select-option>
                                <a-select-option value="3">
                                    押二付一
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建造年代" has-feedback
                            validate-status="" help="
                            ">
                            <a-input-number :min="1950" :max="2019" v-model="ref.fangwuDate" />
                            <label class="laberall">年</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*所在楼层" has-feedback
                            validate-status="" help="">
                            <a-input-number :min="1" :max="100" v-model="ceng" />
                            <label class="laberall">楼</label>
                            <label class="glaber">共</label>
                            <a-input-number :min="1" :max="100" v-model="lou" />
                            <label class="laberall">楼</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*朝向" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncx" :defaultValue="value2" v-model="chaoxiang" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="看房时间" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncf" :defaultValue="value3" v-model="kanfang" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="装修程度" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionzx" :defaultValue="value4" v-model="zhuangxiu" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="供暖情况" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptiongn" :defaultValue="value5" v-model="gongnuan" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部编号:" validate-status=""
                            help="">
                            <a-input id="" placeholder="" class="mianji" />
                            <label class="neibula">内部编号为0~20位,只能由数字和字母组成</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*房源标签:" validate-status=""
                            help="">
                            <a-input id="" v-model="ref.fangyuanBiaoqian" placeholder="" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*配套标签:" validate-status=""
                            help="">
                            <a-input id="" v-model="ref.peitaoBiaoqain" placeholder="" />
                        </a-form-item>
                    </a-form>
                </a-layout-content>
                </div>
            </a-layout>
        </div>
        <div class="filter-wraps wrapscolor">
            <div class="search_bds">
                <div>
                    贴心提示:
                </div>
                <div>
                    1.上传1张房型图，3张室内图，房源描述需要30个字以上的房源，就能获得标签。多图房源能获得比一般房源高出27.3%的点击率。
                </div>
                <div>
                    2.上传的照片应大于300*300像素，非大图压缩方式支持小于2M的图片，大图模式可支持小于10M的图片(只支持压缩jpg、jpeg格式的图片)。
                </div>
                <div>
                    3.目前支持 gif、jpg、jpeg、png 4种格式的图片上传，bmp格式图片暂不支持,帮助：上传照片规则
                </div>
                <div>
                    4.提供一些免费的软件 (图片压缩软件下载)、 (加水印软件下载)、 (去水印软件下载)。
                </div>
                <div>
                    5.为提高安居客房源质量分，建议至少上传7张室内图
                </div>
            </div>
        </div>
        <div class="wrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="picdivbox divallbox">
                            <div class="laberbox">上传方式:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsc" :defaultValue="value6" />
                            </div>
                        </div>
                        <div class="picdivbox divallbox">
                            <div class="laberbox">水印位置:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsy" :defaultValue="value7" />
                            </div>

                        </div>
                        <div class="shinei divallbox">
                            <div class="laberbox">
                                <span>&nbsp;封&nbsp;面&nbsp;图:</span>
                                <div class="laberboxla">点击希望设定为封面的图片右下角的封面按钮即可设定。</div>
                            </div>
                            
                            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card"
                                :fileList="imgHeaderList" @preview="handlePreview" @change="handleChange">
                            </a-upload>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%;height:650px;" :src="previewImage" />
                            </a-modal>
                        </div>
                        <div class="shinei divallbox">
                            <div class="laberbox">
                                <span class="laberboxtitle">室内照片: </span>
                                <div class="shineipadd">
                                    最多10张。您可以<label class="piclaber">从我的图库选择</label>
                                    <a-button type="" class="buttontuku">我的图库</a-button>
                                    <a-button type="" class="buttontuku">高清图库</a-button>
                                    客厅/卧室/厨房等3张以上照片可帮助您获得较好效果！
                                    <label class="orangelaber">可拖拽交换位置</label>
                                </div>
                            </div>
                            <div class="tupianbox">
                                    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card" :fileList="shineiList" @preview="handlePreview"
                                        @change="handleChange">
                                        <!-- <a-button class="updatedbutton">
                                            <a-icon type="upload" />上传图片</a-button> -->
                                    </a-upload>
                                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                        <img alt="example" style="width: 100%;height:650px;" :src="previewImage" />
                                    </a-modal>
                                </div>
                        </div>
                        <div class="shinei divallbox">
                            <div class="laberbox">
                                <span class="laberboxtitle">&nbsp;房&nbsp;型&nbsp;图:</span>
                                <div class="shineipadd">
                                    <label class="orangelaber">图片来源于互联网，房源如果需要做保真、安选等需要押金的操作时，为避免违规情况，请尽量自己上传原房源户型图</label>
                                    <a-button type="" class="buttontuku">我的图库</a-button>
                                    <a-button type="" class="orangetuku">房型图库</a-button>
                                    <a-button type="" class="buttontuku">在线绘制</a-button>
                                </div>
                            </div>
                            <div class="tupianbox">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card" :fileList="fangxinlist" @preview="handlePreview"
                                    @change="handleChange">
                                </a-upload>
                            </div>
                        </div>
                        <div class="shinei divallbox">
                            <div class="laberbox">
                                <span class="laberboxtitle">小区图片:</span>
                                <div class="shineipadd">

                                    最多10张。您可以<label class="piclaber">从我的图库选择</label>或者<label
                                        class="piclaber">从小区图库选择</label>
                                    <a-button type="" class="buttontuku">我的图库</a-button>
                                    <a-button type="" class="buttontuku">小区图库</a-button>
                                    <a-button class="tupianchuli">图片处理<a-icon type="up" />
                                    </a-button>
                                </div>  
                            </div>
                            <div class="radisflex">
                                    <div class="tupianbox">
                                        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card" :fileList="xiaoQuList" @preview="handlePreview"
                                            @change="handleChange">
                                        </a-upload>
                                        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                            <img alt="example" style="width: 100%;height:650px;" :src="previewImage" />
                                        </a-modal>
                                    </div>
                                    <div class="xiala">
                                        <a-dropdown>
                                            <a-menu slot="overlay">
                                                <a-menu-item v-for="(pilaingsy,index) of pilianglist" :key="index">
                                                    <a-icon type="user" />{{pilaingsy}}</a-menu-item>
                                            </a-menu>
                                            <!-- <a-button class="tupianchuli">图片处理
                                                <a-icon type="up" />
                                            </a-button> -->
                                        </a-dropdown>
                                    </div>
                                </div>
                        </div>
                        <div class="fangyuansp">
                            <div class="laberbox">
                                <span class="laberboxtitle">房源视频:</span>
                                <label> 视频大小在300M内，视频长度在1-3分钟为最佳，视频过短新三网审核不予通过。</label>
                                <div>
                                    <a-upload name="file" :multiple="true"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers">
                                        <a-button class="updatedspbutton">
                                            <a-icon type="upload" />添加视频 </a-button>
                                        </a-upload>
                                </div>
                            </div>
                        </div>
                        <div class="bottomobx">
                            <a-button type="" class="buttonfang okbutton">保存房源</a-button>
                            <a-button type="" class="okbutton">保存草稿</a-button>

                        </div>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
    </div>


</template>
<script>
    import moment from 'moment';
    const provinceData = ['江北', '万州', '九龙坡', '渝中', '涪陵', '沙坪坝', '合川', '长寿', '南岸', '渝北', '巴南', '北碚', '大渡口', '永川', '两江新区', '璧山', '重庆周边', '石柱', '江津'];
    const plainOptionzf = ['整租', '合租'];
    const proquyuseData = ['江北', '万州', '九龙坡', '渝中', '涪陵', '沙坪坝', '合川', '长寿', '南岸', '渝北', '巴南', '北碚', '大渡口', '永川', '两江新区', '璧山', '重庆周边', '石柱', '江津'];
    const plainOptioncx = ['东', '南', '西', '北', '东西', '东南', '西北', '西南', '东北', '南北'];
    const plainOptionzx = ['豪华装修', '精装修', '中等装修', '简装修', '毛胚'];
    const plainOptioncf = ['随时看房', '非工作时间', '电话预约', '其他'];
    const plainOptiongn = ['集体供暖', '自供暖', '不供暖'];
    const plainOptionsc = ['普通上传', '批量上传', '大图压缩批量上传'];
    const plainOptionsy = ['不加水印', '添加水印'];
    const pilianglist = ['批量水印', '批量美颜', '批量水印美颜', '批量恢复原图', '批量调整大小', '批量下载图片'];

    export default {
        data() {
            return {
                url: '11',
                visible: false,
                addxq: false,
                addshowxqu: false,

                spinning: false,
                confirmLoading: false,
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                plainOptionzf,
                plainOptioncx,
                plainOptioncf,
                plainOptionzx,
                plainOptiongn,
                plainOptionsc,
                plainOptionsy,
                value2: '东',
                value1: 'hezu',
                value3: '随时看房',
                value4: '豪华装修',
                value5: '集体供暖',
                value6: '普通上传',
                value7: '不加水印',
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                ret: {},
                visible:false,
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                },
                dateFormat: 'YYYY/MM/DD',
                monthFormat: 'YYYY/MM',
                headers: {
                    authorization: 'authorization-text',
                },
                pilianglist,
                provinceData,
                proquyuseData,
                houseTypes: '二手房',
                userId: '48639146-0751-11EA-87FE-305A3A80A208',
                urlss: '',
                text: '',
                hutong: '',
                ref: {},
                previewVisible: false,
                previewImage: '',
                shineiList: [
                ],
                imgHeaderList: [],
                xiaoQuList: [],
                fangxinlist: [],
                address: '',
                kanfang: '',
                chaoxiang: '',
                zhuangxiu: '',
                gongnuan: '',
                selectedShi:'',
                selectedTing:'',
                selectedChu:'',
                selectedWei:'',
                selectedTai:'',
                options:[0,1,2,3,4,5,6,7,8,9,10],
                ceng:'',
                lou:'',
            }
        },
        mounted() {
            // this.kanfang="随时看房";
            this.zhuangxiu = "中等装修";
            this.gongnuan = "自供暖";
        },
        methods: {

            uuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                this.text = uuid
                console.log(this.text)
            },
            //插入一条url数据链接
            async onSearch(params) {
                this.uuid()
                this.urlss = params;
                const data = {
                    userId: this.userId,
                    url: this.urlss,
                    houseType: this.houseTypes,
                    weiYiUrl: this.text
                };
                await this.$http.post(`${this.$config.api}/api/cms/urls/url`, data).then(response => {
                    this.spinning = true;
                    console.log(JSON.stringify(response))
                    if (response.status == 200) {
                        this.$http.get(`${this.$config.api}/api/cms/urls/url` + '?userId=' + this.userId + '&url=' + this.urlss + '&houseType=' + this.houseTypes + '&weiYiUrl=' + this.text).then(res => {
                            console.log(`222` + JSON.stringify(res))
                            var ret = res.data.address;
                            this.address = ret.split("-")[0];
                            this.chaoxiang = ret.chaoxiang;
                            this.spinning = false;
                            this.ref = res.data;
                            console.log(`222` + JSON.stringify(this.ref))
                            //字符串
                            this.ceng = this.ref.louceng.substring(0, this.ref.louceng.indexOf("/"));
                            this.lou = this.ref.louceng.substring(this.ref.louceng.indexOf("/") + 1, this.ref.louceng.length);
                            let shi = this.ref.huxing.indexOf("室");
                            let ting = this.ref.huxing.indexOf("厅");
                            let wei = this.ref.huxing.indexOf("卫");
                            this.selectedShi = this.ref.huxing.substring(0, shi);
                            this.selectedTing = this.ref.huxing.substring(shi + 1, ting);
                            this.selectedWei = this.ref.huxing.substring(ting + 1, wei);
                            this.spinning = false;
                            var shineiImg = res.data.shineiImg.replace(/'/g, '').replace('[', '').replace(']', '');
                            var ss = shineiImg.split(",")
                            for (var i = 0; i < ss.length; i++) {
                                var imgUrl = {};
                                imgUrl.url = ss[i];
                                imgUrl.uid = i;
                                imgUrl.name = 'xxx.jpg';
                                imgUrl.status = 'done';
                                this.shineiList.push(imgUrl);
                            }
                            var imgH = {};
                            imgH.url = ss[0],
                                imgH.uid = '-1',
                                imgH.name = 'xxx.jpg',
                                imgH.status = 'done',
                                this.imgHeaderList.push(imgH);


                            var imgFangxing = {};
                            imgFangxing.url = res.data.imgHeader.replace(/'/g, '').replace('[', '').replace(']', ''),
                                imgFangxing.uid = '-1',
                                imgFangxing.name = 'xxx.jpg',
                                imgFangxing.status = 'done',
                                this.fangxinlist.push(imgFangxing);


                            var XiaoquImg = {};
                            XiaoquImg.url = res.data.xiaoquImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                                XiaoquImg.uid = '-3',
                                XiaoquImg.name = 'xxx.jpg',
                                XiaoquImg.status = 'done',
                                this.xiaoQuList.push(XiaoquImg);
                                setTimeout(() => {
                                    this.visible = false;
                                }, 500);
                                this.visible = false;
                        });

                    }
                });


            },
            showModal() {
                this.visible = true;
            },
            addxiaoqu() {
                this.addxq = true;
            },
            addshowxaqu() {
                this.addshowxqu = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
            addok(e) {
                console.log(e);
                this.addxq = false;
            },
            addshowok(e) {
                console.log(e);
                this.addshowxqu = false;
            },
            handleCancel() {
                this.previewVisible = false;
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            handleChange({ fileList }) {
                this.fileList = fileList;
            },
            moment,
        }
    }
</script>
<style lang="less">
    .content{
        margin: 0 auto;
        min-height: 280px;
        background: #ffffff;
        padding: 50px 0 30px 0;
    }
    .wrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .ts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;

    }

    .filter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .filter-wraps .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .sale-content-tip {
        margin: 8px 0;
        background-color: #ffffdd;
        padding: 8px;
        border: 1px solid #fcfcb3;
        border-radius: 5px;
        font-size: 12px;
    }

    .ant-modal-close {
        display: none;
    }

    .search_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }
    .tishi{
        display: flex;
        align-items: center;
    }
    .filter-wraps .search_bds .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .fontU {
        position: absolute;
        bottom: 50px;
        right: 0px;
    }

    .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sale-content-tip li {
        line-height: 20px;
        font-size: 12px;
        list-style: none;
    }

    .ant-modal-content {
        width: 800px;
        height: 700px;
    }

    li {
        list-style: none;
    }

    .ant-modal-body {
        height: 85%;
    }

    .shihaow {
        width: 70px;
        margin-right: 8px
    }

    .smianij {

        margin-left: 5px
    }

    .mianji {
        width: 100px !important;
    }

    .huxing {
        width: 100px !important;
        margin-right: 5px;
        margin-left: 15px
    }

    .shihaoselw {
        margin-right: 22px;
    }

    .jiage {
        width: 80px;
        margin-right: 5px
    }

    .hezuf {
        width: 100px !important;
        margin-right: 5px;
        margin-left: 15px;
    }

    .marginall {
        margin-left: 0px;
    }

    .zhifuf {
        width: 120px !important;
        margin-left: 0px;
    }

    .laberall {
        margin-left: 5px;
    }

    .glaber {
        margin-left: 15px;
        margin-right: 5px;
    }

    .radisflex {
        display: flex;
    }

    .neibula {
        font-size: 12px;
        color: red;
        margin-left: 5px;
    }

    .wrapscolor {
        padding: 0px 24px 0px 24px;
        background: #f0f2f5;
    }

    .divallbox {
        display: flex;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;
    }

    .picdivbox {
        align-items: center;
        height: 40px !important;
    }

    .laberbox {
        display: flex;
        align-items: center;
        .laberboxtitle{
            color: red;
            margin-right: 10px;
        }
    }

    .tupianbox {
        margin-left: 10px;
        padding-left: 60px;
    }

    .shinei {
        height: 180px !important;
        flex-flow: column;
        flex: 0 0 auto;
        padding: 10px 20px;
    }

    .piclaber {
        color: green;
    }
    .fangxingtu {
        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;

    }

    .xiaoqupic {
        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;
    }

    .fangyuansp {
        display: flex;
        width: 100% !important;
        padding-left: 20px;
        padding-top: 10px;
        height: 70px !important;
    }

    .bottomobx {
        width: 100% !important;
        height: 40px !important;
        padding: 80px 0 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
    }

    .buttonfang {
        margin-right: 15px;
    }

    .orangelaber {
        color: orange;
    }

    .buttontuku {
        background-color: green;
        color: white;
        margin-right: 5px;
    }

    .orangetuku {
        background-color: orange;
        color: white;
        margin-right: 5px;
    }

    .updatedbutton {
        background-color: green;
        color: white;
        border-radius: 20px;
    }

    .updatedspbutton {
        background-color: green;
        color: white;
        height: 30px !important;
        width: 100px !important;
    }

    .xiala {
        margin-left: 28%;
    }

    .okbutton {
        background-color: red;
        color: white;
    }

    .tupianchuli {
        background-color: #f0f2f5;
    }

    .addshowxq {
        margin-left: 5px;
        font-size: 14px
    }
</style>