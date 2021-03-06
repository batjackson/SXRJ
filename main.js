import App from './App'
import ClUni from "cl-uni";
// Vue.use(ClUni, {
// 	// 进入业务单页时，页面栈只有一个，自定义导航左侧返回按钮跳转的路径
// 	homePage: "/"
// });
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

if(process.env.NODE_ENV === 'development'){
//开发环境
// #ifdef H5
Vue.prototype.$baseUrl = "/oa"
// #endif
// #ifdef APP-PLUS ||MP
Vue.prototype.$baseUrl = "http://121.5.56.179:8890"
// #endif
}else{
Vue.prototype.$baseUrl = "https://121.5.56.179:8890"
}



//app 防杀 安卓端 （需在安卓手机上测试 H5无法测试）
// plus.device.setVolume(0);
// const bgAudioMannager = uni.getBackgroundAudioManager();
// bgAudioMannager.src = "./static/ljs/10min-silence.mp3";  	// 配置音频播放路径
// bgAudioMannager.play();		// 播放
// bgAudioMannager.onEnded(function(){
//     bgAudioMannager.seek(0);
//     bgAudioMannager.play();
// })
// let main = plus.android.runtimeMainActivity();
// //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
// plus.runtime.quit = function() {
//     main.moveTaskToBack(false);
// };
// //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
// plus.nativeUI.toast = (function(str) {
//     if (str =='再次返回退出应用') {
//         plus.runtime.quit();
//     } else {
//         uni.showToast({
//             title: '再次返回退出应用',
//             icon: 'none'
//         })
//     }
// });
