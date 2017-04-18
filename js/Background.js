
//背景类
(function () {
    window.Background = Class.extend({
        init:function (option) {
            option = option || {};

            this.img = option.img;
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;

            //总数
            this.count = parseInt(game.canvas.width / this.width) + 1;
            //速度
            this.speed = option.speed || 1;
        },
        //绘制
        render:function () {

            for(var i=0;i<2 * this.count;i++){
                game.ctx.drawImage(this.img, this.x + i * this.width, this.y, this.width, this.height);
            }
        },
        //更新
        update:function () {
            this.x -= this.speed;
            //无限循环
            //1. 判断x ,小于 -this.count * this.width, 重新赋值为0
            //2. 创建2倍总数的图片
            if (this.x <= -this.count * this.width){
                this.x = 0;
            }
        },

        //停止
        pause:function () {
            this.speed = 0;
        }
    })
})();

