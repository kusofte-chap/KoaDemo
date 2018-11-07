const Router = require('koa-router')
const koaBody = require('koa-body')
const router = new Router()
const addUserInfo = require('./controller/add.js')
const getUserInfo = require('./controller/user.js')
const editUserInfo = require('./controller/edit.js')
const deleteUserInfo = require('./controller/delete.js')
router.get('/', (ctx) => {
	ctx.body = 'index page'
})
router.get('/user', getUserInfo)
router.get('/add', addUserInfo)
router.get('/edit', editUserInfo)
router.get('/delete', deleteUserInfo)

module.exports = router