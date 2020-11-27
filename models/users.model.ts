const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id?: String,
	country:String,
	created_on: Date,
	username:String,
	password:String,
	email_id: String,
	mob_no: String,
	order_id : Number,
	cart_id : Number,
	sex: String
});

module.exports = mongoose.model('User', UserSchema);
