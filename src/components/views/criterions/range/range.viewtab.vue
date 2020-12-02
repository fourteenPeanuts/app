<template>
  <!-- 代码 -->
  <div v-if="opreateFlag==3">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="代码项信息"
                   name="first">
        <el-row>
          <el-col :span="24">
            <el-form :inline="true"
                     :model="codeInfo"
                     class="demo-form-inline">

              <el-form-item label="值">
                <el-input size="mini"
                          v-model="codeInfo.value"
                          placeholder="值"></el-input>
              </el-form-item>
              <el-form-item label="含义">
                <el-input size="mini"
                          v-model="codeInfo.maining"
                          placeholder="含义"></el-input>
              </el-form-item>
              <el-form-item style="float:right">
                <el-button size="mini"
                           type="primary"
                           @click="query">查询</el-button>
                <el-button size="mini"
                           type="primary"
                           @click="edit">重置</el-button>
                <el-button v-if="isShow"
                           size="mini"
                           type="primary"
                           @click="review">全屏查看</el-button>
              </el-form-item>
            </el-form>

          </el-col>
          <el-col :span="24">
            <div class="drawer_list">
              <el-table :data="codeInfoList"
                        max-height="500px"
                        size="mini"
                        style="width:100%"
                        class="data_table"
                        :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">

                <el-table-column prop="value"
                                 :sortable="true"
                                 :show-overflow-tooltip="true"
                                 label="值">
                </el-table-column>
                <el-table-column prop="meaning"
                                 :sortable="true"
                                 :show-overflow-tooltip="true"
                                 label="含义">
                </el-table-column>
                <el-table-column prop="parentCode"
                                 :sortable="true"
                                 label="父项代码">
                </el-table-column>
                <el-table-column prop="description"
                                 :sortable="true"
                                 :show-overflow-tooltip="true"
                                 label="描述">
                </el-table-column>
              </el-table>
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
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="对照管理"
                   name="second">
        对照管理
      </el-tab-pane>

    </el-tabs>
  </div>
  <!-- 规则 -->
  <div v-else>
    <h1>规则</h1>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="第一条规则"
                   name="first">
        <el-row>
          <el-col :span="24"
                  style="height: 100%;padding-left:15px;border-bottom: 1px solid #dddddd;">

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                索引:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].index}}
              </el-col>
              <el-col :span="4">
                名称:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].name}}
              </el-col>
            </el-row>

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                类型:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].type}}
              </el-col>
              <el-col :span="4">
                长度:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].minLength}}--{{ruleInfoList[0].maxLength}}
              </el-col>
            </el-row>

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                值范围:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].minValue}}--{{ruleInfoList[0].maxValue}}
              </el-col>
              <el-col :span="4">
                不包含:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].exclude}}
              </el-col>
            </el-row>
            <el-row style="margin-top:5px;">
              <el-col :span="4">
                描述:
              </el-col>
              <el-col :span="20"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[0].description}}
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="第二条规则"
                   name="second">
        <el-row>
          <el-col :span="24"
                  style="height: 100%;padding-left:15px;border-bottom: 1px solid #dddddd;">

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                索引:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].index}}
              </el-col>
              <el-col :span="4">
                名称:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].name}}
              </el-col>
            </el-row>

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                类型:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].type}}
              </el-col>
              <el-col :span="4">
                长度:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].minLength}}--{{ruleInfoList[1].maxLength}}
              </el-col>
            </el-row>

            <el-row style="margin-top:5px;">
              <el-col :span="4">
                值范围:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].minValue}}--{{ruleInfoList[1].maxValue}}
              </el-col>
              <el-col :span="4">
                不包含:
              </el-col>
              <el-col :span="8"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].exclude}}
              </el-col>
            </el-row>
            <el-row style="margin-top:5px;">
              <el-col :span="4">
                描述:
              </el-col>
              <el-col :span="20"
                      style="font-weight: bold;text-align:left">
                {{ruleInfoList[1].description}}
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "viewTab",
  props: {
    opreateFlag: {
      type: Number,
      default () {
        return 0;
      }
    },
    isShow: {
      type: Boolean,
      default () {
        return true;
      }
    },



  },
  data () {
    return {
      activeName: 'first',

      codeInfoList: [
        {
          value: 11,
          meaning: '省编号',
          parentCode: '',
          description: '省编号'
        },
        {
          value: 22,
          meaning: '地级市编号',
          parentCode: '',
          description: '地级市编号'
        },
        {
          value: 33,
          meaning: '县级市编号',
          parentCode: '',
          description: '县级市编号'
        },
        {
          value: 44,
          meaning: '车型编号',
          parentCode: '',
          description: '车型编号'
        },
      ],
      ruleInfoList: [
        {
          index: 1,
          name: 'firstrule',
          type: 'Number',
          minLength: 2,
          maxLength: 11,
          description: 'this is first rule',
          minValue: 11,
          maxValue: 8888888888888,
          exclude: 22
        },
        {
          index: 2,
          name: 'secondrule',
          type: 'Number',
          minLength: 2,
          maxLength: 11,
          description: 'this is second rule',
          minValue: 11,
          maxValue: 8888888888888,
          exclude: 22
        }
      ],
      pagesize: 10,
      currentPage: 1,
      activeName: 'first',
      codeInfo: {
        value: '',
        maining: '',
      },
    }
  },
  methods: {
    review () {//全屏查看
      this.$emit('review')
    },

    edit () {
      console.log(this.codeInfoList);

    },

    query () {

    },

    del () {

    },

    handleClick (tab, event) {
      console.log(tab, event);
    },

    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },

    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },

    getTotal () {
      return this.codeInfoList.length;
    },

  }

}
</script>
<style scoped>
* {
  font-size: 14px;
}
.flag {
  color: blue;
}
.basic {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
}
.drawer_list .data_table {
  width: 97%;
  margin-left: 30px;
  overflow-y: auto;
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
<style>
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 11px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>