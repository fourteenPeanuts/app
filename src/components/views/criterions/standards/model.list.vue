<template>
  <div>
    <el-container class="connect_data">
      <el-main class="connection_main">

        <div class="right_main"
             style="padding-top:10px;">

          <el-row class="right_main_top">
            <el-col :span="24"
                    style="text-align:right;">

              <div style="display:inline-block;width:80%">

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
                      height="400"
                      class="data_table_style"
                      highlight-current-row
                      @current-change="handleSelectionChange"
                      :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
              <el-table-column width="55">
                <template slot-scope="scope">
                  　　　　　　　　<el-radio v-model="checked"
                            :label="scope.row.modelcode"></el-radio>
                </template>
              </el-table-column>
              <el-table-column label="编码"
                               width="200"
                               prop="modelcode"></el-table-column>
              <el-table-column label="名称"
                               :show-overflow-tooltip="true"
                               width="300"
                               prop="modelname"
                               sortable>
              </el-table-column>
              <el-table-column label="物理表名"
                               width="200"
                               prop="tablename"
                               sortable></el-table-column>
              <el-table-column label="描述"
                               :show-overflow-tooltip="true"
                               prop="describe"
                               sortable></el-table-column>

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
    </el-container>
    <el-row style="margin-top:20px;">
      <el-col :span="24"
              style="text-align:center">
        <el-button size="mini"
                   type="primary"
                   @click="save">保存</el-button>
        <el-button size="mini"
                   @click="close">取消</el-button>
      </el-col>

    </el-row>
  </div>
</template>
  
<script>
import { uuid } from '@/utils/util'
export default {
  name: 'connectionlist',

  data () {
    return {
      checked: null,
      rules: {},
      input: '',
      isShowCard: false,
      tableHeight: 500,
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
      selectData: null,
    }
  },
  mounted () {

  },
  methods: {

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
      },


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
    handleSelectionChange (row) {
      this.selectData = row
    },
    save () {
      if (this.selectData) {
        let row = {}
        Object.assign(row, this.selectData)
        this.$emit('choose', row)
      } else {
        this.$message({
          message: '请选择一条记录.',
          type: 'warning'
        });
      }
    },
    close () {
      this.$emit('close')
    }

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
  width: 100%;
  height: 100%;
}
.data_table {
  margin-top: 10px;
}
.data_pagination div {
  display: block;
  float: right;
}
</style>
<style>
.data_table_style .el-radio__label {
  display: none !important;
}
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

