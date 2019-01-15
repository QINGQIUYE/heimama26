import axios from 'axios';
import {Message}from "element-ui"
axios.defaults.baseURL='http://localhost:8888/api/private/v1/';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
     console.log(config);
     if(config.url.indexOf('/login')!=-1){
        // 
     }else{
      config.headers.Authorization=window.sessionStorage.getItem('token')
     }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response);
    if (response.data.meta.status===200) {
       Message.success(response.data.meta.msg) 
    }else if (response.data.meta.status===400) {
        Message.error(response.data.meta.msg) 
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default{
    install(Vue){
        Vue.prototype.$axios=axios
    }
}
