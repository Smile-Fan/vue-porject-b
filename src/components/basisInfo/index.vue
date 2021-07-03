<template>
  <div class="basis-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="title" label="标题" prop="title">
        <a-input
          v-model="form.title"
          @blur="
            () => {
              $refs.title.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="类目" prop="category">
        <a-select v-model="form.category" placeholder="请选择类目">
          <a-select-option
            :value="item.id"
            v-for="item in category"
            :key="item.id"
            >{{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择子类目">
          <template v-if="form.category === 1">
            <a-select-option
              :value="item"
              v-for="(item, index) in category[0].c_items"
              :key="index"
              >{{ item }}
            </a-select-option>
          </template>
          <template v-if="form.category === 2">
            <a-select-option
              :value="item"
              v-for="(item, index) in category[1].c_items"
              :key="index"
              >{{ item }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="修改日期" required prop="updateTime">
        <a-date-picker
          v-model="form.updateTime"
          show-time
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item class="tags"> </a-form-model-item>
      <a-form-model-item>
        <a-button @click="onSubmit" type="primary"> 下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      productInfo: {},
      category: [''],
      form: {
        title: '',
        category: null,
        desc: '',
        updateTime: '',
        c_item: null,
      },
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' },
          {
            min: 1, max: 50, message: '长度过短或过长', trigger: 'blur',
          },
        ],
        category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        updateTime: [{ required: true, message: '请输入日期', trigger: 'change' }],
        desc: [{ required: true, message: '请填写商品描述', trigger: 'blur' }],
      },
    };
  },
  beforeMount() {
    this.$bus.$on('info', (data) => {
      const arr = Object.keys(this.form);
      console.log(arr, data.data);
      for (let i = 0; i < arr.length; i += 1) {
        this.form[arr[i]] = data.data[arr[i]];
      }
      const [pro, cate] = data.result;
      this.category = cate.data.data;
      console.log(this.category, pro, this.form);
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$bus.$emit('next');
          return true;
        }
        return false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
// .loading {
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// }
</style>
