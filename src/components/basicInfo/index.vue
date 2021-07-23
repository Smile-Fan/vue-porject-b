<template>
  <div class="basicInfo">
    <a-form-model
      :model="data"
      ref="ruleForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        has-feedback
        ref="name"
        label="标题"
        prop="title"
        required
      >
        <a-input
          v-model="data.title"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        ref="desc"
        label="商品描述"
        prop="desc"
        required
      >
        <a-input v-model="data.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类别" prop="category" required>
        <a-select
          v-model="data.category"
          placeholder="请选择子类目"
          @change="changeCategory"
        >
          <a-select-option
            :value="item.id"
            v-for="item in cateData"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="data.c_item" placeholder="请选择子类目">
          <a-select-option
            :value="item"
            v-for="item in categoryItems"
            :key="item"
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
          v-model="data.tags"
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
import { getCategory } from '@/api/request';

export default {
  props: ['data'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      result: '',
      rules: {
      },
      cateData: [],
      categoryItems: [],
    };
  },
  created() {
    getCategory().then((res) => { this.cateData = res.data.data; console.log(res); });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.cateData.length; i += 1) {
        if (this.cateData[i].id === category) {
          this.categoryItems = this.cateData[i].c_items;
        }
      }
    },
    handleClick() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$emit('next', this.data);
          return true;
        }
        alert('填写有误!!');
        return false;
      });
    },
  },
};
</script>

<style>
</style>
