var express = require('express');
var router = express.Router();



// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/:about', function(req, res) {
  res.send('About birds' + req.params.about);
  router.param('id', req.params.about);
});

// customizing the behavior of app.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
  
    console.log('customizing ')
    
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

/*router.param('about', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})*/


module.exports = router;