'use strict'

const Env = use('Env')
const http = require('http')

class Http {

  constructor() {
    this.host = Env.get('HOST')
    this.port = Env.get('PORT')
  }

  createServer(route) {
    this.server = http.createServer((req, res) => route.handler(req, res))
  }

  fireServer() {
    this.server.listen(this.port, this.host, (err) => {
      console.log(`Server running at http://${this.host}:${this.port}/`);
    })
  }

}

module.exports = Http
