//管道类
(function () {
    window.Pipe = Class.extend({
        init:function () { //属性
            //方向 0: 口往下 1: 口往上
            this.dir = _.random(0,1);
            
            this.width = 148;
            this.height = _.random(100, game.canvas.height * 0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;
            
            //速度
            this.speed = 4;

        },

        //绘制
        render:function () {
            if (this.dir == 0){ //口往下
                game.ctx.drawImage(game.allImageObj['pipe1'], 0, 1664 - this.height, this.width, this.height, this.x, this.y,this.width, this.height );
            }else if (this.dir ==1) { //口往上
                game.ctx.drawImage(game.allImageObj['pipe0'], 0,0, this.width,this.height, this.x,this.y,this.width,this.height);
            }
            
        },

        //更新
        update:function () {
            this.x -= this.speed;
            //判断管道是否走出画布
            if (this.x <= -this.width){
                //移除管道
                game.pipeArr = _.without(game.pipeArr, this);
            }

            //碰撞检测
            if (game.bird.x > this.x - game.bird.width && game.bird.x < this.x + this.width){//x方向检测
                if (this.dir == 0){// 口往下的管道
                    if (game.bird.y <= this.height){// y方向检测 碰撞了
                        game.gameOver();
                    }
                }else if(this.dir ==1){// 口往上的管道
                    if (game.bird.y >= this.y - game.bird.height){ //y方向检测 碰撞了
                        game.gameOver();
                    }
                }
            }

        },

        //停止
        pause:function () {
            this.speed = 0;
        }

    })
})();

