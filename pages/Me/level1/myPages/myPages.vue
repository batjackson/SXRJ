<template>
	<view class="background">
		<!-- 设置按钮部分 -->
		<view class="settingPosition" @click="goTosetting">
			<image class="setting" src="../../../../static/Me/myPage/setting.png" mode=""></image>
		</view>
		<!-- 中间模块部分 -->
		<view class="myPart">
			<view class="photoPosition">
				<image class="photo" src="../../../../static/Me/myPage/user.png" mode=""></image>		    
			</view> 
			<view class="email"> 
				<text>{{account}}</text>
				<text>@stu.edu.cn</text>
			</view>
			<view class="line lineFirst"></view>
			<view class="icon crownIcon" @click="goToCollect">
				<view >
					<image class="iconBackground crown" src="../../../../static/Me/myPage/crown.png" mode=""></image>
				</view>
				<view class="textPosition">
					<text class="text">我的收藏</text>
					<image class="rightArrow" src="../../../../static/Me/myPage/rightArrow.png" mode=""></image>
				</view>		
			</view>
			<view class="line lineSecond"></view>
			<view class="icon shareIcon" @click="goToShare">
				<view >
					<image class="iconBackground share" src="../../../../static/Me/myPage/share.png" mode=""></image>
				</view>
				<view class="textPosition">
					<text class="text">分享 [OA管家] 给好友</text>
					<image class="rightArrow" src="../../../../static/Me/myPage/rightArrow.png" mode=""></image>
				</view>		
			</view>
			<view class="line lineThird"></view>
			<view class="icon helpIcon" @click="goToSubscribe">
				<view >
					<image class="iconBackground help" src="../../../../static/Me/myPage/help.png" mode=""></image>
				</view>
				<view class="textPosition">
					<text class="text">我的订阅</text>
					<image class="rightArrow" src="../../../../static/Me/myPage/rightArrow.png" mode=""></image>
				</view>		
			</view>
			
		</view>
		<!-- 底部分享栏 -->
		<view class="popup" v-show="show">
					<view class="popup-info">
					<view class="shareText">分享到</view>
						<view class="popup-btn">
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/weChat.png" mode=""></image>
								<view><text>微信好友</text></view>
							</view>
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/moments.png" mode=""></image>
								<view><text>朋友圈</text></view>
							</view>
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/qq.png" mode=""></image>
								<view><text>QQ</text></view>
							</view>
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/blog.png" mode=""></image>
								<view><text>微博</text></view>
							</view>
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/link.png" mode=""></image>
								<view><text>复制链接</text></view>
							</view>
							<view class="iconAndText">
								<image class="iconShare" src="../../../../static/Me/share/photo.png" mode=""></image>
								<view><text>生成长图</text></view>
							</view>
							</view>
							<!-- <view><button class="cancelButton" type="default" @tap="cancel">取消</button></view> -->
							<!-- <view><button type="default" class="affirm" @tap="affirm">确认</button></view> -->			
				</view>
				<!-- 取消按钮 -->
				<view class="cancelButton" type="default" @tap="cancel">
					<view class="cancelText"><text>取消</text></view>
				</view>
		</view>	
	</view>
</template>

<script>
	import{
			getUserAccount
		}from "../../axios/Me/Me.js";
	export default {
		data() {
			return {
				// title: 'Hello'
				show:false,
				// token:"378fd578-4088-44a5-92e9-7921d4a24a6b",
				token:"",
				account:""
			}
		},
		onLoad() {
			this.getToken();
			// this.getUserAccount(this.token);
		},
		methods: {
			//获取缓存的用户token
			getToken(){
				let that=this;
				uni.getStorage({
					key:'token',
					success: function(res) {
						this.token = res.data;
						that.getUserAccount(this.token);
					}					
				});
				// console.log(token);
			},
			goToCollect(){
				uni.navigateTo({
					// 加上?id=1是为了在下一个页面使用navigateBack
					url:'../../level2/myPages/collect?id=1'
					// url:'../../level2/myPages/test'
				})
			},
			goTosetting(){
				uni.navigateTo({
					url:'../../level2/myPages/setting?id=1'
				})
			},
			// 分享 
			goToShare() {
				this.show = true;
			},
			goToSubscribe(){
				uni.navigateTo({
					url:'../../../ManageSubscription/subscription'
				})
			},
			// 点击弹窗取消
			cancel() {
				this.show = false;
			},
			getUserAccount(token){
				return getUserAccount({token}).then(
				(res) => {
					// console.log("ok")
					// console.log(res.data.code);
					// console.log(res.data.data);	
					this.account=res.data.data;
					},
				(err) => {
				  console.log(err);
				  console.log("错误")
				}
				);
			}
			// test(){
			// 	console.log(this.token);
			// 	// var token="86598b08-f63d-4861-afc5-4cbdb92e1383"
			// 	this.getUserAccount(this.token);
			// }	
		}
	}
