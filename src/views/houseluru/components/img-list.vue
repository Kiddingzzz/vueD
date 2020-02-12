<template>
    <div class="bg">
        <div class="ss">
            <img width="160" height="140" :src="value.url" @preview="handlePreview">
            <a-modal :bodyStyle="style" :visible="previewVisible" :footer="null"  
                @cancel="handleCancel">
                <img alt="example" style="height:100%; width:100%;" :src="previewImage" />
            </a-modal>
            <div class="selects">
                <a-select defaultValue="shinei" style="width: 120px" @change="handleChange">
                <a-select-option value="shinei">室内图</a-select-option>
                <a-select-option value="shiwai">室外图</a-select-option>
            </a-select>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            previewVisible: false,
            previewImage: '',
            style: {},
        }
    },
    props: {
        value: {
			type: Object,
			default: {}
		}
    },
    mounted(){
        console.log(`aaa：`+JSON.stringify(this.value))
    },
    methods:{
        handleChange(value) {
            console.log('asdasd:'+value)
            if(value == 'shiwai'){
                this.value.status = 'shiwai'
            }
            else{
                this.value.status = 'shinei'
            }
            console.log(`aaa：`+JSON.stringify(this.value.url))
            console.log(`selected ${value}`);
        },
        handlePreview (file) {
            this.previewVisible = true
        },
        handleCancel() {
            this.previewVisible = false;
        },
    }
}
</script>
<style lang="less">
 .bg{
     margin-right: 10px;
     height: 180px;
     border: 1px solid red;
     .ss{
         display: flex;
         flex-flow: column;
        justify-content: center;
        align-items: center;
          image {
			height: 140px;
            width: 140px;
			border-radius: 10upx 10upx 0px 0px;
        }
        .selects{

        }
     }
    
     
 }
</style>