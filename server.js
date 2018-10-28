const express=require('express');
const app=express();
app.use(express.static('./public'));
const PORT=process.env.PORT||7000;
app.listen(PORT,function(){
	console.log("Running on 7000");
})