import api from '../API/api.js';
import axios from "./axios.interceptors.js";

//验证登录，获取token
export function postLogin(data){
	return axios.post(api.post.postLogin, data)
}

