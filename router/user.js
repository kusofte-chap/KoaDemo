const {
	success,
	failed
} = require('../pojo')

const query = require('../controller/mysqlConfig')

const list = function(val) {
	console.log('val', val)
	let _sql = `SELECT * FROM user_info;`
	return query(_sql)
}

const getUserInfo = async (ctx) => {
	let res
	let params = {
		method: ctx.method,
		query: ctx.query,
		body: ctx.body
	}
	try {
		await list(params).then(result => {
			res = success(result)
		})
	} catch (err) {
		res = failed(err)
	}
	ctx.body = res
}


module.exports = getUserInfo