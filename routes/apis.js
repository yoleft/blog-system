require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  if((!req.body.user) || (!req.body.passwd)){
    res.redirect('/users/register');
    return;
  }
  req.session.name = req.body.user;
  req.session.passwd = req.body.passwd;
  req.session.logined = true;
  res.redirect('/');
});

router.post('/add', function(req, res, next){
  if(!req.session.name){
    res.redirect('/');
    return;
  }
  new Blog({
    Username: req.session.name,
    Article: req.body.Content,
    Title: req.body.Heading,
    CreateDate: Date.now()
  }).save(function(err){
    if(err){
      console.log('fail to save to DB');
      return;
    }
    console.log('save to db');
  });
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next){
  Blog.remove({_id: req.params.id}, function(err){
    if(err){
      console.log('fail to delete article');
    }else{
      console.log('Done');
    }
  });
  res.redirect('/users/profile');
});

router.post('/update/:id', function(req, res, next){
  if(!req.params.id){
    res.redirect('/');
    return;
  }
  Blog.update({_id: req.params.id}, {Title: req.body.Heading, Article: req.body.Content}, function(err){
    if(err){
      console.log('fail to update article');
    }else{
      console.log('done');
    }
  })
  res.redirect('/');
});

router.post('/comment/:id', function(req, res, next){
  if(!req.params.id){
    res.redirect('/');
    return;
  }
  new Comment({
    Visitor: req.body.Visitor,
    Comment: req.body.Comment,
    MessageID: req.params.id,
    CreateDate: Date.now()
  }).save(function(err){
    if(err){
      console.log('fail to save to db');
    }else{
      console.log('save to db');
    }
  });
  res.redirect('/users/message/' + req.params.id);
});

module.exports = router;