<template class="tem">
  <div id="background">
    <div class="loginFormBack">
      <div class="loginForm">
        <el-form :model="loginForm" :rules="rules" :ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name" class="item">
            <el-input v-model="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="item">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="item">
            <el-button type="primary" @click="submitForm(loginForm)">登陆</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {mapActions, mapState} = createNamespacedHelpers('userModule')
export default {
  name: 'loginPage',
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 23, message: '长度在 5 到 23 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.name,
      success: state => state.success
    })
  },
  methods: {
    ...mapActions(['login']),
    submitForm (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          console.log(loginForm)
          this.login(loginForm).then(result => {
            if (result) {
              if (this.success) {
                this.$router.push({
                  path: '/index',
                  params: {
                    username: this.username
                  }
                })
              }
            }
          })
        } else {
          console.log('error submit!!')
          console.log(loginForm)
          console.log(valid)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style scoped>
#background {
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url('../../assets/干果图片.jpg');
}

.loginFormBack {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.loginForm {
  width: 500px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
}

.demo-ruleForm {
  width: 500px;
  height: 180px;
  text-align: center;
}

.item {
  width: 80%;
}

</style>
