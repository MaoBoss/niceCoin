
var https = require("https");

var cheerio = require("cheerio");

//爬取数据地址

//非小号页码为 list_*.html
// var url = 'https://www.feixiaohao.com/list_3.html'


//存储爬取的数据
var dataArray = [];

//过滤数据
function filter(html){
    var $ = cheerio.load(html)
    var dataHtml = $('#table').find('tr').toArray();
    for(var i = 0 ; i < dataHtml.length ; i++){
        var obj = {
            rank : $(dataHtml[i]).children().eq(0).text(),
            name : $(dataHtml[i]).children().eq(1).text(),
            currentValue : $(dataHtml[i]).children().eq(2).text(),
            price : $(dataHtml[i]).children().eq(3).text(),
            currentNum : $(dataHtml[i]).children().eq(4).text(),
            turnover : $(dataHtml[i]).children().eq(5).text(),
            gains : $(dataHtml[i]).children().eq(6).text(),
            priceTrend : $(dataHtml[i]).children().eq(7).text()
        }
        //合成每次爬取的数据
        dataArray.push(obj);
    }
    return JSON.stringify(dataArray);
}

function fw(url,callback){
    https.get(url , function(res){
        var html = "";
        res.on("data",function(data){
            html += data;
        })
        res.on("end",function(){
            var feiData = filter(html);
            callback(feiData);
        })
    }).on("error",function(){
        console.log("出错了");
    })
}

//开放方法
function feixiaohao(){
    this.queryRealTime = function(pageIndex,callback){
        var url = 'https://www.feixiaohao.com/';
        if(pageIndex == '' || pageIndex == undefined){
            //当页数为空时 默认返回第一页
            url += 'list_1.html';
        }else{
            url += 'list_' + pageIndex + '.html'
        }
        console.log('爬取   '+url);
        var getData = fw(url,function(res){
            callback(res);
        });
    }
}

module.exports = feixiaohao
