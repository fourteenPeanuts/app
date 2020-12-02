<template>
  <el-container class="connect_data">
    <el-aside width="18%">
      <div class="categories_div">
        <span class="categories_span">分类列表</span>
      </div>
      <div>
        <el-input class="search-input-left"
                  size="mini"
                  placeholder="搜索"
                  @focus="getFocus"
                  @blur="loseFocusLeftTree"
                  suffix-icon="el-icon-search"
                  v-model="input"></el-input>
      </div>
      <div class="left_data_tree">
        <el-scrollbar style="height:100%;width: 100%;"
                      class="tree_scroll">
          <el-tree :data="data"
                   ref="tree"
                   :current-node-key="0"
                   :expand-on-click-node="false"
                   node-key="id"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   class="data_tree"
                   :render-content="renderContent"></el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>
      <el-row>
        <el-col>
          <el-breadcrumb separator="/"
                         class="breadcrumb_tree"
                         style="width: 97%;">
            <el-breadcrumb-item>数据标准</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <div style="background-color: #FFFFFF;">
        <div class="main_criteria">
          <el-row v-if="isCriteria">
            <el-form ref="criteriaForm"
                     :model="criteriaForm">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="19%"
                                label="编码">
                    <el-input size="mini"
                              v-model="criteriaForm.elementCode"
                              placeholder="请输入编码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="名称"
                                label-width="19%">
                    <el-input size="mini"
                              v-model="criteriaForm.elementName"
                              placeholder="请输入中文名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="描述"
                                label-width="19%">
                    <el-input size="mini"
                              v-model="criteriaForm.fieldName"
                              placeholder="请输入字段名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item>
                    <el-col class="line"
                            :span="2"
                            style="text-align:center">更新时间</el-col>
                    <el-col :span="8">
                      <el-date-picker type="date"
                                      placeholder="选择日期"
                                      style="width: 100%;"
                                      v-model="criteriaForm.starttime"
                                      size="mini"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="2"
                            style="text-align:center">至</el-col>
                    <el-col :span="8">
                      <el-date-picker type="date"
                                      placeholder="选择日期"
                                      style="width: 100%;"
                                      v-model="criteriaForm.endtime"
                                      size="mini"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item style="text-align: right;">
                    <el-button type="primary"
                               size="mini">查询</el-button>
                    <el-button size="mini"
                               @click="resettingCriteria">重置</el-button>
                    <a style="margin-left: 10px;cursor: pointer;"
                       @click="packUpCriteria">收起</a>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <el-row style="margin-top: 1%;">
            <el-col :span="6">
              <el-button type="primary"
                         size="mini"
                         @click="addStandardData">新建</el-button>
              <el-upload class="upload-demo"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="3"
                         :on-exceed="handleExceed"
                         :file-list="fileList"
                         style="display: inline-block;">
                <el-button type="primary"
                           size="mini">导入</el-button>
              </el-upload>
              <el-button type="primary"
                         size="mini"
                         @click="download">下载模板</el-button>
            </el-col>
            <el-col :span="18"
                    style="text-align:right;">
              <el-button type="primary"
                         style="display:inline-block"
                         size="mini"
                         @click="advancedCriteria">高级检索</el-button>
              <div style="display:inline-block">
                <el-input class="input-with-select"
                          :disabled="isNotDisplayInput"
                          size="mini"
                          :placeholder="placeholderNameOrCode"
                          @focus="getFocus"
                          @blur="loseFocus"
                          v-model="input3"
                          suffix-icon="el-icon-search"
                          style="cursor: pointer;">
                  <el-select class="selectNameOrCode"
                             :disabled="isNotDisplayInput"
                             v-model="select"
                             slot="prepend"
                             placeholder="名称"
                             size="mini"
                             @change="selectChange"
                             style="width:100px;">
                    <el-option v-for="item in searchCriteriaItems"
                               :key="item.searchCriteriaValue"
                               :label="item.searchCriteriaLabel"
                               :value="item.searchCriteriaValue"></el-option>
                  </el-select>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="right_main">
          <div class="data_table">
            <el-table :data="tableData"
                      v-if="isShowCard"
                      :height="tableHeight"
                      class="data_table_style"
                      :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="编码"
                               prop="code"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="名称"
                               prop="name"
                               :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <el-link type="primary"
                           @click="diaplayDrawer(scope.row)">{{scope.row.name}}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="已发布"
                               prop="isPosted"
                               sortable
                               :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <i v-if="scope.row.isPosted==='true'"
                     class="el-icon-circle-check"></i>
                  <i v-if="scope.row.isPosted==='false'"
                     class="el-icon-circle-close"></i>
                </template>
              </el-table-column>
              <el-table-column label="描述"
                               prop="description"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作"
                               width="200">
                <template slot-scope="scope">
                  <div class="icon_data">
                    <el-tooltip content="编辑数据标准"
                                placement="bottom"
                                effect="light">
                      <i class="el-icon-edit"
                         @click="editDataStandard(scope.row)"></i>
                    </el-tooltip>
                    <el-tooltip content="管理标准项"
                                placement="bottom"
                                effect="light">
                      <i class="el-icon-s-management"
                         style="margin-left: 20px;"
                         @click="manager"></i>
                    </el-tooltip>
                    <el-tooltip content="删除数据标准" placement="bottom" effect="light" v-if="scope.row.isPosted == 'false'">
                      <i class="el-icon-delete" style="margin-left: 20px;" @click="deleteDataStandard(scope.row)"></i>
                    </el-tooltip>
                    <el-tooltip content="发布"
                                v-if="scope.row.isPosted==='false'"
                                placement="bottom"
                                effect="light">
                      <i class="el-icon-s-release"
                         style="margin-left: 20px;"
                         @click="publish(scope.row)"></i>
                    </el-tooltip>
                    <el-tooltip content="取消发布"
                                v-if="scope.row.isPosted === 'true'"
                                placement="bottom"
                                effect="light">
                      <i class="el-icon-remove-outline"
                         style="margin-left: 20px;"
                         @click="canclePublish(scope.row)"></i>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
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
    </el-main>
    <el-dialog id="nodeDialog"
               :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal="false">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
                    v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="saveNode()">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="isShowDialog"
               style="overflow: auto;"
               width="60%"
               :title="standardDialogTitle"
               class="dialogViewClass"
               :modal="false">
      <modeladdstandardview @cancelFun="cancelFun"
                            :standardForm="standardForm"
                            @updateData="updateData"></modeladdstandardview>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer :withHeader="false"
               size="40%"
               :show-close="false"
               :visible.sync="isdrawer"
               direction="rtl">
      <modelstandarddrawer :rowData="rowData"
                           :standrardTableData="standrardTableData"
                           :isdrawer="isdrawer"
                           @cancelFun="cancelFun"
                           @isNotDisplayDrawer="isNotDisplayDrawer"></modelstandarddrawer>
    </el-drawer>
  </el-container>
