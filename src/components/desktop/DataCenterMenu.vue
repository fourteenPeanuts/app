<template>
  <el-row>
    <div class="Box_warp bgImg"
         v-if="isShowBoxWarp"
         :style="'height:'+boxWarpHeight+'px;overflow:auto'">
      <div class="Bottom_warp">
        <el-row>
          <el-col :span="4">
            <div class="Content1_left">
              <ul class="Content1_left_ul">
                <li class="Content1_left_ul_active"
                    v-for="(li_object,index) in Content1_left_li_list"
                    :key="li_object.key"><a :id="forAId(index)"
                     @click="showDetails(index)">{{li_object.name}}<i class="el-icon-location-outline"></i></a></li>
              </ul>
            </div>
          </el-col>
          <el-col :span="20">
            <el-scrollbar style="height:100%"
                          class="tree_scroll">
              <div class="Content1_right">
                <div class="demo-input-suffix"
                     id="yyxt_center">
                  <el-input class="dialog-input-text"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-search"
                            v-model="input"
                            @focus="getFocus"
                            @blur="loseFocus">
                  </el-input>
                </div>
                <div class="Content_right">
                  <div class="Page1_row1"
                       :id="forDivId(index)"
                       style="display: block;"
                       v-for="(li_object,index) in Content1_left_li_list"
                       v-if="li_object.isDisplay">
                    <span class="Page1_row1_name">{{li_object.name}}</span>
                    <el-row v-for="row in listTemp(li_object.children)"
                            :key="row[0].key">
                      <el-col :span="4"
                              v-for="page_item_object in row"
                              :key="page_item_object[1].key"
                              class="page_item_col">
                        <router-link :to="page_item_object[1].url?page_item_object[1].url:'404'">
                          <div class="Page1_item">
                            <div class="Page1_item_style1_left">
                              <el-image style="width:90%"
                                        :src="page_item_object[1].image_url"></el-image>
                            </div>
                            <div class="Page1_item_style1_right">
                              <span id="Page1_item_style1_content">{{page_item_object[1].name}}</span>
                            </div>
                          </div>
                        </router-link>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>
<script>
export default {
  name: 'dataCenterMenu',
  data () {
    return {
      input: '',
      isShowBoxWarp: false,
      boxWarpHeight: 0,
      Content1_left_li_list: [
        { isDisplay: false, key: 'li_0', name: '全部服务' },
        {          isDisplay: true, key: 'li_1', name: '元数据管理',
          children: [
            { name: '元数据维护', image_url: "../static/img/main/001.png", key: "children_item_1", url: 'dataMeta' },
            { name: '元数据变更审计', image_url: "../static/img/main/002.png", key: "children_item_2" },
            { name: '元数据检索', image_url: "../static/img/main/003.png", key: "children_item_3" },
            { name: '元数据统计', image_url: "../static/img/main/004.png", key: "children_item_4" },
            { name: '元数据信息对比', image_url: "../static/img/main/005.png", key: "children_item_5" },
            { name: '元数据分析', image_url: "../static/img/main/006.png", key: "children_item_6" }
          ]
        },
        {          isDisplay: true, key: 'li_2', name: '数据连接',
          children: [
            { name: '连接管理', image_url: "../static/img/main/008.png", key: "children_item_8", url: 'connection/connectionlist' },
          ]
        },
        {          isDisplay: true, key: 'li_3', name: '数据标准管理',
          children: [
            { name: '业务术语', image_url: "../static/img/main/011.png", key: "children_item_11", url: 'criterion/businessterm/termlist' },
            { name: '值域', image_url: "../static/img/main/018.png", key: "children_item_12", url: 'criterion/range/rangelist' },

            { name: '数据元', image_url: "../static/img/main/013.png", key: "children_item_13", url: "criterion/dataelementlist" },
            { name: '数据模型', image_url: "../static/img/main/014.png", key: "children_item_14", url: "criterion/model/list" },
            { name: '数据标准', image_url: "../static/img/main/015.png", key: "children_item_15", url: "criterion/standarddatalist" }
          ]
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.boxWarpHeight = window.innerHeight - 40;
      this.isShowBoxWarp = true;
    },

    getFocus (event) {
      event.currentTarget.placeholder = '';
    },

    loseFocus (event) {
      event.currentTarget.placeholder = '请输入内容';
    },

    showDetails (num) {
      if (num === 0) {
        document.getElementById('yyxt_center').scrollIntoView();
      }
      document.getElementById(`yyxt_${num}`).scrollIntoView();
      var contentList = document.getElementsByClassName('Content1_left_ul_active');
      var i = 0;
      for (i; i < contentList.length; i++) {
        document.getElementById(`a_${i}`).style.background = 'transparent';
      }
      document.getElementById(`a_${num}`).style.background = '#0086B3';
    },

    forAId: function (index) {
      return "a_" + index;
    },

    forDivId: function (index) {
      return "yyxt_" + index;
    },

    isDisplay: function (index) {
      if (index === 0) {
        return false;
      } else {
        return true;
      }
    },

    listTemp: function (childrenList) {
      var list = childrenList;//得到的数据类型[{name:""},{name:""}]
      var arrTemp = [];
      var index = 0;
      var sectionCount = 6;
      var windowLength = (window.innerWidth - 300) / 6;
      if (windowLength < 200) {
        sectionCount--;
      }
      for (var i = 0; i < list.length; i++) {
        index = parseInt(i / sectionCount);
        if (arrTemp.length <= index) {
          arrTemp.push([]);
        }
        var objList = [];
        objList.push("childrenObj_" + 1);
        objList.push(list[i]);//将数据前加上key===> [[key,[{name:""}]],[key,[{name:""}]]]
        arrTemp[index].push(objList);
      }
      return arrTemp;
    }
  }
}
</script>
<style scoped src="../../../static/mytest.css">
</style>
<style>
.dialog-input-text .el-input__inner {
  background-color: transparent;
  border: 1px solid #686e7b;
}
.dialog-input-text .el-input__icon:hover {
  color: #202020;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 0px;
  border: 0;
  background: transparent;
}
*::-webkit-scrollbar-button {
  display: none;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: transparent;
}
*::-webkit-scrollbar-corner {
  background: transparent;
}
.Content1_right:hover::-webkit-scrollbar-thumb {
  background: #cccccc;
}
.Ct2_LCt_CT_content_ul:hover::-webkit-scrollbar-thumb {
  background: #cccccc;
}
.Ct2_LCt_CT_content_Rt_ul:hover::-webkit-scrollbar-thumb {
  background: #cccccc;
}
.Content2_bottom:hover::-webkit-scrollbar-thumb {
  background: #cccccc;
}
.bgImg {
  background-image: url(../../../static/img/pf_img5.jpg);
}
</style>
