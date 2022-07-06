<script>
	export default {
		onLaunch: function() {
			
			function getNewOA(){
					uni.request({
						url:"http://119.23.222.86:8890/oa/list",
						data :{
							page:1,
							size:20,
							order:1,
							str:"通知"
						},
						success:(res)=>{
							console.log("success")
							if(res.data.data==null){
								console.log("无新信息")
							}
							else{
								console.log("有新信息")
								let getItemsOnce=res.data.data.oaDtoList;
								console.log(getItemsOnce)

								}
							},
						fail:(err)=>{
							console.log("fail")
							console.log(err)
						}
					})
			
			}
			//自登录后隔半小时请求一次
			const IntervalSend =function(){
				console.log("keep intervalSend");
				getNewOA();
			}
			setInterval(IntervalSend,1800000); 
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}	
	}

</script>

<style>
	/*每个页面公共css */
	uni-checkbox .uni-checkbox-input {
	     border-radius: 50% !important;
	     color: #ffffff !important;
	 }
	 
	 uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	     color: #fff;
	     background: #9E45BD;
	 }
	 uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:after{
	     font-size: 23px;
			
	 }
	 
	/* uni-page-head隐藏  ljs*/
	uni-page-head {
		display: none;
	}
	/* uni-page-refresh隐藏 ljs*/
	uni-page-refresh{
		height: 0;
	}
	*{
		padding: 0;
		margin: 0;
	}
</style>
