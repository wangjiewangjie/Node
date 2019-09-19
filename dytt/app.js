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