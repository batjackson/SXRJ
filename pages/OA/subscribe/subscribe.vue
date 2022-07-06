<template>
	<view class="tab">
		<view class="fix">
			<view class="tabSwith">
				<view class="oaOption" :class="{'tabColor_ed':tabColor_ed}" @click="stickRun(1)"><text>OA</text></view>
				<view class="sbcOption" :class="{'tabColor_ed':!tabColor_ed}" @click="stickRun(2)"><text>订阅</text></view>
				<view class="scrollstick" :class="{'selectOA':selectOA, 'selectSbc':selectSbc}"></view>
			</view>
			<view class="inputBox">
				<input type="text" placeholder=" 搜索" v-model="resetValue" placeholder-class="iconfont icon-sousuo" confirm-type="search" @confirm="search"/>
			</view>
		</view>
		<view>
			<OAItemList :selectedCard="selectedNum" :searchValue="searchValue" @resetInput="resetValue=''"></OAItemList>
		</view>
	</view>
</template>

<script>
	import OAItemList from '../components/OAItemList/OAItemList.vue';
	export default {
		components:{ OAItemList },
		data() {
			return {
				selectOA:true,		  //OA选项卡被选中的时候下划线位置
				selectSbc:false,      //订阅选项卡被选中的时候下划线位置
				tabColor_ed:true,     //OA或者订阅选项卡被选中时候字体颜色
				selectedNum: 1,        //OA或者订阅选项卡被选中时候对应的编号，1为OA，2为订阅
				searchValue:'',      //搜索关键词
				resetValue:''
			}
		},
		onLoad(){
		},
		methods: {
			toJSON(){
			   return this;	
			},
			toStyle(){
			   return this;	
			},
			stickRun(num){       //选项卡动态
				this.selectedNum=num;
				if(num==1){
					this.selectOA=true;
					this.selectSbc=false;
					this.tabColor_ed=true;
					console.log(1)
				}
				else{
					this.selectOA=false;
					this.selectSbc=true;
					this.tabColor_ed=false;
					console.log(2)
				}
				
			},
			search(event){
				console.log(event);
				if(event.detail.value!=''){  //搜索内容不为空
					this.searchValue=event.detail.value;
				}
				else{
					uni.showToast({
						title:"搜索内容不为空",
						icon:"error",
						duration:2000
					})
				}
			}
		}
	}
</script>

<style>
	@import url("../../../static/subscribe/font/iconfont.css");
	/* 固定选项卡位置 ljs*/
	.fix{
		top: 0; 
		padding-top: 100rpx;
		/* position: fixed; */
		z-index: 2;
		width: 100%;
		background-color: white;
	}
	.tab{
		background-color: #C8C7CC;
	}
	.tabSwith{
		
		width: 100%;
		height: 80rpx;
		background-color: white;
		display: flex;
		
	}
	.tabSwith view{
		width: 250rpx;
		height: 100%;
		margin-left: 10rpx;
		background-color: white;
		text-align: center;
		font-size: 48rpx;
	}
	.scrollstick{
		position: absolute;
		top: 170rpx;
		background-color: #9E45BD !important;
		width: 250rpx !important;
		height: 8rpx !important;
		border-radius: 10rpx;
		transition: left 0.4s linear 0s;
	}
	.selectOA{
		left:0px;
	}
	.selectSbc{
		left:260rpx;
	}
	.tabColor_ed{
		color:#9E45BD;
	}
	
	.inputBox{
		width: 100%;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		background-color: white;
		display: flex;
		justify-content: center;
	}
	.inputBox input{
		text-align: center;
		font-size: 40rpx;
		background-color: #EBEAF4;
		padding: 20rpx;
		width: 670rpx;
		border-radius: 60rpx;
	}
	
	
</style>
