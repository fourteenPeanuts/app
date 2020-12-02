<template>
    <el-container class="connect_data">
        <el-aside width="18%">
            <div class="categories_div">
                <span class="categories_span">分类列表</span>
            </div>
            <div>
                <el-input class="search-input-left" size="mini" placeholder="搜索" @focus="getFocus" @blur="loseFocusLeftTree" suffix-icon="el-icon-search" v-model="input"></el-input>
            </div>
            <div class="left_data_tree">
                <el-scrollbar style="height:100%;width: 100%;" class="tree_scroll">
                    <el-tree :data="data" ref="tree" :current-node-key="0" :expand-on-click-node="false" node-key="id" :props="defaultProps"
                        @node-click="handleNodeClick" class="data_tree"  :render-content="renderContent"></el-tree>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-main>
            <el-row>
                <el-col>
                    <el-breadcrumb separator="/" class="breadcrumb_tree" style="width: 97%;">
                        <el-breadcrumb-item>数据元</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <div style="background-color: #FFFFFF;">
                <div class="main_criteria">
                    <el-row v-if="isCriteria">
                        <el-form ref="criteriaForm" :model="criteriaForm">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label-width="100px" label="编码">
                                        <el-input size="mini" v-model="criteriaForm.elementCode" placeholder="请输入编码"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="中文名称" label-width="100px">
                                        <el-input size="mini" v-model="criteriaForm.elementName" placeholder="请输入中文名称"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="字段名称" label-width="100px">
                                        <el-input size="mini" v-model="criteriaForm.fieldName" placeholder="请输入字段名称"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="数据类型" label-width="100px">
                                        <el-select v-model="criteriaForm.dataType" placeholder="--请选择--" size="mini" style="width: 100%;">
                                            <el-option v-for="item in typeItems" :key="item.typeValue" :label="item.typeLabel" :value="item.typeValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="值域" size="mini" label-width="100px">
                                        <el-select v-model="criteriaForm.range" placeholder="--请选择--" style="width: 100%;" >
                                            <el-option v-for="item in rangeItems" :key="item.rangeValue" :label="item.rangeLabel" :value="item.rangeValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item style="text-align: right;" label-width="100px">
                                        <el-button type="primary" size="mini">查询</el-button>
                                        <el-button size="mini" @click="resettingCriteria">重置</el-button>
                                        <a style="margin-left: 10px;cursor: pointer;" @click="packUpCriteria">收起</a>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-row>
                    <el-row style="margin-top: 1%;">
                        <el-col :span="2">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addDataElement">新建</el-button>
                        </el-col>
                        <el-col :span="22" style="text-align:right;">
                            <el-button type="primary" style="display:inline-block" size="mini" @click="advancedCriteria">高级检索</el-button>
                            <div style="display:inline-block">
                                <el-input class="input-with-select" :disabled="isNotDisplayInput" size="mini" :placeholder="placeholderNameOrCode" @focus="getFocus" @blur="loseFocus" v-model="input3" suffix-icon="el-icon-search" style="cursor: pointer;">
                                  <el-select class="selectNameOrCode" :disabled="isNotDisplayInput" v-model="select" slot="prepend" placeholder="名称" size="mini" @change="selectChange" style="width:100px;">
                                    <el-option v-for="item in searchCriteriaItems" :key="item.searchCriteriaValue" :label="item.searchCriteriaLabel" :value="item.searchCriteriaValue"></el-option>
                                  </el-select>
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="right_main">
                    <div class="data_table">
                        <el-table :data="tableData" v-if="isShowCard" :height="tableHeight" class="data_table_style" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column label="编码" prop="code" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="中文名称" prop="name" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="diaplayDrawer(scope.row)">{{scope.row.name}}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column label="已发布" prop="isPosted" sortable :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <i class="el-icon-circle-check" v-if="scope.row.isPosted === 'true'"></i>
                                    <i class="el-icon-circle-close" v-if="scope.row.isPosted === 'false'"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="数据类型" prop="type" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="国家数据元标识符" prop="nationalLogo" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <div class="icon_data">
                                        <el-tooltip content="编辑数据元" placement="bottom" effect="light">
                                            <i class="el-icon-edit" @click="editElement(scope.row)"></i>
                                        </el-tooltip>
                                        <el-tooltip content="删除数据元" placement="bottom" effect="light" v-if="scope.row.isPosted == 'false'">
                                            <i class="el-icon-delete" style="margin-left: 20px;" @click="deleteElement(scope.row)"></i>
                                        </el-tooltip>
                                        <el-tooltip content="发布" placement="bottom" effect="light" v-if="scope.row.isPosted === 'false'">
                                            <i class="el-icon-s-release" style="margin-left: 20px;" @click="releaseElement(scope.row)"></i>
                                        </el-tooltip>
                                        <el-tooltip content="取消发布" v-if="scope.row.isPosted === 'true'" placement="bottom" effect="light">
                                            <i class="el-icon-remove-outline" style="margin-left: 20px;" @click="canclePublish(scope.row)"></i>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="data_pagination">
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
        </el-main>
        <el-dialog id="nodeDialog" :title="dialogTitle" :visible.sync="dialogVisible"  width="30%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="编码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
               <el-form-item>
                    <el-button type="primary" @click="saveNode()">保存</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
               </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 抽屉 -->
        <el-drawer :withHeader="false" size="40%" :show-close="false" :visible.sync="isdrawer" direction="rtl">
            <modeldrawer :rowData="rowData" :listData="listData" :elementTableData="tableData" :isdrawer="isdrawer" :isShow="true" :parentTableData="tableData" 
            @isNotDisplayDrawer="isNotDisplayDrawer" @canclePublish="canclePublish" :releaseElementObject="releaseElementObject" @releaseElement="releaseElement" @deleteElement="deleteElement"></modeldrawer>
        </el-drawer>

        <el-dialog :visible.sync="isReleaseDataElement" width="30%" title="发布数据元" :modal="false" class="dialogViewClass">
            <modelreleaseelement :dataElementForm="dataElementForm" @isNotDisplayDrawer="isNotDisplayDrawer" :releaseElementObject="releaseElementObject" @isNotDisplayDialog="isNotDisplayDialog" @updateData="updateData"></modelreleaseelement>
        </el-dialog>

    </el-container>
