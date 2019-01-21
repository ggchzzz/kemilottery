import Vue from 'vue'
import axios from 'axios'
/*
*this.$http.get().then()
*this.$http.post().then()
*/
// 添加一个请求拦截器
//请求拦截：当程序向服务器发起http请求的时候
// 在请求开始到服务器端之间进行拦截
//或者数据进行二次处理
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer' + token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器，在请求之后，服务器返回数据就是一个响应过程
//响应拦截就是拦截数据从后台返回到前端的过程
//在响应拦截器里，可以优先对400x,500x优先处理
axios.interceptors.response.use(function (response) {
  console.log(response);
  return response
}, function (error) {
  return Promise.reject(error)
})
const mtAxios = {
  get: (url, params) => {
    return axios.get(url, { params })
  },
  post: (url, params) => {
    return axios.post(url, params)
  }
}
Vue.prototype.$http = mtAxios;
export default mtAxios;
