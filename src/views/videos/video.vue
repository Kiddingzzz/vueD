<template>
    <div class="videots">
        <div class="videofilter-wrap" style="padding: 24px 24px 0px 24px;">
        <div class="headsize">
            <label>观看下列视频，可使您快速掌握开单王网站</label>
        </div>
        
        <div v-show="isshow" class="listbox">
             <div class="videheard" v-for="(item,i) in video" :key="i">
                <div class="videbox" @click="change(i)">
                    <img :src="item.picname" alt="">
                    <div class="botool"><img src="http://www.4846.com/Public/images/icon-video.png" alt=""></div>
                    <div class="sizes"><a>{{item.title}}</a></div>
                </div>
             </div>           
        </div>
        <div class="bobox">
            <div v-show="ishows"> 
                <video controls="" :src="videosrc" id="ckplayer_a1" width="900" height="600" autoplay="autoplay" loop="loop"></video>   
            </div>
            <div v-show="boshow" class="bolist">
                <a-list itemLayout="horizontal" :dataSource="video">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta>
                        <a slot="title" @click="change(index)" :class="{ 'blue-link':index === isActive }" >{{item.title}}</a>
                    </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </div>
        </div>
        </div>
    </div>
</template>
<script> 
  const video =[
    {
      title: '01-如何注册开单王',
      picname: '图片链接',
      src: '视频链接',
    },
    {
      title: '02-如何注册开单王',
      picname: '图片链接',
      src: '视频链接',
    },
  ];
export default {
     data() {
            return {
                video,
                videosrc:"",
                isshow: true,
                ishows: false,
                boshow: false,
                isActive: 0,
            }},
    mounted(){
        this.ishows = false
        this.isshow = true 
        this.boshow = false
    },
    methods:{
        change(i){
            console.log('页面点击：'+this.video[i].src)
            this.videosrc = this.video[i].src
            this.ishows = true
            this.isshow = false
            this.boshow = true
            this.isActive = i   
        },
    }
}
</script>
<style lang="less">
.videots {
    display: flex;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    margin: 24px;
    border-radius: 10px;
    border: 1px solid #ebedf0;
    .videofilter-wrap {
        width: 100%;
    }
    .headsize{
        display: flex;
        justify-content: center;
        color: green;
        font-size :32px;
        margin-bottom: 30px;
    }
    .listbox{
        display: flex;
        .videheard{ 
            padding:20px ;
            position: relative;     
            .videbox img{
                width: 210px;
                height: 150px;
            } 
            .botool{
                position: absolute;
                z-index: 99;
                top: 20px;
                right: 20px;
                img{
                    width: 80px;
                    height: 80px;  
                }
            } 
            .sizes{
                display: flex;
                justify-content: center;  
                a{
                    color: #333;
                    &:hover{
                        color: #007acc;
                    }
                }
            }
        }
    }
    .bobox{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        .bolist{
            width: 250px;
            height: 600px;
            padding: 0 20px;
            margin-left: 20px;
            background: #1e1e1e;
            a{
                color: #eee;
                &:hover{
                    color: #007acc;
                }
            }
        }
    }
}

.blue-link{
    color: #007acc !important;
}

</style>