</script>

<style scoped>
.background{
	background-color: #9E45BD;
	width: 100%;
	height: 440rpx;
	border-radius: 0 0 60rpx 60rpx;
}
/* 设置按钮 */
.setting{
	width: 35px;
	height: 35px;
}
.settingPosition{
	position: relative;
	left: 650rpx;
	top: 100rpx;
}
/* 中心部分样式 */
.myPart{
	background-color: white;
	height: 1072rpx;
	width: 670rpx;
	position: fixed;
	top: 230rpx;
	left: 40rpx;
	border-radius: 60rpx;
	box-shadow: inset 0 0 20rpx #CCC;
}
/* 头像部分样式 */
.photoPosition{
	position: relative;
	top: 200rpx;
	left: 234rpx;	
}
.photo{
	width: 200rpx;
	height: 200rpx;
	border-radius: 100rpx;
}
/* 邮箱文字部分 */
.email{
	position: relative;
	top: 240rpx;
	text-align: center;
	font-size: 34rpx;
}
/* 灰色分割线×4 */
.line{
	position: relative;
	left: 64rpx;
	width: 82%;
	border-bottom: 3rpx solid #EDEAF4;	
}
.lineFirst{
	top: 270rpx;
}
.lineSecond{
	top: 230rpx;
}
.lineThird{
	top: 190rpx;
}
/* 三栏整体样式 */
.icon{
	position: relative;
	top: 290rpx;
	left: 64rpx;
}
.iconBackground{
	width: 82rpx;
	height: 82rpx;
	border-radius: 20rpx;
	padding: 5rpx;
}
.textPosition{
	position: relative;
	top: -72rpx;
}
.text{
    margin-left: 120rpx;
}
/* 右箭头样式 */
.rightArrow{
	width: 20px;
	height: 20px;
	margin-left: 520rpx;
	top: -18px;
}
/* 皇冠一拦 */
.crownIcon{
	top: 300rpx;
}
.crown{
	background-color: #E6F7FF;
}
/* 分享一栏 */
.shareIcon{
	top: 260rpx;
}
.share{
	background-color: #FFF7E6;
}
/* 帮助一栏 */
.helpIcon{
	top: 220rpx;
}
.help{
	background-color: #E6FFFB;
}
/* 底部分享栏 */
.popup {
	position: fixed;
	left: 0; 
	right: 0;
	top: 0;
	height: 100vh;
	background-color: rgba(0,0,0,0.4);
	z-index: 9998;
}
.popup-info{
	position: fixed;
	width: 100%;
	bottom: 120rpx;
	font-size: 30upx;
	padding: 40upx;
	background-color: #fff;
	z-index: 9999;
}
.popup-btn{
	display: flex;
	flex-direction: raw;
	flex-wrap: wrap;
	/* justify-content: space-between; */
}
.shareText{
	color: #969696;
	margin-bottom: 30rpx;	
}
.iconShare{
	width: 80rpx;
	height: 80rpx;
}
.iconAndText{
	width: 130rpx;
	height: 130rpx;
	text-align: center;
	margin-top: 30rpx;
	margin-left: 5rpx;
}
/* 取消按钮 */
.cancelButton{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 116rpx;
	background-color: white;
	text-align: center;
	font-size: 35rpx;
	box-shadow: 0 -20rpx 0 #CCC;
	margin-top: 20rpx;
}
.cancelText{
	color: #000000;
	position: relative;
	top: 30rpx;
}

</style>
