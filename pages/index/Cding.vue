<template>
	<view class="content">
		<view class="Choose_Vtext">
			<!-- 订阅文字 -->
			<text class="Choose_text">选择希望订阅的OA内容</text>
		</view>
		<view class="pass_Vtext">
			<!-- 跳过文字 -->
			<text class="pass_text">可以跳过此环节</text>
		</view>
		<view class="Cstyle">
		<!-- 大框整体样式 -->
			<image src="../../static/hxr/shuyuan.png" class="img_left"></image>
			<view class="text_in_right">
				<text class="text_hei_right">书院消息</text>
				<text class="text_hui_right">选择书院</text>
				<view class="label_in">
				<!-- 小标签选择样式 -->
					<a v-for="(item,index) in shuyuan" :class="{'labelTag': rSelectShu.indexOf(index)!=-1}" @click="aClickShu(index)">{{item}}</a>
					<!-- <view class="label" v-for="(item,index) in shuyuan" >{{item}}</view> -->
				</view>
			</view>
		</view>
		<!-- <view class="Cstyle">
			<view class="text_in_left">
				<text class="text_hei_left">奖学金相关</text>
				<text class="text_hui_left">遇见更好的自己</text>
			</view>
			<image src="../../static/hxr/scholarship.png" class="img_right"></image>
		</view> -->
		<view class="Cstyle">
			<image src="../../static/hxr/xveyuan.png" class="img_left"></image>
			<view class="text_in_right">
				<text class="text_hei_right">学院相关</text>
				<text class="text_hui_right">选择学院</text>
				<view class="label_in">
				<!-- 小标签选择样式 -->
					<a v-for="(item,index) in xveyuan" :class="{'labelTag': rSelectXve.indexOf(index)!=-1}" @click="aClickXve(index)">{{item}}</a>
				</view>
			</view>
		</view>
		<view class="Cstyle">
			<image src="../../static/hxr/scholarship.png" class="img_left"></image>
			<view class="text_in_right">
				<text class="text_hei_right">其他消息</text>
				<text class="text_hui_right">选择部门</text>
				<view class="label_in">
				<!-- 小标签选择样式 -->
					<a v-for="(item,index) in others" :class="{'labelTag': rSelectOthers.indexOf(index)!=-1}" @click="aClickOthers(index)">{{item}}</a>
				</view>
			</view>
		</view>
		<!-- <view class="Cstyle">
			<view class="text_in_left">
				<text class="text_hei_left">考试竞赛相关</text>
				<text class="text_hui_left">各种考试竞赛通知</text>
			</view>
			<image src="../../static/hxr/exam.png" class="img_right"></image>
		</view> -->
		<view class="btn_area">
			<!-- 按钮 -->
			<!-- 我添加了点击事件 ljs -->
			<button type="default" class="pass" @click="jump">跳过</button>
			<button type="default" class="OOK" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rSelectShu:[],
				rSelectXve:[],
				rSelectOthers:[],
				aSelectList:[],
				shuyuan:['淑德书院',"德馨书院","至诚书院","弘毅书院","知行书院","明德书院","敬一书院","思源书院","修远书院"],
				xveyuan:['工学院','理学院','文学院','商学院','法学院','马克思主义学院','长江艺术与设计学院','长江新闻与传播学院'],
				others:['英语语言中心','创业学院','书院总院','教务处','校园委']
			}
		},
		 methods:{
			// 书院标签选择确定
			aClickShu(index) {
				 let arrIndex = this.rSelectShu.indexOf(index);
				if(arrIndex>-1){
					this.rSelectShu.splice(arrIndex,1);
					for (let i = 0 ; i<this.aSelectList.length ; i++){
						if(this.shuyuan[index] == this.aSelectList[i]){
							this.aSelectList.splice(i,1);
						}
					}
				}else{
					this.rSelectShu.push(index);
					this.aSelectList.push(this.shuyuan[index]);
				}
			},
			// 学院标签选择确定
			aClickXve(index) {
				 let arrIndex = this.rSelectXve.indexOf(index);
				if(arrIndex>-1){
					this.rSelectXve.splice(arrIndex,1);
					for (let i = 0 ; i<this.aSelectList.length ; i++){
						if(this.xveyuan[index] == this.aSelectList[i]){
							this.aSelectList.splice(i,1);
						}
					}
				}else{
					this.rSelectXve.push(index);
					this.aSelectList.push(this.xveyuan[index]);
				}
			},
			// 其他标签选择确认定
			aClickOthers(index) {
				 let arrIndex = this.rSelectOthers.indexOf(index);
				if(arrIndex>-1){
					this.rSelectOthers.splice(arrIndex,1);
					for (let i = 0 ; i<this.aSelectList.length ; i++){
						if(this.others[index] == this.aSelectList[i]){
							this.aSelectList.splice(i,1);
						}
					}
				}else{
					this.rSelectOthers.push(index);
					this.aSelectList.push(this.others[index]);
				}

			},
			//跳过 ljs
			jump(){
				uni.switchTab({
					url:"/pages/OA/subscribe/subscribe"
				})
			},
			//确定 ljs  (跳转到带tabBar页面必须用switchTab跳转！)
			confirm(){
				console.log(this.aSelectList);
				new Promise((resolve,reject)=>{
					uni.setStorage({
						key:"subDepart",
						data:this.aSelectList,
						success: function() {
							console.log("ok");
							resolve(1);
						}
					});
				}).then(res =>{
					uni.switchTab({
						url:"/pages/OA/subscribe/subscribe"
					})
				})
				
			}
		},

	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	/* 头部大文字位置 */
	.Choose_Vtext{
		margin-top: 100rpx;
		height: 50rpx;
		width: 400rpx;
	}
	/* 头部大文字内容 */
	.Choose_text{
		font-size: 36rpx;
		color: #030303;
		font-weight: bold;
	}
	/* 头部小文字位置 */
	.pass_Vtext{
		margin-top: 26rpx;
		height: 34rpx;
		width: 168rpx;
	}
	/* 头部小文字内容 */
	.pass_text{
		font-size: 24rpx;
		color: #666666;
	}
	/* 大框框样式*/
	.Cstyle{
		display: flex;
		justify-content: space-between;
		border: 1px solid rgba(237, 234, 244, 100);
		border-radius: 40rpx;
		width: 670rpx;
		height: 780rpx;
		margin-top: 48rpx;
	}
	/* 左图片 */
	.img_left{
		height: 340rpx;
		width: 400rpx;
		margin-top: 220rpx;
		margin-left: -140rpx; 
		position: relative;
		left: 100rpx;
	}
	/* 右图片*/
	/* .img_right{
		height: 340rpx;
		width: 420rpx;
		margin-top: 45rpx;
	} */
	/* 右文字区域 */
	.text_in_right{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		width: 60%;
		margin-top: 80rpx;
	}
	/* 左文字区域 */
	/* .text_in_left{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		height: 100%;
		width: 50%;
	} */
	.text_hei_right{
		color: #030303;
		font-size: 40rpx;
		font-weight: bold;
	}
	/* .text_hei_left{
		color: #030303;
		font-size: 40rpx;
		font-weight: bold;
		margin-left: 34rpx;
	} */
	.text_hui_right{
		color: #666666;
		font-size: 28rpx;
		margin-top: 16rpx;
	}
	/* .text_hui_left{
		color: #666666;
		font-size: 28rpx;
		margin-top: 16rpx;
		margin-left: 34rpx;
	} */
	/* 小标签区域 */
	.label_in{
		margin-top: 16rpx;
		width: 410rpx;
		height: 150rpx;
		display: flex;
		flex-direction: raw;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	/* 每个标签样式 */
	a{
		margin-top: 20rpx;
		margin-right: 14rpx;
		height: 34rpx;
		width: 230rpx;
		color: #575757;	
		font-size: 24rpx;
		text-align: center; 
		border: 1px solid rgba(238, 238, 238, 100);
	}
	/* 点击标签样式 */
	.labelTag{
		margin-top: 20rpx;
		margin-right: 14rpx;
		height: 34rpx;
		width: 230rpx;
		color: #9E45BD;	
		font-size: 24rpx;
		text-align: center; 
		border: 1px solid #9E45BD;
	}
	/* 按钮区域 */
	.btn_area{
		width: 750rpx;
		height: 132rpx;
	}
	/* 跳过按钮 */
	.pass{
		height: 72rpx;
		width: 328rpx;
		margin-top: 30rpx;
		margin-left: 36rpx;
		display: inline-block;
		cursor: pointer;
		text-align: center;  
		justify-content: center;
		text-decoration: none;
		outline: none;
		font-size: 28rpx;
		color: #9E45BD;
		background-color: #FFFFFF;
		border: 1px solid rgba(158, 69, 189, 81);
		border-radius: 36rpx;
	}
	/* 确定区域 */
	.OOK{
		height: 72rpx;
		width: 328rpx;
		margin-top: 30rpx;
		margin-left: 36rpx;
		display: inline-block;
		cursor: pointer;
		text-align: center;  
		justify-content: center;
		text-decoration: none;
		outline: none;
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #9E45BD;
		border-radius: 36rpx;
	}
</style>
