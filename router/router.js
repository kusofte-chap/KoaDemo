const Router = require('koa-router')
const services = require('../controller/method')
const router = new Router()

router.get('/', (ctx) => {
	ctx.body = 'index page'
})

router.get('/user/', services['user'])
router.get('/list/', services['list'])
router.post('/add/', services['add'])
router.post('/update/', services['update'])
router.post('/delete/', services['delete'])
module.exports = router