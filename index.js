var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

// 设置存放模板文件目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// session 中间件
app.use(session({
	// 设置cookie中保存sessionid的字段名
	name:config.session.key,
	//设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	secret:config.session.secret,
	cookie: {
		maxAge:config.session.maxAge
	},
	store: new MongoStore({
		url:config.mongodb
	})
}));

// flash 中间件 显示通知
app.use(flash());

// 路由
routes(app);

app.listen(config.port, function() {
	console.log(`${pkg.name} listening on port ${config.port}`);
});