<template>
  <div class="home">
    <el-container class="el-container">
      <el-header class="el-header">
        <el-row :gutter="20" class="el-row row-bg">
          <el-col :span="6" class="el-col">
            <div class="grid-content bg-purple"><router-link to="/home">Home</router-link></div>
          </el-col>
          <el-col :span="6" class="el-col">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="6" class="el-col">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="6" class="el-col">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="el-main"></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  width: 100%;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  width: 300px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
