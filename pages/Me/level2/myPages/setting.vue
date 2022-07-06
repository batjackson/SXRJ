<template>
	<view>
		<view class="leftArrowPosition" @click="goBack">
			<image class="leftArrow" src="../../../../static/Me/myPage/leftArrow.png" mode=""></image>
		</view>
		<view class="menuPosition optionFirst">
			<view class="text">
				<text>消息提醒</text>				
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
		<view class="menuPosition optionSecond">
			<view class="text">
				<text>选项2</text>
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
		<view class="menuPosition optionThird">
			<view class="text">
				<text>选项3</text>
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
		<view class="menuPosition optionFourth">
			<view class="text">
				<text>选项4</text>
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
		<view class="menuPosition optionFifth">
			<view class="text">
				<text>选项5</text>
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
		<view class="menuPosition optionSixth">
			<view class="text">
				<text>选项6</text>
			</view>
			<checkbox class="checkboxPosition"></checkbox>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// title: 'Hello'
			}
		},
		onLoad() {
	
		},
		methods: {
			goBack(){
				uni.navigateBack({
					//delta=1表示返回上一个页面 ljs
					delta:1
				})
			}
	
		}
	}
</script>

<style scoped>
	/* 左箭头样式 */
	.leftArrow{
		width: 48rpx;
		height: 48rpx;
	}
	.leftArrowPosition{
		margin-top: 100rpx;
		margin-left: 43rpx;
	}
	/* 灰色分割线 */
	.line{
		/* position: relative; */
		/* top: -2rpx; */
		width: 92%;
		border-bottom: 3rpx solid #EDEAF4;	
	}
	.text{
		width: 150rpx;
		position: relative;
		top: 20rpx;
		/* height: 20px; */
		/* background-color: #007AFF; */
	}
	.menuPosition{
		position: relative;
		left: 30rpx;
		/* top: 100rpx; */
	}
	.optionFirst{
		top: 40rpx;
	}
	.optionSecond{
		top: 50rpx;
	}
	.optionThird{
		top: 60rpx;
	}
	.optionFourth{
		top: 70rpx;
	}
	.optionFifth{
		top: 80rpx;
	}
	.optionSixth{
		top: 90rpx;
	}
	/* 复选框位置 */
	.checkboxPosition{
		margin-left: 635rpx;
		position: relative;
		top: -20rpx;
	}


	

</style>
