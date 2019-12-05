<template>
  <div id="app">
    <a-layout id="components-layout-demo-top-side-2" v-if="$route.meta.keepAlive">
    <a-layout-header class="header">
      <div class="logo">
        <img class="logo" src="../static/logoJXW.png">
      </div>
      <div class="login" v-if="$store.hasLogin != false">
            <!-- 登录成功 -->
             <span>
               <a-dropdown>
                <a class="ant-dropdown-link" href="#"> {{_user}} <a-icon type="down"/> </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="logout">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
             </span>
      </div>

    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />个人房源</span>
            <a-menu-item key="1">
              <router-link to="index">二手房</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="shops">商铺</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />房源管理</span>
            <a-menu-item key="6">
              <router-link to="pubulish">发布房源</router-link>
            </a-menu-item> 
            <a-menu-item key="8">
                <router-link to="test">url链接列表</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="inbox" />房源录入</span>
            <a-menu-item key="9">
              <router-link to="lease">租房录入</router-link>
            </a-menu-item>  
            <a-menu-item key="10">
                 <router-link to="sell">售房录入</router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="cloud" />云发布</span>
            <a-menu-item key="11">
              <router-link to="rentrelease">出租群发</router-link>
            </a-menu-item>  
            <a-menu-item key="12">
              <router-link to="salerelease">出售群发</router-link>
            </a-menu-item>           
          </a-sub-menu>
          <a-sub-menu key="sub5">
            <span slot="title"><a-icon type="setting" />个人管理</span>
            <a-menu-item key="13">
              <router-link to="zhandian">站点管理</router-link>
            </a-menu-item>
            <a-menu-item key="14">
              <router-link to="tuijian">站点管理</router-link>
            </a-menu-item>
             <a-menu-item key="15">
              <router-link to="loginform">退出登录</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <router-view/>
    </a-layout>
  </a-layout>
  <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        collapsed: false,
        user:'',
      };
    },
    created(){
        // 在页面加载时读取sessionStorage里的状态信息
        // if (sessionStorage.getItem("store") ) {
        //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        // }

        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        // window.addEventListener("beforeunload",()=>{
        //   sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        // })
    },
    mounted(){

    },
    computed:{
      _user(){
        let update = JSON.parse(localStorage.getItem('update'));
        console.log("首页`````````````````"+JSON.stringify(update));
        return update.hasLogin != false ? "欢迎您，"+update.userName : "请登录";
      },
    },
    watch:{
      '$route.path':function(newVal,oldVal){
        console.log(newVal+"---"+oldVal);
        if(newVal === '/loginform'){
          console.log('欢迎进入登录页面');
        }
        if(newVal === '/index'){
          console.log('欢迎进入二手房页面');
          this.$router.replace('/index');
        }
        if(newVal === '/sell'){
          console.log('欢迎进入二手房页面');
          this.$router.push({path:'sell'});
        }
      }
    },
    created () {// 每次路由变化dom重新加载都会执行该方法
      this.historyWatch();
      window.addEventListener('beforeunload', e => {
      localStorage.setItem("store",JSON.stringify(this.$store.state))

    });
    
    },
    methods: {
      historyWatch () {
        this.news = (this.$route.path === '/sell' ? 1 : 0);
      },
      logout(){
              // 清空数据
              //,,,
              var update={
                  hasLogin: false,
                  userName:'',
                  loginProvider: "",
                  openid: null,
                  userId:'',
                  user: {},
                  token:'',
                  isUpdateHome: true
              }
              //存入数据
              localStorage.setItem('update', JSON.stringify(update));
              this.$router.replace('/loginform');
      },
    },
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
}
#components-layout-demo-top-side-2 .logo {
    width: 140px;
    height: 55px;
    float: left;
    border-radius: 5px;
    background: #e7e7e7;
  }
  .ant-layout.ant-layout-has-sider{
      height: 100%;
      display: flex;
      width: 100%;
      
  }
  .header{
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .login{
    span{
      .a{
        color: white !important;
      }
      .ant-dropdown-link{
        color: white;
      }
    }
  }
</style>
