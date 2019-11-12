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
  }

  register() {
    this.app.register('Example', (app) => {
      return new ExampleService(app.Config.get('name'))
    })
  }

}

module.exports = AppProvider
