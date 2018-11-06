const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const router = new Router()
const app = new Koa()


router.get('/', (ctx) => {
	ctx.body = 'index page'
})

router.get('/user', (ctx) => {
	ctx.body = 'user page'
})

router.post('/add', koaBody(), (ctx) => {
	ctx.body = JSON.stringify(ctx.request.body)
})

router.get('/async', async ctx => {
	const sleep = async (ms) => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(true)
			}, ms)
		})
	}
	await sleep(1000)
	ctx.body = `这是异步处理页`
})

app.use(router.routes())

app.listen(3000)