<template>
	<view class="">
		<view class="background">
			<image class="img" src="../../static/lsy/background.jpg" style="width: 100%;height: 100%;z-index: -1;" ></image>
		</view>
		
		<view class="title">
			
			<text>订阅</text>
		</view>
		<view class="content">
		<!-- 标签开始 -->
				  <view class="label_box"> 
					<view class="box_inside" v-for="(item,index) in keywords" :key="index" > 
					<image src="../../static/lsy/close.png" v-show="isShow"  mode=""></image>
						<image src="../../static/lsy/flower.png" mode="" @click="deletekeyword(index)"></image>
						<view class="text_item">
							
						<text class="text_label">{{item}}</text>
						</view>
					</view> 
				  </view>
		<!-- 标签结束 --> 
		</view>
		<view class="add">
			<view class="add_box">
				<view class="img_item">
					<image src="../../static/lsy/pointer.png" mode=""></image>
				</view>
				<navigator url="../../pages/index/compile">
				<!-- 增加添加订阅页面跳转 addSubcription ljs-->
				<view class="text_item" @click="addSubscription">
					<text class="add_label" >添加订阅</text>
				</view>
				</navigator>
			</view>
		
			<view class="add_box">
				<view class="img_item">
					<image src="../../static/lsy/compile.png" mode=""></image>
				</view>
				<view class="text_item">
					<text class="add_label bubble"@click="showToggle">编辑订阅</text>
				</view>
				
			</view>
	   </view>
	   <button type="default" class="button" @click="goBack">返回上一页</button>
   </view>   
   
</template>

<script>

	export default {
		data() {
			return {
				keywords:[],
				isShow:false,
				
			    isRouterAlive: false,

			}
		},
	
		
	 onShow() {

			this.getSubDepart();
		},
		methods: {
			showToggle(){
			       this.isShow = !this.isShow
			    },
			// reloadPage () {
			//     location. reload()
			// },
			reload () {
				this.isRouterAlive = false
				this.$nextTick(function () {
				  this.isRouterAlive = true
				})
			      // this.$router.go(1);
},
			
				//获取缓存的用户订阅词
					getSubDepart(){
								let that=this;
								let keyWords=[];
								uni.getStorage({
									key:'subDepart',
									success: function(res) {
										keyWords = res.data;
										// console.log(keyWords[0]);
									}
								});
								this.keywords=keyWords;
								console.log('ok');
								// console.log(this.keywords[0]);
							},
				// 删除缓存的用户订阅词
				deletekeyword (index) {
				      const temp = this.keywords;
				      temp.splice(index,1);
					  console.log(temp);
				      localStorage.setItem('searchword', JSON.stringify(temp));
				      this.keywords = JSON.parse(localStorage.getItem('searchword'));
					  new Promise((resolve,reject)=>{
					  	uni.setStorage({
					  		key:"subDepart",
					  		data:this.keywords,
					  		success: function() {
					  			console.log("ok");
					  			resolve(1);
					  		}
					  	});
				    },);
					},
			//跳转到添加订阅页面 ljs
			addSubscription(){
				uni.navigateTo({
					url:"compile?id=1"
				})
			},
			goBack(){
				uni.navigateBack({
					//改用navigateBack返回上一页 ljs
					delta:1
				})
			}
		
		}
	}
</script>

<style scoped>
	.title{
		padding-top: 30px;
		padding-left: 40px;
		font-size: 24px;
		color: white;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.background{
		width: 100%;
		height: 1100px;
		position: absolute;
}
	/* 订阅小标签 */
	.label_box{
	padding: 25px;
	position: relative;
	/* text-align: center; */
	display: flex;
	flex-direction:column;
	align-items: center;
	vertical-align: middle;
	
	}
	.text_item:active{
		color: #007AFF;
	}
	.box_inside:active{
		transform: scale(1.5) ;
		transition: all 1s ease-in-out;
	}
	.label_box image{
		margin-top: 2px;
		margin-left: 5px;
		width: 25px;
		height: 25px;
	}
	.box_inside{
		margin: 9px;
		height: 39px;
		padding-left: 10px;
		padding-right:20px ;
		width: auto;
		background:rgba(209, 213, 229, 0.7);
		border-radius: 40px;
		color: #696969;	
		font-size: 16px;
		display: flex;
		flex-direction:initial;
		align-items: center;
		vertical-align: middle;
		box-shadow: 0 0 10px #8a8a8a;
		animation: dong 8s infinite;
	}
	

	@keyframes dong { 
	       0% {             
	           transform: translate(-80px, 0px);            
	        }            
	       50% {                
	           transform: translate(130px, 0px);            
	        }           
	        100% {                
	           transform: translate(-80px, 0px);
	        }
	}

	.text_label{
		color: #515662;
	}
	/* 编辑订阅 */
	.add{
	margin-top: 50px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	}
	.add_box{
		width: 130px;
		height: 70px;
		background:rgba(209, 213, 229, 0.7);
		border-radius: 40px;
		color: #696969;	
		font-size: 18px;
		margin-top: 15px;
		margin-right: 20px;
		text-align:center; 
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		box-shadow: 0 0 10px #946394;
	}
	.img_item{
		margin: 0 auto;

	}
	.add_box image{
		width: 25px;
		height: 25px;
	}
	/* 气泡 */
	.bubble {
			position: relative;
			overflow: hidden;
		}
	.bubble:after {
			content: "哈哈(>~<)";
			
			background: #af9bcc;
			position: absolute;
			width: 60px;
			height: 60px;
			left: calc(50% - 75rpx);
			top: calc(50% - 75rpx);
			opacity: 0;
			margin: auto; 
			
			border-radius: 50%;
			transform: scale(0.3);
			transition: all 1s ease-in-out;
		}
	
		.bubble:active:after {
			transform: scale(1.2);
			opacity: 1;
			transition: 0.5s;
		}
		/* 返回上一页按钮 */
		.button{
			position: fixed;
			z-index: 2;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			color: white;
			padding: 10rpx;
			font-size: 40rpx;
			background-color: rgba(158,69,189,0.6);
		}
</style>
