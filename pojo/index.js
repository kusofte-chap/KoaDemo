const success = (result) => {
	return {
		state: 0,
		data: result
	}
}
const failed = (error) => {
	return {
		state: 500,
		msg: error.message || '服务器异常'
	}
}

module.exports = {
	success,
	failed
}