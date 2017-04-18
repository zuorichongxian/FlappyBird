
//加载本地的资源数据工具类 -> 加载本地数据,图片
(function () {
    window.StaticSourceUtil = Class.extend({
        init:function () {
            //保存所有dom对象, 格式: {name : dom对象 }
            this.allImageObj = {};
        } ,

        //加载图片
        //参数: 1.请求路径, 2.回调callback
        //返回: dom对象, 总的图片个数, 加载的图片个数
        loadImage:function (jsonUrl, callback) {
            //备份指针
            var self = this;
            
            //1.创建请求对象
            var xhr = new XMLHttpRequest();

            //2.ajax 三步走
            //判断ajax 状态码和状态值, 响应服务器,获取数据
            xhr.onreadystatechange = function () {
                if (xhr.readyState ==4 && xhr.status ==200 ){//响应就绪
                    //加载图片
                    var loadImageCount = 0;
                    
                    //2.1 获取数据
                    var responseText = xhr.responseText;
                    //console.log(typeof responseText);
                    //2.2 sting转换为json
                    var responseJson = JSON.parse(responseText);
                    //console.log(responseJson);
                    //2.3 获取数组数据
                    var dataArr = responseJson.images;
                    //console.log(dataArr);
                    //2.4 遍历数组,创建图片对象
                    for(var i=0;i<dataArr.length;i++){
                        
                        //2.4.1 创建图片对象
                        var image = new Image();
                        image.src = dataArr[i].src;
                        image.index = i;
                        //加载图片
                        image.onload = function () {
                            //累加加载图片个数
                            loadImageCount++;
                            //图片名称
                            var imageName = dataArr[this.index].name;
                            //保存图片 格式: {name : dom对象 }
                            self.allImageObj[imageName] = this; //this 代表 当前加载的图片对象 
                            //回调 返回: 所有dom对象, 总的图片个数, 加载的图片个数
                            callback(self.allImageObj, dataArr.length, loadImageCount);
                        }
                    }
                }
            }

            //规定请求类型
            xhr.open('get', jsonUrl);
            //向服务器发送请求
            xhr.send();

        }

    })
})();


