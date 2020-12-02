<template>
  <el-container class="connect_data">
    <el-aside width="260px">
      <div class="categories_div">
        <span class="categories_span">数据库列表</span>
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
                   :expand-on-click-node="false"
                   ref="tree"
                   :current-node-key="0"
                   node-key="id"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   class="data_tree"></el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>

      <div style="background-color: #FFFFFF;">
        <div class="main_criteria"
             style="width: 97%;">
          <el-row style="margin-top: 1%;">

            <el-col :span="24"
                    style="text-align:right;">
              <div style="display:inline-block">
                <el-input class="input-with-select"
                          size="mini"
                          :placeholder="placeholderNameOrCode"
                          @focus="getFocus"
                          @blur="loseFocus"
                          v-model="searchType"
                          suffix-icon="el-icon-search"
                          style="cursor: pointer;">
                  <el-select class="selectNameOrCode"
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
                      highlight-current-row
                      ref="table"
                      height="500"
                      class="data_table_style"
                      @current-change="handleSelectionChange"
                      :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
              <el-table-column width="55">
                <template slot-scope="scope">
                  　　　　　　　　<el-radio v-model="checked"
                            :label="scope.row.name"></el-radio>
                </template>
              </el-table-column>
              <el-table-column label="名称"
                               width="300"
                               prop="name"
                               sortable></el-table-column>
              <el-table-column label="描述"
                               :show-overflow-tooltip="true"
                               width="300"
                               prop="describle"
                               sortable></el-table-column>
              <el-table-column label="路径"
                               prop="url"></el-table-column>

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
  </el-container>
</template>

<script>
export default {
  name: 'dataelement',
  data () {
    return {
      input: '',
      searchType: '',
      select: '',
      tableHeight: 0,
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      tableData: this.getTableList(null, null),
      placeholderNameOrCode: '请输入名称进行检索',
      data: [{
        id: 1,
        label: '全部分类',
        description: '这是一些描述',
        children: [
          {
            id: 2,
            label: '工商',
            description: '这是一些描述'
          }
        ]
      }],
      checked: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentSelectItem: null,//当前选中行
      typeValue: '',
      rangeValue: '',
      searchCriteriaItems: [
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
      isCriteria: false,
      selectData: [],//选择内容
    }
  },
  mounted () {

  },
  methods: {
    handleNodeClick (data) {

    },

    getTableList (name, type) {
      const tableData = [
        {
          name: 'yjs_xsyjxlhdxx',
          describle: 'yjs_xsyjxlhdxx',
          url: '总局轨迹库/icdc_xs/yjs_xsyjxlhdxx',


        },
        {
          name: 'yqsbjbsjxx',
          describle: 'yjs_xsyjxlhdxx',
          url: '总局轨迹库/icdc_zc/yqsbjbsjxx',


        }
      ]
      return tableData;
    },

    getChildrenTableList (name, type) {
      var tableData = []
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
      var placeholderByName = document.getElementsByClassName("selectNameOrCode");
    },
    loseFocus (event) {
      event.currentTarget.placeholder = this.placeholderNameOrCode;
    },

    loseFocusLeftTree () {
      event.currentTarget.placeholder = "搜索";
    },
    selectChange (event) {
      if (event == 0) {
        this.placeholderNameOrCode = '请输入名称进行检索';
      } else {
        this.placeholderNameOrCode = '请输入编码进行检索';
      }
    },
    handleSelect (val) {
      this.selectData = val
    },
    save () {
      const data = []
      Object.assign(data, this.selectData)
      if (data.length > 0) {
        this.$emit('save', data)
        this.$refs['table'].clearSelection()//清空选择
        this.$emit('close')
      } else {
        this.$message({
          message: '请选择一条记录.',
          type: 'warning'
        });
      }
    },
    close () {
      this.$emit('close')
    },
    handleSelectionChange (row) {
      this.$emit('choose', row)
    }

  }
}
</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css">
</style>
<style>
.data_table_style .el-radio__label {
  display: none !important;
}
.data_tree .el-tree-node__content:hover {
  background-color: #e7e7e7 !important;
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