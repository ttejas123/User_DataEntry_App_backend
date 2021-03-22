const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
//provide schema for dataBase
const userModel = require("./models/UserData");

app.use(express.json());
app.use(cors());//help to communicate with api which we build eg. all react code is like a api for us now

mongoose.connect("mongodb+srv://Tejas_Thakare:Tejas@123@crud.1kyta.mongodb.net/userCurd?retryWrites=true&w=majority",{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
}).then(()=>{
	console.log("connected!")
}).catch((err)=>{
	console.log("error occure"+ error);
});

app.get('/', async (req, res)=>{
	res.send("We are here");
})
//insert Data in DataBase
app.post('/insert', async (req, res)=>{
	const fullNameD = req.body.Data.fullName;
	const mobileD = req.body.Data.mobile;
	const emailD = req.body.Data.email;
	const addressD = req.body.Data.address;

	const user = new userModel({
		fullName: fullNameD,
		mobile:mobileD,
		email: emailD,
		address: addressD,
	})
	console.log(user);
	try{
	   await user.save();
	   res.send("Data is inserted");
	}catch(err){
		console.log(err);
	}
})

app.post('/update', async (req, res)=>{
	const updateId = req.body.Data._id;
	console.log(updateId)
	const fullNameD = req.body.Data.fullName;
	const mobileD = req.body.Data.mobile;
	const emailD = req.body.Data.email;
	const addressD = req.body.Data.address;
	try{
	   await userModel.updateOne({_id:`${updateId}`}, {$set: {
	   	fullName: fullNameD,
		mobile:mobileD,
		email: emailD,
		address: addressD,
	   }});
	   res.send("Data is Updated");
	}catch(err){
		console.log(err);
	}
})

//delete Data from dataBase
app.post('/delete', async (req, res)=>{
	const deleteId = req.body.deleteId;
	try{
	   await userModel.deleteMany({_id:deleteId})
	   res.send("Data is Deleted");
	}catch(err){
		console.log(err);
	}
})
//read data from dataBase
app.get('/read', async (req, res)=>{
	userModel.find({}, (err, result)=>{
		if(err){
			res.send(err);
		}
		res.send(result);
	})
})

app.listen(port, ()=>{
	console.log("server is runing on "+port);
})