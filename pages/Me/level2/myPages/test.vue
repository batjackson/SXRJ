<template>
</template>

<script>
	export default{
		data(){
			return{ 
				Inv:0,
				oaCount:0,
				showUpImg:true,
				currentIndex: -1,
				array:["新闻学院","知行书院","荧光夜跑"],
				// keywords:["新闻学院","知行书院","明德书院","德馨书院","工学院"],
				keywords:[],
				// token:"378fd578-4088-44a5-92e9-7921d4a24a6b",
				token:"",
				isDeleteCode:0,
				src1:"../../../../static/Me/myPage/good.png",
				src2:"../../../../static/Me/myPage/cancelGood.png",
				oaList:[
					{
						id:0,
						title:"你好你好你好",
						timestamp:"2021-11-17T12:10:37",
						subcompanyName:"教务处",
						keywords:"",
						favoredCount:1,
						readCount:0						
					}
				],
				oaSubList:[],
				surbscribes:[]
				
			}
		},
		onLoad() {
			this.getToken();
			this.getSubDepart();
			// this.getOaFavorites(this.token,1,5);
		},
		methods:{
			//获取缓存token
			getToken(){
				// var token = '';
				uni.getStorage({
					key:'token',
					success: function(res) {
						this.token = res.data;
						console.log(this.token);
					}
				});
				
				// this.getOaFavorites(this.token,1,5);
			},
			//获取用户订阅词
			getSubDepart(){
				uni.getStorage({
					key:'subDepart',
					success: function(res) {
						this.keywords = res.data;
						console.log(this.keywords[0]);
					}
				});
				
			},
			
	},
	}
</script>

<style>
</style>
