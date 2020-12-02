<template>
    <div style="padding:10px;overflow:auto;">
      <el-row>
        <el-col :span="18">
            <h3 style="font-size:16px;">{{rowData.name}}（{{rowData.code}}）数据元详情</h3>
        </el-col>
        <el-col v-show="isShow" :span="6" style="height: 50px;line-height: 50px;text-align: right;">
            <el-dropdown>
                <el-button type="primary" size="mini">操作</el-button>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editElement(rowData)">编辑元数据</el-dropdown-item>
                <el-dropdown-item v-if="rowData.isPosted == 'false'" @click.native="deleteElement()">删除元数据</el-dropdown-item>
                <el-dropdown-item v-if="rowData.isPosted == 'false'" @click.native="releaseElement(rowData)">发布</el-dropdown-item>
                <el-dropdown-item v-if="rowData.isPosted == 'true'" @click.native="canclePublish(rowData)">取消发布</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;" class="basic">
                <span class="flag">|</span>&nbsp;基本信息
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 100%;padding-left:15px;border-bottom: 1px solid #dddddd;">
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        编码:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.code}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        中文名称:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.name}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        描述:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.description?rowData.description:'无'}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        字段名称:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.fieldName}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        数据类型:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.type}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        长度范围:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.dataLength===".."?"无":rowData.dataLength}}
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;" v-if="rowData.range">
                    <el-col :span="6">
                        值域:
                    </el-col>
                    <el-col :span="18" style="text-align:left">
                        <el-link type="primary" @click="rangeDetails(rowData)">{{rowData.range}}</el-link>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="6">
                        是否必填:
                    </el-col>
                    <el-col :span="18" style="font-weight: bold;text-align:left">
                        {{rowData.isRequired==true?'是':'否'}}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="height: 30px;line-height: 30px;padding-left:5px;font-weight: bold;font-size: 15px;">
                <span class="flag">|</span>&nbsp;相关数据标准
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="listData" height="500px" size="mini" style="width:100%" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                    <el-table-column prop="dataStandard" label="引用数据元的数据标准" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-link type="primary" v-if="scope.row.isStandard"  @click="dataStandardDetails(scope.row)">{{scope.row.dataStandard}}</el-link>
                            <span  v-if="scope.row.isStandard ==false">{{scope.row.dataStandard}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="elementType" label="类型" ></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="isDialogView" width="45%" title="数据标准详情" class="dialogViewClass" :modal="false">
            <modeldialogview :dataStandardData="dataStandardData" :tableData="tableData"></modeldialogview>
        </el-dialog>
        <el-dialog :visible.sync="israngeDialogView" width="45%" title="值域详情" class="dialogViewClass" :modal="false">
            <modelrangedialogview :rangeData="rangeData" :rangeTableData="rangeTableData"></modelrangedialogview>
        </el-dialog>
    </div>
</template>
<script>
    import modeldialogview from './data.standard.view'
    import modelrangedialogview from './range.detail.view'
    export default {
        name: 'elementview',
        components: { modeldialogview,modelrangedialogview },
        data () {
            return {
                isDialogView: false,//数据标准详情
                israngeDialogView:false,//值域详情
                tableData: [],
                dataStandardData: [],
                rangeData: [],
                rangeTableData: [],
            }
        },
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
            },
            isdrawer: {
                type: Boolean,
                default () {
                return false
                }
            },
            parentTableData: {
                type: Array,
                default () {
                    return []
                }
            },
            elementTableData:{
                type:Array,
                default(){
                    return []
                }
            },
            releaseElementObject:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods: {
            
            releaseElement(){
                this.$emit("releaseElement",this.rowData);
            },

            canclePublish (dataRow) {
                debugger
                this.$emit("canclePublish",this.rowData);
            },

            rangeDetails(row){
                this.rangeData = row
                this.israngeDialogView = true;
                this.rangeTableData = [
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
            },

            dataStandardDetails(row){
                this.dataStandardData = row;
                this.isDialogView = true;
                this.tableData = [
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
                ];
            },

            editElement(rowData){
                var lengthArrt = rowData.dataLength.split("..");
                this.$router.push({
                    path: '/criterion',
                    name:'addelementlist',
                    query: { operateType: 'C', 
                        form: {
                            id:rowData.id,
                            elementCode: rowData.code,//编码
                            elementName: rowData.name,//中文名称
                            describe: rowData.description,//描述
                            fieldName: rowData.fieldName,//字段名称
                            englishName: rowData.englishName,//英文名称
                            dataType: rowData.type,//数据类型
                            minDataLength: lengthArrt[0],//最小长度
                            maxDataLength: lengthArrt[1],//最大长度
                            range: rowData.range,//值域
                            delivery: rowData.delivery,
                            standardSource: rowData.standardSource,//标准来源
                            nationalLogo: rowData.nationalLogo,//国家数据元标识符
                            nomenclature: rowData.nomenclature,//业务术语
                            isPosted:rowData.isPosted,//是否发布
                        },
                        isdrawer:this.isdrawer,
                        operationType:"edit",
                        tableData:this.elementTableData
                    }
                });
            },

            deleteElement(){
                var ttt = this.rowData;
                this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('deleteElement',this.rowData);
                    this.$emit('isNotDisplayDrawer',false);
                }).catch(() => {
                })
            }
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