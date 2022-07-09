<template>
	<view>
		<view class="fix">
			<view class="header">
				日寄广场
			</view>
			<view class="adddiary">+</view>
			<view class="btmstick"></view>
		</view>
		<view class="diaryList">
			<scroll-view 
				class="itemBox"
				scroll-y="true" 
				show-scrollbar="true" 
				scroll-top="0px" 
				refresher-enabled="true" 
				:refresher-triggered="refreshTri"
				@refresherrefresh="refresh()">
				<view class="item" 
					  v-for="(item,index) in iteminfo" :key="index"
					  @click.stop="forDetail(index,$event)">
					<view class="underlying1" :class="{'ani-lying':currentIndex==index}"></view>
					<view class="underlying2" :class="{'ani-lying':currentIndex==index}"></view>
					<view class="pen">
						<image src="../../static/subscribe/pen.png"></image>
					</view>
					<view class="itemTitle"><text>{{item.title}}</text></view>
					<view class="depart_time"><text>{{item.author.account}}</text><text>{{item.createTime}}</text></view>
					
				</view>
				<view  style="height: 100rpx; position: relative;">
					<view class="loadmore" v-if="isloadmore">
						<image src="../../static/subscribe/loadmore.png"></image> 正在加载中...
					</view>
					<view class="loadmore" v-else>没有更多内容了 X_X</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshTri:true,
				token: '',
				loadstorage: true,
				iteminfo: [],
				restItemInfo: [],
				ani_lying:'ani-lying',
				currentIndex: -1,
				isloadmore: false
			}
		},
		created(){
			this.getToken();
		
			// this.refresh();
		
		},
		onLoad(){
			this.refresh();
		},
		methods: {
			refresh(){
				if(this.refreshTri==false){
					this.refreshTri=true;
				}
				
				let t =setTimeout(()=>{
					console.log("刷新成功");
					this.loadstorage=false;
					
					this.getItemList();
					this.refreshTri=false;
					this.currentIndex=-1;
					clearTimeout(t);
					console.log(this.iteminfo);
				},1000)
				this.pageIndex=1;
			},
			async getToken(){
				let that=this;
				try{
					await new Promise((resolve, reject)=>{
						uni.getStorage({
							key:'token',
							success:function(res){
								that.token=res.data;
								console.log(that.token)
								resolve(1);
							},
							fail(err){
								console.log("您还没有登录");
								reject(1);
							}
						})
					})
				}catch(e){
					console.log("您还没有登录")
				}
			},
			getItemList(){
				let that=this;
					uni.request({
						url:"http://121.5.56.179:8890/happen/get_forum",
						data:{
							token: that.token
						},
						success:(res)=>{
							console.log("success")
							if(res.data.data==null){
								console.log("暂无日寄")
								that.iteminfo=[];
							}
							else{
								console.log("有很多日寄--")
								let getItemsOnce=res.data.data;
								console.log(getItemsOnce)
								let regexpTime = /\s/;
								let index=0;
								let content='';
								let keywords=[];
								for(let i=0; i<getItemsOnce.length; i++){
									if(getItemsOnce[i].createTime){
										content=getItemsOnce[i].createTime;
										index = content.search(regexpTime);
										getItemsOnce[i].createTime=content.slice(0,index);
										
									}
									
								}
								console.log(getItemsOnce);
								
								// 在本地获取收藏内容获取
								// if(that.loadstorage){
								// 	console.log("进来了")
								// 	uni.setStorage({
								// 	    key: 'subscrible',
								// 	    data: getItemsOnce,
								// 	    success: function () {
								// 	        console.log('sub storage success');
								// 	    }
								// 	});
								// 	that.loadstorage=false;
								// 	return;
								// }
								
								if(getItemsOnce.length<=10){
									that.iteminfo=getItemsOnce;
									that.restItemInfo=[];
								}
								else{
									let iteminfo=[]
									let restItemInfo=[]
									for(let i = 0; i<10; i++){
										iteminfo[i]=getItemsOnce[i];
										// that.iteminfo[i]=getItemsOnce[i];
									}
									for(let i=10; i<getItemsOnce.length; i++){
										restItemInfo[i-10]=getItemsOnce[i];
										// that.restItemInfo[i]=getItemsOnce[i];
									}
									that.iteminfo=iteminfo;
									that.restItemInfo=restItemInfo;
								}
							}
			
						},
						fail:(err)=>{
							console.log("fail")
							console.log(err)
						}
					})
			
			},
			forDetail(index,e){       //单击查看OA详情
				this.islongpress=false;
				this.currentIndex=index;
				// this.ani_lying="ani-lying";
				console.log("2222222222");
				let that=this;
				let objdata=this.iteminfo[index];
				uni.navigateTo({
					//传递id=1 方便下一页使用navigatBack ljs
					 url: '/pages/diaryDetail/diaryDetail?objdata='+JSON.stringify(objdata),
					 animationType: "slide-in-top",
					 animationDuration: 1000,
					
				});
				
			},
		}
	}
