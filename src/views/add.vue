<template>
  <div class="addProduct">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basicInfo :data="this.dataList" v-if="this.current == 0" @next="next" />
      <prefectInfo
        :data="this.dataList"
        v-else-if="this.current == 1"
        @prev="prev"
        @submit="addSubmit"
      />
    </div>
  </div>
</template>

<script>
import basicInfo from '@/components/basicInfo/index.vue';
import prefectInfo from '@/components/prefectInfo/index.vue';
import { addProduct } from '@/api/request';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写基本信息',
        },
        {
          title: '完善商品信息',
        },
      ],
      dataList: {
        title: '',
        desc: '',
        category: null,
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
    };
  },
  components: {
    basicInfo,
    prefectInfo,
  },
  mounted() {
  },
  methods: {
    next(data) {
      this.dataList = { ...this.dataList, ...data };
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    async addSubmit(data) {
      await addProduct({ ...data }).then((res) => {
        if (res.status === 'success') {
          alert('提交成功');
          console.log(res);
        }
      });
    },
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
