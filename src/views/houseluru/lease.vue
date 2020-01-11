<template>
    <div class="leasets">
        <div class="leasefilter-wraps" style="padding: 24px 24px 0px 24px;">
            <div class="leasesearch_bds">
                <div class="leasetishi">
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
        <a-modal title="秒录房源" width='800px' :bodyStyle="leasestyle" v-model="visible" @ok="leasehanderOk"
            :destroyOnClose="true" cancelText="取消" okText="确定">
            <p>1.点击网站logo可以快速进入对应的网站查看房源:(不会使用?查看帮助)</p>
            <p>2.把需要获取的房源地址粘贴到文本框中,点击“立即秒录”:
                <br /><br />
                <a-input-search placeholder="复制链接" @search="onSeaRenTing" :disabled="disabled" enterButton="立即秒录" size="large" />
                <a-spin :spinning="spinning">
                </a-spin>
            </p>
            <div class="leaselogo">
                <a href="https://cq.58.com/zufang" target="_blank"><img class="wuba"
                        src="../../assets/logo/58logo.png"></a>
                <a href="https://cq.zu.anjuke.com" target="_blank"><img class="anju"
                        src="../../assets/logo/anjuke.jpg"></a>
                <a href="https://cq.zu.fang.com" target="_blank"><img class="fang"
                        src="../../assets/logo/fangtianxia.jpg"></a>
            </div>
            <div class="leasefilter">
                <ul class="leasesale-content-tip clear" style="margin:0px">
                    <li><span><i class="iconfont icon-tishi"></i>贴心提示:</span></li>
                    <li><span>1.由于最近安居客、58、赶集对图片审核比较严格，尽量不要秒录图片带有网站水印的房源;图例</span></li>
                    <li><span>2.秒入图片小于600*450自动过滤;</span></li>
                    <li><span>3.本功能暂时只支持秒录 58同城、安居客、房天下、
                            今题网、去114网、新浪网、焦点网、列表网、第一时间房源网、
                            赶场网、久久厂房网、开州在线网、优优好房、阿里司法拍卖、
                            京东司法拍卖、公拍网、人民法院诉讼资产网、中国拍卖行业协会的房源;</span></li>
                </ul>
            </div>
        </a-modal>
        <!-- <a-modal title="添加小区" v-model="addxq" @ok="addok">
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
        </a-modal> -->
        <div class="sealewrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区:" validate-status=""
                            help="">
                            <a-input id="error" v-model="ref.xiaoquName" placeholder="房源所属小区" style="width:50%;" />
                            <!--<label class="addshowxq">找不到小区？</label>
                            <a class="addshowxq" @click="addshowxaqu">查看相似小区</a>
                            <a class="addshowxq" @click="addxiaoqu">我要添加小区</a>-->
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
                            <a-input v-model="ref.renTingAddress" id="validating" placeholder="房源地址" />
                        </a-form-item>

                       <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建筑面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.renTingMianji" id="success" placeholder="占地面积"
                                class="mianji" />
                            <label class="smianij">平方米</label>
                        </a-form-item>-->

                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.square" id="warning2" placeholder="活动面积"
                                class="mianji" />
                            <label class="smianij">平方米</label>
                        </a-form-item> -->

                        <!--<a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="新三网户室号:" has-feedback
                            validate-status="" help="">
                            <a-input placeholder="" class="shihaow" />
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
                        </a-form-item>-->

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*户型" has-feedback
                            validate-status="">
                            <a-select default-value="1" class="sealefirhuxing " v-model="selectedShi">
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
                            <a-input type="number" id="" v-model="ref.renTingZujin" placeholder="" class="mianji" />
                            <label class="laberall">元/月</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建造年代" has-feedback
                            validate-status="" help="
                            ">
                            <a-input-number :min="1950" :max="2019" v-model="ref.fangwuDate" class="mianji" />
                            <label class="laberall">年</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*所在楼层：" has-feedback
                            validate-status="" help="">
                            <a-input-number :min="1" :max="100" v-model="ceng" />
                            <label class="laberall">楼</label>
                            <label class="glaber">共</label>
                            <a-input-number :min="1" :max="100" v-model="lou" />
                            <label class="laberall">楼</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*租赁方式：" has-feedback
                            validate-status="">
                            <a-radio-group :options="hezu" :defaultValue="valuehz" v-model="ref.renTingType" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="待合租面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.renTingMianji" placeholder="待合租面积" class="mianji" />
                            <label class="smianij">平方米</label>
                        </a-form-item>
                        <a-form-item v-if="ref.renTingType == '整租'" :label-col="labelCol" :wrapper-col="wrapperCol" label="*合租方式" has-feedback
                            validate-status="">
                            <a-select default-value="1" class="sealefirhuxing " v-model="selectedShi">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>户合租</label>
                            <a-select default-value="1" class="huxing" v-model="selectedTing">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>户已租</label>
                            <a-select default-value="" class="hzsty" v-model="selectedChu">
                                <a-select-option v-for="(option,i) in optionaddress" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <a-select default-value="性别不限" class="hzsty" v-model="ref.renTingRoot">
                                <a-select-option v-for="(option,i) in optionsex" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>

                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*支付方式：" has-feedback
                            validate-status="">
                            <a-select default-value="" class="zhuzhaibox " v-model="ref.fuKuanType">
                                <a-select-option v-for="(zf,i) in zhifu" :key="i" :value="zf">
                                    {{zf}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*朝向：" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncx" :defaultValue="value2" v-model="ref.renTingChaoxiang" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="看房时间" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncf" :defaultValue="value3" v-model="ref.renTingLookHouse" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="装修程度" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionzx" :defaultValue="value4" v-model="ref.zhuangxiu" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="供暖情况" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptiongn" :defaultValue="value5" v-model="gongnuan" />
                        </a-form-item>
                        <!--<a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部编号:" validate-status=""
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
                        </a-form-item>-->
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <!-- 住宅信息 -->
        <div class="sealewrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房屋类别：" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionfwlb" :defaultValue="value8" v-model="ref.houseXingzhi" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*基础设施" has-feedback
                            validate-status="">
                            <a-checkbox>水</a-checkbox>
                            <a-checkbox>电</a-checkbox>
                            <a-checkbox>煤气/天然气</a-checkbox>
                            <a-checkbox>有线电视</a-checkbox>
                            <a-checkbox>暖气</a-checkbox>
                            <a-checkbox>车位</a-checkbox>
                            <a-checkbox>露台</a-checkbox>
                            <a-checkbox>阁楼</a-checkbox>
                            <a-checkbox>储藏室/地下室</a-checkbox>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*配套设施" has-feedback
                            validate-status="">
                            <a-checkbox>电话</a-checkbox>
                            <a-checkbox>热水器</a-checkbox>
                            <a-checkbox>彩电</a-checkbox>
                            <a-checkbox>空调</a-checkbox>
                            <a-checkbox>冰箱</a-checkbox>
                            <a-checkbox>洗衣机</a-checkbox>
                            <a-checkbox>家具</a-checkbox>
                            <a-checkbox>床</a-checkbox>
                            <a-checkbox>宽带</a-checkbox>
                            <a-checkbox>微波炉</a-checkbox>
                            <a-checkbox>衣柜</a-checkbox>
                            <a-checkbox>沙发</a-checkbox>
                            <a-checkbox>厨具（可做饭）</a-checkbox>
                            <a-checkbox>独立卫生间</a-checkbox>
                        </a-form-item>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <div class="leasefilter-wraps sealewrapscolor">
            <div class="leasesearch_bds">
                <div class="leasetishi">
                    <i class="iconfont icon-tishi"></i>贴心提示:
                </div>
                <div>
                    1.房源标题目的：突出房子的主要特点，吸引客户，增加点击量和电话量。
                </div>
                <div>
                    2.完整的房源标题应该是：商圈+卖点+楼盘名称+户型+卖点。
                </div>
                <div>
                    3.小蜜书会自动检测标题与描述中的敏感词,查看敏感词(继续修改时，房源描述中的敏感词会“标红”)
                </div>
            </div>
        </div>
        <!-- 房源介绍 -->
        <div class="sealewrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="sealetilerbox">
                            <div class="sealetiler-firstbox">
                                <label class="sealelabeltle">*信息标题：</label><label>好的标题是增加点击，吸引眼球第一步！</label>
                            </div>
                            <div>
                                <a-input placeholder="字数限制10-30" v-model="ref.renTingTitle" style="width:50%;" />
                            </div>
                        </div>
                        <div class="sealetilerbox">
                            <div class="sealetiler-firstbox">
                                <label class="sealelabeltle">*信息描述：</label><label>30-300字效果为最佳</label>
                            </div>
                            <div>
                                <a-textarea :rows="6" v-model="ref.renTingHouse" />
                                <div>
                                    <label class="sealeminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲
                                        《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                </div>
                            </div>
                        </div>
                         <div class="sealetilerbox">
                            <div class="sealetiler-firstbox">
                                <label class="sealelabeltle">*服务介绍：</label><label>30-300字效果为最佳</label>
                            </div>
                            <div>
                                <a-textarea :rows="6" v-model="ref.renTingFuWu" />
                                <div>
                                    <label class="sealeminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲
                                        《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                </div>
                            </div>
                        </div>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <div class="leasefilter-wraps sealewrapscolor">
            <div class="leasesearch_bds">
                <div class="leasetishi">
                    <i class="iconfont icon-tishi"></i>贴心提示:
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
        <div class="sealewrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="picdivbox divallbox">
                            <div class="laberboxtit">上传方式:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsc" :defaultValue="value6" />
                            </div>
                        </div>
                        <div class="picdivbox divallbox">
                            <div class="laberboxtit">水印位置:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsy" :defaultValue="value7" />
                            </div>

                        </div>
                        <div class="shinei divallbox">
                            <div class="laberbox">
                                <span class="laberboxtitle">&nbsp;封&nbsp;面&nbsp;图:</span>
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
                                    <label
                                        class="orangelaber">图片来源于互联网，房源如果需要做保真、安选等需要押金的操作时，为避免违规情况，请尽量自己上传原房源户型图</label>
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
                                    <span>最多10张。您可以</span>
                                    <label class="piclaber">从我的图库选择</label>
                                    <span>或者</span>
                                    <label class="piclaber">从小区图库选择</label>
                                    <a-button type="" class="buttontuku">我的图库</a-button>
                                    <a-button type="" class="buttontuku">小区图库</a-button>
                                </div>
                                <div class="xiala">
                                    <a-dropdown>
                                        <a-menu slot="overlay">
                                            <a-menu-item v-for="(pilaingsy,index) of pilianglist" :key="index">
                                                <a-icon type="user" />{{pilaingsy}}</a-menu-item>
                                        </a-menu>
                                        <a-button class="tupianchuli">图片处理
                                            <a-icon type="up" />
                                        </a-button>
                                    </a-dropdown>
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
                                <!-- <div class="xiala">
                                        <a-dropdown>
                                            <a-menu slot="overlay">
                                                <a-menu-item v-for="(pilaingsy,index) of pilianglist" :key="index">
                                                    <a-icon type="user" />{{pilaingsy}}</a-menu-item>
                                            </a-menu>
                                             <a-button class="tupianchuli">图片处理
                                                <a-icon type="up" />
                                            </a-button>
                                        </a-dropdown>
                                    </div> -->
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
                            <a-button type="" class="buttonfang okbutton" @click="saveHouse()">保存房源</a-button>
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
    const proquyuseData = ['江北', '万州', '九龙坡', '渝中', '涪陵', '沙坪坝', '合川', '长寿', '南岸', '渝北', '巴南', '北碚', '大渡口', '永川', '两江新区', '璧山', '重庆周边', '石柱', '江津'];
    const plainOptioncx = ['东', '南', '西', '北', '东西', '东南', '西北', '西南', '东北', '南北'];
    const plainOptionzx = ['豪华装修', '精装修', '中等装修', '简装修', '毛坯'];
    const plainOptioncf = ['随时看房', '非工作时间', '电话预约', '其他'];
    const plainOptiongn = ['集体供暖', '自供暖', '不供暖'];
    const plainOptionsc = ['普通上传', '批量上传', '大图压缩批量上传'];
    const plainOptionsy = ['不加水印', '添加水印'];
    const pilianglist = ['批量水印', '批量美颜', '批量水印美颜', '批量恢复原图', '批量调整大小', '批量下载图片'];
    const plainOptionfwlb = ['公寓', '普通住宅', '平房', '其他'];
    const zhifu = ['押一付一', '押一付二', '押一付三', '押二付一', '押二付二', '押三付三','面议'];
    const hezu = ['合租', '整租'];
    const optionaddress = ['主卧', '次卧', '床位', '隔断间'];
    const optionsex = ['性别不限', '限男生', '限女生', '限夫妻',];
    export default {
        data() {
            return {
                disabled: false,
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
                plainOptioncx,
                plainOptioncf,
                plainOptionzx,
                plainOptiongn,
                plainOptionsc,
                plainOptionsy,
                plainOptionfwlb,
                optionaddress,
                hezu,
                zhifu,
                optionsex,
                value2: '东',
                value3: '随时看房',
                value4: '豪华装修',
                value5: '集体供暖',
                value6: '普通上传',
                value7: '不加水印',
                value8: '普通住宅',
                valuehz: '合租',
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                ret: {},
                visible: false,
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
                userId: '',
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
                selectedShi: '',
                selectedTing: '',
                selectedChu: '',
                selectedWei: '',
                selectedTai: '',
                options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                ceng: '',
                lou: '',
                weiyiUserId: '',
                saveRes: {},
                leasestyle: {
                    height: '470px'
                }
            }
        },
        mounted() {
            // this.kanfang="随时看房";
            this.zhuangxiu = "中等装修";
            this.gongnuan = "自供暖";
             let update = JSON.parse(localStorage.getItem('update'));
            this.userId = update.userId;
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
            async onSeaRenTing(params) {
                //判断URL网址输入是否正确
                var strRegex = '^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
                var re = new RegExp(strRegex);
                if (params == "" || !re.test(params)) {
                    alert("请输入正确的url地址");
                    return;
                }
                this.uuid()
                this.urlss = params;
                const data = {
                    userId: this.userId,
                    url: this.urlss,
                    houseType: "合租",
                    weiYiUrl: this.text
                };
                let urllianjie=""
                
                 if (RegExp(/cq.58.com/).exec(params))
                      console.log('选中五八'+this.userId)
                      urllianjie=`${this.$config.api}/api/cms/wuRenTing/renTingUrl`
                this.disabled = true;
                await this.$http.post(urllianjie, data).then(response => {
                    this.spinning = true;
                    console.log(JSON.stringify(response))
                    if (response.status == 200) {
                        this.$http.get(`${this.$config.api}/api/cms/wuRenTing/renTingUrl` + '?weiyiurl=' +  this.text + '&userid=' + this.userId + '&url=' + this.urlss).then(res => {
                            console.log(`222` + JSON.stringify(res))
                            var ret = res.data.address;
                            this.saveRes = res.data;
                            this.address =this.saveRes.renTingQuyu
                            this.chaoxiang =this.saveRes.chaoxiang;
                            this.spinning = false;
                            this.ref = res.data;
                            console.log(`222` + JSON.stringify(this.ref))
                            //字符串
                            this.ceng = this.ref.renTingLouceng.substring(0, this.ref.renTingLouceng.indexOf("/"));
                            this.lou = this.ref.renTingLouceng.substring(this.ref.renTingLouceng.indexOf("/") + 1, this.ref.renTingLouceng.length);
                            let shi = this.ref.renTingHuXing.indexOf("室");
                            let ting = this.ref.renTingHuXing.indexOf("厅");
                            let wei = this.ref.renTingHuXing.indexOf("卫");
                            this.selectedShi = this.ref.renTingHuXing.substring(0, shi);
                            this.selectedTing = this.ref.renTingHuXing.substring(shi + 1, ting);
                            this.selectedWei = this.ref.renTingHuXing.substring(ting + 1, wei);
                            this.spinning = false;
                            var shineiImg = res.data.renTingShineiImg.replace(/'/g, '').replace('[', '').replace(']', '');
                            var ss = shineiImg.split(",")
                            this.weiyiUserId = res.data.weiYiUrl;
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
                            imgFangxing.url = res.data.renTingFengImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                                imgFangxing.uid = '-1',
                                imgFangxing.name = 'xxx.jpg',
                                imgFangxing.status = 'done',
                                this.fangxinlist.push(imgFangxing);


                            // var XiaoquImg = {};
                            // XiaoquImg.url = res.data.xiaoquImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                            //     XiaoquImg.uid = '-3',
                            //     XiaoquImg.name = 'xxx.jpg',
                            //     XiaoquImg.status = 'done',
                            //     this.xiaoQuList.push(XiaoquImg);
                            setTimeout(() => {
                                this.visible = false;
                                this.disabled = false;
                            }, 500);
                            this.visible = false;
                            this.disabled = false;
                        });

                    }
                });


            },
            async saveHouse() {
                    this.saveRes.renTingTitle=this.ref.renTingTitle
                    this.saveRes.renTingZujin=this.ref.renTingZujin
                    this.saveRes.renTingMianji=this.ref.renTingMianji
                    this.saveRes.Zhuangxiu=this.ref.Zhuangxiu
                    this.saveRes.renTingHouse=this.ref.renTingHouse
                     this.saveRes.renTingFuWu=this.ref.renTingFuWu
                if (this.saveRes.xiaoquName == null && this.saveRes.renTingTitle == null &&
                    this.saveRes.renTingZujin == null  &&
                    this.saveRes.renTingMianji == null && this.saveRes.renTingHuXing == null &&
                    this.saveRes.renTingLouceng == null && this.saveRes.zhuangxiu == null && this.saveRes.renTingAddress == null && this.saveRes.renTingFengImg == null
                ) {
                    this.openNotificationWithIcon('error')
                }
                else {
                    
                    await this.$http.post(`${this.$config.api}/api/cms/renTing/renTinglishHouse`, this.saveRes).then(response => {
                        if (response.status == 200) {
                            this.openNotificationWithIcon('success')
                        }
                    })
                }

            },
            openNotificationWithIcon(type) {
                if (type == 'success') {
                    this.$notification[type]({
                        message: '保存成功',
                        placement: 'bottomRight',
                        bottom: '50px',
                        right: '500px',
                        description:
                            '保存房源成功数据将存入发布房源列表',
                    });
                    this.$router.replace('/rentrelease')
                }
                if (type == 'error') {
                    this.$notification[type]({
                        message: '保存失败',
                        placement: 'bottomRight',
                        bottom: '50px',
                        right: '500px',
                        description:
                            '保存房源失败数据不能为空',
                    });
                }
            },
            showModal() {
                this.visible = true;
            },
            // addxiaoqu() {
            //     this.addxq = true;
            // },
            // addshowxaqu() {
            //     this.addshowxqu = true;
            // },
            leasehanderOk(e) {
                console.log(e);
                this.visible = false;
                this.spinning = false;
                this.disabled = false;
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
<style lang="less" scoped>
    .leaselogo {
        display: flex;
        align-items: center;

        a {
            margin-right: 15px;

            .wuba {
                width: 150px;
                height: 80px;
                padding: 15px 10px;
                border: 1px solid #ececec;
            }

            .anju {
                width: 150px;
                height: 80px;
                border: 1px solid #ececec;
            }

            .fang {
                width: 150px;
                height: 80px;
                padding: 10px 0px;
                border: 1px solid #ececec;
            }
        }
    }

    .sealewrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .leasets {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;

    }

    .leasefilter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .leasefilter-wraps .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .leasesale-content-tip {
        margin: 8px 0;
        background-color: #ffffdd;
        padding: 8px;
        border: 1px solid #fcfcb3;
        border-radius: 5px;
        font-size: 12px;
    }

    // .ant-modal-close {
    //     display: none;
    // }

    .leasesearch_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;

        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .leasetishi {
        display: flex;
        align-items: center;
    }

    .leasefilter-wraps .leasesearch_bds .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .leasefilter {
        position: absolute;
        bottom: 50px;
        right: 0px;
    }

    .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .leasesale-content-tip li {
        line-height: 20px;
        font-size: 12px;
        list-style: none;
    }

    // .ant-modal-content {
    //     width: 800px;
    //     height: 700px;
    // }

    li {
        list-style: none;
    }

    // .ant-modal-body {
    //     height: 85%;
    // }

    .shihaow {
        width: 70px !important;
        padding-right: 8px
    }

    .smianij {

        padding-left: 5px
    }

    .mianji {
        width: 120px !important;
    }

    .huxing {
        width: 90px !important;
        padding-right: 5px;
        padding-left: 25px
    }

    .hzsty {
        width: 130px !important;
        padding-right: 5px;
        padding-left: 17px
    }

    .sealefirhuxing {
        width: 75px !important;
        padding-right: 5px;
    }

    .shihaow {
        width: 70px;
        padding-right: 8px;
    }

    .shihaoselw {
        padding-right: 22px;
        padding-left: 8px;
    }

    .jiage {
        width: 80px;
        padding-right: 5px
    }

    .laberall {
        padding-left: 5px;
    }

    .glaber {
        padding-left: 15px;
        padding-right: 5px;
    }

    .radisflex {
        display: flex;
    }

    .neibula {
        font-size: 12px;
        color: red;
        padding-left: 5px;
    }

    .sealewrapscolor {
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
        display: flex;
        align-items: center;
        height: 40px !important;

        .laberboxtit {
            color: red;
            padding-right: 10px;
        }
    }

    .laberbox {
        display: flex;
        align-items: center;

        .laberboxtitle {
            color: red;
            padding-right: 10px;
        }
    }

    .tupianbox {
        padding-left: 60px;
    }

    .shinei {
        height: 180px !important;
        flex-flow: column;
        flex: 0 0 auto;
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
        height: 70px !important;
    }

    .bottomobx {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;
        height: 40px !important;
    }

    .buttonfang {
        padding-right: 15px;
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
        padding-left: 28%;
    }

    .okbutton {
        background-color: red;
        color: white;
    }

    .tupianchuli {
        background-color: #f0f2f5;
    }

    // .addshowxq {
    //     margin-left: 5px;
    //     font-size: 14px
    // }
    .sealetilerbox {
        padding-left: 20px;
        padding-top: 20px;
    }

    .sealetiler-firstbox {
        padding-bottom: 10px;

    }

    .sealelabeltle {
        font-weight: bold;
        color: black;
    }

    .sealeminganlabel {
        color: darkgrey;
    }

    .zhuzhaibox {
        width: 140px !important;
    }

    // .ant-modal-content {
    //     width: 800px;
    //     height: 700px;
    // }


    // .ant-modal-body {
    //     height: 85%;
    // }
</style>