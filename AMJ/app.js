const cheerio = require('cheerio');
const superagent = require('superagent');
const charset = require('superagent-charset');
charset(superagent);

const express = require('express')
const app = express()


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

app.get('/', (req, res) => {
  superagent.get('https://www.meiju.net/new/video/search/%E9%BE%99%E6%88%98%E5%A3%AB.html').end((error, html) => {

    if (error) {
      console.log(error)
      return;
    }

    var $ = cheerio.load(html.text);

    superagent.get('https://www.meiju.net/' + $('.thumbnail').attr('href')).end((error, html) => {
      if (error) {
        console.log(error)
        return;
      }

      var $ = cheerio.load(html.text);
      var urls=[];
      $('#detail-content ul li a').each((index, element) => {
        let $element = $(element);
        urls.push({
          url:$element.attr('href')
        })
        // console.log($element.attr('href'))
      })
      console.log(req.ip)
      res.send(urls)
    })
  })
})