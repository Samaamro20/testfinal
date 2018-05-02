var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');


var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'0599050371',
	database:'lands'
});

connection.connect();
connection.query('select * from landmarks',function(err,rows,fields){
	if (!err) {
		console.log("LandMarks",rows);
		console.log("Fields",fields);
	}
	else
		console.log("Error" ,err);
});
app.get('/',function(req,res){
	res.send('Sama Amro');
});
/// get All Land MaRKS
app.get('/landmarks',function(req,res){
	connection.query('select * from landmarks ',function(err,result){
	if (!err) {
		res.send(result);
	}
	else
		console.log("Error" ,err);
});
});

////////////Route Handeler insert LandMarks 
app.post('/addLandMarks',function(req,res){
	connection.query('insert into landmarks set ? ',req.body,function(err,result){
		if (!err)
			res.send("Record Save Successfuly")
		else
			console.log("Error" ,err);
	});
});
/////////////// Diff Way To insert 
app.post('/addlandmark',function(req,res){
	var name=req.body.name;
	var country=req.body.country;
	var contenent=req.body.contenent;
	var visitors=req.body.visitors;

	var sql="Insert into landmarks (name,country,contenent,visitors) VALUES ('"+name+"','"+country+"','"+contenent+"','"+visitors+"')";
	connection.query(sql,function(err, result)      
{                                                      
  if(!err)
    res.send("Done");
  else
    console.log("Error",err);
});
});

//////Get Most Visitors
app.get('/landmark/Mostvisitors',function(req,res){
  var sql = "Select name from landmarks where visitors = (select max(visitors) from landmarks)";
  connection.query(sql,function(err, result)      
{                                                      
  if(!err)
    res.send(result);
  else
    console.log("Error",err);
});
});
//////////////////Delete From Land MArk  nooooooooooooooooooooooooo
app.get('/landmarks/delete/:id',function(req, res){ 
  var id=req.params.id;
  var sql='DELETE FROM landmarks WHERE id=?';
  connection.query(sql,id,req.body,function(err,result)
{
  if(!err)
    res.send('Done delete');
  else
    console.log("Error",err);
  });
});
////////////Get All Land Marks In Asia 
app.get('/landmarks/contenent/:contenent',function(req, res){ 
  var contenent=req.params.contenent;
  connection.query('select * from landmarks where contenent = ?',contenent,function(err,result){

if(!err)
    res.send(result);
  else
    console.log("Error",err);
  });
});

////////////Get All Land Marks In France
app.get('/landmarks/country/:country',function(req, res){ 
  var country=req.params.country;
  connection.query('select * from landmarks where country = ?',country,function(err,result){

if(!err)
    res.send(result);
  else
    console.log("Error",err);
  });
});
/// Search By Name 
app.get('/LandMarksName/:name',function(req,res){
	var name =req.params.name;
	connection.query('select * from landmarks where name=?',name,function(err,result){
	if (!err) {
		res.send(result);
	}
	else
		console.log("Error" ,err);
});
});
//////////////update
app.post('/updatelandmark',function(req,res){
  var name=req.body.name;
  var country=req.body.country;
  var contenent=req.body.contenent;
  var visitors=req.body.visitors;

  var sql="UPDATE landmarks SET name = "+name+", country = "+country+",contenent = "+contenent+",visitors = "+visitors+""
  connection.query(sql,function(err, result)      
{                                                      
  if(!err)
    res.send("Done update landmark");
  else
    console.log("Error",err);
});
});

app.listen(3009,function(){
	console.log("App Is listening on port 3009")
});