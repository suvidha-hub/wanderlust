const Listing =require("./models/listing");
const Review =require("./models/review");

module.exports . isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to create a listing");
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isowner= async(req,res,next)=>{
    let {id} = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","you don't have access");
        return  res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isreviewauthor= async(req,res,next)=>{
    let {reviewId,id} = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","you don't have access");
        return  res.redirect(`/listings/${id}`);
    }
    next();
};