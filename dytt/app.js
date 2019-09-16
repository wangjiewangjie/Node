const cheerio = require('cheerio');
const superagent = require('superagent');
const charset = require('superagent-charset');
charset(superagent);

let index = 1; //页面数控制
let url = 'https://www.dy2018.com/html/bikan/index';
let titles = []; //用于保存title

getTitle = (url, i) => {
  console.log("正在获取第" + i + "页的内容");
  superagent.get(url + index + '.html').charset('gb2312').end((error, html) => {

    if (error) {
      console.log(error)
      return;
    }

    let $ = cheerio.load(html.text, {
      decodeEntities: false
    });

    $('.co_content8 .ulink').each((index, element) => {
      let $element = $(element);
      titles.push({
        title: $element.text()
      })
    })

    if (i < 2) { //为了方便只爬了两页
      getTitle(url, ++index); //递归执行，页数+1
    } else {
      console.log(titles)
      console.log("Title获取完毕！");
    }
  })
}

main = () => {
  console.log("开始爬取");
  getTitle(url, index);
}

main(); //运行主函数

getBtLink = (urls, n) => { //urls里面包含着所有详情页的地址
  console.log("正在获取第" + n + "个url的内容");
  superagent.get('http://www.ygdy8.net' + urls[n].title, function (sres) {
    var chunks = [];
    sres.on('data', function (chunk) {
      chunks.push(chunk);
    });
    sres.on('end', function () {
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312'); //进行转码
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      $('#Zoom td').children('a').each(function (idx, element) {
        var $element = $(element);
        btLink.push({
          bt: $element.attr('href')
        })
      })
      if (n < urls.length - 1) {
        getBtLink(urls, ++count);
        //递归
      } else {
        console.log("btlink获取完毕！");
        console.log(btLink);
      }
    });
  });
}