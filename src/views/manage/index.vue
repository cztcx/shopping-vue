<template>
  <div>
    <el-container style="height: 100vh; width: 100%; border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 90vh;margin-top: 60px">
        <el-menu @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-message"></i>
            店铺审批
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            店铺审批记录
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            首页新品推荐
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            商铺管理
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            店铺管理记录
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import Approve from './approve'
import router from '../../router'
export default {
  name: 'Manage',
  components: { Approve },
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        router.push({
          path: '/manage/approve'
        })
      }
      if (key === '3') {
        router.push({
          path: '/manage/shopManage'
        })
      }
      if (key === '4') {
        router.push({
          path: '/manage/approveHistory'
        })
      }
      if (key === '5') {
        router.push({
          path: '/manage/shopManageHistory'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
