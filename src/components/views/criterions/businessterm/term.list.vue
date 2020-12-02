<template>
  <el-container class="connect_data">
    <el-aside width="11%">
      <div id="nousediv"></div>
      <div class="divclass1">
        <span class="spancss1">
          <font size="4px" font-weight:bold>词汇表</font>
        </span>
        <el-button type="text" @click="open">
          <font size="4px">新建词汇表</font>
        </el-button>
        <el-dialog title :visible.sync="linkTree">
          <el-scrollbar class="tree_scroll">
            <el-tree
              :data="data"
              :props="defaultProps"
              node-key="id"
              :expand-on-click-node="false"
              @node-click="handleLinkNodeClick"
              :render-content="linkRenderContent"
            ></el-tree>
          </el-scrollbar>

          <div slot="footer" class="dialog-footer">
            <el-button @click="linkTree = false">取 消</el-button>
            <el-button type="primary" @click="linkConform">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title :visible.sync="dialogFormVisible">
          <el-form
            :model="form"
            size="mini"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称" prop="wordListName">
              <el-input v-model="form.wordListName" autocomplete="off" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescrible">
              <el-input
                type="textarea"
                v-model="form.wordListDescrible"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="conform">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title :visible.sync="dialogFormVisibleModify">
          <el-form
            :model="modifyForm"
            size="mini"
            status-icon
            :rules="rules"
            ref="modifyForm"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称d" prop="wordListNameModify">
              <el-input
                v-model="modifyForm.wordListNameModify"
                autocomplete="off"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescribleModify">
              <el-input
                type="textarea"
                v-model="modifyForm.wordListDescribleModify"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleModify = false">取 消</el-button>
            <el-button type="primary" @click="conformModify">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title :visible.sync="newItemClassdialogFormVisible">
          <el-form
            :model="icForm"
            size="mini"
            status-icon
            :rules="rules"
            ref="icForm"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称" prop="wordListName">
              <el-input v-model="icForm.wordListName" autocomplete="off" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescrible">
              <el-input
                type="textarea"
                v-model="icForm.wordListDescrible"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="newItemClassdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="newIcconform">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title :visible.sync="newBusinessdialogFormVisible">
          <el-form
            :model="ibcForm"
            size="mini"
            status-icon
            :rules="rules"
            ref="ibcForm"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称" prop="wordListName">
              <el-input v-model="ibcForm.wordListName" autocomplete="off" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescrible">
              <el-input
                type="textarea"
                v-model="ibcForm.wordListDescrible"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="newBusinessdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="newIbcconform">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title :visible.sync="modifyBusinessdialogFormVisible">
          <el-form
            :model="modifyBusinessForm"
            size="mini"
            status-icon
            :rules="rules"
            ref="modifyBusinessForm"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称d" prop="wordListNameModify">
              <el-input
                v-model="modifyBusinessForm.wordListNameModify"
                autocomplete="off"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescribleModify">
              <el-input
                type="textarea"
                v-model="modifyBusinessForm.wordListDescribleModify"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modifyBusinessdialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="conformModifyBusiness">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title :visible.sync="modifyItemClassdialogFormVisible">
          <el-form
            :model="modifyItemClassForm"
            size="mini"
            status-icon
            :rules="rules"
            ref="modifyItemClassForm"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item label="名称d" prop="wordListNameModify">
              <el-input
                v-model="modifyItemClassForm.wordListNameModify"
                autocomplete="off"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="wordListDescribleModify">
              <el-input
                type="textarea"
                v-model="modifyItemClassForm.wordListDescribleModify"
                autocomplete="off"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modifyItemClassdialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="conformModifyItemClass">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-divider></el-divider>
      <el-input placeholder="搜索" suffix-icon="el-icon-search" id="inputsearch"></el-input>
      <div class="left_data_tree">
        <el-scrollbar style="height:100%" class="tree_scroll">
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :render-content="renderContent"
          ></el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main width="88%">
      <div class="right_main_top" v-if="tableHeadContent">
        <div id="right_top">
          <div id="wordListName">
            <span v-if="assetClass=='词汇表'">
              <el-image
                :src="urlWord"
                style="width: 15px; height: 20px;float:left;margin-right:5px;margin-top:4px"
              ></el-image>
            </span>
            <span v-if="assetClass=='术语分类'">
              <el-image
                :src="urlItemClass"
                style="width: 15px; height: 20px;float:left;margin-right:5px;margin-top:4px"
              ></el-image>
            </span>
            <span>
              <font size="4px" font-weight:bold>{{itemName}}</font>
            </span>
          </div>
          <el-divider id="dividerone"></el-divider>
          <div id="text">
            <div id="assetClass">
              <span>
                <font size="2px">资产类型：</font>
              </span>

              <span v-if="assetClass=='词汇表'" style="margin-left:10px">
                <font size="2px">{{assetClass}}</font>&nbsp&nbsp&nbsp
              </span>
              <span v-else style="margin-left:10px">
                <font size="2px">{{assetClass}}</font>
              </span>
              <span style="margin-left:20px">
                <font size="2px">|</font>
              </span>
              <span style="margin-left:20px">
                <font size="2px">上次更新时间：</font>
              </span>
              <span style="margin-left:20px">
                <font size="2px">{{lastTiemUpdate}}</font>
              </span>
            </div>
            <div id="decribe">
              <span>
                <font size="2px">描述：</font>
              </span>
              <span style="margin-left:10px">
                <font size="2px">{{decribe}}</font>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showFinalTable">
        <div class="right_main_top">
          <div id="right_topTwo">
            <div id="finalWordListName">
              <span>
                <el-image
                  :src="urlBusiness"
                  style="width: 15px; height: 20px;float:left;margin-right:5px;margin-top:4px"
                ></el-image>
              </span>
              <span>
                <font size="4px" font-weight:bold>{{itemName}}</font>
              </span>
            </div>
            <el-divider id="finalDividerone"></el-divider>
            <div id="selectCard">
              <el-tabs v-model="activeName" @tab-click="selectCardHandleClick">
                <el-tab-pane label="概览" name="概览"></el-tab-pane>
                <el-tab-pane label="关联" name="关联"> <div id="nouseDivten">是浪费和三十六</div>
                 <div class="echartsGraph"  id="graph"></div></el-tab-pane>
              </el-tabs>
            </div>
            
            <div id="finalText" v-if="finalTextShow">
              <div id="assetClassTwo">
                <span>
                  <font size="2px">资产类型：</font>
                </span>

                <span v-if="assetClass=='词汇表'" style="margin-left:10px">
                  <font size="2px">{{assetClass}}</font>&nbsp&nbsp&nbsp
                </span>
                <span v-else style="margin-left:10px">
                  <font size="2px">{{assetClass}}</font>
                </span>
                <span style="margin-left:20px">
                  <font size="2px">|</font>
                </span>
                <span style="margin-left:20px">
                  <font size="2px">上次更新时间：</font>
                </span>
                <span style="margin-left:20px">
                  <font size="2px">{{lastTiemUpdate}}</font>
                </span>
              </div>
              <div id="decribeTwo">
                <span>
                  <font size="2px">描述：</font>
                </span>
                <span style="margin-left:10px">
                  <font size="2px">{{decribe}}</font>
                </span>
              </div>
            </div>
          </div>         
        </div>
       
  
        <div id="finalBusinessItem" v-if="showSpecialSynonyms">
          <font size="3px" font-weight:bold>同义词</font>
          <el-divider id="newDivider"></el-divider>
        </div>
        <div id="itemCountRecord" v-if="showSpecialSynonyms">
          <span style="margin-left:20px">
            <font size="2px">共搜索到{{linkTableData.length}}条记录</font>
          </span>
        </div>
        <div id="newButton" v-if="showSpecialSynonyms">
          <el-button class="right_buttom" @click="linkWord" type="primary" size="mini">关联</el-button>
        </div>

        <el-input
          v-if="showSpecialSynonyms"
          class="search-input-text"
          style="height:30px ;width:25%;float:right;margin-bottom:10px;margin-right:30px"
          size="mini"
          placeholder="请输入内容"
          @focus="getFocus"
          @blur="loseFocus"
          suffix-icon="el-icon-search"
          v-model="input"
        ></el-input>

        <div class="right_main" v-if="showSpecialSynonyms">
          <div class="data_table" id="synonymTable">
            <el-table
              :data="linkTableData"
              height="150"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0',height:'35px'}"
            >
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="描述" prop="describe"></el-table-column>
              <el-table-column label="修改时间" prop="date"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="disassociation(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="data_pagination" id="specialSynonym" v-if="showSpecialSynonyms">
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="getLinkTableTotal()"
            ></el-pagination>
          </div>
        </div>
        <div v-if="showLinkAssets">
          <div id="finalBusinessItemLink">
            <font size="3px" font-weight:bold>关联数据资产</font>
          </div>
          <el-divider id="finalItemDividerLink"></el-divider>
          <div id="itemCountRecordTwo">
            <span style="margin-left:20px">
              <font size="2px">共搜索到{{linkPropertyData.length}}条记录</font>
            </span>
          </div>

          <el-input
            class="search-input-text"
            style="height:30px ;width:25%;float:right;margin-bottom:10px;"
            placeholder="请输入内容"
            @focus="getFocus"
            @blur="loseFocus"
            suffix-icon="el-icon-search"
            v-model="input"
            size="mini"
          ></el-input>

          <div class="right_main_itemClass">
            <div class="data_table" id="itemClassTable">
              <el-table
                :data="linkPropertyData"
                height="150"
                :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0',height:'35px'}"
              >
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="描述" prop="describe"></el-table-column>
                <el-table-column label="修改时间" prop="date"></el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete" style="margin-left: 20px;"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="data_pagination" id="specialAsset">
            <div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="getTotal()"
              ></el-pagination>
            </div>
          </div>
        </div>
       
      </div>
      <div v-if="showItemTable">
        <div id="itemClass">
          <font size="3px">业务术语</font>
        </div>
        <el-divider id="divider"></el-divider>

        <div id="countRecord">
          <span style="margin-left:20px">
            <font size="2px">共搜索到{{tableBusinessItemData.length}}条记录</font>
          </span>
        </div>
        <div id="itemClassButton">
          <el-button
            class="right_buttom"
            @click="newItemBusinessClass"
            type="primary"
            size="mini"
          >新建</el-button>
        </div>

        <el-input
          class="search-input-text"
          placeholder="请输入内容"
          @focus="getFocus"
          @blur="loseFocus"
          suffix-icon="el-icon-search"
          v-model="input"
          style="height:30px ;width:25%;float:right;margin-bottom:10px;margin-right:20px"
          size="mini"
        ></el-input>

        <div class="right_main_itemClass">
          <div class="data_table" id="itemClassTable">
            <el-table
              :data="tableBusinessItemData"
              height="200"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
            >
              <el-table-column label="名称" prop="name" sortable></el-table-column>
              <el-table-column label="描述" prop="describe"></el-table-column>
              <el-table-column label="修改时间" prop="date"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="businessItemEdit(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="data_pagination">
          <div>
            <el-pagination
              id="specialItemClassTwo"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="getTotal()"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div v-if="showTable">
        <div id="itemClassTwo">
          <font size="3px" font-weight:bold>术语分类</font>
        </div>
        <el-divider id="dividerTwo"></el-divider>

        <div id="countRecordTwo">
          <span style="margin-left:20px">
            <font size="2px">共搜索到{{tableData.length}}条记录</font>
          </span>
        </div>
        <div id="itemClassButtonTwo">
          <el-button class="right_buttom" @click="newItemClass" type="primary" size="mini">新建</el-button>
        </div>

        <el-input
          class="search-input-text"
          placeholder="请输入内容"
          @focus="getFocus"
          @blur="loseFocus"
          suffix-icon="el-icon-search"
          v-model="input"
          style="height:30px ;width:25%;float:right;margin-bottom:10px;margin-right:20px"
          size="mini"
        ></el-input>

        <div class="right_main_itemClass">
          <div class="data_table" id="itemClassTable">
            <el-table
              :data="tableData"
              height="500"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
            >
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="描述" prop="describe" sortable></el-table-column>
              <el-table-column label="修改时间" prop="date"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="itemClassEdit(scope.row)"></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 20px;"
                    @click="deleteItemClassEdit(scope.row)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="data_pagination" id="specialPagination">
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="getTotal()"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div v-if="showTableTwo">
        <div id="itemClassThree">
          <font size="3px" font-weight:bold>术语分类</font>
        </div>
        <el-divider id="dividerThree"></el-divider>

        <div id="countRecordThree">
          <span style="margin-left:20px">
            <font size="2px">共搜索到{{tableData.length}}条记录</font>
          </span>
        </div>
        <div id="itemClassButtonThree">
          <el-button class="right_buttom" @click="newItemClass" type="primary" size="mini">新建</el-button>
        </div>

        <el-input
          class="search-input-text"
          placeholder="请输入内容"
          @focus="getFocus"
          @blur="loseFocus"
          suffix-icon="el-icon-search"
          v-model="input"
          style="height:30px ;width:25%;float:right;margin-bottom:10px;margin-right:20px"
          size="mini"
        ></el-input>

        <div class="right_main_itemClass">
          <div class="data_table" id="itemClassTable">
            <el-table
              :data="tableData"
              height="200"
              :header-cell-style="{background:'#f8f8f9',color:'#757377',padding:'0'}"
            >
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="描述" prop="describe" sortable></el-table-column>
              <el-table-column label="修改时间" prop="date"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="itemClassEdit(scope.row)"></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 20px;"
                    @click="deleteItemClassEdit(scope.row)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="data_pagination" id="specialTwoPagination">
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="getTotal()"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
  <script>
