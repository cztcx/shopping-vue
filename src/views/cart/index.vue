<template>
  <div id="main">
    <el-table
      ref="multipleTable"
      :data="this.data"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="商品" style="padding: 30px" width="500px">
        <template slot-scope="scope">
          <div class="goods-image">
            <el-image :src="scope.row.url" fit="cover" style="width: 200px; height: 100px"
                      @click="toCart(scope.row.goodsId)"></el-image>
          </div>
          <div class="goods-information">
            <h3>{{ scope.row.goodsName }}</h3>
            <ul>
              <li>口味：{{ scope.row.flavor }}</li>
              <li>库存：{{ scope.row.count }}件</li>
              <li>售后：{{ scope.row.service }}</li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价（元）" align="center">
        <template slot-scope="scope">
          <span class="price">￥<span class="price-em">{{ scope.row.price.toFixed(2) }}</span></span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <div class="combo">
            <el-input-number v-model="scope.row.num" :step="1" :min="1" :max="scope.row.count"
                             size="small"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="金额（元）" align="center">
        <template slot-scope="scope">
          <strong class="amount">￥<em
            class="amount-em">{{ (scope.row.price * scope.row.num).toFixed(2) }}</em></strong>
        </template>
      </el-table-column>
      <span v-if="this.data.length===0">购物车什么都没有，去挑选东西，才能在这里看到哦！</span>
    </el-table>
    <div v-show="this.data.length>0" class="footer">
      <el-button :type="buttonType" @click="toggleSelection(data)" style="float: left" plain>
        {{ Buttontext }}
      </el-button>
      <el-button type="danger" @click="deleteGoods()" style="float: left" plain>删除所选</el-button>
      <span>{{ this.selectAddress.username }}&nbsp;&nbsp;{{ this.selectAddress.address }}&nbsp;&nbsp;{{
          this.selectAddress.phone
        }}</span>
      <el-button type="text" @click="getAddress">选择收货地址</el-button>
      <div style="float: right; margin-right: 20%">
        <span style="color: #e88258;font-size: large"><strong>￥{{ priceOfSelect.toFixed(2) }}</strong></span>
        <el-button type="danger" @click="payShow">立即结算</el-button>
      </div>
    </div>
    <el-drawer
      title="请选择地址"
      :visible.sync="address"
      direction="ltr"
      size="50%">
      <el-table :data="AllAddress">
        <el-table-column property="username" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column property="phone" label="电话" width="150"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" @click="selectThis(scope.row)" plain>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'
import {getAll} from '../../api/addressApi'

const {mapActions, mapState} = createNamespacedHelpers('cartModule')
export default {
  name: 'Cart',
  data () {
    return {
      AllAddress: [],
      address: false,
      Buttontext: '全选',
      selectAll: true,
      buttonType: 'primary',
      cartList: [],
      goodsIdList: [],
      multipleSelection: [],
      selectAddress: {},
      hasAddress: false,
      order: {
        address: {},
        orderGoodsFormList: []
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.data
    }),
    priceOfSelect () {
      if (this.multipleSelection.length > 0) {
        let price = 0.00
        this.multipleSelection.forEach(function (value, key, arr) {
          price += value.price * value.num
        })
        return price
      } else {
        return 0
      }
    }
  },
  created () {
    this.Cart()
  },
  methods: {
    ...mapActions(['getCart', 'deleteSelect']),
    toggleSelection (rows) {
      this.selectAll = !this.selectAll
      if (this.selectAll) {
        this.buttonType = 'primary'
        this.Buttontext = '全选'
      } else {
        this.buttonType = 'warning'
        this.Buttontext = '取消全选'
      }
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    Cart () {
      this.getCart(getId()).then(() => {
      }).catch(() => {
        this.$message.error('内部错误')
      })
    },
    toCart (id) {
      this.$router.push({
        path: '/index/details',
        query: {id: id}
      })
    },
    deleteGoods () {
      this.deleteSelect(this.multipleSelection).then(() => {
        this.$message.success('删除成功')
        location.reload()
      }).catch(() => {
        this.$message.error('内部错误，删除失败！')
      })
    },
    getAddress () {
      getAll(getId()).then(response => {
        this.AllAddress = response.data
        this.address = true
      })
    },
    selectThis (row) {
      this.selectAddress = row
      console.log(row)
      this.address = false
      this.hasAddress = true
    },
    payShow () {
      const h = this.$createElement
      if (this.hasAddress) {
        if (this.priceOfSelect > 0) {
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '所选商品总价值为 '),
              h('i', {style: 'color: red; font-size: large;font-weight: bolder;'}, this.priceOfSelect.toFixed(2)),
              h('span', null, '  元 请确认后支付？')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                this.order.address = this.selectAddress
                this.order.orderGoodsFormList = this.multipleSelection
                this.$store.dispatch('orderModule/add', this.order).then(() => {
                  done()
                  instance.confirmButtonLoading = false
                  alert('购买成功')
                  location.reload()
                }).catch(() => {
                  done()
                  instance.confirmButtonLoading = false
                  alert('购买失败')
                })
              } else {
                done()
              }
            }
          }).then(action => {
            this.$message({
              type: 'info',
              message: 'action: ' + action
            })
          })
        } else {
          alert('请选择想要支付的商品')
        }
      } else {
        alert('请选择收货地址')
      }
    }
  }
}
</script>

<style scoped>
.back {
  margin-top: 100px;
}

#main {
  width: 100%;
  padding: 30px 0px;
  margin-top: 100px;
}

table.form {
  border-collapse: collapse;
  empty-cells: show;
  margin: 20px 0px;
  padding: 0px;
  table-layout: fixed;
  width: 100%;
}

table.form th,
table.form td {
  border-bottom: 1px solid #DDDDDD;
  padding: 15px 10px;
  text-align: left;
}

table.form {
  border-top: 3px solid #DDDDDD;
}

.goods-image {
  border: 1px solid #DDDDDD;
  float: left;
  height: 100px;
  margin: 0px 20px 0px 0px;
}

.goods-image:hover {
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #DDDDDD;
  float: left;
  height: 100px;
  margin: 0px 20px 0px 0px;
}

.goods-information {
  float: left;
}

.goods-information ul {
  color: #666666;
  font-size: 12px;
  line-height: 20px;
  margin: 10px 0px 0px 0px;
}

.price,
.amount,
#total-amount {
  color: #e88258;
}

#total-amount {
  font-size: 22px;
}

.price em,
.amount em,
#total-amount em {
  font-style: normal;
}

.combo .combo-minus,
.combo .combo-value,
.combo .combo-plus {
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  color: #333333;
  float: left;
  font-weight: bold;
  margin: 0px;
  outline: none;
  text-align: center;
}

.combo .combo-minus,
.combo .combo-plus {
  font-size: 16px;
  height: 26px;
  line-height: 26px;
  padding: 0px;
  width: 24px;
}

.combo .combo-value {
  border-left: none;
  border-right: none;
  height: 20px;
  line-height: 20px;
  padding: 2px;
  width: 40px;
}

#cart-delete {
  margin-left: 20px;
}

#settlement {
  background: #e88258;
  border: none;
  color: #FFFFFF;
  float: right;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  margin: 0px;
  outline: none;
  padding: 0px;
  width: 160px;
}
</style>
