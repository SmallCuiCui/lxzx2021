<template>
  <el-container class="home_container">
    <el-col :span="4" style="hight: 100%">
      <Aside />
    </el-col>

    <el-col :span="20">
      <el-container class="home_container_right">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <el-card>
            <router-view />
          </el-card>
        </el-main>
      </el-container>
    </el-col>
  </el-container>
</template>

<script>
import Aside from "@/components/layout/Aside.vue";
import Header from "@/components/layout/Header.vue";

export default {
  name: "Home",
  components: {
    Aside,
    Header,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.home_container {
  height: 100%;
  width: 100%;

  .el-header,
  .box_container {
    background: #ffffff;
    padding: 0;
  }

  &_right {
    display: flex;
    flex-direction: column;
    height: 100%;

    .el-header {
      height: 100px;
    }

    .el-main {
      flex: 1;
      padding: 5px 15px;

      .el-card {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

