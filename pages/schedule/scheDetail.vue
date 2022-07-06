<template>
	<view >
		<view class="bg">
			<image src="../../static/schedule/addScheBg.png" mode="aspectFill"></image>
		</view>
		<view class="header">
			<!-- 顶部 -->
			<button type="default" class="backBtn">
				<image src="../../static/schedule/toLeft.png" mode="heightFix"></image>
			</button>
		</view>
		<view class="context">
			<view class="mText">
				<view class="mTitle">
					<text>自定义日程</text>
				</view>
				<view class="subTitle">
					<text>定制日程，梳理你的生活</text>
				</view>
			</view>
			<view class="inputBox">
				<view class="inputTime">
					<view class="mTips">
						<text>时间</text>
					</view>
					<view class="selectTime">
						<view class="selectTimeText">
							<text >截至日期</text>
							<text style=" color: #9e45bd;" >{{eventInfo.ddl_day}}</text>
						</view>
						<view class="selectTimeText">
							<text >时间</text>
							<text style=" color: #9e45bd;" >{{eventInfo.ddl_time}}</text>
						</view>
					</view>
				</view>
				<view class="inputDetail">
					<view class="mTips">
						<text>内容</text>
					</view>
					<textarea class="textarea" placeholder="输入内容" v-model="eventInfo.detail" :name="eventInfo.detail" disabled/>
				</view>
				<view class="inputSumup">
					<view class="mTips">
						<text>总结</text>
					</view>
					<input class="uni-input" maxlength="9" placeholder="最大输入长度为 9" v-model="eventInfo.sumup" :name="eventInfo.sumup" disabled/>
				</view>
				<view class="inputSubmit">
					<button class="inputSubmitBtn" style="background-color:#ff8878;" type="default" @click="deleteEvent">删除</button>
					</br>
					<button class="inputSubmitBtn" type="default" @click="goBack">返回</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	data() {
	  return {
		  //删除某条日程数据：dailyId
		  deleteDailyUrl: 'http://119.23.222.86:8890/daily/remove-from-daily',
		  eventDate:'',
		  /*上一界面传入的事件对象和日期*/
		  inputEvent:'',
		  inputDate:'',
		  eventInfo:{
			  id:'',
			  // 日程截止日期和时间
			  deadline:'null',
			  // 日程截止日
			  ddl_day:'',
			  // 日程截止时间
			  ddl_time:'',
			  // 日程的内容
			  detail:'',
			  // 日程的总结/标题/简称
			  sumup:''
		  }
	  };
	  },
	  watch:{
		  /*
			监听eventDate的日期数据
		  */
		  'eventDate':{
			  handler:'updateTime',
			  immediate: true
		  }
	  },
	  created () {
			this.getToken()
	  },
	  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
	          console.log(option.id); //打印出上个页面传递的参数。
			  const item = JSON.parse(decodeURIComponent(option.detail));
			  this.inputEvent = item
			  this.inputDate = option.date
			  console.log(option.date); //打印出上个页面传递的参数。
			  this.parseEvent()
		},
	  methods:{
		  //返回上一页 函数 ljs
		  goBack(){	
		  	uni.navigateBack({			
		  		delta:1
		  	})
		  },
		  /*
		  选择日期后，根据eventDate更新 eventInfo 的日期数据
		  */
		 updateTime(){
			 this.eventInfo.deadline = String(this.eventDate)
			 this.eventInfo.ddl_day=this.eventInfo.deadline.substring(0,9)
			 this.eventInfo.ddl_time=this.eventInfo.deadline.substring(11,19)
		 },
		  //获取缓存的用户token
		  getToken(){
		  	let that=this;
		  	uni.getStorage({
		  		key:'token',
		  		success: function(res) {
		  			that.token = res.data;
		  		}					
		  	});
			console.log(that.token)
		  	return that.token
		  },
		  //解析传入的日程到数据
		  parseEvent(){
			  console.log("parseEvent")
			  console.log(this.inputEvent)
			  console.log(this.inputDate)
			  this.eventInfo.ddl_day = this.inputDate
			  this.eventInfo.ddl_time = this.inputEvent.time
			  this.eventInfo.sumup = this.inputEvent.title
			  this.eventInfo.detail = this.inputEvent.detail
			  this.eventInfo.id =  this.inputEvent.id
		  },
		  deleteEvent(){
			  let that = this;
			  	uni.request({
			  		url:this.deleteDailyUrl,
			  		method:'GET',
			  		data:{
			  			dailyId:this.eventInfo.id,
			  		},
			  		success: (res) => {
			  			if(res.statusCode==200){
			  				console.log(res)
			  				
			  				//提交成功后 重置页面的变量信息
			  				Object.assign(this.$data, this.$options.data())
			  				uni.showModal({
			  					showCancel:false,
			  					title: '提示',
			  					content: '删除成功！',
			  				})
			  				//提交成功后 由于是tabSwitch  所以采用特别的跳转方式 ljs
			  				uni.switchTab({
			  				    url: '/pages/schedule/schedule'
			  				});
			  			}else{
			  				console.log(token_)
			  				console.log(content_)
			  				console.log(conclusion_)
			  				console.log(ddl_)
			  				uni.showModal({
			  					showCancel:false,
			  					title: '提示',
			  					content: '删除失败！',
			  				})
			  			}
			  			
			  		},
			  		fail: (err) => {
			  			console.log(err)
			  		}
			  	})
		  }
	  }
	  
	}
