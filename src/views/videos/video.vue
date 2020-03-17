<template>
    <div>
        <div>
            <label class='headsize'>观看下列视频，可使您快速掌握开单王网站</label>
        </div>
        <div v-show="ishows"> 
            <video controls="" src="//xms-course-video.obs.cn-east-2.myhwclouds.com/4846/190220-register.mp4" id="ckplayer_a1" width="1000" height="600" autoplay="autoplay" loop="loop"></video>
            </div>
        <div  v-show="isshow">
             <div class="videheard">
                <div class="videbox"  >
                    <img src="http://www.4846.com/Public/images/icon-video.png" alt="">
                    <div class="sizes"><label>01-如何注册开单王</label></div>
                </div>
                <div class="videbox" @click="change">
                    <img src="http://www.4846.com/Public/images/icon-video.png" alt="">
                    <div class="sizes"><label>01-如何注册开单王</label></div>
                </div>
                <div class="videbox">
                    <img src="http://www.4846.com/Public/images/icon-video.png" alt="">
                    <div class="sizes"><label>01-如何注册开单王</label></div>
                </div>
             </div>
            
        </div>
    </div>
</template>
<script>
export default {
     data() {
            return {
                isshow:true,
                ishows:false
            }},
    methods:{
        change(){
           this.ishows=true
           this.isshow=false
          
        }
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
</style>