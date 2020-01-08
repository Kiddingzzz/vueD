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
                 <div v-if="nat == false">
                   <a class="ant-dropdown-link" href="#"> <a-icon type="down"/> {{userName}} </a>
                 </div>
                 <div v-if="nat != false">
                   <a class="ant-dropdown-link" href="#"> <a-icon type="down"/> {{_user}} </a>
                 </div>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="logout">{{_logouttxt}}</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
             </span>
      </div>

    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <!-- :defaultOpenKeys="['sub1']" -->
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['/index']"
          :openKeys="openKeys" @openChange="onOpenChange" 
          :style="{ height: '100%', borderRight: 0 }"
          :selectedKeys="[this.$route.path]"
        >
          <a-sub-menu key="sub1">
            <span slot="title" class="hh"><a-icon type="user" />个人房源</span>
            <a-menu-item key="/index" class="hh">
              <router-link to="index"><i class="iconfont icon-ershoufang"></i>二手房</router-link>
            </a-menu-item>
            <a-menu-item key="/zufang" class="hh">
              <router-link to="zufang"><i class="iconfont icon-zufang"></i>租房</router-link>
            </a-menu-item>
            <a-menu-item key="/shops" class="hh">
              <router-link to="shops"><i class="iconfont icon-shangpu01"></i>商铺</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="inbox" />房源录入</span>
            <a-menu-item key="/lease" class="hh">
              <router-link to="lease"><i class="iconfont icon-zufang"></i>租房录入</router-link>
            </a-menu-item>  
            <a-menu-item key="/sell" class="hh">
                 <router-link to="sell"><i class="iconfont icon-ershoufang"></i>售房录入</router-link>
            </a-menu-item>
            <a-menu-item key="/shangpuzuluru" class="hh">
                 <router-link to="shangpuzuluru"><i class="iconfont icon-shangpu01"></i>商铺出租录入</router-link>
            </a-menu-item>
            <a-menu-item key="/shangpuluru" class="hh">
                 <router-link to="shangpuluru"><i class="iconfont icon-shangpu01"></i>商铺出售录入</router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="cloud" />云发布</span>
            <a-menu-item key="/rentrelease" class="hh">
              <router-link to="rentrelease"><i class="iconfont icon-zufang"></i>出租群发</router-link>
            </a-menu-item>  
            <a-menu-item key="/salerelease" class="hh">
              <router-link to="salerelease"><i class="iconfont icon-ershoufang"></i>出售群发</router-link>
            </a-menu-item>  
            <a-menu-item key="/fuburesult" class="hh">
              <router-link to="fuburesult"><i class="iconfont icon-ershoufang"></i>发布结果</router-link>
            </a-menu-item>          
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="setting" />个人管理</span>
            <a-menu-item key="/zhandian" class="hh">
              <router-link to="zhandian"><i class="iconfont icon-wangzhan"></i>站点管理</router-link>
            </a-menu-item>
            <a-menu-item key="/tuijian" class="hh">
              <router-link to="tuijian"><i class="iconfont icon-wangzhan"></i><span>站点管理</span></router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <keep-alive>
      <router-view/>
      </keep-alive>
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
        rootSubmenuKeys: ['sub1','sub2', 'sub3', 'sub4'],
        collapsed: false,
        // user:'',
        // logouttxt:'',
        userinfo: [],
        userName:'',
        nat:true,
        openKeys: [],
      };
    },
    mounted(){
      // console.log(222)
      // let ip = returnCitySN["cip"];
      // console.log('app.vue的ip=================='+ip)
      this.menuChange()
    },
    updated () {
        let update = JSON.parse(localStorage.getItem('update'));
        // console.log("登录到首页=========="+JSON.stringify(update));
        // console.log("登录成功名字=============="+update.userName);
        this.userName = "欢迎您，"+update.userName;
        this.nat = false;
　　},
    watch:{
       $route( to , from ){  
          this.menuChange()
        }
    },
    computed:{
      _user(){
        let update = JSON.parse(localStorage.getItem('update'));
        // console.log("登录到首页=========="+JSON.stringify(update));
        // console.log("登录成功名字=============="+update.userName);
        this.nat = true;
        return update.hasLogin != false ? "欢迎您，"+update.userName : "请登录";
      },
      _logouttxt(){
        let update = JSON.parse(localStorage.getItem('update'));
        return update.hasLogin != false ? "退出登录" : "登录";
      }
    },
    created () {// 每次路由变化dom重新加载都会执行该方法
      // this.historyWatch();
      window.addEventListener('beforeunload', e => {
        localStorage.setItem("store",JSON.stringify(this.$store.state))
      });
    
    },
    methods: {
      // historyWatch () {
      //   this.news = (this.$route.path === '/sell' ? 1 : 0);
      // },
      menuChange(){
        //展开当前菜单项 key所对应的 SubMenu 菜单项
        console.log(this.$route.path)
        if(this.$route.path == '/index'||this.$route.path == '/zufang'||this.$route.path == '/shops'){
            this.openKeys = ['sub1']
        }else if(this.$route.path == '/lease'||this.$route.path == '/sell'||this.$route.path == '/shangpuluru'||this.$route.path == '/shangpuzuluru'){
            this.openKeys = ['sub2']
        }else if(this.$route.path == '/rentrelease'||this.$route.path == '/salerelease'||this.$route.path == '/fuburesult'){
            this.openKeys = ['sub3']
        }else if(this.$route.path == '/zhandian'||this.$route.path == '/tuijian'){
            this.openKeys = ['sub4']
        }
      },
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
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
              window.localStorage.setItem('update', JSON.stringify(update));
              // window.localStorage.clear()
              console.log("退出成功======="+localStorage.getItem('update'))
              this.$router.replace('/loginform');
      },
    },
}
</script>

<style lang="less" scoped>
 /deep/.ant-menu-submenu-title:hover {
    background: #e6f7ff;
    padding-right: 34px;
}
.hh:hover{
  background: #e6f7ff;
}
.ant-menu-item > a {
    display: flex !important;
    align-items: center;
    i {
      margin-right: 5px;
    }
}
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
