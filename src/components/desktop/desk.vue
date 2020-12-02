<template>
  <el-container>
    <el-header class="header"
               height="40px"
               id="yyxt_0">

      <!--头部菜单-->
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               style="height:100%;float:left;border-bottom:none;"
               background-color="transparent"
               text-color="#fff"
               active-text-color="#fff">
        
      </el-menu>
      <div class="navbar">
        <div class="right-menu">
          <el-dropdown class="avatar-container"
                       trigger="click">
            <div class="avatar-wrapper">
              <img :src="avatar+'?imageView2/1/w/80/h/80'"
                   style="height:35px;width:35px;border-radius: 3px;"
                   class="user-avatar">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown"
                              class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  桌面
                </el-dropdown-item>
              </router-link>

              <el-dropdown-item divided>
                <span style="display:block;"
                      @click="logout">注销登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main v-if="isShowMain"
             :style="'height:'+height+'px;overflow:auto'">
      <router-view></router-view>
    </el-main>

  </el-container>
</template>
<script>
export default {
  name: 'desk',
  data () {
    return {
      activeIndex: '2',
      height: 0,
      isShowMain: false,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    }

  },
  mounted () {
    this.init()
  },
  methods: {
    addTab (targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    init () {
      this.height = window.innerHeight - 40;
      this.isShowMain = true;
    },
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }

  }
}
</script>
<style scoped>
/*头部左侧系统名称*/
.header_left {
  float: left;
  padding: 0 16px;
  height: 100%;
  font-size: 16px;
  color: #ffffff;
  line-height: 40px;
}

.el-menu-item i {
  color: #fff;
  font-size: 24px !important;
}

.el-menu-item {
  font-size: 16px !important;
  height: 40px;
  line-height: 32px;
}

.header {
  background: rgba(26, 75, 155, 0.7);
  /* background: rgba(71, 136, 94,.7); */
}
.el-main {
  padding: 0px !important;
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #5e81b9;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 2px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>