const Container = require('./core/Container')

new Container(__dirname)
  .start()
  .then(app => {
    const Http = use('Http')
    Http.fireServer()
  })
