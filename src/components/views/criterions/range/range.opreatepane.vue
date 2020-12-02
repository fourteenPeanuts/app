<template>
  <div v-if="opreateFlag%2==1">
    <div>
      <h5>扩展信息</h5>
    </div>

    <div>
      <!-- 抽屉 -->
      <el-drawer :withHeader="false"
                 size="30%"
                 :show-close="false"
                 :visible.sync="drawer"
                 direction="rtl"
                 :before-close="handleClose">
        <div style="width:100;height:5%;margin-top:10px;margin-left:10px">
          <h3>新建扩展属性</h3>
        </div>
        <el-form size="mini"
                 style="width:90%"
                 :rules="rules"
                 ref="codeForm"
                 label-width="100px"
                 :model="codeForm">
          <el-form-item label="名称"
                        prop="ename">
            <el-input v-model="codeForm.ename"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        prop="description">
            <el-input type="textarea"
                      v-model="codeForm.description"></el-input>
          </el-form-item>
          <el-form-item label="类型"
                        prop="type">
            <el-input v-model="codeForm.type"></el-input>
          </el-form-item>
          <el-form-item label="能否为空"
                        prop="emptyAllowed">
            <el-switch v-model="codeForm.emptyAllowed"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="默认值"
                        prop="default">
            <el-input v-model="codeForm.default"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       @click="submitForm('codeForm')">提交</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="resetForm('codeForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>

    <el-row>
      <el-col :span="12">共{{codeList.length}}条数据</el-col>
      <el-col :span="12"
              style="text-align:right">
        <div style="width:100%">
          <el-input placeholder="请输入内容"
                    style="    width: 50%;"
                    size="mini"
                    v-model="content"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>

          <el-button size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="addCode()">新建</el-button>

          <el-button size="mini"
                     @click="batchDel"
                     type="primary"
                     icon="el-icon-delete"
                     :disabled="deleteFlag">删除</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="codeList"
              :height="tableHeight"
              size="mini"
              style="width:100%;margin-top:10px;font-size:14px"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>

      <el-table-column prop="ename"
                       :sortable="true"
                       :show-overflow-tooltip="true"
                       label="名称"
                       width="180"></el-table-column>
      <el-table-column prop="description"
                       :sortable="true"
                       :show-overflow-tooltip="true"
                       label="描述"
                       width="500px"
                       :span="12"></el-table-column>
      <el-table-column prop="type"
                       :sortable="true"
                       label="类型"></el-table-column>

      <el-table-column prop="emptyAllowed"
                       label="能否为空">
        <template slot-scope="scope">
          <span v-if="scope.row.emptyAllowed">
            <i class="el-icon-circle-check"></i>
          </span>
          <span v-else>
            <i class="el-icon-circle-close"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="default"
                       label="默认值"></el-table-column>

      <el-table-column label="操作"
                       width="130"
                       fixed="right"
                       align="center">
        <template slot-scope="scope">
          <div class="icon_data">
            <i class="el-icon-edit"
               @click="preparedEdit(scope.row)"></i>&nbsp;&nbsp;&nbsp;
            <i class="el-icon-delete"
               @click="del(scope.row)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="data_pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="getCodeTotal()"
                     style="text-align: right;">
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <!-- 抽屉 -->
    <div>
      <h5>分段规则</h5>
    </div>
    <el-row>
      <el-col :span="12">共{{ruleList.length}}条数据</el-col>
      <el-col :span="12"
              style="text-align:right">
        <div style="width:100%">
          <el-input placeholder="请输入内容"
                    style="    width: 50%;"
                    size="mini"
                    v-model="content"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>

          <el-button size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="addRule()">新建</el-button>

          <el-button size="mini"
                     @click="batchDel"
                     type="primary"
                     icon="el-icon-delete"
                     :disabled="deleteFlag">删除</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="ruleList"
              :height="tableHeight"
              size="mini"
              style="width:100%;margin-top:10px;font-size:14px"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>

      <el-table-column prop="index"
                       :sortable="true"
                       :show-overflow-tooltip="true"
                       label="序号"
                       width="180"></el-table-column>
      <el-table-column prop="name"
                       :sortable="true"
                       :show-overflow-tooltip="true"
                       label="代码段名称"
                       width="500px"
                       :span="12"></el-table-column>
      <el-table-column prop="type"
                       :sortable="true"
                       label="类型"></el-table-column>

      <el-table-column prop="description"
                       label="描述">

      </el-table-column>

      <el-table-column label="操作"
                       width="130"
                       fixed="right"
                       align="center">
        <template slot-scope="scope">
          <div class="icon_data">
            <i class="el-icon-edit"
               @click="preparedEditRuleForm(scope.row)"></i>&nbsp;&nbsp;&nbsp;
            <i class="el-icon-delete"
               @click="del(scope.row)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="data_pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="getRuleTotal()"
                     style="text-align: right;">
      </el-pagination>
    </div>

    <div>
      <el-drawer :withHeader="false"
                 size="30%"
                 :show-close="false"
                 :visible.sync="drawer"
                 direction="rtl"
                 :before-close="handleClose">
        <div style="width:100;height:5%;margin-top:10px;margin-left:10px">
          <h3>新建分段规则</h3>
        </div>
        <el-form size="mini"
                 style="width:90%"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 :model="ruleForm">
          <el-form-item label="序号"
                        prop="index">
            <el-input v-model="ruleForm.index"></el-input>
          </el-form-item>
          <el-form-item label="名称"
                        prop="name">
            <el-input type="textarea"
                      v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="长度">
            <el-col :span="11">
              <el-input v-model="ruleForm.minLength"
                        placeholder="最小长度"></el-input>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model="ruleForm.maxLength"
                        placeholder="最大长度"></el-input>
            </el-col>

          </el-form-item>

          <el-form-item label="类型"
                        prop="Type">
            <el-select v-model="ruleForm.type"
                       placeholder="请选择类型">
              <el-option label="数字"
                         value="Number"></el-option>
              <el-option label="字符"
                         value="Character"></el-option>
              <el-option label="日期"
                         value="Date"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>

  <!-- 抽屉 -->
