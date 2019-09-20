var express = require('express');
var router = express.Router();

const cheerio = require('cheerio');
const superagent = require('superagent');
const charset = require('superagent-charset');
charset(superagent);

/* GET home page. */
router.get('/', function (req, res, next) {

  var keyword = req.query.keyword
  superagent.get('https://www.meiju.net/new/video/search/' + keyword + '.html').end((error, html) => {

    if (error) {
      console.log(error)
      return;
    }
    var $ = cheerio.load(html.text);
    console.log($('.thumbnail').attr('href'))
    superagent.get('https://www.meiju.net/' + $('.thumbnail').attr('href')).end((error, html) => {
      if (error) {
        console.log(error)
        return;
      }

      var $ = cheerio.load(html.text);
      var urls = [];
      $('#detail-content ul li a').each((index, element) => {
        let $element = $(element);
        urls.push({
          url: $element.attr('href')
        })
        console.log($element.attr('href'))
      })
      // res.send(urls)
    })
  })
  res.render('index', {
    title: 'spider'
  });
});

module.exports = router;