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
        <basisInfo v-if="this.current == 0" />
        <perfectInfo v-if="this.current == 1" />
      </div>
      <div class="steps-action">
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')"
        >
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import basisInfo from '@/components/basisInfo/index.vue';
import perfectInfo from '@/components/perfectInfo/index.vue';
import { getProductInfo, getCategory } from '@/api/request';
import axios from 'axios';

export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      current: 0,
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
    basisInfo,
    perfectInfo,
  },
  computed: {
    isBasis() {
      return this.current;
    },
  },
  mounted() {
    this.$bus.$on('edit', async (data) => {
      const result = await axios.all([
        getProductInfo({
          id: data.id,
        }),
        getCategory(),
      ]);
      console.log(result, 'zhixingle');
      this.$bus.$emit('info', { data, result });
      this.visible = true;
    });
    this.$bus.$on('next', () => {
      this.current += 1;
    });
    this.$bus.$on('prev', () => {
      this.current -= 1;
    });
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
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
