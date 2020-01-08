<template>
    <div class="sellts">
        <div class="sellfilter-wraps" style="padding: 24px 24px 0px 24px;">
            <div class="sellsearch_bds">
                <div class="selltishi">
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
        <a-modal title="秒录房源" width='800px' :bodyStyle="tstyle" v-model="visible" @cancel="cancelClick" @ok="handleOk" :destroyOnClose="true"
            cancelText="取消" okText="确定">
            <p>1.点击网站logo可以快速进入对应的网站查看房源:(不会使用?查看帮助)</p>
            <p>2.把需要获取的房源地址粘贴到文本框中,点击“立即秒录”:
                <br /><br />
                <a-input-search placeholder="复制链接" @search="onSearch" :disabled="disabled" enterButton="立即秒录"
                    size="large" />
                <a-spin :spinning="spinning">
                </a-spin>
            </p>
            <div class="selllogo">
                <a href="https://cq.58.com/ershoufang" target="_blank"><img class="wuba"
                        src="../../assets/logo/58logo.png"></a>
                <a href="https://chongqing.anjuke.com/sale" target="_blank"><img class="anju"
                        src="../../assets/logo/anjuke.jpg"></a>
                <a href="https://cq.esf.fang.com" target="_blank"><img class="fang"
                        src="../../assets/logo/fangtianxia.jpg"></a>
            </div>
            <div class="sellfontU">
                <ul class="sellsale-content-tip clear" style="margin:0px">
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
        <!--   <a-modal title="添加小区" v-model="addxq" @ok="addok">
            <div style="width:100%">
                <div>
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区名称:"
                            validate-status="" help="">
                            <a-input id="" style="width:50%;" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区类型:"
                            validate-status="error" help="">
                            <a-select default-value="1" class="sellshihaoselw sellmianji" style="width:50%">
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
                            <a-select :defaultValue="proquyuseData[0]" :value="refQuyu" style="width: 120px">
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
        </a-modal>-->
        <!-- 基本信息 -->
        <div class="sellwrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*小区:" validate-status=""
                            help="">
                            <a-input id="error" v-model="ref.xiaoquName" placeholder="房源所属小区" style="width:50%;" />
                            <!--<label class="selladdshowxq">找不到小区？</label>
                            <a class="selladdshowxq" @click="addshowxaqu">查看相似小区</a>
                            <a class="selladdshowxq" @click="addxiaoqu">我要添加小区</a>-->
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*区域:" validate-status="">
                            <a-select :defaultValue="provinceData[0]" style="width: 120px" v-model="refQuyu">
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
                                class="sellmianji" />
                            <label class="sellsmianij" style="">平方米</label>
                        </a-form-item>

                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.square" id="warning2" placeholder="活动面积"
                                class="sellmianji" />
                            <label class="sellsmianij">平方米</label>
                        </a-form-item> -->

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="新三网户室号:" has-feedback
                            validate-status="" help="">
                            <a-input id="error2" placeholder="" class="sellshihaow" />
                            <a-select default-value="栋" class="sellshihaoselw sellmianji">
                                <a-select-option v-for="(index,i) in danyuan" :key="i" :value="index">
                                    {{index}}
                                </a-select-option>
                            </a-select>
                            <a-input  placeholder="" class="sellshihaow" />
                            <a-select default-value="单元" class="sellshihaoselw sellmianji">
                                <a-select-option v-for="(index,i) in zhuang" :key="i" :value="index">
                                    {{index}}
                                </a-select-option>
                            </a-select>
                            <a-input  placeholder="" class="sellshihaow" />
                            <label class="sellsmianij">室</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*户型" has-feedback
                            validate-status="" width='100%'>
                            <a-select default-value="1" class="firhuxing" v-model="selectedShi">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>室</label>
                            <a-select default-value="1" class="sellhuxing" v-model="selectedTing">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厅</label>
                            <a-select default-value="1" class="sellhuxing" v-model="selectedChu">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厨</label>
                            <a-select default-value="1" class="sellhuxing" v-model="selectedWei">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>卫</label>
                            <a-select default-value="1" class="sellhuxing" v-model="selectedTai">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>阳台</label>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*价格" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.rice" placeholder="" class="sellmianji" />
                            <label class="sellsmianij">万</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建造年代" has-feedback
                            validate-status="">
                            <a-input-number :min="1950" :max="2019" v-model="jianzaoniandai" class="sellmianji" />
                            <label class="sellsmianij">年</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*所在楼层" has-feedback
                            validate-status="" help="">
                            <a-input-number :min="1" :max="100" v-model="ceng" />
                            <label class="sellsmianij">楼</label>
                            <label class="sellglaber">共</label>
                            <a-input-number :min="1" :max="100" v-model="lou" />
                            <label class="sellsmianij">楼</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*朝向" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncx" :defaultValue="value2" v-model="ref.chaoxiang" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="看房时间" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncf" :defaultValue="value3" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="装修程度" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionzx" :defaultValue="value4" v-model="laf.zhuangxiu" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="供暖情况" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptiongn" :defaultValue="value5" v-model="gongnuan" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部编号:" validate-status=""
                            help="">
                            <a-input placeholder="" class="sellmianji" />
                            <!-- <label class="sellneibula">内部编号为0~20位,只能由数字和字母组成</label> -->
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*房源标签:" validate-status=""
                            help="">
                            <!-- <a-input id="" v-model="ref.fangyuanBiaoqian" placeholder="" /> -->
                            <a-input v-model="this.nianxian" placeholder="" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*配套标签:" validate-status=""
                            help="">
                            <a-input v-model="ref.peitaoBiaoqain" placeholder="" />
                        </a-form-item>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>

        <!-- 住宅信息 -->
        <div class="sellwrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房屋类别：" has-feedback
                            v-model="ref.fangwuLeixing" validate-status="">
                            <a-radio-group :options="plainOptionfwlb" :defaultValue="value8" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*房屋产权：" has-feedback
                            validate-status="">
                            <a-select default-value="" class="zhuzhaibox " v-model="ref.fangwuChanquan">
                                <a-select-option v-for="(root,i) in houseroot" :key="i" :value="root">
                                    {{root}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*产权年限" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionnianxian" v-model="chanquanNianxian" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建筑形式" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionjianzhutype" :defaultValue="valuetype" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建筑结构" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionjianzhujiegou" :defaultValue="valuejieg" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*房屋年限" has-feedback
                            validate-status="">
                            <!-- <a-radio-group :options="plainOptionroot" :defaultValue="valueroot"
                                v-model="fangyuanBiaoqian" /> -->
                            <a-radio-group :options="plainOptionroot" v-model="fangyuanBiaoqian" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*唯一住房" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionweiyi" :defaultValue="valueweiyi"
                                v-model="ref.weiyizhufang" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*新房/二手房" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionhouse" :defaultValue="valuehouse"
                                v-model="ref.houseType" />
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*佣金比例：" has-feedback
                            validate-status="">
                            <label class="yongjinlabel">≤</label>
                            <a-input-number :min="0" :max="10" :step="0.5" v-model="yongjin" />
                            <label class="sellyongjingbox">%</label>
                        </a-form-item> 
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*电梯" has-feedback
                            validate-status="">
                            <a-checkbox :checked="checked" @change="onChange"></a-checkbox>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*基础设施" has-feedback
                            validate-status="">
                            <a-checkbox-group :options="plainOptionsjichu" v-model="jichucheckedList" />
                            <!-- <a-checkbox>水</a-checkbox>
                            <a-checkbox>电</a-checkbox>
                            <a-checkbox>煤气/天然气</a-checkbox>
                            <a-checkbox>有线电视</a-checkbox>
                            <a-checkbox>暖气</a-checkbox>
                            <a-checkbox>车位</a-checkbox>
                            <a-checkbox>露台</a-checkbox>
                            <a-checkbox>阁楼</a-checkbox>
                            <a-checkbox>储藏室/地下室</a-checkbox> -->
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*配套设施" has-feedback
                            validate-status="">
                            <a-checkbox-group :options="plainOptionspeitao" v-model="peitaocheckedList" />
                            <!-- <a-checkbox>电话</a-checkbox>
                            <a-checkbox>热水器</a-checkbox>
                            <a-checkbox>彩电</a-checkbox>
                            <a-checkbox>空调</a-checkbox>
                            <a-checkbox>冰箱</a-checkbox>
                            <a-checkbox>洗衣机</a-checkbox>
                            <a-checkbox>家具</a-checkbox>
                            <a-checkbox>床</a-checkbox>
                            <a-checkbox>宽带网</a-checkbox>
                            <a-checkbox>微波炉</a-checkbox>
                            <a-checkbox>衣柜</a-checkbox>
                            <a-checkbox>沙发</a-checkbox>
                            <a-checkbox>厨具（可做饭）</a-checkbox>
                            <a-checkbox>独立卫生间</a-checkbox> -->
                        </a-form-item>
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <div class="sellfilter-wraps sellwrapscolor">
            <div class="sellsearch_bds">
                <div class="tishi">
                    <i class="iconfont icon-tishi"></i>贴心提示:
                </div>
                <div>
                    1.房源标题目的：突出房子的主要特点，吸引客户，增加点击量和电话量。
                </div>
                <div>
                    2.完整的房源标题应该是：商圈+卖点+楼盘名称+户型+卖点。
                </div>
                <div>
                    3.开单王会自动检测标题与描述中的敏感词,查看敏感词(继续修改时，房源描述一侧会有“标红”字体出现)
                </div>
            </div>
        </div>
        <!-- 房源介绍 -->
        <div class="sellwrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <span v-if="anchorerror == 'title'" id="anchor-error"></span>
                                <label class="selllabeltle">*信息标题：</label><label>好的标题是增加点击，吸引眼球第一步！</label>
                            </div>
                            <div>
                                <!-- <a-input v-model="ref.title" placeholder="字数限制10-30" style="width:50%;" /> -->
                                <a-input v-model="title" placeholder="字数限制10-30" style="width:50%;"
                                    @blur="blur('title')" />
                                <span class="errormsg" v-if="titleerror">信息标题不能为空</span>
                                <span class="errormsg" v-if="titlezishu">内容不能包含“最”</span>
                            </div>
                        </div>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <span v-if="anchorerror == 'note'" id="anchor-error"></span>
                                <label class="selllabeltle">*信息描述：</label><label>30-300字效果为最佳</label>
                            </div>
                            <div>
                                <a-textarea v-model="note" style="width:50%;" :rows="6" @blur="blur('note')" />
                                <span class="errormsg" v-if="noteerror">信息描述不能为空</span>
                                <span class="errormsg" v-if="notezishu">字数限制在30-300，且不能包含“最”</span>
                                <div>
                                    <label class="sellminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲
                                        《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                </div>
                            </div>
                        </div>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <span v-if="anchorerror == 'atittude'" id="anchor-error"></span>
                                <label class="selllabeltle">*业主心态：</label><label>从房东卖房原因、是否急售等方面进行描述</label><label
                                    class="putnumber">(字数限制20-300)</label>
                            </div>
                            <div>
                                <a-textarea v-model="atittude" style="width:50%;" :rows="5" @blur="blur('atittude')" />
                                <span class="errormsg" v-if="atittudeerror">业主心态不能为空</span>
                                <span class="errormsg" v-if="atittudezishu">字数限制在20-300，且不能包含“最”</span>
                                <div>
                                    <label class="sellminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲
                                        《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                </div>
                            </div>
                        </div>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <span v-if="anchorerror == 'fuwuCondition'" id="anchor-error"></span>
                                <label class="selllabeltle">服务介绍:</label>
                                <label>多角度描述您的服务优势，例如：行业年限、专业经验、服务态度、可提供的服务种类等</label>
                                <label class="sellputnumber">(字数限制20-300)</label>
                            </div>
                            <div>
                                <a-textarea :rows="5" style="width:50%;" v-model="fuwuCondition"
                                    @blur="blur('fuwuCondition')" />
                                <span class="errormsg" v-if="fuwuConditionerror">服务介绍不能为空</span>
                                <span class="errormsg" v-if="fuwuConditionzishu">字数限制在20-300，且不能包含“最”</span>
                            </div>
                        </div>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <label class="selllabeltle">*小区配套:</label><label>从交通、教育、医疗、内部环境、车位情况、安保措施方面来描述</label>
                            </div>
                            <div>
                                <a-textarea :rows="5" style="width:50%;" />
                            </div>
                        </div>
                        <div class="selltilerbox">
                            <div class="selltiler-firstbox">
                                <label
                                    class="selllabeltle">税费信息:</label><label>相关费用，描述越详尽您的房源质量就会越高，展示给网友的机会就会增加(仅搜房帮)</label>
                            </div>
                            <div>
                                <a-textarea :rows="5" style="width:50%;" />
                            </div>
                        </div>

                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <div class="sellfilter-wraps sellwrapscolor">
            <div class="sellsearch_bds">
                <div class="tishi">
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
        <!-- 图片信息 -->
        <div class="sellwrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="picdivbox selldivallbox">
                            <div class="selllaberboxtitle">上传方式:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsc" :defaultValue="value6" />
                            </div>
                        </div>
                        <div class="picdivbox selldivallbox">
                            <div class="selllaberboxtitle">水印位置:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsy" :defaultValue="value7" />
                            </div>

                        </div>
                        <div class="sellshinei selldivallbox">
                            <div class="selllaberbox">
                                <span class="selllaberboxtitle">&nbsp;封&nbsp;面&nbsp;图:</span>
                                <div class="laberboxla">点击希望设定为封面的图片右下角的封面按钮即可设定。</div>
                            </div>

                            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card"
                                :fileList="imgHeaderList" @preview="handlePreview" @change="handleChange">
                            </a-upload>
                            <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
                            </a-modal>
                        </div>
                        <div class="sellshinei selldivallbox">
                            <div class="selllaberbox">
                                <span class="selllaberboxtitle">室内照片: </span>
                                <div class="shineipadd">
                                    最多20张。您可以<label class="sellpiclaber">从我的图库选择</label>
                                    <a-button type="" class="sellbuttontuku">我的图库</a-button>
                                    <a-button type="" class="sellbuttontuku">高清图库</a-button>
                                    客厅/卧室/厨房等3张以上照片可帮助您获得较好效果！
                                    <label class="orangelaber">可拖拽交换位置</label>
                                </div>
                            </div>
                            <div class="selltupianbox">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card" :fileList="shineiList" @preview="handlePreview"
                                    @change="handleChange">
                                    <!-- <a-button class="updatedbutton">
                                            <a-icon type="upload" />上传图片</a-button> -->
                                </a-upload>
                                <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null"
                                    @cancel="handleCancel">
                                    <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
                                </a-modal>
                            </div>
                        </div>
                        <div class="sellshinei selldivallbox">
                            <div class="selllaberbox">
                                <span class="selllaberboxtitle">&nbsp;房&nbsp;型&nbsp;图:</span>
                                <div class="shineipadd">
                                    <label
                                        class="orangelaber">图片来源于互联网，房源如果需要做保真、安选等需要押金的操作时，为避免违规情况，请尽量自己上传原房源户型图</label>
                                    <a-button type="" class="sellbuttontuku">我的图库</a-button>
                                    <a-button type="" class="sellorangetuku">房型图库</a-button>
                                    <a-button type="" class="sellbuttontuku">在线绘制</a-button>
                                </div>
                            </div>
                            <div class="selltupianbox">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card" :fileList="fangxinlist" @preview="handlePreview"
                                    @change="handleChange">
                                </a-upload>
                            </div>
                        </div>
                        <div class="sellshinei selldivallbox">
                            <div class="selllaberbox">
                                <span class="selllaberboxtitle">小区图片:</span>
                                <div class="shineipadd">
                                    <span>最多10张。您可以</span>
                                    <label class="sellpiclaber">从我的图库选择</label>
                                    <span>或者</span>
                                    <label class="sellpiclaber">从小区图库选择</label>
                                    <a-button type="" class="sellbuttontuku">我的图库</a-button>
                                    <a-button type="" class="sellbuttontuku">小区图库</a-button>
                                </div>
                                <div class="sellxiala">
                                    <a-dropdown>
                                        <a-menu slot="overlay">
                                            <a-menu-item v-for="(pilaingsy,index) of pilianglist" :key="index">
                                                <a-icon type="user" />{{pilaingsy}}</a-menu-item>
                                        </a-menu>
                                        <a-button class="selltupianchuli">图片处理
                                            <a-icon type="up" />
                                        </a-button>
                                    </a-dropdown>
                                </div>
                            </div>
                            <div class="sellradisflex">
                                <div class="selltupianbox">
                                    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card" :fileList="xiaoQuList" @preview="handlePreview"
                                        @change="handleChange">
                                    </a-upload>
                                    <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null"
                                        @cancel="handleCancel">
                                        <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
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
                        <div class="sellfangyuansp">
                            <div class="selllaberbox">
                                <span class="selllaberboxtitle">房源视频:</span>
                                <label> 视频大小在300M内，视频长度在1-3分钟为最佳，视频过短新三网审核不予通过。</label>
                                <div>
                                    <a-upload name="file" :multiple="true"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers">
                                        <a-button class="sellupdatedspbutton">
                                            <a-icon type="upload" />添加视频 </a-button>
                                    </a-upload>
                                </div>
                            </div>
                        </div>
                        <div class="sellbottomobx">
                            <a-button type="" id='anchor-save' class="sellbuttonfang sellokbutton" v-anchor='anchor'
                                @click="saveHouse()" :disabled="savedisabled" :loading="loading">保存房源</a-button>
                            <a-button type="" class="sellokbutton">保存草稿</a-button>
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
    const houseroot = ['商品房', '商住两用', '经济适用房', '使用权', '公房', '其他'];
    const plainOptionnianxian = ['70年', '50年', '40年'];
    const plainOptionjianzhutype = ['板楼', '塔楼', '板塔结合', '砖混', '其他',];
    const plainOptionjianzhujiegou = ['平层', '错层', '跃层', '复式', '开间',];
    const plainOptionroot = ['满五年', '满二年', '不满二年'];
    const plainOptionweiyi = ['是', '否'];
    const plainOptionhouse = ['新房', '二手房'];
    const zhuang = ['单元', '号', '幢', '栋', '号楼'];
    const danyuan = ['栋', '号', '弄', '座', '号楼', '胡同'];
    const plainOptionspeitao = ['电话', '热水器', '彩电', '空调', '冰箱', '洗衣机', '家具', '宽带网', '微波炉', '衣柜', '沙发', '厨具（可做饭）', '独立卫生间'];
    const plainOptionsjichu = ['水', '煤气/天然气', '有线电视', '暖气', '车位', '露台', '阁楼', '储藏室/地下室'];

    export default {
        data() {
            return {
                loading: false,
                //禁止点击
                savedisabled: false,
                checked: false,
                anchorerror: '',
                anchor: 'error',
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
                plainOptionnianxian,
                plainOptionfwlb,
                houseroot,
                plainOptionjianzhutype,
                plainOptionjianzhujiegou,
                plainOptionroot,
                plainOptionweiyi,
                plainOptionhouse,
                danyuan,
                zhuang,
                yongjin: '', //佣金比例
                plainOptionspeitao,
                plainOptionsjichu,
                peitaocheckedList: [],
                jichucheckedList: [],
                value2: '东',
                value3: '随时看房',
                value4: '豪华装修',
                value5: '集体供暖',
                value6: '普通上传',
                value7: '不加水印',
                value8: '普通住宅',
                chanquanNianxian: '70年',
                valuetype: '板楼',
                valuejieg: '平层',
                // valueroot: '满五年',
                fangyuanBiaoqian: '满五年',
                nianxian: '',
                valueweiyi: '是',
                valuehouse: '二手房',
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                tstyle: {
                    height: '470px'
                },
                style: {
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
                houseType: '二手房',
                userId: '48639146-0751-11EA-87FE-305A3A80A208',
                urlss: '',
                text: '',
                hutong: '',
                jianzaoniandai: '',
                ref: {},
                previewVisible: false,
                previewImage: '',
                shineiList: [],
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
                imgH: {},
                refQuyu: '',
                laf: {},
                ZhuaquUrl: '',
                reciveId: this.$route.params.id,
                //必填框
                title: '',
                note: '',
                atittude: '',
                fuwuCondition: '',
                // 错误信息提示
                titlezishu: false,
                notezishu: false,
                fuwuConditionzishu: false,
                atittudezishu: false,

                titleerror: false,
                noteerror: false,
                atittudeerror: false,
                fuwuConditionerror: false,
            }
        },
        activated(options) {
            //页面变化时，清空原有数据
            this.clear()
            console.log("rrrrr" + this.$route.params.id)
            this.reciveId = this.$route.params.id
            if (this.$route.params.id != undefined || this.$route.params.id != null)
                this.backfbdata(this.$route.params.id);
        },

        mounted(options) {
            console.log('options' + options)
            console.log('options' + this.$route.params.id)
            // this.reciveId =options.id;
            // this.kanfang="随时看房";
            this.zhuangxiu = "中等装修";
            this.gongnuan = "自供暖";
        },
        methods: {
            onChange (e) {
                this.checked = e.target.checked
            },
            blur(data) {
                if (data == "title" & this.title == '') {
                    this.titleerror = true
                    this.titlezishu = false
                } else if (data == "title" & this.title != '') {
                    this.titleerror = false
                    if (this.title.includes('最') == true) {
                        this.titlezishu = true
                    } else {
                        this.titlezishu = false
                    }
                } else if (data == "note" & this.note == '') {
                    this.noteerror = true
                    this.notezishu = false
                } else if (data == "note" & this.note != '') {
                    this.noteerror = false
                    if (this.note.length <= 30 || this.note.length >= 300 || this.note.includes('最') == true) {
                        this.notezishu = true
                    } else {
                        this.notezishu = false
                    }
                } else if (data == "atittude" & this.atittude == '') {
                    this.atittudeerror = true
                    this.atittudezishu = false
                } else if (data == "atittude" & this.atittude != '') {
                    this.atittudeerror = false
                    if (this.atittude.length <= 20 || this.atittude.length >= 300 || this.atittude.includes('最') == true) {
                        this.atittudezishu = true
                    } else {
                        this.atittudezishu = false
                    }
                } else if (data == "fuwuCondition" & this.fuwuCondition == '') {
                    this.fuwuConditionerror = true
                    this.fuwuConditionzishu = false
                } else if (data == "fuwuCondition" & this.fuwuCondition != '') {
                    this.fuwuConditionerror = false
                    if (this.fuwuCondition.length <= 20 || this.fuwuCondition.length >= 300 || this.fuwuCondition.includes('最') == true) {
                        this.fuwuConditionzishu = true
                    } else {
                        this.fuwuConditionzishu = false
                    }
                }

            },
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
            },
            //插入一条url数据链接
            async onSearch(params) {
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
                    houseType: this.houseType,
                    weiYiUrl: this.text
                };
                console.log("正在秒录，请耐心等待......")
                this.disabled = true;
                //清空原有数据
                this.clear()
                if (RegExp(/anjuke/).exec(params))
                    this.ZhuaquUrl = `${this.$config.api}/api/cms/anJuKe/shopUrl`
                if (RegExp(/cq.58.com/).exec(params))
                    this.ZhuaquUrl = `${this.$config.api}/api/cms/urls/url`
                if (RegExp(/sofang/).exec(params))
                    console.log("我是搜房网");
                if (RegExp(/esf.fang./).exec(params))
                    this.ZhuaquUrl = `${this.$config.api}/api/cms/fang/fangUrl`
                await this.$http.post(this.ZhuaquUrl, data).then(response => {
                    this.spinning = true;
                    if (response.status == 200) {
                        this.$http.get(`${this.$config.api}/api/cms/urls/url` + '?userId=' + this.userId + '&url=' + this.urlss + '&houseType=' + this.houseType + '&weiYiUrl=' + this.text).then(res => {
                            console.log(`抓取数据:` + JSON.stringify(res.data))
                            this.yongjin= '2.0', //佣金比例
                            this.peitaocheckedList = ['电话', '热水器', '彩电', '空调', '冰箱', '洗衣机', '家具', '宽带网', '微波炉', '衣柜', '沙发', '厨具（可做饭）', '独立卫生间']
                            this.jichucheckedList = ['水', '煤气/天然气', '有线电视', '暖气', '车位', '露台', '阁楼', '储藏室/地下室']
                            this.checked = true
                            this.laf = res.data;
                            var ret = res.data.address;
                            if(RegExp(/简/).exec(this.laf.zhuangxiu))
                                 this.laf.zhuangxiu="简装修";
                            console.log(this.laf.zhuangxiu)  
                            var refQu = ret.indexOf('－');
                            this.refQuyu = ret.substring(0, refQu);
                            this.saveRes = res.data;
                            this.chaoxiang = ret.chaoxiang;
                            this.spinning = false;
                            this.ref = res.data;
                            // console.log(this.ref.weiyizhufang.replace(/(^\s*)|(\s*$)/g, ""))
                            //产权年限
                            this.chanquanNianxian = this.ref.chanquanNianxian
                            //信息标题、价格、面积、房源地址、配套标签
                            this.title = this.ref.title
                            this.note = this.ref.note
                            this.atittude = this.ref.atittude
                            this.fuwuCondition = this.ref.fuwuCondition
                            //字符串
                            // console.log("房源标签是否含有html标签？==========" + this.ref.fangyuanBiaoqian);
                            const nianqi = this.ref.fangyuanBiaoqian.replace(/<[^>]+>/g, "")
                            // console.log(nianqi)
                            if (nianqi == '新上') {
                            // console.log("sdgsfsfd")
                                this.fangyuanBiaoqian = "不满二年";
                                this.nianxian = this.fangyuanBiaoqian;
                            }else if(nianqi != '满五年' || nianqi != '满二年' || nianqi != '不满二年'){
                                this.fangyuanBiaoqian = "满二年";
                                this.nianxian = this.fangyuanBiaoqian;
                            }else{
                                this.fangyuanBiaoqian = nianqi;
                                this.nianxian = this.fangyuanBiaoqian;
                            } 
                            // console.log("去掉房源标签含有的html标签成功？==========" + this.fangyuanBiaoqian);
                            this.ceng = this.ref.louceng.substring(0, this.ref.louceng.indexOf("/"));
                            this.lou = this.ref.louceng.substring(this.ref.louceng.indexOf("/") + 1, this.ref.louceng.length);
                            let shi = this.ref.huxing.indexOf("室");
                            let ting = this.ref.huxing.indexOf("厅");
                            let wei = this.ref.huxing.indexOf("卫");
                            let niandai = this.ref.fangwuDate;
                            if (RegExp(/年/).exec(niandai)) {
                                this.jianzaoniandai = niandai.replace('年', '')

                            }
                            else {
                                this.jianzaoniandai = niandai
                            }
                            this.selectedShi = this.ref.huxing.substring(0, shi);
                            this.selectedTing = this.ref.huxing.substring(shi + 1, ting);
                            this.selectedWei = this.ref.huxing.substring(ting + 1, wei);
                            this.spinning = false;
                            var shineiImg = res.data.shineiImg.replace(/'/g, '').replace('[', '').replace(']', '');
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
                            this.imgH.url = ss[0],
                                this.imgH.uid = '20',
                                this.imgH.name = 'xxx.jpg',
                                this.imgH.status = 'done',
                                this.imgHeaderList.push(this.imgH);


                            var imgFangxing = {};
                            imgFangxing.url = res.data.fangxinImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                                imgFangxing.uid = '40',
                                imgFangxing.name = 'xxx.jpg',
                                imgFangxing.status = 'done',
                                this.fangxinlist.push(imgFangxing);


                            var XiaoquImg = {};
                            XiaoquImg.url = res.data.xiaoquImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                                XiaoquImg.uid = '60',
                                XiaoquImg.name = 'xxx.jpg',
                                XiaoquImg.status = 'done',
                                this.xiaoQuList.push(XiaoquImg);
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
            //保存房源
            async saveHouse() {
                if (this.title == '' || this.title.includes('最') == true) {
                    if (this.title == '') {
                        this.titleerror = true
                    } else {
                        this.titlezishu = true
                    }
                    this.anchorerror = 'title'
                    return;
                }
                if (this.note == '' || this.note.length <= 30 || this.note.length >= 300 || this.note.includes('最') == true) {
                    if (this.note == '') {
                        this.noteerror = true
                    } else {
                        this.notezishu = true
                    }
                    this.anchorerror = 'note'
                    return;
                }
                if (this.atittude == '' || this.atittude.length <= 20 || this.atittude.length >= 300 || this.atittude.includes('最') == true) {
                    if (this.atittude == '') {
                        this.atittudeerror = true
                    } else {
                        this.atittudezishu = true
                    }
                    this.anchorerror = 'atittude'
                    return;
                }
                if (this.fuwuCondition == '' || this.fuwuCondition.length <= 20 || this.fuwuCondition.length >= 300 || this.fuwuCondition.includes('最') == true) {
                    if (this.fuwuCondition == '') {
                        this.fuwuConditionerror = true
                    } else {
                        this.fuwuConditionzishu = true
                    }
                    this.anchorerror = 'fuwuCondition'
                    return;
                }
                if (this.reciveId == '' || this.reciveId == undefined) {
                    this.zhuaqubao();
                }
                else {
                    this.xiugaibao();
                }
                // if(this.ref.title.length >= 10 && this.ref.title.length <= 30 && this.ref.title.includes('最')){
                //     if(this.ref.note.length >= 30 && this.ref.note.length <= 300 && this.ref.note.includes('最')){
                //         if(this.ref.atittude.length >= 20 && this.ref.atittude.length <= 300 && this.ref.atittude.includes('最')){
                //             if(this.ref.fuwuCondition.length >= 30 && this.ref.fuwuCondition.length <= 300 && this.ref.fuwuCondition.includes('最')){
                //                 if (this.reciveId == '' || this.reciveId == undefined) {
                //                     this.zhuaqubao();
                //                 }
                //             }
                //         }
                //     }
                // }else {
                //     this.xiugaibao();
                // }
                // console.log(`reciveId:` + this.reciveId)
                // if (this.reciveId == '' || this.reciveId == undefined) {
                //     this.zhuaqubao();
                // }
                // else {
                //     this.xiugaibao();
                // }

            },
            //抓取房源保存
            async zhuaqubao() {
                this.savedisabled = true;
                this.loading = true;
                if (this.saveRes.xiaoquName == null && this.saveRes.title == null &&
                    this.saveRes.rice == null && this.saveRes.simpleRice == null &&
                    this.saveRes.square == null && this.saveRes.huxing == null &&
                    this.saveRes.louceng == null && this.saveRes.zhuangxiu == null && this.saveRes.address == null && this.saveRes.imgHeader == null
                ) {
                    this.openNotificationWithIcon('error')
                    this.savedisabled = false;
                    this.loading = false;
                }
                else {
                    //this.saveRes.urlsId = this.$store.userId;
                    let update = JSON.parse(localStorage.getItem('update'));
                    this.saveRes.urlsId = update.userId;
                    this.saveRes.imgHeader = this.imgH.url;
                    this.saveRes.title = this.title;
                    this.saveRes.note = this.note;
                    this.saveRes.fuwuCondition = this.fuwuCondition
                    this.saveRes.atittude = this.atittude
                    await this.$http.post(`${this.$config.api}/api/cms/house/publishHouse`, this.saveRes).then(response => {
                        if (response.status == 200) {
                            this.savedisabled = false;
                            this.loading = false;
                            this.openNotificationWithIcon('success')
                            this.saveRes = {}
                        }
                    })
                }
            },

            async xiugaibao() {
                this.savedisabled = true;
                this.loading = true;
                if (this.ref.xiaoquName == null && this.ref.title == null &&
                    this.ref.rice == null && this.ref.simpleRice == null &&
                    this.ref.square == null && this.ref.huxing == null &&
                    this.ref.louceng == null && this.ref.zhuangxiu == null && this.ref.address == null && this.ref.imgHeader == null
                ) {
                    this.savedisabled = false;
                    this.loading = false;
                    this.openNotificationWithIcon('error')
                }
                else {
                    //this.saveRes.urlsId = this.$store.userId;
                    let update = JSON.parse(localStorage.getItem('update'));
                    this.ref.urlsId = update.userId;
                    this.ref.imgHeader = this.imgH.url;
                    this.ref.title = this.title;
                    this.ref.note = this.note;
                    this.ref.fuwuCondition = this.fuwuCondition
                    this.ref.atittude = this.atittude
                    this.ref.publishStatus = '未发布'
                    await this.$http.post(`${this.$config.api}/api/cms/house/baocunData`, this.ref).then(response => {
                        if (response.status == 200) {
                            this.savedisabled = false;
                            this.loading = false;
                            this.openNotificationWithIcon('success')
                            this.saveRes = {}
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
                            '保存房源成功后将存入云发布-出售群发列表',
                    });
                    this.$router.replace('/salerelease')
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
            cancelClick(){
                this.spinning = false;
                this.disabled = false;
            },
            handleOk(e) {
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
            async backfbdata(backid) {
                console.log("返回id：" + backid)
                await this.$http.post(`${this.$config.api}/api/cms/house/` + backid + `/backPubData`).then(res => {
                    this.yongjin= '2.0', //佣金比例
                    this.peitaocheckedList = ['电话', '热水器', '彩电', '空调', '冰箱', '洗衣机', '家具', '宽带网', '微波炉', '衣柜', '沙发', '厨具（可做饭）', '独立卫生间']
                    this.jichucheckedList = ['水', '煤气/天然气', '有线电视', '暖气', '车位', '露台', '阁楼', '储藏室/地下室']
                    this.checked = true
                    // console.log(`抓取数据:` + JSON.stringify(res.data))
                    this.laf = res.data;
                    var ret = res.data.address;
                    var refQu = ret.indexOf('－');
                    this.refQuyu = ret.substring(0, refQu);
                    this.saveRes = res.data;
                    this.chaoxiang = ret.chaoxiang;
                    this.spinning = false;
                    this.ref = res.data;
                    if(RegExp(/简/).exec(this.laf.zhuangxiu))
                        this.laf.zhuangxiu="简装修";
                    //产权年限
                    this.chanquanNianxian = this.ref.chanquanNianxian
                    //信息标题、价格、面积、房源地址、配套标签
                    this.title = this.ref.title
                    this.note = this.ref.note
                    this.atittude = this.ref.atittude
                    this.fuwuCondition = this.ref.fuwuCondition
                    //字符串
                    const nianqi = this.ref.fangyuanBiaoqian.replace(/<[^>]+>/g, "")
                    if (nianqi == "新上")
                        this.fangyuanBiaoqian = "不满二年";
                    else
                        this.fangyuanBiaoqian = nianqi;
                    //this.fangyuanBiaoqian = this.ref.fangyuanBiaoqian.replace(/<[^>]+>/g,"");
                    this.ceng = this.ref.louceng.substring(0, this.ref.louceng.indexOf("/"));
                    this.lou = this.ref.louceng.substring(this.ref.louceng.indexOf("/") + 1, this.ref.louceng.length);
                    let shi = this.ref.huxing.indexOf("室");
                    let ting = this.ref.huxing.indexOf("厅");
                    let wei = this.ref.huxing.indexOf("卫");
                    let niandai = this.ref.fangwuDate;
                    if (RegExp(/年/).exec(niandai)) {
                        this.jianzaoniandai = niandai.replace('年', '')

                    }
                    else {
                        this.jianzaoniandai = niandai
                    }
                    this.selectedShi = this.ref.huxing.substring(0, shi);
                    this.selectedTing = this.ref.huxing.substring(shi + 1, ting);
                    this.selectedWei = this.ref.huxing.substring(ting + 1, wei);
                    this.spinning = false;
                    var shineiImg = res.data.shineiImg.replace(/'/g, '').replace('[', '').replace(']', '');
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
                    this.imgH.url = ss[0],
                        this.imgH.uid = '-150',
                        this.imgH.name = 'xxx.jpg',
                        this.imgH.status = 'done',
                        this.imgHeaderList.push(this.imgH);


                    var imgFangxing = {};
                    imgFangxing.url = res.data.fangxinImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                        imgFangxing.uid = '-50',
                        imgFangxing.name = 'xxx.jpg',
                        imgFangxing.status = 'done',
                        this.fangxinlist.push(imgFangxing);


                    var XiaoquImg = {};
                    XiaoquImg.url = res.data.xiaoquImg.replace(/'/g, '').replace('[', '').replace(']', ''),
                        XiaoquImg.uid = '-100',
                        XiaoquImg.name = 'xxx.jpg',
                        XiaoquImg.status = 'done',
                        this.xiaoQuList.push(XiaoquImg);
                })
            },
            //清空数据
            clear(){
                this.ref.xiaoquName = ''
                this.ref.chaoxiang = '东'
                this.ref.address = ''
                this.ref.square = ''
                this.ref.rice = ''
                this.ref.peitaoBiaoqain = ''
                this.ref.fangwuLeixing = ''
                this.ref.fangwuChanquan = ''
                this.ref.weiyizhufang = '是'
                this.ref.houseType = '二手房'
                this.laf.zhuangxiu = '豪华装修'
                this.refQuyu = ''
                this.selectedShi = ''
                this.selectedTing = ''
                this.selectedChu = ''
                this.selectedWei = ''
                this.selectedTai = ''
                this.jianzaoniandai = ''
                this.ceng = ''
                this.lou = ''
                this.nianxian = ''
                this.chanquanNianxian = '70年'
                this.fangyuanBiaoqian = '满五年'
                this.title = ''
                this.note = ''
                this.atittude = ''
                this.fuwuCondition = ''
                this.shineiList = []
                this.imgHeaderList = []
                this.xiaoQuList = []
                this.fangxinlist = []
                this.yongjin= '', //佣金比例
                this.peitaocheckedList = []
                this.jichucheckedList = []
                this.checked = false
            }
        }
    }
</script>
<style lang="less" scoped>
    .errormsg {
        margin-left: 10px;
        color: red;
    }

    .ant-checkbox-group {
        margin-top: 10px;
    }

    .selllogo {
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

    .sellwrap {
        width: 100%;
        display: flex;
        flex: 0 0 auto;
    }

    .sellts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;

    }

    .sellfilter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .sellfilter-wraps .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .sellsale-content-tip {
        margin: 8px 0;
        background-color: #ffffdd;
        padding: 8px;
        border: 1px solid #fcfcb3;
        border-radius: 5px;
        font-size: 12px;
    }

    /* // .ant-modal-close {
    //     display: none;
    // } */

    .sellsearch_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;

        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .selltishi {
        display: flex;
        align-items: center;
    }

    .sellfilter-wraps .sellsearch_bds .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .sellfontU {
        position: absolute;
        bottom: 50px;
        right: 0px;
    }

    /* .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    } */

    .sellsale-content-tip li {
        line-height: 20px;
        font-size: 12px;
        list-style: none;
    }

    /* .ant-modal-content {
        width: 800px !important;
        height: 700px !important;
    } */

    li {
        list-style: none;
    }

    /* .ant-modal-body {
        height: 85%;
    } */

    .sellshihaow {
        width: 70px !important;
        padding-right: 8px;
    }

    .sellsmianij {
        padding-left: 8px;
    }

    .sellmianji {
        width: 120px !important;
    }

    .sellhuxing {
        width: 90px !important;
        padding-right: 5px;
        padding-left: 25px
    }

    .zhuzhaibox {
        width: 180px !important;
    }

    .firhuxing {
        width: 65px !important;
        padding-right: 5px;
    }

    .sellshihaoselw {
        padding-right: 22px;
        padding-left: 8px;
    }

    .sellglaber {
        padding-left: 17px;
        padding-right: 5px;
    }

    .sellradisflex {
        display: flex;
    }

    .sellneibula {
        font-size: 12px;
        color: red;
        padding-left: 5px;
    }

    .sellwrapscolor {
        padding: 0px 24px 0px 24px;
        background: #f0f2f5;
    }

    .selldivallbox {
        display: flex;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;

    }

    .sellpicdivbox {
        display: flex;
        align-items: center;
        height: 40px !important;
    }

    .selllaberbox {
        display: flex;
        align-items: center;
    }

    .selllaberboxtitle {
        color: red;
        padding-right: 10px;
    }

    .selltupianbox {

        padding-left: 60px;
    }

    .sellshinei {
        min-height: 180px !important;
        flex-flow: column;
        flex: 0 0 auto;
    }

    .sellpiclaber {
        color: green;
    }

    /* .sellfangxingtu {

        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;

    } */

    /* .sellxiaoqupic {
        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;
    } */

    .sellfangyuansp {
        display: flex;
        width: 100% !important;
        padding-left: 20px;
        height: 70px !important;
    }

    .sellbottomobx {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;
        height: 40px !important;
    }

    .sellbuttonfang {
        margin-right: 15px;
    }

    .sellorangelaber {
        color: orange;
    }

    .sellbuttontuku {
        background-color: green;
        color: white;
        margin-right: 5px;
    }

    .sellorangetuku {
        background-color: orange;
        color: white;
        margin-right: 5px;
    }

    /* .sellupdatedbutton {
        background-color: green;
        color: white;
        border-radius: 20px;
    } */

    .sellupdatedspbutton {
        background-color: green;
        color: white;
        height: 30px !important;
        width: 100px !important;
    }

    .sellxiala {
        padding-left: 28%;
    }

    .sellokbutton {
        background-color: red;
        color: white;
    }

    .selltupianchuli {
        background-color: #f0f2f5;
    }

    .selladdshowxq {
        padding-left: 5px;
        font-size: 14px
    }

    .sellant-modal {
        width: 800px !important;
        height: 700px !important;
    }

    .selllabeltle {
        font-weight: bold;
        color: black;
    }

    .selltilerbox {
        padding-left: 20px;
        padding-top: 20px;
    }

    .selltiler-firstbox {
        padding-bottom: 10px;

    }

    .sellminganlabel {
        color: darkgrey;
    }

    .sellputnumber {
        color: orange;
    }

    .sellyongjingbox {
        padding-left: 5px;
        font-size: 16px;
    }

    .yongjinlabel {
        font-size: 16px;
        padding-right: 8px;
    }
</style>