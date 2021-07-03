<template>
  <div class="login">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '请输入邮箱!' }],
            },
          ]"
          placeholder="邮箱"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码!' }],
            },
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'rember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住密码
        </a-checkbox>
        <a class="login-form-forgot" href=""> 忘记密码 </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
        没有账号？
        <router-link to="/logon">现在注册!</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { login } from '@/api/request';

export default {
  data() {
    return {
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = login(values.email, values.password);
          data.then((req) => {
            this.$bus.$emit('message', req);
            if (req.status === 'success') {
              this.$store.commit('changeUser', req.data.username);
              this.$store.dispatch('setUserInfo', req.data).then(() => {
                this.$router.push('/home');
              }, (error) => {
                console.log(error);
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.login {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  padding-top: 200px;
}
</style>
