<template>
  <div class="home">
    <div class="pictures">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item,index) in this.imgs" :key="index">
          <img :src="item.src" style="width: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="textDiv"><span style="margin: 20px; font-size: large">新品推荐</span></div>
    <div class="newArrivals">
      <el-divider content-position="left">坚果</el-divider>
    </div>
    <div class="productList">
      <div class="products">
        <div class="product" v-for="item in this.One" :key="item.id">
          <div class="imgB">{{ item.img }}</div>
          <div class="describe">
            <span style="font-size: 20px; color: coral">{{ item.name }}</span><br/>
            <span style="font-size: 13px; color: darkgray">{{ item.comment }}</span><br/>
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
      imgs: [
        {
          src: 'static/首页轮播图片/坚果.png'
        },
        {
          src: 'static/首页轮播图片/巧克力.png'
        },
        {
          src: 'static/首页轮播图片/糖.png'
        },
        {
          src: 'static/首页轮播图片/薯片.png'
        },
        {
          src: 'static/首页轮播图片/鸭脖.png'
        }
      ],
      imgCount: 0, // 图片个数
      currentIndex: 0, // 当前图片
      intervalID: '', // 停止interval的唯一id
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
  },
  methods: {
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
  width: 100vw;
  height: 350px;
  margin-top: 100px;
}

.newArrivals {
  margin: auto;
  width: 75vw;
}

.textDiv {
  margin: auto;
  width: 75vw;
  text-align: left;
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

.imgB {
  border: 1px solid red;
  height: 120px;
  background-color: #B3C0D1;
}

.describe {
  border: 1px solid red;
  height: 78px;
  background-color: #E9EEF3;
}

.imgA {
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
}

.imgItems {
  position: relative;
  width: 100%;
  height: 350px;
}

/*圆圈居中水平排列*/
.imgIndexs {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 49%;
  bottom: 15px;
  width: 100px;
  z-index: 100;
}

/*图片所对应的圆圈*/
.imgIndex {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  z-index: 100;

}

/*设置层级，显示图片*/
.indexZ {
  z-index: 10;
}

/*选中对应的圆圈设置背景颜色*/
.indexBGC {
  background-color: #bf7032;
  cursor: pointer;
}
</style>
