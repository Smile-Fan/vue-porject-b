<template>
  <div class="left-menu" :class="this.$store.state.collapsed ? 'active' : ''">
    <a-menu
      :default-selected-keys="[1]"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="this.$store.state.collapsed"
    >
      <a-sub-menu :key="'sub' + (i + 1)" v-for="(item, i) in menuList">
        <span slot="title"
          ><a-icon :type="item.icon" /><span>{{ item.meta.title }}</span></span
        >
        <a-menu-item
          :key="child.index"
          v-for="child in item.children"
          @click="setBreadcrumb(child)"
          ><router-link :to="{ name: child.name }"
            ><a-icon :type="child.icon" /> {{ child.meta.title }}</router-link
          >
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    menuList() {
      return this.$store.state.filterList;
    },
  },
  methods: {
    setBreadcrumb(data) {
      let isHave = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.$store.state.breadcrumb) {
        if (data.meta.title === item.title) {
          isHave = true;
          return;
        }
      }
      if (!isHave) {
        this.$store.dispatch('setBreadcrumbInfo', { title: data.meta.title, path: data.name });
      }
    },
  },
};
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
    li {
      width: 100%;
      a {
        width: 100%;
      }
    }
  }

  &.active {
    width: 80px;
  }
}
</style>
