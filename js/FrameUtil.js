
//帧工具类 -> 计算真实的帧数
(function () {
    window.FrameUtil = Class.extend({
        init:function () {
            //1.开始的帧数
            this.sFrame = 0;
            //2.总的帧数
            this.currentFrame = 0;
            //3.开始的时间
            this.sTime = new Date();
            //4.真实的fps
            this.realFps = 0;

        },
        
        //计算真实的帧数 ->每一帧都执行
        countFps:function () {
            //1.累加总帧数
            this.currentFrame++;
            //2.当前这一帧的时间
            var nowTime = new Date();
            //3.判断是不是达到一秒
            if (nowTime - this.sTime >= 1000){
                //4.计算真实的fps = 总帧数 - 开始的帧数
                this.realFps = this.currentFrame - this.sFrame;
                //5.更新帧数
                this.sFrame = this.currentFrame;
                //6.更新时间
                this.sTime = nowTime;
            }
            
        }
        
    })
    
})();



