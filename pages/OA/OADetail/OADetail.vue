<template>
	<view>
		<view class="OAHead">
			<view class="titlePart"><span><text>{{OAtitle}}</text></span></view>
			<view style="position: relative;width: 100%;">
				<view class="dataPart" :class="{'ani_dataPart':arrowControl}">
					<view class="read_collect"><text>{{favoredCount}}\n收藏人数</text><text>{{readCount}}\n阅读人数</text></view>
					<view class="collBtn" ><button @click.stop="collBtn()" :class="{colltTapped}">{{buttonValue}}</button></view>
				</view>
				<view class="kWPart" :class="{'ani_KWPart':arrowControl}">
					<scroll-view style="width: 700rpx; height: 124rpx; white-space: nowrap" scroll-x="true" show-scrollbar="false">
						<text v-for="(item, index) in keywords" :key="index">{{item}}</text>
						<!-- <text>关键词1</text><text>关键词2</text><text>关键词3</text><text>关键词3</text><text>关键词3</text> -->
					</scroll-view>
				
				</view>
			</view>
			<view class="arrow" :class="{'arrow_direction':arrowControl}">
				<image src="../../../static/subscribe/arrowdown.png" @click.stop="arrowController()"></image>
			</view>
		</view>
		<view class="OAContent" :style="{top:arrowT}">
			<image src="../../../static/subscribe/planet.png"></image>
			<view class="contentBox">
				<view class="depart_time"><text>{{timestamp}}</text></view>
				<view class="main">
					<view class="left"><text>OA详情</text></view>
					<scroll-view scroll-y='true' scroll-x="true">
						<view  style="width: 560rpx;" v-html="content">{{content}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 返回上一页按钮 ljs-->
		<button type="default" class="button" @click="goBack">返回上一页</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				colltTapped:'',
				content: '',
				OAtitle:'OAtitle',
				keywords:[],
				readCount:0,
				favoredCount:0,
				timestamp:0,
				arrowControl: false,
				id:-1,
				clicktwice: false,
				buttonValue: '收藏',
				arrowT:'auto',
				token:'',
				updateStor:false
			}
		},
		onLoad(option){
			console.log(option.id);
			this.id = parseInt(option.id);
			console.log(JSON.parse(option.obj));
			let objdata = JSON.parse(option.obj);
			this.OAtitle=objdata.title;
			this.keywords = objdata.keywords;
			this.readCount=objdata.readCount;
			this.favoredCount=objdata.favoredCount;
			this.timestamp=objdata.timestamp;
			this.token=objdata.token;
			console.log("getToken: "+this.token);
			let that = this;
				uni.request({
					url:'http://119.23.222.86:8890/oa/details',
					data:{
						OAId: this.id
					},
					success: (res) => {
					
						// console.log(res.data.data.content);
						let content = res.data.data.content;
						let exp = /\<\/p>/;
						let index = content.search(exp)+4;
						that.content = content.slice(index);
						// console.log(that.content)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			this.checkfavor(this.id)
		},
		watch:{
			updateStor(){
				// if(this.updateStor){
					let that = this;
					console.log("变了")
					uni.request({
						url:"http://119.23.222.86:8890/oa/favorites",
						data:{
							token:this.token,
							page:1,
							size:3
						},
						success(res){
							if(res.data.data!=null){
								let subs = res.data.data.oaDtoList;
								uni.setStorage({
									key:'subscrible',
									data:subs,
									success() {
										console.log("更新收藏缓存成功")
									}
								})
							}
							else{
								console.log("这里没有缓存")
								uni.removeStorage({
									key:'subscrible',
									success() {
										console.log("删除缓存成功")
									}
								})
							}
							that.updateStor=false;
							
						}
					})
				// }
				
			}
		},
		methods: {
			async checkfavor(oaId){
				let that = this;
				await uni.getStorage({
					key:'subscrible',
					success(res){
						console.log("get sub storage: ");
						let subs = res.data;
						for(let i=0; i<subs.length; i++){
							if(subs[i].id==that.id){
								console.log("收藏过的");
								that.buttonValue="已收藏";
								that.colltTapped='colltTapped';
								that.clicktwice=true;
								break;
							}
						}
					},
					fail() {
						console.log('没有缓存');
						that.tocheckfavor();
						
					}
				})
			},
			tocheckfavor(){
				let that =this;
				uni.request({
					url:"http://119.23.222.86:8890/oa/favorites",
					data:{
						token:this.token,
						page:1,
						size:3
					},
					success(res){
						if(res.data.data!=null){
							let subs = res.data.data.oaDtoList;
							for(let i=0; i<subs.length; i++){
								if(subs[i].id==that.id){
									console.log("收藏过的");
									that.buttonValue="已收藏";
									that.colltTapped='colltTapped';
									that.clicktwice=true;
									break;
								}
							}
						}
					}
				})
			},
			async collBtn(){
				this.colltTapped='colltTapped';
				let that = this;
				if(!this.clicktwice){
					uni.request({
						url:'http://119.23.222.86:8890/user-favorites/add-to-favorites',
						data:{
							token:this.token,
							oaId:this.id
						},
						success(res){
							that.buttonValue="收藏成功";
							that.colltTapped='colltTapped';
							

							//解决收藏后没有及时更新缓存的问题
							that.updateStor=true;

							
							
							console.log("收藏成功");
							console.log(res)
						},
						fail(err){
							that.colltTapped='';
							uni.showToast({
								title:'收藏失败',
								duration: 1000
							})
							console.log(err)
						}
					
					})
					this.clicktwice=true;
				}
				else{
				    uni.request({
						url:"http://119.23.222.86:8890/user-favorites/remove-from-favorites",
						data:{
							token:this.token,
							oaId:this.id
						},
						success(res){
							that.buttonValue="收藏";
							that.colltTapped='';
							

							//解决取消收藏后没有及时更新缓存的问题
							that.updateStor=true;

							
							console.log("取消收藏")
							console.log(res)
						},
						fail(err){
							that.colltTapped='colltTapped';
							uni.showToast({
								title:'取消收藏失败',
								duration: 1000
							})
							console.log(err)
						}
					})
					this.clicktwice=false;
				}
			},
			arrowController(){
				this.arrowControl=!this.arrowControl;
			    if(this.arrowControl){
					let el = uni.createSelectorQuery().in(this).select('.OAHead');
					el.boundingClientRect(data=>{
						console.log(data);
						this.arrowT = parseInt(data.height)+'px'
					}).exec()
				}else{
					
				}
			},
			//返回上一页 函数 ljs
			goBack(){	
				uni.navigateBack({			
					delta:1
				})
			}
		}
	}
</script>

<style>
	.OAHead{
		width: 100%;
	}
	.titlePart{
		width: 746rpx;
		height: fit-content;
		border: 2rpx solid #BFBFBF;
		font-size: 50rpx;
		text-align: center;
	}
	.titlePart span{
		display: inline-block;
		width: 600rpx;
		height: fit-content;
		margin: 15rpx 0rpx;
	}
	.titlePart span text{
		/* line-height: 300%; */
	}
	
	.arrow{
		position: relative;
		top: auto;  
		width: fit-content;
		height: fit-content;
		transform: translateX(-50%);
		left: 50%;
		/* transition: transform 1s linear; */
		z-index: 11;
		/* background-color: #007AFF; */
	}
	
	.arrow image{
		width: 60rpx;
		height: 60rpx;
		
		animation: ani-arrow 1.5s infinite;
	}
	@keyframes ani-arrow{
		25%{
			transform: translate(0%,-3px);
		}
		50%,100%{
			transform: translate(0%,0);
		}
		75%{
			transform: translate(0%,3px);
		}
	}
	.arrow_direction{
		animation: arrow-direction 1s linear forwards;
		/* transform: translateY(50px); */
		/* width: 100px; */
	}
	@keyframes arrow-direction{
		0%{
			/* top: auto; */
			transform: rotateZ(0deg) translateX(-50%);
		}
		50%{
			/* top:235rpx; */
			
			transform: rotateZ(90deg) translateX(50%);
		}
		100%{
			/* top: 450rpx; */
			transform: rotateZ(180deg) translateX(50%);
		}
	}
	.dataPart{
		position: relative;
		z-index: 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		background-color: white;
		height:0rpx;
		overflow: hidden;
		font-size: 25rpx;
	}
	
	.ani_dataPart{
		animation: ani-dataPart 0.5s linear forwards;
	}
	
	@keyframes ani-dataPart{
		0%{
			z-index: 10;
			height: 0rpx;
		}
		100%{
			z-index: 10;
			height: 150rpx;
		}
	}
	
	
	.read_collect{
		width: 400rpx;
		display: flex;
		padding-top: 20rpx;
		justify-content: space-around;
		text-align: center;
	}
	
	.read_collect text{
		white-space: pre-wrap;
		line-height: 200%;
	}
	
	.collBtn{
		width: 220rpx;
		padding-right: 30rpx;
	}
	.collBtn button{
		position: relative;
		top: 50%;
		transform: translateY(-70%);
		font-size: 30rpx;
		color: white;
		border-radius: 60rpx;
		background-color: #B068C9;
		
	}
	.colltTapped{
		background-color: #b39dc9 !important;
	}
	
	.kWPart{
		position: relative;
		z-index: 10;
		width: 100%;
		display: flex;
		/* top: 340rpx; */
		background-color: white;
		height: 0rpx;
		overflow: hidden;
		/* justify-content: space-around; */
		padding: 0rpx 0rpx;
		box-shadow: 0rpx 4rpx 10rpx #BFBFBF;
	}
	
	.ani_KWPart{
		animation: ani-KWPart 0.5s 0.5s linear forwards;
	}
	@keyframes ani-KWPart{
		0%{
			z-index: 10;
			height: 0rpx;
		}
		100%{
			z-index: 10;
			height: 122rpx;
		}
	}
	
	
	.kWPart scroll-view text{
		border-radius: 20rpx;
		background-color: #B068C9;
		font-size: 30rpx;
		color: white;
		padding: 15rpx 35rpx;
		margin-left: 50rpx;
		margin-right: 10rpx;
		line-height: 430%;
		
	}
	.OAContent{
		position: absolute;
		top: auto;
		width: 100%;
	} 
	.OAContent image{
		position: absolute;
		left: 3%;
		width: 200rpx;
		height: 200rpx;
		transform: rotateZ(-45deg);
		z-index: 5;
	}
	.OAContent .contentBox{
		position: relative;
		width: 700rpx;
		height: 1100rpx;
		left: 50%;
		transform: translate(-50%, 8%);
		
		box-shadow: 0rpx 4rpx 10rpx 4rpx #BFBFBF;
	}
	.depart_time{
		/* width: 100%; */
		height: 80rpx;
		color: #C1C1C1;
		padding-left: 25%;
	}
	.depart_time text{
		line-height: 120rpx;
	}
	.main{
		position: relative;
		display: flex;
	}
	.main .left{
		font-size: 40rpx;
		color: #CB9ADD;
		width: 50rpx;
		padding: 40rpx 20rpx 40rpx 30rpx;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.main .left text{
		line-height: 80rpx;
	}
	
	.main scroll-view{
		width: 580rpx;
		height: 900rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #BFBFBF;
	}
	/* 返回上一页按钮 ljs*/
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
