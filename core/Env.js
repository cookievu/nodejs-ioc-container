'use strict'

class Env {

  constructor(root) {
    this.root = root

    require('dotenv').config({
      path: this.root + '/.env'
    })
  }

  /**
   * Get ENV value
   *
   * @param {strict} name - Env key
   * @param {any} defaultValue - Default value if key not exsits
   * @returns {any}
   */
  get(name, defaultValue = null) {
    if (process.env[name]) {
      return process.env[name]
    }
    return defaultValue
  }

}

module.exports = Env
