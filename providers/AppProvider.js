'use strict'

const ServiceProvider = use('@core/ServiceProvider')


class ExampleService {

  constructor(config) {
    this.config = config
  }

  getName() {
    return 'ExampleService'
  }
}


class AppProvider extends ServiceProvider {

  boot() {
    console.log('AppProvider boot')
  }

  register() {
    console.log('AppProvider Register')
    this.app.register('Example', (app) => {
      return new ExampleService(app.Config.get('name'))
    })
  }

}

module.exports = AppProvider
