const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/mainGIS', ['coordinates']);

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
module.exports = router;
