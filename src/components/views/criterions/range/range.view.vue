<template>
  <div style="padding:10px;overflow:auto;">
    <div v-show="isShow">
      <el-row>
        <el-col :span="18">
          <h3 style="font-size:16px;">{{rowData.name}}（{{rowData.code}}）数据实体详情</h3>
        </el-col>

        <el-col :span="6"
                style="height: 50px;line-height: 50px;text-align: right;">
          <el-dropdown>
            <el-button type="primary"
                       size="mini">
              操作
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editRange">编辑值域</el-dropdown-item>

              <el-dropdown-item v-if="opreateFlag==3"
                                @click.native="editCodeInfo">编辑代码项</el-dropdown-item>

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
            <el-col :span="4">
              编码:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              {{rowData.code}}
            </el-col>
            <el-col :span="4">
              名称:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              {{rowData.name}}
            </el-col>
          </el-row>
          <el-row style="margin-top:5px;">
            <el-col :span="4">
              标准值域:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              <span v-if="rowData.standardRange">是</span>
              <span v-else>否</span>
            </el-col>
            <el-col :span="4">
              是否启用:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              <span v-if="rowData.enable">是</span>
              <span v-else>否</span>
            </el-col>

          </el-row>
          <el-row style="margin-top:5px;">
            <el-col :span="4">
              类型:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              {{rowData.type}}
            </el-col>
            <el-col :span="4">
              标准来源:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              {{rowData.source}}
            </el-col>
          </el-row>
          <el-row style="margin-top:5px;">
            <el-col :span="4">
              所属分类:
            </el-col>
            <el-col :span="8"
                    style="font-weight: bold;text-align:left">
              {{rowData.belong}}
            </el-col>
          </el-row>
          <el-row style="margin-top:5px;">
            <el-col :span="4">
              描述:
            </el-col>
            <el-col :span="20"
                    style="font-weight: bold;text-align:left">
              {{rowData.description}}
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </div>
    <div>
      <newviewtab :opreateFlag="opreateFlag"
                  @review="review"
                  :isShow="isShow">

      </newviewtab>
    </div>

  </div>
</template>
<script>
import { uuid } from '@/utils/util'
import newviewtab from './range.viewtab'

export default {

  name: 'nodeView',
  components: { newviewtab },
  props: {
    opreateFlag: {
      type: Number,
      default () {
        return 0;
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

    editRange () {
      let requiredData = [];

      if (this.rowData.type == '代码') {
        requiredData.push(3);
      } else {
        requiredData.push(4);
      }
      requiredData.push(this.rowData);
      this.$router.push({
        path: '/criterion/range/opreate',
        query: { requiredData: requiredData }
      })
    },
    editCodeInfo () {
      let requiredData = [];
      requiredData.push(this.codeInfoList);
      requiredData.push(this.rowData);
      console.log(JSON.stringify(requiredData))
      this.$router.push({
        path: '/criterion/range/codeInfo/edit',
        params: { requiredData: JSON.stringify(requiredData) }
      })
    },
    review () {//全屏查看
      this.$emit('review')
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