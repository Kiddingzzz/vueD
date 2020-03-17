<template>
    <div>
        <div>
            <label class='headsize'>观看下列视频，可使您快速掌握开单王网站</label>
        </div>
        
        <div  v-show="isshow">
             <div class="videheard" v-for="(item,i) in video" :key="i">
                <div class="videbox" @click="change(i)">
                    <img :src="item.picname" alt="">
                    <div class="sizes"><label>{{item.title}}</label></div>
                </div>
             </div>           
        </div>
        <div class="bobox">
            <div v-show="ishows"> 
                <video controls="" :src="videosrc" id="ckplayer_a1" width="1000" height="600" autoplay="autoplay" loop="loop"></video>   
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
</template>
<script> 
  const video =[
    {
      title: '01-如何注册开单王',
      picname: 'http://www.4846.com/Public/images/icon-video.png',
      src: '//xms-course-video.obs.cn-east-2.myhwclouds.com/4846/190220-register.mp4',
    },
    {
      title: '02-如何注册开单王',
      picname: 'http://www.4846.com/Public/images/icon-video.png',
      src: '//xms-course-video.obs.cn-east-2.myhwclouds.com/4846/6-1.mp4',
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
.videheard{
     display: flex;
}
.videbox{
    padding:10px ;
}
.headsize{
  color: green;
  font-size :32px;
}
.sizes{
      display: flex;
      justify-content: center;  
}
.blue-link{
    color: #007acc !important;
}
.bobox{
    margin: 0 auto;
    display: flex;
    .bolist{
        padding: 0 20px;
        background: #1e1e1e;
        a{
            color: #eee;
            &:hover{
                color: #007acc;
            }
        }
    }
}

</style>