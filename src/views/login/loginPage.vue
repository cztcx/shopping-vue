<template class="tem">
  <div id="background">
    <div class="loginForm">
      <div class="button-radio">
        <el-radio-group v-model="radio">
          <el-button type="primary" @click="showUser()" class="user-button" >用户</el-button>
          <el-button type="primary" @click="showManager()" class="manager-button" >管理员</el-button>
        </el-radio-group>
      </div>
      <div class="userLoginFormBack" v-if="userShow">
        <el-form :model="loginForm" :rules="rules" :ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name" class="item">
            <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <router-link to='/Register'>
            账号注册
          </router-link>
          <router-link to='/ChangePwd'>
            修改密码
          </router-link>
          <el-form-item class="item">
            <el-button type="primary" :loading="loading" @click="submitForm1(loginForm)">登陆</el-button>
            <el-button @click="resetForm(loginForm)">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="managerLoginFormBack" v-if="manageShow">
        <el-form :model="loginForm" :rules="rules" :ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name" class="item">
            <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <router-link to='/Register'>
            账号注册
          </router-link>
          <router-link to='/ChangePwd'>
            修改密码
          </router-link>
          <el-form-item class="item">
            <el-button type="success" :loading="loading" @click="submitForm2(loginForm)">登陆</el-button>
            <el-button @click="resetForm(loginForm)">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {getToken} from '../../utils/session'

const {mapState} = createNamespacedHelpers('userModule')
export default {
  name: 'loginPage',
  data () {
    return {
      radio: '用户',
      loading: false,
      userShow: true,
      manageShow: false,
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
      token: state => state.token,
      success: state => state.success
    })
  },
  methods: {
    submitForm1 (loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('userModule/login', this.loginForm).then(() => {
            this.$router.push({path: '/index/home'})
            this.loading = false
            if (!getToken()) {
              alert('账号或密码错误')
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm2 (loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('managerModule/login', this.loginForm).then(() => {
            this.$router.push({path: '/manage'})
            this.loading = false
            if (!getToken()) {
              alert('账号或密码错误')
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    showUser () {
      this.manageShow = false
      this.userShow = true
    },
    showManager () {
      this.userShow = false
      this.manageShow = true
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
  display: flex;
  align-items: center;
  background-image: url('../../assets/干果图片.jpg');
}

.userLoginFormBack {
  position: relative;
  height: 86.7%;
  width: 100%;
  box-sizing: border-box;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(55, 189, 128, 1);
}

.managerLoginFormBack {
  position: relative;
  height: 86.7%;
  width: 100%;
  box-sizing: border-box;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(55, 189, 189, 1);
}

.loginForm {
  width: 30%;
  height: 40%;
  background-color: rgba(255, 255, 255, 0);
  margin: auto;
  border-radius: 15px;
}

.demo-ruleForm {
  position: absolute;
  margin: auto;
  margin-top: 8%;
  padding-bottom: 0;
  width: 100%;
  height: 80%;
  text-align: center;
  box-sizing: border-box;
}

.item {
  width: 80%;
}

.button-radio {
  margin-left: 0;
  height: 13.4%;
  text-align: right;
}

.user-button {
  border-radius: 0;
  background-color: rgba(55, 189, 128, 1);
  border: 1px solid rgba(55, 189, 128, 1);
}
.manager-button {
  margin-left: 0px;
  border-top-right-radius: 15px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 100%;
  background-color: rgba(55, 189, 189, 1);
  border: 1px solid rgba(55, 189, 189, 1);
}

</style>
