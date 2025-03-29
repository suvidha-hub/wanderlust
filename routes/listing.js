const express= require("express");
const router= express.Router();
const wrapAsyn=require("../utils/wrapAsyn.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const{isLoggedIn,isowner} =require("../middleware.js");
const listingController =require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage })


const validateListing =(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        
        throw new ExpressError(400, error);
    }else{
        next();
    }
};

router
.route("/")
.get(wrapAsyn(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsyn(listingController.create) );


// new route
router.get("/new",isLoggedIn,listingController.new);

router
.route("/:id")
.put(isLoggedIn,isowner,upload.single('listing[image]'),validateListing,
    wrapAsyn(listingController.update))
.get(wrapAsyn(listingController.showListings))
.delete(isLoggedIn,isowner,wrapAsyn(listingController.delete));


//edit route
router.get("/:id/edit",isLoggedIn,isowner,wrapAsyn(listingController.edit));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             









module.exports= router;