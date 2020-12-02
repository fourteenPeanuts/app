<template>
    <div style="height: 600px;margin-top: 20px;">
        <el-row :gutter="20">
            <el-col :span="1">
                <span>值</span>
            </el-col>
            <el-col :span="6">
                <el-input size="mini" placeholder="请输入" v-model="valueInput"></el-input>
            </el-col>
            <el-col :span="2">
                <span>含义</span>
            </el-col>
            <el-col :span="6">
                <el-input size="mini" placeholder="请输入" v-model="meaningInput"></el-input>
            </el-col>
            <el-col :span="9" style="text-align: right;">
                <el-button type="primary" size="mini">查询</el-button>
                <el-button type="primary" size="mini" @click="resettingInput">重置</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="fullScreenTable" size="mini" style="margin-top: 2%;" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column prop="fieldName" label="值"></el-table-column>
                    <el-table-column prop="elementName" :sortable="true" label="含义" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="elementType" :sortable="true" label="父代码项" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="elementType" :sortable="true" label="描述" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <div class="data_pagination" style="text-align: right;">
                <div>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]" 
                        :page-size="pagesize"         
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="getTotal()"> 
                    </el-pagination>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'fullscreenview',
        data() {
            return {
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                activeName: 'second',
                valueInput:'',
                meaningInput:''
            }
        },
        props: {
            fullScreenTable: {
                type: Array,
                default () {
                return []
                }
            },
            fullScreenData: {
                type: Object,
                default () {
                return {}
                }
            }
        },
        methods: {
            resettingInput() {
                this.valueInput='';
                this.meaningInput='';
            },

            getTotal(){
                return this.fullScreenTable.length;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },

            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
            },

        }
}
</script>
<style scoped>
</style>