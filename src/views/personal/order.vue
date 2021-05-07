<template>
  <div>
    <el-table :data="this.orders">
      <el-table-column type="index" :index="indexMethod" label="编号">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-image :src="scope.row.url" fit="cover" style="width: 100px;height: 100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column prop="flavor" label="口味">
      </el-table-column>
      <el-table-column prop="count" label="数量" width="50px">
      </el-table-column>
      <el-table-column prop="username" label="收货人姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="ctime" label="下单时间" width="140">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="receive(scope.row.id)" plain>确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'

const {mapActions, mapState} = createNamespacedHelpers('orderModule')
export default {
  name: 'Order',
  data () {
    const item = {
      date: '2016-05-02',
      goodsName: '鸡翅',
      name: '王小虎',
      address: '鞍山市辽宁科技大学',
      count: '100',
      id: '123'
    }
    return {
      userName: '',
      goodsName: '',
      orderData: [],
      tableData: Array(20).fill(item),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: ''
    }
  },
  computed: {
    ...mapState({
      orders: state => state.userOrders
    })
  },
  created () {
    this.getOrders()
  },
  methods: {
    ...mapActions(['getUserOrders']),
    getOrders () {
      this.getUserOrders(getId())
    },
    indexMethod (index) {
      return index + 1
    },
    getOrder: () => {
      this.orderData = []
    },
    receive () {
      this.$confirm('确认收货, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已发货!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
