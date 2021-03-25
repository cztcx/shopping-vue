<template>
  <el-container>
    <Header></Header>
    <el-main>
      <Home v-if="homeshow"></Home>
    </el-main>
  </el-container>
</template>

<script>
import Home from './Home'
import Header from './header'

export default {
  name: 'Index',
  components: {Header, Home},
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      homeshow: true

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
  line-height: 100vh;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
