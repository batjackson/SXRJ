<template>
	<view>
		<!-- 加个注释，测试github -->
		<view class="header">
			<!-- 顶部 -->
<!-- 			<button type="default" class="backBtn">
				<image src="../../static/schedule/toLeft.png" mode="heightFix"></image>
			</button> -->
			<!-- 返回按钮不需要 -->
			<view class="headerTitle">
				<text>重要的事情</text>
			</view>
		</view>
		<view class="calendar">
			<!-- 日历 -->
			<!-- <image src="../../static/schedule/demo.png" mode="widthFix"></image> -->
			<!-- 这里考虑到要根据日期切换下方的日程列表，需要与数据库交互，比较复杂，待设计；先贴个图以表尊敬 -->
			   <view class="date">
			      <!-- 年份 月份 -->
			      <view class="month">
						<view class="leftbtn" @click="weekPre()">
							<img src="../../static/schedule/doubleLeft.png" mode=""></img>
						</view>
						<view>{{ currentYear }}年{{ currentMonth }}月</view>
						<view class="rightbtn" @click="weekNext()">
							<img src="../../static/schedule/doubleRight.png" mode=""></img>
						</view>
			      </view>
			      <!-- 星期 -->
			      <ul class="weekdays">
			       <li>一</li>
			       <li>二</li>
			       <li>三</li>
			       <li>四</li>
			       <li>五</li>
			       <li>六</li>
			       <li>日</li>
			      </ul>
			      <!-- 日期 -->
			      <ul class="days">
			       <li @click="pick(day)" v-for="(day, index) in days" :key="index">
			        <!--本月-->
			       <!-- <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
			        <span v-else> -->
			        <!--今天-->
			        <!-- <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate()}}</span>
			        <span v-else>{{ day.getDate() }}</span> -->
					<span v-if="day.getFullYear() == pickDay.getFullYear() && day.getMonth() == pickDay.getMonth() && day.getDate() == pickDay.getDate()" class="active">{{ day.getDate()}}</span>
					<span v-else>{{ day.getDate() }}</span>
			        </span>
			       </li>
			      </ul>
			    </view>
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
						<view class="eventTitle" @click = 'enterDetail(index,$event)' >
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
		<img src="../../static/tabs/AddIssues.png" alt="" @click="addSche" class="addSche">
		<!-- ljs 添加日程 -->
		
	</view>
</template>

