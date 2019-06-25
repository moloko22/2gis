const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/mainGIS', ['coordinates', 'users']);

//get all tasks
router.get('/map', function(req, res, next){
  db.coordinates.find(function(err, tasks){
    if(err){
      res.send(err)
    }else{
      res.json(tasks);
    }
  })
});
//save task
router.post('/task', function(req, res, next){
  let task = req.body;
  if(!task.title || (task.isDone + '')){
    res.status(400);
    res.json({
      'error': 'Bad Data',
    })
  }else{
    db.coordinates.save(task, function(err, task){
      if(err){
        res.send(err);
      }else{
        res.json(task);
      }
    })
  }
});

router.post('/register', function(req, res, next){
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let newUser = {
    name: name,
    email: email,
    password: password
  };
  db.users.findOne({email: newUser.email}, function(err, user){
    if(err){
      return res.status(500).send("Error")
    }
    if(user){
      return res.status(500).send('User with this email already exist');
    }
    if(!user){
      db.users.save(newUser, function(err, user){
        if(err){
          return res.status(500).send('Error')
        }else{
          res.json(user);
          return res.status(200).send('User registered successful')
        }
      })
    }
});

router.post('/login', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let user = {
    email: email,
    password: password
  };
  db.users.findOne({email: user.email, password: user.password}, function (err, user) {
      if (err) {
        return res.status(500).send("Error");
      }
      if (!user) {
        return res.status(404).send("Wrong email or password");
      }
      if (user) {
        return res.status(200).send("Good job ");
      }
    })
  })
});
module.exports = router;
