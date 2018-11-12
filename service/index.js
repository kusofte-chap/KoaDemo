module.exports = async ctx => {
  try {
    await controller.list().then(result => {
      ctx.body = success(result)
    })
  } catch (err) {
    res = failed(err)
  }
  ctx.body = res
}
