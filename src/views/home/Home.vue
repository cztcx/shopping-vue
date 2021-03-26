<template>
  <div class="home">
    <div class="pictures"></div>
    <div class="textDiv"><span style="margin: 20px; font-size: large">新品推荐</span></div>
    <div class="newArrivals">
      <el-divider content-position="left">坚果</el-divider>
    </div>
    <div class="productList">
      <div class="products">
        <div class="product" v-for="item in this.One" :key="item.id">
          <div class="img">{{ item.img }}</div>
          <div class="describe">
            <span style="font-size: 20px; color: coral">{{ item.name }}</span><br/>
            <span style="font-size: 13px; color: darkgray">{{item.comment}}</span><br/>
            <span style="font-size: 15px; color: coral">新品特惠{{ item.price }}￥</span>
          </div>
        </div>
      </div>
    </div>
    <div class="newArrivals">
      <el-divider content-position="left">小吃</el-divider>
    </div>
    <div class="productList">
      <div class="products">
      </div>
    </div>
    <div class="newArrivals">
      <el-divider content-position="left">聚餐</el-divider>
    </div>
    <div class="productList">
      <div class="products">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home',
      One: [
        {
          id: '1',
          img: 'img1',
          price: '200',
          name: '零食3',
          comment: '描述1'
        },
        {
          id: '2',
          img: 'img2',
          price: '200',
          name: '零食2',
          comment: '描述2'
        },
        {
          id: '3',
          img: 'img3',
          price: '200',
          name: '零食3',
          comment: '描述3'
        },
        {
          id: '4',
          img: 'img4',
          price: '200',
          name: '零食4',
          comment: '描述4'
        }
      ],
      two: [],
      three: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.pictures {
  border: 1px solid red;
  width: 100vw;
  height: 450px;
}

.newArrivals {
  margin: auto;
  border: 1px solid red;
  width: 75vw;
}

.textDiv {
  margin: auto;
  border: 1px solid red;
  width: 75vw;
  text-align: left;
  padding: 20px;
}

.productList {
  margin: auto;
  border: 1px solid red;
  width: 75vw;
  height: 200px;
}

.product {
  float: left;
  border: 1px solid red;
  width: 24.82%;
  height: 200px;
  margin: auto;
  background-color: #42b983;
}
.img {
  border: 1px solid red;
  height: 120px;
  background-color: #B3C0D1;
}
.describe {
  border: 1px solid red;
  height: 78px;
  background-color: #E9EEF3;
}
</style>
