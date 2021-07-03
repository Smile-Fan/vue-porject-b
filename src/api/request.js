import axios from './axios';
// 登陆
export async function login(email, password) {
  const data = await axios.post('/passport/login', {
    email,
    password,
  });
  return data;
}
// 注册
export async function logon(email, password, code, username) {
  const data = await axios.post('/passport/logon', {
    email,
    password,
    code,
    username,
  });
  return data;
}
// 找回密码
export async function foundPwd(email, password, code) {
  const data = await axios.post('/passport/findBack', {
    email,
    password,
    code,
  });
  return data;
}
// 获取验证码
export async function getCode(email) {
  const data = await axios.post('/passport/getCode', {
    email,
  });
  return data;
}
// 获取商品列表
export async function getProduct(params) {
  const data = await axios.get('/products/all', {
    params,
  });
  return data;
}

// 获取类目列表
export async function getCategory(params) {
  const data = await axios.get('/category/all', {
    params,
  });
  return data;
}
// 删除商品
export async function delProduct(params) {
  const data = await axios.delete(`/products/${params.id}`, {
    params,
  });
  return data;
}

// 商品详情
export async function getProductInfo(params) {
  const data = await axios.get(`/products/${params.id}`, {
    params,
  });
  return data;
}
