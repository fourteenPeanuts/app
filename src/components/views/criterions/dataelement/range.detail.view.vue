<template>
    <div style="height: 600px">
        <el-row>
            <el-col :span="18">
                <h1 style="font-size:16px;padding-left:20px;">{{rangeData.name}}（{{rangeData.code}}）值域详情</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="padding-left:5px;font-weight: bold;font-size: 15px;" class="basic">
                <span class="flag">|</span>&nbsp;基本信息
            </el-col>
        </el-row>
        <el-row style="padding-top: 10px;">
            <el-col :span="24" style="padding-left:15px;border-top: 1px solid #dddddd;">
                <el-row style="margin-top:5px;">
                    <el-col :span="3">
                        编码:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.code}}
                    </el-col>
                    <el-col :span="3">
                        名称:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.name}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="3">
                        标准值域:
                    </el-col>
                    <el-col :span="9" style="text-align:left">
                        {{rangeData.range}}
                    </el-col>
                    <el-col :span="3">
                        是否启用:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.isRequired==true?'是':'否'}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="3">
                        禁用原因:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.description?rangeData.description:'无'}}
                    </el-col>
                    <el-col :span="3">
                        标准来源:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.fieldName}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="3">
                        所属分类:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.type}}
                    </el-col>
                    <el-col :span="3">
                        描述:
                    </el-col>
                    <el-col :span="9" style="font-weight: bold;text-align:left">
                        {{rangeData.dataLength}}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
              <el-tab-pane label="代码项信息" name="first">
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
                        <el-button type="primary" size="mini" @click="fullScreen(rangeData)">全屏查看</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="rangeTableData" size="mini" style="margin-top: 2%;" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
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
                </el-tab-pane>
                    <el-tab-pane label="对照关系" name="second">
                        <el-table :data="tableData" style="width: 100%;">
                            <el-table-column prop="name" label="非标准值域代码信息">
                                <el-table-column prop="province" label="值" ></el-table-column>
                                <el-table-column prop="city" label="含义" ></el-table-column>
                            </el-table-column>
                            <el-table-column label="值域代码标准信息">
                                <el-table-column prop="province" label="值" ></el-table-column>
                                <el-table-column prop="city" label="含义" ></el-table-column>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
            </el-tabs>
        </template>
        <el-dialog :visible.sync="isDisplayFullScreen" width="70%" :title="fullTitle" class="dialogViewClass" :modal="false">
            <modelfulldialogview :fullScreenData="fullScreenData" :fullScreenTable="fullScreenTable"></modelfulldialogview>
        </el-dialog>
    </div>
</template>
<script>
    import modelfulldialogview from './fullscreen.view'

    export default {
        name: 'rangedetailview',
        components: { modelfulldialogview },
        data() {
            return {
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                activeName: 'first',
                valueInput:'',
                meaningInput:'',
                isDisplayFullScreen:false,
                fullScreenData:[],
                fullScreenTable:[],
                fullTitle:'',
                tableData:[],
            }
        },
        props: {
            rangeTableData: {
                type: Array,
                default () {
                return []
                }
            },
            rangeData: {
                type: Object,
                default () {
                return {}
                }
            }
        },
        methods: {
            getTotal(){
                return this.rangeTableData.length;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },

            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
            },

            handleClick(tab, event) {

            },

            resettingInput() {
                this.valueInput='';
                this.meaningInput='';
            },

            fullScreen(row){
                this.fullTitle = row.name +'('+row.code+')'
                this.fullScreenData = row
                this.isDisplayFullScreen = true;
                this.fullScreenTable = [
                    {
                        fieldName: 'DE08_10_054_01',
                        elementName: '病区名称',
                        elementType:'C(50)'
                    },
                    {
                        fieldName: 'ORGANIZATION_CODE',
                        elementName: '组织机构代码',
                        elementType:'C(70)'
                    }
                ]
            }
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
    .dialogViewClass .el-dialog__body {
        padding: 0 20px;
    }
    .dialogViewClass .el-dialog__header {
        padding-top: 20px;
        padding-left: 20px;
        background-color: #f8f8f9;
        border-bottom: 1px solid #c5c5c7;;
    }
</style>