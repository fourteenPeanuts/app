<template>
  <el-container class="connect_data">
     <el-main class="connection_main">
      <div class="right_main"
           style="padding-top:10px;">
        <el-row class="right_main_top">
          <el-col :span="4"
                  style="text-align:left;padding-left:30px;">
            <el-button-group>
              <el-button type="primary"
                         size="mini"
                         icon="el-icon-edit"
                         @click="addModel()"
                         style="margin-left:-30px">新建</el-button>
            </el-button-group>
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
            <el-table-column label="商品名称"
                             :show-overflow-tooltip="true"
                             width="300"
                             prop="name"
                             sortable>

            </el-table-column>
            <el-table-column label="产地"
                             width="200"
                             prop="location"
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
                     title="详情"
                     style="cursor: pointer;"
                     @click="editModel(scope.row.name)"></i>
                
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'product',
   data () {
    return {
      rules: {},
      input: '',
      isShowCard: false,
      tableHeight: 0,
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableData: [],
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
      this.getTableList(null,null);
    },

    getTableList (name, type) {
       axios({
          method: 'post',
          url: '/getProducts',
          baseURL: process.env.API,
        })
         .then( response=> {
           this.tableData=response.data;
          });
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
         path: '/productdetail',
        query: { name: model }
      })
    },
    openSearch () {
      this.search = true
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
        path: '/productnew',
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
}
</script>
<style>

</style>