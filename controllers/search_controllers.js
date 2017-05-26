const OAuth = require('oauth');

const showAll = (req,res,next) => {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'w1pFHbFKtnKQIxsL7RIElRBYW',
    'tFPSMXDtdiTOJrTLUEoZb5HckhwrHVG0geIlJHWVZRpUefkExd',
    '1.0',
    null,
    'HMAC-SHA1'
  );
  let keywords = fixedEncodeURIComponent(req.body.keywords);
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${keywords}`,
    '298117495-rwhkUqAwcrOigoSUkcM5cqJiutYBqujCP08Yacpi', //test user token
    'i0BfSb3MnHSmfxzYrulu94eJb24IKud4fdtE8HRveiZVc', //test user secret
    function (err, data, result){
      data = JSON.parse(data);
      let status = data.statuses.map((status)=>status.user.screen_name+' : \n'+status.text);
      // console.log(status.join('\n'));
      res.send(err? err :  status.join('\n'))
    });
}

const fixedEncodeURIComponent = (str) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

module.exports = {
  showAll
}