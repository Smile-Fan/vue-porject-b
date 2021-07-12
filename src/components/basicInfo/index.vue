<template>
  <div class="basicInfo">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item has-feedback ref="name" label="标题" prop="title">
        <a-input
          v-model="data.title"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item has-feedback ref="desc" label="商品描述" prop="desc">
        <a-input v-model="data.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类别" prop="cate">
        <a-select
          v-model="data.category"
          placeholder="类目"
          @change="resetCate"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) in cateData"
            :key="index"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item prop="childCate" label="子类目">
        <a-select v-model="data.c_item" placeholder="子类目" ref="childCate">
          <a-select-option
            :value="item"
            v-for="(item, index) in cateData[data.category - 1].c_items"
            :key="index"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          style="width: 100%"
          placeholder="标签"
          :value="data.tags"
        >
          <a-select-option
            v-for="(item, index) in data.tags"
            :key="index"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleClick"> 下一步 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    cateData: {
      type: Array,
    },
  },
  mounted() {
    this.data = this.data ? this.data : {
      appkey: '',
      c_item: '',
      category: '',
      desc: '',
      images: '',
      inventory: '',
      price: '',
      price_off: '',
      status: '',
      tags: '',
      title: '',
      unit: '',
    };
    console.log(this.cateData, this.data);
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      result: '',
      rules: {
        title: [
          { required: true, message: '请填写商品标题', trigger: 'change' },
          {
            min: 1, max: 15, message: '长度过长或过短', trigger: 'change',
          },
        ],
        cate: [{ required: true, message: '请选择商品类别', trigger: 'change' }],
        desc: [
          { required: true, message: '请填写商品描述', trigger: 'change' },
          {
            min: 0, max: 25, message: '描述过长', trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    resetCate() {
      this.data.c_item = '';
    },
    handleClick() {
      console.log(this.data);
      this.$bus.$emit('next', this.data);
    },
  },
};
</script>

<style>
</style>
