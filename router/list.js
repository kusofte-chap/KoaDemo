const allServices = require('../controller/mysqlConfig')
const getUserList = async (ctx) => {
	let res
	try {
		await allServices.list().then(result => {
			res = success(result)
		})
	} catch (err) {
		res = failed(err)
	}
	ctx.body = res
}

module.exports =