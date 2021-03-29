<template class="tem">
  <div id="background">
    <div class="loginFormBack">
      <div class="loginForm">
        <el-form :model="loginForm" :rules="rules" :ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name" class="item">
            <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item class="item">
            <el-button type="primary" @click="submitForm(loginForm)">登陆</el-button>
            <el-button @click="resetForm(loginForm)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {setToken} from '../../utils/auth'

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
      username: state => state.data.username,
      token: state => state.token
    })
  },
  methods: {
    ...mapActions(['login']),
    submitForm (loginForm) {
      this.$refs[loginForm].validate(async valid => {
        if (valid) {
          await this.login(loginForm)
          await console.log(this.username)
          if (this.token !== null && this.token !== '') {
            setToken(this.token)
            this.$router.push({
              path: '/index'
            })
          } else {
            console.log(this.token)
          }
        } else {
          console.log('error submit!!')
          console.log(loginForm)
          console.log(valid)
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
  width: 30%;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.demo-ruleForm {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.item {
  width: 80%;
}

</style>
