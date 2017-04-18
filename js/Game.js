
//中介者
(function () {
    window.Game = Class.extend({
        //构造方法
        init:function (option) {//定义属性
            option = option || {};

            //备份指针
            var self = this;

            //1.fps
            this.fps = option.fps || 50;
            //2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            //3.获取canvas, 上下文
            this.canvas = document.getElementById(option.canvasId);
            this.ctx = this.canvas.getContext('2d');

            //4.保存所有的dom对象
            this.allImageObj = {};

            //5.实例化加载本地数据工具类
            this.staticSourceUtil = new StaticSourceUtil();
            //6/加载图片 返回: 所有dom对象, 总的图片个数, 加载的图片个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj, allImageCount, loadImageCount) {
                    //console.log(allImageObj, allImageCount, loadImageCount);
                if (allImageCount == loadImageCount){// 图片加载完成
                    self.allImageObj = allImageObj;
                    self.run();//加载完资源,运行游戏
                }
            });

            //7.记录游戏是否结束
            this.isGameOver = false;
            
        },

        //开始游戏
        run:function () {
            //1.备份指针
            var self = this;

            //2.开启定时器
            this.timer = setInterval(function () {
                self.runloop();
            },1000/ self.fps);// 计算一帧的时间 1000 / fps = 每一帧的时间

            //3.创建房子
            this.fangzi = new Background({
                img: self.allImageObj['fangzi'],
                y:self.canvas.height - 256 -100,
                width:300,
                height:256,
                speed:2
            });
            //4.创建树
            this.shu = new Background({
                img: self.allImageObj['shu'],
                y:self.canvas.height - 216 - 48,
                width:300,
                height:216,
                speed:3
            });
            //5.创建地板
            this.diban = new Background({
                img: self.allImageObj['diban'],
                y:self.canvas.height  - 48,
                width:48,
                height:48,
                speed:4
            });
            
            //6.创建管道数组
            this.pipeArr = [new Pipe()];
            
            //7.创建小鸟
            this.bird = new Bird();

        },

        //游戏循环 ->每一帧都在调用
        runloop:function () {
            //清屏
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            //console.log(Math.random());
            //1.计算真实帧数
            this.frameUtil.countFps();

            //2.绘制帧数文字
            this.ctx.fillText('FPS / ' + this.frameUtil.realFps, 15, 15);
            this.ctx.fillText('FNO /' + this.frameUtil.currentFrame, 15, 30);
            
            //3.更新和绘制房子
            this.fangzi.update();
            this.fangzi.render();

            //4.更新和绘制树
            this.shu.update();
            this.shu.render();
            //5.更新和绘制地板
            this.diban.update();
            this.diban.render();
            
            //6.每隔100帧创建一个管道
            if ( !(this.isGameOver) && (this.frameUtil.currentFrame % 100 == 0)){
                this.pipeArr.push(new Pipe());
            }
            
            //7.更新和绘制管道
            for(var i=0;i<this.pipeArr.length;i++){
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }
            
            //8.小鸟更新和绘制
            this.bird.update();
            this.bird.render();

        },

        //结束游戏
        gameOver:function () {
            //console.log('gameover666');
            //1.停止房子
            this.fangzi.pause();
            //2.停止树
            this.shu.pause();
            //3.停止地板
            this.diban.pause();
            //4.停止管道
            this.pipeArr.forEach(function (item ,index) {
                item.pause();
            })

            //5.更改记录游戏结束属性
            this.isGameOver = true;
            
            //6.更改鸟死亡状态
            this.bird.die = true;
            
        },

        //退出游戏, 停止计时
        pause:function () {
            clearInterval(this.timer);
        }


    })
})();


