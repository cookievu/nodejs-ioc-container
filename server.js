const Container = require('./core/Container')

new Container(__dirname)
  .start()
  .then(app => {
    console.log(app)

    const {makeSlug} = use('@core/String')

    console.log('String Lib: ', makeSlug('cookie vu'))
  })
