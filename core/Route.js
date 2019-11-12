'use strict'

const Helper = use('Helper')
const Http = use('Http')
const Request = use('@core/Http/Request')
const Response = use('@core/Http/Response')

class Route {

  constructor() {
    this.namespace = 'App/Controllers/Http'
    this.routes = []

    this.webPath = Helper.getPath('routes', 'web')
    this.apiPath = Helper.getPath('routes', 'api')
  }
  get(path, action) {
    return this.addRoute('GET', path, action)
  }

  post() {

  }

  put() {

  }

  delete() {

  }

  middleware() {

  }

  mame() {

  }

  prefix() {

  }

  group() {

  }

  addRoute(method, path, action) {
    this.routes.push({
      method,
      path,
      action
    })
  }

  getAction(action) {
    if (typeof action === 'function') {
      return action
    }
    return action
  }

  loadRoutes() {
    require(this.webPath)
    require(this.apiPath)
  }

  handler(req, res) {
    const request = new Request(req)
    const resonse = new Response(res)
    res.end()
  }
}

module.exports = Route
