<template>
    

    <el-container style="height:100%">
      <el-aside width="18%">
          <div class="categories_div">
                <span class="categories_span">分类列表</span>
            </div>
            <div>
                <el-input class="search-input-left" size="mini" placeholder="搜索"  @focus="getFocus" @blur="loseFocus" suffix-icon="el-icon-search" @keyup.native="search" v-model="input"></el-input>
            </div> 
          <div class="left_data_tree">
              <el-scrollbar  class="tree_scroll">
                  <el-tree ref="tree" class="data_tree" :data="data" :props="defaultProps"  node-key="id" @node-click="getTableDataByNode" :default-expanded-keys="['ALL']" :expand-on-click-node="false"  :render-content="renderContent"></el-tree>
              </el-scrollbar>
          </div>
       
      </el-aside>

      

      <el-main style="height:100%">

        <div style="float:top">
          <el-breadcrumb separator="/" class="breadcrumb_tree">
            <el-breadcrumb-item :to="{ path: '/dataCenterMenu' }">数据标准管理</el-breadcrumb-item>
            <el-breadcrumb-item>值域</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right_main" 
           style="padding-top:10px; height:90%">
            
            
          

              <el-dialog  title="添加节点"  :visible.sync="dialogVisible"  width="30%" >
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="编码" >
                            <el-input v-model="form.id"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="form.label"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                      <el-form-item>
                        <div v-if="treeChange==='addNode'">
                          <el-button type="primary" @click="addNode()">保存</el-button>
                          <el-button @click="dialogVisible = false">取消</el-button>
                        </div>
                        <div v-if="treeChange==='editNode'">
                          <el-button type="primary" @click="editNode()">保存</el-button>
                          <el-button @click="cancelAddOrEditNode()">取消</el-button>
                        </div> 
                            
                      </el-form-item>
                    </el-form>
              </el-dialog>
              <!-- 抽屉 -->
              <el-drawer :withHeader="false"
                        size="40%"
                        :show-close="false"
                        :visible.sync="drawer"
                        direction="rtl"
                        :before-close="handleClose">
                <modeldrawer :rowData="rowData"
                             :opreateFlag="opreateFlag"
                             @review="review"
                             :isShow="true"></modeldrawer>
              </el-drawer>
              <!-- 全屏 -->
              <el-dialog :visible.sync="dialogView"
                        width="80%">
                <modeldrawer :rowData="rowData"
                            :opreateFlag="opreateFlag"
                            @review="review"
                            :isShow="false"></modeldrawer>
              </el-dialog>
          
            <div class="data_table">

              <el-row v-if="advancedSearchFlag">
              <el-form ref="form" :model="form">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label-width="100px" label="编码">
                              <el-input size="mini" placeholder="请输入编码"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="中文名称" label-width="100px">
                              <el-input size="mini" placeholder="请输入中文名称"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="字段名称" label-width="100px">
                              <el-input size="mini" placeholder="请输入字段名称">请输入字段名称</el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label="数据类型" label-width="100px">
                              <el-select v-model="typeValue" placeholder="--请选择--" size="mini" style="width: 100%;">
                                  <el-option v-for="item in typeItems" :key="item.typeValue" :label="item.typeLabel" :value="item.typeValue"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="值域" size="mini" label-width="100px">
                              <el-select v-model="rangeValue" placeholder="--请选择--" style="width: 100%;">
                                  <el-option v-for="item in rangeItems" :key="item.rangeValue" :label="item.rangeLabel" :value="item.rangeValue"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item style="text-align: right;" label-width="100px">
                              <el-button type="primary" size="mini">查询</el-button>
                              <el-button size="mini">重置</el-button>
                              <a style="margin-left: 10px;cursor: pointer;" @click="advancedSearch">收起</a>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
          </el-row>
          <el-row style="margin-bottom: 8px;">
              <el-col :span="14">
                  
                
                  <el-dropdown>
                    <el-button type="primary" size="mini">
                      新建
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="newCode">值域代码</el-dropdown-item>
                        <el-dropdown-item @click.native="newRule">值域规则</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary" size="mini">
                      导入
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="review()">值域代码</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">值域代码（含扩展属性）</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">对照关系</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">值域规则</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary" size="mini">
                      下载模板
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="review()">值域代码</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">值域代码（含扩展属性）</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">对照关系</el-dropdown-item>
                        <el-dropdown-item @click.native="edit()">值域规则</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  
                  <el-button v-if="deleteRangesFlag" type="primary" size="mini"  @click="deleteRanges">删除</el-button>
              </el-col>
              
              <el-col :span="10" style="text-align:right;">
                  <el-button type="primary" style="display:inline-block" size="mini" @click="advancedSearch">高级检索</el-button>
                  
                  <div style="display:inline-block">
                      <el-input  class="input-with-select" size="mini" :placeholder="placeholderNameOrCode" @focus="getFocus" @blur="loseFocus" v-model="input" suffix-icon="el-icon-search" style="cursor: pointer;">
                          <el-select v-model="searchBy" slot="prepend" size="mini"  class="selectNameOrCode" style="width:100px;" >
                            <el-option value="code" label="编码"></el-option>
                            <el-option value="label" label="名称"></el-option>
                          </el-select>
                        </el-input>
                  </div>
              </el-col>
          </el-row>

            <el-table :height="tableHeight"  ref="multipleTable"  :data="currentTableData"  :default-sort = "{prop: 'code', order: 'descending'}" tooltip-effect="dark" style="width: 100%" @selection-change="checkEvent"  :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}">
                <el-table-column type="selection"  width="55"></el-table-column>
                <el-table-column prop="code" label="编码" :show-overflow-tooltip="true"  sortable width="350px"></el-table-column>
                <el-table-column prop="name" label="名称" :show-overflow-tooltip="true"  sortable width="300px">
                  <template slot-scope="scope">
                    <el-link type="primary" @click="openDrawer(scope.row)">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" sortable></el-table-column>
                <el-table-column prop="isPosted" label="已发布" style="width:100px">
                  <!-- <template slot-scope="scope" v-if="scope.row.isPosted">
                    <i class="el-icon-circle-check"></i>
                  </template> -->
                  <template slot-scope="scope">
                    <el-switch  v-model="scope.row.isPosted"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="standardRange" label="标准值域" style="width:200px">
                  <template slot-scope="scope">
                    <el-switch  v-model="scope.row.standardRange"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="enable" label="是否启用" style="width:200px">
                  <template slot-scope="scope">
                    <el-switch  v-model="scope.row.enable"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="source" label="来源" ></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                      <div class="icon_data">
                        <i class="el-icon-edit" @click="editRange(scope.row)"></i>
                        <i class="el-icon-delete" @click="deleteRange(scope.row)" style="margin-left: 20px;"></i>
                      </div>
                    </template>
                </el-table-column>
            </el-table>
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

      

    </el-container>
    
    
