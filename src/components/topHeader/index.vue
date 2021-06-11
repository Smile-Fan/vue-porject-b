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
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
    </a-breadcrumb>
    <div class="user-info">
      <ul>
        <li>欢迎您，超级管理员</li>
        <li>退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
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

    li {
      height: 50px;
      line-height: 50px;
      &:not(:first-child) {
        display: none;
        background-color: whitesmoke;
      }
    }

    &:hover {
      li {
        display: block;
      }
    }
  }
}
</style>