</template>
<script>
export default {
  name: "opreatePane",
  props: {
    opreateFlag: {
      type: Number,
      default () {
        return 0;
      }
    },
    rangeCode: {
      type: String,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      tableHeight: 0,
      drawer: false,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      currentExtend: null,
      extendChange: 'add',
      content: "", //搜索内容
      deleteFlag: true,
      codeList: [
        {
          ename: "属性名测试1",
          description: "描述测试1",
          type: "类型1",
          emptyAllowed: false,
          default: "test1"
        },
        {
          ename: "属性名测试2",
          description: "描述测试2",
          type: "类型2",
          emptyAllowed: false,
          default: "test2"
        },
        {
          ename: "属性名测试3",
          description: "描述测试3",
          type: "类型3",
          emptyAllowed: false,
          default: "test3"
        },
        {
          ename: "属性名测试4",
          description: "描述测试4",
          type: "类型4",
          emptyAllowed: false,
          default: "test4"
        },
        {
          ename: "属性名测试5",
          description: "描述测试5",
          type: "类型5",
          emptyAllowed: false,
          default: "test5"
        },
        {
          ename: "属性名测试6",
          description: "描述测试6",
          type: "类型6",
          emptyAllowed: false,
          default: "test6"
        },
        {
          ename: "属性名测试7",
          description: "描述测试7",
          type: "类型7",
          emptyAllowed: false,
          default: "test7"
        }
      ],
      ruleList: [
        {
          index: 1,
          name: "firstrule",
          type: "Number",
          minLength: 2,
          maxLength: 11,
          description: "this is first rule",
          minValue: 11,
          maxValue: 8888888888888,
          exclude: 22
        },
        {
          index: 2,
          name: "secondrule",
          type: "Number",
          minLength: 2,
          maxLength: 11,
          description: "this is second rule",
          minValue: 11,
          maxValue: 8888888888888,
          exclude: 22
        }
      ],
      rules: {
        code: [{ required: true, message: "请输入编码" }],
        name: [{ required: true, message: "请输入名称" }],
        ename: [{ required: true, message: "请输入名称" }],

        description: [{ required: true, message: "请输入详细描述" }],
        index: [{ required: true, message: "请输入序号" }],
        type: [{ required: true, message: "请选择类型" }]
      },
      ruleForm: {
        index: "",
        name: "",
        type: "",
        minLength: "",
        maxLength: "",
        description: "",
        minValue: "",
        maxValue: "",
        exclude: ""
      },
      codeForm: {
        ename: "", //名称
        description: "", //描述
        type: "", //类型
        emptyAllowed: true, //能否为空
        default: "" //默认值
      }
    };
  },
  beforeMount () {
    this.init()
    switch (this.opreateFlag) {
      case 1:
        this.codeList = [];
        break;
      case 2:
        this.ruleList = [];
        break;
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.tableHeight = window.innerHeight - (window.innerHeight * (40 / 100)) - 100;
    },
    handleSelectionChange (val) {
      this.deleteFlag = false;
      this.selectData = val;
    },

    del (item) {
      //删除
      if (this.opreateFlag % 2 == 1) {
        this.codeList.splice(this.codeList.indexOf(item), 1);
      } else {
        this.ruleList.splice(this.codeList.indexOf(item), 1);
      }
    },
    batchDel () {
      //批量删除
      if (this.selectData.length > 0) {
        for (const item of this.selectData) {
          this.del(item);
        }
        this.deleteFlag = true;
      } else {
        this.$message({
          message: "请选择一条记录.",
          type: "warning"
        });
      }
    },
    add (row) {
      //添加
      this.codeList.push(row);
    },
    addCode () {
      this.extendChange = "add";
      this.drawer = !this.drawer;
    },
    addRule () {
      this.extendChange = "add";
      this.drawer = !this.drawer;
    },

    submitForm (formName) {
      if (this.extendChange == "add") {
        console.log("codeList", this.codeForm);
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (formName == 'codeForm') {
              const data = {
                ename: this.codeForm.ename,
                description: this.codeForm.description,
                type: this.codeForm.type,
                emptyAllowed: this.codeForm.emptyAllowed,
                default: this.codeForm.default
              };
              this.codeList.push(data);
            } else {
              const data = {
                index: this.ruleForm.index,
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                minLength: this.ruleForm.minLength,
                maxLength: this.ruleForm.maxLength,
                description: this.ruleForm.description,
              }
              this.ruleList.push(data);
            }

            this.resetForm(formName);
            this.drawer = false;
          } else {
            this.$message({
              message: "验证不通过.",
              type: "warning"
            });
            return;
          }
        });
      } else {
        if (formName == 'codeForm') {
          const data = {
            ename: this.codeForm.ename,
            description: this.codeForm.description,
            type: this.codeForm.type,
            emptyAllowed: this.codeForm.emptyAllowed,
            default: this.codeForm.default
          };
          this.codeList.splice(this.codeList.indexOf(this.currentExtend), 1, data)



        } else {
          const data = {
            index: this.ruleForm.index,
            name: this.ruleForm.name,
            type: this.ruleForm.type,
            minLength: this.ruleForm.minLength,
            maxLength: this.ruleForm.maxLength,
            description: this.ruleForm.description,
          }

          this.ruleList.splice(this.ruleList.indexOf(this.currentExtend), 1, data)
        }
        this.resetForm(formName);
        this.drawer = false;
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    preparedEdit (data) {
      console.log(data);
      this.currentExtend = data;
      this.codeForm.ename = data.ename;
      this.codeForm.type = data.type;
      this.codeForm.description = data.description;
      this.codeForm.default = data.default;
      this.codeForm.emptyAllowed = data.emptyAllowed;
      this.drawer = true;
      this.extendChange = "edit";
    },
    preparedEditRuleForm (data) {
      console.log(data);
      this.currentExtend = data;
      this.ruleForm.index = data.index;
      this.ruleForm.type = data.type;
      this.ruleForm.description = data.description;

      this.ruleForm.minLength = data.minLength;
      this.ruleForm.maxLength = data.maxLength;
      this.ruleForm.name = data.name;
      this.ruleForm.type = data.type;
      this.drawer = true;
      this.extendChange = "edit";
    },

    handleClose (done) {



      done();

    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    getCodeTotal () {
      return this.codeList.length;
    },
    getRuleTotal () {
      return this.ruleList.length;
    },
  }
};
</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css"></style>
<style scoped>
.contioner {
  background: #ffffff;
  padding: 30px;
}
</style>
<style>
.data_tree .el-tree-node__content:hover {
  background-color: #e7e7e7 !important;
}
.search-input-left .el-input__icon:hover {
  color: #202020;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 0px;
  border: 0;
}
*::-webkit-scrollbar-button {
  display: none;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: rgb(197, 196, 196);
}
*::-webkit-scrollbar-corner {
  background: transparent;
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
</style>