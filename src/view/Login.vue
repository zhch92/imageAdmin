<template>
  <div class="bg">
    <div class="login-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-position="right" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">进入系统</el-button>
        </el-form-item>
       </el-form>
    </div>
  </div>
</template>
<script>
import {storageManager} from '../ulits/common.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入秘密', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiData('get', '/api/login', {userName: this.ruleForm.username, password: this.ruleForm.password}).then((resp) => {
            if (resp.status === 200) {
              storageManager.setStorage('token', this.ruleForm.username)
              this.$message('登录成功')
              this.$router.push({path: '/index'})
            }
          })
        } else {
        //            this.$message({
        //   message: '警告哦，这是一条警告消息',
        //   type: 'warning'
        // })
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
<style lang="scss" scope>
.bg{
  background:#282b4c;
  position: relative;
  width: 100%;
  height: 100vh;
  .login-box{
    padding:50px 30px 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    // background: hsla(0,0%,100%,.3);
    background: #fff;
    overflow: hidden
  }
}
</style>