</template>

<script>
import { uuid } from '@/utils/util'
import modeldrawer from './range.view'


export default {
    name:'rangelist',
    components: { modeldrawer },
    data(){

        
        return{
          tableHeight:0,
          opreateFlag:0,
          placeholderNameOrCode:'请输入要搜索的编码',
          rowData: null,//传往modeldrawer组件的数据
         
          dialogView:false,//全屏查看值域的flag
          
          drawer:false,
          deleteRangesFlag:false,//删除range的按钮flag
          currentDeleteRanges:null,//要删除的值域记录
          currentTableData:null,//当前列表数据，用于根据不同树节点展示不同列表
          advancedSearchFlag:false,//高级搜索参考值
          searchBy:'code',//值域表搜索根据 code/name

          listSearch:false,

          input:'',//搜索树节点内容
          searchIndex: null,//暂定为搜索树节点索引值

          dialogVisible: false,//添加修改v-if关联值
          
          treeChange:'',//添加或修改树节点识别参数
          currentData:null,//当前Data为新增或修改data做准备
          currentNode:null,//为根据节点id添加值域做准备

          currentPage: 1, //初始页
          pagesize: 10,    //每页的数据
             
          data:[
            {
              id:'ALL',
              label:'全部分类',
              description:'这是一些描述',
              children: [
                  {
                      id:'liencese_FORMAL_CHI_RULE',
                      label:'工商',
                      description:'这是一些描述'
                  },
                  {
                        id:'CAR_LIENCESE_FORMAL_CHI_RULE',
                        label:'质检',
                        description:'这是一些描述'
                  },
                  {
                        id:'STUNO_FORMAL_CHI_RULE',
                        label:'食药监',
                        description:'这是一些描述'
                  },
                  {
                        id:'College_ENTRANCE_NO_RULE',
                        label:'其他',
                        description:'这是一些描述',
                        children:[
                            {
                                id:'PID_FORMAL_CHI_RULE',
                                label:'二级节点',
                                description:'这是一些描述'
                              
                            }
                        ]
                  },
              ]  
            }
          ],
          tableData:[
            {
              code:'PID_FORMAL_CHI_RULE',            //编码
              name:'身份证号编码规则',            //名称
              type:'代码',            //类型
              isPosted:true,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'国家',          //来源
              belong:'无',
              description:'身份证号编码规则身份证号编码规则身份证号编码规则身份证号编码规则',
              term:null,

            },
            {
              code:'liencese_FORMAL_CHI_RULE',            //编码
              name:'车牌号编码规则',            //名称
              type:'代码',            //类型
              isPosted:false,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'国家',          //来源
              belong:'无',
              description:'车牌号编码规则车牌号编码规则车牌号编码规则车牌号编码规则',
              term:null,

            },
            {
              code:'STUNO_FORMAL_CHI_RULE',            //编码
              name:'学号编码规则',            //名称
              type:'代码',            //类型
              isPosted:true,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'教育局',          //来源
              belong:'无',
              description:'学号编码规则学号编码规则学号编码规则学号编码规则',
              term:null,

            },
            {
              code:'College_ENTRANCE_NO_RULE',            //编码
              name:'高考考生号规则',            //名称
              type:'代码',            //类型
              isPosted:false,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'教育部',          //来源
              belong:'无',
              description:'高考考生号规则高考考生号规则高考考生号规则高考考生号规则高考考生号规则高考考生号规则高考考生号规则',
              term:null,


            },
            {
              code:'College_ENTRANCE_NO_RULE',            //编码
              name:'高考考生号规则',            //名称
              type:'代码',            //类型
              isPosted:true,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'教育部',          //来源
              belong:'无',
              description:'高考考生号规则高考考生号规则高考考生号规则',
              term:null,


            },
            {
              code:'College_ENTRANCE_NO_RULE',            //编码
              name:'高考考生号规则',            //名称
              type:'规则',            //类型
              isPosted:true,        //已发布
              standardRange:true,   //标准值域
              enable:true,          //启用
              source:'教育部',          //来源
              belong:'无',
              description:'高考考生号规则高考考生号规则高考考生号规则高考考生号规则',
              term:null,

            }
          ],
          form:{
              id:'',
              label:'',
              description:''
          },
           defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
    },
    
    mounted (){
      this.getCurrentTableData();
    },
    created(){

      
    },
    computed: {
    　　tableDataEnable() {
    　　　　return this.tableData[0].enable;
    　　}
    },
    watch: {
          // 搜索框中内容变化，重置当前搜索结果的索引值
          Input: function () {
              this.searchIndex = null
          },
          searchBy:function(newValue,oldValue){
            console.log(newValue);
            console.log(oldValue);
            
          },
         
          tableDataEnable:function(newValue,oldValue){
            console.log(newValue);
          },
          searchBy:function(newValue,oldValue){
            let suf=newValue=='code'?'编码':'名称';
            this.placeholderNameOrCode="请输入要搜索的"+suf;
          },
      },
    beforeMount(){
      this.init()
    },  

    methods: {

      init () {
          
          this.tableHeight = window.innerHeight - (window.innerHeight * (11/100))-80-32-29;
          this.isShowCard = true;
      },
    
      addNode(){
        
         
         const newChild = { id: this.form.id, label: this.form.label,description:this.form.description, children: [] };

          if (!this.currentData.children) {
           
            this.$set(this.currentData, 'children', []);

          }

          this.currentData.children.push(newChild);
         
         this.cancelAddOrEditNode();

      },
      cancelAddOrEditNode(){
          this.form.id = '';
          this.form.label = '';
          this.form.description='';
          this.dialogVisible=false;
      },
      editNode(){
        

        this.currentData.id=this.form.id;
        this.currentData.label=this.form.label;
        this.currentData.description=this.form.description;
        
        this.cancelAddOrEditNode();
      },

      prepareAdd(data){
        
         console.log('data==>',data)
         this.currentData=data;
         this.form.id=uuid()
         this.dialogVisible=true;
         this.treeChange='addNode';
      },
      prepareEdit(data){
      
        this.form.id=data.id;
        this.form.label=data.label;
        this.form.description=data.description;
        this.treeChange='editNode';
        this.currentData=data;
        this.dialogVisible=true;
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        
      },

      // remove(node, data) {
        
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      // },
      
      deleteConfirm(node, data) {
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

      renderContent(h, { node, data, store }) {
          if(node.data.label === "全部分类"){
            return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                        <span>
                        <span>{node.label}</span>
                        </span>
                        <span>
                        <span style="font-size: 16px;" type="text" on-click={ () => this.prepareAdd(data) }><i class="el-icon-plus"></i></span>
                        </span>
                    </span>);
          }else{
            return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                        <span>
                        <span>{node.label}</span>
                        </span>
                        <span>
                        <span style="font-size: 16px;" type="text" on-click={ () => this.prepareAdd(data) }><i class="el-icon-plus"></i></span>&nbsp;
                        <span style="font-size: 16px;" type="text" on-click={ () => this.prepareEdit(data) }><i class="el-icon-edit"></i></span>&nbsp;
                        <span  style="font-size: 16px;" type="text" on-click={ () => this.deleteConfirm(node, data) }><i class="el-icon-delete"></i></span>&nbsp;
                        
                        </span>
                    </span>);
          }
       
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getFocus(event){
        debugger;
        event.currentTarget.placeholder = '';
      },
      loseFocus(event){
        debugger;
        event.currentTarget.placeholder = '';
     },
      serch(){

      },
      advancedSearch(){
        this.advancedSearchFlag=!this.advancedSearchFlag;
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
      },

      handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
      },
      getTotal(){
                return this.tableData.length;
      },
      getTableDataByNode(data,node){
        
        
        let ids=new Set();
        this.getChildNode(ids,node);
        
        if(ids.size>0){
          let codes=Array.from(ids);
          console.log(codes);
          let newTableData=[];
          this.tableData.forEach(function(item,index){
            if(ids.has(item.code)){
              console.log(item);
              newTableData.push(item);
            }
          });
          this.currentTableData=newTableData;
        }




      },
      getChildNode(ids,node){
        ids.add(node.data.id);
        let children=node.childNodes;
        console.log("digui");
        if(children.length===0){
          
          console.log(111);
          return;
        }else{
          for(let i=0;i<children.length;i++){
            console.log(children[i].data.id);
            ids.add(children[i].data.id);
            this.getChildNode(ids,children[i]);
            
          }

          
        }
      },
      getCurrentTableData(){
        this.currentTableData= this.tableData;
      },
      checkEvent(val){
        
        this.currentDeleteRanges=val;
        this.deleteRangesFlag=true;

      },
      deleteRanges(){
        if(this.currentDeleteRanges && this.currentDeleteRanges.length>0){
            for(const item of this.currentDeleteRanges){
              this.tableData.splice(this.tableData.indexOf(item),1)
            }
        }
       
        this.deleteRangesFlag=false;
      },
       deleteRange(val){
        
              this.tableData.splice(this.tableData.indexOf(val),1);
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.deleteRangesFlag=false;
      },
      openDrawer (row) {
        
        
        if(row.type=='代码'){
          this.opreateFlag=3
        }
        if(row.type=='规则'){
          this.opreateFlag=4
        }
        this.drawer = true
        this.rowData = row
        
      },
      
      review () {
      this.dialogView = true
      },
      
      
      editRange (range) {
        if(range.type=='代码'){
          this.opreateFlag=3
        }else{
          this.opreateFlag=4
        }
        
        this.toOpreate(range)

       
      },
      
      newCode(){
        this.opreateFlag=1
        
        this.toOpreate(null)
      },
      newRule(){
        this.opreateFlag=2
        
        this.toOpreate(null)
      },

      toOpreate(range){
        let requiredData=[];
        requiredData.push(this.opreateFlag);
        if(range==null){
             this.$router.push({
                path: '/criterion/range/opreate',
                query: { requiredData: requiredData }
            })

        }else{
            requiredData.push(range);
            this.$router.push({
                path: '/criterion/range/opreate',
                query: { requiredData: requiredData }
            })
        }

      },


      handleClose(done) {
        
            done();
         
      },




    }
  };

