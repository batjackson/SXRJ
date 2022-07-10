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
					<text>编辑日寄</text>
				</view>
				<view class="subTitle">
					<text>请文明发言，共同维护良好日寄环境</text>
				</view>
			</view>
			<view class="inputSumup">
				<input class="uni-input" maxlength="10" placeholder="请输入标题(10个字以内)" v-model="eventInfo.sumup" :name="eventInfo.sumup" />
			</view>
			<view class="inputBox">
				<view class="inputDetail">
					<textarea class="textarea" placeholder="输入内容(长度200字以内)" maxlength="200" v-model="eventInfo.detail" :name="eventInfo.detail" />
				</view>
				<view class="inputSubmit">
					<button class="inputSubmitBtn" type="default" @click="submitEvent">提交</button>
					<br>
					<button class="inputSubmitBtn" style="background-color:#ff8878;"  type="default" @click="goBack">返回</button>
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
		  addDailyUrl: 'http://121.5.56.179:8890/happen/post',
		  // eventDate:'',
		  eventInfo:{
			  detail:'',
			  // 日程的总结/标题/简称
			  sumup:''
		  },
		  
	  };
	  },
	  // watch:{
		 //  /*
			// 监听eventDate的日期数据
		 //  */
		 //  'eventDate':{
			//   handler:'updateTime',
			//   immediate: true
		 //  }
	  // },
	  created () {
			this.getToken()
	  },
	  methods:{
		  /*
		  选择日期后，根据eventDate更新 eventInfo 的日期数据
		  */
		 // updateTime(){
			//  this.eventInfo.deadline = String(this.eventDate)
			//  this.eventInfo.ddl_day=this.eventInfo.deadline.substring(0,10)
			//  this.eventInfo.ddl_time=this.eventInfo.deadline.substring(11,19)
		 // },
		 submitData(){
			// let ddl = String(this.eventDate).replace(' ','T')
			this.getDaily(this.token,this.eventInfo.detail,this.eventInfo.sumup)
			
			console.log('提交成功！')
			console.log(this.eventInfo.detail)
			console.log(this.eventInfo.sumup)
			
		 },
		  submitEvent(){
			  if(this.eventInfo.sumup==''){
				  uni.showModal({
				    title: '提示',
				    content: '请输入标题！',
				  	showCancel:false
				  })
			  }else if(this.eventInfo.detail==''){
				  uni.showModal({
				    title: '提示',
				    content: '请输入内容！',
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
		  getDaily(token_,content_,conclusion_){
		  	let that = this;
		  		uni.request({
		  			url:this.addDailyUrl,
					method:'POST',
		  			data:{
		  				token: token_,
						content:content_,
						title:conclusion_,
		  			},
		  			success: (res) => {
						if(res.statusCode==200){
							console.log(token_)
							console.log(content_)
							console.log(conclusion_)
							console.log(res)
							
							//提交成功后 重置页面的变量信息
							Object.assign(this.$data, this.$options.data())
							
							//提交成功后 由于是tabSwitch  所以采用特别的跳转方式 ljs
							uni.switchTab({
							    url: '/pages/happen/happen'
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
		margin-top: 20rpx;
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
		margin-left: 5%;
		height: 600rpx;
		width: 90%;
		background-color: #ffffff;
		border-radius: 30rpx;
	}
	
	.textarea{
		width: auto;
		padding: 10rpx;
		margin: 20rpx 20rpx;
/* 		border:solid #cacaca; */
		border-width: 2rpx;
		border-radius: 5rpx;
		height: 500rpx;
		color:#5d6371 ;
	}
	.uni-input{
		height: 80rpx;
		padding: 0rpx 20rpx;
		margin: 0rpx 30rpx;
/* 		border:solid #cacaca; */
		border-width: 2rpx;
		border-radius: 5rpx;
	}
	
	.inputSumup{
		margin-top: 40rpx;
		margin-right: 5%;
		margin-left: 5%;
/* 		height: 200rpx; */
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
