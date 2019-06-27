const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/mainGIS', ['coordinates', 'users', 'places']);

//get all tasks
router.get('/getcoordinates', function(req, res, next){
  db.coordinates.find(function(err, task){
    if(err){
      return res.send(err);
    }else{
      return res.json(task)
    }
  });
  db.coordinates.remove({});
});
//save task
router.post('/savecoordinates', function(req, res, next){
    let lat = req.body.lat;
    let lng = req.body.lng;
    db.coordinates.save({lat: lat, lng:lng}, function(err, coordinates){
      if(err){
        return res.send(err);
      }else{
        return res.json(coordinates);
      }
    })
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
         return res.json(user);
        }
      })
    }
});

router.post('/login', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  db.users.findOne({email: email, password: password}, function (err, user) {
      if (err) {
        return res.status(500).send();
      }
      if(user){
        return res.json(user);
      }
      if (!user) {
        return res.status(404).send("Wrong email or password");
      }
    })
  })
});
router.post('/places', function(req, res, next){
  let name = req.body.name;
  db.places.find({name: name}, function(err, list){
    if(err){
      return res.status(500).send()
    }else{
      return res.json(list);
    }
  })
});
module.exports = router;
