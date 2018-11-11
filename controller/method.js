const query = require('./mysqlConfig')
const {
	success,
	failed
} = require('../pojo')

const allServices = {
	user: function(val) {
		let user_id = val.query.id
		let _sql = `SELECT * FROM user_info WHERE id=${user_id};`
		return query(_sql)
	},
	list: function(val) {
		let _sql = `SELECT * FROM user_info;`
		return query(_sql)
	},
	add: function(val) {
		let {
			body
		} = val
		if (Object.keys(body).length === 0) {
			return new Error('missing params')
		}
		let requiredParams = ['name', 'avatar', 'age', 'single', 'face_value', 'desr']
		let missing = requiredParams.every(e => (e in body))

		if (!missing) {
			return new Error('missing params')
		}

		let _key = requiredParams.join(',')
		let _value = requiredParams.map(e => (body[e])).join(',')
		let _sql = `INSERT INTO user_info (${_key}) VALUES (${_value});`
		return query(_sql)
	},
	update: function(obj) {
		let {
			body
		} = obj

		if (Object.keys(body).length === 0) {
			return new Error('missing params')
		}
		if (!body.id) {
			return new Error('id is required')
		}

		const colum = ['name', 'avatar', 'age', 'single', 'face_value', 'desr']
		let setStr = Object.entries(body).map(([key, value]) => {
			if (colum.indexOf(key)) {
				return typeof value === 'number' ? `${key}=${value}` : `${key}='${value}'`
			}
		})
		let _sql = `UPDATE user_info SET ${setStr.join(',')} WHERE id=${body.id};`
		return query(_sql)
	},
	delete: function(val) {
		const {
			body
		} = val
		if (Object.keys(body).length === 0 || !body.id) {
			return
		}
		let _sql = `DELETE FROM user_info WHERE id=${body.id};`
		return query(_sql)
	},
}

module.exports = ((methods) => {
	let services = {}
	methods.forEach((fnName) => {
		services[fnName] = async (ctx) => {
			let res
			try {
				let params = {
					method: ctx.method,
					query: ctx.query,
					body: ctx.request.body
				}
				await allServices[fnName](params).then(result => {
					res = success(result)
				})
			} catch (err) {
				res = failed(err)
			}
			ctx.response.body = { ...res
			}
		}
	})
	return services
})([
	'user',
	'list',
	'add',
	'update',
	'delete',
])