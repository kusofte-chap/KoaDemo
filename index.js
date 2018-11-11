const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router/router.js')
const app = new Koa()

// 配置跨域
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
	ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
	ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
	ctx.set('Access-Control-Allow-Credentials', true);
	ctx.set('Access-Control-Max-Age', 3600 * 24);
	await next();
})

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)