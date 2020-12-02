<template>
  <div class="contioner">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/connection/connectionlist' }">连接管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/connection/choose' }">连接类型</el-breadcrumb-item>
        <el-breadcrumb-item>编辑连接</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-form :model="form"
               size="mini"
               status-icon
               :rules="rules"
               ref="form"
               label-width="400px"
               class="demo-form">
        <el-divider content-position="left">基本信息</el-divider>
        <el-form-item label="名称"
                      prop="conntionName">
          <el-input v-model="form.conntionName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="describle">
          <el-input type="textarea"
                    v-model="form.describle"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-divider content-position="left">连接信息</el-divider>
        <el-form-item v-if="ftp"
                      label="主机地址"
                      prop="host">
          <el-input v-model="form.host"></el-input>
        </el-form-item>
        <el-form-item v-if="hbase"
                      label="地址"
                      prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item v-if="hbase || ftp"
                      label="端口"
                      prop="port">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item v-if="jdbc"
                      label="JDBC驱动"
                      prop="driver">
          <el-input v-model="form.driver"></el-input>
        </el-form-item>
        <el-form-item v-if="jdbc"
                      label="JDBC连接串"
                      prop="conntionStr">
          <el-input type="textarea"
                    v-model="form.conntionStr"></el-input>
        </el-form-item>
        <el-form-item v-if="jdbc || ftp"
                      label="用户名"
                      prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item v-if="jdbc || ftp"
                      label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="ftp"
                      label="编码"
                      prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item v-if="jdbc"
                      label="使用连接池"
                      prop="isPool">
          <el-switch v-model="form.isPool"></el-switch>
        </el-form-item>
        <el-form-item v-if="form.isPool"
                      label="连接池属性"
                      prop="attr">
          <el-row style="margin-bottom:10px;"
                  :gutter="10">
            <el-col :span="8">
              <div class="inline_block">最大连接数</div>
              <el-input style="width:50%"
                        v-model="form.maxConn"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="inline_block">最小连接数</div>
              <el-input style="width:50%"
                        v-model="form.minConn"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;"
                  :gutter="10">
            <el-col :span="8">
              <div class="inline_block">超时时间</div>
              <el-input style="width:50%"
                        v-model="form.timeout"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="inline_block">空闲时间</div>
              <el-input style="width:50%"
                        v-model="form.freeTime"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;"
                  :gutter="10">
            <el-col :span="8">
              <div class="inline_block">累增连接数</div>
              <el-input style="width:50%"
                        v-model="form.increaseConn"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="inline_block">连接检测时间</div>
              <el-input style="width:50%"
                        v-model="form.testTime"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('form')">提交</el-button>
          <el-button type="primary"
                     @click="testConn('form')">测试</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'connectionEdit',
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
        host: '',//主机地址
        port: '',//端口
        code: '',//编码
        address: '',//地址
      },
      rules: {
        conntionName: [
          { required: true, message: '请输入连接名称' }
        ],
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        address: [
          { required: true, message: '请输入地址' }
        ],
        host: [
          { required: true, message: '请输入主机地址' }
        ],
        port: [
          { required: true, message: '请输入端口' }
        ],
        driver: [
          { required: true, message: '请输入JDBC驱动' }
        ],
        conntionStr: [
          { required: true, message: '请输入JDBC连接串' }
        ],
      },
      hbase: false,
      ftp: false,
      jdbc: false,
    }
  },
  mounted () {
    debugger
    this.hbase = this.$route.query.type === 'hbase'
    this.ftp = this.$route.query.type === 'ftp'
    this.jdbc = this.$route.query.type === 'jdbc'
    if (this.$route.query && this.$route.query.form && this.$route.query.form.conntionName) {
      this.form = this.$route.query.form
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
      })
    },
    testConn (form) {

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
</style>