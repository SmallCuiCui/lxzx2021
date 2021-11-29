<template>
  <el-container class="home_container">
    <el-col :span="3" style="hight: 100%">
      <Aside />
    </el-col>

    <el-col :span="21">
      <el-container class="home_container_right">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main class="css-card">
          <router-view />
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
  position: relative;

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

    .css-card{
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      background-color: #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-color: #e4e7ed;
      flex: 1;
      margin: 5px 15px;
      padding: 20px;
    }
  }
}
</style>

