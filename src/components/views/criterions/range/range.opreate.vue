<template>
  <div class="contioner"
       style="height:90%">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/criterion/range/rangelist' }">值域</el-breadcrumb-item>
        <el-breadcrumb-item>{{text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-tabs tab-position="left"
             style="height: 90%;;margin-top:10px;"
             v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first">
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

      <el-tab-pane :label="secondPaneLabel"
                   name="second">
        <secondpane :opreateFlag="opreateFlag"
                    :rangeCode="rangeForm.code"></secondpane>
      </el-tab-pane>

    </el-tabs>
    <div style="float:bottom">
      <el-row>
        <el-col :span="24"
                style="text-align: center;">
          <el-button size="mini"
                     type="primary"
                     @click="saveDataElement">保存</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 扩展属性 -->

  </div>
</template>
<script>
import { uuid } from '@/utils/util'
import secondpane from './range.opreatepane'
export default {
  name: 'rangeEdit',
  components: { secondpane },
  data () {
    return {
      secondPaneLabel: '',
      activeName: 'first',
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableHeight: 0,
      tableData: this.getTableList(null, null),
      isShowDialog: false,
      nomenclatureTags: [],
      currentExtend: null,
      extendChange: 'add',
      drawer: false,


      text: '编辑值域',
      type: '',//搜索类型

      opreateFlag: 0,
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

      dialogAdd: false,//添加
    }
  },

  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },

    dialogVisible () {
      this.isShowDialog = true;
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
    getTotal () {
      return this.tableData.length;
    },
    init () {
      this.tableHeight = window.innerHeight - (window.innerHeight * (40 / 100)) - 80;
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {

          done();
        })
        .catch(_ => { });
    },





  },
  beforeMount () {
    this.init()
    let requiredData = this.$route.query.requiredData;
    this.opreateFlag = requiredData[0]
    console.log(requiredData)
    if (this.opreateFlag > 2) {
      this.rangeForm = requiredData[1];
    }
    if (this.opreateFlag % 2 == 1) {
      this.secondPaneLabel = "扩展信息"
    } else {
      this.secondPaneLabel = "分段规则"
    }


  },
  mounted () {

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