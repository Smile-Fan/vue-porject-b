<template>
  <div class="prefectInfo">
    <a-form-model
      v-if="data"
      ref="ruleForm"
      :model="data"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item has-feedback label="商品价格" prop="price">
        <a-input v-model="data.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="data.price_off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="商品库存" prop="inventory">
        <a-input v-model="data.inventory" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="计量单位" prop="unit">
        <a-input v-model="data.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册">
        <a-upload
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleClick"> 上一步 </a-button>
        <a-button type="primary" @click="submit"> 提交 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { editProduct } from '@/api/request';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: {
    cateData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      data: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      result: '',
      rules: {
        price: [
          { required: true, message: '请填写商品价格', trigger: 'change' },
        ],
        inventory: [
          { required: true, message: '请填写商品价格', trigger: 'change' },
        ],
        unit: [
          { required: true, message: '请填写商品价格', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this.$bus.$on('next', this.getData);
  },
  methods: {
    async submit() {
      console.log('zhixingle');
      await editProduct({ ...this.data, images: this.fileList }).then((data) => {
        if (data.status === 'success') {
          alert('提交成功');
        }
      });
    },
    getData(val) {
      this.data = val;
      this.fileList = this.data.images.map((item, index) => ({
        uid: `${index}`,
        name: `image${index}.png`,
        status: 'done',
        url: item.url.url.url, // 不明白为什么
      }));
    },
    resetCate() {
      this.data.c_item = '';
    },
    handleClick() {
      this.$bus.$emit('prev');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        // eslint-disable-next-line no-param-reassign
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>

<style>
</style>
