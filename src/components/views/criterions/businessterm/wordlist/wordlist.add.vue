<template>
  <div class="contioner">
  
    <el-form :model="form"
               size="mini"
               status-icon
               :rules="rules"
               ref="form"
               label-width="400px"
               class="demo-form">
               
       <el-card id="input">  
       <div id="nouse"></div>
        <el-form-item label="名称"
                      prop="conntionName">
          <el-input v-model="form.conntionName"
                    autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="describle">
          <el-input type="textarea"
                    v-model="form.describle"
                    autocomplete="off" placeholder="请输入描述"></el-input>
        </el-form-item>   
             <el-form-item>
          <el-button type="primary"
                     @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
          </el-card>
      </el-form>
  
  </div>
</template>
<script>
export default {
  name: 'wordlistadd',
  data () {
    return {
      form: {
        conntionName: '',//连接名称
        describle: '',//连接描述
        driver: '',//驱动
        conntionStr: '',//连接字符串
        username: '',//用户名
        password: '',//密码
        isPool: false,//是否使用连接池
        maxConn: null,//最大连接数
        minConn: null,//最小连接数
        timeout: null,//超时时间
        freeTime: null,//空闲时间
        testTime: null,//测试时间
        increaseConn: null,//累增连接数
        
      },
      rules: {
        conntionName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
           
          ]
      }
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (form) {
      this.$refs[form].resetFields();
    }
  }
}

</script>
<style scoped>
.contioner {
  background: #ffffff;
  padding: 30px;
}
.inline_block {
  width: 100px;
  text-align: right;
  display: inline-block;
}
#input{
 height: 700px;

}
#nouse{
 height: 50px;

}
</style>