<template>
  <div class="container">
    <li v-for="(item,index) in this.data" :key="index" class="goods">
      <el-card :body-style="{ padding: '0px', height: '100%'}" shadow="hover">
        <img :src="item.imgList[item.imgList.length-1].url" style="height: 150px"
             class="image" @click="toCart(item.goods.id)">
        <div style="padding: 14px; display: block; height: 33.3%">
          <span>{{ item.goods.name }}</span>
          <p class="price">￥{{ item.goods.price }}</p>
          <div class="bottom clearfix">
            <time class="time">{{ item.goods.introduction }}</time>
            <el-button type="danger" class="button" @click="addCart(item)">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </li>
    <!--    <li v-for="(item,index) in this.data" :key="index" class="goods" @click="toCart(item.goods.id)"
            v-on:mouseover="show()">
          <span class="tuceng" v-if="false" v-key="index"><el-button class="button">加入购物车</el-button></span>
          <span class="goods-img"><el-image style="width: 100%; height: 100%"
                                            :src="item.imgList[item.imgList.length-1].url"
                                            :fit="fit"></el-image></span>
          <p class="name">{{ item.goods.name }}</p>
          <p class="price">￥{{ item.goods.price }}</p>
          <p class="count"><span style="color: #B3C0D1">库存：</span>{{ item.goods.ccount }}</p>
          <p class="describe"><span style="color: #B3C0D1">简介：</span>{{ item.goods.introduction }}</p>
        </li>-->
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'

const {mapActions, mapState} = createNamespacedHelpers('goodsModule')

export default {
  name: 'GoodsList',
  data () {
    return {
      buttonShow: false,
      fit: 'cover',
      order: {
        count: 1,
        userId: getId(),
        goodsId: '',
        flavor: '随机',
        url: ''
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapState({
      data: state => state.data
    })
  },
  methods: {
    ...mapActions(['getGoodsByCID']),
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
    },
    getData () {
      this.getGoodsByCID(this.$route.query.categoryId)
    },
    addCart (item) {
      this.order.url = item.imgList[item.imgList.length - 1].url
      this.order.goodsId = item.goods.id
      this.$store.dispatch('cartModule/add', this.order).then(() => {
        alert('添加成功')
      }).catch(() => alert('系统内部错误请重试'))
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  display: block;
}

.image {
  width: 100%;
  height: 66.6%;
  display: block;
}

.image:hover {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  width: 100%;
  height: 66.6%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.goods {
  list-style: none;
  margin: auto;
  margin-top: 10px;
  height: 300px;
  width: 23%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  margin-left: 1.55%;
  float: left;
}

.goods:hover {
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
  height: 50%;
}

.name {
}

.describe {
  font-size: x-small;
  color: #bf7032;
  height: 20%;
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
