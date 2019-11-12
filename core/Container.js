'use strick'

const glob = require('glob')
const Config = require('./Config')

class Container {

  /**
   * @param {string} root - Root of application
   * @returns {undefined}
   */
  constructor(root) {
    this.root = root

    this.services = {} // store all services for this application

    this.aliases = {
      '@core': 'core'
    }

    this.agnoreAliases = [
      'core/Config',
      'core/Container'
    ]

    this.defineGlobal()
  }


  /**
   * Define global function/variables
   *
   * @returns {undefined}
   */

  defineGlobal() {
    global['use'] = this.getService.bind(this)
  }

  /**
   * Register a service
   *
   * @param {string} name - Unique name of service
   * @param {function} callback - Function use register service
   * @returns {this}
   */
  register(name, callback) {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this.services.hasOwnProperty(name)) {
          this.services[name] = callback(this)
        }
        return this.services[name]
      },
      configurable: false,
      enumerable: true
    })
    return this
  }

  /**
   * Match alias
   *
   * @param {string} - Alias
   * @param {string} - Origin path
   * @returns {Promise}
   */
  addAlias(alias, path) {
    return new Promise(async (resolve, reject) => {
      const aliasPath = this.getPath(path)
      glob(aliasPath + "/**/*.js", {}, (err, files) => {
        if (err) {
          return reject(err)
        }
        files.map(file => {
          if (!this.isAliasAgnore(file)) {
            const name = alias + file.replace(aliasPath, '').split('.').slice(0, -1).join('.')
            this.register(name, () => require(file))
          }
        })

        delete(this.agnoreAliases)
        resolve(true)
      })
    })
  }


  /**
   * Check path include agnoreAliases
   *
   * @param {string} path - File path
   * @returns {boolean}
   */
  isAliasAgnore(path) {
    const length = this.agnoreAliases ? this.agnoreAliases.length : 0
    for (let i = 0; i < length; i++) {
      if (path.includes(this.agnoreAliases[i])) {
        return true
      }
    }
    return false
  }


  /**
   * Get service has register
   *
   * @param {string} name - Unique name of service
   * @returns {Object}
   */
  getService(name) {
    if (this[name]) {
      return this[name]
    }

    try {
      return require(name)
    } catch (e) {
    }

    throw new Error(`The package {${name}} is not found`)
  }

  /**
   * Get path on application
   *
   * @param {string} path
   * @returns {string}
   */
  getPath(...args) {
    return this.root + '/' + args.join('/')
  }

  /**
   * Pipe
   *
   * @param {function} callback - Function handler
   * @returns {this}
   */
  pipe(callback) {
    return callback(this)
  }

  /**
   * Init config for application
   *
   * @returns {this}
   */
  withConfig() {
    this.register('Config', (app) => {
      return new Config(app.root)
    })
    return this
  }

  /**
   * Register providers
   *
   * @returns {this}
   */
  withProviders() {
    const providers = require(this.getPath('start', 'app')).providers
    // Register Service
    const serviceProviders = []
    providers.map(provider => {
      const ClassProvider = require(this.getPath('providers', provider))
      const registerProvider = new ClassProvider(this)
      serviceProviders.push(registerProvider)
      registerProvider.register()
    })

    // Boot Service
    serviceProviders.map(provider => provider.boot())

    return this
  }

  /**
   * Init all aliases
   * @returns {Promise<this>}
   */
  async withAliases() {
    let aliases = require(this.getPath('start/app')).aliases
    this.aliases = {...this.aliases, ...aliases}

    for (const key in this.aliases) {
      await this.addAlias(key, this.aliases[key])
    }

    return this
  }

  /**
   *  Start server
   *
   * @returns {this}
   */
  async start() {
    this.withConfig()
    await this.withAliases()
    this.withProviders()

    return this
  }

}

module.exports = Container
