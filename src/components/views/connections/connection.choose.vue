<template>
  <div class="contioner">
    <div style="margin-bottom:20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/connection/connectionlist' }">连接管理</el-breadcrumb-item>
        <el-breadcrumb-item>连接类型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-row style="height:100%;margin-bottom:10px;"
              :gutter="10"
              v-for="db in dbList"
              :key="db.title">
        <div class="text">{{db.title}}</div>
        <el-col :span="2"
                style="margin-bottom:10px;"
                v-for="item in db.items"
                :key="item.alt">
          <vue-hover-mask @click="addConnection(item)">
            <!-- 默认插槽 -->
            <el-image style="width: 100%; height: 100%"
                      title="点击添加"
                      :src="item.src"
                      :fit="item.fit"></el-image>
            <!-- action插槽 -->
            <template v-slot:action>
              <i class="el-icon-edit"></i>
            </template>
          </vue-hover-mask>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import VueHoverMask from 'vue-hover-mask'
export default {
  name: 'connectionChoose',
  components: {
    VueHoverMask
  },
  data () {
    return {
      dbList: [{
        title: '数据库',
        items: [
          { src: '../../../static/img/db/mysql.png', fit: 'fill', alt: 'mysql', type: 'jdbc' },
          { src: '../../../static/img/db/oracle.png', fit: 'fill', alt: 'oracle', type: 'jdbc' },
          { src: '../../../static/img/db/auzre.png', fit: 'fill', alt: 'auzre', type: 'jdbc' },
          { src: '../../../static/img/db/sqlserver.png', fit: 'fill', alt: 'sqlserver', type: 'jdbc' },
          { src: '../../../static/img/db/postgreSql.png', fit: 'fill', alt: 'postgreSql', type: 'jdbc' },
          { src: '../../../static/img/db/dm.png', fit: 'fill', alt: 'dm', type: 'jdbc' },

        ]
      },
      {
        title: '大数据',
        items: [
          { src: '../../../static/img/db/hive.png', fit: 'fill', alt: 'hive', type: 'jdbc' },
          { src: '../../../static/img/db/hbase.png', fit: 'fill', alt: 'hbase', type: 'hbase' },
          { src: '../../../static/img/db/Hadoop.png', fit: 'fill', alt: 'hadoop', type: 'jdbc' },
          { src: '../../../static/img/db/redis.png', fit: 'fill', alt: 'redis', type: 'jdbc' },
          { src: '../../../static/img/db/kafka.png', fit: 'fill', alt: 'kafka', type: 'jdbc' },
        ]
      },
      {
        title: '文件',
        items: [
          { src: '../../../static/img/db/FTP.png', fit: 'fill', alt: 'FTP', type: 'ftp' },
        ]
      },
      ],

    }
  },
  methods: {
    addConnection (db) {
      debugger
      this.$router.push({
        path: '/connection/edit',
        query: { operateType: 'C', resource: db.alt, type: db.type ? db.type : 'jdbc' }

      })
    },
  }
}
</script>
<style scoped>
.contioner {
  background: #ffffff;
  padding: 30px;
}
.text {
  font-family: "微软雅黑";
  color: #b5b5b5;
  padding: 15px 15px;
}
.iconfont {
  font-family: "微软雅黑";
}
</style>