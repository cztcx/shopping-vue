<template>
  <div class="home">
    <div class="pictures">
      <div class="imgItems" @mouseover="mouseOver" @mouseout="mouseOut">
        <img src="../../../static/首页轮播图片/坚果.png" alt="" class="imgA indexZ">
        <img src="../../../static/首页轮播图片/巧克力.png" alt="" class="imgA">
        <img src="../../../static/首页轮播图片/糖.png" alt="" class="imgA">
        <img src="../../../static/首页轮播图片/薯片.png" alt="" class="imgA">
        <img src="../../../static/首页轮播图片/鸭脖.png" alt="" class="imgA">

        <div class="imgIndexs">
          <div class="imgIndex" v-for="(item,index) in imgCount" @mouseover="indexBtn(index)"
               :class="{indexBGC:currentIndex == index}" :key="index">
          </div>
        </div>
      </div>
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
  mounted () {
    this.imgCount = document.getElementsByClassName('imgA').length
    setTimeout(() => {
      // 开始播放
      this.startTime()
    }, 10)
  },
  methods: {
    /**
     * 鼠标移动到图片上
     */
    mouseOver () {
      this.stopTime()
    },
    /**
     * 鼠标移出图片
     */
    mouseOut () {
      this.startTime()
    },
    /**
     * 点击圆圈
     */
    indexBtn (index) {
      this.currentIndex = index
      this.selectImg(index)
      this.stopTime()
    },
    /**
     * 选中对应的图片设置层级类
     */
    selectImg (index) {
      let imgList = document.getElementsByClassName('imgA')
      this.clearClass(imgList)
      imgList[index].className = 'imgA indexZ'
    },
    /**
     * 层级复位
     */
    clearClass (array) {
      for (let i = 0; i < array.length; i++) {
        array[i].className = 'imgA'
      }
    },

    /**
     * 开始循环播放图片
     */
    startTime () {
      this.intervalID = window.setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 4) {
          this.currentIndex = 0
        }
        this.selectImg(this.currentIndex)
      }, 2000)
    },
    /**
     * 鼠标移到图片上时停止图片播放
     */
    stopTime () {
      window.clearInterval(this.intervalID)
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
