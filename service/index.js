const mysql = require('mysql')
const config = require('../config/defaultConfig')

let pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
})

const query = function(sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log(err)
				resolve(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

module.exports = query


class MysqlBasic {
	query(sql, values) {
		return new Promise(function(resolve, reject) => {
			pool.getConnection(function(err, connection) {
				if (err) {
					resolve(err)
					return
				}
				connection.query(sql, values, (err, rows) => {
					if (err) {
						return reject(err)
					}
					resolve(rows.json())
				})
			})
		})
	}
	throwError(msg) {
		return new Promise((resolve, reject) => {
			reject(msg)
		})
	}
}

class Response extends MysqlBasic {
	list(sql) {
		let user_id = val.query.id
		let _sql = `SELECT * FROM user_info WHERE id=${user_id};`
		return query(_sql)
	}
	add: function(val) {
		let {
			body
		} = val
		if (Object.keys(body).length === 0) {
			this.throwError('missing params')
		}
		let requiredParams = ['name', 'age', 'single', 'face_value', 'avatar', 'descr']

		let _key = requiredParams.join(',')
		let _value = requiredParams.map(e => {
			return (typeof body[e] === 'number' ? body[e] : `'${body[e]}'`)
		}).join(',')

		let _sql = `INSERT INTO user_info (${_key}) VALUES (${_value});`
		return query(_sql)
	}
	update: function(obj) {
		let {
			body
		} = obj
		if (Object.keys(body).length === 0) {
			this.throwError('missing params')
		}
		if (!body.id) {
			return new Error('id is required')
		}

		let setStr = Object.entries(body).map(([key, value]) => {
			return typeof value === 'number' ? `${key}=${value}` : `${key}='${value}'`
		})
		let _sql = `UPDATE user_info SET ${setStr.join(',')} WHERE id=${body.id};`

		return query(_sql)
	}
	delete: function(val) {
		const {
			body
		} = val
		if (Object.keys(body).length === 0 || !body.id) {
			this.throwError('missing params')
		}
		let _sql = `DELETE FROM user_info WHERE id=${body.id};`
		return query(_sql)
	}
}