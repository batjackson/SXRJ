<template>
	<view>
		<scroll-view class="itemBox" v-if="!noContent"  
			scroll-y="true" show-scrollbar="true" scroll-top="0px" refresher-enabled="true" :refresher-triggered="refreshTri"
			@scroll="getScrollPos($event)" @scrolltolower="scrolltoend()" @refresherrefresh="refresh()">
			<view class="item" 
				  :class="{'item_change': index==currentIndex, 'item_change_paused': item_change_paused}"
				  v-for="(item,index) in iteminfo" :key="index"
				  @longpress="longpress(index,$event)"
				  @click.stop="forDetail(index,$event)">
				<view class="itemTitle"><text>{{item.title}}</text></view>
				<view class="depart_time"><text>{{item.subcompanyName}}</text><text>{{item.timestamp}}</text></view>
			</view>
			<view  style="height: 100rpx; position: relative;">
				<view class="loadmore" v-if="isloadmore">
					<image src="../../../../static/subscribe/loadmore.png"></image> 正在加载中...
				</view>
				<view class="loadmore" v-else>没有更多内容了 X_X</view>
			</view>
		</scroll-view>
		<view v-if="noContent"style="background-color: white; text-align: center; font-size: 20px;"><text>暂无订阅内容~</text></view>
		<!-- :class="{'infoWindowShow':infoWindowShow}" -->
		<view class="windowMask" @click.stop="tohide" v-if="infoWindowShow">
			<view class="infoWindow" @click.stop="keepshow($event)"  :style="{top: infoWindowTop}">
				<view class="windowTitle" :class="{'ani_windowTitle': ani_windowTitle}"><text>内容摘要</text></view>
				

				<view class="windowAbstract" :class="{'ani_windowAbstract': ani_windowAbstract}" :style="{height: abstractH}"><span><text>{{iteminfo[currentIndex].keyText}} </text></span></view>
				<view class="windowKwords" :class="{'ani_windowKwords': ani_windowKwords}"><text v-for="(word,index) in iteminfo[currentIndex].keywords" :key='index'>{{word}}</text></view>

				<view class="windowRnum" :class="{'ani_windowRnum': ani_windowRnum}"><text>阅读人数 {{iteminfo[currentIndex].readCount}}|收藏人数 {{iteminfo[currentIndex].favoredCount}}</text><text>{{iteminfo[currentIndex].timestamp}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"OAItemList",
		props:{selectedCard:Number, searchValue:String},
		data() {
			return {
				currentIndex:10,   				//被选中的OA item
				item_change_paused:false,       //动画暂停
				ani_paused:{},                  //动画暂停定时器
				infoWindowShow:false,           //是否显示OA弹窗
				ani_windowTitle:false,          //弹窗动画
				ani_windowAbstract:false,		//弹窗动画
				ani_windowKwords:false,			//弹窗动画
				ani_windowRnum:false,			//弹窗动画
				changePos:80,					//弹窗偏移动画
				scrollPos:0,					//滚动条偏移量
				islongpress:true,				//是否长按
				infoWindowTop: '0px',           //长按后显示框高度
				abstractH: '200rpx',               //摘要高度
				isloadmore: false,              //是否加载更多
				noContent:false,               //有无订阅内容
				token:'',
				loadstorage: true,
				refreshTri:true,
				ifNext:false,
				pageIndex:1,
				// 暂时的内容摘要

				// abContent: "书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉书中自有黄金屋",

				restItemInfo: [
					// {
					// 	id: 8710,
					// 	title:"标题嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-10-10",
					// 	abContent:"书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉",
					// 	keyWords: ['关键词1关键词3','关键词3','关键词4','关键词5'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 7430,
					// 	title:"标题2嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-11-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉，书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 1030,
					// 	title:"标题3嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-12-10",
					// 	abContent:"书中自有黄金屋书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// }
				],               //下一页的
				//OA Item
				iteminfo:[
					// {
					// 	id: 8710,
					// 	title:"标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷标题嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-10-10",
					// 	abContent:"书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉书中自有黄金屋书中自有颜如玉",
					// 	keyWords: ['关键词1关键词3','关键词3','关键词4','关键词5'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 7430,
					// 	title:"标题2嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-11-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉，书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 1030,
					// 	title:"标题3嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-12-10",
					// 	abContent:"书中自有黄金屋书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 3590,
					// 	title:"标题嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-10-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 11270,
					// 	title:"标题2嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-11-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 4870,
					// 	title:"标题3嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-12-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 6150,
					// 	title:"标题嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	announceDate: "2021-10-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 2310,
					// 	title:"标题2嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-11-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 9990,
					// 	title:"标题3嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-12-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// },
					// {
					// 	id: 12550,
					// 	title:"标题5嗷嗷嗷",
					// 	subcompanyName: "通知单位",
					// 	timestamp: "2021-12-10",
					// 	abContent:"书中自有黄金屋，书中自有颜如玉书中自有黄金屋，书中自有颜如玉",
					// 	keyWords: ['关键词1','关键词2','关键词2'],
					// 	readCount:1234,
					// 	favoredCount:1234
					// }
				]
			};
		},
		watch:{
			selectedCard(){    //监听父组件传递的参数变化
				console.log("selectedCard: "+this.selectedCard);
				console.log("list-token: "+this.token);
				if(this.selectedCard==1){
					this.loadstorage=false;
					let url="http://119.23.222.86:8890/oa/list";
					let datas = {
							page:1,
							size:20,
							order:1,
							str:"通知"
						}
					this.getItemList(url,datas);
				}
				else{
					let that = this;
					// uni.getStorage({
					// 	key:'subscrible',
					// 	success(res){
					// 		console.log("get sub storage: ");
					// 		that.iteminfo=res.data;
					// 	},
					// 	fail(){
					// 		console.log('没有缓存');
					// 		let url = "http://119.23.222.86:8890/oa/favorites";
					// 		let datas = {
					// 			token:this.token,
					// 			page:1,
					// 			size:3
					// 		}
					// 		that.getItemList(url,datas);
					// 	}
					// })
					
					// 获取订阅内容
					uni.getStorage({
						key:'subDepart',
						success(res){
							console.log("get subDepart");
							// that.iteminfo=res.data

							console.log(res.data);
							that.searchFun(res.data);

						},
						fail(err){
							that.noContent=true;
							console.log("获取订阅失败")
							console.log(err)
						}
					})
					
				}
			},
			searchValue(){
				console.log(this.searchValue);
				this.searchFun(this.searchValue);
			}
		},
		created(){
			this.getToken();
			// let url = "http://119.23.222.86:8890/oa/favorites";
			// let datas = {
			// 	token:this.token,
			// 	page:1,
			// 	size:10
			// }
			// this.getItemList(url,datas);

			this.refresh(this.selectedCard);

		},
		methods:{
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
			toJSON(){
			   return this;	
			},
			toStyle(){
			   return this;	
			},
			longpress(index,e){    //长按处理函数
				if(this.islongpress)
				{
					this.item_change=true;
					this.currentIndex=index;
					let itemH = 0;
					// let infoWindow = this.$refs.infoWindow;
					let el = uni.createSelectorQuery().in(this).selectAll('.item');
					el.boundingClientRect(data=>{
						// console.log('index:'+index)
						// console.log(data[index]);
						
						for(let i=0;i<index;i++){
							
							itemH = itemH + parseInt(data[i].height);
						}
						this.infoWindowTop=index*21+itemH-this.scrollPos+130+'px';
						console.log("this.infoWindowTop: "+this.infoWindowTop)
						

						let lines=0;
						if(this.iteminfo[index].keyText){
							lines = Math.ceil((this.iteminfo[index].keyText.length)/14);
						}
						else{
							this.iteminfo[index].keyText="哎呀~摘要不见了";
							lines = Math.ceil((this.iteminfo[index].keyText.length)/14)+2;
						}
						//使用暂时内容摘要代替
						// let lines = Math.ceil((this.abContent.length)/14);

						
						
						
						console.log(lines);
						this.abstractH = lines*47+'rpx';
						
						this.infoWindowShow=true;
						this.ani_windowTitle=true;
						this.ani_windowAbstract=true;
						this.ani_windowKwords=true;
						this.ani_windowRnum=true;
						this.ani_paused=setTimeout(()=>{
							this.item_change_paused=true;	
						},500)
						
					}).exec();
					
					
					
					// this.infoWindowShow=true;
				}
				else{
					console.log('非长按');
					this.islongpress=true;
				}
			
				
			},
			keepshow(e){         //点击弹窗内部无响应
				console.log("显示");
				let el = uni.createSelectorQuery().in(this).select('.windowAbstract');
				el.boundingClientRect(data=>{
					console.log(data)
				}).exec()
			},
			tohide(){         //点击弹窗以外区域将隐藏弹窗
				console.log("隐藏");
				this.infoWindowShow=false
				this.item_change_paused=false;
				this.item_change=false;
				
				
				
				this.ani_windowTitle=false;
				
				
				
				this.ani_windowAbstract=false;
				this.ani_windowKwords=false;
				this.ani_windowRnum=false;
				clearTimeout(this.ani_paused);
			},
			getScrollPos(e){    //获取滚动条位置
				this.scrollPos=e.detail.scrollTop;
				
			},
			forDetail(index,e){       //单击查看OA详情
				this.islongpress=false;
				this.currentIndex=index;
				console.log("2222222222");
				let that=this;
				let objdata={
					title:this.iteminfo[index].title,
					timestamp:this.iteminfo[index].timestamp,
					keywords:this.iteminfo[index].keyWords,
					readCount:this.iteminfo[index].readCount,
					favoredCount:this.iteminfo[index].favoredCount,
					token:this.token
				}
				uni.navigateTo({
					//传递id=1 方便下一页使用navigatBack ljs
					url: '/pages/OA/OADetail/OADetail?id='+this.iteminfo[index].id+'&obj='+JSON.stringify(objdata),
					 animationType: "slide-in-top",
					 animationDuration: 1000,
					
				});
				
			},
			getItemList(url,datas){
				let that=this;
					uni.request({
						url:url,
						data:datas,
						success:(res)=>{
							console.log("success")
							if(res.data.data==null){
								console.log("暂无收藏")
								that.iteminfo=[];
								that.noContent=true;
							}
							else{
								console.log("有很多oa---")
								let getItemsOnce=res.data.data.oaDtoList;
								let regexpTime = /T/;
								let index=0;
								let content='';
								let keywords=[];
								for(let i=0; i<getItemsOnce.length; i++){
									if(getItemsOnce[i].timestamp){
										content=getItemsOnce[i].timestamp;
										index = content.search(regexpTime);
										getItemsOnce[i].timestamp=content.slice(0,index);
									}
									if(getItemsOnce[i].keywords){
										
										keywords = (getItemsOnce[i].keywords).split(";"); 
										(getItemsOnce[i].keywords)=keywords;
									}
									
								}
								this.ifNext=res.data.data.ifNext;
								console.log(getItemsOnce);
								console.log()
								
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
								
								that.noContent=false;
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
			refresh(selectedCardNum){
				if(this.refreshTri==false){
					this.refreshTri=true;
				}
				let t =setTimeout(()=>{
					console.log("刷新成功");
					this.loadstorage=false;
					if(this.selectedCard==1){
						let url="http://119.23.222.86:8890/oa/list";
						let datas = {
								page:1,
								size:20,
								order:1,
								str:"通知"
							}
						this.getItemList(url,datas);
						this.refreshTri=false;
						clearTimeout(t);
						this.$emit("resetInput")
					}
					else{
						let that=this;
						uni.getStorage({
							key:'subDepart',
							success(res){
								console.log("get subDepart");
								// that.iteminfo=res.data
								console.log(res.data);
								that.searchFun(res.data);
							},
							fail(err){
								that.noContent=true;
								console.log("获取订阅失败")
								console.log(err)
							}
						})
						this.refreshTri=false;
						clearTimeout(t);
					}
					
				},1000)
				this.pageIndex=1;
			},
			scrolltoend(){
				console.log("到底啦");
				if(this.restItemInfo.length>0){
					this.isloadmore=true;
					let t = setTimeout(()=>{
						this.iteminfo=this.iteminfo.concat(this.restItemInfo);
						this.restItemInfo=[];
						this.isloadmore=false;
						clearTimeout(t)
					},1000)
					if(this.ifNext){
						let that=this;
						uni.request({
							url:'http://119.23.222.86:8890/oa/list?page=1&size=10&order=1&str=通知',
							data:{
								page:this.pageIndex,
								size:10,
								order:1,
								str:"通知"
							},
							success(res){
								console.log("add success")
								console.log(res.data.data.oaDtoList)
								that.ifNext=res.data.data.ifNext;
								that.restItemInfo=res.data.data.oaDtoList;
							}
						})
						this.pageIndex++;
					}
					
				}
				else{
					// 请求加载更多
					this.isloadmore=false
				}
			},
			searchFun(searchValue){
				let that = this;
				let d = 1; //请求次数
				let searchArr=[]; //存放订阅词
				let subinfo=[];   //存放订阅条目
				if(typeof(searchValue)=="object"){
					d = searchValue.length;
					searchArr=searchValue;
					console.log(searchArr)
				}
				else{
					searchArr[0]=searchValue;
				}
				
				
				for(let i=0;i<d;i++){
					uni.request({
						url:"http://119.23.222.86:8890/oa/list",
						data:{
							page:1,
							size:10,
							str: searchArr[i],
							order:0
						},
						success(res) {
							console.log("搜索成功")
							console.log(res)
							let oaDtoList = res.data.data.oaDtoList;
							if(oaDtoList){
								// that.iteminfo=oaDtoList;
								subinfo=subinfo.concat(oaDtoList);
								
							}
							else{
								
								console.log("搜索不到订阅："+searchArr[i])
							}
						},
						fail(err){
							uni.showToast({
								title:"搜索失败",
								icon:"error",
								duration:2000
							})
							that.noContent=true;
							console.log("搜索失败")
							console.log(err)
							return;
						}
					})
				}
				
				let t=setTimeout(()=>{
					if(subinfo){
						let getItemsOnce=subinfo;
						let regexpTime = /T/;
						let index=0;
						let content='';
						let keywords=[];
						for(let i=0; i<getItemsOnce.length; i++){
							if(getItemsOnce[i].timestamp){
								content=getItemsOnce[i].timestamp;
								index = content.search(regexpTime);
								getItemsOnce[i].timestamp=content.slice(0,index);
							}
							if(getItemsOnce[i].keywords){
								
								keywords = (getItemsOnce[i].keywords).split(";"); 
								(getItemsOnce[i].keywords)=keywords;
							}
							
						}
						
						
						this.iteminfo=getItemsOnce;
						that.noContent=false;
						clearTimeout(t)
					}
				},500)
				
				
			}
		}
		
	}
</script>

<style>
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
		width: 630rpx;
		heigth: 148rpx;
		background-color: white;
		border-radius: 20rpx;
		padding: 20rpx 40rpx;
		margin-bottom: 40rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		border: 3rpx #D7D7D7 solid;
		border-bottom: 4rpx #E2C8EB solid;
	}
	.item_change{
		animation: 0.5s change linear forwards 2 alternate;
	}
	
	.item_change_paused{
		animation-play-state: paused;
	}
	
	
	@keyframes change{
		0%{
			box-shadow: 0 0 0;
		}
		100%{
			box-shadow: 3px 3px 5px grey;
		}
	}
	
	.depart_time{
		display: flex;
		margin-top: 30rpx;
		color: #9E45BD;
		justify-content: space-between;
	}
	
	.windowMask{
		position: absolute;
		overflow-y:scroll;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 1700rpx;
		display: flex;
		justify-content: center;
	}
	.infoWindow{
		position: absolute;
		width: fit-content;
		height: fit-content;
	}
	
	
	.infoWindowShow{
		display:flex;
	}
	
	.infoWindow view{
		position: relative;
		display: flex;
		margin-left: 50%;
		transform: translateX(-50%);
		background-color: white;
		box-shadow: 2rpx 2rpx 10rpx grey;
	}
	
	.windowTitle{
		top: 110rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #9E45BD;
		/* text-align: center; */
		width:0px;
		height: 60rpx;
		padding: 20rpx 40rpx;
		border-top-left-radius: 60rpx;
		border-top-right-radius: 60rpx;
		border: 2rpx solid #D7D7D7;
		border-bottom:0px;
		overflow: hidden;
	}
	.windowAbstract{
		padding: 20rpx 0px;
		width:600rpx;
		border:2rpx solid #e0e2dd;
		justify-content:space-around;
		font-size: 36rpx;
		overflow: hidden;
		z-index: 3;
	}
	.windowAbstract span{
		margin: 0px 0px;
		position: relative;
		/* display: block; */
		padding: 0rpx 40rpx;
		width: 100%;
		white-space: pre-wrap;
		word-wrap: break-word;
		height: fit-content;
	}
	.windowAbstract span text{
		/* position: relative; */
	}
	
	.windowKwords{
		padding: 20rpx 0rpx;
		justify-content: space-around;
		font-size: 36rpx;
		width: 0px;
		height: 0px;
		border: 2rpx solid #e0e2dd;
		overflow: hidden;
		border-top: 0px;
		top: -110rpx;
		flex-wrap: wrap;
		z-index: 2;
	}
	.windowKwords text{
		background-color: #B068C9;
		border-radius: 60rpx;
		color: #F5ECF8;
		margin-top: 10rpx;
		padding: 10rpx 20rpx;
	}
	.windowRnum{
		padding: 20rpx 0rpx;
		font-size: 30rpx;
		justify-content: flex-start;
		width:0rpx;
		height: 0rpx;
		overflow: hidden;
		border-bottom-left-radius: 60rpx;
		border-bottom-right-radius: 60rpx;
		border: 2rpx solid #e0e2dd;
		border-top: 0rpx;
		top: -190rpx;
		flex-wrap: wrap;
		z-index: 1;
	}
	.windowRnum text{
		margin-left: 40rpx;
	}
	
	
	.ani_windowAbstract{
		animation: 0.4s ani-windowAbstract linear forwards;
	}
	
	
	@keyframes ani-windowAbstract{
		0%{
			width: 0px;
		}
		100%{
			width: 600rpx;
		}
	}
	
	.ani_windowTitle{
		animation: 0.5s ani-windowTitle 0.5s linear forwards;
	}
	
	@keyframes ani-windowTitle{
		0%{
			top: 110rpx;
			width: 0rpx;
		}
		50%{
			top:110rpx;
			width: 520rpx;
		}
		100%{
			top:0rpx;
			width: 520rpx;
		}
	}
	
	.ani_windowKwords{
		animation: 0.5s ani-windowKwords 0.5s linear forwards;
	}
	
	@keyframes ani-windowKwords{
		0%{
			top: -110rpx;
			width: 0rpx;
			height: 0rpx;
		}
		50%{
			top: -110rpx;
			width: 600rpx;
		}
		100%{
			top: 0rpx;
			width: 600rpx;
			height: auto;
		}
	}
	
	.ani_windowRnum{
		animation: 0.5s ani-windowRnum 1s linear forwards;
	}
	@keyframes ani-windowRnum{
		0%{
			top: -190rpx;
			width: 0rpx;
			height: 0rpx;
		}
		50%{
			top: -190rpx;
			width: 600rpx;
		}
		100%{
			top: 0rpx;
			width: 600rpx;
			height: auto;
		}
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
	
</style>