</script>

<style scoped>
	.bg{
		padding: 0rpx;
		margin: 0rpx;
	}
	.bg image{
		/*背景图片*/
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -99;
	}
	.header{
		/* 顶部 */
		height: 80rpx;
/* 		background-color: #007AFF; */
		margin-left: 30rpx;
		margin-right: 10rpx;
		
	}
	.backBtn{
		/* 退后的按钮 */
		width: 100rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		float: left;
		border: none;
		background-color: rgba(0,0,0,0);
	}
	.backBtn image{
		/* 退后的按钮 */
		height: 40rpx;
		float: left;
	}
	
	.context{
		/*添加日程主功能区*/
		margin:20rpx 30rpx;
	}
	.mText{
		margin: 0rpx 20rpx;
	}
	.mTitle{
		font-size: 56rpx;
		font-weight: 600;
		line-height: 80rpx;
		color: #F1F1F1;
	}
	.subTitle{
		color: #b0b0b0;
		line-height: 60rpx;
	}
	.inputBox{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.mTips{
		color: #5d6371;
		padding: 20rpx 40rpx;
	}
	.inputTime{
		margin-top: 20rpx;
		margin-left: 5%;
		width: 42%;
		height: 600rpx;
		background-color: #ffffff;
		border-radius: 30rpx;
	}
	.selectTime{
		margin: 0rpx 15rpx;
		display: flex;
		flex-direction: column;
	}
	.selectTimeBtn{
		margin: 15rpx;
		line-height: 70rpx;
		background-color: rgba(180,79,217,0.4);
		color: rgb(162, 72, 197);
		border-radius: 14rpx;
		font-size: 30rpx;
	}
	.selectTimeText{
		display: flex;
		flex-direction: column;
		margin: 15rpx;
		font-size: 30rpx;
		font-weight: 640;
		line-height: 50rpx;
		margin-bottom: 20rpx;
		color: #5d6371;
	}
	.inputDetail{
		margin-top: 20rpx;
		margin-right: 5%;
		height: 600rpx;
		width: 42%;
		background-color: #ffffff;
		border-radius: 30rpx;
	}
	
	.textarea{
		width: auto;
		padding: 10rpx;
		margin: 20rpx 20rpx;
		border:solid #cacaca;
		border-width: 2rpx;
		border-radius: 5rpx;
		height: 400rpx;
		color:#5d6371 ;
	}
	.uni-input{
		height: 80rpx;
		padding: 0rpx 20rpx;
		margin: 0rpx 30rpx;
		border:solid #cacaca;
		border-width: 2rpx;
		border-radius: 5rpx;
	}
	
	.inputSumup{
		margin-top: 40rpx;
		margin-right: 5%;
		margin-left: 5%;
		height: 200rpx;
		width: 90%;
		background-color: #ffffff;
		border-radius: 30rpx;
	}
	.inputSubmit{
		margin: 40rpx 0rpx;
		margin-right: 5%;
		margin-left: 5%;
		height: 100rpx;
		width: 90%;
/* 		padding-bottom: 50rpx; */
/*  */
	}
	.inputSubmitBtn{
		line-height: 100rpx;
		font-weight: 600;
		color: #F1F1F1;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #9e45bd;
		
	}
	
	

</style>
