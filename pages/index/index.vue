<template>
	<view class="content">
		<view class="text-area"  >
			<text class="title" :animation="tutuData">
				您
				的
				汕
				学
				日
				寄
			</text>
		</view>
		<view class="img">
			<image src="../../static/hxr/ccity.jpg" class="city"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tutuData:''
			}
		},
		onShow:function(){
			this.moveT();
		},
		onLoad:function() {
			//初始化一个动画
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: "ease"
			});
			this.animation = animation;
			setTimeout(function(){
				// 延时跳转
				uni.navigateTo({
					url: "./login"
				})
			},4000);
		},
		methods: {
			moveT(){
				this.animation.opacity(1).step() //透明度变为1
				this.animation.translateX(40).step() //右移40
				this.tutuData=this.animation.export();
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-top: 230rpx;
	}

	.title {
		opacity: 0;
		font-size: 56rpx;
		position: relative;
		left: -80rpx;
	}
	.img{
		width: 780rpx;
		height: 400rpx;
		position: relative;
		top: 320rpx;
	}
	.city{
		width: 100%;
		height: 100%;
	}
</style>
