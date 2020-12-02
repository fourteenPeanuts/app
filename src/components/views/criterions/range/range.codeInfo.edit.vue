<template>
  <div class="hole_template">
    <div class="template_content">
      <div class="template_head">
        <div style="width: 100%;padding-top: 10px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/criterion/range/rangelist' }">值域</el-breadcrumb-item>
            <el-breadcrumb-item>编辑代码项</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <h4>{{range.name}}({{range.code}})</h4>

      </div>

      <div class="template_main">
        <el-row>
          <el-col :span="24">
            <div style="float:right;margin-right:10px;">
              <el-form :inline="true"
                       :model="codeInfo"
                       class="demo-form-inline">
                <el-form-item label="值">
                  <el-input size="mini"
                            v-model="codeInfo.value"
                            placeholder="值"></el-input>
                </el-form-item>
                <el-form-item label="含义">
                  <el-input size="mini"
                            v-model="codeInfo.maining"
                            placeholder="含义"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini"
                             type="primary"
                             @click="query()">查询</el-button>
                  <el-button size="mini"
                             type="primary"
                             @click="reset()">重置</el-button>
                  <el-button size="mini"
                             type="primary"
                             @click="addInfo()">新建</el-button>
                </el-form-item>
              </el-form>
            </div>

          </el-col>
          <el-col :span="24">
            <el-table :data="codeInfoList"
                      size="mini"
                      style="width:100%;font-size:14px"
                      class="data_table"
                      :height="tableHeight"
                      :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">

              <el-table-column prop="value"
                               :sortable="true"
                               :show-overflow-tooltip="true"
                               label="值">
              </el-table-column>
              <el-table-column prop="meaning"
                               :sortable="true"
                               :show-overflow-tooltip="true"
                               label="含义">
              </el-table-column>
              <el-table-column prop="parentCode"
                               :sortable="true"
                               label="父项代码">
              </el-table-column>
              <el-table-column prop="description"
                               :sortable="true"
                               :show-overflow-tooltip="true"
                               label="描述">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               label="操作"
                               width="100">
                <template slot-scope="scope">
                  <i class="el-icon-delete"
                     @click="deleteInfo(scope.row)"></i>
                </template>

              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

      </div>
      <div class="data_pagination">
        <div>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[5, 10, 20, 40]"
                         :page-size="pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="getTotal()">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-drawer :withHeader="true"
               size="40%"
               :show-close="false"
               :visible.sync="drawer"
               :before-close="handleClose"
               direction="rtl">

      <el-divider direction="vertical"></el-divider>
      <span>新建代码项</span>
      <el-divider></el-divider>

      <span style="margin-left:3px">
        <el-divider direction="vertical"></el-divider>
        基本信息
      </span>
      <el-divider></el-divider>

      <el-form size="mini"
               style="width:90%"
               :rules="rules"
               ref="newInfo"
               label-width="100px"
               :model="newInfo">
        <el-form-item label="值"
                      prop="value">
          <el-input v-model="newInfo.value"></el-input>
        </el-form-item>
        <el-form-item label="含义"
                      prop="meaning">
          <el-input v-model="newInfo.meaning"></el-input>
        </el-form-item>
        <el-form-item label="父项代码"
                      prop="parentCode">
          <el-input v-model="newInfo.parentCode"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input type="textarea"
                    v-model="newInfo.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini"
                     type="primary"
                     @click="saveInfo">保存</el-button>
          <el-button size="mini"
                     @click="close">取消</el-button>
        </el-form-item>
      </el-form>

    </el-drawer>

  </div>

</template>
<script>
import { uuid } from '@/utils/util'
export default {
  name: 'rangeEdit',
  data () {
    return {
      tableHeight: 0,
      drawer: false,
      pagesize: 10,
      currentPage: 1,
      codeInfoList: null,
      range: null,
      codeInfo: {
        value: '',
        maining: '',
      },
      newInfo: {
        value: '',
        meaning: '',
        parentCode: '',
        description: ''
      },
      rules: {}
    }
  },
  methods: {
    init () {

      this.tableHeight = window.innerHeight - (window.innerHeight * (17 / 100)) - 80 - 32 - 29;

    },

    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    getTotal () {
      return this.codeInfoList.length;
    },
    addInfo () {
      this.drawer = true;
    },
    saveInfo () {
      let data = {
        value: this.newInfo.value,
        meaning: this.newInfo.meaning,
        parentCode: this.newInfo.parentCode,
        description: this.newInfo.description
      }
      this.codeInfoList.push(data)
      this.reset()
      this.drawer = false

    },
    deleteInfo (info) {
      this.$confirm('此操作将永久删除该代码项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.codeInfoList.splice(this.codeInfoList.indexOf(info), 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    query () {

    },
    reset () {
      this.$refs['newInfo'].resetFields()
    },
    close () {
      this.clearNewIndo();
      this.drawer = false;
    },
    handleClose (done) {
      done()
      this.clearNewIndo();
    },
    clearNewIndo () {
      this.newInfo.value = '';
      this.newInfo.meaning = '';
      this.newInfo.parentCode = '';
      this.newInfo.description = '';

    }

  },
  beforeMount () {
    this.init()
    let requiredData = this.$route.params.requiredData;
    console.log(requiredData)
    requiredData = [[{ "value": 11, "meaning": "省编号", "parentCode": "", "description": "省编号" }, { "value": 22, "meaning": "地级市编号", "parentCode": "", "description": "地级市编号" }, { "value": 33, "meaning": "县级市编号", "parentCode": "", "description": "县级市编号" }, { "value": 44, "meaning": "车型编号", "parentCode": "", "description": "车型编号" }], { "code": "liencese_FORMAL_CHI_RULE", "name": "车牌号编码规则", "type": "规则", "isPosted": false, "standardRange": true, "enable": true, "source": "国家", "belong": "无", "description": "车牌号编码规则车牌号编码规则车牌号编码规则车牌号编码规则", "term": null }]
    this.codeInfoList = requiredData[0];
    this.range = requiredData[1];

    console.log(this.range)
  },
  mounted () {
    this.init()

  }
}
</script>

<style scoped>
.hole_template {
  width: 100%;

  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
}

.template_content {
  margin: 50px 50px 50px 50px;
  background-color: #f8f8f9;
}
.template_head {
  margin-left: 15px;
  margin-top: 10px;
}
.template_main {
  margin-left: 15px;
  margin-right: 15px;

  background-color: #ffffff;
  border-bottom: 1px solid #e8e0e0;
}
.data_pagination div {
  display: block;
  float: right;
}
.data_pagination {
  width: 97%;
  margin-top: 10px;
  margin-left: 15px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.drawer_head {
  margin: 20px 20px;
}
</style>
<style>
</style>
