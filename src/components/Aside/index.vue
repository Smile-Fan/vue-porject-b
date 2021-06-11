<template>
  <div class="left-menu" :class="this.$store.state.collapsed ? 'active' : ''">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="this.$store.state.collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="home" /><span>首页</span></span>
        <a-menu-item key="1"
          ><router-link class="router-link" to="/homeContainer"
            ><a-icon type="pie-chart" />
            统计
          </router-link></a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="shop" /><span>商品</span></span>
        <a-menu-item key="2"><a-icon type="container" /> 商品列表 </a-menu-item>
        <a-menu-item key="3"><a-icon type="import" /> 增加商品 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.left-menu {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 0.3s 0.1s;
  .ant-menu {
    width: 100%;
    height: 100%;
  }

  &.active {
    width: 80px;
  }
}
</style>
