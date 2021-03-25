<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="black"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <el-link href="/home">首页</el-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类推荐</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><router-link :to="{name: 'Store'}">我的商铺</router-link></el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style scoped>
.header{
  border: 1px solid red;
  height: 100px;
  background-color: white;
  position: fixed;
  z-index: 10;
  width: 100vw;
}
.el-menu-demo{
  margin-top: 20px;
}
</style>
