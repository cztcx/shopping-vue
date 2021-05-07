<template>
  <el-form label-position="right" label-width="80px" :model="form">
    <el-form-item label="昵称">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-button @click="this.open">修改</el-button>
  </el-form>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {setUserName, getId} from '../../utils/session'

const {mapActions, mapState} = createNamespacedHelpers('userModule')
export default {
  name: 'Update',
  data () {
    return {
      form: {
        id: getId(),
        nickname: '',
        email: '',
        phone: ''
      }
    }
  },
  created () {
    this.setForm()
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(['update', 'retrieve']),
    open () {
      this.$confirm('该操作将修改信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(this.form).then(() => {
          setUserName(this.form.nickname)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          location.reload()
        }).catch(() => {
          this.$message.error('内部错误，修改失败，请稍后再试')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    setForm () {
      this.retrieve(getId()).then(() => {
        this.form.email = this.user.email
        this.form.phone = this.user.phone
        this.form.nickname = this.user.nickname
      })
    }
  }
}
</script>

<style scoped>

</style>
