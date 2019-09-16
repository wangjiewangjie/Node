const superagent = require('superagent');
const charset = require('superagent-charset');
charset(superagent);
const cheerio = require('cheerio');

superagent.get('https://www.meiju.net/search.php?page=1&searchtype=5&tid=2').end(function (error, html) {

  if (error) {
    console.log(error)
    return;
  }

  var $ = cheerio.load(html.text);
  console.log($)
  $('.visible-xs .num').each(function () {
    pages = $(this).text().match(/\/(\S*)/)[1] //获取总页数
  })

})
