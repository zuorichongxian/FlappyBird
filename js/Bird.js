
//小鸟类
(function () {
    window.Bird = Class.extend({
        init:function () {
            this.x = game.canvas.width * 0.5;
            this.y = 100;
            this.width = 85;
            this.height = 60;
            
            //1.翅膀的状态 合法值 0,1,2
            this.swing = 0;
            //2.翅膀的煽动频率, 每5帧煽动一次翅膀
            this.swingRate = 5;

            //3.下落的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            //4.下落的增量
            this.dY = 0;

            //5.旋转角度
            this.rotateAngle = 0;

            //6.小鸟状态 合法值 0: 往下落  1:往上飞
            this.state = 0;
            //7.空气阻力
            this.deltaY = 1;
            //8.鸟初始化后, 监听点击
            this.bindListenClick();

            //9.记录鸟是否死亡
            this.die = false;
            
            //10.动画角标
            this.animationIndex = 0;

        },
        //绘制
        render:function () {
            //1.绘制热血
            if (this.die){
                //截图的宽高
                var sWidth = 325;
                var sHeight = 138;
                //计算行和列
                var row = parseInt(this.animationIndex / 5);
                var col = this.animationIndex % 5;

                game.ctx.drawImage(game.allImageObj['blood'], col * sWidth, row * sHeight, sWidth, sHeight, this.x-100, this.y, sWidth,sHeight );
                //游戏结束图片
                game.ctx.drawImage(game.allImageObj['gameover'], (game.canvas.width - 626) * 0.5, (game.canvas.height - 144) * 0.5 );

                return;
            }
            //2.鸟旋转
            game.ctx.save();
            game.ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            game.ctx.rotate(this.rotateAngle * Math.PI/180);
            //还原坐标原点, 进行绘制
            game.ctx.translate(-(this.x + this.width * 0.5), -(this.y + this.height * 0.5));
            game.ctx.drawImage(game.allImageObj['bird'], this.swing * this.width,0,this.width, this.height, this.x, this.y, this.width,this.height )
            game.ctx.restore();
        },
        
        //更新方法
        update:function () {
            if (this.die){
                //累加动画角标
                this.animationIndex++;
                if (this.animationIndex == 30){
                    //this.animationIndex == 0;
                    //结束游戏, 停止计时
                    game.pause();
                }
                return;
            }
            
            //1.煽动翅膀
            if (game.frameUtil.currentFrame % this.swingRate == 0){//每5帧更新一次状态
                this.swing++;
                if (this.swing == 2){// 状态达到2后, 重新赋值为0
                    this.swing = 0;
                }
            }

            //2.判断鸟的状态
            if (this.state == 0){// 往下落
                //自由落体
                //下落高度: h= 1/2 *g*Math.pow(t, 2)
                this.dY = 0.001 * 0.5* 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame ,2);
                //增加旋转角度
                this.rotateAngle++;
            }else if(this.state == 1){//往上飞
                this.deltaY++;
                //计算y的增量
                this.dY = -15 + this.deltaY;
                //判断增量是否大于0
                if (this.dY >=0){ //将要往下落
                    this.state = 0;
                    //更新下落帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            //更新y值
            this.y += this.dY;

            //3.封锁上空
            if (this.y < 0){
                this.y = 0;
            }

            //4.判断是否撞到地板
            if (this.y >= game.canvas.height - 48 - this.height){
                game.gameOver();
            }



        },

        //监听点击
        bindListenClick:function () {
            //备份指针
            var self = this;

            game.canvas.addEventListener('mousedown', function () {
                //1.更改状态
                self.state = 1;
                //2.初始仰角
                self.rotateAngle = -25;
                //3.还原阻力
                self.deltaY = 1;
            })
        }
        
        
    })
})();

