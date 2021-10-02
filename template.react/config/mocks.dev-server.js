const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const ip = require('ip')
const chalk = require('chalk')
const router = require('../mocks/api')

const app = new Koa()

const divider = chalk.gray('\n-----------------------------------')
const cfg = {
  staticPath: '../mocks/static',
  port: 9001,
  host: 'localhost',
}
const { port, host, staticPath } = cfg

app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(router.Koa())
app.listen(port, () => {
  console.log(`Mocks Server started ! ${chalk.green('✓')}`)
  console.log(`
${chalk.bold('Mocks Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
  `)
})
