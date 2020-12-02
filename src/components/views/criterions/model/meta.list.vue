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
                   node-key="id"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   class="data_tree"></el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>

      <div style="background-color: #FFFFFF;">
        <div class="main_criteria">
          <el-row style="margin-top: 1%;">

            <el-col :span="24"
                    style="text-align:right;">
              <div style="display:inline-block">
                <el-input class="input-with-select"
                          size="mini"
                          :placeholder="placeholderNameOrCode"
                          @focus="getFocus"
                          @blur="loseFocus"
                          v-model="input3"
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
                      ref="table"
                      height="500"
                      class="data_table_style"
                      @selection-change="handleSelect"
                      :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="字段名称"
                               prop="fieldName"
                               sortable></el-table-column>
              <el-table-column label="数据元名称"
                               prop="elementName"
                               sortable></el-table-column>
              <el-table-column label="数据类型"
                               prop="dataType"></el-table-column>
              <el-table-column label="国家标识符"
                               prop="nationalLogo"></el-table-column>
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
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'dataelement',
  data () {
    return {
      input: '',
      input3: '',
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
          },
          {
            id: 3,
            label: '质检',
            description: '这是一些描述'
          },
          {
            id: 4,
            label: '食药监',
            description: '这是一些描述'
          },
          {
            id: 5,
            label: '其他',
            description: '这是一些描述',
            children: [{
              id: 6,
              label: '二级节点',
              description: '这是一些描述'

            }]
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        id: '',
        label: '',
        description: ''
      },
      dialogVisible: false,
      currentNode: null,
      currentData: null,
      typeItems: [
        {
          typeLabel: '字符型',
          typeValue: '0'
        },
        {
          typeLabel: '数值型',
          typeValue: '1'
        },
        {
          typeLabel: '日期型',
          typeValue: '2'
        },
        {
          typeLabel: '逻辑型',
          typeValue: '3'
        },
        {
          typeLabel: '二进制型',
          typeValue: '4'
        },
        {
          typeLabel: '长文本型',
          typeValue: '5'
        }
      ],
      typeValue: '',
      rangeItems: [
        {
          rangeLabel: '家族关系代码',
          rangeValue: '0'
        },
        {
          rangeLabel: '有无情况代码',
          rangeValue: '1'
        },
        {
          rangeLabel: '治疗类别代码',
          rangeValue: '2'
        },
        {
          rangeLabel: '药品性质',
          rangeValue: '3'
        },
        {
          rangeLabel: '手术级别代码',
          rangeValue: '4'
        },
        {
          rangeLabel: '诊断类型代码',
          rangeValue: '5'
        },
        {
          rangeLabel: '注册号',
          rangeValue: '6'
        },
        {
          rangeLabel: 'ABO血型代码表',
          rangeValue: '7'
        },
        {
          rangeLabel: '药物剂型代码表',
          rangeValue: '8'
        },
        {
          rangeLabel: '世界各国和地区名称代码',
          rangeValue: '9'
        },
        {
          rangeLabel: '处方类别代码',
          rangeValue: '10'
        },
        {
          rangeLabel: '联系电话类别代码',
          rangeValue: '11'
        }
      ],
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
      var tableDataList = [];
      if (data.$treeNodeId === 1) {
        tableDataList = this.getTableList(null, null);
      } else if (!data.children && data.$treeNodeId !== 1) {
        tableDataList = this.getChildrenTableList(null, null);
      } else if (data.children.length > 0) {
        return;
      }
      this.tableData = tableDataList;
    },

    getTableList (name, type) {
      const tableData = [
        {
          fieldName: 'PID_FORMAL_CHI_RULE',            //编码
          elementName: '身份证号编码规则',            //名称
          dataType: 'c(100)',            //数据类型
          nationalLogo: '-',   //国家数据元标识符

        },
        {
          fieldName: 'CAR_FORMAL_CHI_RULE',            //编码
          elementName: '车牌号编码规则',            //名称
          dataType: 'c(10)',            //数据类型
          nationalLogo: '-',   //国家数据元标识符
        }
      ];
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
    }

  }
}
</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css">
</style>
<style>
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