module.exports = (api, options) => {
  const { info, chalk, execa } = require('@vue/cli-shared-utils')

  api.registerCommand('test:e2e', {
    description: 'run e2e tests with Cypress',
    usage: 'vue-cli-service test:e2e [options]',
    options: {
      '--headless': 'run in headless mode without GUI',
      '--mode': 'specify the mode the dev server should run in. (default: production)',
      '--url': 'run e2e tests against given url instead of auto-starting dev server',
      '-s, --spec': '(headless only) runs a specific spec file. defaults to "all"'
    },
    details:
      `All Cypress CLI options are also supported:\n` +
      chalk.yellow(`https://docs.cypress.io/guides/guides/command-line.html#cypress-run`)
  }, async (args, rawArgs) => {
    removeArg(rawArgs, 'headless', 0)
    removeArg(rawArgs, 'mode')
    removeArg(rawArgs, 'url')

    info(`Starting e2e tests...`)

    const { url, server } = args.url
      ? { url: args.url }
      : await api.service.run('serve')

    const cyArgs = [
      args.headless ? 'run' : 'open', // open or run
      '--config', `baseUrl=${url}`,
      ...rawArgs
    ]

    const cypressBinPath = require.resolve('cypress/bin/cypress')
    const runner = execa(cypressBinPath, cyArgs, { stdio: 'inherit' })
    if (server) {
      runner.on('exit', () => server.close())
      runner.on('error', () => server.close())
    }

    if (process.env.VUE_CLI_TEST) {
      runner.on('exit', code => {
        process.exit(code)
      })
    }

    return runner
  })

  // TODO remove in RC
  api.registerCommand('e2e', (args, rawArgv) => {
    const { warn } = require('@vue/cli-shared-utils')
    warn(`Deprecation Warning: "vue-cli-service e2e" has been renamed to "vue-cli-service test:e2e".`)
    return api.service.run('test:e2e', args, rawArgv)
  })
}

module.exports.defaultModes = {
  'test:e2e': 'production'
}

function removeArg (rawArgs, arg, offset = 1) {
  const matchRE = new RegExp(`^--${arg}`)
  const equalRE = new RegExp(`^--${arg}=`)
  const i = rawArgs.findIndex(arg => matchRE.test(arg))
  if (i > -1) {
    rawArgs.splice(i, offset + (equalRE.test(rawArgs[i]) ? 0 : 1))
  }
}