</script>

<style>
.fix{
	position: fixed;
	top: 0rpx;
	width: 100%;
}

.header{
	width: 100%;
	position: relative;
	padding: 20rpx 0;
	font-size: 60rpx;
	text-align: center;
}


.adddiary{
	position: absolute;
	top: 25rpx;
	width: 80rpx;
	height: 80rpx;
	font-size: 75rpx;
	color: white;
	line-height: 90%;
	text-align: center;
	border-radius: 50%;
	background-color: rgba(158, 69, 189, 0.8);
	right: 30rpx;
}

.btmstick{
	width:90%;
	height: 25rpx;
	background-color: rgba(158, 69, 189, 1);
	border-radius: 40rpx;
	margin: auto;
}

.diaryList{
	position: relative;
	top: 240rpx;
	width: 100%;
}

.itemBox{
	position: relative;
	width: 100%;
	/* height修改为100%  ljs*/
	/* height:100%; */
	height: 1400rpx;
	padding-top: 20rpx;
	background-color: white;
}
.itemBox .item{
	position: relative;
	width: 630rpx;
	heigth: 148rpx;
	background-color: white;
	/* border-radius: 20rpx; */
	padding: 20rpx 40rpx;
	margin-bottom: 40rpx;
	margin-left: 50%;
	transform: translateX(-50%);
	background-color: white;
	/* border: 3rpx #D7D7D7 solid; */
	/* border-bottom: 4rpx #E2C8EB solid; */
}
.depart_time{
	display: flex;
	margin-top: 30rpx;
	color: #9E45BD;
	justify-content: space-between;
}
.loadmore{
	position: relative;
	display: flex;
	justify-content: center;
}
.loadmore image{
	width: 40rpx;
	height: 40rpx;
	animation: loadmoreR 1s linear infinite;
}

@keyframes loadmoreR{
	25%{
		transform: rotateZ(90deg);
	}
	50%{
		transform: rotateZ(180deg);
	}
	75%{
		transform: rotateZ(270deg);
	}
	100%{
		transform: rotateZ(360deg);
	}
}

.underlying1, .underlying2{
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background-color: white;
	z-index: -1;
	border: 1px solid #E2C8EB;
}

.underlying1{
	clip-path: inset(55% 90% 0px 0px);
	
}
.underlying2{
	clip-path: inset(0px 0px 55% 90%);
}

.ani-lying{
	animation: lyinggo 0.5s linear 0s forwards;
}

@keyframes lyinggo{
	from{}
	to{
		clip-path: inset(0px 0px 0px 0px);
	}
}

.pen{
	position: absolute;
	top: -5px;
	right: -5px;
	width: 30px;
	height: 30px;
}

.pen image{
	width: 100%;
	height: 100%;
}


</style>
