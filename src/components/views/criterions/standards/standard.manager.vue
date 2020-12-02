<template>
  <div class="connect_data">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/criterion/standarddatalist' }">标准管理管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理标准项</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="height:780px;">
      <el-header style="height:40px;border-bottom: 1px #ccc solid;">
        <h4 style="margin:2px;">{{header}}</h4>
      </el-header>
      <el-container style="height:600px">
        <el-aside width="260px"
                  style="border-right:1px solid #ccc;padding:5px;">
          <el-row style="margin: 10px 2px;">
            <el-col :span="16">
              <span class="categories_span">标准项列表</span>
            </el-col>
            <el-col :span="8"
                    style=" text-align: right;">
              <el-button type="primary"
                         size="mini"
                         @click="add()">新建</el-button>
            </el-col>
          </el-row>

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
        <el-main v-show="clickNode">
          <el-row>
            <el-col :span="24">
              <h4>{{title}}</h4>
            </el-col>
          </el-row>
          <el-row style="border-bottom:1px solid #ccc;padding:5px;font-size: 14px;">
            <el-col :span="24">
              {{description}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h4>关联实体</h4>
            </el-col>
          </el-row>
          <el-row v-show="isRelation">
            <el-col :span="24">
              {{relation}}
            </el-col>
          </el-row>
          <el-row v-show="!isRelation">
            <el-col :span="24"
                    style="font-size:14px;">
              暂无内容，点击 <el-link type="primary"
                       @click="addRelation">配置关联</el-link>
            </el-col>
          </el-row>
          <el-row v-show="isRelation"
                  style="margin-top:20px;">
            <el-col :span="24">
              <h4>关联数据元</h4>
            </el-col>
          </el-row>
          <el-table :data="tableData"
                    size="mini"
                    v-show="isRelation"
                    height="380"
                    :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
            <el-table-column label="序号"
                             type="index"
                             width="50">
            </el-table-column>
            <el-table-column label="字段名称"
                             width="200"
                             prop="fieldname"></el-table-column>
            <el-table-column label="数据元名称"
                             :show-overflow-tooltip="true"
                             width="300"
                             prop="metaname"
                             sortable>
            </el-table-column>
            <el-table-column label="数据类型"
                             width="200"
                             prop="ctype"
                             sortable></el-table-column>
            <el-table-column label="必填"
                             width="200"
                             prop="required"
                             sortable>
              <template slot-scope="scope">
                <i v-if="scope.row.required"
                   class="el-icon-circle-check"></i>
                <i v-if="!scope.row.isPosted"
                   class="el-icon-circle-close"></i>
              </template>
            </el-table-column>
            <el-table-column label="描述"
                             :show-overflow-tooltip="true"
                             prop="describe"
                             sortable></el-table-column>
            <el-table-column label="值域"
                             :show-overflow-tooltip="true"
                             prop="range"
                             sortable></el-table-column>
            <el-table-column label="国家标识符"
                             :show-overflow-tooltip="true"
                             prop="native"
                             sortable></el-table-column>
          </el-table>

        </el-main>
      </el-container>
    </el-card>
    <!-- 添加关联 -->
    <el-dialog :visible.sync="dialogRelation"
               title="关联数据实体"
               width="60%">
      <modelList @choose="choose"
                 @close="close"></modelList>

    </el-dialog>
  </div>
</template>
  
<script>
import { uuid } from '@/utils/util'
import modelList from './model.list'
export default {
  name: 'connectionlist',
  components: { modelList },
  data () {
    return {
      header: '所属标准： 门(急)诊处方记录（明细）(REQ.C0101.0502.0101)',
      isShowTable: true,
      rules: {},
      input: '',
      tableData: this.getTableList(null, null),
      type: '',//搜索类型
      content: '',//搜索内容
      clickNode: false,//是否点击树节点
      title: '',//标题
      description: '',
      relation: '行政许可基本信息(XZXKJBXX)',//关联实体
      form: {
        id: '',
        label: '',
        description: ''
      },
      isRelation: false,//是否展示关联
      search: false,
      isDisable: false,
      data: [//树数据
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
      dialogRelation: false,//配置关联
    }
  },
  mounted () {

  },
  methods: {
    handleNodeClick (data, node) {
      this.currentNode = node
      this.currentData = data
      this.clickNode = true
      this.title = node.label
      this.description = node.data.description
    },
    getTableList (name, type) {
      var tableData = [{
        fieldname: 'name_',
        metaname: '姓名',
        ctype: 'c(200)',
        required: false,
        range: 'C91',
        native: '姓名描述',
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
    getFocus (event) {
      event.currentTarget.placeholder = '';
    },
    loseFocus (event) {
      event.currentTarget.placeholder = '请输入内容';
    },
    renderContent (h, { node, data, store }) {
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

    },
    addNode (node, data) {
      this.nodeOperateType = 'C'
      this.form.label = ''
      this.form.description = ''
      this.form.code = uuid()
      this.dialogVisible = true
    },
    add () {
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
      if (this.nodeOperateType === 'C') {//新建
        const newChild = { code: this.form.code, label: this.form.label, description: this.form.description, children: [] }
        this.$refs['tree'].append(newChild, this.currentNode)
        console.log('追加节点成功：id=>', this.form.code)
      } else if (this.nodeOperateType === 'U') {//修改
        this.$set(this.currentNode.data, 'code', this.form.code)
        this.$set(this.currentNode.data, 'label', this.form.label)
        this.$set(this.currentNode.data, 'description', this.form.description)
      } else {//添加最外层
        const newChild = { code: this.form.code, label: this.form.label, description: this.form.description, children: [] }
        this.$refs['tree'].append(newChild)
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
    addRelation () {//配置关联
      this.dialogRelation = true
    },
    choose (row) {
      console.log('选中的数据==》', row)
      this.dialogRelation = false
      this.isRelation = true
      this.relation = row.modelname
    },
    close () {
      this.dialogRelation = false
    }

  }
}
  </script>
  
  <style scoped>
.connect_data {
  background: #ffffff;
  padding: 30px;
}
h4 {
  margin: 5px;
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

