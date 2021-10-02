const chalk = require('chalk')
const concurrently = require('concurrently')

concurrently([
  { command: 'webpack serve --config webpack.dev.js', name: ' react ' },
  {
    command: 'nodemon --watch mocks/*.* ./config/mocks.dev-server.js',
    name: ' mocks ',
  },
]).then(() =>
  console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`)
)
