const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    amtsave: {
      type:Number,
      required:true
    },
    brand: String,
    breadcrumbs:String,
    country:String,
    desc:String,
    discount:String,
    domain:String,
    image:String,
    insertedon: String,
    list_price:String,
    model:String,
    name:String
});

module.exports = mongoose.model('Cart', CartSchema);
