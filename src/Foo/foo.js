const _ = require('lodash')

function run() {    
  const current_page = 1
  const elementCount = 4
  const last_page = 12

  const range = Math.ceil(current_page / elementCount)

  const min = (range * elementCount) - (elementCount - 1)
  let max = (range * elementCount)
  if (max >= last_page) {
    max = last_page
  }
  const leftArrow = min > 1
  const rifhtArrow = last_page > max

  console.log('min', min, 'max', max)
  console.log('leftArrow', leftArrow, 'rifhtArrow', rifhtArrow)
  console.log(_.range(min, max))
}

run()
