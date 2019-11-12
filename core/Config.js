'use strick'

class Config {

  /**
   * @param {string} root - Root of application
   * @returns {undefined}
   */
  constructor(root) {
    this.root = root
    this.initConfig()
  }


  initConfig() {
    this.config = {
      name: 'laracojs'
    }
  }

  
  /**
   * Get Config
   *
   * @param {string} name - Name of config
   * @returns {undefined}
   */
  get(name) {
    return this.config[name] ? this.config[name] : null
  }

  /**
   * Set conifig
   *
   * @param {Object} config
   * @returns {undefined}
   */
  set(config) {
    this.config = {...this.config, ...config}
  }

  /**
   * Return all config
   *
   * @returns {Object}
   */
  all() {
    return this.config
  }
}
