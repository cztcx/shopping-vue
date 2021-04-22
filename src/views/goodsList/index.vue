<template>
  <div class="container">
    <li v-for="(item,index) in this.data" :key="index" class="goods" @click="toCart(item.id)" v-on:mouseover="show()">
      <span class="tuceng" v-if="false" v-key="index"><el-button class="button">加入购物车</el-button></span>
      <span class="goods-img"><img :src="item.src" alt="" class="list-img"></span>
      <p class="name">{{ item.name }}</p><p class="price">{{ item.price }}￥</p>
      <p class="count"><span style="color: #B3C0D1">库存：</span>{{ item.count }}</p>
      <p class="describe"><span style="color: #B3C0D1">简介：</span>{{ item.describe }}</p>
    </li>
  </div>
</template>
<script>

export default {
  name: 'GoodsList',
  data () {
    return {
      buttonShow: false,
      data: [{
        id: '1',
        name: '零食1',
        price: 5.99,
        count: 10000,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/坚果.png',
        shopname: '陈陈陈'
      }, {
        id: '2',
        name: '零食2',
        price: 9.99,
        count: 10001,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/巧克力.png',
        shopname: '陈兆'
      }, {
        id: '3',
        name: '零食3',
        price: 1.99,
        count: 10002,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/糖.png',
        shopname: '陈'
      }, {
        id: '4',
        name: '零食4',
        price: 1.99,
        count: 10002,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/坚果.png',
        shopname: '陈'
      }, {
        id: '5',
        name: '零食5',
        price: 1.99,
        count: 10002,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/薯片.png',
        shopname: '陈'
      }, {
        id: '6',
        name: '零食6',
        price: 1.99,
        count: 10002,
        describe: '既美味又方便',
        src: 'static/首页轮播图片/鸭脖.png',
        shopname: '陈'
      }
      ]
    }
  },
  methods: {
    toCart (id) {
      this.$router.push({
        path: '/index/details',
        query: {id: id}
      })
    },
    show () {
      this.buttonShow = true
    },
    hide () {
      this.buttonShow = false
    }
  }
}
</script>

<style scoped>
.goods {
  position: relative;
  list-style: none;
  margin: auto;
  margin-top: 15px;
  width: 23%;
  height: 150px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  float: left;
  margin-left: 1.55%;
}

.goods:hover {
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.container {
  width: 80%;
  margin: auto;
  margin-top: 100px;
  height: 87vh;
  text-align: center;
}

.goods-img {
  float: left;
  margin-left: 20px;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
}

.list-img {
  float: left;

  width: 100%;
  height: 80%;
}
.name {
}

.describe {
  font-size: x-small;
  color: #bf7032;
}

.count {
  margin-left: 10px;
  font-size: x-small;
  color: #B3C0D1;
}

.price {
  margin-left: 10px;
  font-size: large;
  color: #f3c90a;
}

.tuceng {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}

.button {
  margin: auto;
}
</style>
