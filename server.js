const Container = require('./core/Container')

new Container(__dirname)
  .start()
  .then(app => console.log(app))
