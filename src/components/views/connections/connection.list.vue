<template>
    <el-container class="connect_data">
        <el-aside width="200px">
            <div class="left_data_tree">
                <el-scrollbar style="height:100%" class="tree_scroll">
                    <el-tree :data="data" ref="tree" :current-node-key="0" node-key="id" :props="defaultProps" @node-click="handleNodeClick" class="data_tree" :expand-on-click-node="false"></el-tree>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-main class="connection_main">
            <el-breadcrumb separator="/" class="breadcrumb_tree">
                <el-breadcrumb-item>连接管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="right_main_top">
                <div>
                    <el-button class="right_button" @click="connectionChoose">新建</el-button>
                </div>
                <div>
                    <el-input class="search-input-text" placeholder="搜索" @focus="getFocus" @blur="loseFocus" suffix-icon="el-icon-search" v-model="input"></el-input>
                </div>
            </div>
            <div class="right_main">
                <div class="data_table">
                    <el-table :data="tableData" v-if="isShowCard" :height="tableHeight" class="data_table_style" :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                        <el-table-column label="名称" prop="name" ></el-table-column>
                        <el-table-column label="类型" prop="altType" sortable ></el-table-column>
                        <el-table-column label="描述" prop="describe" sortable ></el-table-column>
                        <el-table-column label="修改时间" prop="date" ></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <div class="icon_data">
                                    <i class="el-icon-edit" @click="editConnection(scope.row)"></i>
                                    <i class="el-icon-delete" style="margin-left: 20px;" @click="deleteConnection(scope.row)"></i>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="data_pagination">
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="getTotal()"> 
                    </el-pagination>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        name: 'connectionlist',
        data() {
            return {
                input: '',
                isShowCard:false,
                tableHeight: 0,
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                tableData: this.getTableList(null,null),
                data: [
                    {
                        label: '全部连接',
                        disabled:true
                    },
                    {
                        label: '数据库',
                        children: [
                            {
                                label: 'Oracle'
                            },
                            {
                                label: 'MySQL'
                            },
                            {
                                label: 'SQL Azure'
                            },
                            {
                                label: 'SQL Server'
                            },
                            {
                                label: 'PostgreSQL'
                            },
                            {
                                label: '达梦数据库'
                            }
                        ]
                    },
                    {
                        label: '大数据',
                        children: [
                            {
                                label: 'Hive'
                            },
                            {
                                label: 'Hbase'
                            },
                            {
                                label: 'Hadoop'
                            },
                            {
                                label: 'Redis'
                            },
                            {
                                label: 'KafKa'
                            }
                        ]
                    },
                    {
                        label: '文件',
                        children: [
                            {
                                label: 'FTP'
                            },
                            {
                                label: 'SFTP'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.tableHeight = window.innerHeight - (window.innerHeight * (11/100))-80-32-24;
                this.isShowCard = true;
            },

            handleNodeClick(data) {
                debugger
                var tableDataList = [];
                if(data.label === "全部连接") {
                    tableDataList = this.getTableList(null,null);
                }else if (!data.children && data.$treeNodeId !== 1){
                    tableDataList = this.getChildrenTableList(data.label,null);
                }else if(data.children.length > 0){
                    return;
                }
                this.tableData = tableDataList;
            },

            getChildrenTableList(name,alt){
                debugger
                var tableDataOList = [];
                if(name == "Oracle") {
                    tableDataOList =  [{
                        name: '数据交换平台',
                        alt: 'oracle',
                        altType:'Oracle',
                        fit:'fill',
                        type:'jdbc',
                        describe: '数据交换平台',
                        date: '2018-09-11 10:16:44'
                    }];
                }else if(name == "MySQL") {
                    tableDataOList = [{
                        name: '国家法人交换库',
                        alt: 'mysql',
                        altType:'MySQL',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-09-21 20:56:20'
                    }];
                }else if(name == "SQL Server") {
                    tableDataOList = [{
                        name: '企业法人库',
                        alt: 'sqlserver',
                        altType:'SQL Server',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'SQL Server',
                        date: '2019-10-19 10:33:51'
                    }];
                }else if(name == "达梦数据库") {
                    tableDataOList = [{
                        name: '公示同步库',
                        alt: 'dm',
                        altType:'DM',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'PostgreSQL',
                        date: '2019-10-19 10:33:51'
                    }];
                }else if(name == "SQL Azure") {
                    tableDataOList = [{
                        name: '总局汇总库',
                        alt: 'auzre',
                        altType:'SQL Azure',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'SQL Azure',
                        date: '2019-10-19 10:33:51'
                    }];
                }else if(name == "Hive") {
                    tableDataOList = [{
                        name: '电子政务外网共享库',
                        alt: 'hive',
                        altType:'Hive',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-10-23 13:23:32'
                    }];
                }else if(name == "Hbase") {
                    tableDataOList =  [{
                        name: '辽宁省上报库',
                        alt: 'hbase',
                        altType:'Hbase',
                        fit:'fill',
                        type:'hbase',
                        describe: '',
                        date: '2019-10-24 08:52:17'
                    }];
                }else if(name == "Hadoop") {
                    tableDataOList = [{
                        name: '甘肃省轨迹库',
                        alt: 'hadoop',
                        altType:'Hadoop',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    }];
                }else if(name == "Redis") {
                    tableDataOList = [{
                        name: '辽宁省标准库',
                        alt: 'redis',
                        altType:'Redis',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    }];
                }else if(name == "FTP") {
                    tableDataOList = [{
                        name: '公示查询库',
                        alt: 'ftp',
                        altType:'FTP',
                        fit:'fill',
                        type:'ftp',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    }];
                }else {
                    tableDataOList = []
                }
                return tableDataOList;
            },

            getTableList(name,alt){
                var tableData =  [
                    {
                        name: '数据交换平台',
                        alt: 'oracle',
                        altType:'Oracle',
                        fit:'fill',
                        type:'jdbc',
                        describe: '数据交换平台',
                        date: '2018-09-11 10:16:44'
                    }, 
                    {
                        name: '国家法人交换库',
                        alt: 'mysql',
                        altType:'MySQL',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-09-21 20:56:20'
                    },
                    {
                        name: '企业法人库',
                        alt: 'sqlserver',
                        altType:'SQL Server',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'SQL Server',
                        date: '2019-10-19 10:33:51'
                    },
                    {
                        name: '公示同步库',
                        alt: 'dm',
                        altType:'DM',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'PostgreSQL',
                        date: '2019-10-19 10:33:51'
                    },
                    {
                        name: '总局汇总库',
                        alt: 'auzre',
                        altType:'SQL Azure',
                        fit:'fill',
                        type:'jdbc',
                        describe: 'SQL Azure',
                        date: '2019-10-19 10:33:51'
                    },
                    {
                        name: '电子政务外网共享库',
                        alt: 'hive',
                        altType:'Hive',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-10-23 13:23:32'
                    },
                    {
                        name: '辽宁省上报库',
                        alt: 'hbase',
                        altType:'Hbase',
                        fit:'fill',
                        type:'hbase',
                        describe: '',
                        date: '2019-10-24 08:52:17'
                    },
                    {
                        name: '甘肃省轨迹库',
                        alt: 'hadoop',
                        altType:'Hadoop',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    },
                    {
                        name: '辽宁省标准库',
                        alt: 'redis',
                        altType:'Redis',
                        fit:'fill',
                        type:'jdbc',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    },
                    {
                        name: '公示查询库',
                        alt: 'FTP',
                        altType:'FTP',
                        fit:'fill',
                        type:'ftp',
                        describe: '',
                        date: '2019-11-03 18:32:12'
                    }
                ];
                return tableData;
            },

            getTotal(){
                return this.tableData.length;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },

            connectionChoose(){
                this.$router.push({
                    path: '/connection/choose',
                    query: { operateType: 'C' }
                });
            },

            getFocus(event){
                event.currentTarget.placeholder = '';
            },

            loseFocus(event){
                event.currentTarget.placeholder = '搜索';
            },

            deleteConnection(dataRow){
                this.tableData.splice(this.tableData.indexOf(dataRow), 1);
            },

            editConnection (dataRow){
                debugger
                this.$router.push({
                    path: '/connection/edit',
                    query: { operateType: 'C',resource: dataRow.alt, type: dataRow.type ? dataRow.type : 'jdbc',
                        form: {
                            conntionName: dataRow.name,//连接名称
                            describle: dataRow.describe,//连接描述
                            driver: '',//驱动
                            conntionStr: '',//连接字符串
                            username: '',//用户名
                            password: '',//密码
                            isPool: false,//是否使用连接池
                            maxConn: null,//最大连接数
                            minConn: null,//最小连接数
                            timeout: null,//超时时间
                            freeTime: null,//空闲时间
                            testTime: null,//测试时间
                            increaseConn: null,//累增连接数
                            host: '',//主机地址
                            port: '',//端口
                            code: '',//编码
                            address: '',//地址
                        },
                    }
                });
            }

        }
    };
</script>
<style scoped>
    body {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
    .connect_data{
        overflow: hidden;
        height: 100%;
    }
    .el-main {
        background-color: #f8f8f9;
        width: 100%;
      
    }
    .left_data_tree {
        margin-top: 50%;
        height: 80%;
    }
    .right_main {
        width: 100%;
        background-color: #FFFFFF;
        border-bottom: 1px solid #e8e0e0;
    }
    .right_main_top {
        width: 100%;
        height: 9%;
        margin-right: 20px;
        float: right;
    }
    .right_main_top div {
        float: right;
    }
    .right_main_top .search-input-text {
        width: 412px;
        margin-top: 3%;
    }
    .right_main_top .search-input-text:hover {
        cursor: pointer;
    }
    .right_main_top .right_button {
        margin-left: 80px;
        margin-top: 8%;
        height: 30px;
        font-size: 14px;
        line-height: 6px;
        background-color: #0F84FF;
        color: #FFFFFF;
    }
    .right_main .data_table{
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
        margin-top: 1%;
        margin-left: 15px;
    }
    .icon_data i:hover{
        cursor: pointer;
    }
    /*面包屑*/
    .breadcrumb_tree {
        font-size: 16px;
        line-height: 1;
        padding-bottom: 1%;
    }
</style>
<style>
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
    .data_tree .el-tree-node__content:hover{
        background-color:#e7e7e7 !important;
    } 
    .search-input-text .el-input__inner {
        height: 34px;
    }
    .search-input-text .el-input__icon:hover {
        color:#202020;
    }
</style>