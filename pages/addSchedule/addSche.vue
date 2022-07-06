<template>
	<view >
		<view class="bg">
			
			<image src="../../static/schedule/addScheBg.png" mode="aspectFill" ></image>
		</view>
		<view class="header">
			<!-- 顶部 -->
			<button type="default" class="backBtn" @click="goBack">
				<!-- ljs 返回上一页 -->
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
							<uni-datetime-picker v-model="eventDate">
								<button type="default" class="selectTimeBtn" >
								<text>选择时间</text>
								</button>
							</uni-datetime-picker>
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
					<textarea class="textarea" placeholder="输入内容" v-model="eventInfo.detail" :name="eventInfo.detail" />
				</view>
				<view class="inputSumup">
					<view class="mTips">
						<text>总结</text>
					</view>
					<input class="uni-input" maxlength="9" placeholder="最大输入长度为 9" v-model="eventInfo.sumup" :name="eventInfo.sumup" />
				</view>
				<view class="inputSubmit">
					<button class="inputSubmitBtn" type="default" @click="submitEvent">提交</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	data() {
	  return {
		  //添加日程数据：token，content，conclusion
		  addDailyUrl: 'http://119.23.222.86:8890/daily/add-to-daily',
		  eventDate:'',
		  eventInfo:{
			  //创建日期：保留，不知道是否必要
			  createDate:'',
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
	  methods:{
		  /*
		  选择日期后，根据eventDate更新 eventInfo 的日期数据
		  */
		 updateTime(){
			 this.eventInfo.deadline = String(this.eventDate)
			 this.eventInfo.ddl_day=this.eventInfo.deadline.substring(0,10)
			 this.eventInfo.ddl_time=this.eventInfo.deadline.substring(11,19)
		 },
		 submitData(){
			let ddl = String(this.eventDate).replace(' ','T')
			this.getDaily(this.token,this.eventInfo.detail,this.eventInfo.sumup,ddl)
			
			console.log('提交成功！')
			console.log(this.eventDate)
			console.log(this.eventInfo.detail)
			console.log(this.eventInfo.sumup)
			
		 },
		  submitEvent(){
			  if(this.eventInfo.deadline=='null'){
				  uni.showModal({
				    title: '提示',
				    content: '请选择时间！',
					showCancel:false
				})
			  }else if(this.eventInfo.detail==''){
				  uni.showModal({
				    title: '提示',
				    content: '请输入内容！',
				  	showCancel:false
				  })
			  }else if(this.eventInfo.sumup==''){
				  uni.showModal({
				    title: '提示',
				    content: '请输入总结！',
				  	showCancel:false
				  })
			  }
			  else{
				  var that = this;
				  uni.showModal({
				    title: '提示',
				    content: '确定要提交吗？',
					success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								that.submitData()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				  })
				  
			  }
			  
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
		  //提交日程
		  getDaily(token_,content_,conclusion_,ddl_){
		  	let that = this;
		  		uni.request({
		  			url:this.addDailyUrl,
					method:'POST',
		  			data:{
		  				token: token_,
						content:content_,
						conclusion:conclusion_,
						date:ddl_,
		  			},
		  			success: (res) => {
						if(res.statusCode==200){
							console.log(token_)
							console.log(content_)
							console.log(conclusion_)
							console.log(ddl_)
							console.log(res)
							
							//提交成功后 重置页面的变量信息
							Object.assign(this.$data, this.$options.data())
							
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
								content: '提交失败！',
							})
						}
		  				
		  			},
		  			fail: (err) => {
		  				console.log(err)
		  			}
		  		})
		  	
		  },
		  // ljs返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
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
