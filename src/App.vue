<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on('message', function (result) {
      if (result.status === 'success') {
        this.$message.success(result.msg);
      } else {
        this.$message.error(result.msg);
      }
    });
  },
};
</script>
<style lang="less">
@import url('~@/assets/css/global.less');
</style>
