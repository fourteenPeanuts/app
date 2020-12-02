<template>
  <el-container class="connect_data">
    <el-aside width="260px">
      <div class="categories_div">
        <span class="categories_span">分类列表</span>
      </div>
      <div>
        <el-input class="search-input-left"
                  size="mini"
                  placeholder="搜索"
                  @focus="getFocus"
                  @blur="loseFocus"
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
      <el-dialog title="添加节点"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="编码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.label"></el-input>
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
    </el-aside>
    <el-main class="connection_main">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="breadcrumb_tree">
        <el-breadcrumb-item>数据模型</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="right_main"
           style="padding-top:10px;">
        <el-row v-if="search"
                style="margin: 0px 30px;">
          <el-form :model="searchForm"
                   :rules="rules"
                   ref="searchForm"
                   size="mini">
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="100px"
                              prop="modelcode"
                              label="编码">
                  <el-input v-model="searchForm.modelcode"
                            placeholder="编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称"
                              prop="modelname"
                              label-width="100px">
                  <el-input v-model="searchForm.modelname"
                            placeholder="名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物理表"
                              prop="tablename"
                              label-width="100px">
                  <el-input v-model="searchForm.tablename"
                            placeholder="物理表"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-form-item label="更新时间"
                          prop="starttime"
                          label-width="100px">
              <el-col :span="6">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="searchForm.starttime"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="2"
                      style="text-align:center">至</el-col>
              <el-col :span="6">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="searchForm.endtime"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item style="text-align: right;">
              <el-button type="primary"
                         @click="superSearch()">查询</el-button>
              <el-button @click="reset('searchForm')">重置</el-button>
              <el-button @click="closeSearch">收起</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row class="right_main_top">
          <el-col :span="4"
                  style="text-align:left;padding-left:30px;">
            <el-button-group>
              <el-button type="primary"
                         size="mini"
                         icon="el-icon-edit"
                         @click="addModel()">新建</el-button>
              <el-button type="primary"
                         @click="batchDel"
                         size="mini"
                         icon="el-icon-delete">删除</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="20"
                  style="text-align:right;padding-right:1.5%">

            <div style="display:inline-block;width:50%">
              <el-button type="primary"
                         style="margin-right:10px"
                         :disabled="isDisable"
                         @click="openSearch()"
                         size="mini">高级检索</el-button>
              <el-input placeholder="请输入内容"
                        style="    width: 50%;"
                        :disabled="isDisable"
                        size="mini"
                        v-model="content"
                        class="input-with-select">
                <el-select size="mini"
                           :disabled="isDisable"
                           style="width:100px;"
                           v-model="type"
                           slot="prepend"
                           placeholder="请选择">
                  <el-option label="编码"
                             value="modelcode"></el-option>
                  <el-option label="名称"
                             value="modelname"></el-option>
                  <el-option label="物理表名"
                             value="tablename"></el-option>
                </el-select>
                <el-button slot="append"
                           :disabled="isDisable"
                           icon="el-icon-search"></el-button>
              </el-input>
            </div>

          </el-col>
        </el-row>
        <div class="data_table">
          <el-table :data="tableData"
                    v-if="isShowCard"
                    :height="tableHeight"
                    class="data_table_style"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column label="编码"
                             width="200"
                             prop="modelcode"></el-table-column>
            <el-table-column label="名称"
                             :show-overflow-tooltip="true"
                             width="300"
                             prop="modelname"
                             sortable>
              <template slot-scope="scope">
                <el-link type="primary"
                         @click="openDrawer(scope.row)">{{scope.row.modelname}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="物理表名"
                             width="200"
                             prop="tablename"
                             sortable></el-table-column>
            <el-table-column label="描述"
                             :show-overflow-tooltip="true"
                             prop="describe"
                             sortable></el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="150">
              <template slot-scope="scope">
                <div class="icon_data">
                  <i class="el-icon-edit"
                     title="编辑"
                     style="cursor: pointer;"
                     @click="editModel(scope.row.modelcode)"></i>
                  <i class="el-icon-delete"
                     @click="del(scope.row.$index)"
                     style="margin-left: 20px;cursor: pointer;"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    <!-- 抽屉 -->
    <el-drawer :withHeader="false"
               size="40%"
               :show-close="false"
               :visible.sync="drawer"
               direction="rtl"
               :before-close="handleClose">
      <modeldrawer :rowData="rowData"
                   :listData="listData"
                   @review="review"
                   :isShow="true"></modeldrawer>
    </el-drawer>
    <!-- 全屏 -->
    <el-dialog :visible.sync="dialogView"
               width="80%">
      <modeldrawer :rowData="rowData"
                   :listData="listData"
                   :isShow="false"></modeldrawer>
    </el-dialog>
  </el-container>
</template>
  
<script>
import { uuid } from '@/utils/util'
import modeldrawer from './model.view'
export default {
  name: 'connectionlist',
  components: { modeldrawer },
  data () {
    return {
      rules: {},
      input: '',
      isShowCard: false,
      tableHeight: 0,
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableData: this.getTableList(null, null),
      type: '',//搜索类型
      content: '',//搜索内容
      searchForm: {//高级搜索
        modelcode: '',//编码
        modelname: '',//名称
        tablename: '',//物理表
        starttime: '',//开始时间
        endtime: '',//结束时间
      },
      form: {
        id: '',
        label: '',
        description: ''
      },
      search: false,
      isDisable: false,
      data: [
        {
          id: 1,
          code: '60E68745DE6B0A9490559CFF151BBACA',
          description: '全部分类',
          label: '全部分类',
          disabled: true
        },
      ],
      dialogVisible: false,//编辑节点
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      drawer: false,
      currentData: null,
      currentNode: null,
      nodeOperateType: null,//节点操作类型：C\U
      rowData: null,
      listData: [],
      dialogView: false,//全屏查看
      selectData: [],
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tableHeight = window.innerHeight - (window.innerHeight * (11 / 100)) - 80 - 32 - 34;
      this.isShowCard = true;
    },
    handleNodeClick (data, node) {
      this.currentNode = node
      this.currentData = data
      var tableDataList = []
      if (data.$treeNodeId === 1) {
        tableDataList = this.getTableList(null, null);
      } else if (!data.children && data.$treeNodeId !== 1) {
        tableDataList = this.getChildrenTableList(null, null)
      } else if (data.children.length > 0) {
        return
      }
      this.tableData = tableDataList
    },
    getTableList (name, type) {
      var tableData = [{
        modelcode: 'C0102.0503.01',//编码
        modelname: '行政许可基本信息',
        tablename: 'basic_info',
        describe: '行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字行政许可多文字',
      },
      {
        modelcode: 'REQ.C0105.0599.02',//编码
        modelname: '病历概要-基本健康信息',
        tablename: 'basic_info',
        describe: '',
      },
      {
        modelcode: 'C0101.0303.0201',//编码
        modelname: '门(急)诊检验常规报告',
        tablename: 'basic_menzhen',
        describe: '行政许可',
      }

      ]
      return tableData;
    },
    getChildrenTableList (name, type) {
      var tableData = [{
        name: '子节点1',
        type: 'oracle',
        describe: '学习oracle',
        date: '2016-05-02',
      }, {
        name: '子节点2',
        type: 'mysql',
        describe: '学习oracle',
        date: '2017-04-12',
      }]
      return tableData;
    },

    getTotal () {
      return this.tableData.length;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    getFocus (event) {
      event.currentTarget.placeholder = '';
    },
    loseFocus (event) {
      event.currentTarget.placeholder = '请输入内容';
    },
    editModel (model) {
      this.$router.push({
        path: '/criterion/model/edit',
        query: { operateType: 'U' }
      })
    },
    openSearch () {
      this.search = true
      this.isDisable = true
    },
    closeSearch () {
      this.search = false
      this.isDisable = false
    },
    superSearch () {//高级查询
      console.log('高级查询')
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.searchForm.endtime = ''//手动去除
    },
    handleClose (done) {
      done()
    },
    openDrawer (row) {
      this.drawer = true
      this.rowData = row
      this.listData = [{
        fieldname: 'SERIALNUM_ID',
        metaname: '数据主键',
        fieldtype: 'c(100)'
      }]
      console.log(row)
    },
    addModel () {
      this.$router.push({
        path: '/criterion/model/edit',
        query: { operateType: 'C' }
      })
    },
    renderContent (h, { node, data, store }) {
      if (node.label === '全部分类') {//
        return (
          <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <div>
              <span>{node.label}</span>
            </div>
            <div>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.addNode(node, data)}><i class="el-icon-plus"></i></span>
            </div>
          </div>
        )
      } else {
        return (
          <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <div>
              <span>{node.label}</span>
            </div>
            <div>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.addNode(node, data)}><i class="el-icon-plus"></i></span>
              <span style="font-size: 16px;margin-left:5px;" on-click={() => this.editNode(node, data)}><i class="el-icon-edit"></i></span>
              <span style="font-size: 16px;margin-left:5px" on-click={() => this.removeNode(node, data)}><i class="el-icon-delete" ></i></span>
            </div>
          </div>
        )
      }
    },
    addNode (node, data) {
      this.nodeOperateType = 'C'
      this.form.label = ''
      this.form.description = ''
      this.form.code = uuid()
      this.dialogVisible = true
    },
    editNode (node, data) {
      this.currentNode = node
      this.nodeOperateType = 'U'
      this.form.code = node.data.code
      this.form.label = node.label
      this.form.description = node.data.description
      this.dialogVisible = true
    },
    saveNode () {
      this.dialogVisible = false;
      if (this.nodeOperateType === 'C') {
        const newChild = { code: this.form.code, label: this.form.label, description: this.form.description, children: [] }
        this.$refs['tree'].append(newChild, this.currentNode)
        console.log('追加节点成功：id=>', this.form.code)
      } else {
        this.$set(this.currentNode.data, 'code', this.form.code)
        this.$set(this.currentNode.data, 'label', this.form.label)
        this.$set(this.currentNode.data, 'description', this.form.description)
      }
    },
    removeNode (node, data) {
      this.$confirm('确定要删除该节点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs['tree'].remove(node)
      }).catch(() => {
      })

    },
    review () {
      this.dialogView = true
    },
    handleSelectionChange (val) {
      this.selectData = val

    },
    batchDel () {//
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectData.length > 0) {
          for (const item of this.selectData) {
            this.tableData.splice(this.tableData.indexOf(item), 1)
          }
        } else {
          this.$message({
            message: '请选择一条记录.',
            type: 'warning'
          });
        }
      }).catch(() => {
      })

    },
    del (index) {//删除
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      }).catch(() => {
      })

    },

  }
};
  </script>
  
  <style scoped>
