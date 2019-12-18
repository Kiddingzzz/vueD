<template>
    <div class="luruts">
        <div class="lurufilter-wraps" style="padding: 24px 24px 0px 24px;">
            <div class="lurusearch_bds">
                <div class="lurutishi">
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
        <a-modal title="秒录房源" width='800px' :bodyStyle="tstyle" v-model="visible" @ok="handleOk" :destroyOnClose="true" cancelText="取消" okText="确定">
            <p>1.点击网站logo可以快速进入对应的网站查看房源:(不会使用?查看帮助)</p>
            <p>2.把需要获取的房源地址粘贴到文本框中,点击“立即秒录”:
                <br /><br />
                <a-input-search placeholder="复制链接" @search="onSearch" enterButton="立即秒录" size="large" />
                <a-spin :spinning="spinning">
                </a-spin>
            </p>
            <div class="shangpulogo">
                <a href="https://cq.58.com/shangpucs" target="_blank"><img class="wuba" src="../../assets/logo/58logo.png"></a>
                <a href="https://cq.sydc.anjuke.com/sp-shou" target="_blank"><img class="anju" src="../../assets/logo/anjuke.jpg"></a>
                <a href="https://cq.shop.fang.com" target="_blank"><img class="fang" src="../../assets/logo/fangtianxia.jpg"></a>
            </div>
            <div class="lurufontU">
                <ul class="lurusale-content-tip clear" style="margin:0px">
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
        <!-- 基本信息 -->
        <div class="luruwrap">
            <a-layout style="padding: 24px 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*标题:" validate-status=""
                            help="">
                            <a-input id="error" v-model="ref.xiaoquName" placeholder="房源所属小区" style="width:50%;" @blur="blur('xiaoquName')" /> -->
                            <!--<label class="selladdshowxq">找不到小区？</label>
                            <a class="selladdshowxq" @click="addshowxaqu">查看相似小区</a>
                            <a class="selladdshowxq" @click="addxiaoqu">我要添加小区</a>-->
                        <!-- </a-form-item> -->
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*区域:" validate-status="">
                            <a-select :defaultValue="provinceData[0]" style="width: 120px" v-model="shoprefQuyu">
                                <a-select-option v-for="(province,index) of provinceData" :key="index"
                                    :value="province">{{province}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="地址" has-feedback
                            validate-status="" help="">
                            <a-input v-model="shopref.shopAdress" id="validating" placeholder="房源地址" />
                        </a-form-item>

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*面积:" has-feedback
                            validate-status="">
                                <a-input type="number" v-model="shopref.shopSquare" id="success" 
                                    class="lurumianji" />
                                <label class="lurusmianij" style="">平方米</label>
                        </a-form-item>

                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用面积:" has-feedback
                            validate-status="">
                            <a-input type="number" v-model="ref.square" id="warning2" placeholder="活动面积"
                                class="lurumianji" />
                            <label class="lurusmianij">平方米</label>
                        </a-form-item> -->

                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="新三网户室号:" has-feedback
                            validate-status="" help="">
                            <a-input id="error2" placeholder="" class="lurushihaow"  />
                            <a-select default-value="栋" class="lurushihaoselw lurumianji" >
                                <a-select-option  v-for="(index,i) in danyuan" :key="i" :value="index">
                                    {{index}}
                                </a-select-option>
                            </a-select>
                            <a-input id="" placeholder="" class="lurushihaow" />
                            <a-select default-value="单元"  class="lurushihaoselw lurumianji">
                                    <a-select-option v-for="(index,i) in zhuang" :key="i" :value="index">
                                            {{index}}
                                    </a-select-option>
                            </a-select>
                            <a-input id="" placeholder="" class="lurushihaow" />
                            <label class="lurusmianij">室</label>
                        </a-form-item> -->

                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*户型" has-feedback
                            validate-status="" width='100%'>
                            <a-select default-value="1" class="firhuxing" v-model="selectedShi">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>室</label>
                            <a-select default-value="1" class="luruhuxing" v-model="selectedTing">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厅</label>
                            <a-select default-value="1" class="luruhuxing" v-model="selectedChu">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>厨</label>
                            <a-select default-value="1" class="luruhuxing" v-model="selectedWei">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>卫</label>
                            <a-select default-value="1" class="luruhuxing" v-model="selectedTai">
                                <a-select-option v-for="(option,i) in options" :key="i" :value="option">
                                    {{option}}
                                </a-select-option>
                            </a-select>
                            <label>阳台</label>
                        </a-form-item> -->

                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*价格" has-feedback
                            validate-status="">
                            <a-input type="number" id="" v-model="shopref.shopRice" placeholder="" class="lurumianji" />
                            <label class="lurusmianij">万元</label>
                        </a-form-item>
                       <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*建造年代" has-feedback
                            validate-status="" >
                            <a-input-number :min="1950" :max="2019" v-model="ref.fangwuDate" class="lurumianji" />
                            <label class="lurusmianij">年</label>
                        </a-form-item>-->
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*所在楼层" has-feedback
                            validate-status="" help="">
                            <a-input-number :min="1" :max="100" v-model="shopceng" />
                            <label class="lurusmianij">楼</label>
                            <label class="luruglaber">共</label>
                            <a-input-number :min="1" :max="100" v-model="shoplou" />
                            <label class="lurusmianij">楼</label>
                        </a-form-item>
                         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="看房时间" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncf" :defaultValue="cfvalue" v-model="shopref.lookShop" />
                        </a-form-item>
                        <!--<a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*朝向" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptioncx" :defaultValue="chaoxiangvalue" v-model="shopref.chaoxiang" />
                        </a-form-item>
                       
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="装修程度" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptionzx" :defaultValue="zxvalue" v-model="laf.zhuangxiu"/>
                        </a-form-item>-->
                        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="供暖情况" has-feedback
                            validate-status="">
                            <a-radio-group :options="plainOptiongn" :defaultValue="value5" v-model="gongnuan" />
                        </a-form-item> 
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="内部编号:" validate-status=""
                            help="">
                            <a-input id="" placeholder="" class="lurumianji" />
                            <label class="luruneibula">内部编号为0~20位,只能由数字和字母组成</label>
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*房源标签:" validate-status=""
                            help="">
                           
                            <a-input id="" v-model="fangyuanBiaoqian" placeholder="" />
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
        <div class="luruwrap">
                <a-layout style="padding: 24px 24px 24px 24px">
                    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                        <a-form>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*商铺类型：" has-feedback 
                              validate-status="">
                                <a-select default-value="" class="zhuzhaibox" v-model="shopref.shoptype">
                                    <a-select-option v-for="(root,i) in houseroot" :key="i" :value="root" >
                                        {{root}}
                                    </a-select-option>
                                </a-select>
                           </a-form-item>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*商铺状态：" has-feedback 
                                validate-status="">
                                <a-radio-group :options="plainOptionzhuangtai" :defaultValue="zhuangtaivalue"  v-model="shopref.jingyingZt"/>
                            </a-form-item>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="目标业态" has-feedback
                           validate-status="" style="line-height:20px !important;">
                           <a-checkbox-group :options="plainOptionsyetai" v-model="yetaicheckedList" />
                                <!-- <a-checkbox >百货超市</a-checkbox>
                                <a-checkbox >酒店宾馆</a-checkbox>
                                <a-checkbox >家居建材</a-checkbox>
                                <a-checkbox >服饰鞋包</a-checkbox>
                                <a-checkbox >生活服务</a-checkbox>
                                <a-checkbox >美容美发</a-checkbox>
                                <a-checkbox >餐饮美食</a-checkbox>
                                <a-checkbox >休闲娱乐</a-checkbox>
                                <a-checkbox >其它</a-checkbox> -->
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="客流人群" has-feedback
                           validate-status="">
                                <!-- <a-checkbox >办公</a-checkbox>
                                <a-checkbox >学生</a-checkbox>
                                <a-checkbox >居民</a-checkbox>
                                <a-checkbox >旅游</a-checkbox>
                                <a-checkbox >其它</a-checkbox> -->
                                <a-checkbox-group :options="plainOptionskeliu" v-model="keliucheckedList" />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="相关费用:" validate-status="">
                                <!-- <a-input id="" v-model="shopref.xiangguanFy" class="luruwuyemoney" />元/平米·月 -->
                                <a-input id="" v-model="xiangguanFy" class="luruwuyemoney" />元/平米·月
                            </a-form-item>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="电费:" validate-status="">
                                <a-input id="" placeholder="" class="luruwuyemoney" />元/度 
                            </a-form-item>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="水费:" validate-status="">
                                <a-input id="" placeholder="" class="luruwuyemoney" />元/吨 
                            </a-form-item>
                            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="预期租金收益:" validate-status="">
                                <a-input id="" v-model="shopref.yuqiShouyi" class="luruwuyemoney" />元/月
                            </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商铺性质" has-feedback 
                           validate-status="">
                              <a-radio-group :options="plainOptionxingzhi" :defaultValue="xingzhivalue"  />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="是否分割" has-feedback
                           validate-status="">
                              <a-radio-group :options="plainOptionfenge" :defaultValue="fengevalue" />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="是否临街" has-feedback
                           validate-status="">
                              <a-radio-group :options="plainOptionlinjie" :defaultValue="linjievalue" v-model="shifoulj" />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="增值税" has-feedback
                           validate-status="">
                              <a-radio-group :options="plainOptionzengzhishui" :defaultValue="zengzhishuivalue" />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="个税" has-feedback v-model="ref.houseType"
                           validate-status="">
                              <a-radio-group :options="plainOptiongeshui" :defaultValue="geshuivalue" />
                           </a-form-item>
                           <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="配套设施" has-feedback
                           validate-status="">
                            <a-checkbox-group :options="plainOptionspeitao" v-model="peitaocheckedList" />
                                <!-- <a-checkbox >货梯</a-checkbox>
                                <a-checkbox >扶梯</a-checkbox>
                                <a-checkbox >客梯</a-checkbox>
                                <a-checkbox >暖气</a-checkbox>
                                <a-checkbox >中央空调</a-checkbox>
                                <a-checkbox >停车位</a-checkbox>
                                <a-checkbox >上水</a-checkbox>
                                <a-checkbox >天燃气</a-checkbox>
                                <a-checkbox >网络</a-checkbox>
                                <a-checkbox >下水</a-checkbox>
                                <a-checkbox >排烟</a-checkbox>
                                <a-checkbox >排污</a-checkbox>
                                <a-checkbox >管煤</a-checkbox>
                                <a-checkbox >380V</a-checkbox>
                                <a-checkbox >可明火</a-checkbox>
                                <a-checkbox >可外摆</a-checkbox> -->
                           </a-form-item>
                        </a-form>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*面宽:" validate-status="">
                            <a-input id="" v-model="wid" class="luruwuyemoney" />米 
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*层高:" validate-status="">
                            <a-input id="" v-model="cenhig" class="luruwuyemoney" />米 
                        </a-form-item>
                        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="*进深:" validate-status="">
                            <a-input id="" v-model="jinshen" class="luruwuyemoney" />米
                        </a-form-item>
                    </a-layout-content>
                </a-layout>
        </div>
        <div class="lurufilter-wraps luruwrapscolor">
            <div class="lurusearch_bds">
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
                    3.小蜜书会自动检测标题与描述中的敏感词,查看敏感词(继续修改时，房源描述中的敏感词会“标红”)
                </div>
            </div>
        </div>
        <!-- 房源介绍 -->
        <div class="luruwrap">
           <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                         <div class="lurutilerbox">
                             <div class="lurutiler-firstbox">
                                <label class="lurulabeltle">*信息标题：</label><label>好的标题是增加点击，吸引眼球第一步！</label>
                             </div>
                             <div>
                                  <a-input v-model="shopref.shopTitle"  placeholder="字数限制10-30" style="width:50%;" />
                             </div>
                         </div>
                         <div class="lurutilerbox">
                             <div class="lurutiler-firstbox">
                                <label class="lurulabeltle">*信息描述：</label><label>30-300字效果为最佳</label><label style="color:red;font-size:12px">(由于有些网页不太稳定，导致信息描述可能会有错误，可自行修改！)</label>
                             </div>
                             <div>
                                   <a-textarea v-model="maioshu"  style="width:50%;" :rows="7" />
                                   <div>
                                      <label class="luruminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲ 《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                   </div>
                             </div>
                         </div>
                         <!-- <div class="lurutilerbox">
                                <div class="lurutiler-firstbox">
                                    <label class="lurulabeltle">*业主心态：</label><label>从房东卖房原因、是否急售等方面进行描述</label><label class="putnumber">(字数限制20-300)</label>
                                </div>
                                <div>
                                    <a-textarea v-model="ref.atittude" style="width:50%;" :rows="5" />
                                    <div>
                                    <label class="luruminganlabel">信息描述内容避免使用敏感字符; 部分网站不允许使用特殊字符: ▲◎☆★◇◆□■▽▼●○△▲ 《》♀♂⊕⊙＊※【】‖︻ ︼</label>
                                    </div>
                                </div>
                         </div> -->
                         <!-- <div class="lurutilerbox">
                                <div class="lurutiler-firstbox">
                                    <label class="lurulabeltle">服务介绍:</label>
                                    <label>多角度描述您的服务优势，例如：行业年限、专业经验、服务态度、可提供的服务种类等</label>
                                    <label class="luruputnumber">(字数限制20-300)</label>
                                </div>
                                <div>
                                    <a-textarea :rows="5" style="width:50%;"  v-model="ref.fuwuCondition"/>
                                </div>
                         </div>
                         <div class="lurutilerbox">
                                <div class="lurutiler-firstbox">
                                    <label class="lurulabeltle">*小区配套:</label><label>从交通、教育、医疗、内部环境、车位情况、安保措施方面来描述</label>
                                </div>
                                <div>
                                    <a-textarea :rows="5" style="width:50%;"/>
                                </div>
                         </div>
                         <div class="lurutilerbox">
                                <div class="lurutiler-firstbox">
                                    <label class="lurulabeltle">税费信息:</label><label>相关费用，描述越详尽您的房源质量就会越高，展示给网友的机会就会增加(仅搜房帮)</label>
                                </div>
                                <div>
                                    <a-textarea :rows="5" style="width:50%;" />
                                </div>
                         </div> -->
                   
                    </a-form>
                </a-layout-content>
            </a-layout>
        </div>
        <div class="lurufilter-wraps luruwrapscolor">
            <div class="lurusearch_bds">
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
        <div class="luruwrap">
            <a-layout class="res" style="padding:24px;">
                <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
                    <a-form>
                        <div class="picdivbox lurudivallbox">
                            <div class="lurulaberboxtitle">上传方式:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsc" :defaultValue="value6" />
                            </div>
                        </div>
                        <div class="picdivbox lurudivallbox">
                            <div class="lurulaberboxtitle">水印位置:</div>
                            <div class="laberboxla">
                                <a-radio-group :options="plainOptionsy" :defaultValue="value7" />
                            </div>

                        </div>
                        <div class="lurushinei lurudivallbox">
                            <div class="lurulaberbox">
                                <span class="lurulaberboxtitle">&nbsp;封&nbsp;面&nbsp;图:</span>
                                <div class="laberboxla">点击希望设定为封面的图片右下角的封面按钮即可设定。</div>
                            </div>

                            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card"
                                :fileList="shopimgHeaderList" @preview="handlePreview" @change="handleChange">
                            </a-upload>
                                <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
                                </a-modal>
                        </div>
                        <div class="lurushinei lurudivallbox">
                            <div class="lurulaberbox">
                                <span class="lurulaberboxtitle">室内照片: </span>
                                <div class="shineipadd">
                                    最多20张。您可以<label class="lurupiclaber">从我的图库选择</label>
                                    <a-button type="" class="lurubuttontuku">我的图库</a-button>
                                    <a-button type="" class="lurubuttontuku">高清图库</a-button>
                                    客厅/卧室/厨房等3张以上照片可帮助您获得较好效果！
                                    <label class="orangelaber">可拖拽交换位置</label>
                                </div>
                            </div>
                            <div class="lurutupianbox">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card" :fileList="shopshineiList" @preview="handlePreview"
                                    @change="handleChange">
                                    <!-- <a-button class="updatedbutton">
                                            <a-icon type="upload" />上传图片</a-button> -->
                                </a-upload>
                                <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
                                </a-modal>
                            </div>
                        </div>
                       <!-- <div class="lurushinei lurudivallbox">
                            <div class="lurulaberbox">
                                <span class="lurulaberboxtitle">&nbsp;房&nbsp;型&nbsp;图:</span>
                                <div class="shineipadd">
                                    <label
                                        class="orangelaber">图片来源于互联网，房源如果需要做保真、安选等需要押金的操作时，为避免违规情况，请尽量自己上传原房源户型图</label>
                                    <a-button type="" class="lurubuttontuku">我的图库</a-button>
                                    <a-button type="" class="luruorangetuku">房型图库</a-button>
                                    <a-button type="" class="lurubuttontuku">在线绘制</a-button>
                                </div>
                            </div>
                            <div class="lurutupianbox">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card" :fileList="fangxinlist" @preview="handlePreview"
                                    @change="handleChange">
                                </a-upload>
                            </div>
                        </div>
                        <div class="lurushinei lurudivallbox">
                            <div class="lurulaberbox">
                                <span class="lurulaberboxtitle">小区图片:</span>
                                <div class="shineipadd">
                                    <span>最多10张。您可以</span>
                                    <label class="lurupiclaber">从我的图库选择</label>
                                    <span>或者</span>
                                    <label class="lurupiclaber">从小区图库选择</label>  
                                    <a-button type="" class="lurubuttontuku">我的图库</a-button>
                                    <a-button type="" class="lurubuttontuku">小区图库</a-button>
                                </div>
                                <div class="luruxiala">
                                    <a-dropdown>
                                        <a-menu slot="overlay">
                                            <a-menu-item v-for="(pilaingsy,index) of pilianglist" :key="index">
                                                <a-icon type="user" />{{pilaingsy}}</a-menu-item>
                                        </a-menu>
                                        <a-button class="lurutupianchuli">图片处理
                                            <a-icon type="up" />
                                        </a-button>
                                    </a-dropdown>
                                </div>
                            </div>
                            <div class="lururadisflex">
                                <div class="lurutupianbox">
                                    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card" :fileList="xiaoQuList" @preview="handlePreview"
                                        @change="handleChange">
                                    </a-upload>
                                    <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                        <img alt="example" style="height:100%; width:100%;"  :src="previewImage" />
                                    </a-modal>
                                </div>-->
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
                                    </div> 
                            </div>
                        </div>-->
                        <div class="lurufangyuansp">
                            <div class="lurulaberbox">
                                <span class="lurulaberboxtitle">房源视频:</span>
                                <label> 视频大小在300M内，视频长度在1-3分钟为最佳，视频过短新三网审核不予通过。</label>
                                <div>
                                    <a-upload name="file" :multiple="true"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers">
                                        <a-button class="luruupdatedspbutton">
                                            <a-icon type="upload" />添加视频 </a-button>
                                    </a-upload>
                                </div>
                            </div>
                        </div>
                        <div class="lurubottomobx">
                            <a-button type="" class="lurubuttonfang luruokbutton" @click="saveHouse()" >保存房源</a-button>
                            <a-button type="" class="luruokbutton">保存草稿</a-button>
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
    const plainOptionzhuangtai=['经营中','空置中','新铺'];
    const houseroot=['住宅底商','商业街商铺','旅游商铺','写字楼配套底商','主题卖场','酒店底商','百货/购物中心','地下商场','其他'];
    const plainOptionxingzhi=['二手商铺','商铺新房'];
    const plainOptionfenge=['是','否',];
    const plainOptionlinjie=['是','否',];
    const plainOptionzengzhishui=['有增值税','无增值税'];
    const plainOptiongeshui=['有个税','无个税'];
    const plainOptionskeliu = ['办公', '学生', '居民', '旅游', '其他'];
    const plainOptionspeitao = ['网络', '暖气', '天燃气', '上水', '下水', '排烟', '排污', '管煤', '停车位', '380v', '扶梯', '货梯', '客梯', '中央空调', '外摆区', '可明火'];
    const plainOptionsyetai = ['百货超市', '酒店宾馆', '家居建材', '服饰鞋包', '生活服务', '美容美发', '餐饮美食', '休闲娱乐', '其他'];
    // const zhuang=['单元','号','幢','栋','号楼'];
    // const danyuan=['栋','号','弄','座','号楼','胡同'];
export default {
    data () {
        return {
                // checkedList: defaultCheckedList,
                keliucheckedList: [],
                plainOptionskeliu,
                peitaocheckedList: [],
                plainOptionspeitao,
                yetaicheckedList: [],
                plainOptionsyetai,
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
                plainOptionxingzhi,
                plainOptionzhuangtai,
                houseroot,
                plainOptionfenge,
                plainOptionlinjie,
                plainOptionzengzhishui,
                plainOptiongeshui,
                // danyuan,
                // zhuang,
                chaoxiangvalue: '东',
                zxvalue: '豪华装修',
                zhuangtaivalue: '新铺',
                xingzhivalue: '商铺新房',
                fengevalue: '是',
                linjievalue:'是',
                cfvalue:'否',
                zengzhishuivalue:'无增值税',
                geshuivalue:'无个税',
                value6: '普通上传',
                value7: '不加水印',
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                tstyle:{
                    height:'470px'
                },
                style:{
                },
                ret: {},
                // visible: false,
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
                houseTypes: '商铺',
                userId: '48639146-0751-11EA-87FE-305A3A80A208',
                urlss: '',
                text: '',
                hutong: '',
                ref: {},
                shopref:{},
                previewVisible: false,
                previewImage: '',
                shopshineiList: [
                ],
                shopimgHeaderList: [],
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
                shopceng: '',
                shoplou: '',
                fangyuanBiaoqian: '',
                weiyiUserId: '',
                saveRes: {},
                imgH: {},
                shoprefQuyu:'',
                shoplaf:{},
                wid:'',
                cenhig:'',
                jinshen:'',
                shifoulj:'',
                maioshu:'',
                keliurenqun:{},
                xiangguanFy:'',
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
            },
            //插入一条url数据链接
            async onSearch(params) {
                //判断URL网址输入是否正确
               var strRegex ='^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
                var re=new RegExp(strRegex); 
                if (params==""||!re.test(params)) { 
                    alert("请输入正确的url地址");
                    return; 
                }
                this.uuid()
                this.urlss = params;
                const data = {
                    userId: this.userId,
                    url: this.urlss,
                    houseType: this.houseTypes,
                    weiYiUrl: this.text
                };
                await this.$http.post(`${this.$config.api}/api/cms/shopurl/shopUrl`, data).then(response => {
                    this.spinning = true;
                    if (response.status == 200) {
                       this.$http.get(`${this.$config.api}/api/cms/shopurl/url?userid=`+this.userId+'&Housetype='+this.houseTypes+'&WeiYiUrl='+this.text).then(res => {
                            console.log(`抓取数据1111:`+JSON.stringify(res.data))
                            this.shoplaf = res.data;
                            let add=res.data.shopquyu
                            this.maioshu=res.data.shopmiaoshu
                            this.shoprefQuyu=add.split('区')[0];
                            var loucengs=res.data.shoplouceng
                            this.shopceng=loucengs.split('/')[0];
                            this.shoplou=loucengs.split('/')[1];
                            
                            const gg=res.data.shopGuige
                            this.wid=gg.split('、')[0].split('面宽')[1].split('m')[0]
                            this.cenhig=gg.split('、')[1].split('层高')[1].split('m')[0]
                            this.jinshen=gg.split('、')[2].split('进深')[1].split('m')[0]
                            
                            if(res.data.shoplinj==true)
                            {
                                this.shifoulj="是";
                            }
                            else
                            {
                                this.shifoulj="否";
                            }

                            this.shopref=res.data
                            // //目标业态多选框
                            // this.peitaocheckedList = this.shopref.shopPeitao;
                            //客流人群多选框
                            let tempStr = this.shopref.keliurenqun;
                            let tempArr = tempStr.split("、");
                            for(var i=0;i<tempArr.length;i++){
                                this.keliucheckedList.push("'"+tempArr[i]+"'")
                            }
                            console.log(this.keliucheckedList)
                            //配套多选框
                            this.peitaocheckedList = this.shopref.shopPeitao;
                            if(this.shopref.xiangguanFy == '暂无数据'){
                                this.xiangguanFy = '';
                            }else{
                                this.xiangguanFy = this.shopref.xiangguanFy;
                            }
                            var shineiImgs = res.data.shopimgs.replace(/'/g, '').replace('[', '').replace(']', '');
                            var shops = shineiImgs.split(",")
                            for (var i = 0; i < shops.length; i++) {
                                var imgUrl = {};
                                imgUrl.url = shops[i];
                                imgUrl.uid = i;
                                imgUrl.name = 'xxx.jpg';
                                imgUrl.status = 'done';
                                this.shopshineiList.push(imgUrl);
                            }
                             this.imgH.url = res.data.shopFengimg,
                                this.imgH.uid = '-1',
                                this.imgH.name = 'xxx.jpg',
                                this.imgH.status = 'done',
                                this.shopimgHeaderList.push(this.imgH);
                            setTimeout(() => {
                                this.visible = false;
                            }, 500);
                            this.visible = false;
                        });

                    }
                });


            },
            async saveHouse() {
                if (this.shoplaf.shopTitle == null && this.shoplaf.shopRice == null &&
                    this.shoplaf.shopSquare == null && this.shoplaf.shopAdress == null &&
                    this.shoplaf.shopimgs == null && this.shoplaf.jingyingtype == null &&
                    this.shoplaf.shopGuige == null && this.shoplaf.jingyingZt == null && this.shoplaf.keliurenqun == null 
                ) {
                    this.openNotificationWithIcon('error')
                }
                else {
                    //this.saveRes.urlsId = this.$store.userId;
                    let update = JSON.parse(localStorage.getItem('update'));
                    this.shoplaf.userid = update.userId;
                    this.shoplaf.shopmiaoshu=this.maioshu
                    await this.$http.post(`${this.$config.api}/api/cms/shopPub/shoplishHouse`, this.shoplaf).then(response => {
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
                 //   this.$router.replace('/salerelease')
                    this.$router.push({
                        path: '/salerelease',
                        query: {
                            activeKey: 2,
                        },
                    })
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

<style  lang="less" scoped>
.ant-checkbox-group{
    margin-top: 10px;
}
    .shangpulogo{
            display: flex;
            align-items: center;
            a{
                margin-right: 15px;
                .wuba{
                    width: 150px;
                    height: 80px;
                    padding: 15px 10px;
                    border: 1px solid #ececec;
                }
                .anju{
                    width: 150px;
                    height: 80px;
                    border: 1px solid #ececec;
                }
                .fang{
                    width: 150px;
                    height: 80px;
                    padding: 10px 0px;
                    border: 1px solid #ececec;
                }
            }
        }
    .luruwrap {
            width: 100%;
            display: flex;
            flex: 0 0 auto;
        }

    .luruts {
        display: flex;
        width: 100%;
        flex-flow: column;
        margin: 0 auto;

    }

    .lurufilter-wraps {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
    }

    .lurufilter-wraps .search_bd .secitem dd a.select {
        color: #ff552e;
    }

    .lurusale-content-tip {
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

    .lurusearch_bds {
        background: #ffffdd;
        display: flex;
        flex-flow: column;

        width: 100%;
        padding: 12px;
        line-height: 26px;
        border-radius: 10px;
        border: 1px solid #ebedf0;
    }

    .lurutishi {
        display: flex;
        align-items: center;
    }


    .lurufilter-wraps .lurusearch_bds .secitem dt {
        color: #888;
        width: 36px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        float: left;
    }

    .lurufontU {
        position: absolute;
        bottom: 50px;
        right: 0px;
    }

    /* .ant-table-row ant-table-row-level-0 {
        display: flex;
        align-items: center;
        justify-content: center;
    } */

    .lurusale-content-tip li {
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

    .lurushihaow {
        width: 70px !important;
        padding-right: 8px;
    }

    .lurusmianij {
        padding-left: 8px;
    }

    .lurumianji, .luruwuyemoney {
        width: 120px !important;
    }

    .luruhuxing {
        width: 90px !important;
        padding-right: 5px;
        padding-left: 25px
    }
    .zhuzhaibox{
        width: 180px !important;
        // padding-left: 25px
    }
   .firhuxing{
         width: 65px !important;
        padding-right: 5px;
   }
    .lurushihaoselw {
        padding-right: 22px;
        padding-left: 8px;
    }
    .luruglaber {
        padding-left: 17px;
        padding-right: 5px;
    }

    .lururadisflex {
        display: flex;
    }

    .luruneibula {
        font-size: 12px;
        color: red;
        padding-left: 5px;
    }

    .luruwrapscolor {
        padding: 0px 24px 0px 24px;
        background: #f0f2f5;
    }

    .lurudivallbox {
        display: flex;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;

    }

    .lurupicdivbox {
        display: flex;
        align-items: center;
        height: 40px !important;
    }
    .lurulaberbox {
        display: flex;
        align-items: center;
    }
    .lurulaberboxtitle {
            color: red;
            padding-right: 10px;
        }

    .lurutupianbox {
       
        padding-left: 60px;
    }

    .lurushinei {
        min-height: 180px !important;
        flex-flow: column;
        flex: 0 0 auto;
        // padding-top: 10px;
    }

    .lurupiclaber {
        color: green;
    }

    /* .lurufangxingtu {

        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;

    } */

    /* .luruxiaoqupic {
        flex-flow: column;
        height: 140px !important;
        flex: 0 0 auto;
    } */

    .lurufangyuansp {
        display: flex;
        width: 100% !important;
        padding-left: 20px;
        height: 70px !important;
    }

    .lurubottomobx {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        width: 100% !important;
        padding-left: 20px;
        height: 40px !important;
    }

    .lurubuttonfang {
        margin-right: 15px;
    }

    .luruorangelaber {
        color: orange;
    }

    .lurubuttontuku {
        background-color: green;
        color: white;
        margin-right: 5px;
    }

    .luruorangetuku {
        background-color: orange;
        color: white;
        margin-right: 5px;
    }

    /* .sellupdatedbutton {
        background-color: green;
        color: white;
        border-radius: 20px;
    } */

    .luruupdatedspbutton {
        background-color: green;
        color: white;
        height: 30px !important;
        width: 100px !important;
    }

    .luruxiala {
        padding-left: 28%;
    }

    .luruokbutton {
        background-color: red;
        color: white;
    }

    .lurutupianchuli {
        background-color: #f0f2f5;
    }

    .luruaddshowxq {
        padding-left: 5px;
        font-size: 14px
    }
    .luruant-modal{
        width:800px !important;
        height: 700px !important;
    }
    .lurulabeltle{
        font-weight:bold;
        color:black;
    }
    .lurutilerbox{
        padding-left: 20px;
        padding-top:20px;
    }
    .lurutiler-firstbox
    {
        padding-bottom:10px;
        
    }
    .luruminganlabel{
        color:darkgrey;
    }
    .luruputnumber{
        color: orange;
     }
     .luruyongjingbox{
         padding-left: 5px;
         font-size:16px;
     }
     .yongjinlabel{
         font-size:16px;
         padding-right:8px;
     }
    .ant-checkbox-wrapper{
        margin:0px;
    }
 
</style>
