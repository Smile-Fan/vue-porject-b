<template>
  <div class="prefectInfo">
    <a-form-model
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
          name="avatar"
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            this.$store.state.userInfo.appkey
          "
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
        <a-button class="btn" type="primary" @click="handleClick">
          上一步
        </a-button>
        <a-button class="btn" type="primary" @click="submit"> 提交 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['data'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
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
    this.fileList = this.data.images.map((item, index) => ({
      uid: `${index}`,
      name: `image${index}.png`,
      status: 'done',
      url: item,
    }));
  },
  methods: {
    submit() {
      const images = this.fileList.map((item) => item.url);
      console.log(images, this.fileList);
      this.$emit('submit', { ...this.data, images });
    },
    handleClick() {
      this.$emit('prev');
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
      if (this.fileList.length === 0) {
        return;
      }
      if (fileList[fileList.length - 1].response) {
        this.fileList[fileList.length - 1] = {
          url: fileList[fileList.length - 1].response.data.url,
          uid: `${fileList.length - 1}`,
          name: `image${fileList.length - 1}.png`,
          status: 'done',
        };
      }
      console.log(this.fileList);
      // console.log(this.fileList);
    },
  },
};
</script>

<style lang="less" scoped>
.prefectInfo {
  .btn {
    margin: 10px;
  }
}
</style>
