<template>
  <div class="drawer-wrapper">
    <a-drawer
      title="编辑商品"
      placement="left"
      :closable="true"
      :visible="visible"
      width="90%"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-steps :current="current" class="steps">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <basicInfo :data="this.data" v-if="this.current == 0" @next="next" />
        <prefectInfo
          :data="this.data"
          v-else-if="this.current == 1"
          @prev="prev"
          @submit="editSubmit"
        />
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { getProductInfo, getCategory, editProduct } from '@/api/request';
import basicInfo from '@/components/basicInfo/index.vue';
import prefectInfo from '@/components/prefectInfo/index.vue';
import axios from 'axios';

export default {
  data() {
    return {
      visible: false,
      current: 0,
      result: '',
      data: '',
      cateData: '',
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
  components: {
    basicInfo,
    prefectInfo,
  },
  computed: {
    isBasis() {
      return this.current;
    },
  },
  created() {
    this.$bus.$on('close', this.onClose);
    this.$bus.$on('edit', async (data) => {
      this.result = await axios.all([
        getProductInfo({
          id: data.id,
        }),
        getCategory(),
      ]);
      const { result } = this;
      const [productInfo, cateInfo] = result;
      this.data = productInfo.data;
      this.cateData = cateInfo.data.data;
      this.$bus.$emit('info', this.cateData);
      this.visible = true;
    });
  },
  mounted() {
    this.$bus.$on('prev', () => {
      this.current -= 1;
    });
  },
  methods: {
    next(data) {
      this.data = { ...this.data, ...data };
      this.current += 1;
    },
    prev() { this.current -= 1; },
    afterVisibleChange(val) {
      if (val === false) {
        this.current = 0;
      }
    },
    async editSubmit(data) {
      await editProduct(data).then((res) => {
        if (res.status === 'success') {
          alert('提交成功');
          this.$bus.$emit('refresh');
          this.$bus.$emit('close');
        }
      });
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.ant-steps {
  width: 70% !important;
  margin: 0 auto;
}
.steps-content {
  width: 90%;
  margin: 0 auto;
}
</style>
