<template>
  <div>
    <span>持有者:</span>
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
    <span>通过日期范围:</span>
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
    <el-table :data="this.Data">
      <el-table-column prop="index" label="编号">
      </el-table-column>
      <el-table-column prop="shopName" label="商铺名称">
      </el-table-column>
      <el-table-column prop="date" label="通过时间" width="140">
      </el-table-column>
      <el-table-column prop="name" label="持有者姓名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="持有者电话" width="120">
      </el-table-column>
      <el-table-column prop="address" label="店铺地址">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <el-button type="danger" size="small" @click="nopass" plain>关闭店铺</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ShopManage',
  data () {
    const item = {
      date: '2016-05-02',
      shopName: '鸡翅店铺',
      name: '王小虎',
      phone: '1222445454',
      address: '鞍山市辽宁科技大学',
      count: '100',
      id: '1'
    }
    return {
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
    }
  }
}
</script>

<style scoped>

</style>
