<template>
    <div style="padding:10px;overflow:auto;height: 500px;overflow: hidden;">
      <el-row>
        <el-col :span="18">
            <h3 style="font-size:16px;">{{fullScreenRowData.name}}（{{fullScreenRowData.code}}）</h3>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;" class="basic">
                <span class="flag">|</span>&nbsp;概述
            </el-col>
        </el-row>
        <el-row style="margin-top: 1%;">
            <el-col>
                <span style="margin-left: 2%;">{{fullScreenRowData.description}}</span>
            </el-col>
        </el-row>
        <el-row style="margin-top: 2%;">
            <el-col :span="24">
                <el-table :data="fullScreenTableData" style="width:100%;overflow-y: auto;" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column prop="fieldName" label="字段名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dataName" label="数据元名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dataType" label="数据类型" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'standardfullscreen',
        data () {
            return {
            }
        },
        props: {
            fullScreenTableData: {
                type: Array,
                default () {
                return []
                }
            },
            fullScreenRowData: {
                type: Object,
                default () {
                return {}
                }
            }
        },
        methods: {
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