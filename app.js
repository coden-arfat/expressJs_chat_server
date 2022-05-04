const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {Server} = require('socket.io')
const cors = require('cors')
const http =require('http')

// creating app and http server 

const app = express();
const server = http.createServer(app)

// creating socket  and setting cors 

const io = new Server(server,{
  cors:{
    origin: "127.0.0.1:3000",
    methods:["POST ","GET"],
  },
})

// cheaking server 

io.on('connection',()=>{
  console.log('server connected')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/',(req,res)=>{
//   res.send('done')
// })


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
