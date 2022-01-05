<template>
  <el-aside height="100%" width="100%" class="aside_container">
    <div class="logo_img">
      <img src="../../assets/images/logo.png" @click="jumpToDashbord" />
    </div>
    <div class="box_nav">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <router-link to="/dashbord">
          <el-menu-item index="1" :class="{'is-active': currentRout == '/dashbord'}">
            <i class="el-icon-location"></i>
            <span>控 制 台</span>
          </el-menu-item>
        </router-link>

        <router-link to="/workReport">
          <el-menu-item index="2" :class="{'is-active': currentRout == '/workReport'}">
            <i class="el-icon-menu"></i>
            <span>工作上报 </span>
          </el-menu-item>
        </router-link>

        <router-link to="/workColect">
          <el-menu-item index="3" :class="{'is-active': currentRout == '/workColect'}">
            <i class="el-icon-document"></i>
            <span>工作汇总</span>
          </el-menu-item>
        </router-link>

        <router-link to="/personManage">
          <el-menu-item index="4" :class="{'is-active': currentRout == '/personManage'}">
            <i class="el-icon-setting"></i>
            <span>人员管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="/noticeManage">
          <el-menu-item index="5" :class="{'is-active': currentRout == '/noticeManage'}">
            <i class="el-icon-collection-tag"></i>
            <span>通知管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="/workManage">
          <el-menu-item index="6" :class="{'is-active': currentRout == '/workManage'}">
            <i class="el-icon-date"></i>
            <span>值班管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="/workCondition">
          <el-menu-item index="7" :class="{'is-active': currentRout == '/workCondition'}">
            <i class="el-icon-s-data"></i>
            <span>工作动态</span>
          </el-menu-item>
        </router-link>

        <router-link to="/eventsRecord">
          <el-menu-item index="8" :class="{'is-active': currentRout == '/eventsRecord'}">
            <i class="el-icon-timer"></i>
            <span>大 事 记</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      currentRout: ""
    }
  },
  components: {},
  watch:{
    $route(to){
      this.currentRout = to.fullPath;
    }
  },
  created() {
    this.currentRout = this.$route.fullPath;
  },
  methods: {
    jumpToDashbord() {
      this.$router.push('/dashbord')
    }
  },
};
</script>


<style lang="scss">
.aside_container {
  height: 100%;
  background: rgb(84, 92, 100);
  overflow: hidden;

  .logo_img {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 150px;
      cursor: pointer;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  .router-link-active {
    color: #ffd04b;
  }

  .el-menu-item {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    height: 100%;
    width: 100%;
  }

  .el-header {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #545c64;
    color: var(--el-text-color-primary);
    text-align: center;
    height: 100%;
    width: 100%;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  }
}
</style>