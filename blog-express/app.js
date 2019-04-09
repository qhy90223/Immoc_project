var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs=require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore=require('connect-redis')(session)
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter= require('./routes//blog')
const userRouter = require('./routes/user')
var app = express();
const ENV=process.env.NODE_ENV


if(ENV!=="production"){
  app.use(logger('dev'))
}else{
  const fileName=path.join(__dirname,"logs","access.log")
  const logWriteStream=fs.createWriteStream(fileName)
  app.use(logger('combined',{
    stream:logWriteStream
  }))
}
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const redisClient = require('./db/redis')
const sessionStore=new RedisStore(redisClient)
app.use(session({
  secret:"Wjiol_8776#",        //加密密室
  cookie:{
    path:"/",                 //默认配置
    httpOnly:true,            //默认配置
    maxAge:24*60*60*1000
  },
  store:sessionStore
}))
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/user',userRouter);
app.use('/api/blog',blogRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