</template>

<script>
    import modeldrawer from './element.drawer.view'
    import modelreleaseelement from './release.element'

    export default {
        name: 'dataelementlist',
        components: { modeldrawer,modelreleaseelement },
        data() {
            return {
                input: '',
                input3:'',
                select:'',
                dialogTitle:'',
                isShowCard:false,
                tableHeight: 0,
                isdrawer:false,
                rowData:null,
                releaseElementObject:{},
                listData: [],
                isNotDisplayInput:false,//高级检索时input框是否可操作
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                tableData: [],
                placeholderNameOrCode:'请输入名称进行检索',
                criteriaForm: {
                    elementCode: '',//编码
                    elementName: '',//中文名称
                    fieldName: '',//字段名称
                    dataType: '',//数据类型
                    range: '',//值域
                },
                data: [{
                    label:'全部分类',
                    code:'',
                    description:'这是一些描述',
                    children: [
                        {
                            label:'工商',
                            code:'',
                            description:'这是一些描述'
                        },
                        {
                            label:'质检',
                            code:'',
                            description:'这是一些描述'
                        },
                        {
                            label:'医疗',
                            code:'',
                            description:'这是一些描述',
                            children:[{
                                label:'医疗',
                                code:'',
                                description:'这是一些描述'
                                
                            }]
                        },
                        {
                            label:'其他',
                            code:'',
                            description:'这是一些描述'
                        }
                    ]  
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form:{
                    code:'',
                    name:'',
                    description:''
                },
                isReleaseDataElement:false,
                dataElementForm:{},
                dialogVisible: false,
                currentNode:null,
                currentData:null,
                treeChange:'',//添加或修改树节点识别参数
                typeItems: [
                    {
                        typeLabel: '字符型',
                        typeValue: '0'
                    },
                    {
                        typeLabel: '数值型',
                        typeValue: '1'
                    },
                    {
                        typeLabel: '日期型',
                        typeValue: '2'
                    },
                    {
                        typeLabel: '逻辑型',
                        typeValue: '3'
                    },
                    {
                        typeLabel: '二进制型',
                        typeValue: '4'
                    },
                    {
                        typeLabel: '长文本型',
                        typeValue: '5'
                    }
                ],
                rangeItems: [
                    {
                        rangeLabel: '家族关系代码',
                        rangeValue: '0'
                    },
                    {
                        rangeLabel: '有无情况代码',
                        rangeValue: '1'
                    },
                    {
                        rangeLabel: '治疗类别代码',
                        rangeValue: '2'
                    },
                    {
                        rangeLabel: '药品性质',
                        rangeValue: '3'
                    },
                    {
                        rangeLabel: '手术级别代码',
                        rangeValue: '4'
                    },
                    {
                        rangeLabel: '诊断类型代码',
                        rangeValue: '5'
                    },
                    {
                        rangeLabel: '注册号',
                        rangeValue: '6'
                    },
                    {
                        rangeLabel: 'ABO血型代码表',
                        rangeValue: '7'
                    },
                    {
                        rangeLabel: '药物剂型代码表',
                        rangeValue: '8'
                    },
                    {
                        rangeLabel: '世界各国和地区名称代码',
                        rangeValue: '9'
                    },
                    {
                        rangeLabel: '处方类别代码',
                        rangeValue: '10'
                    },
                    {
                        rangeLabel: '联系电话类别代码',
                        rangeValue: '11'
                    }
                ],
                rangeValue: '',
                searchCriteriaItems: [
                    {
                        searchCriteriaLabel: '名称',
                        searchCriteriaValue: '0'
                    },
                    {
                        searchCriteriaLabel: '编码',
                        searchCriteriaValue: '1'
                    }
                ],
                searchCriteriaValue: '名称',
                isCriteria:false,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.tableHeight = window.innerHeight - (window.innerHeight * (11/100))-80-32-31;
                this.isShowCard = true;
                if(this.$route.params && this.$route.params.tableData && this.$route.params.tableData.length > 0){
                    this.tableData = this.$route.params.tableData;
                }else {
                    this.tableData = this.getTableList(null,null);
                }
                if(this.$route.params && this.$route.params.elementForm && this.$route.params.elementForm.elementCode){
                    this.addTableData(this.$route.params.elementForm,this.$route.params.operationType);
                }
            },

            addTableData(item,operationType){
                debugger
                var obj = {
                    code: item.elementCode,            //编码
                    name: item.elementName,            //名称
                    type: item.dataType,            //数据类型
                    nationalLogo: item.nationalLogo,   //国家数据元标识符
                    description:item.describe,//描述
                    fieldName:item.fieldName,//字段名称
                    dataLength:item.minDataLength+".."+item.maxDataLength,//长度范围
                    range:item.range,//值域
                    isRequired:item.delivery,//是否必填
                    standardSource:item.standardSource,//标准来源
                    englishName:item.englishName,//英文名称
                }
                if(operationType === 'add'){
                    var tableObject = this.tableData[this.tableData.length-1]
                    var newId=parseInt(tableObject.id) + 1;
                    obj.id = String(newId);
                    obj.isPosted='false';
                    this.tableData.push(obj);
                }else if(operationType === 'edit'){
                    for(var i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id == item.id){
                            this.tableData[i].code=item.elementCode,            //编码
                            this.tableData[i].name=item.elementName,            //名称
                            this.tableData[i].type= item.dataType,            //数据类型
                            this.tableData[i].nationalLogo= item.nationalLogo,   //国家数据元标识符
                            this.tableData[i].description=item.describe,//描述
                            this.tableData[i].fieldName=item.fieldName,//字段名称
                            this.tableData[i].dataLength=item.minDataLength+".."+item.maxDataLength,//长度范围
                            this.tableData[i].range=item.range,//值域
                            this.tableData[i].isRequired=item.delivery,//是否必填
                            this.tableData[i].standardSource=item.standardSource,//标准来源
                            this.tableData[i].englishName=item.englishName,//英文名称
                            this.tableData[i].id = item.id;
                            this.tableData[i].isPosted = item.isPosted;
                        }
                    }
                }
            },

            handleNodeClick(data, node) {
                this.currentNode = node
                this.currentData = data
                var tableDataList = [];
                if(data.label === "全部分类") {
                    tableDataList = this.getTableList('','');
                }else {
                    tableDataList = this.getChildrenTableList(data.label,null);
                }
                this.tableData = tableDataList;
            },

            resettingCriteria () {
                this.criteriaForm.elementCode="";
                this.criteriaForm.elementName="";
                this.criteriaForm.fieldName="";
                this.criteriaForm.dataType="";
                this.criteriaForm.range="";
            },

            getTableList(name,type){
                var tableData = [
                    {
                        id:"10000001",
                        code: 'DA157',            //编码
                        name: '统一社会信用代码',            //名称
                        isPosted: 'false',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"统一社会信用代码",//描述
                        fieldName:"UniSCID",//字段名称
                        dataLength:"18..18",//长度范围
                        range:'统一社会信用代码',//值域
                        isRequired:true//是否必填
                    },
                    {
                        id:"10000002",
                        code: 'DE02_01_005_01_01',            //编码
                        name: '出生日期',            //名称
                        isPosted: 'true',        //已发布
                        type: '日期型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"出生当天日期",//描述
                        fieldName:"LicType",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:true//是否必填
                    },
                    {
                        id:"10000003",
                        code: 'DE02_01_039_001',            //编码
                        name: '本人姓名',            //名称
                        isPosted: 'true',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"本人正在使用的姓名",//描述
                        fieldName:"LicType",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:true//是否必填
                    },
                    {
                        id:"10000004",
                        code: 'CT02_01_052_01',            //编码
                        name: '职业类别名称',            //名称
                        isPosted: 'false',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"职业类别名称",//描述
                        fieldName:"TESTCQ",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:false//是否必填 
                    },
                    {
                        id:"10000005",
                        code: 'DE01_00_014_01',            //编码
                        name: '住院号',            //名称
                        isPosted: 'true',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"住院编号",//描述
                        fieldName:"字符型",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:false//是否必填
                    }
                ];
                return tableData;
            },

            getChildrenTableList(name,type) {
                var tableData = null;
                if(name == "工商") {
                    var tableData =  [{
                        id:"10000001",
                        code: 'DA157',            //编码
                        name: '统一社会信用代码',            //名称
                        isPosted: 'false',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"统一社会信用代码",//描述
                        fieldName:"UniSCID",//字段名称
                        dataLength:"18..18",//长度范围
                        range:'统一社会信用代码',//值域
                        isRequired:true//是否必填
                    }];
                }else if(name == "质检") {
                    var tableData =  [{
                        id:"10000002",
                        code: 'DE02_01_005_01_01',            //编码
                        name: '出生日期',            //名称
                        isPosted: 'true',        //已发布
                        type: '日期型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"出生当天日期",//描述
                        fieldName:"LicType",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:true//是否必填
                    },
                    {
                        id:"10000005",
                        code: 'DE01_00_014_01',            //编码
                        name: '住院号',            //名称
                        isPosted: 'true',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"住院编号",//描述
                        fieldName:"字符型",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:false//是否必填
                    }];
                }
                else if(name == "其他") {
                    var tableData =  [{
                        id:"10000003",
                        code: 'DE02_01_039_001',            //编码
                        name: '本人姓名',            //名称
                        isPosted: 'true',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"本人正在使用的姓名",//描述
                        fieldName:"LicType",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:true//是否必填
                    },
                    {
                        id:"10000004",
                        code: 'CT02_01_052_01',            //编码
                        name: '职业类别名称',            //名称
                        isPosted: 'false',        //已发布
                        type: '字符型',            //数据类型
                        nationalLogo: '-',   //国家数据元标识符
                        description:"职业类别名称",//描述
                        fieldName:"TESTCQ",//字段名称
                        dataLength:"1..1",//长度范围
                        range:'',//值域
                        isRequired:false//是否必填 
                    }];
                }else{
                    tableData = [];
                }
                return tableData;
            },

            getTotal(){
                return this.tableData.length;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },

            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
            },

            /*高级检索*/
            advancedCriteria() {
                this.isCriteria = true;
                this.isNotDisplayInput = true;
                this.tableHeight = window.innerHeight - (window.innerHeight * (11/100))-80-32-24-50-81;
            },

            /*收起*/
            packUpCriteria() {
                this.isCriteria = false;
                this.isNotDisplayInput = false;
                this.tableHeight = window.innerHeight - (window.innerHeight * (11/100))-80-32-31;
            },

            getFocus(event) {
                event.currentTarget.placeholder = '';
                var placeholderByName = document.getElementsByClassName("nodeDialog");
            },

            loseFocus(event) {
                event.currentTarget.placeholder = this.placeholderNameOrCode;
            },

            loseFocusLeftTree() {
                event.currentTarget.placeholder = "搜索";
            },

            selectChange(event) {
                if(event == 0) {
                    this.placeholderNameOrCode = '请输入名称进行检索';
                }else {
                    this.placeholderNameOrCode = '请输入编码进行检索';
                }
            },

            renderContent(h, { node, data, store }) {
                if(node.data.label === "全部分类"){
                    return (
                            <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                                <div>
                                    <span>{node.label}</span>
                                </div>
                                <div>
                                    <span style="font-size: 16px;margin-left:5px;" on-click={ () => this.addNode(node,data) }><i class="el-icon-plus"></i></span>
                                </div>
                            </div>
                        );
                }else{
                    return (
                        <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                            <div>
                                <span>{node.label}</span>
                            </div>
                            <div>
                                <span style="font-size: 16px;margin-left:5px;" on-click={ () => this.addNode(node,data) }><i class="el-icon-plus"></i></span>
                                <span style="font-size: 16px;margin-left:5px;" on-click={ () => this.editNode(node,data) }><i class="el-icon-edit"></i></span>
                                <span style="font-size: 16px;margin-left:5px" on-click={ () => this.deleteNode(node, data) }><i class="el-icon-delete" ></i></span>
                            </div>
                        </div>
                    );
                }
            },

            /*获取DialogTitle名称*/
            getDialogTitle(){
                var nodeDialogTitle = document.getElementById('nodeDialog');
                if(this.treeChange === 'addNode'){
                    this.dialogTitle = "添加节点";
                }else if(this.treeChange === 'editNode'){
                    this.dialogTitle = "修改节点";
                }
            },

            addNode(node,data){
                this.treeChange='addNode';
                this.getDialogTitle();
                this.clearDialog();
                this.currentData=data;
                this.dialogVisible=true;
                
            },

            editNode(nodeData){
                this.treeChange='editNode';
                this.getDialogTitle();
                this.form.code=nodeData.data.code;
                this.form.name=nodeData.data.label;
                this.form.description=nodeData.data.description;
                this.currentData=nodeData;
                this.dialogVisible=true;
            },

            saveNode(){
                if(this.treeChange === 'addNode'){
                    var newChild = { code: this.form.code, label: this.form.name,description:this.form.description, children: [] };
                    if (!this.currentData.children) {
                        this.$set(this.currentData, 'children', []);
                    }
                    this.currentData.children.push(newChild);
                }else if(this.treeChange === 'editNode'){
                    this.currentData.code = this.form.code;
                    this.currentData.label = this.form.name;
                    this.currentData.description=this.form.description;
                }
                this.clearDialog();
            },

            clearDialog(){
                this.form.code = '';
                this.form.name = '';
                this.form.description='';
                this.dialogVisible=false;
            },

            deleteNode(node,data){
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$refs['tree'].remove(node);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });

                }).catch(() => {
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },

            /*点击中文名称连接出现抽屉*/
            diaplayDrawer(row, column, cell, event) {
                debugger
                this.isdrawer = true;
                this.rowData = row;
                this.listData = [
                    {
                        dataStandard: '投资项目基础信息',
                        elementType: '数据标准',
                        elementcode:'086ae42064dd495aefc5671e6cd749ca',
                        isStandard:true,
                    },
                    {
                        dataStandard: '行政许可基本信息 (物理表：XZXKJBXX)',
                        elementType: '	数据实体',
                        isStandard:false,
                    }
                ];
            },

            //关闭抽屉事件
            isNotDisplayDrawer(isDisplay){
                this.isdrawer = isDisplay;
            },

            /*新建数据元函数*/
            addDataElement(item){
                this.$router.push({
                    path: '/criterion/addelementlist',
                    query: { operateType: 'C', resource: item.alt, type: item.type ? item.type : 'jdbc',operationType:"add",tableData:this.tableData}
                });
            },

            /*编辑数据元函数*/
            editElement(dataRow){
                debugger
                var lengthArrt = dataRow.dataLength.split("..");
                this.$router.push({
                    path: '/criterion',
                    name:'addelementlist',
                    query: { operateType: 'C', 
                        form: {
                            id:dataRow.id,
                            elementCode: dataRow.code,//编码
                            elementName: dataRow.name,//中文名称
                            describe: dataRow.description,//描述
                            fieldName: dataRow.fieldName,//字段名称
                            englishName: dataRow.englishName,//英文名称
                            dataType: dataRow.type,//数据类型
                            minDataLength: lengthArrt[0],//最小长度
                            maxDataLength: lengthArrt[1],//最大长度
                            range: dataRow.range,//值域
                            delivery: dataRow.delivery,
                            standardSource: dataRow.standardSource,//标准来源
                            nationalLogo: dataRow.nationalLogo,//国家数据元标识符
                            nomenclature: dataRow.nomenclature,//业务术语
                            isPosted:dataRow.isPosted,//是否发布
                        },
                        operationType:"edit",
                        tableData:this.tableData
                    }
                });
            },

            /*删除数据元函数*/
            deleteElement(dataRow){
                this.tableData.splice(this.tableData.indexOf(dataRow), 1);
            },

            /*发布数据元*/
            releaseElement(dataRow){
                debugger
                this.isReleaseDataElement = true;
                this.releaseElementObject = dataRow;
                this.rowData = dataRow;
                this.dataElementForm = {
                    resourceContents:'',
                    resourceCode:dataRow.code,
                    resourceName:dataRow.name,
                    resourceDescription:dataRow.name,
                    resourceLabel:''
                };
            },

            /*取消发布*/
            canclePublish (dataRow) {
                debugger
                this.$confirm('确定取消发布?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dataRow.isPosted = 'false';
                    this.$message({
                        type: 'success',
                        message: '取消发布成功!'
                    });
                }).catch(() => { });
            },

            /*发布点击保存的时候触发该事件对表格数据进行刷新*/
            updateData (dataRow) {
                // debugger
                for(var i = 0; i < this.tableData.length; i++){
                    if(this.tableData[i].id == dataRow.id){
                        this.tableData[i].code = dataRow.code;
                        this.tableData[i].name = dataRow.name;
                        this.tableData[i].resourceContents = dataRow.resourceContents;
                        this.tableData[i].description = dataRow.description;
                        this.tableData[i].resourceLabel = dataRow.resourceLabel;
                        this.tableData[i].isPosted = dataRow.isPosted;
                    }
                }
            },

            //发布弹出框关闭事件
            isNotDisplayDialog(isDisplay){
                this.isReleaseDataElement = isDisplay;
            },

        }
    };
</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css">
</style>
<style>
    .data_tree .el-tree-node__content:hover{
        background-color:#e7e7e7 !important;
    }
    .dialogViewClass .el-dialog__body {
        padding: 0 20px;
    }
    .dialogViewClass .el-dialog__header {
        padding-top: 20px;
        padding-left: 20px;
        background-color: #f8f8f9;
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