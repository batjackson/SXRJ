<template>
	<view>
		<cl-message ref="message" ></cl-message>
		<view class="myheader">

		</view>
		<view class="hearder_content">
			<view class="year">
				<cl-select style="font-size: 35rpx;" v-model="start_year" :options="years" @change="handleCommandYear"></cl-select>
			</view>
			<view class="month">
				<cl-select style="font-size: 35rpx;"  v-model="start_moon"  :options="months"  @change="handleCommandMoon"></cl-select>
			</view>
			<view class="balanceBox">
				<span class="yearDateText" >余额</span>
				<span class="balance" >{{smartCardBalance}}</span>
				<span class="yearDateText" >元</span>
			</view>
		</view>
		<cl-divider color="#9e45bd">消费记录</cl-divider>
		<view class="log" >
			<cl-card v-for="expense in expenseLog" :key='expense.id' class="box-card" label=" " :show-more="false"> 
				<view  >
					<cl-avatar style="float:left;" :size="70" src="../../static/smartcard/ico2.png"></cl-avatar>
				    <!-- <el-avatar style="float:left;" :size=35 class="m_ico"  src="../../../static/images/smartCard/ico2.png"></el-avatar> -->
				    <span class="ex_type"  >{{expense.detail[1].val}}</span>
				    <span class="ex_val" >{{expense.detail[0].val}}</span>
				    <span class="ex_sys" >{{expense.detail[3].val}}</span>
				    <span class="ex_date" >{{expense.detail[4].val}}</span>
				    <span class="ex_time" >{{expense.detail[5].val}}</span>
				</view>
				
			</cl-card>
			
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				now_year:0,
				now_moon:0,
				now_day:0,
				start_year:0,                   // 开始年份
				end_year:0,                    // 结束年份
				start_moon:0,                   // 开始月份
				end_moon:0,                    // 结束月份
				start_day:0,                   // 开始日期
				end_day:0,                     // 结束日期
				start_date:0,                  // 拼接后的开始时间
				end_date:0,                    // 拼接后的结束时间
				activeNames: ['1'],
				expenseLog:'',
				transactions:'',        // 查询到的消费记录数组数据
								
				smartCardNo:0,       //一卡通号码
				smartCardBalance:0,  //一卡通余额
				thisDay:0,
				thisMoon:0,
				years:[
					{
						label: "2019年",
						value: 2019
					},
					{
						label: "2020年",
						value: 2020
					},
					{
						label: "2021年",
						value: 2021
					},
					{
						label: "2022年",
						value: 2022
					}
				],
				months: [
					{
						label: "1月",
						value: 1
					},
					{
						label: "2月",
						value: 2
					},
					{
						label: "3月",
						value: 3
					},
					{
						label: "4月",
						value: 4
					},{
						label: "5月",
						value: 5
					},
					{
						label: "6月",
						value: 6
					},{
						label: "7月",
						value: 7
					},
					{
						label: "8月",
						value: 8
					},{
						label: "9月",
						value: 9
					},
					{
						label: "10月",
						value: 10
					},
					{
						label: "11月",
						value: 11
					},
					{
						label: "12月",
						value: 12
					}
				]
				,//pro
				smartCardNoUrl:'http://121.5.56.179:8890/api/smartcard/ldap_to_smartcardno',
				smartCardBalanceUrl:'http://121.5.56.179:8890/api/smartcard/get_balance?token=test&smartcard_no=',
				smartCardLogUrl:'http://121.5.56.179:8890/api/smartcard/get_transactions', 
				accountUrl:'http://121.5.56.179:8890/user/account',
				//参数：&smartcard_no=****（一卡通号）&start_datetime=****（开始日期格式：2021_01_01）&end_datetime=****（结束日期格式：2022_01_01）
				thkon:'',
				account:'',
				Transactions:"",
			};
		},
		mounted:function(){
				this.get_Date()         // 获取当前时间
				this.getToken()  		//获取用户token
		},
		onPullDownRefresh() {
			this.getToken()
		},
		methods: {
			//获取缓存的用户token
			getToken(){
				let that=this;
				uni.getStorage({
					key:'token',
					success: function(res) {
						this.token = res.data;
						// that.getUserAccount(this.token);
						// console.log(this.token)
						that.token = this.token	
						console.log(that.token)
					}					
				});
				// console.log(token);
				this.inqueryAccount(this.token)
				// return this.token	
				
			},
			//根据token获取校园网账号
			async inqueryAccount(token_){
				let that = this;
					uni.request({
						url:this.accountUrl,
								method:'POST',
						data:{
							token: token_,
						},
						success: (res) => {
									if(res.statusCode==200){
										console.log(res.data.data)
										that.account = res.data.data
										that.setBalance()       // 获取余额
									}else{
										console.log(token_)
										uni.showModal({
											showCancel:false,
											title: '提示',
											content: '获取用户一卡通信息失败！请联系开发者。',
										})
									}
						},
						fail: (err) => {
							console.log(err)
						}
					})
			},
					  		
			// 根据校园网账号查询一卡通号
			inqueryldap(){
				return new Promise((resolve, reject) => {
					console.log(this.smartCardNoUrl + this.account)
					uni.request({
						url:this.smartCardNoUrl,
						data:{
							ldap:this.account
						},
						// url:this.smartCardNoUrl + this.account,
						success: (res) => {
									if(res.statusCode==200){
										console.log(res.data)
										this.smartCardNo = res.data			
										resolve('suc');  // 千万别忘写！！！
										return res.data
									}		
						},
						fail: (err) => {
							reject('err')
							console.log(err)
						}
					})
				})
			},
			
			// 根据一卡通账号查询消费记录
			inqueryTransactions(){
				return new Promise((resolve, reject) => {
					uni.request({
						url:this.smartCardLogUrl,
						method:"GET",
						// url:'http://121.5.56.179:8890/api/smartcard/get_transactions?smartcard_no=82991&start_datetime=2022_07_01&end_datetime=2022_07_09',
						// smartCardLogUrl:'http://121.5.56.179:8890/api/smartcard/get_transactions', 
						data:{
							smartcard_no:this.smartCardNo,
							start_datetime:this.start_date,
							end_datetime:this.end_date
						},
						
						// url:this.smartCardNoUrl + this.account,
						success: (res) => {
									if(res.statusCode==200){
										// this.Transactions = Array(this.Transactions)
										this.Transactions = JSON.stringify(res.data)
										//this.Transactions = JSON.parse(res.data)
										resolve('suc');
										// return res.data
									}
									
						},
						fail: (err) => {
							reject('err')
							console.log(err)
						}
					})
				}) 
			},
			// 根据一卡通账号查询余额
			inqueryBalance(){
				return new Promise((resolve, reject) => {
					uni.request({
						url:this.smartCardBalanceUrl + this.smartCardNo,
						method:"GET",
						// url:this.smartCardNoUrl + this.account,
						success: (res) => {
									if(res.statusCode==200){
										this.smartCardBalance = res.data.new_balance
										console.log(this.smartCardBalance)
										resolve('suc');
									}
									
						},
						fail: (err) => {
							reject('err')
							console.log(err)
						}
					})
				}) 

			},
			// 根据查询的余额设置余额
			async setBalance(){
			    // 调用函数并设置一卡通号码
			    await this.inqueryldap()
			        // 根据一卡通号码查询余额
				await this.inqueryBalance()
			    await this.getTransactions()
				
				uni.stopPullDownRefresh()
			},
			// 获取并解析消费记录到成员变量
			async getTransactions(){
			    this.expenseLog = ''
				console.log("执行")
			    await this.inqueryTransactions()
			
				var transactions = JSON.parse(this.Transactions);
				console.log(transactions[0].tranamt)
				var dataLength = transactions.length            // 获取请求的消费记录的长度
				console.log(dataLength)
				var array1 = []
				for(var i = 0; i<dataLength; i++){
				    // 新建一条消费记录
				    var new_expenseLog = {id:0,detail:[
				        {detail_id:1, key:'收支', val:0},
				        {detail_id:2, key:'类型', val:''},
				        {detail_id:3, key:'地点', val:''},
				        {detail_id:4, key:'系统', val:''},
				        {detail_id:5, key:'日期', val:''},
				        {detail_id:6, key:'时间', val:''},
				        ]
				    }
				    // 为新建的消费记录赋值
				    new_expenseLog.id = i
				    new_expenseLog.detail[0].val = transactions[i].tranamt     //收支
				    new_expenseLog.detail[1].val = transactions[i].tranname    //类型
				    new_expenseLog.detail[2].val = transactions[i].address     //地点
				    new_expenseLog.detail[3].val = transactions[i].sysname     //系统
				    var dateStr = String(transactions[i].effectdate).match(/(\S*)T/)[1]     // 提取日期
				    var timeStr = String(transactions[i].effectdate).match(/T(\S*)/)[1]     //提取时间
				    new_expenseLog.detail[4].val = dateStr                     //日期
				    new_expenseLog.detail[5].val = timeStr                     //时间
				    // 将此消费记录加入到数组 array1 中
				    array1.push(new_expenseLog)
				}
				this.expenseLog = array1
				if(this.expenseLog.length==0){
					uni.showModal({
					  title: '提示',
					  content: '该时段无消费记录！',
						showCancel:false
					})
				}	
			    
			        
			},
			// 获取时间
			get_Date(){
			    var now= new Date()     //获取当前时间数据
			    //console.log(now)
			    this.now_year = now.getFullYear()       //当前年
			    this.now_moon = now.getMonth()+1        //当前月
			    this.now_day = now.getDate()            //当前日
			    			
			    this.start_year = now.getFullYear()
			    this.end_year = now.getFullYear()
			    this.start_moon = now.getMonth()+1
			    this.end_moon = now.getMonth()+1
			    this.start_day = 1
			    this.end_day = now.getDate()
			    this.concatDate()
			},
			// 拼接时间用于查询
			concatDate(){
			    // 拼接时间数据-->符合接口格式要求
			    if(this.start_moon<10){
			        this.start_date = this.start_year+"_0"+this.start_moon
			    }else{
			        this.start_date = this.start_year+"_"+this.start_moon
			    }
			    if(this.end_moon<10){
			        this.end_date = this.end_year+"_0"+this.end_moon
			    }else{
			        this.end_date = this.end_year+"_"+this.end_moon 
			    }
			    if(this.start_day<10){
			        this.start_date = this.start_date + "_0"+this.start_day
			    }else{
			        this.start_date = this.start_date + "_"+this.start_day
			    }
			    if(this.end_day<10){
			        this.end_date = this.end_date + "_0"+this.end_day
			    }else{
			        this.end_date = this.end_date + "_"+this.end_day
			    }
			    console.log(this.start_date +"-"+ this.end_date)
			},
			// 选择月份日期
			handleCommandMoon(command) {
				console.log("command:" + command)
			    if(this.start_year == this.now_year && command > this.now_moon){            //超出当前时间的月份
					console.log("command:" + command)
			        command = this.now_moon
					this.start_moon = this.now_moon
					this.$refs["message"].open({
					          message: "超出当前时间",
							  type:"error",
							  top:"250rpx",
					});
					console.log(this.start_moon)
					
			    }else if(this.start_year == this.now_year && command > this.now_moon){      //等于当前月份
			        this.start_moon = command
			        this.end_moon = command
			        this.end_day = this.now_day
			    }else{
			        this.start_moon = command
			        this.end_moon = command
			        this.end_day = new Date(this.start_year,  this.start_moon, 0).getDate()     //当前月份最后一天
			    }
			    this.concatDate()       //拼接时间
			    this.setBalance()       //重新查询
			    
			},
			// 选择年份日期
			handleCommandYear(command2) {
			        this.start_year = command2
			        this.end_year = command2
			        this.end_day = new Date(this.start_year,  this.start_moon, 0).getDate()     //当前月份最后一天
			        
			        this.concatDate()       //拼接时间
			        this.setBalance()       //重新查询
			        
			},
		}
	}
