const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('./users');
const postModel = require('./posts');
const upload = require('./multer');
const fs = require('fs');

const localStrategy = require("passport-local").Strategy;
require('./google-oauth');
require('./facebook-oauth');

passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

router.get('/', function (req, res, next) {
  
  res.render('register',{isLogin: req.isAuthenticated()});
});

router.get('/feed',isLogedIn, async function (req, res) {

  // gather all post to one variable 
  const posts = await postModel.find({}).populate('user');
  // google auth / facebook auth login 
  const user = await userModel.findOne({
    username: req.cookies.username
  })
  
  if (user) {
    console.log(user);
    res.render('feed',{user: user,posts: posts,message: req.flash('success'),isLogin:req.isAuthenticated()});
}
 else {
  
  // local login
  console.log(req.user);

  let localUser = await userModel.findOne({
    username: req.user.username
  })
  
  
  if(localUser){
    // set cookie for future search
    res.cookie('username', req.user.username);
    console.log(req.cookies.username);

    res.render('feed',{user: localUser,posts: posts,message: req.flash('success'),isLogin:req.isAuthenticated()});
    console.log(localUser);
  }
  else{
    res.status(404).send("user not found");
  }
}

});

// google auth
router.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/feed',
    failureRedirect: '/login',
    failureFlash: true
  }));

  //facebook auth 
  router.get('/auth/facebook',passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/feed',
    failureRedirect: '/login',
    failureFlash: true
  }));




router.post('/register', function (req, res) {
  const { username, email, fullname, birthdate } = req.body;
  const userData = new userModel({ username, email, fullname, birthdate });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/feed");
      });
    })
    .catch(function (err) {
      console.error(err);
      res.redirect('/');
    });
});

router.get('/login',function(req,res){
 console.log(req.isAuthenticated());
 res.render('login',{ error: req.flash("error"),isLogin:req.isAuthenticated()});
});

router.get('/profile',isLogedIn,async function(req,res){
 
  const user = await userModel.findOne({
    username: req.cookies.username
  })

  const userPosts = await postModel.find({user: user._id});
  console.log(req.cookies.username);
  res.render('profile',{user: user,posts: userPosts,isLogin:req.isAuthenticated()});
  

});
 
router.post('/fileupload',isLogedIn,upload.single('image'),async function(req,res){

  const user = await userModel.findOne({
    username: req.cookies.username
  })

  if(user){
    // deleting image if exists already 
    if(user.profileImage){
      deleteFile('./public/images/uploads/'+user.profileImage);
    }
  
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect('/profile');
  }


});

router.get('/add-post',isLogedIn,upload.single('file'),async function(req,res){
  const user = await userModel.findOne({
    username: req.cookies.username
  })
  res.render('add-post',{user: user,isLogin:req.isAuthenticated()});
});

router.post('/add-post',isLogedIn,upload.single('file'),async function(req,res){

  const user = await userModel.findOne({
    username: req.cookies.username
  })

  const postData = new postModel({
    postFile: req.file.filename,
    title: req.body.title,
    description: req.body.description,
    user: user._id 
  })

  await postData.save();


  // setting messsage for successfull post upload
  req.flash('success', 'Post uploaded successfully');
  res.redirect('/feed');
  
});


router.get('/postInfo/:id', async function (req, res) {
  const user = await userModel.findOne({
    username: req.cookies.username
  })

  const post = await postModel.findById(req.params.id)
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user' 
    }
  });

  const posts = await postModel.find({}).populate('user');

  res.render('postInfo',{user:user, postCurrent: post, posts : posts,isLogin:req.isAuthenticated(),postId:req.params.id});

})

router.post('/postInfo/comment/:id',isLogedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.cookies.username
  })

  const post = await postModel.findById(req.params.id);
  const newComment = {
    user: user._id,
    comment: req.body.comment 
  }
  post.comments.push(newComment);
  await post.save();
  
  res.redirect('/postInfo/'+req.params.id);

})




router.post('/login', passport.authenticate("local", {
  successRedirect:'/feed',
  failureRedirect: '/login',
  failureFlash: true
}),function (req, res) {

});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }

    //destroying all cookies object
    res.cookie('username', null);
    res.redirect('/');
  });
});

function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}


function deleteFile(file){
  fs.unlink(file, function (err) {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    }
    // if no error, file has been deleted successfully
    console.log(file,'File deleted!');
  });
}

module.exports = router;
