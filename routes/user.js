const express= require("express");
const router= express.Router();
const User = require("../models/user.js");
const wrapAsyn = require("../utils/wrapAsyn");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controller/user.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post( wrapAsyn( userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate(
      "local",{
          failureRedirect:"/login",
          failureFlash:true,
      }),
      userController.login
  );


//logout

router.get("/logout",userController.logout);

module.exports=router;