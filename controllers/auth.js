const passport = require("passport");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {registerValidation, loginValidation, PasswordValidation} = require('../config/validation')
// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };
const createToken = user => {
  // Sign the JWT
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    "12345645",
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};
exports.getUsers = (req, res) => {
  let email = req.params.email
  User.findOne ({email: email}, function(err, user) {
    console.log(user)})
};
exports.postLogin = (req, res, next) => {
  console.log(req.body)
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  passport.authenticate("local", (err, user, info) => {
 
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400).send("No user found")
   
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = createToken(req.user)
      res.json({
        token:token,
        username:req.user.username,
        id:req.user._id,
        location:req.user.location
      })
      // res.status(200).send(req.user)
      // const {password, ...rest} = user
      // const userInfo = Object.assign({}, {...rest})
      // const token = createToken(userInfo)
      // const decodedToken = jwtDecode(token);
      // const expiresAt = decodedToken.exp
      // req.session.user = userInfo
      // res.json({
      //   message: 'Authentication successful!',
      //   token,
      //   userInfo,
      //   expiresAt
      // })

    });
  })(req, res, next);
};
exports.postChangePassword = async (req, res) => {
  
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(400).send('invalid value')
    }

    if(req.body.newPw.toString().length <6) return res.status(400).send('password must have at least 6 characters')
    bcrypt.compare(req.body.currentPw, user.password, async function (err, isMatch) {
    
      if (err) {
        throw err
      }
      if (!isMatch) res.status(400).send('Password not matched!')
      else {
 // if not error and password matched then we will hash password
          const salt = bcrypt.genSaltSync(10)
          const newPassword = bcrypt.hashSync(req.body.newPw, salt)

          user.set({ password: newPassword})

          await user.save()
          res.status(200).send('Password Changed successfully!')
      }
     
    })

    
  } catch (error) {
    res.send('An error occured')
    console.log(error)
  }

    
  };
  exports.postChangeUsername = async (req, res) => {
    
    
       try {
        const user = await User.findById(req.params.id)
         if (!user) {
          return res.status(400).send('invalid value')
        }
        let newUsername = req.body.newUsername
        console.log(newUsername)
        const usernameExists = await User.findOne({username:newUsername})
        if(usernameExists) 
         return res.status(400).send('Create a unique username')
         
        user.set({ username: newUsername})
        await user.save()
        res.status(200).send('Username Changed successfully!')
       
        //check if username exists
        
       
  } catch (error) {
    res.send('An error occured')
    console.log(error)
  }
    };

// exports.logout = (req, res) => {
//   req.logout(() => {
//     console.log('User has logged out.')
//   })
//   req.session.destroy((err) => {
//     if (err)
//       console.log("Error : Failed to destroy the session during logout.", err);
//     req.user = null;
//     res.redirect("/");
//   });
// };

// exports.getSignup = (req, res) => {
//   console.log(req)
//   if (req.user) {
//     console.log(req.user)
//     // return  res.redirect("http://localhost:3000/dashboard");
//   }
// };

exports.postSignup = async (req, res) => {
  let email = req.body.email
  let username = email.slice(0, email.indexOf("@"))
     //VALIDATION

     const {error} = registerValidation(req.body, req.body.confirm_password)

     if(error) return res.status(400).send(error.details[0].message)
   
       
 
      //check if username exists
      const emailExists = await User.findOne({email:req.body.email})
      const usernameExists = await User.findOne({username:req.body.username})
      if(usernameExists) 
       return res.status(400).send('Create a unique username')
       if(emailExists){
        return res.status(400).send('Email already exists!')
       } 
     
     
     //HASH THE PW
 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
 
      //CREATE USER
     
      let user = new User({
       name:req.body.name,
       username:username, 
       email:email,
        location:"",
       password:hashPassword


   })

            //SAVE USER
     try{
       const savedUser = await user.save()
       res.status(200).send(req.user)
   } catch(err){
       res.status(400).send(err)
   }
};
