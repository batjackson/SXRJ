<template>
	<view class="content">
		<view class="img">
			<!-- 登录图片展示 -->
			<image src="../../static/hxr/login.png" class="login_img"></image>
		</view>
		<view class="inputWrapper">
			<!-- 输入框视图 -->
			<view class="input">
				<!-- 账号输入框 -->
				<input class="Input" v-model="account" type="text"  placeholder="输入校园网账号"/>
			</view>
			<view class="input">
				<!-- 密码输入框框 -->
				<input class="Input" v-model="password" type="password"  placeholder="输入邮箱密码"/>
			</view>
		</view>
		<view class="btn">
			<button class="loginbtn" @click="login">
				登  录
			</button>
		</view>
		
	</view>
	
</template>

<script>
	import {
		postLogin,
	} from "./axios/login.js";
	export default {
		data() {
			return {
				account:'',
				password:''
			}
		},
		methods: {
			//检测有无令牌
			//登录
			postLogin(account,password){
				return postLogin({account,password}).then(
				(res) => {
					let nowstate = [];
					nowstate = res.data.code;
					console.log(nowstate);
					if(nowstate == 202){
						uni.showToast({
							title: '登录成功',
							duration: 1500
						});
						//缓存token
						new Promise((resolve,reject)=>{
							uni.setStorage({
								key:"token",
								data:res.data.data,
								success: function() {
									console.log("ok");
									resolve(1);
								}
							});
						}).then(res=>{
							uni.navigateTo({
								url:"./Cding"
							});
							// this.isWrong = false;
							// getUser().then((res) => {
							// 	new Promise((resolve,reject)=>{
							// 		uni.setStorage({
							// 			key:"userInfo",
							// 			data:res.data.data,
							// 			success: function() {
							// 				resolve(1);
							// 			}
							// 		});
							// 	}).then(res=>{
							// 		uni.switchTab({
							// 			url:""
							// 		})
							// 	})
							// });
						}).catch(err=>{
							console.log("登陆有个地方出了问题");
						})
					}
					else if(nowstate == 200){
						uni.showToast({
							title: '登录成功',
							duration: 1500
						});
						//缓存token
						new Promise((resolve,reject)=>{
							uni.setStorage({
								key:"token",
								data:res.data.data,
								success: function() {
									console.log("ok");
									resolve(1);
								}
							});
						}).then(res=>{
							uni.switchTab({
								url:"../OA/subscribe/subscribe"
							});
						}).catch(err=>{
							console.log("二次登陆有个地方出了问题");
							})
					}
					else{
						uni.showToast({
							title: '账号密码错误',
							duration: 1200,
							icon : 'error',
						});
					}
				}).catch(err=>{
					console.log(err);
				});
			},
			login(){
				this.postLogin(this.account,this.password);
			},
		}
	}
</script>

<style>
	.content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.img{
		height: 332rpx;
		width: 334rpx;
		margin-top: 216rpx;
	}
	.login_img{
		width: 100%;
		height: 100%;
	}
	.inputWrapper{
		height: 88rpx;
		width: 576rpx;
		margin-top: 256rpx;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		border-radius:118rpx;
		box-sizing: border-box;
		border-style:solid;
		border-color: #C4C4C4;
		border-width: 1rpx;
		margin-top: 28rpx;
	}
	.inputWrapper .Input{
		width: 86%;
		height: 100%;
		text-align: center;
		box-sizing: border-box;
		border-style:none;
		font-size: 28rpx;
		margin-left: 5.5%;
	}
	.btn{
		margin-top: 178rpx;
	}
	.loginbtn {
		width: 576rpx;
		height: 88rpx;
		display: inline-block;
		font-size: 36rpx;
		cursor: pointer;
		text-align: center;  
		justify-content: center;
		text-decoration: none;
		outline: none;
		color: #fff;
		background-color: #9E45BD;
		box-shadow: 0px 2px 6px 0px rgba(116, 104, 190, 39);
		border: none;
		border-radius: 80rpx;
	}
</style>