</script>

<style>

.myheader{
	width: 105%;
	height: 80rpx;
	padding: 0rpx;
	margin: 0rpx;
	background-color: #9e45bd;

}
.hearder_content{
	padding-top: 60rpx;
	padding-bottom: 0rpx;
	height: 100rpx;
	background-color: #ffffff;
	
}
.year{
	/* padding-top: 10rpx; */
	padding-top: 2.5%;
	float: left;
	width: 30%;
}
.month{
	padding-top: 2.5%;
	float: left;
	width: 25%;
}
.balanceBox{
	float: left;
	padding-left: 10%;
	width: 35%;
}
.yearDateText{
      font-size: 15px;
  }
.balance{
    
      color: #2aac4a;
      font-size: 30px;
      padding-left: 5px;
      padding-right: 5px;
  }
.log{
       margin-top: -80rpx;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
		padding-bottom: 200rpx;
    }
    .m_ico{
        background-color: white;

    }
    .item_div{
    }
    .box-card{
        padding-bottom: 10px;
    }
    .ex_val{
        font-weight: bolder;
        padding: 6px;
        font-size: 20px;
        float: right;
        font-family: "Microsoft YaHei";
    }
    .ex_type{
        font-weight: bolder;
        padding: 5px 5px 8px 8px;
        font-size: 18px;
        float: left;
        font-family: "Microsoft YaHei";
    }
    .ex_sys{
        color: rgba(0, 0, 0, 0.507);
        width: 100%;
        padding: 2px 2px 7px 7px;
        font-size: 12px;
        float: left;
    }
    .ex_date{
        color: rgba(0, 0, 0, 0.507);
        padding: 0px 10px 7px 7px;
        font-size: 12px;
        float: left;
    }
    .ex_time{
        color: rgba(0, 0, 0, 0.507);
        padding: 0px 10px 7px 7px;
        font-size: 12px;
        float: left;
    }

</style>
