<template>
	<view  v-if="isRouterAlive">
		<!-- 背景 -->
		<view class="background">
			<image class="img" src="../../static/lsy/background.jpg" style="width: 100%;height: 100%;z-index: -1;" ></image>
		</view>
		<view class="title">
			<text>添加订阅</text>
		</view>
		<view class="content">
		<!-- 标签选择begin	 -->
		<view class="choice_content">
			<view class="row">
				<view class="choice_item">
					<button type="default" @tap="tapPopup">学院</button>
				</view>
				<!-- <view class="choice_item">
					<button type="default" v-for="(item,index) in jiangjin"  :class="{'labelTag': rSelectjiangjin.indexOf(index)!=-1}" @click="aClickjiangjin(index)">奖学金</button>
				</view> -->
				
			</view>
			<view class="row">
				<view class="choice_item">
					<button type="default"  @tap="tapPopup2">书院</button>
				</view>
				<!-- <view class="choice_item">
					<button type="default"  v-for="(item,index) in jingsai"  :class="{'labelTag': rSelectjingsai.indexOf(index)!=-1}" @click="aClickjingsai(index)">竞赛</button>
				</view> -->
			</view>	
			
			<!-- 学院弹窗 -->
				<view class="popup" v-show="show">
						<view class="popup-info">
							<view class="row">
							<button type="default"  v-for="(item,index) in xveyuan" :class="{'labelTag': rSelectXve.indexOf(index)!=-1}" @click="aClickXve(index)" >{{item}}</button>
							</view>
							
							<view class="popup-btn">
									<view><button type="default" class="affirm bubble" @tap="affirm()">确认</button></view>
									<view><button type="default" class="bubble" @tap="cancel">取消</button></view>
							</view>
					    </view>
						
						
						  

				</view>
				<!-- 书院弹窗 -->
				<view class="popup" v-show="show2">
						<view class="popup-info">
							<view class="row">
									<button type="default"  v-for="(item,index) in shuyuan" :class="{'labelTag': rSelectShu.indexOf(index)!=-1}" @click="aClickShu(index)" >{{item}}</button>
							</view>
							<view class="popup-btn">		
											<view><button type="default" class="affirm bubble" @tap="shuAffirm()()">确认</button></view>
											<view><button type="default" class="bubble" @tap="cancel2">取消</button></view>
							</view>
					    </view>
				</view>
			
		
		
		</view>
		<!-- 标签选择over	 -->
			
		<!-- 标签输入添加 -->
		<view class="input_box">
			<view class="inside">
				<div class="select"  v-for="(item,index) in aSelectList">{{item}}</div>
				<div class="select"  v-for="(item,index) in aSelectList2">{{item}}</div>
			</view>

		</view>
		<!-- <navigator url="./subscription"> -->
		<button type="default" class="ok bubble" @tap="allAffirm();goBack()">确定</button>
		<!-- </navigator> -->
		<!-- 标签添加 结束 -->
		
		
		
	</view>
	<!-- 返回上一页按钮 -->
	<button type="default" class="button" @click="goBack">返回上一页</button>
	</view>	
	
</template>

