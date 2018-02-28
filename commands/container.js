// @cliDescription  Generates a redux smart component.

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate container <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const screenName = name.endsWith('Container') ? name : `${name}Container`
  const props = { name: screenName }

  const jobs = [
    {
      template: 'container.ejs',
      target: `App/Containers/${screenName}/${screenName}.js`
    },
    {
      template: 'container-style.ejs',
      target: `App/Containers/${screenName}/${screenName}Style.js`
    }
  ]

  await ignite.copyBatch(context, jobs, props)

  // if using `react-navigation` go the extra step
  // and insert the container into the nav router
  print.info('Container created, manually add it to your navigation')
}
