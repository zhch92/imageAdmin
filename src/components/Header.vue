<template>
    <div class="header">
        <div class="logo">欢迎来到图片管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import {storageManager} from '../ulits/common.js'

export default {
  data () {
    return {
      name: storageManager.getStorage('token')
    }
  },
  created () {

  },
  computed: {

  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        storageManager.removeStorage('token')
        this.$router.push({path: './login'})
      }
    }
  }
}
</script>
<style scoped>
.header {
  position: absolute;
  box-sizing: border-box;
  left: 0;
  right: 0;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
  z-index: 999;
  background: #282b4c;
}

.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}

.ip {
  text-align: center;
  font-size: 14px;
  color: #fff;
}
.red {
  color: red;
}
.user-info {
  /* float: right; */
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
