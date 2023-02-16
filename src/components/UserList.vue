<template>
  <div>
    <!-- 添加用户按钮 -->
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>

    <!-- 添加用户对话框 -->
    <el-dialog
  title="添加新用户"
  :visible.sync="dialogVisible"
  width="50%" @close="onDialogClosed">
  <!-- 添加用户表单 -->
  <el-form :model="form" :rules="rules" label-width="80px" ref="myAddForm">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="form.age"></el-input>
  </el-form-item>
  <el-form-item label="职位" prop="position">
    <el-select v-model="form.position" placeholder="请选择职位">
      <el-option label="丞相" value="丞相"></el-option>
      <el-option label="始皇帝" value="始皇帝"></el-option>
      <el-option label="商人" value="商人"></el-option>
    </el-select>
  </el-form-item>
  
  
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onAddNewUser">确 定</el-button>
  </span>
</el-dialog>

<!-- 用户表格 -->

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
        <template v-slot="{row}">
          <div>
            <router-link :to="'/users/'+row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  // 自定义年龄校验函数

  data() {
     let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 1 || value > 100) {
              callback(new Error('年龄必须1-100'));
            } else {
              // 这是验证成功
              callback();
            }
          }
        }, 1000);
      };
    return {
      userList: [],
      dialogVisible:false,
      form:{
        name:'',
        age:'',
        position:''
      },
      rules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            {validator:checkAge,trigger:'blur'}
          ],
          position: [
            {  required: true, message: '请至少选择一个职位', trigger: 'change' }
          ],
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('api/users/')
      if (res.status !== 0) return
      this.userList = res.data
     
    },
    onDialogClosed() {
      this.$refs.myAddForm.resetFields()
    },
    onAddNewUser() {
      this.$refs.myAddForm.validate(async valid => {
        if(!valid) return
       const {data:res} = await this.$http.post('/api/users',this.form)
       if(res.status !== 0) {
        
        this.$message.error('添加用户失败')
        return 
      }
       
       this.$message.success('添加用户成功')
       this.dialogVisible = false
       this.getUserList()
      })
    },
    async onRemove( id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err) => err);
        if(confirmResult !== 'confirm') return this.$message.info('取消了删除')
        const {data:res} = await this.$http.delete('api/users/'+id)
        if(res.status !== 0) return this.$message.info('删除失败')
        this.$message.success('删除成功')
        this.getUserList()
      }

    }
  }

</script>

<style lang="less" scoped>
.el-table {
 margin-top: 20px;
}
</style>
