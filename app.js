var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser") // 处理前端传过来的数据

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resumesRouter = require('./routes/resumes');
var collectionRouter = require('./routes/collections');
var resumeTemplatesRouter = require('./routes/resumeTemplates');
var mallsRouter = require('./routes/malls');
var clubsRouter = require('./routes/clubs');
var articlesRouter = require('./routes/articles');
var appListsRouter = require('./routes/appLists');
var bannersRouter = require('./routes/banners');
var sidebarAdImgsRouter = require('./routes/sidebarAdImgs');
var friendLinksRouter = require('./routes/friendLinks');
var commentsRouter = require('./routes/comments');

var app = express();
// 自定义跨域中间件
var allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCors);//使用跨域中间件


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// 下面两项设置文件上传的大小限制为50m，不写的话可能会因为文件超过3m而报413
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(cookieParser());
// 这里配置了静态资源，所以访问图片直接http://localhost:3001/images/homeList1.png可以拿到
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resumes', resumesRouter);
app.use('/resumeTemplates', resumeTemplatesRouter);
app.use('/collections', collectionRouter);
app.use('/malls', mallsRouter);
app.use('/clubs', clubsRouter);
app.use('/articles', articlesRouter);//文章
app.use('/appLists', appListsRouter);//软件
app.use('/banners', bannersRouter);//轮播图
app.use('/sidebarAdImgs', sidebarAdImgsRouter);//侧边广告图
app.use('/friendLinks', friendLinksRouter);//友情链接
app.use('/comments', commentsRouter);//评论




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
