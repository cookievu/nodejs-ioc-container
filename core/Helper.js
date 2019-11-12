'use strict' 

class Helper {

  constructor(root) {
    this.root = root
  }

  getRootPath() {
    return this.root
  }

  getPublicPath() {
    return this.getPath('public')
  }

  getStoragePath() {
    return this.getPath('storage')
  }

  getPath(...args) {
    return this.root + args.join('/')
  }

}

module.exports = Helper