<script>
	export default {
		data() {
			return {	
					show:false,
					show2:false,
					rSelectXve:[],
					rSelectShu:[],
					rSelectjiangjin:[],
					rSelectjingsai:[],
					aSelectList:[],
					aSelectList2:[],
					listIndex:0,
					listIndex2:0,
					keywords:[],
					allList:[],
					isRouterAlive: true,
					shuyuan:['德馨书院','淑德书院','敬一书院','修远书院','明德书院','弘毅书院','思源书院','知行书院','至诚书院'],
					xveyuan:['工学院','理学院','文学院','商学院','法学院','马克思主义学院','长江艺术与设计学院','长江新闻与传播学院'],
				
			}
		},
	
		
		onShow() {
			  // this.reload();
			  this.getSubDepart();
		},
		methods: {
				// 弹窗
					tapPopup() {
						this.show = true;
					},
					
					// 点击弹窗取消
					cancel() {
						this.show = false;
					},
					aClickXve(index) {
						this.listIndex=index;
						
					},
					reload () {
					      this.isRouterAlive = false
					      this.$nextTick(function () {
					        this.isRouterAlive = true
					      })},
					aClickShu(index) {
						this.listIndex2=index;
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
					// 点击弹窗确认
					affirm() { 
						this.show = false;
						this.show2=false;
						let arrIndex = this.rSelectXve.indexOf(this.listIndex);//获取目标所选关键词索引
						// console.log(arrIndex);
						if(arrIndex>-1){
							this.rSelectXve.splice(arrIndex,1);//获取单个关键词【应对另选中其它按钮后更改数组的情况】
							for (let i = 0 ; i<this.aSelectList.length ; i++){
								if(this.xveyuan[this.listIndex] == this.aSelectList[i]){
									this.aSelectList.splice(i,1);
								}
							}
							
						}else{
							console.log(this.aSelectList)
							// 判断所选订阅词是否重复【应对重复选中已订阅词情况】
							for(let j=0;j<this.keywords.length;j++){
							for (let i = 0 ; i<this.aSelectList.length ; i++){
								//将新增订阅词数组与本地缓存的订阅词相比较，若相同，则删除对应新增订阅词，避免重复添加
								if(this.keywords[j] == this.aSelectList[i]){
									this.aSelectList.splice(i,1);
								}
								
							}};
							this.rSelectXve.push(this.listIndex);
							//将最终绝对添加的数组push进新数组【后续会将此数组进行拼接后，放入本地缓存】
							this.aSelectList.push(this.xveyuan[this.listIndex]);
							console.log(this.aSelectList);
						}
					},
					shuAffirm(){
						this.show = false;
						this.show2=false;
						let arrIndex2 = this.rSelectShu.indexOf(this.listIndex2);
						if(arrIndex2>-1){
							this.rSelectShu.splice(arrIndex2,1);
							for (let i = 0 ; i<this.aSelectList2.length ; i++){
								if(this.shuyuan[this.listIndex2] == this.aSelectList2[i]){
									this.aSelectList2.splice(i,1);
								}
							}
						}else{
							this.rSelectShu.push(this.listIndex2);
							this.aSelectList2.push(this.shuyuan[this.listIndex2]);
						
						}
						// console.log(this.aSelectList);
						
						console.log(this.allList);
						
					},
					allAffirm(){
						// 将书院与学院最终确定添加的订阅词进行追加拼接存入本地缓存
						this.allList=this.keywords.concat(this.aSelectList,this.aSelectList2);
						new Promise((resolve,reject)=>{
								uni.setStorage({
									key:"subDepart",
									data:this.allList,
									success: function() {
										resolve(1);
									}
								});});
					},
					// 弹窗
						tapPopup2() {
							this.show2 = true;
						},
						// 点击弹窗取消
						cancel2() {
							this.show2 = false;
						},
						// 点击弹窗确认
						affirm2() { 
							this.show2 = false;
						},
						goBack(){
							uni.navigateBack({
								//改用navigateBack返回上一页 ljs
								delta:1
								// url:'../../level1/myPages/myPages'
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
		height: 1300px;
		position: absolute;

	}
	/* 输入框 */
	.input_box{
		display: flex;
		flex-direction:column;
		align-items: center;
		vertical-align: middle;
		margin-top: 30px;
	}
	.inside{
			 /* margin: 30 auto; */
		margin: 15px;
		
		text-align:center; 
		width:266px ;
		height: 250px;
		background:rgba(209, 213, 229, 0.7);
		border-radius: 40px;
		color: #696969;	
		font-size: 30px;
		box-shadow: 0 0 10px #4d4d4d;
	}
	.inside select{
			margin-top: 13px;
	}
	.select:hover{
		
		border: 4px solid #b67fca;
	}
	
	/* 弹窗 */
	.popup-info{
		position: fixed;
		width: 550upx;
		top: 50%;
		left: 50%;
		box-shadow:0 0 3px #b67fca;
		transform: translate(-50%,-50%);
		font-size: 30upx;
		padding: 40upx;
		border-radius: 50upx;
		/* background:rgba(209, 213, 229, 0.9); */
		background:rgba(45,45,45,0.94);
		z-index: 9999;
		display: flex;
		justify-content: center;
		flex-direction:column;
	}
	.popup-info .row{
		display: flex;
		justify-content: center;
		flex-direction:row;
		flex-wrap: wrap;
	}
	.popup-info button{

		margin: 10px;
		width: 100px;
		background-color:  rgba(116,50,140,0.3);
		color: white;
	}
	/* 弹窗内部按钮动画 */
	.popup-info button::before{
	  position: absolute;
	  content: '';
	  left: -3em;
	  right: -7em;
	  top: 1em;
	  bottom: -2em;
	  pointer-events: none;
	  background-repeat: no-repeat;
	  background-image: radial-gradient(circle,#f8caff 20%, transparent 0),
	  radial-gradient(circle, #f8caff 20%, transparent 0),
	  radial-gradient(circle, #f8caff 20%, transparent 0),
	  radial-gradient(circle, #f8caff 20%, transparent 0);
	  background-size: 10% 10%, 20% 20%, 15% 15%;
	  background-position: 18% 40%, 20% 31%, 30% 30%;
	}
	.popup-info button::before{
	  animation: bubbles ease-in-out .75s forwards;
	}
	.popup-info button:active::before {
	  animation: none; /*这里注意取消动画*/
	  background-size: 0;
	}
	@keyframes bubbles {
	  0% {
	    background-position: 18% 40%, ...;
	  }
	  50% {
	    background-position: 10% 44%, ...;
	  }
	  100% {
	    background-position: 5% 44%, ...;
	    background-size: 0% 0%;
	  }
	}
	.popup-info button:hover{
	
		margin: 10px;
		width: 100px;
		background-color:  rgba(116,50,140,1);
		color: white;
	}
	.popup-info .popup-btn{
		
		display: flex;
		justify-content: center;
		flex-direction:row;
	}	
	.popup-info .popup-btn button{
		width: 75px;
		border-radius: 50px;
		
	}	
	
	

	/* 确定按钮 */
	.ok{
		margin-top: 70px;
		width:266px ;
		height: 50px;
		background-color: #74328c;
		border-radius: 40px;
		color: white;
		box-shadow: 0 0 10px #4d4d4d;
	}
	.select{
		font-size: 20px;
	}
	/* 订阅选择样式 */
	.choice_content{
		margin: 20px;
		width: 210px;
		/* border: 5px solid   #a034ca; */
		padding: 10px;
		display: flex;
		justify-content: center;
	}
	.choice_item button{
		margin: 10px;
		width: 100px;
		background: transparent  ;
		color:  white;
	}
	.choice_item button:hover{
		background:  #872bab;
		color:white;
		box-shadow: 0 0 5px #a034ca,
		            0 0 25px #774e98,
		            0 0 50px #774e98,
		            0 0 200px #774e98;
		 /* -webkit-box-reflect:below 10px linear-gradient(transparent, #0005); */
	}
	/* 按钮冒泡效果样式 */
	.bubble {
			position: relative;
			overflow: hidden;
		}
	.bubble::after{
			content: "44444";
			background: #f8caff;
			position: absolute;
			width: 750rpx;
			height: 750rpx;
			left: calc(50% - 375rpx);
			top: calc(50% - 375rpx);
			opacity: 0;
			margin: auto;
			border-radius: 50%;
			transform: scale(1);
			transition: all 1s ease-in-out;
		}
	
		.bubble:active:after {
			transform: scale(0);
			opacity: 1;
			transition: 0s;
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
</style>
