const user = require('../users/userDb')

function logger() {
    return function (req, res, next) {
        console.log(`Client made a ${req.method} request at ${req.url} at ${new Date().toTimeString()}`)
        next()
    }
}

function validateUserId(req, res, next) {
    user.getById(req.params.id)
        .then(response => {
            if (!response) {
                console.log('user NOT found with that id')
                res.status(404).json({ message: 'user not found' })
            } else {
                console.log("user found")
                next()
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function validateUser(req, res, next) {
    console.log(req.body)
    if (Object.keys(req.body).length === 0) {
        console.log('no body')
        res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.name) {
        console.log('no name field')
        res.status(400).json({ message: 'missing name field' })
    } else {
        console.log('validate user passed,next')
        next()
    }
}

//validate if req.body & req.body.name are included
//cannot add user with same name twice
// function validateUserId(req, res, next) {
//     if (Object.keys(req.body).length === 0) {
//         res.status(400).json({ message: 'missing user data' })
//     } else if (!req.body.name) {
//         res.status(400).json({ message: 'missing name field' })
//     } else {
//         req.user = req.body
//         next()
//     }
// }

function validatePost(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        console.log('missing data completely')
        res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
        console.log('missing text field')
        res.status(400).json({ message: 'missing text field' })
    } else {
        console.log('passed middleware, next')
        next()
    }
}

// module.exports = {
//     logger,
//     validateUserId,
//     validatePost
// }

module.exports = {
    validateUserId,
    validateUser,
    validatePost,
    logger
}