</template>

<script>
import modeladdstandardview from './add.standard.data'
import modelstandarddrawer from './standard.drawer.view'
export default {
  name: 'standarddatalist',
  components: { modeladdstandardview, modelstandarddrawer },
  data () {
    return {
      input: '',
      input3: '',
      select: '',
      isShowDialog: false,
      standardForm: {},
      fileList: [],
      dialogTitle: '',//弹出框名称，新增节点，编辑节点等
      standardDialogTitle: '',//弹出框的名称，新建标准，编辑标准等
      isShowCard: false,
      tableHeight: 0,//table的height值，需要通过初始化时计算取值
      isdrawer: false,//是否展示抽屉
      rowData: null,//存放当前行信息，用于抽屉传值
      standrardTableData: [],//存放抽屉里table的值
      isNotDisplayInput: false,//高级检索时input框是否可操作
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableData: this.getTableList(null, null),//页面table信息
      tableRowObject: {},//用于存储当前行信息
      placeholderNameOrCode: '请输入名称进行检索',
      criteriaForm: { //高级检索里的v-model值
        elementCode: '',//编码
        elementName: '',//中文名称
        fieldName: '',//字段名称
        dataType: '',//数据类型
        range: '',//值域
        starttime: '',//开始时间
        endtime: '',//结束时间
      },
      data: [{  //左边导航树信息
        id: 1,
        label: '全部分类',
        code: '',
        description: '这是一些描述',
        children: [
          {
            label: '工商',
            code: '',
            description: '这是一些描述'
          },
          {
            label: '质检',
            code: '',
            description: '这是一些描述'
          },
          {
            label: '医疗',
            code: '',
            description: '这是一些描述',
            children: [{
              label: '医疗',
              code: '',
              description: '这是一些描述'
            }]
          },
          {
            label: '其他',
            code: '',
            description: '这是一些描述'
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: { //新增、编辑节点时弹出框里的v-model信息
        code: '',
        name: '',
        description: ''
      },
      dialogVisible: false,//是否弹出新增，编辑节点的弹出框
      currentNode: null,
      currentData: null,
      treeChange: '',//添加或修改树节点识别参数
      searchCriteriaItems: [ //下拉框，根据名称或编码进行查询
        {
          searchCriteriaLabel: '名称',
          searchCriteriaValue: '0'
        },
        {
          searchCriteriaLabel: '编码',
          searchCriteriaValue: '1'
        }
      ],
      searchCriteriaValue: '名称',
      isCriteria: false,//是否展示高级检索信息
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    /*初始化方法*/
    init () {
      this.tableHeight = window.innerHeight - (window.innerHeight * (11 / 100)) - 152;
      this.isShowCard = true;
    },

    /*点击数节点触发此函数*/
    handleNodeClick (data, node) {
      this.currentNode = node
      this.currentData = data
      var tableDataList = [];
      if (data.label === "全部分类") {
        tableDataList = this.getTableList('', '');
      } else {
        tableDataList = this.getChildrenTableList(data.label, null);
      }
      this.tableData = tableDataList;
    },

    /*重置*/
    resettingCriteria () {
      this.criteriaForm.elementCode = "";
      this.criteriaForm.elementName = "";
      this.criteriaForm.fieldName = "";
      this.criteriaForm.starttime = "";
      this.criteriaForm.endtime = "";
    },

    /*进入页面时、单机全部分类时获取数据的方法*/
    getTableList (name, type) {
      var tableData = [
        {
          code: 'REQ.C0101.0502.0101',            //编码
          name: '门(急)诊处方记录',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        },
        {
          code: 'REQ.C0105.0599.02',            //编码
          name: '病历概要-基本健康信息',            //名称
          isPosted: 'false',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        },
        {
          code: 'REQ.C0101.0302.02',            //编码
          name: '门(急)诊病历记录',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: '投资主体库'//资源目录
        },
        {
          code: 'REQ.C0101.0301.01',            //编码
          name: '急诊留观病历',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        },
        {
          code: 'REQ.C0101.0502.01',            //编码
          name: '门(急)诊处方记录（主表）',            //名称
          isPosted: 'false',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: '基础'//资源目录
        }
      ];
      return tableData;
    },

    /*点击tree具体子节点触发此方法查询具体子节点下的数据*/
    getChildrenTableList (name, type) {
      var tableData = null;
      if (name == "工商") {
        var tableData = [{
          code: 'REQ.C0101.0502.0101',            //编码
          name: '门(急)诊处方记录',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        }];
      } else if (name == "质检") {
        var tableData = [{
          code: 'REQ.C0105.0599.02',            //编码
          name: '病历概要-基本健康信息',            //名称
          isPosted: 'false',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        },
        {
          code: 'REQ.C0101.0302.02',            //编码
          name: '门(急)诊病历记录',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: '投资主体库'//资源目录
        }];
      }
      else if (name == "其他") {
        var tableData = [{
          code: 'REQ.C0101.0301.01',            //编码
          name: '急诊留观病历',            //名称
          isPosted: 'true',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: ''//资源目录
        },
        {
          code: 'REQ.C0101.0502.01',            //编码
          name: '门(急)诊处方记录（主表）',            //名称
          isPosted: 'false',        //已发布
          description: "本文档只描述详细的业务标准，对整体交换标准规约要求参见【公共篇】。",//描述
          resourceContents: '基础'//资源目录
        }];
      } else {
        tableData = [];
      }
      return tableData;
    },

    /*分页信息里获取总条数*/
    getTotal () {
      return this.tableData.length;
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
    },

    /*当前页改变触发事件*/
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

    /*高级检索*/
    advancedCriteria () {
      this.isCriteria = true;
      this.isNotDisplayInput = true;
      this.tableHeight = window.innerHeight - (window.innerHeight * (11 / 100)) - 276;
    },

    /*收起*/
    packUpCriteria () {
      this.isCriteria = false;
      this.isNotDisplayInput = false;
      this.tableHeight = window.innerHeight - (window.innerHeight * (11 / 100)) - 152;
    },

    /*右边导航框里的input和右边的input的获取焦点触发事件*/
    getFocus (event) {
      event.currentTarget.placeholder = '';
    },

    /*右边查询框失去焦点触发事件*/
    loseFocus (event) {
      event.currentTarget.placeholder = this.placeholderNameOrCode;
    },

    /*左边导航树查询框失去焦点触发事件*/
    loseFocusLeftTree () {
      event.currentTarget.placeholder = "搜索";
    },

    /*查询条件select值改变的时候触发的事件@change*/
    selectChange (event) {
      if (event == 0) {
        this.placeholderNameOrCode = '请输入名称进行检索';
      } else {
        this.placeholderNameOrCode = '请输入编码进行检索';
      }
    },

    /*往树的后面追加一些图标*/
    renderContent (h, { node, data, store }) {
      if (node.data.label === "全部分类") {
        return (
          <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <div>
              <span>{node.label}</span>
            </div>
            <div>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.addNode(node, data)}><i class="el-icon-plus"></i></span>
            </div>
          </div>
        );
      } else {
        return (
          <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <div>
              <span>{node.label}</span>
            </div>
            <div>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.addNode(node, data)}><i class="el-icon-plus"></i></span>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.editNode(node, data)}><i class="el-icon-edit"></i></span>
              <span style="font-size: 16px;margin-left:5px" on-click={() => this.deleteNode(node, data)}><i class="el-icon-delete" ></i></span>
            </div>
          </div>
        );
      }
    },

    /*获取DialogTitle名称*/
    getDialogTitle () {
      var nodeDialogTitle = document.getElementById('nodeDialog');
      if (this.treeChange === 'addNode') {
        this.dialogTitle = "添加节点";
      } else if (this.treeChange === 'editNode') {
        this.dialogTitle = "修改节点";
      }
    },

    /*新增树节点*/
    addNode (node, data) {
      this.treeChange = 'addNode';
      this.getDialogTitle();
      this.clearDialog();
      this.currentData = data;
      this.dialogVisible = true;
    },

    /*编辑树节点*/
    editNode (nodeData) {
      this.treeChange = 'editNode';
      this.getDialogTitle();
      this.form.code = nodeData.data.code;
      this.form.name = nodeData.data.label;
      this.form.description = nodeData.data.description;
      this.currentData = nodeData;
      this.dialogVisible = true;
    },

    /*保存树节点*/
    saveNode () {
      if (this.treeChange === 'addNode') {
        var newChild = { code: this.form.code, label: this.form.name, description: this.form.description, children: [] };
        if (!this.currentData.children) {
          this.$set(this.currentData, 'children', []);
        }
        this.currentData.children.push(newChild);
      } else if (this.treeChange === 'editNode') {
        this.currentData.code = this.form.code;
        this.currentData.label = this.form.name;
        this.currentData.description = this.form.description;
      }
      this.clearDialog();
    },

    /*针对树节点操作完成后需要清空form表单和关掉弹框*/
    clearDialog () {
      this.form.code = '';
      this.form.name = '';
      this.form.description = '';
      this.dialogVisible = false;
    },

    /*删除树节点*/
    deleteNode (node, data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs['tree'].remove(node);
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

    /*点击名称连接，出现抽屉*/
    diaplayDrawer (row, column, cell, event) {
      debugger
      this.isdrawer = true;
      this.rowData = row;
      this.standrardTableData = [
        {
          fieldName: 'DE02_01_026_01',
          dataName: '年龄(岁)',
          dataType: 'N',
        },
        {
          fieldName: 'DE01_00_026_01',
          dataName: '病床号',
          dataType: 'C(10)',
        },
        {
          fieldName: 'ORGANIZATION_NAME',
          dataName: '组织机构名称',
          dataType: 'C(70)',
        }
      ];
    },

    /*关闭抽屉和弹框的事件*/
    cancelFun () {
      debugger
      this.isShowDialog = false;
      this.isdrawer = false;
    },

    /*新建标准*/
    addStandardData (item) {
      this.standardDialogTitle = "新建标准";
      this.isShowDialog = true;
      this.standardForm = {
        resourceContents: '',
        code: '',//编码
        name: '',//名称
        description: '',//描述
        isPosted: false,
        type: 'add'
      };
    },

    /*编辑标准*/
    editDataStandard (dataRow) {
      debugger
      this.standardDialogTitle = "编辑标准";
      this.isShowDialog = true;
      this.tableRowObject = dataRow;
      this.standardForm = {
        resourceContents: dataRow.resourceContents,
        code: dataRow.code,//编码
        name: dataRow.name,//名称
        description: dataRow.description,//描述
        isPosted: false,
        type: 'edit'
      };
    },

    /*取消发布*/
    canclePublish (dataRow) {
      debugger
      this.$confirm('确定取消发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dataRow.isPosted = 'false';
        this.$message({
          type: 'success',
          message: '取消发布成功!'
        });
      }).catch(() => { });
    },

    /*发布*/
    publish (dataRow) {
      this.standardDialogTitle = "发布" + dataRow.name;
      this.isShowDialog = true;
      this.tableRowObject = dataRow;
      this.standardForm = {
        resourceContents: '',
        code: dataRow.code,//编码
        name: dataRow.name,//名称
        description: dataRow.description,//描述
        isPosted: 'true',
        type: 'publish'
      };
    },

    /*新建、编辑、发布标准标准后需要调用此方法更新数据*/
    updateData (dataRow) {
      debugger
      if (dataRow.type === 'publish') {
        this.tableRowObject.isPosted = 'true';
      }
      if (dataRow.type === 'add') {
        dataRow.isPosted = 'false';
        this.tableData.push(dataRow);
      }
      this.tableRowObject.resourceContents = dataRow.resourceContents;
      this.tableRowObject.code = dataRow.code;
      this.tableRowObject.name = dataRow.name;
      this.tableRowObject.description = dataRow.description;

    },

    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    download () {

    },

    /*关闭抽屉的一个事件*/
    isNotDisplayDrawer (isDisplay) {
      this.isdrawer = isDisplay;
    },

    /*管理标准项*/
    manager () {
      this.$router.push({
        path: '/criterion/standard/manager',
        query: null
      })
    },

    deleteDataStandard(dataRow){
        this.tableData.splice(this.tableData.indexOf(dataRow), 1);
    },

  }
}
</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css">
</style>
<style>
.data_tree .el-tree-node__content:hover {
  background-color: #e7e7e7 !important;
}
.dialogViewClass .el-dialog__body {
  padding: 0 20px;
}
.dialogViewClass .el-dialog__header {
  padding-top: 20px;
  padding-left: 20px;
  background-color: #f8f8f9;
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