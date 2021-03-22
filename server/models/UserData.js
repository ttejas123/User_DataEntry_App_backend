const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
	fullName:{
		type:String,
	    required: true
	},
	mobile:{
		type:Number,
	    required: true
	},
	email: {
		type:String,
		required: true,
	    unique : true,
	},
	address:{
		type:String,
	    required: true,
	},
});


const User = new mongoose.model("userDatas", userDataSchema);
module.exports = User;