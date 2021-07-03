<template>
  <div
    class="top-header"
    :class="this.$store.state.collapsed ? 'active-btn' : ''"
  >
    <a-button
      class="open-btn"
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon
        :type="this.$store.state.collapsed ? 'menu-unfold' : 'menu-fold'"
      />
    </a-button>
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">
        <Breadcrumb :title="item.title" :path="item.path" :index="index" />
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="user-info">
      <ul>
        <li>欢迎您，{{ this.$store.state.userInfo.username }}</li>
        <li @click="clickDelCookie" class="logout">
          <router-link to="/login">退出</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    clickDelCookie() {
      this.$store.dispatch('delUserInfo');
    },
  },
  computed: {
    user() {
      return this.$store.state.username;
    },
    breadcrumbData() {
      return this.$store.state.breadcrumb;
    },
  },
};
</script>

<style lang="less" scoped>
.top-header {
  width: calc(100% - 200px);
  height: 50px;
  // padding: 10px;
  border-bottom: 1px solid #eee;
  margin-left: 200px;
  transition: all 0.5s;

  &.active-btn {
    margin-left: 80px;
    width: calc(100% - 80px);
  }

  .open-btn {
    margin-left: 20px;
    margin-top: 10px;
  }

  .breadcrumb {
    display: inline-block;
    margin-left: 15px;
    margin-top: 10px;
  }

  .user-info {
    float: right;
    margin-right: 20px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    position: relative;

    &:hover {
      .logout {
        top: -5px;
      }
    }
    .logout {
      position: absolute;
      top: -40px;
      width: 100%;
      background-color: white;
      transition: all 0.5s;
      // height: 80%;
      a {
        color: inherit;
      }
    }
    li {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