let treeId = 100;

 /* gph.style.display='none'; */
export default {
  name: "termlist",
  data() {
    return {
      input: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      tableData: /* this.getTableList(null,null) 术语分类的表数据*/ [],
      tableBusinessItemData: [] /*业务术语的表数据 */,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleModify: false,
      newItemClassdialogFormVisible: false,
      newBusinessdialogFormVisible: false,
      modifyBusinessdialogFormVisible: false,
      showGraph:false,
      finalTextShow: false,
      modifyItemClassdialogFormVisible: false,
      originalFormName: "",
      itemName: "",
      urlWord: "static/img/businessItem/word.png",
      urlBusiness: "static/img/businessItem/businessItem.png",
      urlItemClass: "static/img/businessItem/itemClass.png",
      assetClass: "",
      item: "",
      showTable: false,
      showItemTable: false,
      showFinalTable: false,
      tableHeadContent: false,
      showTableTwo: false,
      showSpecialSynonyms: false,
      showLinkAssets: false,
      linkTree: false,
      node: null,
      lastTiemUpdate: "",
      decribe: "",
      url: "static/img/businessItem/word.png",
      linkPropertyData: [],
      resultList: [],
      linkData: [],
      linkTableData: [],
      linkNode: null,
      originalRow: null,
      activeName: "概览",
      currentNodeData: null,
      form: {
        wordListDescrible: "",
        wordListName: ""
      },
      modifyForm: {
        wordListDescribleModify: "",
        wordListNameModify: ""
      },
      icForm: {
        wordListDescrible: "",
        wordListName: ""
      },
      ibcForm: {
        wordListDescrible: "",
        wordListName: ""
      },
      modifyBusinessForm: {
        wordListNameModify: "",
        wordListDescribleModify: ""
      },
      modifyItemClassForm: {
        wordListNameModify: "",
        wordListDescribleModify: ""
      },

      rules: {},
      wordListDec: [
        {
          wordlistName: "测试页面1",
          wordlistDecrible: "这是测试页面1的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 1
        },
        {
          wordlistName: "测试子页面1",
          wordlistDecrible: "这是测试子页面1的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 2
        },
        {
          wordlistName: "测试子页面2",
          wordlistDecrible: "这是测试子页面2的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 2
        },
        {
          wordlistName: "测试终子页面1",
          wordlistDecrible: "这是测试终子页面1的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 3
        },
        {
          wordlistName: "测试子子页面2",
          wordlistDecrible: "这是测试子子页面2的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 2
        },
        {
          wordlistName: "测试终子页面3",
          wordlistDecrible: "这是测试终子页面3的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 3
        },
        {
          wordlistName: "测试终子页面4",
          wordlistDecrible: "这是测试终子页面4的描述",
          wordlistDate: "2019-12-23 15:47:18",
          wordlistType: 3
        }
      ],
      formLabelWidth: "120px",
      data: [
        {
          id: 1,
          label: "测试页面1",
          children: [
            {
              id: 2,
              label: "测试子页面1",
              children: [
                {
                  id: 3,
                  label: "测试终子页面1"
                }
              ]
            },
            {
              id: 4,
              label: "测试子页面2",
              children: [
                {
                  id: 5,
                  label: "测试子子页面2",
                  children: []
                },
                {
                  id: 6,
                  label: "测试终子页面3"
                },
                {
                  id: 7,
                  label: "测试终子页面4"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleLinkNodeClick(data, node) {
      this.linkNode = node;
    },
    linkConform() {
      let linkNode = this.linkNode;
      let node = this.node;
      let linkData = this.linkData;
      let temp = {};
      let val = [];
      let flag = 0;
      let flagtwo = 0;

      if (linkNode.data.children) {
        this.$message({
          message: "请选择业务术语进行关联",
          type: "warning"
        });
        this.linkTree = true;
        return;
      } else if (node.data.label === linkNode.data.label) {
        this.$message({
          message: "自己无法和自己进行关联",
          type: "warning"
        });
        this.linkTree = true;
        return;
      } else {
        if (linkData) {
          for (let i = 0; i < linkData.length; i++) {
            if (linkData[i].name === node.data.label) {
              for (let j = 0; j < linkData[i].val.length; j++) {
                if (linkData[i].val[j] === linkNode.data.label) {
                  this.linkTree = false;

                  return;
                }
              }

              //走到这说明没有该节点中并没有对新节点进行关联，但是数据集中存在该节点，所以要添加值
              linkData[i].val.push(linkNode.data.label);
              flag = 1;
            }
          }

          //for循环都执行完了也没有发现该节点的存在，那么就新建该节点
          if (flag === 0) {
            temp = {};
            temp.name = node.data.label;
            val = [];
            val.push(linkNode.data.label);
            temp.val = val;
            linkData.push(temp);
          }

          //遍历该数据集去看有没有新节点的对象，如果没有，则新建，有的话就不用新建了，直接关联上即可
          for (let j = 0; j < linkData.length; j++) {
            if (linkData[j].name === linkNode.data.label) {
              linkData[j].val.push(node.data.label);
              flagtwo = 1;
            }
          }

          //如果没有则新建
          if (flagtwo === 0) {
            temp = {};
            temp.name = linkNode.data.label;
            val = [];
            val.push(node.data.label);
            temp.val = val;
            linkData.push(temp);
          }
        }

        flag = 0;
        flagtwo = 0;
        this.linkTableData = this.getLinkTableData(
          this.currentNodeData,
          null,
          null
        );
        this.$message({
          message: "关联成功",
          type: "success"
        });

        this.linkTree = false;
      }
    },
    disassociation(row) {
      this.$confirm("此操作将取消关联关系, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          let linkData = this.linkData;
          for (let i = 0; i < linkData.length; i++) {
            if (linkData[i].name === this.node.data.label) {
              for (let j = 0; j < linkData[i].val.length; j++) {
                if (linkData[i].val[j] === row.name) {
                  linkData[i].val.splice(j, 1);
                }
              }
            }
          }
          for (let i = 0; i < linkData.length; i++) {
            if (linkData[i].name === row.name) {
              for (let j = 0; j < linkData[i].val.length; j++) {
                if (linkData[i].val[j] === this.node.data.label) {
                  linkData[i].val.splice(j, 1);
                }
              }
            }
          }
          this.linkTableData = this.getLinkTableData(
            this.currentNodeData,
            null,
            null
          );
          this.$message({
            type: "success",
            message: "解除关联成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });

      /* 从linkData中删除关联数据 双向删除
           从linkTableData中删除数据*/
    },
    businessItemEdit(row) {
      this.originalRow = row;
      this.modifyBusinessForm.wordListNameModify = row.name;
      this.modifyBusinessForm.wordListDescribleModify = this.getDecByNodeName(
        row.name
      );
      this.modifyBusinessdialogFormVisible = true;
    },
    itemClassEdit(row) {
      this.originalRow = row;
      this.modifyItemClassForm.wordListNameModify = row.name;
      this.modifyItemClassForm.wordListDescribleModify = this.getDecByNodeName(
        row.name
      );
      this.modifyItemClassdialogFormVisible = true;
    },
    deleteItemClassEdit(row) {
      this.$confirm("此操作将永久删除该术语分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.deleteItemClassFormByNodeName(row.name);
          this.tableData = this.getTableList(this.node.data, null, null);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    selectCardHandleClick(tab, event) {
      if (tab.label === "关联") {
        this.finalTextShow = false;
        this.showSpecialSynonyms = false;
        this.showLinkAssets = false;
        this.showGraph=true;

      /*   gph.style.display='block'; */

        this.drawChart();
        console.log("走到着不了");

      } else if (tab.label === "概览") {
      /*   let divs=document.getElementById("nouseDivten");
        let graph=document.getElementById("graph");      
        if(divs!=null && graph!=null){
        divs.style.display="none";
        graph.style.display='none';
        } */
      
        this.finalTextShow = true;
        this.showSpecialSynonyms = true;
        this.showGraph=false;
        this.showLinkAssets = true;
      }
    },
    handleNodeClick(data, node) {
      console.log(node);
      this.node = node;
      this.itemName = data.label;
      if (data.children) {
      
        if (node.level && node.level === 1) {
            /* 
           let divs=document.getElementById("nouseDivten");
        let graph=document.getElementById("graph");      
        if(divs!=null && graph!=null){
        divs.style.display="none";
        graph.style.display='none';
        } */
          this.assetClass = "词汇表";
          this.tableData = this.getTableList(data, null, null);
          this.tableHeadContent = true;
          this.showTable = true;
          this.showItemTable = false;
          this.showGraph=false;
          this.showSpecialSynonyms = false;
          this.showLinkAssets = false;
          this.showTableTwo = false;
          this.showFinalTable = false;
        } else {
       /* let divs=document.getElementById("nouseDivten");
        let graph=document.getElementById("graph");      
        if(divs!=null && graph!=null){
        divs.style.display="none";
        graph.style.display='none';
        } */
          this.assetClass = "术语分类";
          this.showGraph=false;
          this.showTableTwo = true;
          this.showTable = false;
          this.tableHeadContent = true;
          this.showSpecialSynonyms = false;
          this.showLinkAssets = false;
          this.showItemTable = true;
          this.showFinalTable = false;
          this.tableBusinessItemData = this.getBusinessTableList(
            data,
            null,
            null
          );
          this.tableData = this.getTableList(data, null, null);
        }
        this.lastTiemUpdate = this.getDateByNodeName(data.label);
        this.decribe = this.getDecByNodeName(data.label);
      } else {
     /*    let divs=document.getElementById("nouseDivten");
        let graph=document.getElementById("graph");   
        console.log("divs");
        console.log(divs);
        console.log(graph);
        if(divs!=null && graph!=null){
        divs.style.display="none";
        graph.style.display='none';
        } */
        this.showGraph=false;
        this.node = node;
        this.currentNodeData = data;
        this.assetClass = "业务术语";
        this.activeName = "概览";
        this.finalTextShow = true;
        this.linkTableData = this.getLinkTableData(data, null, null);
        this.lastTiemUpdate = this.getDateByNodeName(data.label);
        this.decribe = this.getDecByNodeName(data.label);

        this.tableHeadContent = false;
        this.showTable = false;
        this.showTableTwo = false;
        this.showItemTable = false;
        this.showSpecialSynonyms = true;
        this.showLinkAssets = true;
        this.showFinalTable = true;
      }
    },
    getTableList(data, name, type) {
      let tableData = [];

      if (data.children && data.children.length != 0) {
        for (let i = 0; i < data.children.length; i++) {
          let type = this.getTypeByNodeName(data.children[i].label);
          if (type != 3) {
            let temp = {};
            temp.name = data.children[i].label;
            let decirbe = this.getDecByNodeName(data.children[i].label);
            temp.describe = decirbe;
            temp.date = this.getDateByNodeName(data.children[i].label);
            temp.type = this.getTypeByNodeName(data.children[i].label);
            tableData.push(temp);
          }
        }
      }
      return tableData;
    },
    getLinkTableData(data, name, type) {
      let linkData = this.linkData;

      let tableData = [];
      let nodeName;
      for (let i = 0; i < linkData.length; i++) {
        if (linkData[i].name === data.label) {
          for (let j = 0; j < linkData[i].val.length; j++) {
            nodeName = linkData[i].val[j];

            let describe = this.getDecByNodeName(nodeName);

            let date = this.getDateByNodeName(nodeName);
            let temp = {};
            temp.name = nodeName;
            temp.describe = describe;
            temp.date = date;
            tableData.push(temp);
          }
        }
      }
      return tableData;
    },
    getBusinessTableList(data, name, type) {
      let tableData = [];
      if (data.children && data.children.length != 0) {
        for (let i = 0; i < data.children.length; i++) {
          let type = this.getTypeByNodeName(data.children[i].label);
          if (type === 3) {
            let temp = {};
            temp.name = data.children[i].label;
            let decirbe = this.getDecByNodeName(data.children[i].label);
            temp.describe = decirbe;
            temp.date = this.getDateByNodeName(data.children[i].label);
            temp.type = this.getTypeByNodeName(data.children[i].label);
            tableData.push(temp);
          }
        }
      }
      return tableData;
    },

    getChildrenTableList(name, type) {
      var tableData = [
        {
          name: "子节点1",
          type: "oracle",
          describe: "学习oracle",
          date: "2016-05-02"
        },
        {
          name: "子节点2",
          type: "mysql",
          describe: "学习oracle",
          date: "2017-04-12"
        }
      ];
      return tableData;
    },
    getTotal() {
      return this.tableData.length;
    },
    getLinkTableTotal() {
      return this.linkTableData.length;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //点击第几页
    },
    connectionChoose() {
      this.$router.push({
        path: "/connection/choose",
        query: { operateType: "C" }
      });
    },
    getFocus(event) {
      event.currentTarget.placeholder = "";
    },
    loseFocus(event) {
      event.currentTarget.placeholder = "请输入内容";
    },
    renderContent(h, { node, data, store }) {
      if (node.level === 1) {
        return (
          <span style="flex: 1; display: flex; align-items: center;  font-size: 14px; padding-right: 8px;">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/word.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span style="margin-right:5px">
              <span>{node.label}</span>
            </span>
          </span>
        );
      } else if (node.data.children) {
        return (
          <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding:8px">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/itemClass.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span>
              <span style="margin-right:5px">{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 16px;"
                type="text"
                on-click={() => this.modify(node, data)}
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                style="font-size: 16px;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding:8px">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/businessItem.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span>
              <span style="margin-right:5px">{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 16px;"
                type="text"
                on-click={() => this.modify(node, data)}
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                style="font-size: 16px;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
          </span>
        );
      }
    },
    linkRenderContent(h, { node, data, store }) {
       if (node.level === 1) {
        return (
          <span style="flex: 1; display: flex; align-items: center;  font-size: 14px; padding-right: 8px;">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/word.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span style="margin-right:5px">
              <span>{node.label}</span>
            </span>
          </span>
        );
      } else if (node.data.children) {
        return (
          <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding:8px">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/itemClass.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span>
              <span style="margin-right:5px">{node.label}</span>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding:8px">
            <span style="margin-right:5px">
              <img
                src="static/img/businessItem/businessItem.png"
                width="15px"
                height="20px"
              ></img>
            </span>
            <span>
              <span style="margin-right:5px">{node.label}</span>
            </span>
          </span>
        );
      }
    },
    conform() {
      treeId++;
      this.data.push({
        id: treeId,
        label: this.form.wordListName,
        children: []
      });
      let date = this.getNowFormatDate();
      this.wordListDec.push({
        wordlistName: this.form.wordListName,
        wordlistDecrible: this.form.wordListDescrible,
        wordlistDate: date,
        wordlistType: 1
      });
      this.dialogFormVisible = false;
    },
    conformModify() {
      this.modifyFormByNodeName(this.originalFormName);
      if (this.tableData) {
        this.modifyTableDataByNodeName(this.originalFormName);
      }
      this.dialogFormVisible = false;
    },
    conformModifyBusiness() {
      this.modifyBusinessFormByNodeName(this.originalRow.name); //这里把wordListDesc中的数据改掉了
      /* 更新wordlistDesc,更新tableBusinessItemData,更新linkData,更新linkTableData */
      this.tableBusinessItemData = this.getBusinessTableList(
        this.node.data,
        null,
        null
      );
      this.modifyLinkData(this.originalRow.name);
      this.linkTableData = this.getLinkTableData(
        this.currentNodeData,
        null,
        null
      );
      this.modifyBusinessdialogFormVisible = false;
    },
    conformModifyItemClass() {
      this.modifyItemClassFormByNodeName(this.originalRow.name); //这里把wordListDesc中的数据改掉了
      /* 更新wordlistDesc,更新tableBusinessItemData,更新linkData,更新linkTableData */
      this.tableData = this.getTableList(this.node.data, null, null);

      this.modifyItemClassdialogFormVisible = false;
    },
    modifyLinkData(name) {
      let linkData = this.linkData;
      if (linkData) {
        for (let i = 0; i < linkData.length; i++) {
          if (linkData[i].name === name) {
            linkData[i].name = this.modifyBusinessForm.wordListNameModify;
          }
        }
        for (let i = 0; i < linkData.length; i++) {
          for (let j = 0; j < linkData.length; j++) {
            if (linkData[i].val[j] === name) {
              linkData[i].val[j] = this.modifyBusinessForm.wordListNameModify;
            }
          }
        }
      }
    },
    deleteLinkData(name) {
      let linkData = this.linkData;
      if (linkData) {
        for (let i = 0; i < linkData.length; i++) {
          if (linkData[i].name === name) {
            linkData.splice(i, 1);
          }
        }
        for (let i = 0; i < linkData.length; i++) {
          for (let j = 0; j < linkData.length; j++) {
            if (linkData[i].val[j] === name) {
              linkData[i].val.splice(j, 1);
            }
          }
        }
      }
    },
    newIcconform() {
      this.newIc(this.itemName, this.data);
      if (this.tableData) {
        this.newTableData();
      }
      this.newItemClassdialogFormVisible = false;
    },
    newIbcconform() {
      this.newIbc(this.itemName, this.data);
      if (this.tableBusinessItemData) {
        this.newBusinessItemData();
      }
      this.newBusinessdialogFormVisible = false;
    },
    open() {
      this.form.wordListName = "";
      this.form.wordListDescrible = "";
      this.dialogFormVisible = true;
    },
    newItemClass() {
      this.icForm.wordListName = "";
      this.icForm.wordListDescrible = "";
      this.newItemClassdialogFormVisible = true;
    },
    newItemBusinessClass() {
      this.ibcForm.wordListName = "";
      this.ibcForm.wordListDescrible = "";
      this.newBusinessdialogFormVisible = true;
    },

    modify(node, data) {
      if (!data.children) {
        this.node = node;
        this.currentNodeData = data;
        this.originalRow = data;
        this.originalRow.name = data.label;
        this.modifyBusinessForm.wordListNameModify = data.label;
        this.modifyBusinessForm.wordListDescribleModify = this.getDecByNodeName(
          data.label
        );
        this.modifyBusinessdialogFormVisible = true;
      } else {
        this.node = node;
        this.currentNodeData = data;
        this.originalRow = data;
        this.originalRow.name = data.label;
        this.modifyItemClassForm.wordListNameModify = data.label;
        this.modifyItemClassForm.wordListDescribleModify = this.getDecByNodeName(
          data.label
        );
        this.modifyItemClassdialogFormVisible = true;
      }
    },
    remove(node, data) {
      if (!data.children) {
        this.$confirm("此操作将永久删除该业务术语, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.deleteBusinessFormByNodeName(data.label);
            this.tableBusinessItemData = this.getBusinessTableList(
              node.data,
              null,
              null
            );
            this.deleteLinkData(data.label);
            this.linkTableData = this.getLinkTableData(data, null, null);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$confirm("此操作将永久删除该术语分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.deleteItemClassFormByNodeName(data.label);
            this.tableData = this.getTableList(node.data, null, null);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    prepareAdd(node, data) {},

    getDecByNodeName(nodeName) {
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName === nodeName) {
          return this.wordListDec[i].wordlistDecrible;
        }
      }
    },
    getDateByNodeName(nodeName) {
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName === nodeName) {
          return this.wordListDec[i].wordlistDate;
        }
      }
    },
    getTypeByNodeName(nodeName) {
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName === nodeName) {
          return this.wordListDec[i].wordlistType;
        }
      }
    },
    modifyFormByNodeName(nodeName) {
      this.modifyNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec[i].wordlistName = this.modifyForm.wordListNameModify;
          this.wordListDec[
            i
          ].wordlistDecrible = this.modifyForm.wordListDescribleModify;
          this.wordListDec[i].wordlistDate = this.getNowFormatDate();
        }
      }
      this.dialogFormVisibleModify = false;
    },
    modifyBusinessFormByNodeName(nodeName) {
      this.modifyNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec[
            i
          ].wordlistName = this.modifyBusinessForm.wordListNameModify;
          this.wordListDec[
            i
          ].wordlistDecrible = this.modifyBusinessForm.wordListDescribleModify;
          this.wordListDec[i].wordlistDate = this.getNowFormatDate();
        }
      }
      this.modifyBusinessdialogFormVisible = false;
    },
    modifyItemClassFormByNodeName(nodeName) {
      this.modifyItemClassNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec[
            i
          ].wordlistName = this.modifyItemClassForm.wordListNameModify;
          this.wordListDec[
            i
          ].wordlistDecrible = this.modifyItemClassForm.wordListDescribleModify;
          this.wordListDec[i].wordlistDate = this.getNowFormatDate();
        }
      }
      this.modifyItemClassdialogFormVisible = false;
    },
    deleteBusinessFormByNodeName(nodeName) {
      this.deleteNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec.splice(i, 1);
        }
      }
    },
    deleteItemClassFormByNodeName(nodeName) {
      this.deleteNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec.splice(i, 1);
        }
      }
    },
    deleteItemClassFormByNodeName(nodeName) {
      this.deleteNodeLabeByNodeName(nodeName, this.data);
      for (let i = 0; i < this.wordListDec.length; i++) {
        if (this.wordListDec[i].wordlistName == nodeName) {
          this.wordListDec.splice(i, 1);
        }
      }
    },
    newTableData() {
      let temp = {};
      temp.name = this.icForm.wordListName;
      temp.describe = this.icForm.wordListDescrible;
      temp.date = this.getNowFormatDate();

      this.tableData.push(temp);
    },
    newBusinessItemData() {
      let temp = {};
      temp.name = this.ibcForm.wordListName;
      temp.describe = this.ibcForm.wordListDescrible;

      temp.date = this.getNowFormatDate();

      this.tableBusinessItemData.push(temp);
    },

    modifyTableDataByNodeName(nodeName) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name == nodeName) {
          this.tableData[i].name = this.modifyForm.wordListNameModify;
          this.tableData[i].decirbe = this.modifyForm.wordListDescribleModify;
          this.tableData[i].date = this.getNowFormatDate();
        }
      }
      this.dialogFormVisibleModify = false;
    },
    modifyNodeLabeByNodeName(nodeName, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].label != "" && data[i].label === nodeName) {
          data[i].label = this.modifyBusinessForm.wordListNameModify;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length != 0) {
          this.modifyNodeLabeByNodeName(nodeName, data[i].children);
        }
      }
    },
    modifyItemClassNodeLabeByNodeName(nodeName, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].label != "" && data[i].label === nodeName) {
          data[i].label = this.modifyItemClassForm.wordListNameModify;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length != 0) {
          this.modifyItemClassNodeLabeByNodeName(nodeName, data[i].children);
        }
      }
    },

    deleteNodeLabeByNodeName(nodeName, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].label != "" && data[i].label === nodeName) {
          data.splice(i, 1);
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length != 0) {
          this.deleteNodeLabeByNodeName(nodeName, data[i].children);
        }
      }
    },

    newIc(nodeName, data) {
      treeId++;
      /*   let node=this.$refs.tree.getNode(this.itemName); */
      for (let i = 0; i < data.length; i++) {
        if (data[i].label != "" && data[i].label === this.itemName) {
          data[i].children.push({
            id: treeId,
            label: this.icForm.wordListName,
            children: []
          });
          let date = this.getNowFormatDate();
          this.wordListDec.push({
            wordlistName: this.icForm.wordListName,
            wordlistDecrible: this.icForm.wordListDescrible,
            wordlistDate: date,
            wordlistType: 2
          });
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length != 0) {
          this.newIc(nodeName, data[i].children);
        }
      }
    },
    newIbc(nodeName, data) {
      treeId++;
      /*   let node=this.$refs.tree.getNode(this.itemName); */
      for (let i = 0; i < data.length; i++) {
        if (data[i].label != "" && data[i].label === this.itemName) {
          data[i].children.push({
            id: treeId,
            label: this.ibcForm.wordListName
          });
          let date = this.getNowFormatDate();
          this.wordListDec.push({
            wordlistName: this.ibcForm.wordListName,
            wordlistDecrible: this.ibcForm.wordListDescrible,
            wordlistDate: date,
            wordlistType: 3
          });
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length != 0) {
          this.newIbc(nodeName, data[i].children);
        }
      }
    },
    getNowFormatDate() {
      //获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        seperator2 +
        minutes +
        seperator2 +
        seconds;
      return currentdate;
    },
    linkWord() {
      this.linkTree = true;
    },
    drawChart(){
// 基于准备好的dom，初始化echarts实例
           
      let myChart = this.$echarts.init(document.getElementById("graph"));
// 指定图表的配置项和数据
    let   option = {
    title: {
        text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    legend: {
        x: "center",
        show: false,
        data: ["夫妻", "战友", '亲戚']
    },
    series: [

        {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
                name: '夫妻',
                itemStyle: {
                    normal: {
                        color: "#009800",
                    }
                }
            }, {
                name: '战友',
                itemStyle: {
                    normal: {
                        color: "#4592FF",
                    }
                }
            }, {
                name: '亲戚',
                itemStyle: {
                    normal: {
                        color: "#3592F",
                    }
                }
            }],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: "{c}"
                }
            },
            data: [{
                name: '徐贱云',
                draggable: true,
            }, {
                name: '冯可梁',
                category: 1,
                draggable: true,
            }, {
                name: '邓志荣',
                category: 1,
                draggable: true,
            }, {
                name: '李荣庆',
                category: 1,
                draggable: true,
            }, {
                name: '郑志勇',
                category: 1,
                draggable: true,
            }, {
                name: '赵英杰',
                category: 1,
                draggable: true,
            }, {
                name: '王承军',
                category: 1,
                draggable: true,
            }, {
                name: '陈卫东',
                category: 1,
                draggable: true,
            }, {
                name: '邹劲松',
                category: 1,
                draggable: true,
            }, {
                name: '赵成',
                category: 1,
                draggable: true,
            }, {
                name: '陈现忠',
                category: 1,
                draggable: true,
            }, {
                name: '陶泳',
                category: 1,
                draggable: true,
            }, {
                name: '王德福',
                category: 1,
                draggable: true,
            }],
            links: [{
                source: 0,
                target: 1,
                category: 0,
                value: '夫妻'
            }, {
                source: 0,
                target: 2,
                value: '子女'
            }, {
                source: 0,
                target: 3,
                value: '夫妻'
            }, {
                source: 0,
                target: 4,
                value: '父母'
            }, {
                source: 1,
                target: 2,
                value: '表亲'
            }, {
                source: 0,
                target: 5,
                value: '朋友'
            }, {
                source: 4,
                target: 5,
                value: '朋友'
            }, {
                source: 2,
                target: 8,
                value: '叔叔'
            }, {
                source: 0,
                target: 12,
                value: '朋友'
            }, {
                source: 6,
                target: 11,
                value: '爱人'
            }, {
                source: 6,
                target: 3,
                value: '朋友'
            }, {
                source: 7,
                target: 5,
                value: '朋友'
            }, {
                source: 9,
                target: 10,
                value: '朋友'
            }, {
                source: 3,
                target: 10,
                value: '朋友'
            }, {
                source: 2,
                target: 11,
                value: '同学'
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                }
            }
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
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
.connect_data {
  overflow: hidden;
}
.el-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.left_data_tree {
  margin-top: 10px;
  height: 700px;
}
.right_main {
  width: 100%;
  height: 250px;
  background-color: #ffffff;
  border-bottom: 0px solid #e8e0e0;
}
.right_main_itemClass {
  width: 100%;
  height: 500px;
  margin-left: 25px;
  background-color: #ffffff;
  border-bottom: 0px solid #e8e0e0;
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
  width: 500px;
}
.right_main_top .search-input-text:hover {
  cursor: pointer;
}
.right_main_top .right_buttom {
  margin-left: 80px;
  background-color: #0f84ff;
  color: #ffffff;
  border: 0px;
}
.right_main .data_table {
  margin-top: 20px;
  width: 99%;
  margin-left: 25px;
  overflow-y: hidden;
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
</style>
  <style>
.tree_scroll .el-scrollbar__wrap {
  overflow-x: hidden;
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
.data_tree .el-tree-node__content:hover {
  background-color: #e7e7e7 !important;
}
.search-input-text .el-input__icon:hover {
  color: #202020;
}
.centercss {
  align-content: center;
}
.divclass1 {
  margin-left: 10px;
}
.spancss1 {
  margin-right: 20px;
}
.tree {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 80px;
  height: 500px;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
#nousediv {
  height: 50px;
}

#inputsearch {
  width: 90%;
  height: 25px;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 15px;
}
#right_top {
  float: left;
  margin-top: 20px;
  margin-left: 50px;
}
#right_topTwo {
  float: left;
  margin-top: 20px;
  margin-left: 50px;
}
#wordListName {
  float: left;
  margin-top: 0px;
  margin-left: 0px;
}
#dividerone {
  float: left;
  margin-top: 10px;
}
#divider {
  float: left;
  margin-left: 28px;
  margin-top: 25px;
}
#dividerTwo {
  float: left;
  margin-left: 28px;
  margin-top: 25px;
}
#dividerThree {
  float: left;
  margin-left: 28px;
  margin-top: 25px;
}
#assetClass {
  float: left;
  background: #f8f8f9;
}
#assetClassTwo {
  float: left;
  background: #f8f8f9;
}
#decribe {
  float: left;
  margin-top: 25px;
  margin-left: -430px;
}
#decribeTwo {
  float: left;
  margin-top: 25px;
  margin-left: -430px;
}
#text {
  margin-top: -10px;
  float: left;
  width: 1650px;
  background: #f8f8f9;
}
#itemClass {
  float: left;
  margin-left: 30px;
  margin-top: 60px;
}
#itemClassTwo {
  float: left;
  margin-left: 30px;
  margin-top: 60px;
}
#itemClassThree {
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}
#itemCountRecord {
  margin-left: 5px;
  width: 200px;
}
#itemCountRecordTwo {
  margin-left: 5px;
  width: 200px;
}
#countRecord {
  float: left;
  margin-left: 10px;
  margin-top: -5px;
}
#countRecordTwo {
  float: left;
  margin-left: 10px;
  margin-top: -5px;
}
#countRecordThree {
  float: left;
  margin-left: 10px;
  margin-top: -5px;
}
#businessItem {
  float: left;
  margin-left: 30px;
  margin-top: -35px;
}
#finalBusinessItem {
  float: left;
  margin-left: 30px;
  margin-top: 75px;
  margin-bottom: -10px;
}
#finalItemDividerLink {
  margin-left: 28px;
  margin-top: 100px;
}
#finalItemDivider {
  margin-left: 28px;
  margin-top: 200px;
}
#ItemSearch-input {
  float: left;
  margin-left: 1150px;
  margin-top: -40px;
  width: 450px;
}
#itemClassInput {
  float: left;
  margin-left: 1150px;
  margin-top: -40px;
  padding-bottom: 15px;

  width: 450px;
}
#newButton {
  float: right;
  margin-right: 60px;
  margin-top: 0px;
  width: 5px;
}
#itemClassButton {
  float: right;
  margin-right: 60px;
  margin-top: 0px;
  width: 5px;
}
#itemClassButtonTwo {
  float: right;
  margin-right: 60px;
  margin-top: 0px;
  width: 5px;
}
#itemClassButtonThree {
  float: right;
  margin-right: 60px;
  margin-top: 0px;
  width: 5px;
}
#selectCard {
  float: left;

  margin-top: 5px;
}
#finalWordListName {
  float: left;
  margin-top: 0px;
}
#finalDividerone {
  float: left;
  margin-top: -115px;
}
#finalText {
  background: #f8f8f9;
  width: 100%;
  float: left;
  margin-top: 0px;
  margin-left: 0px;
}
#newDivider {
  width: 1650px;
}
#finalBusinessItemLink {
  float: left;
  margin-left: 30px;
  margin-top: -50px;
}
#specialPagination {
  width: 97%;
  margin-top: 270px;
  margin-left: 15px;
}
#specialTwoPagination {
  width: 97%;
  margin-top: -160px;
  margin-left: 15px;
}
#specialSynonym {
  width: 97%;
  margin-top: -50px;
  margin-left: 15px;
}
#specialAsset {
  width: 97%;
  margin-top: -300px;
  margin-left: 15px;
}
#specialItemClassTwo {
  width: 97%;
  margin-top: -50px;
  margin-left: 15px;
}
#nouseDivten{
  height: 50px;
  margin-left: 200px;
}
.echartsGraph{
  height: 700px;
  margin-left: 25px;

}
</style>