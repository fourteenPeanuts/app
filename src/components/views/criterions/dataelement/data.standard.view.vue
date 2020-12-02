<template>
    <div>
        <el-row>
            <el-col :span="18">
                <h1 style="font-size:16px;padding-left:20px;">{{dataStandardData.dataStandard}}（{{dataStandardData.elementcode}}）标准详情</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;" class="basic">
                <span class="flag">|</span>&nbsp;项目基本信息
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" height="500px" size="mini" style="margin-top: 2%;" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column prop="fieldName" :sortable="true" label="字段名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="elementName" :sortable="true" label="数据元名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="elementType" :sortable="true" label="数据类型" ></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'datastandardview',
        props: {
            tableData: {
                type: Array,
                default () {
                return []
                }
            },
            dataStandardData: {
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
    .flag {
        color: blue;
    }
    .basic {
        border-top: 1px solid #dddddd;
    }
</style>
<style>
</style>