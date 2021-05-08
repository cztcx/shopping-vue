<template>
  <div>
    <el-table :data="this.orders">
      <el-table-column type="index" :index="indexMethod" label="编号">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-image :src="scope.row.url" fit="cover" style="width: 100px;height: 100px" @click="toDetails(scope.row.goodsId)"></el-image>
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
          <el-button type="primary" size="small" @click="deleteHistory(scope.row)" plain>删除记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'

const {mapActions, mapState} = createNamespacedHelpers('orderHistoryModule')
export default {
  name: 'UOrderHistory',
  data () {
    return {
      userName: '',
      goodsName: '',
      orderData: [],
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
      orders: state => state.userHistoryOrders
    })
  },
  created () {
    this.getHistoryOrders()
  },
  methods: {
    ...mapActions(['getUserHistoryOrders', 'deleteHistoryOrder']),
    getHistoryOrders () {
      this.getUserHistoryOrders(getId())
    },
    indexMethod (index) {
      return index + 1
    },
    getOrder: () => {
      this.orderData = []
    },
    deleteHistory (row) {
      this.$confirm('确认删除将无法恢复, 是否继续?', '温馨提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id)
        this.deleteHistoryOrder(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '已删除!'
          })
          location.reload()
        }).catch(() => {
          this.$message.error('内部错误，删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    },
    toDetails (id) {
      this.$router.push({
        path: '/index/details',
        query: {id: id}
      })
    }
  }
}
</script>

<style scoped>
</style>
