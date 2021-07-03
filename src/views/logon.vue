<template>
  <div class="logon">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '请输入邮箱!',
                },
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="用户名">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  message: '请输入用户名!',
                },
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请确认密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="验证码">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'code',
                {
                  rules: [
                    {
                      message: '请输入验证码!',
                    },
                  ],
                },
              ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleGetCode">获取验证码</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit"> 注册 </a-button>
        <span class="toLogin"
          ><router-link to="/login">已有账号，去登录</router-link></span
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getCode, logon } from '@/api/request';

export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleGetCode() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!values.code || !err) {
          getCode(values.email);
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const data = logon(values.email, values.password, values.code, values.username);
          data.then((result) => {
            console.log(result);
            this.$bus.$emit('message', result);
          });
          data.catch((result) => {
            console.log(result);
            this.$bus.$emit('message', result);
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const { value } = e.target;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const { form } = this;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const { form } = this;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map((domain) => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
  },
};
</script>
<style lang="less" scoped>
.logon {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  padding-top: 100px;
  .toLogin {
    margin-left: 30px;
  }
}
</style>
