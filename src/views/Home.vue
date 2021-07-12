<template>
  <div class="home">
    <Aside></Aside>
    <topHeader></topHeader>
    <div class="main" :class="this.$store.state.collapsed ? 'active-btn' : ''">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside/index.vue';
import topHeader from '@/components/topHeader/index.vue';

export default {
  data() {
    return {};
  },
  components: {
    Aside,
    topHeader,

  },
};
</script>
<style lang="less" scoped>
.home {
  .main {
    width: calc(100% - 200px);
    margin-left: 200px;
    transition: all 0.5s;
    padding: 20px 20px;
    &.active-btn {
      margin-left: 80px;
      width: calc(100% - 80px);
    }
  }
}
</style>
