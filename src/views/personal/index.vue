<template>
  <el-container style="height: 80vh; border: 1px solid #eee; margin-top: 100px">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu @select="handleSelect">
        <el-menu-item index="1">
          <i class="iconfont icon-dingdan"></i>
          订单查看
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont icon-xiugai"></i>
          修改个人信息
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont icon-ren"></i>
          收货人管理
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont icon-zhuanhuan"></i>
          成为店家
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
import router from '../../router'

export default {
  name: 'Personal',
  data () {
    return {
      id: this.$store.getters.id
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        router.push({
          path: '/index/personal/order',
          params: {id: this.id}
        })
      }
      if (key === '2') {
        router.push({
          path: '/index/personal/update'
        })
      }
      if (key === '3') {
        router.push({
          path: '/index/personal/address'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
