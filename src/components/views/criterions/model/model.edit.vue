<template>
  <div class="contioner">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/criterion/model/list' }">数据模型</el-breadcrumb-item>
        <el-breadcrumb-item>{{text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-show="showType">
      <el-radio v-model="addType"
                @change="change"
                style="width:45%;height:70px;"
                label="handle"
                border><i style="font-size:40px;"
           class="el-icon-thumb"></i>手动录入</el-radio>
      <el-radio v-model="addType"
                style="width:45%;height:70px;"
                label="db"
                @change="change"
                border><i style="font-size:40px;"
           class="el-icon-collection"></i>表库抽取</el-radio>
    </div>
    <div v-show="!basic">
      <dbList @choose="choose"></dbList>
    </div>
    <el-tabs v-show="basic"
             :before-leave="validateForm"
             v-model="paneName"
             tab-position="left"
             style="height: 650px;;margin-top:10px;">
      <el-tab-pane label="基本信息"
                   name="basic">
        <div>
          <h5>基本信息</h5>
        </div>
        <el-form size="mini"
                 style="width:90%"
                 :rules="rules"
                 ref="modelForm"
                 label-width="100px"
                 :model="modelForm">
          <el-form-item label="编码"
                        prop="modelcode">
            <el-input v-model="modelForm.modelcode"></el-input>
          </el-form-item>
          <el-form-item label="名称"
                        prop="modelname">
            <el-input v-model="modelForm.modelname"></el-input>
          </el-form-item>
          <el-form-item label="物理表"
                        prop="tablename">
            <el-input v-model="modelForm.tablename"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        prop="describe">
            <el-input type="textarea"
                      v-model="modelForm.describe"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="relation"
                   label="关联数据元">
        <div>
          <h5>关联数据源</h5>
        </div>
        <el-row>
          <el-col :span="12">
            <el-button size="mini"
                       type="primary"
                       icon="el-icon-edit"
                       @click="addMeta()">新建数据元</el-button>
            <el-button size="mini"
                       type="primary"
                       icon="el-icon-share"
                       @click="addRelation()">添加关联</el-button>
            <el-button size="mini"
                       @click="batchDel"
                       type="primary"
                       icon="el-icon-delete">移除关联</el-button>
          </el-col>
          <el-col :span="12"
                  style="text-align:right">
            <div style="width:100%">

              <el-input placeholder="请输入内容"
                        style="    width: 50%;"
                        size="mini"
                        v-model="content"
                        class="input-with-select">
                <el-select size="mini"
                           style="width:100px;"
                           v-model="type"
                           slot="prepend"
                           placeholder="请选择">
                  <el-option label="元数据名称"
                             value="metaname"></el-option>
                  <el-option label="字段名称"
                             value="fieldname"></el-option>

                </el-select>
                <el-button slot="append"
                           icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>

        </el-row>
        <el-table :data="listData"
                  max-height="500px"
                  size="mini"
                  style="width:100%;margin-top:10px;"
                  :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>

          <el-table-column prop="fieldName"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="字段名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="elementName"
                           :sortable="true"
                           :show-overflow-tooltip="true"
                           label="数据元名称"
                           width="280">
          </el-table-column>
          <el-table-column prop="dataType"
                           :sortable="true"
                           label="数据类型">
          </el-table-column>

          <el-table-column prop="nationalLogo"
                           label="国家标识符">
          </el-table-column>
          <el-table-column prop="status"
                           label="状态">
          </el-table-column>

          <el-table-column label="操作"
                           width="130"
                           fixed="right"
                           align="center">
            <template slot-scope="scope">
              <el-link style="color:#409EFF"
                       @click="del()"><i class="el-icon-delete"></i>移除关联</el-link>

            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-row style="margin-top:20px;">
      <el-col :span="24"
              style="text-align: center;">
        <el-button type="primary"
                   v-show="basic"
                   size="mini"
                   @click="save">保存</el-button>
        <el-button v-show="!basic"
                   @click="nextStep"
                   type="primary"
                   size="mini">下一步</el-button>
        <el-button @click="cancel()"
                   size="mini">取消</el-button>
      </el-col>
    </el-row>
    <!-- 新建数据元 -->
    <el-dialog :visible.sync="dialogAdd"
               title="新建数据元"
               width="60%">
      <metaAdd :dialogAdd="dialogAdd"
               @save="saveMeta"
               @close="closeMeta"></metaAdd>

    </el-dialog>
    <!-- 添加关联 -->
    <el-dialog :visible.sync="dialogRelation"
               title="添加数据元"
               width="60%">
      <metaList @save="saveRelation"
                @close="closeRelation"></metaList>

    </el-dialog>

  </div>
</template>
<script>
import { uuid } from '@/utils/util'
import metaAdd from './meta.add'
import metaList from './meta.list'
import dbList from './db.list'
export default {
  name: 'modelEdit',
  components: { metaAdd, metaList, dbList },
  data () {
    return {
      paneName: 'basic',//标签卡片名称
      addType: 'handle',
      text: '新建数据模型',
      type: '',//搜索类型
      content: '',//搜索内容
      operateType: '',
      basic: true,//基本信息页面显示
      modelForm: {
        modelcode: '',//编码
        modelname: '',//名称
        tablename: '',//物理表名
        describe: '',//描述
      },
      rules: {
        modelcode: [
          { required: true, message: '请输入编码' }
        ],
        modelname: [
          { required: true, message: '请输入名称' }
        ],
        tablename: [
          { required: true, message: '请输入物理表名' }
        ],

      },
      selectData: [],
      listData: [],
      dialogAdd: false,//添加
      dialogRelation: false,//添加关联
      showType: true,//是否显示类型
    }
  },
  mounted () {
    this.operateType = this.$route.query.operateType
    this.showType = this.operateType === 'C'
  },
  methods: {
    del (index) {//删除
      this.listData.splice(index, 1)
    },
    batchDel () {//批量删除
      if (this.selectData.length > 0) {
        for (const item of this.selectData) {
          this.listData.splice(this.listData.indexOf(item), 1)
        }
      } else {
        this.$message({
          message: '请选择一条记录.',
          type: 'warning'
        });
      }
    },
    handleSelectionChange (val) {
      this.selectData = val

    },
    addMeta () {//添加元数据
      this.dialogAdd = true
    },
    saveMeta (row) {//保存元数据
      const map = row
      map.status = '未保存'
      this.listData.push(map)
    },
    saveRelation (metaList) {//添加关联
      for (const meta of metaList) {
        meta.status = '已存在'
        this.listData.push(meta)
      }
    },
    closeRelation () {//关闭关联
      this.dialogRelation = false
    },
    closeMeta () {//关闭元数据
      this.dialogAdd = false
    },
    addRelation () {//添加关联
      this.dialogRelation = true
    },
    cancel () {//取消
      this.$router.push({
        path: '/criterion/model/list',
      })
    },
    change (val) {
      this.basic = val === 'handle'

    },
    nextStep () {//下一步
      this.basic = true
      this.showType = false
    },
    choose (row) {
      console.log('选中的数据连接信息==》', row)
    },
    validateForm (activeName, oldActiveName) {//验证表单
      if (activeName === 'relation') {
        let flag = false
        this.$refs['modelForm'].validate((valid) => {
          flag = valid
          if (!valid) {
            this.$message({
              message: '验证不通过.',
              type: 'error'
            });
          }
        })
        return flag
      } else {
        return true
      }
    },
    save () {
      this.$refs['modelForm'].validate((valid) => {
        if (valid) {
          console.log('保存方法')
        }
      })
    }
  },

}
</script>
<style scoped>
.contioner {
  background: #ffffff;
  padding: 30px;
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