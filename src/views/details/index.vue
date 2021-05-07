<template>
  <div class="back">
    <div class="picture">
      <div class="large">
        <el-image class="imgLarge" :src="this.src" fit="cover"></el-image>
      </div>
      <div class="small">
        <li class="smallLI" v-for="(item,index) in this.imgList" @mouseenter="showImg(item.url,index)" :key="index">
          <el-image :src="item.url" class="imgSmall" v-if="index<3" fit="cover"></el-image>
        </li>
      </div>
    </div>
    <div class="Information">
      <h1>{{ this.goods.name }}</h1>
      <span>{{ this.goods.introduction }}</span>
    </div>
    <div class="buy">
      <h1 style="color: #e88258">￥{{ this.goods.price }}</h1>
      <span v-for="(item,index) in this.flavorList" :key="index">
      <el-radio v-model="order.flavor" :label="item.flavor" size="small" border>{{item.flavor}}</el-radio>
      </span>
      <h1>
        <el-input-number v-model="order.count" :step="1" :min="1" size="small"></el-input-number>
      </h1>
      <el-button>立即购买</el-button>
      <el-button type="danger" @click="addCart(imgList[imgList.length-1].url)">加入购物车</el-button>
    </div>
    <div class="otherImg">
      <li class="otherLI" v-for="(item,index) in this.imgList" :key="index">
        <el-image :src="item.url" class="imgOthers" v-if="index>=3" fit="cover"></el-image>
      </li>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'

const {mapActions, mapState} = createNamespacedHelpers('goodsModule')
export default {
  name: 'Details',
  data () {
    return {
      id: this.$route.query.id,
      selectImg: {'z-index': 100},
      src: '',
      order: {
        count: 1,
        userId: getId(),
        goodsId: this.$route.query.id,
        flavor: '随机',
        url: ''
      }
    }
  },
  computed: {
    ...mapState({
      goods: state => state.goods.goods,
      imgList: state => state.goods.imgList,
      flavorList: state => state.goods.flavorList
    })
  },
  created () {
    this.getGoods()
  },
  methods: {
    ...mapActions(['getGoodsByID']),
    getGoods () {
      this.getGoodsByID(this.id).then(() => {
        this.src = this.imgList[0].url
      })
    },
    reverse () {
      this.ImgList = this.imgList.reverse()
    },
    showImg (url, index) {
      this.src = url
    },
    addCart (url) {
      this.order.url = url
      this.$store.dispatch('cartModule/add', this.order).then(() => {
        alert('添加成功')
      }).catch(() => alert('系统内部错误请重试'))
    }
  }
}
</script>

<style scoped>
.picture {
  height: 65vh;
  /*border: 1px solid #e3cc78;*/
}

.back {
  margin: auto;
  margin-top: 110px;
  width: 73vw;
  height: auto;
  border: 1px solid #e3cc78;
}

.large {
  position: relative;
  float: left;
  width: 80%;
  height: 100%;
  /*  border: 1px solid green;*/
}

.small {
  float: left;
  width: 19%;
  height: 100%;
  /*  border: 1px solid yellow;*/
}

.imgLarge {
  width: 100%;
  height: 100%;
}

.imgSmall {
  margin: auto;
  width: 80%;
  height: 9%;
  margin-top: 0.5%;
}

.imgOthers {
  margin: auto;
}

.smallLI {
  margin-top: 10px;
  list-style: none;
  display: flex;
  align-items: center;
  text-align: right;
}

.smallLI:active {
  /*  border: 1px solid #e3cc78;*/
}

.smallLI:hover {
  border: 1px solid #e3cc78;
}

.Information {
  float: left;
  height: 36%;
  width: 49%;
  /*  border: 1px solid #e3cc78;*/
}

.buy {
  float: left;
  height: 36%;
  width: 50%;
  /*  border: 1px solid #e3cc78;*/
}
.otherImg {
  margin-top: 28%;
}
.otherLI {
  list-style: none;
}
</style>
