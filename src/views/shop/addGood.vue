<template>
  <div>
    <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture"
    style="width: 30%;float: left"
  >
    <el-button size="small" type="primary">点击上传图片</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
    <div style="width: 40%;float: left;margin-left: 10%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="form.category" placeholder="请选择商品类别">
            <el-option label="休闲" value="1"></el-option>
            <el-option label="充饥" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-input-number v-model="form.count" :step="1" :min="1"></el-input-number>
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
export default {
  name: 'AddGood',
  data () {
    return {
      form: {
        name: '',
        category: '1',
        describe: '',
        status: '0',
        price: '',
        count: ''
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>

</style>