<script>
  export default {
	
    data() {
      return {
		/*日程请求url*/
		//获取用户日程数据:参数token
		getDailyUrl: 'http://119.23.222.86:8890/daily/list',
		//对某条数据check：dailyId
		checkDailyUrl: 'http://119.23.222.86:8890/daily/check',
		
		//用户的token
		token:'',
		
		//日历变量
		currentYear: 1970,
		currentMonth: 1,
		currentDay: 1,
		currentWeek: 1,
		days: [],
		dataDay: [],
		//用户选择的日期
		pickDay:'',
		  
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
		// 用户的所有日程数据
		dailyList:[],
		// 用户当天的日程列表
		todayList:[
		// {
		// 	id:0,
		// 	//查收状态，即该事件是否已经完成
		// 	checkState:true,
		// 	//查收状态文本，默认check
		// 	checkText:'check',
		// 	//check按钮的颜色
		// 	checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
		// 	time:'8:00',
		// 	// 时间戳:这里是测试，这个时间戳的值已经过去
		// 	timestamp:1635474766840,
		// 	//标题最长8个字？
		// 	title:'可添加今日日程',
		// 	//时间状态，即该事件的时间是否过去
		// 	timeState:true,
		// 	//图标路径，默认为 go.png
		// 	iconPath:'../../static/schedule/go.png',
		// 	//中间的过渡的线条路径，默认为 loading.png
		// 	linePath:'../../static/schedule/loading.png'
			
		// },
		// {
		// 	id:1,
		// 	checkState:false,
		// 	checkText:'check',
		// 	checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
		// 	time:'10:00',
		// 	timestamp:1635474766840,
		// 	title:'可添加今日日程',
		// 	timeState:false,
		// 	iconPath:'../../static/schedule/go.png',
		// 	linePath:'../../static/schedule/loading.png'
			
		// },
		// {
		// 	id:2,
		// 	checkState:false,
		// 	checkText:'check',
		// 	checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
		// 	time:'14:00',
		// 	timestamp:2635474766850,
		// 	title:'可添加今日日程',
		// 	timeState:false,
		// 	iconPath:'../../static/schedule/go.png',
		// 	linePath:'../../static/schedule/loading.png'
			
		// },
		// {
		// 	id:3,
		// 	checkState:false,
		// 	checkText:'check',
		// 	checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
		// 	time:'19:00',
		// 	timestamp:2635474766840,
		// 	title:'可添加今日日程',
		// 	timeState:false,
		// 	iconPath:'../../static/schedule/go.png',
		// 	linePath:'../../static/schedule/loading.png'
			
		// }
		
		]
      };
    },
	mounted:function(){
		this.getTime()
	},
	created () {
	    this.initData(null)
		this.getToken()
	},
	activated(){
		this.getToken()
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
		//获取缓存的用户token
		getToken(){
			let that=this;
			uni.getStorage({
				key:'token',
				success: function(res) {
					this.token = res.data;
					// that.getUserAccount(this.token);
					console.log(this.token)
					that.getDaily(this.token)
				}					
			});
			// console.log(token);
			return this.token
		},
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
			//console.log(event.id)
			var id = event.id
			var index = this.todayList.findIndex(item => item.id === id)
			// 根据用户点击的日程id 搜索数组，找到对应的item的数组下标
			this.todayList[index].checkState = !(this.todayList[index].checkState)
			this.updateState()
			let that = this;
				uni.request({
					url:this.checkDailyUrl,
					method:'GET',
					data:{
						dailyId:id
					},
					success: (res) => {
						console.log(String(id)+'已经check')
					},
					fail: (err) => {
						console.log(err)
					}
				})
		},
		
		//日历
		formatDate (year, month, day) {
		    const y = year
		    let m = month
		    if (m < 10) m = `0${m}`
		    let d = day
		    if (d < 10) d = `0${d}`
		    return `${y}-${m}-${d}`
		   },
		 
		initData (cur) {
		    let date = ''
		    if (cur) {
		     date = new Date(cur)
		    } else {
		     date = new Date()
		    }
		    this.currentDay = date.getDate()     // 今日日期 几号
		    this.currentYear = date.getFullYear()    // 当前年份
		    this.currentMonth = date.getMonth() + 1  // 当前月份
		    this.currentWeek = date.getDay() // 1...6,0  // 星期几
		    if (this.currentWeek === 0) {
				this.currentWeek = 7
		    }
		    const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
		    this.days.length = 0
		    // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
		    /* eslint-disabled */
		    for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
				const d = new Date(str)
				d.setDate(d.getDate() - i)
				// console.log(y:" + d.getDate())
				this.days.push(d)
		    }
		    for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
				const d = new Date(str)
				d.setDate(d.getDate() + i)
				this.days.push(d)
		    }
			this.pickDay = new Date()
		},
		
		// 上个星期
		weekPre () {
		    const d = this.days[0]  // 如果当期日期是7号或者小于7号
		    d.setDate(d.getDate() - 7)
		    this.initData(d)
		},
		 
		// 下个星期
		weekNext () {
		    const d = this.days[6]  // 如果当期日期是7号或者小于7号
		    d.setDate(d.getDate() + 7)
		    this.initData(d)
		},
		 
		   // 上一個月  传入当前年份和月份
		pickPre (year, month) {
		    const d = new Date(this.formatDate(year, month, 1))
		    d.setDate(0)
		    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
		},
		 
		 
		   // 下一個月  传入当前年份和月份
		pickNext (year, month) {
		    const d = new Date(this.formatDate(year, month, 1))
		    d.setDate(35)
		    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
		},
		 
		   // 当前选择日期
		pick (date) {
		    // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
			this.pickDay=date
			console.log(this.pickDay)
			this.setTodayDaily()
		},
		//获取用户的日程信息
		getDaily(token_){
			let that = this;
				uni.request({
					url:this.getDailyUrl,
					data:{
						token: token_
					},
					success: (res) => {
						that.dailyList = res.data.data	//获取到的日程信息赋值给 全局变量 dailyList[]
						that.setTodayDaily()
						//赋值操作
						// for(let val of that.dailyList){
						// //此处为重点
						// 	that.$set(val,'discussAnswer','0');
						// }
						
					},
					fail: (err) => {
						console.log(err)
					}
				})
			
		},
		// 将全局变量的日程信息 dailyList 映射到 todayList
		setTodayDaily(){
			console.log(this.dailyList) 
			this.todayList.length = 0
			for(var i=0;i<this.dailyList.length;i++){
				let ones= {
					id:0,
					//查收状态，即该事件是否已经完成
					checkState:false,
					//查收状态文本，默认check
					checkText:'check',
					//check按钮的颜色
					checkColor:'color:rgb(56, 158, 13);background-color:rgba(56, 158, 13, 0.2)',
					time:'8:00',
					// 时间戳:这里是测试，这个时间戳的值已经过去
					timestamp:1635474766840,
					//标题最长8个字？
					title:'可添加今日日程',
					//详情
					detail:'',
					//时间状态，即该事件的时间是否过去
					timeState:true,
					//图标路径，默认为 go.png
					iconPath:'../../static/schedule/go.png',
					//中间的过渡的线条路径，默认为 loading.png
					linePath:'../../static/schedule/loading.png'
				}
				let thisDate = new Date(this.dailyList[i].date)
				if(thisDate.getDate()==this.pickDay.getDate()){
					ones.id = this.dailyList[i].dailyId
					ones.timestamp = this.dailyList[i].timesTamp
					ones.title = this.dailyList[i].conclusion
					ones.detail = this.dailyList[i].content
					ones.checkState = this.dailyList[i].ifComplete ? true : false
					/*时间格式化 + 拼接*/
					let hour = thisDate.getHours();
					let minute = thisDate.getMinutes();
					hour = hour > 9 ? hour : '0' + hour
					minute = minute > 9 ? minute : '0' + minute
					ones.time = hour + ':' + minute
					this.todayList.push(ones)
				}
			}
			console.log(this.todayList)
		},
		enterDetail(index,e){
			//点击进入时间详情
			let eventID = index
			// /*时间格式处理*/
			// /*时间格式化 + 拼接*/
			// let hour = this.pickDay.getHours();
			// let minute = this.pickDay.getMinutes();
			// hour = hour > 9 ? hour : '0' + hour
			// minute = minute > 9 ? minute : '0' + minute
			// let time = hour + ':' + minute+":00"
			// /*处理年月*/
			let eventDate = this.formatDate(this.pickDay.getFullYear(), this.pickDay.getMonth() + 1, this.pickDay.getDate())
			let eventDetail = encodeURIComponent(JSON.stringify(this.todayList[index]))
			uni.navigateTo({
			    url: '/pages/schedule/scheDetail?id='+eventID+'&date='+eventDate+'&detail='+eventDetail   
				/*跳转页面路径,传递的参数为日程id和日程所在日的时间戳*/
			});
			
		},
		addSche(){
			uni.navigateTo({
			    url: "../addSchedule/addSche"
				/*跳转页面路径,传递的参数为日程id和日程所在日的时间戳*/
			});
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
	li{
		list-style:none;
	}
	.header{
		/* 顶部 */
		margin-top: 20rpx;
	}

	.headerTitle{
		/* 顶部标题 */
		width: 100%;
		padding-top: 15rpx;
		padding-bottom: 20rpx;
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
	/*周日历*/
	.date {
	  height: 250rpx;
	  margin-left: 20rpx;
	  margin-right: 20rpx;
	  color: #333;
	 }
	 
	.weekdays {
	   display: flex;
	   font-size: 30rpx;
	   margin-top: 20rpx; 
	}
	
	.weekdays li {
	   flex: 1;
	   text-align: center;
	}
	
	.month {
	   font-size: 30rpx;
	   text-align: center;
	   margin-top: 20rpx;
	   display: flex;
	   flex-direction: row;
	   justify-content: space-between;
	   height: 50rpx;
	   /* overflow: hidden; */
	   line-height: 50rpx;
	}
	.leftbtn{
		padding-left: 20rpx;
	}
	.rightbtn{
		padding-right: 20rpx;
	}
	.leftbtn img{
	   width: 50rpx;
	   height: 50rpx;
	}
	.rightbtn img{
	   width: 50rpx;
	   height: 50rpx;
	}
	 
	.days {
	   display: flex;
	}
	.days li {
	    flex: 1;
	    font-size: 30rpx;
	    text-align: center;
	    margin-top: 20rpx;
	    line-height: 60rpx;
	}
	 .active {
	  display: inline-block;
	  width: 60rpx;
	  height: 60rpx;
	  color: #fff;
	  border-radius: 50%;
	  background-color: #fa6854;
	 }
	.other-month {
	    color: #e4393c;
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
	
	.addSche {
		width: 210rpx;
		margin:700rpx 0rpx 200rpx 500rpx ;
	}
</style>
