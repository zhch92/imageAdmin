<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import vHead from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'
export default {
  components: {
    vHead,
    vSidebar
  },

  mounted () {

  }
}
</script>
<style scoped>
.content {
  background: #f1f2f7;
  padding-left: 180px;
  padding-top: 70px;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
