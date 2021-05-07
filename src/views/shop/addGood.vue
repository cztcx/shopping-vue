<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/v1/upload"
      :headers="myHeaders"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="success"
      :file-list="fileList"
      :limit="6"
      list-type="picture">
      <el-button size="small" type="primary">点击上传图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div style="width: 40%;float: left;margin-left: 10%" class="form">
      <el-form ref="form" :model="GoodsForm" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="GoodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="GoodsForm.categoryId" placeholder="请选择商品类别">
            <el-option label="熟食" value="1"></el-option>
            <el-option label="休闲" value="2"></el-option>
            <el-option label="充饥" value="3"></el-option>
            <el-option label="礼品" value="4"></el-option>
            <el-option label="网红" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in GoodsForm.flavorFormList"
          :label="'口味' + String.fromCharCode(65+ index)"
          :key="index"
          :prop="'options.' + index + '.value'"
        >
          <el-input v-model="item.flavor" class="input" size="mini" style="width: 70%"></el-input><el-button @click.prevent="removeFlavor(item)" size="mini">删除</el-button>
          <br>
        </el-form-item>
        <el-button @click="addFlavor" size="mini">添加口味</el-button>
        <el-form-item label="商品描述">
          <el-input autosize type="textarea" v-model="GoodsForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="GoodsForm.status">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number v-model="GoodsForm.price" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="库存数">
          <el-input-number v-model="GoodsForm.ccount" :step="1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="售后">
          <el-input autosize type="textarea" v-model="GoodsForm.service"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {getToken} from '../../utils/session'
import {deleteImg} from '../../api/imgApi'

const {mapActions} = createNamespacedHelpers('goodsModule')
export default {
  name: 'AddGood',
  data () {
    return {
      myHeaders: {token: getToken()},
      GoodsForm: {
        shopId: '1',
        name: '',
        categoryId: '1',
        introduction: '',
        status: '0',
        price: '',
        ccount: '',
        imgFormList: [],
        flavorFormList: [{flavor: '默认'}],
        service: ''
      },
      fileList: []
    }
  },
  methods: {
    ...mapActions(['create']),
    onSubmit () {
      this.$confirm('该操作将修改信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.create(this.GoodsForm).then(() => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.go(0)
        }).catch(() => {
          this.$message.error('内部错误，创建失败，请稍后再试')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
      console.log(this.GoodsForm)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      deleteImg(file.response.name)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeUpload (file) {
    },
    success (response) {
      console.log(response)
      this.GoodsForm.imgFormList.push({
        name: response.name,
        url: response.url
      })
      console.log(this.GoodsForm)
    },
    removeFlavor (item) {
      var index = this.GoodsForm.flavorFormList.indexOf(item)
      if (index !== -1) {
        this.GoodsForm.flavorFormList.splice(index, 1)
      }
    },
    addFlavor () {
      this.GoodsForm.flavorFormList.push({
        flavor: ''
      })
    }
  }
}
</script>

<style scoped>
.upload-demo {
  float: left;
  width: 30%;
}

.form {
  float: left;
  width: 70%;
}
</style>
