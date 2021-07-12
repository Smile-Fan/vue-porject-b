<template>
  <div class="addProduct">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basicInfo :cateData="this.cateData" v-show="this.current == 0" />
      <prefectInfo v-show="this.current == 1" />
    </div>
  </div>
</template>

<script>
import basicInfo from '@/components/basicInfo/index.vue';
import prefectInfo from '@/components/prefectInfo/index.vue';

export default {
  data() {
    return {
      current: 0,
      cateData: [],
      steps: [
        {
          title: '填写基本信息',
        },
        {
          title: '完善商品信息',
        },
      ],
    };
  },
  created() {
    this.$bus.$on('info', (data) => {
      this.cateData = data;
    });
  },
  components: {
    basicInfo,
    prefectInfo,
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
.addProduct {
  width: 60%;
  height: 100%;
  margin: 0 auto;
}
</style>
