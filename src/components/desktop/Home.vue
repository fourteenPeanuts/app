<template>
  <el-container class="Box_warp bgImg">
    <el-main class="
                Bottom_warp">
      <div class="Content">
        <div class="container-fluid Content2">
          <div class="Content2_bottom">
            <el-row :gutter="20">
              <el-col :span="6"
                      style="margin-top:16px;">
                <div class="taskClass">
                  <el-row :gutter="10"
                          style="height:120px;">
                    <el-col :span="12">
                      <div class="childTaskClass">
                        <div>
                          <span class="childText">异常任务数</span>
                        </div>
                        <div>
                          <h4 class="red">3</h4>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="childTaskClass">
                        <div>
                          <span class="childText">运行中任务数</span>
                        </div>
                        <div>
                          <h4 class="green">0</h4>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10"
                          style="height:120px;margin-bottom:10px;">
                    <el-col :span="12">
                      <div class="childTaskClass">
                        <div>
                          <span class="childText">完成任务数</span>
                        </div>
                        <div>
                          <h4 class="blue">15</h4>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="childTaskClass">
                        <div>
                          <span class="childText">未运行任务数</span>
                        </div>
                        <div>
                          <h4 class="white">0</h4>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="taskClass">
                  <div>
                    <p class="taskText">数据标准</p>
                  </div>
                  <div class="echartClass">
                    <div id="data_ruler"
                         class="box"
                         style="width:100%;height:100%;transform:rotate(0deg);z-index:50;"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="taskClass">
                  <div>
                    <p class="taskText">分类统计</p>
                  </div>
                  <div class="echartClass">
                    <div id="data_category"
                         class="box"
                         style="width:100%;height:100%;transform:rotate(0deg);z-index:50;"></div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- <el-col :span="6">
                <div class="chartClass">
                  <div>
                    <p class="taskText">数据交换量统计</p>
                  </div>
                  <div class="swapClass">
                    <div class="chart-icon"></div>
                    <div>
                      <div class="chart-num blue">5</div>
                      <div class="white">增量交换量</div>
                    </div>
                  </div>
                  <div class="swapClass">
                    <div class="total-icon"></div>
                    <div>
                      <div class="chart-num purple">185</div>
                      <div class="white">总交换量</div>
                    </div>
                  </div>
                </div>
              </el-col> -->
              <el-col :span="15">
                <div class="chartClass">
                  <div>
                    <p class="chartText">数据服务</p>
                  </div>
                  <div class="echartClass">
                    <div id="data_service"
                         class="box"
                         style="width:100%;height:100%;transform:rotate(0deg);z-index:50;"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="3"
                      style="margin-top:16px;">
                <div class="taskClass">
                  <el-row style="height:120px;">
                    <div class="childTaskClass">
                      <div>
                        <span class="childText">接口数</span>
                      </div>
                      <div>
                        <h4 class="green">23</h4>
                      </div>
                    </div>
                  </el-row>
                  <el-row style="height:120px;margin-top:10px;">
                    <div class="childTaskClass">
                      <div>
                        <span class="childText">用户数</span>
                      </div>
                      <div>
                        <h4 class="blue">2356</h4>
                      </div>
                    </div>
                  </el-row>
                </div>
              </el-col>
              <!-- <el-col :span="6">
                <div class="chartClass">
                  <div>
                    <p class="taskText">告警数</p>
                  </div>
                  <div class="swapClass">
                    <div class="alarm-icon"></div>
                    <div>
                      <div class="chart-num-lg red">5</div>
                    </div>
                  </div>
                  <div class="chart-remark white">告警数统计</div>
                </div>
              </el-col> -->
              <el-col :span="6">
                <div class="chartClass">
                  <div>
                    <p class="chartText">数据源统计</p>
                  </div>
                  <div class="echartClass">
                    <div id="data_resource"
                         class="box"
                         style="width:100%;height:100%;transform:rotate(0deg);z-index:50;"></div>

                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="chartClass">
                  <div>
                    <p class="chartText">数据质量</p>
                  </div>
                  <div class="echartClass">
                    <div id="data_quality"
                         class="box"
                         style="width:100%;height:100%;transform:rotate(0deg);z-index:50;"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="chartClass">
                  <div>
                    <p class="chartText">系统压力信息</p>
                  </div>
                  <div class="echartClass">
                    <div id="system_press"
                         class="box"
                         style="width:100%;height:80%;transform:rotate(0deg);z-index:50;"></div>
                    <el-row style="width:50%;margin:0 auto"
                            :gutter="20">
                      <el-col :span="8">
                        <span class="powderblue">cpu</span>&nbsp;
                        <span>11%</span>
                      </el-col>
                      <el-col :span="8">
                        <span class="powderblue">内存</span>&nbsp;
                        <span>94%</span>
                      </el-col>
                      <el-col :span="8">
                        <span class="powderblue">磁盘</span>&nbsp;
                        <span>18%</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="chartClass">
                  <div>
                    <p class="chartText">资源订阅排名</p>
                  </div>
                  <div class="echartClass">
                    <el-table class="Page2_item_news_ul"
                              :data="tabledata"
                              align="left">
                      <el-table-column prop="sort"
                                       width="50px"
                                       label="排名"></el-table-column>
                      <el-table-column prop="name"
                                       width="400px"
                                       label="名称"></el-table-column>
                      <el-table-column prop="subscriptionNum"
                                       label="订阅数"></el-table-column>
                      <!-- <el-table-column prop="outFlow"
                                       label="访问量"></el-table-column> -->
                    </el-table>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data () {
    return {
      tabledata: [
        { sort: 1, name: '宫内节育器种类代码表', subscriptionNum: 5 },
        { sort: 2, name: '门(急)诊处方记录（明细）', subscriptionNum: 10 },
        { sort: 3, name: '投资项目基础信息', subscriptionNum: 7 },
        { sort: 4, name: '门(急)诊病历记录', subscriptionNum: 5 },
        { sort: 5, name: '药敏试验药物代码表', subscriptionNum: 2 }
      ],
      height: 900,
    }
  },
  mounted () {
    this.init()
    this.setHeight()
  },
  methods: {//添加在data(){...},的后面

    setHeight () {
      this.height = window.screen.height - 40
    },
    init () {
      let myChart0 = this.$echarts.init(document.getElementById('system_press'))
      myChart0.setOption({
        "color": ["#d3e2e8", "#b0ccd7", "#c4ccd3", "#2564a1", "#0056a3"],
        "series": [{
          "title": { //设置仪表盘中间显示文字样式
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 10,
              fontStyle: 'italic',
              color: "white"
            }
          },
          "data": [{
            "name": "压力",
            "value": 25
          }],
          "pointer": { //指针样式
            length: '70%'
          },
          //半径
          "radius": 90,
          "center": ["47%", "55%"],
          "name": "压力指标",
          "detail": {
            "formatter": "{value}%"
          },
          "type": "gauge"
        }]
      })
      let myChart1 = this.$echarts.init(document.getElementById('data_quality'))
      myChart1.setOption({
        "series": [{
          "center": ["50%", "60%"],
          "name": "数据质量",
          "data": [{
            "name": "问题数据",
            "value": 335
          },
          {
            "name": "合格数据",
            "value": 3105
          }],
          "radius": ["50%", "70%"],
          "type": "pie"
        }],
        "color": ["#d66d30", "#add630", "#516b91", "#59c4e6"],
        "legend": {
          "show": true,
          "textStyle": {
            "color": "rgb(255, 255, 255)"
          }
        },
        "tooltip": {
          "textStyle": {
            "color": "rgb(0, 255, 255)"
          },
          "show": true
        }
      })
      let myChart2 = this.$echarts.init(document.getElementById('data_resource'))
      myChart2.setOption({
        "series": [{
          "data": [{
            "name": "数据连接",
            "value": [4300, 10000, 28000, 35000, 50000, 19000]
          }],
          "type": "radar"
        }],
        "color": ["#59c4e6"],
        "radar": {
          "indicator": [{
            "max": 6500,
            "name": "mysql"
          },
          {
            "max": 16000,
            "name": "oracle"
          },
          {
            "max": 30000,
            "name": "达梦"
          },
          {
            "max": 38000,
            "name": "hbase"
          },
          {
            "max": 52000,
            "name": "hdfs"
          },
          {
            "max": 25000,
            "name": "sqlserver"
          }]
        },
        "tooltip": {
          "textStyle": {
            "color": "rgb(0, 255, 0)"
          },
          "show": true
        }
      })
      let myChart3 = this.$echarts.init(document.getElementById('data_ruler'))
      myChart3.setOption({
        "series": [{
          "data": [380, 470, 210, 630, 267, 456, 963, 223, 789, 265, 325],
          "type": "bar"
        },
        {
          "data": [280, 720, 310, 330, 467, 656, 345, 123, 478, 265, 255],
          "type": "bar"
        },
        {
          "data": [180, 370, 410, 269, 367, 256, 894, 156, 785, 265, 195],
          "type": "bar"
        }],
        "yAxis": {
          "axisLabel": {
            "color": "rgb(255, 255, 255)"
          },
          "axisLine": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "splitLine": {
            "show": false
          },
          "show": true,
          "axisTick": {
            "length": 0,
            "show": true
          },
          "type": "value"
        },
        "color": ["#3398db", "#90ed7d", "#f7a35c"],
        "xAxis": {
          "axisLabel": {
            "color": "rgb(255, 255, 255)"
          },
          "axisLine": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "splitLine": {
            "show": false
          },
          "data": ["监制", "工商", "食品", "医疗", "化工", "社会", "教育", "餐饮", "保险", "能源", "其他"],
          "type": "category"
        },
        "tooltip": {
          "textStyle": {
            "color": "rgb(0, 255, 255)"
          },
          "show": true
        }
      })
      let myChart4 = this.$echarts.init(document.getElementById('data_service'))
      myChart4.setOption({
        "series": [{
          "smooth": false,
          "name": "访问量",
          "data": [556, 932, 1201, 934, 890, 1330, 920, 2879, 1566, 1894, 1658, 2222],
          "type": "line"
        }],
        "yAxis": {
          "axisLabel": {
            "color": "rgb(255, 255, 255)"
          },
          "axisLine": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "splitLine": {
            "show": false
          },
          "type": "value"
        },
        "color": ["#7bd9a5"],
        "legend": {
          "data": [{
            "icon": "circle",
            "name": "访问量"
          }],
          "show": true,
          "textStyle": {
            "color": "rgb(255, 255, 255)"
          }
        },
        "xAxis": {
          "axisLabel": {
            "color": "rgb(255, 255, 255)"
          },
          "axisLine": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "axisTick": {
            "lineStyle": {
              "color": "rgb(255, 255, 255)"
            }
          },
          "splitLine": {
            "show": false
          },
          "data": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          "type": "category"
        },
        "tooltip": {
          "textStyle": {
            "color": "rgb(0, 255, 0)"
          },
          "show": true
        }
      })
      let myChart5 = this.$echarts.init(document.getElementById('data_category'))
      myChart5.setOption({
        "series": [{
          "center": ["50%", "60%"],
          "name": "类型",
          "data": [{
            "name": "数据元",
            "value": 85444
          },
          {
            "name": "数据模型",
            "value": 3105
          },
          {
            "name": "数据标准",
            "value": 31
          }],
          "radius": ["0%", "70%"],
          "type": "pie"
        }],
        "color": ["#d66d30", "#add630", "#59c4e6"],
        "legend": {
          "show": true,
          "textStyle": {
            "color": "rgb(255, 255, 255)"
          }
        },
        "tooltip": {
          "textStyle": {
            "color": "rgb(0, 255, 255)"
          },
          "show": true
        }
      })
    }
  }
}
</script>
<style scope>
@import url("../../../static/css/index.css");
.bgImg {
  background-image: url(../../../static/img/pf_img5.jpg);
}
</style>