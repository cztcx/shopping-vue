<template>
  <div>
    <el-header class="el-header">
      <div class="title">
        零食商城后台管理
      </div>
      <div class="user">当前用户：&nbsp;&nbsp;{{ userName }} &nbsp;&nbsp;
        <el-link @click="logout">
          <li class="el-icon-switch-button" style="color: #0fc1ee">退出登录</li>
        </el-link>
      </div>
    </el-header>
    <el-container style="height: 85%; width: 100%; border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 90vh;">
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
import {getUserName} from '../../utils/session'

export default {
  name: 'Manage',
  components: {Approve},
  data () {
    return {}
  },
  computed: {
    userName: getUserName
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
    },
    logout () {
      router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.user {
  float: right;
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
}
.title {
  float: left;
  height: 100%;
  width: 30%;
  margin-left: 3%;
  font-size: 30px;
  display: flex;
  align-items: center;
  align-content: center;
}
.el-header {
}
</style>
