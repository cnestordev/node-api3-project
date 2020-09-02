function logger() {
    return function (req, res, next) {
        console.log(`Client made a ${req.method} request at ${req.url} at ${new Date().toTimeString()}`)
        next()
    }
}

//validate if req.body & req.body.name are included
//cannot add user with same name twice
function validateUserId(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing name field' })
    } else {
        req.user = req.body
        next()
    }
}

function validatePost(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing text field' })
    } else {
        req.post = req.body
        next()
    }
}

module.exports = {
    logger,
    validateUserId,
    validatePost
}