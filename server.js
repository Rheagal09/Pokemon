const express=require('express');
const app=express();
app.use(express.static('./public'));
app.listen(7000,function(){
	console.log("Running on 7000");
})