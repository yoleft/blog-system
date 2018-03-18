require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.render('users/register', {title: 'Register'});
});

router.get('/signin', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.render('users/login');
});

router.get('/signout', function(req, res, next) {
  req.session.logined = false;
  res.redirect('/');
  res.end();
});

router.get('/forget', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.render('users/forget');
});

router.get('/profile', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  Blog.find({ Username: req.session.name }, function(err, blogs, count){
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    res.render('users/profile', {
      title : 'Profile',
      blogs: blogs
    });
  });
});

router.get('/add_article', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.render('users/add_article');
});

router.get('/modify/:id', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.locals.messageID = req.params.id;
  Blog.find({_id: req.params.id}, function(err, blogs, count){
    res.render('users/modify',{
      blogs: blogs
    });
  });
});

router.get('/message/:id', function(req, res, next) {
  res.locals.username = req.session.name;
  res.locals.authenticated = req.session.logined;
  res.locals.messageID = req.params.id;
  Blog.find({_id: req.params.id}, function(err, blogs, count){
    Comment.find({MessageID: req.params.id}, function(err, comments, count){
      res.render('users/message', {
        title: 'Blog System',
        blogs: blogs,
        comments: comments
      })
    })
  });
});

module.exports = router;
