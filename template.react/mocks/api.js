const Router = require('koa-rapid-router')
const router = new Router()
const api = router.create('/api')
const success = (val) => JSON.stringify({ success: true, data: val })
const fail = (err) => JSON.stringify({ success: false, error: err })

api.get('/status', async (ctx) => {
  ctx.body = success()
})

module.exports = router
