const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main()
.then((res)=>{
    console.log("connection success");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"67cfe9ec7a574c6fe41d5985"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();