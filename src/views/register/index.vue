<template>
    <div class="registerForm">
      <el-form :model="registerForm" :rules="rules"  label-width="120px" class="demo-ruleForm">
        <el-form-item prop="username" class="item" label="用户名">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password1" class="item" label="密码">
          <el-input v-model="registerForm.password1" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="password2" class="item" label="再次输入密码">
          <el-input v-model="registerForm.password2" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="phone" class="item" label="电话">
          <el-input v-model="registerForm.phone" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register()">注册</el-button>
          <router-link to='/Login'>
            <span style="text-align:center;font-size: 14px;">现在登录</span>
          </router-link>
        </el-form-item>
      </el-form>
    <br><br>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        username: '',
        password1: '',
        password2: '',
        isseller: '0',
        phone: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password1: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 23, message: '长度在 5 到 23 个字符', trigger: 'blur'}
        ],
        password2: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 23, message: '长度在 5 到 23 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话号', trigger: 'blur'},
          {min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur'}
        ]
      },
      options: [{
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '商铺卖家'
      }]
    }
  },
  created () {

  },
  methods: {
    register: function () {
      let fd = new FormData()
      fd.append('username', this.username)
      fd.append('passwd', this.password)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      if (this.password1 === this.password2) {
        this.$sevice.post('user/register', fd, config).then(res => {
          alert(res.data.msg)
          if (res.data.code === 200) {
            // 回到登录界面
            this.$router.push({
              path: '/'
            })
          }
        }).catch(res => {
          alert(res.data.msg)
        })
      } else {
        alert('两次输入的密码不同')
      }
    }
  }
}
</script>

<style scoped>
.registerForm {
  width: 50vw;
  margin: auto;
}
</style>
