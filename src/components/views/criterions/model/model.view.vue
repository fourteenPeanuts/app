<template>
  <div style="padding:10px;overflow:auto;">
    <el-row>
      <el-col :span="18">
        <h3 style="font-size:16px;">{{rowData.modelname}}（{{rowData.modelcode}}）数据实体详情</h3>
      </el-col>
      <el-col v-show="isShow"
              :span="6"
              style="height: 50px;line-height: 50px;text-align: right;">
        <el-dropdown>
          <el-button type="primary"
                     size="mini">
            操作
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="review()">全屏查看</el-dropdown-item>
            <el-dropdown-item @click.native="edit()">编辑数据实体</el-dropdown-item>
            <el-dropdown-item @click.native="del()">删除数据实体</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;"
              class="basic">
        <span class="flag">|</span>&nbsp;基本信息
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              style="height: 100%;padding-left:15px;border-bottom: 1px solid #dddddd;">
        <el-row style="margin-top:5px;">
          <el-col :span="6">
            编码:
          </el-col>
          <el-col :span="18"
                  style="font-weight: bold;text-align:left">
            {{rowData.modelcode}}
          </el-col>
        </el-row>
        <el-row style="margin-top:5px;">
          <el-col :span="6">
            名称:
          </el-col>
          <el-col :span="18"
                  style="font-weight: bold;text-align:left">
            {{rowData.modelname}}
          </el-col>
        </el-row>
        <el-row style="margin-top:5px;">
          <el-col :span="6">
            物理表名:
          </el-col>
          <el-col :span="18"
                  style="font-weight: bold;text-align:left">
            {{rowData.tablename}}
          </el-col>
        </el-row>
        <el-row style="margin-top:5px;">
          <el-col :span="6">
            描述:
          </el-col>
          <el-col :span="18"
                  style="font-weight: bold;text-align:left">
            {{rowData.describe?rowData.describe:'无'}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;">
        <span class="flag">|</span>&nbsp;关联数据源
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="listData"
                  height="500px"
                  size="mini"
                  style="width:100%">

          <el-table-column prop="fieldname"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="字段名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="metaname"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="数据元名称"
                           width="280">
          </el-table-column>
          <el-table-column prop="fieldtype"
                           :sortable="true"
                           label="数据类型">
          </el-table-column>
          <el-table-column v-if="!isShow"
                           prop="require"
                           label="必填">
          </el-table-column>
          <el-table-column v-if="!isShow"
                           prop="describe"
                           :show-overflow-tooltip="true"
                           width="280"
                           label="描述">
          </el-table-column>
          <el-table-column v-if="!isShow"
                           prop="range"
                           label="值域">
          </el-table-column>
          <el-table-column v-if="!isShow"
                           prop="countryflag"
                           label="国家标识符">
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'nodeView',
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    },
    rowData: {
      type: Object,
      default () {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    }

  },
  data () {
    return {

    }
  },
  methods: {
    review () {//全屏查看
      this.$emit('review')
    },
    edit () {
      this.$router.push({
        path: '/criterion/model/edit',
        query: { operateType: 'U' }
      })
    },
    del () { },
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
</style>