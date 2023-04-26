const logger = (req, res, next) => {

    console.log(req.method + ' ' + req.path + '   ' + res.statusCode)
    next()
}

module.exports = logger