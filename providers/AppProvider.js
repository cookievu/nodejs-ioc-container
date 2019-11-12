'use strict'

const ServiceProvider = use('@core/ServiceProvider')

class AppProvider extends ServiceProvider {

  boot() {
    console.log('AppProvider boot')
  }

  register() {
    console.log('AppProvider Register')
  }

}

module.exports = AppProvider