body {
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
}
.connect_data {
  overflow: hidden;
  height: 100%;
}
.el-main {
  background-color: #f8f8f9;
  width: 100%;
  height: 100%;
}
/*左边内容*/
.categories_div {
  margin-top: 6%;
  height: 4%;
  border-bottom: 1px solid rgb(217, 219, 221);
}
.categories_span {
  margin-left: 6%;
  line-height: 30px;
}
.search-input-left {
  width: 88%;
  margin-left: 6%;
  margin-top: 4%;
  cursor: pointer;
}
.left_data_tree {
  margin-top: 6%;
  margin-left: 4%;
  height: 80%;
}
.left_data_tree i {
  display: block;
  float: left;
}
/*右边内容*/
.main_criteria {
  background-color: #ffffff;
  width: 99%;
  height: 15%;
}
.right_main_top {
  background-color: #ffffff;
  width: 100%;
  height: 90%;
}
/*右边查询条件*/
.query_criteria_form {
  padding: 5px;
  width: 100%;
  height: 100%;
}
.query_criteria_form .el-input {
  width: 90%;
}
.query_criteria_form .el-select {
  width: 90%;
}
.button_and_a .el-button {
  font-size: 14px;
  line-height: 6px;
  background-color: #0f84ff;
  color: #ffffff;
  border-radius: 8%;
}
.button_and_a a:hover {
  cursor: pointer;
}
.search_criteria_div {
  height: 50px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
}
.search_criteria {
  width: 100%;
  margin-top: 1%;
  background-color: #ffffff;
}
.search_criteria .right_button {
  float: left;
  margin-left: 2%;
  font-size: 14px;
  line-height: 6px;
  background-color: #0f84ff;
  color: #ffffff;
  border-radius: 8%;
}
.criteria_div .el-button,
.el-select,
.el-input {
  float: right;
}
.criteria_button {
  margin-right: 15px;
}
.name_code {
  width: 100px;
}
.search-input-right {
  width: 300px;
}
.right_main {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e0e0;
}
.right_main .data_table {
  width: 97%;
  margin-left: 30px;
  overflow-y: auto;
  margin-top: 1%;
}
.data_pagination div {
  display: block;
  float: right;
}
.data_pagination {
  width: 97%;
  margin-top: 1%;
  margin-left: 15px;
  margin-bottom: 0px;
}
.icon_data i:hover {
  cursor: pointer;
}
/*面包屑*/
.breadcrumb_tree {
  height: 1%;
  font-size: 16px;
  line-height: 1;
  padding-bottom: 1%;
}
.tree {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 80px;
  height: 500px;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
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