</script>
<style scoped src="../../../../../static/css/dataelement/dataelement.css">
</style>
<style scoped>
    body {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
  
    .el-main {
      background-color: #f8f8f9;
      width: 100%;
      height: 100%;
    }
    .left_data_tree {
      margin: 50px 0 0 0;
      
      height: 780px;
      width: 100%;
    }
    .right_main {
      width: 100%;
      
      background-color: #FFFFFF;
      border-bottom: 1px solid #e8e0e0;
    }
    .right_main_top {
      width: 100%;
      height: 80px;
      margin-right: 20px;
      float: right;
    }
    .right_main_top div {
      float: right;
    }
    .right_main_top .search-input-text {
      width: 412px;
      margin-top: 20px;
      height: 36px;
    }
    .right_main_top .search-input-text:hover {
      cursor: pointer;
    }
    .right_main_top .right_buttom {
      margin-left: 80px;
      margin-top: 20px;
      background-color: #0F84FF;
      color: #FFFFFF;
      border: 0px;
    }
    .right_main .data_table{
      width: 97%;
      margin-left: 30px;
      
    }
    .data_pagination div {
      display: block;
      float: right;
    }
    .data_pagination {
      width: 97%;
      margin-top: 10px;
      margin-left: 15px;
    }
    .icon_data i:hover{
      cursor: pointer;
    }
    .tree{
      overflow-y: hidden;
      overflow-x: scroll;
      width:100%;
      height: 100%;
  }
 .el-tree {
     min-width: 100%;
     display:inline-block !important;
 }
  </style>
  <style>
   .search-input-left .el-input__icon:hover {
        color:#202020;
    }
    .search-input-right{
      width: 50%;
      margin-right: 6%;
      cursor: pointer;
    }
    .tree_scroll .el-scrollbar__wrap{
        overflow-x:visible;
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
  *::-webkit-scrollbar {
    width: 4px;
    height: 0px;
    border: 0;
  }
  /* .el-tree-node:focus > .el-tree-node__content {
    background-color:#e7e7e7 !important;
  } */
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