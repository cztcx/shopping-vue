<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="店铺名称">
      <el-input v-model="form.shopname"></el-input>
    </el-form-item>
    <el-form-item label="店铺主人">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="店铺地址">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="店铺主营">
      <el-select v-model="form.category" placeholder="请选择主营类型">
      <el-option label="类型一" value="1"></el-option>
      <el-option label="类型二" value="2"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="店铺介绍">
      <el-input type="textarea" v-model="form.introduction"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SetUp',
  data () {
    return {
      form: {
        shopname: '',
        username: '',
        address: '',
        category: '',
        introduction: ''
      }
    }
  },
  methods: {
    onSubmit () {
      alert('修改成功!')
    }
  }
}
</script>

<style scoped>

</style>
