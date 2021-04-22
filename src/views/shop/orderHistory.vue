<template>
  <div>
    <span>收货人:</span>
    <el-input
      placeholder="收货人"
      v-model="userName"
      style="width: 200px"
      clearable>
    </el-input>
    <span>商品名:</span>
    <el-input
      placeholder="商品名"
      v-model="goodsName"
      style="width: 200px"
      clearable>
    </el-input>
    <span>下单日期范围:</span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <el-button type="primary" @click="getOrder">检索</el-button>
    <el-table :data="this.tableData">
      <el-table-column prop="index" label="编号">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column prop="date" label="下单时间" width="140">
      </el-table-column>
      <el-table-column prop="name" label="收货人姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="count" label="数量">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="Delete(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'OrderHistory',
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
  methods: {
    getOrder: () => {
      this.orderData = []
    },
    Delete (id) {
      this.$confirm('此操作会删除此历史记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已删除!'
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
