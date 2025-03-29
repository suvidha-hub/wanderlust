const Listing = require("../models/listing.js");

module.exports.index=async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listing/index.ejs",{allListings});
};

module.exports.delete=async(req,res)=>{
    let {id}=req.params;
    const deletedListing= await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};

module.exports.showListings=async(req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id).
    populate({ path:"reviews",
    populate:
    {path:
        "author",

    },
   })
    .populate("owner");
    if(!listing){
        req.flash("error","You requested listing does not exist");
        res.redirect("/listings");
    }
    
    res.render("listing/show.ejs",{listing});
};

module.exports.new=(req,res)=>{
    res.render("listing/new.ejs");
};

module.exports.create=async(req,res,next)=>{
     let url=req.file.path;
     let filename=req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","successfully added new listing");
     res.redirect("/listings");
};

module.exports.edit=async(req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","You requested listing does not exist");
        res.redirect("/listings");
    }
   let originalImgUrl=listing.image.url;
   originalImgUrl=originalImgUrl.replace("/upload","/upload/w_250");

    res.render("listing/edit.ejs",{listing,originalImgUrl});
}

module.exports.update=async(req,res)=>{   
    let {id} = req.params;
     let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
       await listing.save();
    }


    req.flash("success","successfully updated listing");
    res.redirect(`/listings/${id}`);
};