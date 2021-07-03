<template>
  <span class="bredcrumb">
    <router-link class="breadcrumb" :to="{ name: this.path }">{{
      this.title
    }}</router-link>
    <a-icon type="close" @click="closeBreadcrumb()" />
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  methods: {
    closeBreadcrumb() {
      this.$store.dispatch('delBreadcrumbInfo', this.index);
    },
  },
};
</script>

<style lang="less" scoped>
.router-link-exact-active {
  color: #6e6efa !important;
}
</style>
