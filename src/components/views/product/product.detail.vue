<template>
  <el-container style="width: 100%;height: 500px;background-color: #f8f8f9;">
    <div style="background-color: #ffffff;width: 100%;height: 100%;">
        <el-form :model="form"
                 size="mini"
                 status-icon
                 ref="form"
                 label-width="150px"
                 class="demo-form"
                 style=" padding-top: 20px;">
          <el-row>
            <el-col :span="20"
                    :offset="2">
              <el-form-item label="名称"
                            prop="name">
                <el-input v-model='form.name'
                         disabled ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :offset="2">
              <el-form-item label="产地"
                            prop="location">
                <el-input v-model='form.location'
                        disabled  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :offset="2">
              <el-form-item label="描述"
                            prop="describe">
                <el-input v-model='form.describe'
                          type="textarea"
                          disabled
                          :autosize="{ minRows: 6}"
                          ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" size="mini" @click="reback" style="margin-left:600px">返回</el-button>
          </el-row>
        </el-form>

    </div>
  </el-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'metaadd',
  data () {
    return {
      isShowDialog: false,
      
      form: {
        name:'',
        location:'',
        describe: '',//描述
      
      },
    }
  },
  mounted () {
    this.getProduct();
  },
  methods: {
      getProduct(){
        axios({
          method: 'get',
          url: '/findByName',
          baseURL: process.env.API,
          params:{
            name:this.$route.query.name
          }
        })
         .then( response=> {
            this.form.name=response.data.name;
            this.form.location=response.data.name;
            this.form.describe=response.data.description;
          });
      },
          
    cancelFun (item) {
      this.$emit('close')
    },
    reback(){
         this.$router.push({
         path: '/product',
      })      
    },
    dialogVisible () {
      this.isShowDialog = true;
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    saveDataElement () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const row = {}
          Object.assign(row, this.form);
          this.$emit('save', row)
          this.$refs['form'].resetFields();
          this.$emit('close')
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },

  }
}
</script>
<style scoped>
</style>