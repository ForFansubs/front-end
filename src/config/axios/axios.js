if (process.env.NODE_ENV === 'production') {
    module.exports = require('./axios-prod')
} else {
    module.exports = require('./axios-dev')
}