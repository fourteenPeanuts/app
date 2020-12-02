<template>
  <div class="contioner">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/criterion/range/rangelist' }">值域</el-breadcrumb-item>
        <el-breadcrumb-item>{{text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-tabs tab-position="left"
             style="height: 500px;;margin-top:10px;">
      <el-tab-pane label="基本信息">
        <div>
          <h5>基本信息</h5>
        </div>
        <el-form size="mini"
                 style="width:90%"
                 :rules="rules"
                 ref="rangeForm"
                 label-width="100px"
                 :model="rangeForm">
          <el-form-item label="编码"
                        prop="code">
            <el-input v-model="rangeForm.code"></el-input>
          </el-form-item>
          <el-form-item label="名称"
                        prop="name">
            <el-input v-model="rangeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="标准来源"
                        prop="source">
            <el-input v-model="rangeForm.source"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        prop="description">
            <el-input v-model="rangeForm.description"></el-input>
          </el-form-item>
          <el-form-item label="标准值域"
                        prop="standardRange">
            <el-switch v-model="rangeForm.standardRange"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="业务术语"
                        prop="term">
            <div style="min-height: 28px;border-radius: 5%;border: 1px solid #dcdfe6;">
              <el-tag v-for="tag in nomenclatureTags"
                      :key="tag.key"
                      closable
                      :type="tag.type"
                      size="mini"
                      :disable-transitions="false"
                      @close="closeTag(tag)">
                {{tag.name}}
              </el-tag>
              <el-button slot="append"
                         icon="el-icon-more"
                         style="float:right;"
                         @click="dialogVisible"></el-button>
            </div>
          </el-form-item>
        </el-form>

        <el-dialog title="选择业务术语"
                   :visible.sync="isShowDialog"
                   width="60%"
                   :before-close="handleClose"
                   class="nomenclatureDialog"
                   :close-on-click-modal="false">
          <el-container style="overflow: hidden;height: 100%">
            <el-aside style="background-color: #FFFFFF;border-right: 1px solid rgb(214, 218, 216);">
              <div style="margin-top: 2%;margin-left: 3%;">
                <span style="line-height: 30px;">分类列表</span>
              </div>
              <div>
                <el-input size="mini"
                          placeholder="搜索"
                          @focus="getFocus"
                          @blur="loseFocus"
                          suffix-icon="el-icon-search"
                          style="width: 88%;margin-top: 4%;cursor: pointer;margin-left: 3%;"></el-input>
              </div>
              <div>
                <el-scrollbar style="height:100%;width: 100%;"
                              class="tree_scroll">
                  <el-tree :data="data"
                           ref="tree"
                           :current-node-key="0"
                           node-key="id"
                           :props="defaultProps"
                           @node-click="handleNodeClick"
                           class="data_tree"
                           style="margin-top: 2%;margin-left: 3%;"></el-tree>
                </el-scrollbar>
              </div>
            </el-aside>
            <el-main style="width: 100%;height: 100%;">
              <div>
                <div class="main_criteria">
                  <el-input placeholder="搜索"
                            @focus="getFocus"
                            @blur="loseFocus"
                            size="mini"
                            suffix-icon="el-icon-search"
                            style="cursor: pointer;"></el-input>
                </div>
                <div class="data_table"
                     style="margin-top:2%;">
                  <el-table :data="tableData"
                            :height="tableHeight"
                            class="data_table_style"
                            :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column label="名称"
                                     prop="name"
                                     sortable
                                     :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="描述"
                                     prop="describe"
                                     sortable
                                     :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作"
                                     width="100">
                      <template slot-scope="scope">
                        <a style="margin-left: 10px;cursor: pointer;color: #409eff"
                           @click="chooseNomenclature(scope.row)">选择</a>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="data_pagination">
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[5, 10, 20, 40]"
                               :page-size="pagesize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="getTotal()"
                               style="text-align: right;">
                </el-pagination>
              </div>
            </el-main>
          </el-container>
        </el-dialog>

      </el-tab-pane>
      <el-tab-pane label="扩展信息">
        <div>
          <h5>扩展信息</h5>
        </div>
        <el-row>
          <el-col :span="12">
            共{{extendData.length}}条数据
          </el-col>
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
                         @click="addMeta()">新建</el-button>

              <el-button size="mini"
                         @click="batchDel"
                         type="primary"
                         icon="el-icon-delete"
                         :disabled="deleteFlag">删除</el-button>
            </div>
          </el-col>

        </el-row>
        <el-table :data="extendData"
                  max-height="500px"
                  size="mini"
                  style="width:100%;margin-top:10px;font-size:14px"
                  :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>

          <el-table-column prop="ename"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="description"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="描述"
                           width="500px"
                           :span="12">
          </el-table-column>
          <el-table-column prop="type"
                           :sortable="true"
                           label="类型">
          </el-table-column>

          <el-table-column prop="emptyAllowed"
                           label="能否为空">
            <template slot-scope="scope">
              <span v-if="scope.row.emptyAllowed"><i class="el-icon-circle-check"></i></span>
              <span v-else><i class="el-icon-circle-close"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="default"
                           label="默认值">
          </el-table-column>

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
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24"
              style="text-align: center;">
        <el-button size="mini"
                   type="primary"
                   @click="saveDataElement">保存</el-button>
      </el-col>
    </el-row>
    <!-- 扩展属性 -->
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
               ref="extendForm"
               label-width="100px"
               :model="extendForm">
        <el-form-item label="名称"
                      prop="ename">
          <el-input v-model="extendForm.ename"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input type="textarea"
                    v-model="extendForm.description"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="type">
          <el-input v-model="extendForm.type"></el-input>
        </el-form-item>
        <el-form-item label="能否为空"
                      prop="emptyAllowed">
          <el-switch v-model="extendForm.emptyAllowed"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="默认值"
                      prop="default">
          <el-input v-model="extendForm.default"></el-input>
        </el-form-item>

        <el-form-item>

          <el-button type="primary"
                     size="mini"
                     @click="submitForm('extendForm')">提交</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="resetForm('extendForm')">重置</el-button>

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
      tableData: this.getTableList(null, null),
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableHeight: 0,
      isShowDialog: false,
      nomenclatureTags: [],
      currentExtend: null,
      extendChange: 'add',
      drawer: false,
      deleteFlag: true,
      addType: 'handle',
      text: '编辑值域',
      type: '',//搜索类型
      content: '',//搜索内容
      operateType: '',
      rangeForm: {
        code: '',            //编码
        name: '',            //名称
        type: '',            //类型
        isPosted: false,        //已发布
        standardRange: false,   //标准值域
        enable: false,          //启用
        source: '',          //来源
        belong: '',
        description: '',//描述
        term: null,//业务术语
      },
      data: [
        {
          label: '全部分类',
          disabled: true,
          children: [
            {
              label: '词汇表',
              children: [
                {
                  label: '卫生业务术语'
                },
                {
                  label: '公安业务术语'
                },
                {
                  label: '工商业务术语'
                }
              ]
            },
            {
              label: '建筑'
            }
          ]
        },
      ],

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      extendForm: {

        ename: '',            //名称
        description: '',//描述
        type: '',            //类型
        emptyAllowed: true,//能否为空
        default: '',          //默认值

      },
      rules: {
        code: [
          { required: true, message: '请输入编码' }
        ],
        name: [
          { required: true, message: '请输入名称' }
        ],
        ename: [
          { required: true, message: '请输入名称' }
        ],
        name: [
          { required: true, message: '请输入物理表名' }
        ],
        description: [
          { required: true, message: '请输入详细描述' }
        ],

      },
      selectData: [],
      extendData: [
        {
          ename: '属性名测试1',
          description: '描述测试1',
          type: '类型1',
          emptyAllowed: false,
          default: 'test1',

        },
        {
          ename: '属性名测试2',
          description: '描述测试2',
          type: '类型2',
          emptyAllowed: false,
          default: 'test2',

        },
        {
          ename: '属性名测试3',
          description: '描述测试3',
          type: '类型3',
          emptyAllowed: false,
          default: 'test3',

        },
        {
          ename: '属性名测试4',
          description: '描述测试4',
          type: '类型4',
          emptyAllowed: false,
          default: 'test4',

        },
        {
          ename: '属性名测试5',
          description: '描述测试5',
          type: '类型5',
          emptyAllowed: false,
          default: 'test5',

        },
        {
          ename: '属性名测试6',
          description: '描述测试6',
          type: '类型6',
          emptyAllowed: false,
          default: 'test6',

        },
        {
          ename: '属性名测试7',
          description: '描述测试7',
          type: '类型7',
          emptyAllowed: false,
          default: 'test7',

        },
      ],
      dialogAdd: false,//添加
    }
  },

  methods: {
    init () {
      this.tableHeight = window.innerHeight - (window.innerHeight * (40 / 100)) - 80;
    },
    handleSelectionChange (val) {
      this.deleteFlag = false;
      this.selectData = val

    },
    dialogVisible () {
      this.isShowDialog = true;
    },

    getTotal () {
      return this.tableData.length;
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
    },

    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

    getFocus (event) {
      event.currentTarget.placeholder = '';
    },

    loseFocus () {
      event.currentTarget.placeholder = "搜索";
    },

    handleNodeClick (data) {
      var tableDataList = [];
      if (data.$treeNodeId === 1) {
        tableDataList = this.getTableList(null, null);
      } else if (!data.children && data.$treeNodeId !== 1) {
        tableDataList = this.getChildrenTableList(data.label, null);
      } else if (data.label == "词汇表") {
        tableDataList = this.getTableList(null, null);
      } else {
        tableDataList = [];
      }
      this.tableData = tableDataList;
    },

    getTableList (name, type) {
      var tableData = [
        {
          name: '出院时症状与体征',
          describe: '患者出院时症状与体征的详细描述'
        },
        {
          name: '出院情况',
          describe: '对患者出院情况的详细描述'
        },
        {
          name: '曾用名',
          describe: '曾经在户籍管理部门正式登记注册、人事档案中正式记载的姓氏名称'
        },
        {
          name: '服务处所',
          describe: '服务的场所、单位名称'
        },
        {
          name: '公民身份号码',
          describe: '赋码机关为每个公民给出的唯一的、终身不变的法定标识号码'
        },
        {
          name: '兼营范围',
          describe: '企业主营范围之外经营的产品和服务项目。'
        },
        {
          name: '一般经营项目',
          describe: '企业在登记注册前不需经有关部门批准，依法直接向企事业登记机关申请登记的经营项目，一个企业可以有多个一般经营项目。'
        }
      ];
      return tableData;
    },

    getChildrenTableList (name, type) {
      var tableData = null;
      if (name == "卫生业务术语") {
        var tableData = [{
          name: '出院时症状与体征',
          describe: '患者出院时症状与体征的详细描述'
        },
        {
          name: '出院情况',
          describe: '对患者出院情况的详细描述'
        }];
      } else if (name == "公安业务术语") {
        var tableData = [{
          name: '曾用名',
          describe: '曾经在户籍管理部门正式登记注册、人事档案中正式记载的姓氏名称'
        },
        {
          name: '服务处所',
          describe: '服务的场所、单位名称'
        },
        {
          name: '公民身份号码',
          describe: '赋码机关为每个公民给出的唯一的、终身不变的法定标识号码'
        }];
      } else if (name == "工商业务术语") {
        var tableData = [{
          name: '兼营范围',
          describe: '企业主营范围之外经营的产品和服务项目。'
        },
        {
          name: '一般经营项目',
          describe: '企业在登记注册前不需经有关部门批准，依法直接向企事业登记机关申请登记的经营项目，一个企业可以有多个一般经营项目。'
        }];
      } else {
        tableData = []
      }
      return tableData;
    },

    chooseNomenclature (dataRow) {
      var obj = { name: dataRow.name, type: 'info', key: dataRow.name }
      this.nomenclatureTags.push(obj);
      this.isShowDialog = false;
    },

    saveDataElement () {
      this.$router.push({
        path: '/criterion/range/rangelist'
      });
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    },

    del (item) {//删除
      this.extendData.splice(this.extendData.indexOf(item), 1)

    },
    batchDel () {//批量删除
      if (this.selectData.length > 0) {
        for (const item of this.selectData) {
          this.del(item)
        }
        this.deleteFlag = true;
      } else {
        this.$message({
          message: '请选择一条记录.',
          type: 'warning'
        });
      }
    },
    handleSelectionChange (val) {
      this.deleteFlag = false;
      this.selectData = val

    },
    add (row) {//添加
      this.extendData.push(row)
    },
    addMeta () {
      this.extendChange = 'add';
      this.drawer = !this.drawer;
    },

    submitForm (formName) {
      if (this.extendChange == 'add') {
        console.log("extendData", this.extendForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              ename: this.extendForm.ename,
              description: this.extendForm.description,
              type: this.extendForm.type,
              emptyAllowed: this.extendForm.emptyAllowed,
              default: this.extendForm.default
            }
            this.extendData.push(data);
            this.resetForm(formName);
            this.drawer = false;
          } else {
            this.$message({
              message: '验证不通过.',
              type: 'warning'
            });
            return;
          }
        });
      }
      if (this.extendChange == 'edit') {
        this.currentExtend.ename = this.extendForm.ename;
        this.currentExtend.description = this.extendForm.description;
        this.currentExtend.type = this.extendForm.type;
        this.currentExtend.emptyAllowed = this.extendForm.emptyAllowed;
        this.currentExtend.default = this.extendForm.default;
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
      this.extendForm.ename = data.ename;
      this.extendForm.type = data.type;
      this.extendForm.description = data.description;
      this.extendForm.default = data.default;
      this.extendForm.emptyAllowed = data.emptyAllowed;
      this.drawer = true;
      this.extendChange = 'edit';

    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('extendForm')
          done();
        })
        .catch(_ => { });
    },



  },
  mounted () {
    debugger
    this.init();
    let requiredData = this.$route.query.requiredData;

    this.rangeForm = requiredData[0];
    this.operateType = requiredData[1].operateType;

    console.log(this.rangeForm);
    console.log(this.operateType);
  }
}
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
</style>