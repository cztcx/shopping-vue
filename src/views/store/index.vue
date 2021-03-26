<template>
  <el-container style="height: 80vh; border: 1px solid #eee; margin-top: 100px">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="1" @click="_showorder">
          <i class="el-icon-message"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1" @click="_showgoods">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>商铺设置</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <order v-if="ordershow"></order>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Order from './order'

export default {
  name: 'Store',
  components: {Order},
  data () {
    return {
      ordershow: false,
      goodsshow: false

    }
  },
  methods: {
    _showorder () {
      this.ordershow = true
      this.goodsshow = false
    },
    _showgoods () {
      this.ordershow = false
      this.goodsshow = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
