const express = require('express');
const postsDb = require('./posts/postDb')
const usersDb = require('./users/userDb')

// const { logger, validateUserId, validatePost } = require('./middleware')
const { validateUserId, validateUser, validatePost, logger } = require('./middleware/index')

const server = express();

server.use(express.json())
server.use(logger())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//-----------user end points
server.get('/api/users', (req, res) => {
  usersDb.get()
    .then(response => {
      res.status(200).json({ data: response })
    })
    .catch(err => {
      console.log(err)
    })
})

server.post('/api/users', (req, res) => {
  usersDb.insert(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem trying to add new user' })
    })
})

server.get('/api/users/:id', validateUserId, (req, res) => {
  usersDb.getById(req.params.id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
    })
})

server.get('/api/users/:id/posts', validateUserId, (req, res) => {
  usersDb.getUserPosts(req.params.id)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(error => {
      res.status(500).json({ message: 'error, could not retrieve user at this time' })
    })
})

//returns 0 if no match by id
server.put('/api/users/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id
  usersDb.update(id, req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
    })
})

server.delete('/api/users/:id', validateUserId, (req, res) => {
  usersDb.remove(req.params.id)
    .then(response => {
      res.status(201).json({ message: 'successfully deleted user' })
    })
    .catch(error => {
      res.status(500).json({ message: 'there was a problem deleting user' })
    })
})


//posts endpoints--------------------------------------

server.get('/api/posts', (req, res) => {
  postsDb.get()
    .then(response => {
      res.status(200).json({ data: response })
    })
    .catch(err => {
      console.log(err)
    })
})


server.get('/api/posts/:id', (req, res) => {
  postsDb.getById(req.params.id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json({ message: 'there was an error retrieving the post' })
    })
})

server.post('/api/posts', validatePost, (req, res) => {
  console.log(req.body)
  postsDb.insert(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem trying to add post' })
    })
})


//returns 0 if no post was found by id
server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id
  postsDb.update(id, req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
    })
})


server.delete('/api/posts/:id', (req, res) => {
  postsDb.remove(req.params.id)
    .then(response => {
      res.status(201).json({ message: 'successfully deleted post' })
    })
    .catch(error => {
      res.status(500).json({ message: 'there was a problem deleting the post' })
    })
})


module.exports = server;
