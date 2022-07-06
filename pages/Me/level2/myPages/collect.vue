<template>
	<view>
		<!-- 上半区域位置固定 -->
		<view class="fix">
		<!-- 选项卡 -->
		<view class="inv-h-w">
		    <view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0" tabindex="0">已收藏OA</view>
		    <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1" tabindex="0">按照订阅分类</view>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<input class="searchType" type="text" value="" placeholder="搜索"/>
		</view>
		<view class="line"></view>
		</view>
		<!-- 选项卡1 -->
		<view v-show="Inv == 0">
			<view class="oaPosition">
			<!-- OA展示 -->
			<view class="oaPreview" v-for="(item,index) in oaList" :key="index">
					<view class="oaText" >
						<view @tap="forDetail(index,$event)">
						<view class="oaTitle" >
							<text>OA</text>
							<text>{{oaList[index].id}}</text>
						</view>
						<view><text>{{oaList[index].title}}</text></view>
						</view>
						<!-- 关键词 -->
						<view class="keywords">
							<view class="keywordsBox" >
								<view class="keywordsLabel" v-for="(item,index) in array" :key="index">
										<text class="keywordsLabelContent">{{item}}</text>						
								</view>
							</view>
							<view class="keywordWrite"><text>关键词</text></view>					
						</view>					
					</view>
					<!-- 图标和日志 -->
					<view class="iconPosition">
						<image class="goodIcon" :src="index==currentIndex?src2:src1" v-show="showUpImg" mode="" @tap="changeImg($event,index)"> </image>
						<!-- <image class="goodIcon" src="../../../../static/Me/myPage/good.png" v-show="showUpImg" mode="" @click="changeImg($event,index)"> </image>
						<image class="goodIcon" src="../../../../static/Me/myPage/cancelGood.png" v-show="!showUpImg" mode=""></image> -->
						<view class="shareBack">
							<image class="shareIcon" src="../../../../static/Me/myPage/shareSmaller.png" mode=""></image>
						</view>
						<view class="log">
							<view class="readAndCollect">
								<view>
									<text>{{oaList[index].readCount}}</text>
									<text>人已阅</text>
								</view>
								<view class="columLine">
									<text> | </text>
								</view>
								<view>
									<text>{{oaList[index].favoredCount}}</text>
									<text>人已收藏</text>
								</view>		
								<!-- <text>1234 人已阅 | 700人已收藏</text> -->
							</view>
							<view class="time"><text>{{oaList[index].timestamp}}</text></view>
						</view>
					</view>
		</view>
		</view>
		<!-- 返回上一页按钮 -->
		<button type="default" class="button" @click="goBack">返回上一页</button>
		</view>
		<!-- 选项卡2 -->
		<view class="" v-show="Inv == 1">
			<!-- 订阅部分展示 -->
			<view class="oaPosition">
			<view class="surbscribeBox">
				<view class="surbscribe">
					<view class="surbscribeLabel change" v-for="(item,index) in keywords" :key="index" tabindex="0">
						<view @tap="classifyBySub($event,index)">					
							<text class="surLabelContent">{{item}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- OA展示 -->
			<view class="oaPreview" v-for="(item,index) in oaSubList" :key="index">
				<view class="oaText">
					<view  @tap="forDetail(index,$event)">
					<view class="oaTitle" >
						<text>OA</text>
						<text>{{oaSubList[index].id}}</text>
					</view>
					<view><text>{{oaSubList[index].title}}</text></view>
					</view>
					<!-- 关键词 -->
					<view class="keywords">
						<view class="keywordsBox" >
							<view class="keywordsLabel" v-for="(item,index) in array" :key="index">
									<text class="keywordsLabelContent">{{item}}</text>						
							</view>
						</view>
						<view class="keywordWrite"><text>关键词</text></view>					
					</view>					
				</view>
				<!-- 图标和日志 -->
				<view class="iconPosition">
					<image class="goodIcon" :src="index==currentIndex?src2:src1" @click="changeImg($event,index)"> </image>
					<view class="shareBack">
						<image class="shareIcon" src="../../../../static/Me/myPage/shareSmaller.png" mode=""></image>
					</view>
					<view class="log">
						<view class="readAndCollect">
							<view>
								<text>{{oaSubList[index].readCount}}</text>
								<text>人已阅</text>
							</view>
							<view class="columLine">
								<text> | </text>
							</view>
							<view>
								<text>{{oaSubList[index].favoredCount}}</text>
								<text>人已收藏</text>
							</view>		
							<!-- <text>1234 人已阅 | 700人已收藏</text> -->
						</view>
						<view class="time"><text>{{oaSubList[index].timestamp}}</text></view>
					</view>
				</view>
	</view>		
			</view>
			<!-- 返回上一页按钮 -->
			<button type="default" class="button" @click="goBack">返回上一页</button>
		</view>
		
	</view>
</template>

<script>
	import{
			getOaFavorites,
			removeFavorites
		}from "../../axios/Me/Me.js";
	export default{
		data(){
			return{ 
				Inv:0,
				oaCount:0,
				showUpImg:true,
				currentIndex: -1,
				array:["新闻学院","知行书院","荧光夜跑"],
				// keywords:["新闻学院","知行书院","明德书院","德馨书院","工学院"],
				keywords:[],
				// token:"378fd578-4088-44a5-92e9-7921d4a24a6b",
				token:"",
				isDeleteCode:0,
				// page:0,
				src1:"../../../../static/Me/myPage/good.png",
				src2:"../../../../static/Me/myPage/cancelGood.png",
				oaList:[
					{
						id:0,
						title:"你好你好你好",
						timestamp:"2021-11-17T12:10:37",
						subcompanyName:"教务处",
						keywords:"",
						favoredCount:1,
						readCount:0						
					}
				],
				oaSubList:[],
				surbscribes:[]
				
			}
		},
		onLoad() {
			this.getToken();
			this.getSubDepart();
			// this.getOaFavorites(this.token,this.page,2);
			this.getOaFavorites(this.token,1,20);
		},
		// onReachBottom() {
		// 	this.page++;
		// 	this.getOaFavorites(this.token,this.page,2);
		// 		},
		methods:{
			//获取缓存的用户token
			getToken(){
				let that=this;
				let token="";
				uni.getStorage({
					key:'token',
					success: function(res) {
						token = res.data;
						// that.getOaFavorites(this.token,1,20);
					}					
				});
				this.token=token;
				// console.log(this.token);
			},
			//获取缓存的用户订阅词
			getSubDepart(){
				let that=this;
				let keyWords=[];
				uni.getStorage({
					key:'subDepart',
					success: function(res) {
						keyWords = res.data;
						console.log(keyWords[0]);
					}
				});
				this.keywords=keyWords;
				console.log(this.keywords[0]);
			},
			// 按照订阅分类
			classifyBySub:function(e,index){				
					var indexindex = e.target.dataset.index;				
					var items = this.keywords;
					console.log(items[index]);
					for (let i = 0; i < this.oaCount; i++) { 
					    if(items[index]==this.oaList[i].subcompanyName){
							this.surbscribes.push(i);
						}
					 }
					 console.log(this.surbscribes[0]);
					 var oaSubList=[]
					 for(let i = 0; i < this.surbscribes.length; i++){
						 var index=this.surbscribes[i];
						 
						 oaSubList.push(this.oaSubList[index]);
					 }
					 this.oaSubList=oaSubList;
					 console.log(this.oaSubList);
					
			},
			goBack(){
				uni.navigateBack({
					//改用navigateBack返回上一页 ljs
					delta:1
					// url:'../../level1/myPages/myPages'
				})
			},
			// deleteLabel: function(e) {
			// 	var index = e.target.dataset.index;
			// 	var that = this;
			// 	var items = that.idList;
			// 	console.log(index);
			// 	items.splice(index, 1);
			// 	that.itemList = items;
			// 	that.num = index+1;
			// 	// console.log(that.num);
			// 	// this.collectList.push({
			// 	// 	labelId: this.num,
			// 	// });
				
			// },
			//改变爱心图标,取消收藏
			changeImg:function(e,index){
				//更换爱心图标
				this.currentIndex=index;	
				//取消收藏
				var indexindex = e.target.dataset.index;
				var items = this.oaList;
				// console.log(items[0].id);
				var oaId=items[index].id;
				var that=this;
				// console.log(oaId);
				this.removeFavorites(this.token,oaId);
				setTimeout(function(){
					// let that=this;
					// items.splice(indexindex, 1);
					uni.showToast({
						title: '取消收藏',
						icon:'none',
						duration: 2000
						  	});		
					 },500);
					 setTimeout(function(){					 		
					 		that.reload();
					 	 },2000);			
			},
			
			//获取收藏的OA列表
			getOaFavorites(token,page,size){
				return getOaFavorites(token,page,size).then(
				(res) => {
					console.log("ok");
					this.oaCount=res.data.data.oaDtoList.length;
					this.oaList=res.data.data.oaDtoList;	
					this.oaSubList=res.data.data.oaDtoList;
					this.surbscribe=this.oaSubList.subcompanyName;
					// console.log(this.oaList[0].id)
					},
				(err) => {
				  console.log(err);
				}
				);
			},
			removeFavorites(token,oaId){
				return removeFavorites(token,oaId).then(
				(res) => {
					console.log("ok");
					console.log(res.data.code);
					this.isDeleteCode=res.data.code;
					},
				(err) => {
				  console.log(err);
				}
				);
			},
			 /* 获取当前页带参数的url */
			splicePageUrlWithParams(obj) {
			    const path = obj.route
			    const query = obj.options
			    // 拼接url的参数
			    var urlWithParams = '/' + path + '?'
			    for (let key in query) {
			        const value = query[key]
			        urlWithParams += key + '=' + value + '&'
			        }
			    urlWithParams = urlWithParams.substring(0, urlWithParams.length - 1)
			    return urlWithParams
			    },
			// 获取当前页面路由
			getPageUrl(lastIndex, withParams = true) {
			    const pages = getCurrentPages()
			    if (pages.length > 0 && pages.length >= lastIndex) {
					const thePage = pages.splice(-lastIndex, 1)[0]
					if (withParams) {
						return this.splicePageUrlWithParams(thePage)
						 }
					else {
						return `/${thePage.route}`
							}
			       } 
				else {
			        console.log('pages are empty or lastIndex error')
			        return ''
			        }
			    },
			reload() {
			    // 获取当前页面路由
			    const url = this.getPageUrl(1) 
			    uni.reLaunch({
			        url,
			        success: () => {
			            console.log('reload触发了!!!!!! url====>' + url)
			            }	            
			        })
			    },
			//单击查看OA详情
			forDetail(index,e){       
			    let objdata={
			     title:this.oaList[index].title,
			     timestamp:this.oaList[index].timestamp,
			     keywords:this.oaList[index].keyWords,
			     readCount:this.oaList[index].readCount,
			     favoredCount:this.oaList[index].favoredCount
			    }
			    uni.navigateTo({
			     //传递id=1 方便下一页使用navigatBack ljs
			     url: '/pages/OA/OADetail/OADetail?id='+this.oaList[index].id+'&obj='+JSON.stringify(objdata),
			      animationType: "slide-in-top",
			      animationDuration: 1000,
			     
			    });
			    
			   },
		
	},
	}
</script>

<style scoped>
	/* 固定选项卡位置 */
	.fix{
		top: 0; 
		/* 添加top0固定顶部 ljs*/
		position: fixed;
		z-index: 2;
		width: 100%;
		background-color: white;
	}
	/* 选项卡样式 */
	.inv-h-w{
		margin-top: 70rpx;
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		width: 530rpx;
		}
	.inv-h{ 
		font-size: 38rpx;
		/* font-weight: 550; */
		flex: 1;
		text-align: center;
		color: #666666;
		height: 72rpx;
		line-height: 60rpx;
		margin-left: 30rpx;
		}
	.inv-h:focus{
		outline: none;
		font-weight: 550;
		color: #030303;
	}
	.inv-h-se{			
		border-bottom: 8rpx solid #9E45BD;
		/* margin-left: 30rpx; */
		}
	/* 搜索栏 */
	.search{			
		position: relative;
		top: 30rpx;
		left: 40rpx;
	}
	.searchType{
		padding-left: 40rpx;
		width: 640rpx;
		height: 88rpx;
		background-color: #EDEAF4;
		border-radius: 40rpx;
		text-align: center;
	}
	/* 分割线 */
	.line{
		margin-top: 60rpx;
		border-bottom: 3rpx solid #EDEAF4;
		box-shadow: 0 0 30rpx #CCC;
	}
	/* OA展示部分 */
	.oaPosition{
		position: relative;
		top: 300rpx;
		padding-bottom: 160rpx;
	}
	.oaPreview{
		margin-top: 60rpx;
		margin-left: 40rpx;
		width: 670rpx;
		border-radius: 60rpx;
		box-shadow: inset 0 0 10rpx #CCC;
	}
	.oaText{
		margin-left: 40rpx;
		padding-top: 20rpx;
		color: #666666;
	}
	.oaTitle{
		color: black;
		font-size: 40rpx;
		font-weight: 550;
		margin-bottom: 15rpx;
	}
	/* 关键词部分 */
	.keywords{
		position: relative;
		top: 60rpx;
		left: -40rpx;
		width: 670rpx;
		/* height: 152rpx; */
		box-shadow: inset 0 0 10rpx #CCC;
	}
	.keywordsBox{
		width: 595rpx;
		display: flex;
		padding-left: 47rpx;
		padding-top: 20rpx;	
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}
	.keywordsLabel{
		/* width: 166rpx; */
		height: 58rpx;		
		border-radius: 25rpx;
		margin-right: 23rpx;
		margin-bottom: 20rpx;
		background-color: #9E45BD;
		text-align: center;
	}
	.keywordWrite{
		color: #9E45BD;
		padding-bottom: 20rpx;
		margin-left: 520rpx;
		font-size: 30rpx;
	}
	.keywordsLabelContent{
		color: white;	
		padding: 29rpx;
		font-size: 30rpx;
		position: relative;
		top: 7rpx;
	}
	/* 点赞和转发图标部分 */
	.iconPosition{
		right: 6rpx;
		position: relative;
		top: 85rpx;
		display: flex;
		height: 190rpx;
	}
	.goodIcon{		
		left: 30rpx;
		width: 72rpx;
		height: 72rpx;
	}
	.shareBack{
		width: 80rpx;
		height: 60rpx;
		background-color: 	#DDA0DD;
		border-radius: 20rpx;
		margin-left: 60rpx;
	}
	.shareIcon{
		width: 45rpx;
		height: 45rpx;
		padding-left: 16rpx;
		margin-top: 10rpx;
	}
	/* OA右下角信息部分 */
	.log{
		color: #5D6371;
		width: 350rpx;
		font-size: 25rpx;
		position: relative;
		left: 145rpx;
		margin-right: 20rpx;
	}
	/* 阅读数量和收藏数量 */
	.readAndCollect{
		margin-top: 0rpx;
		justify-content: center;
		display: flex;
	}
	/* 时间 */
	.time{
		margin-top: 15rpx;
		text-align: center;
	}
	/* 竖线 */
	.columLine{
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	/* 订阅分类部分的订阅标签 */
	.surbscribeBox{
		margin-top: 40rpx;
		margin-left: 35rpx;
		width: 670rpx;
		/* height: 200rpx; */
		border:solid 2rpx #C4C4C4;
	}
	.surbscribe{
		display: flex;
		/* padding: 21rpx; */
		margin-left: 25rpx;
		margin-top: 10rpx;
		margin-bottom: 28rpx;
		flex-direction: raw;
		flex-wrap: wrap;
		/* justify-content: space-between; */
	}
	.surbscribeLabel{
		/* width: 166rpx; */
		height: 68rpx;		
		border-radius: 15rpx;
		background-color: #9E45BD;
		margin-top: 20rpx;
		margin-right: 19rpx;
		margin-left: 5rpx;
	}
	.surLabelContent{
		color: white;
		padding: 35rpx;
		font-size: 30rpx;		
		position: relative;
		top: 12rpx;
	}
	/* 点击改变订阅标签颜色 */
	.change:focus{
		outline: none;
		background-color: #DDA0DD;
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
