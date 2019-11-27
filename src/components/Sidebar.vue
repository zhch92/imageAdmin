<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark"   background-color="rgb(50, 65, 87)"
      text-color="rgb(191, 203, 217)"
      active-text-color="rgb(32, 160, 255)"  router>
                <template v-for="(item,index) in menu">
                    <!-- <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title">
                                {{ item.title }}</template>
                            <el-menu-item v-for="subItem  in item.subs" :index="subItem.index" :key="subItem.index">{{ subItem.title }} </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else> -->
                        <el-menu-item :index="item.index" :key="index">{{item.title }}</el-menu-item>
                    <!-- </template> -->
                </template>
        </el-menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [
        {
          index: '/index',
          title: '图片管理'
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    }
  }

}
</script>
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 179px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: rgb(50, 65, 87);
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  z-index: 999;
}

.sidebar > ul {
  /* height: 100%; */
  border-right: 1px solid rgb(50, 65, 87);
}
</style>
