<template>
  <div>
    <!-- 添加用户按钮 -->
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>

    <el-table stripe border :data="userList" style="width: 100%">
    <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="position" label="职位" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column  label="创建时间"> 
        <template v-slot:default="scope">
          {{scope.row.addtime | formatDate}}
          
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <div>
            <a href="#">详情</a>&nbsp;
            <a href="#">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('api/users')
      if (res.status !== 0) return
      this.userList = res.data
      console.log(this.userList)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
 margin-top: 20px;
}
</style>
