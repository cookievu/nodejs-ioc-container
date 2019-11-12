'use strict'

class View {

  constructor() {
    this.handlebars = require('handlebars')
  }

  defineGlobal() {
    global['view'] = this.render.bind(this)
  }


  /**
   * Render html
   *
   * @param {strict} view - View Path
   * @param {Object} params - Params bind to view
   * @returns {undefined}
   */
  render(view, params = null) {
    const template = this.handlebars.compile(view)
    if (params) {
      return template(params)
    }
    return template()
  }

}

module.exports = View
