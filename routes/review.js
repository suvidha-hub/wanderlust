const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsyn=require("../utils/wrapAsyn.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{isLoggedIn,isowner,isreviewauthor} =require("../middleware.js");
const reviewController=require("../controller/review.js")


const validateReview =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        
        throw new ExpressError(400, error);
    }else{
        next();
    }
};



// review (post) route

router.post("/",isLoggedIn,validateReview, wrapAsyn(reviewController.createReview));

//review (delete) route
router.delete("/:reviewId",isLoggedIn,isreviewauthor,wrapAsyn(reviewController.destroyReview));

module.exports=router;