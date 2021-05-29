// express 기본 모듈
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// 로그 관련
const morgan = require('morgan');
const logger = require('winston');
morgan.token('port', function (req, res) {
    return req.headers['x-real-port']
});

// 보안 관련
const helmet = require('helmet');
const hpp = require('hpp');

// express 객체 생성
const app = express();

const cors = require('cors');
// CORS 허용 셋팅
const corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));

// express 기본 셋팅
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sequelize 관련
const { sequelize } = require('./models');
// sequelize.sync({force: true}); // 앱을 키고 끌 때마다 DB를 모두 DROP시키고 새로 생성한다. 
sequelize.sync(); // DB에 있는 데이터를 보존하면서 Sequelize를 키는 명령어

// dotenv 관련
require('dotenv').config();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 배포 버전 & 개발 버전 시 다르게 적용
if (process.env.NODE_ENV === 'production') {
    // 보안 관련
    app.use(helmet());
    app.use(hpp());

    // 로그 관련
    app.use(morgan('요청자 ip = :remote-addr::port || :method :url :status :response-time ms || 이전 url = :referrer', { 'stream': logger.stream }));
} else {
    // 로그 관련
    app.use(morgan('dev'));
}

// 라우팅 관련
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

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
