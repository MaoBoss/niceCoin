var express = require('express');
var app = express();

var url = require('url');

var fxh = require('./query/feixiaohao')

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//查询非小号数据
app.get('/queryFeixiaohao', function (req, res) {
    res.status(200);
    var urlObj = url.parse(req.url, true);

    //查询的页数
    var pageIndex = urlObj.query.pageIndex;

    //创建非小号对象
    var fun = new fxh();
    fun.queryRealTime(pageIndex,function(data){
        res.json(data);  
    });
});

//配置服务端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器运行', host, port);
})