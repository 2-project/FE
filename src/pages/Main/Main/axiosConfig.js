// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com:8080',
  withCredentials: true, // CORS 관련 설정 추가
});

export default instance;
