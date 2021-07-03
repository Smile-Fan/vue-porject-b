<template>
  <div class="perfect">
    <template>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="原始价格" prop="price">
          <a-input v-model="form.price" />
        </a-form-model-item>
        <a-form-model-item label="折扣价格" prop="price_off">
          <a-input v-model="form.price_off" />
        </a-form-model-item>
        <a-form-model-item label="库存" prop="inventory">
          <a-input v-model="form.inventory" />
        </a-form-model-item>
        <a-form-model-item label="计量单位" prop="unit">
          <a-input v-model="form.unit" />
        </a-form-model-item>
        <a-form-model-item label="图片" prop="images">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :file-list="fileList"
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
        <a-form-model-item>
          <a-button @click="onSubmit" type="primary">上一步</a-button>
        </a-form-model-item>
      </a-form-model>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        price: null,
        price_off: null,
        inventory: null,
        unit: '',
        images: '',
      },
      rules: {
        price: [
          { required: true, message: '请填写价格', trigger: 'blur' },
        ],
        price_off: [{ required: true, message: '请输入折扣价', trigger: 'blur' }],
        inventory: [{ required: true, message: '请填写库存量', trigger: 'blur' }],
        unit: [{ required: true, message: '请填写商品单位', trigger: 'blur' }],
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  },
  props: ['id'],
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    onSubmit() {
      this.$bus.$emit('prev');
    },
  },
};
</script>
<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
