<template>
  <div>
    <span>商品名:</span>
    <el-input
      placeholder="商品"
      v-model="shopName"
      style="width: 200px"
      clearable>
    </el-input>
    <el-button type="primary">搜索</el-button>
    <el-table :data="this.Data">
      <el-table-column prop="index" label="编号">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="140">
      </el-table-column>
      <el-table-column prop="count" label="库存" width="140">
      </el-table-column>
      <el-table-column prop="date" label="创建时间" width="140">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="alter(scope.row.id)" plain>修改信息</el-button>
          <el-button type="danger" size="small" @click="nopass" plain>下架</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="form.count" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ShopGoods',
  data () {
    return {
      Data: [
        {
          index: '1',
          date: '2016-05-02',
          goodsName: '鸡翅',
          address: '鞍山市辽宁科技大学',
          price: 16.9,
          count: '100',
          id: '1'
        },
        {
          index: '2',
          date: '2016-05-02',
          goodsName: '鸡脖',
          address: '鞍山市辽宁科技大学',
          price: 99.9,
          count: '100',
          id: '2'
        }
      ],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        goodsName: '',
        price: '',
        count: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    alter (id) {
      this.dialogFormVisible = true
      this.form.id = id
    },
    nopass () {
      this.$confirm('此操作会将该上品下架, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已下架!'
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
