/**
 * Generate slug
 *
 * @param string
 * @returns {string}
 */
function makeSlug(string) {
  return string.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
}


module.exports = {
  makeSlug
}
