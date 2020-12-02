<template>
    <div style="overflow: hidden;">
        <el-container>
            <el-aside width="20%" style="background-color: #FFFFFF;border-right: 1px solid rgb(214, 218, 216);">
                <div style="margin-top: 2%;margin-left: 3%;">
                    <span style="line-height: 30px;">分类列表</span>
                </div>
                <div>
                    <el-input v-model="searchInput" size="mini" placeholder="搜索" @focus="getFocus" @blur="loseFocus" suffix-icon="el-icon-search" style="width: 88%;margin-top: 4%;cursor: pointer;margin-left: 3%;"></el-input>
                </div>
                <div>
                    <el-scrollbar style="height:100%;width: 100%;" class="tree_scroll">
                        <el-tree :data="data" ref="tree" :current-node-key="0" node-key="id" :props="defaultProps" :expand-on-click-node="false"
                        @node-click="handleNodeClick" class="data_tree" style="margin-top: 2%;margin-left: 3%;" ></el-tree>
                    </el-scrollbar>
                </div>
            </el-aside>
            <el-main style="width: 80%;">
                <div>
                    <div class="main_criteria">
                        <el-input v-model="searchInput1" placeholder="搜索" @focus="getFocus" @blur="loseFocus" size="mini" suffix-icon="el-icon-search" style="cursor: pointer;"></el-input>
                    </div>
                    <div class="data_table" style="margin-top:2%;overflow-y: auto;">
                        <el-table :data="tableData" v-if="isShowTable" :height="tableHeight" class="data_table_style" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                            <el-table-column label="名称" prop="name" sortable :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="描述" prop="describe" sortable :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <a style="margin-left: 10px;cursor: pointer;color: #409eff" @click="chooseNomenclature(scope.row)">选择</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="data_pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]" 
                        :page-size="pagesize"         
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="getTotal()" style="text-align: right;"> 
                    </el-pagination>
                </div>
             </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: 'fullscreenview',
        data() {
            return {
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                searchInput:'',
                searchInput1:'',
                isShowTable:false,
                tableHeight: 0,
                tableData: this.getTableList(null,null),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                data: [
                    {
                        label: '全部分类',
                        disabled:true,
                        children:[
                            {
                                label: '词汇表',
                                children: [
                                    {
                                        label: '卫生业务术语'
                                    },
                                    {
                                        label: '公安业务术语'
                                    },
                                    {
                                        label: '工商业务术语'
                                    }
                                ]
                            },
                            {
                                label: '建筑'
                            }
                        ]
                    },
                ],
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.tableHeight = window.innerHeight - (window.innerHeight * (32/100))-32;
                this.isShowTable = true;
            },

            getFocus(event) {
                event.currentTarget.placeholder = '';
            },

            loseFocus() {
                event.currentTarget.placeholder = "搜索";
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },

            getTotal(){
                return this.tableData.length;
            },

            chooseNomenclature(dataRow) {
                this.$emit("chooseNomenclature",dataRow);
            },

            handleNodeClick(data) {
                var tableDataList = [];
                if(data.label === "全部分类") {
                    tableDataList = this.getTableList(null,null);
                }else if (!data.children && data.$treeNodeId !== 1){
                    tableDataList = this.getChildrenTableList(data.label,null);
                }else if(data.label == "词汇表"){
                    tableDataList = this.getTableList(null,null);
                }else {
                    tableDataList = [];
                }
                this.tableData = tableDataList;
            },

            getTableList(name,type){
                var tableData =  [
                    {
                        name: '出院时症状与体征',
                        describe: '患者出院时症状与体征的详细描述'
                    }, 
                    {
                        name: '出院情况',
                        describe: '对患者出院情况的详细描述'
                    },
                    {
                        name: '曾用名',
                        describe: '曾经在户籍管理部门正式登记注册、人事档案中正式记载的姓氏名称'
                    },
                    {
                        name: '服务处所',
                        describe: '服务的场所、单位名称'
                    },
                    {
                        name: '公民身份号码',
                        describe: '赋码机关为每个公民给出的唯一的、终身不变的法定标识号码'
                    },
                    {
                        name: '兼营范围',
                        describe: '企业主营范围之外经营的产品和服务项目。'
                    },
                    {
                        name: '一般经营项目',
                        describe: '企业在登记注册前不需经有关部门批准，依法直接向企事业登记机关申请登记的经营项目，一个企业可以有多个一般经营项目。'
                    }
                ];
                return tableData;
            },

            getChildrenTableList(name,type){
                var tableData = null;
                if(name == "卫生业务术语") {
                    var tableData =  [{
                        name: '出院时症状与体征',
                        describe: '患者出院时症状与体征的详细描述'
                    },
                    {
                        name: '出院情况',
                        describe: '对患者出院情况的详细描述'
                    }];
                }else if(name == "公安业务术语") {
                    var tableData =  [{
                        name: '曾用名',
                        describe: '曾经在户籍管理部门正式登记注册、人事档案中正式记载的姓氏名称'
                    },
                    {
                        name: '服务处所',
                        describe: '服务的场所、单位名称'
                    },
                    {
                        name: '公民身份号码',
                        describe: '赋码机关为每个公民给出的唯一的、终身不变的法定标识号码'
                    }];
                }else if(name == "工商业务术语") {
                    var tableData =  [{
                        name: '兼营范围',
                        describe: '企业主营范围之外经营的产品和服务项目。'
                    },
                    {
                        name: '一般经营项目',
                        describe: '企业在登记注册前不需经有关部门批准，依法直接向企事业登记机关申请登记的经营项目，一个企业可以有多个一般经营项目。'
                    }];
                }else {
                    tableData = []
                }
                return tableData;
            },


        }
}
</script>
<style scoped>
    .tree{
        overflow-y: hidden;
        overflow-x: auto;
        width:100%;
        height: 500px;
    }
    .el-tree {
        min-width: 90%;
        display:inline-block !important;
    }
</style>