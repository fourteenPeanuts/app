<template>
    <div style="padding:10px;overflow:auto;">
      <el-row>
        <el-col :span="18">
            <h3 style="font-size:16px;">{{rowData.name}}（{{rowData.code}}）标准详情</h3>
        </el-col>
        <el-col :span="6" style="height: 50px;line-height: 50px;text-align: right;">
            <el-dropdown>
                <el-button type="primary" size="mini">操作</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="fullscreen(rowData)">全屏查看</el-dropdown-item>
                    <el-dropdown-item v-if="rowData.isPosted == 'false'" @click.native="publish(rowData)">发布</el-dropdown-item>
                    <el-dropdown-item v-if="rowData.isPosted == 'true'" @click.native="canclePublish(rowData)">取消发布</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;" class="basic">
                <span class="flag">|</span>&nbsp;概述
            </el-col>
        </el-row>
        <el-row style="margin-top: 1%;">
            <el-col>
                <span style="margin-left: 2%;">{{rowData.description}}</span>
            </el-col>
        </el-row>
        <el-row style="margin-top: 2%;">
            <el-col :span="24">
                <el-table :data="standrardTableData" style="width:100%" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column prop="fieldName" label="字段名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dataName" label="数据元名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dataType" label="数据类型" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="isShowDialog" style="overflow: auto;" width="60%" :title="standardDialogTitle" class="dialogViewClass" :modal="false">
            <modeladdstandardview @cancelFun="cancelFun" :standardForm="rowData" @updateData="updateData"></modeladdstandardview>
        </el-dialog>

        <el-dialog :visible.sync="isFullScreenShowDialog" style="overflow: auto;" width="60%" class="dialogViewClass" :modal="false">
            <modelfullscreenview :fullScreenRowData="fullScreenRowData" :fullScreenTableData="fullScreenTableData"></modelfullscreenview>
        </el-dialog>

    </div>
</template>
<script>
    import modeladdstandardview from './add.standard.data'
    import modelfullscreenview from './standard.fullscreen'
    export default {
        name: 'standarddrawerview',
        components: { modeladdstandardview,modelfullscreenview },
        data () {
            return {
                isShowDialog:false,
                standardDialogTitle:'',
                tableRowObject:{},
                fullScreenTableData:[],
                fullScreenRowData:{},
                isFullScreenShowDialog:false,
            }
        },
        props: {
            standrardTableData: {
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
            }
        },
        methods: {
            /*全屏查看*/
            fullscreen(dataRow){
                this.fullScreenTableData = this.standrardTableData;
                this.fullScreenRowData = this.rowData;
                this.isFullScreenShowDialog = true;
            },

            /*发布*/
            publish(dataRow){
                debugger
                this.standardDialogTitle = "发布" + dataRow.name;
                this.isShowDialog = true;
                dataRow.type="publish";
                this.tableRowObject = dataRow;
                this.standardForm = dataRow;
            },

            /*取消发布*/
            canclePublish(dataRow){
                debugger
                this.$confirm('确定取消发布?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dataRow.isPosted = 'false';
                    this.$emit('cancelFun');
                    this.$message({
                        type: 'success',
                        message: '取消发布成功!'
                    });
                }).catch(() => {});
            },

            /*新增、编辑、发布后需要更新数据的触发事件*/
            updateData(dataRow){
                debugger
                if(dataRow.type === 'publish'){
                    this.tableRowObject.isPosted = 'true';
                }
                if(dataRow.type === 'add'){
                    dataRow.isPosted='false';
                    this.tableData.push(dataRow);
                }
                this.tableRowObject.resourceContents = dataRow.resourceContents;
                this.tableRowObject.code = dataRow.code;
                this.tableRowObject.name = dataRow.name;
                this.tableRowObject.description = dataRow.description;
                
            },

            /*取消事件*/
            cancelFun () {
                debugger
                this.$emit('cancelFun');
                this.isShowDialog = false;
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
    }
</style>
<style>
    .dialogViewClass .el-dialog__body {
        padding: 0 20px;
    }
    .dialogViewClass .el-dialog__header {
        padding-top: 20px;
        padding-left: 20px;
        background-color: #f8f8f9;
    }
</style>