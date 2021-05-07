<template>
  <div>
    <span>申请人:</span>
    <el-input
      placeholder="申请人"
      v-model="userName"
      style="width: 200px"
      clearable>
    </el-input>
    <span>商铺名:</span>
    <el-input
      placeholder="商铺"
      v-model="shopName"
      style="width: 200px"
      clearable>
    </el-input>
    <span>申请日期范围:</span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <el-button type="primary">搜索</el-button>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Data.length">
    </el-pagination>
    <el-table :data="this.Data.slice((currentPage-1)*pagesize,currentPage*pagesize)">
      <el-table-column prop="index" label="编号">
      </el-table-column>
      <el-table-column prop="shopName" label="商铺名称">
      </el-table-column>
      <el-table-column prop="date" label="申请时间" width="140">
      </el-table-column>
      <el-table-column prop="name" label="申请人姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="店铺地址">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <el-button type="primary" size="small" @click="pass" plain>通过</el-button>
        <el-button type="danger" size="small" @click="nopass" plain>不通过</el-button>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'Approve',
  data () {
    const item = {
      date: '2016-05-02',
      shopName: '鸡翅店铺',
      name: '王小虎',
      address: '鞍山市辽宁科技大学',
      count: '100',
      id: '1'
    }
    return {
      currentPage: 1,
      pagesize: 8,
      Data: Array(20).fill(item)
    }
  },
  methods: {
    pass () {
      this.$confirm('此操作将允许开设店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已通过!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    },
    nopass () {
      this.$confirm('此操作将禁止开设店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已禁止!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    }
  }
}
</script>

<style scoped>

</style>
