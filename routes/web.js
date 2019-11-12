'use strict'

const Route = use('Route')

console.log('Web route')
Route.get('test', ({req, res}) => {
  console.log('test route')
})
