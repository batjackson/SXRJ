<template>
	<view class="container">
		<view class="contentBox">
			<view class="content">{{content}}
				<view>--by {{author}}</view>
			</view>
			<view class="operate">
				<view>{{createTime}}</view>
				<view class="btn">
					<view @click="deletePost()" style="padding-right: 50rpx; color: #e65757;">删除</view>
					<view class="comment" @click="comment()">
						<image src="../../static/subscribe/comment.png"></image>
						
					</view>
				</view>
			</view>
			<view class="commentBox" v-if="!hasComment">暂无评论</view>
			<view class="commentBox" v-else>
				<view class="commentItem" v-for="(item, index) in commentList">
					<view>{{item.account}}: {{item.content}}</view>
				</view>
			</view>
			<input class="commentInput" type="text" v-model="resetV" :focus="iffocus" @confirm="comfirmCmt($event)" ref="cinput" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				createTime:'',
				author: '',
				content: '',
				postID: -1,
				iffocus: false,
				commentList: [],
				hasComment: false,
				resetV: ''
			}
		},
		onLoad(option){
			let objData=JSON.parse(option.objdata);
			console.log(objData);
			this.createTime=objData.createTime;
			this.author=objData.author.account;
			this.content=objData.content;
			this.postID=objData.id;
		},
		methods: {
			deletePost(){
				let that=this;
				uni.request({
					url:'http://121.5.56.179:8890/happen/delete_post',
					data:{
						post_id:that.postID
					},
					success(data){
						uni.showToast({
							title:"删除成功",
							icon:"success",
							mask:true,
							duration:1000,
							success(){
								let page=getCurrentPages();
								let beforePage=page[page.length-2];
								
								uni.navigateBack({	
									success(){
										beforePage.refresh();
										
									}
								})
							}
						})
						
					},
					fail(err){
						console.log(err);
					}
				})
			},
			comment(){
				console.log("评论")
				// this.$refs.cinput.focus=true;
				this.iffocus=true;
			},
			comfirmCmt(e){
				console.log(e.detail.value)
				this.resetV=e.detail.value;
				let obj={
					account: 'zhzhang3',
					content: e.detail.value,
				}
				this.commentList.push(obj);
				this.hasComment=true;
				this.resetV='';
				this.iffocus=false;
				
			}
		}
	}
</script> 

<style>
.container{
	height: 100vh;
	/* background-image: url(../../static/schedule/addScheBg.png); */
	background-image: url(../../static/schedule/bg.jpg);
	background-repeat: no-repeat;
	background-size: 100%;
}
	
.contentBox{
	position: relative;
	top: 50%;
	transform: translateY(-80%);
	width: 90%;
	margin: auto;
}

.content{
	position: relative;
	margin: auto;
	min-height: 100px;
	background-color: #f4d8feba;
	padding: 40rpx;
	color: #706969;
	border-radius: 5px;
	
}

.content view{
	position: relative;
	margin-top: 30%;
	text-align: right;
}

.operate{
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #706969;
}

.btn{
	display: flex;
	color: #825190;
}
.btn view{
	margin-right: 5px;
}

.comment{
	width: 40rpx;
	height: 40rpx;
	margin-top: 2px;
}

.comment image{
	width: 100%;
	height: 100%;
}

.commentBox{
	position: relative;
	margin: auto;
	padding: 18rpx;
	margin-top: 10rpx;
	background-color: #e5e5e5b5;
}

.commentInput{
	outline: none;
	border: none;
	color: #ffffff00;
}

.commentItem{
	position: relative;
	margin: 5px 0;
	padding: 5px;
	background-color: #ffffffad;
	color:#6d6868;
}

.commentItem view{
	margin: 2px;
}
</style>
