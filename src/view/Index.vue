<template>
  <div class="main" v-loading="loading">
    <div class="screen">  <el-select v-model="status"  @change="getDataTale" placeholder="请选择">
    <el-option
      v-for="item in selectList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-button type="primary" @click="batchHandle('disabled')">批量禁用</el-button>
    <el-button type="primary" @click="batchHandle('able')">批量解除</el-button>
    <el-button type="primary" @click="batchHandle('delete')">批量删除</el-button>
    <el-tag>追光总人数:{{total}}</el-tag>
  </div>
      <el-table
    :data="tableData"
    border
    style="width: 100%"   @selection-change="handleSelectionChange">
    <!-- <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column> -->
      <el-table-column
      type="selection"
      width="55"  align="center">
    </el-table-column>
     <el-table-column
      type="index"
      label="序号"
      width="80" align="center">
    </el-table-column>
    <!-- <el-table-column
      prop="name"
      label="图片"
      >
    </el-table-column> -->
    <el-table-column label="图片">
      <template slot-scope="scope">
        <div class="img">
        <img :src="'http://'+scope.row.photoPath" alt="" @click="showDialog(scope.row,scope.$index)">
        </div>
      </template>
    </el-table-column>
    <el-table-column label="显示顺序" width="180" align="center">
      <template slot-scope="scope">
      <span>{{scope.row.index}}</span>
      </template>
    </el-table-column>
     <el-table-column label="状态" width="120"  align="center">
      <template slot-scope="scope">
      <span>{{scope.row.status===1?'正常':'禁用'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop='updateTime' width="200" align="center">
    </el-table-column>
    <el-table-column label="创建时间" prop='createTime' width="200" align="center">
    </el-table-column>
    <el-table-column label="操作" width="160" align="center">
      <template slot-scope="scope">
        <div class="handle">
          <ul>
            <li><el-button type="primary" size='mini' @click="showDialog(scope.row,scope.$index)">预览</el-button><el-button type="primary" size='mini' @click="updateImageIndex(scope.row.id)">设置</el-button></li>
            <li><el-button type="primary" size='mini' @click="handleImage('disabled',scope.row)"  v-if="scope.row.status===1">禁用</el-button><el-button type="primary" size='mini' @click="handleImage('able',scope.row)"  v-else>解除</el-button><el-button type="primary" size='mini' @click="handleImage('delete',scope.row)">删除</el-button></li>
          </ul>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div  class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="sizes, prev, pager, next"
      :total="totalElements">
    </el-pagination>
  </div>

  <el-dialog
  title="预览"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
  <p class="show-img"><img :src="'http://'+activeItem.photoPath" alt=""></p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleImage('disabled',activeItem)"  v-if="activeItem.status===1">禁用</el-button><el-button type="primary" @click="handleImage('able',activeItem)"  v-else>解除</el-button><el-button type="primary" @click="handleImage('delete',activeItem)">删除</el-button>
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="showNext" :disabled="this.activeIndex==tableData.length-1">下一张</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      activeItem: {image: {url: ''}},
      activeIndex: null,
      tableData: [],
      status: '',
      size: 10,
      page: 1,
      selectList: [{
        value: '',
        label: '全部 '
      }, {
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '禁用'
      }],
      multipleSelection: [],
      totalElements: 0,
      total: 0
    }
  },
  mounted () {
    this.getDataTale()
    this.getTotal()
  },
  methods: {
    handleSizeChange (val) {
      this.page = 1
      this.size = val
      this.getDataTale()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getDataTale()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleClose () {
      this.dialogVisible = false
    },
    showDialog (row, index) {
      this.dialogVisible = true
      this.activeIndex = index
      this.activeItem = Object.assign({}, row)
    },
    showNext () {
      this.activeIndex += 1
      this.activeItem = Object.assign({}, this.tableData[this.activeIndex])
    },
    getTotal () {
      this.apiData('get', '/api/photo/number').then((resp) => {
        this.total = resp.data
      })
    },
    handleImage (handle, row, batch = false) {
      this.$confirm('此操作将更改当选择数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = batch ? row : [row.id]
        if (handle === 'disabled') {
          this.handlePutImage('/api/photo/disable', ids)
        } else if (handle === 'able') {
          this.handlePutImage('/api/photo/able', ids)
        } else {
          this.handlePutImage('/api/photo/dele', ids)
          this.dialogVisible = false
        }
      }).catch(() => {

      })
    },
    batchHandle (type) {
      if (type === 'disabled') {
        let target = this.multipleSelection.filter((item) => { return item.status === 1 })
        let ids = target.map((item) => { return item.id })
        if (ids.length === 0) {
          return this.$message.warning('请选择有效数据')
        }
        this.handleImage('disabled', ids, true)
      } else if (type === 'able') {
        let target = this.multipleSelection.filter((item) => { return item.status === 2 })
        let ids = target.map((item) => { return item.id })
        if (ids.length === 0) {
          return this.$message.warning('请选择有效数据')
        }
        this.handleImage('able', ids, true)
      } else {
        if (this.multipleSelection.length === 0) {
          return this.$message.warning('请选择数据')
        }
        let ids = this.multipleSelection.map((item) => { return item.id })
        this.handleImage('dele', ids, true)
      }
    },
    handlePutImage (url, ids) {
      this.apiData('put', url, {ids: ids}).then((resp) => {
        if (resp.status === 200) {
          this.getDataTale()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      })
    },
    updateImageIndex (id) {
      this.$prompt('请输入数字', '设置显示顺序', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        this.apiData('put', `/api/photo/updateIndex?id=${id}&index=${value}`, {}).then((resp) => {
          if (resp.status === 200) {
            this.getDataTale()
            this.$message.success('操作成功')
          }
        })
      }).catch(() => {

      })
    },
    getDataTale () {
      const _self = this
      _self.loading = true
      // let currentDate = new Date().getTime()
      // let overdueDate = new Date('2019-11-30').getTime()
      // if (currentDate > overdueDate) { alert('请联系管理员') }
      // console.log(currentDate, overdueDate)
      this.apiData('get', '/api/photo/findAll', {status: this.status, page: this.page - 1, size: this.size}).then((resp) => {
        this.tableData = resp.data.content
        this.totalElements = resp.data.totalElements
        setTimeout(() => {
          _self.loading = false
        }, 200)
        if (this.activeIndex != null) {
          this.activeItem = Object.assign({}, this.tableData[this.activeIndex])
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.main{
  padding: 10px;
}
.screen{
  margin-bottom: 10px;
}
.page{text-align: right;margin-top: 10px;}
ul{
  li{
    list-style: none;
    margin-bottom: 5px;
  }
}
.img{
  img{
    width: 100px;
  }
}
.show-img{
  text-align: center;
  height: 50vh;
  overflow: auto;
  img{
    max-width: 100%;
  }
}
</style>
