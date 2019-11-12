'use strict'

const ServiceProvider = use('@core/ServiceProvider')

class CoreProvider extends ServiceProvider {

  boot() {
    const View = use('View')
    View.defineGlobal()

    const Route = use('Route')
    Route.loadRoutes()

    const Http = use('Http')
    Http.createServer(Route)
  }

  register() {
    this.app.register('Env', (app) => {
      return new (require('../Env'))(app.root)
    })

    this.app.register('Helper', () => new (require('../Helper'))(this.app.root))

    this.app.register('Route', () => new (require('../Route'))())
    this.app.register('Http', () => new (require('../Http'))())
    this.app.register('View', () => new (require('../View'))())

  }


}

module.exports = CoreProvider
