<template>
  <el-container>
    <div class="header">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="white"
        text-color="black"
        active-text-color="#ffd04b"
      >
        <span class="logo">
          欢迎：<b class="userName" style="font-family:'楷体'">{{ userName }} </b>&nbsp;
          <el-link @click="logout">
            <li class="el-icon-switch-button" style="color: #0fc1ee">退出登录</li>
          </el-link>
        </span>
        <div class="menu">
          <el-menu-item index="1" class="item">
            <span class="menu-span">首页{{ this.username }}</span>
          </el-menu-item>
          <el-menu-item index="2" class="item">
            <span class="menu-span">熟食</span>
          </el-menu-item>
          <el-menu-item index="3" class="item">
            <span class="menu-span">休闲</span>
          </el-menu-item>
          <el-menu-item index="4" class="item">
            <span class="menu-span">充饥</span>
          </el-menu-item>
          <el-menu-item index="5" class="item">
            <span class="menu-span">礼品</span>
          </el-menu-item>
          <el-menu-item index="6" class="item">
            <span class="menu-span">网红</span>
          </el-menu-item>
        </div>
        <span class="search">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          <el-button type="danger" icon="el-icon-search" size="small">找它</el-button>
        </span>
        <span class="personal">
          <el-menu-item index="7" class="personal-item" v-show="showShop">
            <span class="menu-span"><i class="el-icon-s-home"></i>我的商铺</span>
          </el-menu-item>
          <el-menu-item index="8" class="personal-item">
            <span class="menu-span"><i class="el-icon-shopping-cart-2"></i>购物车</span>
          </el-menu-item>
          <el-menu-item index="9" class="personal-item">
            <span class="menu-span"><i class="el-icon-user"></i>个人中心</span>
          </el-menu-item>
        </span>
      </el-menu>
    </div>
    <router-view/>
  </el-container>
</template>

<script>
import Store from '../views/shop'
import {getIsSeller, getUserName} from '../utils/session'
import router from '../router'
import {createNamespacedHelpers} from 'vuex'

const {mapActions} = createNamespacedHelpers('userModule')
export default {
  name: 'Index',
  components: {Store},
  data () {
    return {
      id: this.$store.getters.id,
      activeIndex: '1',
      activeIndex2: '1',
      input: '',
      cartIcon1: 'el-icon-shopping-cart-2',
      cartIcon2: 'el-icon-shopping-cart-full',
      username: this.$route.params.username,
      showShop: false
    }
  },
  computed: {
    userName: getUserName
  },
  created () {
    if (getIsSeller() === '1') {
      this.showShop = true
    } else {
      this.showShop = false
    }
  },
  methods: {
    ...mapActions(['retrieve']),
    console () {
      console.log(this.data.index)
    },
    handleSelect (key, keyPath) {
      if (key === '7') {
        router.push({
          path: '/index/shop'
        })
      }
      if (key === '1') {
        router.push({
          path: '/index/home'
        })
      }
      if (key === '2') {
        router.push({
          path: '/index/replace',
          query: {categoryId: 1}
        })
      }
      if (key === '3') {
        router.push({
          path: '/index/replace',
          query: {categoryId: 2}
        })
      }
      if (key === '4') {
        router.push({
          path: '/index/replace',
          query: {categoryId: 3}
        })
      }
      if (key === '5') {
        router.push({
          path: '/index/replace',
          query: {categoryId: 4}
        })
      }
      if (key === '6') {
        router.push({
          path: '/index/replace',
          query: {categoryId: 5}
        })
      }
      if (key === '8') {
        this.retrieve(this.$store.getters.id)
        router.replace({
          path: '/index/cart',
          params: {id: this.id}
        })
      }
      if (key === '9') {
        this.retrieve(this.$store.getters.id)
        router.push({
          path: '/index/personal',
          params: {id: this.id}
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 80vh;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  height: 80vh;
}

.header {
  height: 100px;
  background-color: white;
  position: fixed;
  width: 100vw;
  z-index: 100;
}

.el-menu-demo {
  margin: auto;
}

.item {
  float: left;
  height: 100px;
  width: 16.6%;
  display: flex;
  align-items: center;
  text-align: center;
}

.menu-span {
  width: 100%;
  text-align: center;
}

.search {
  float: left;
  margin: auto;
  width: 15%;
  height: 100px;
  display: flex;
  align-items: center;
}

.logo {
  float: left;
  width: 12.5%;
  height: 100px;
  display: flex;
  align-items: center;
}

.userName {
  color: #FFD04B;
}

.menu {
  float: left;
  height: 100px;
  width: 45%;
}

.personal {
  float: left;
  width: 27%;
  height: 100px;
}

.personal-item {
  float: left;
  width: 33.3%;
  height: 100px;
  display: flex;
  align-items: center;
  text-align: center;
}
</style>
