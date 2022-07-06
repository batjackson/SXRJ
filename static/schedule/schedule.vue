<template>
	<view>
		<view class="header">
			<!-- 顶部 -->
<!-- 			<button type="default" class="backBtn">
				<image src="../../static/schedule/toLeft.png" mode="heightFix"></image>
			</button> -->
			<!-- 因为不需要返回箭头 所以去掉了 ljs-->
			<view class="headerTitle">
				<text>重要的事情</text>
			</view>
		</view>
		<view class="calendar">
			<!-- 日历 -->
			<image src="../../static/schedule/demo.png" mode="widthFix"></image>
			<!-- 这里考虑到要根据日期切换下方的日程列表，需要与数据库交互，比较复杂，待设计；先贴个图以表尊敬 -->
		</view>
		<view class="remind">
			<!-- 提醒 -->
			<view class="remindTitle">
				<text>今日重要提醒</text>
			</view>
			<view class="remindList">
				<view class="eventIcon">
					<view v-for="(event,index) in todayList" :key='event.id'  class="icon">
						<image :src='event.iconPath' ></image>
						<image v-if="event.id!=todayList.length-1" :src="event.linePath" ></image>
					</view>
				</view>
				<view class="eventDetail">
					<view v-for="(event,index) in todayList" :key='event.id'  class="event">
						<view class="eventTime">
							{{event.time}}
						</view>
						<view class="eventTitle">
							{{event.title}}
						</view>
						<view class="eventState">
							<button @click="checkBtn(event)" v-bind:style="event.checkColor"  >
								<text>{{event.checkText}}</text>
							</button>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
  export default {
    data() {
      return {
		//颜色集合
		colorSet:{
			//主题颜色: #9e45bd
			mainColor:'#9e45bd',
			// checked 按钮背景颜色
			checkBgColor:'rgba(180,79,217,0.15)',
			// checked 按钮文字颜色
			checkColor:'rgb(180,79,217)',
			// check 按钮背景颜色
			checkBgColor:'rgba(56, 158, 13, 0.2)',
			// check 按钮文字颜色
			checkBgColor:'rgb(56, 158, 13)'
		},
		nowTime:{
			date:0,
			year:0,
			month:0,
			day:0,
			hour:0,
			minute:0,
			//当前时间戳
			timestamp:0
		},
		todayList:[
		{
			id:0,
			//查收状态，即该事件是否已经完成
			checkState:true,
			//查收状态文本，默认check
			checkText:'check',
			//check按钮的颜色
			checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
			time:'8:00',
			// 时间戳:这里是测试，这个时间戳的值已经过去
			timestamp:1635474766840,
			//标题最长8个字？
			title:'可添加今日日程',
			//时间状态，即该事件的时间是否过去
			timeState:true,
			//图标路径，默认为 go.png
			iconPath:'../../static/schedule/go.png',
			//中间的过渡的线条路径，默认为 loading.png
			linePath:'../../static/schedule/loading.png'
			
		},
		{
			id:1,
			checkState:false,
			checkText:'check',
			checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
			time:'10:00',
			timestamp:1635474766840,
			title:'可添加今日日程',
			timeState:false,
			iconPath:'../../static/schedule/go.png',
			linePath:'../../static/schedule/loading.png'
			
		},
		{
			id:2,
			checkState:false,
			checkText:'check',
			checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
			time:'14:00',
			timestamp:2635474766850,
			title:'可添加今日日程',
			timeState:false,
			iconPath:'../../static/schedule/go.png',
			linePath:'../../static/schedule/loading.png'
			
		},
		{
			id:3,
			checkState:false,
			checkText:'check',
			checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
			time:'19:00',
			timestamp:2635474766840,
			title:'可添加今日日程',
			timeState:false,
			iconPath:'../../static/schedule/go.png',
			linePath:'../../static/schedule/loading.png'
			
		}
		
		]
      };
    },
	mounted:function(){
		this.getTime()
	},
	watch:{
		'nowTime.timestamp':{
			handler: 'updateState',
			immediate: true
		},
		'todayList':{
			handler: 'updateState',
			immediate: true
		}
		
	},
	methods:{
		// 获取当前时间
		getTime(){
			var date = new Date()
			this.nowTime.date = date
			this.nowTime.year = String(date.getFullYear())
			this.nowTime.month = String(date.getMonth() + 1)
			this.nowTime.day = String(date.getDate())
			this.nowTime.hour = String(date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
			this.nowTime.minute = String(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
			this.nowTime.timestamp = Number(String(date.getTime()))
			// console.log(this.nowTime)
			
		},
		// 更新状态，初始化事件图标,文字等
		/*
		说明
		todayList.checkState：bool值；当前事件是否已checked
		todayList.timeState：bool值；当前事件的时间是否已经过去
		1. 如果当前事件是已经checked（用户点击check） -> 将按钮颜色置为紫色，文字置为checked
		   如果当前事件是check（默认是check，若用户checked后再点击按钮） -> 将按钮颜色置为绿色，文字置为check
		2. 如果当前事件的时间是否已经过去（与nowTime.timestamp时间戳做对比） -> 将左边进度条的图标和过渡线条更改
		*/
		updateState(){
			// console.log('updateState')
			for(var i = 0;i<this.todayList.length;i++){
				if(this.todayList[i].checkState){
					this.todayList[i].checkText = 'checked'
					this.todayList[i].checkColor = 'color:rgb(180,79,217);background-color:rgba(180,79,217,0.15)'
				}else{
					this.todayList[i].checkText = 'check'
					this.todayList[i].checkColor = 'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)'
				}
				// console.log(String(this.todayList[i].timestamp)+'-'+ String(this.nowTime.timestamp))
				if(this.todayList[i].timestamp<=this.nowTime.timestamp){
					// console.log('timestamp')
					this.todayList[i].timeState=true
					this.todayList[i].iconPath = '../../static/schedule/past.png',
					this.todayList[i].linePath = '../../static/schedule/loaded.png'
				}
			}
		},
		//用户点击check
		checkBtn(event){
			// console.log(event.id)
			var id = event.id
			this.todayList[id].checkState = !(this.todayList[id].checkState)
			this.updateState()
		}
	}
  };
</script>

<style scoped>
	/* 主题颜色: #9e45bd                                    */
	/* 字体颜色: #5d6371 */
	
	button::after{
	        border: none;
	}
	.header{
		/* 顶部 */
		margin-top: 20rpx;
	}
	/* 不需要返回按键 ljs */
	.backBtn{
		/* 退后的按钮 */
		width: 100rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		float: left;
		border: none;
		background-color: #FFFFFF;
	}
	.backBtn image{
		/* 退后的按钮 */
		height: 40rpx;
		float: left;
	} 
	
	
	.headerTitle{
		/* 顶部标题 */
		width: 100%;
		padding-top: 15rpx;
		padding-bottom: 20rpx;
		/* padding由150rpx改为50 ljs*/
		padding-left: 50rpx;
	}
	.header text{
		font-size: 40rpx;
	}
	
	.calendar{
		/* 日历 */
		height: 250rpx;
		background-color: #FFFFFF;
		border: 5rpx;
		box-shadow: 0rpx 15rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
		text-align: center;
	}
	.calendar image{
		top: 50rpx;
		width: 100%;
		
	}
	
	
	
	.remind{
		/* 提醒 */
		background-color: #FFFFFF;
		margin-top: 40rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		/* width: 680rpx;
		height: 900rpx; */
		border-radius:25rpx ;
		border:solid 1rpx rgba(0, 0, 0, 0.1);
		box-shadow: 0rpx 0rpx 15rpx 5rpx rgba(0, 0, 0, 0.05);
		
	}
	.remindTitle{
		/* 提醒模块标题 */
/* 		background-color: #00ff00; */
		margin: 40rpx 40rpx;
		text-align: left;
		font-size: 35rpx;
	}
	.remindList{
		margin: 20rpx 20rpx;
		/* background-color: #cde4ff; */
		display: flex;
	}
	.eventIcon{
		margin: 20rpx;
		width: 40rpx;
		/* background-color: #007AFF; */
	}
	.icon{
		line-height: 0rpx;
		float: left;
		padding: 0rpx;
	}
	.icon  image{
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 10rpx;
	}
	
	.eventDetail{
		margin: 20rpx 0rpx;
		overflow: hidden;
		display: flex;
		flex-direction:column;
	}
	.event{
		line-height: 40rpx;
		height: 40rpx;
		/* background-color:#4CD964; */
		padding-bottom: 60rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	.eventTime{
		color: #9e45bd;
		font-weight: bolder;
	}
	.eventTitle{
		padding-left: 20rpx;
		overflow: hidden;
		text-overflow:ellipsis; 
		white-space: nowrap;
		
	}
	.eventState{
		width: 150rpx;
		margin-left: 30rpx;
	}
	.eventState button{
		line-height: 32rpx;
		height: 40rpx;
		width: 150rpx;
		border-radius: 20rpx;
		padding: 0;
	}
	.eventState text{
		font-weight:400;
		font-size: 24rpx;
	}
</style>
