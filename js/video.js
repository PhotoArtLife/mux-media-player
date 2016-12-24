//ES5用法原生DOM自定义播放器
var video = document.querySelector("video");
var isPlay = document.querySelector(".switch");
var expand = document.querySelector(".expand");
var progress = document.querySelector(".progress");
var loaded = document.querySelector(".progress > .loaded");
var currPlayTime = document.querySelector(".timer > .current");
var totalTime = document.querySelector(".timer > .total");

//当视频可播放的时候
video.oncanplay = function(){
    //显示视频
    this.style.display = "block";
    //显示视频总时长
    totalTime.innerHTML = getFormatTime(this.duration);
};

//播放按钮控制
isPlay.onclick = function(){
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    this.classList.toggle("fa-pause");
};

//全屏
expand.onclick = function(){
    video.webkitRequestFullScreen();
};

//播放进度
video.ontimeupdate = function(){
    var currTime = this.currentTime,    //当前播放时间
        duration = this.duration;       // 视频总时长
    //百分比
    var pre = currTime / duration * 100 + "%";
    //显示进度条
    loaded.style.width = pre;

    //显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime);
};

//跳跃播放
progress.onclick = function(e){
    var event = e || window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};

//播放完毕还原设置
video.onended = function(){
    //切换播放按钮状态
    isPlay.classList.remove("fa-pause");
    isPlay.classList.add("fa-play");
    //进度条为0
    loaded.style.width = 0;
    //还原当前播放时间
    currPlayTime.innerHTML = getFormatTime();
    //视频恢复到播放开始状态
    video.currentTime = 0;
};

function getFormatTime(time) {
    var time = time || 0;

    var h = parseInt(time/3600),
        m = parseInt(time%3600/60),
        s = parseInt(time%60);
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;

    return h+":"+m+":"+s;
}