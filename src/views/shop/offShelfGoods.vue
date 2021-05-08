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
    <el-button
      class="filter-item"
      style="margin-top: 8px;margin-left: 5px;"
      type="primary"
      icon="el-icon-setting"
      @click="showItemTable = !showItemTable"
    >显示项
    </el-button>
    <el-dialog
      :visible.sync="showItemTable"
      title="选择显示项"
      width="30%"
    >
      <span class="showItemDiv">
        <el-checkbox v-model="showImgStatus" style=" margin-left: 30px; ">图片</el-checkbox>
        <el-checkbox v-model="showFlavorStatus">口味</el-checkbox>
        <el-checkbox v-model="showNameStatus" disabled style=" margin-left: 30px; ">商品名称</el-checkbox>
        <el-checkbox v-model="showPriceStatus">价格</el-checkbox>
        <el-checkbox v-model="showCountStatus">库存</el-checkbox>
        <el-checkbox v-model="showServiceStatus">售后</el-checkbox>
        <el-checkbox v-model="showIntroductionStatus">商品描述</el-checkbox>
        <el-checkbox v-model="showCtimeStatus">创建时间</el-checkbox>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showItemTable=!showItemTable">关闭</el-button>
      </span>
    </el-dialog>
    <el-table :data="this.goods.slice((currentPage-1)*pagesize,currentPage*pagesize)" width="100%">
      <el-table-column type="index" :index="indexMethod" label="编号" align="center">
      </el-table-column>
      <el-table-column prop="goodsName" v-if="showImgStatus" label="图片" align="center">
        <template slot-scope="scope">
          <el-image :src='scope.row.imgList[scope.row.imgList.length-1].url' fit="cover"
                    style="width: 150px;height: 100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" v-if="showFlavorStatus" label="口味" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item,index) in scope.row.flavorList" :key="index">{{ item.flavor }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" v-if="showNameStatus" label="商品名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods.name }}
        </template>
      </el-table-column>
      <el-table-column prop="price" v-if="showPriceStatus" label="价格" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="count" v-if="showCountStatus" label="库存" width="140" align="center" style="width: 100px">
        <template slot-scope="scope">
          {{ scope.row.goods.ccount }}
        </template>
      </el-table-column>
      <el-table-column prop="date" v-if="showServiceStatus" label="售后" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods.service }}
        </template>
      </el-table-column>
      <el-table-column prop="date" v-if="showIntroductionStatus" label="商品描述" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods.introduction }}
        </template>
      </el-table-column>
      <el-table-column prop="date" v-if="showCtimeStatus" label="创建时间" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods.ctime }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="alter(scope.row.goods.id)" plain>修改信息</el-button>
          <el-button type="success" size="small" @click="up(scope.row)" plain>上架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.goods.length">
    </el-pagination>
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
import {createNamespacedHelpers} from 'vuex'
import {getShopId} from '../../utils/session'

const {mapState, mapActions} = createNamespacedHelpers('shopModule')

export default {
  name: 'OffShelfGoods',
  data () {
    return {
      currentPage: 1,
      pagesize: 5,
      showItemTable: false,
      showNameStatus: true,
      showPriceStatus: true,
      showCountStatus: true,
      showCtimeStatus: true,
      showImgStatus: true,
      showFlavorStatus: true,
      showServiceStatus: false,
      showIntroductionStatus: false,
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
  computed: {
    ...mapState({
      goods: state => state.goodsDown
    })
  },
  created () {
    this.getGoods()
  },
  methods: {
    ...mapActions(['getGoodsDownByShopID', 'GoodsUp']),
    getGoods () {
      this.getGoodsDownByShopID(getShopId())
    },
    indexMethod (index) {
      return index + 1
    },
    alter (id) {
      this.dialogFormVisible = true
      this.form.id = id
    },
    up (row) {
      this.$confirm('此操作会将该上品下架, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.GoodsUp(row.goods.id).then(() => {
          this.$message({
            type: 'success',
            message: '已上架!'
          })
          location.reload()
        }).catch(() => {
          this.$message.error('内部错误,请稍后再试')
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
