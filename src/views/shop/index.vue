<template>
  <el-container style="height: 80vh; border: 1px solid #eee; margin-top: 100px">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-message"></i>
          订单管理
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-message"></i>
          已发货物
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <i class="iconfont icon-duohangchenlie"></i>
              &nbsp;&nbsp;店内商品
            </el-menu-item>
            <el-menu-item index="2-2"><i class="iconfont icon-tianjia"></i>&nbsp;&nbsp;新品添加</el-menu-item>
            <el-menu-item index="2-3"><i class="iconfont icon-tubiao-xiajia"></i>&nbsp;&nbsp;下架商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-document"></i>
          历史订单
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          商铺设置
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Order from './shopOrder'
import router from '../../router'

export default {
  name: 'Shop',
  components: {Order},
  data () {
    return {

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        router.push({
          path: '/index/shop/shopOrder'
        })
      }
      if (key === '3') {
        router.push({
          path: '/index/shop/setUp'
        })
      }
      if (key === '4') {
        router.push({
          path: '/index/shop/hasSendOut'
        })
      }
      if (key === '2-1') {
        router.push({
          path: '/index/shop/shopGoods'
        })
      }
      if (key === '2-2') {
        router.push({
          path: '/index/shop/addGood'
        })
      }
      if (key === '2-3') {
        router.push({
          path: '/index/shop/OffShelfGoods'
        })
      }
      if (key === '5') {
        router.push({
          path: '/index/shop/orderHistory'
        })
      }
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
