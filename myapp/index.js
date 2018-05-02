var express=require ('express');
var app=express();
var wiki=require('./wiki');
var mysql=require('mysql');
var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('views engine','pug');


///////////////////// PUG
app.get('/test',function(req,res){
	res.render('test.pug','')
});
////////////////////////////////////////////////////////////////////////////////
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'0599050371',
	database:'landmark'
});

connection.connect();
connection.query('select * from landmarks',function(err,rows,fields){
	if (!err) {
		console.log("landmarks",rows);
		console.log("Fields",fields);
	}
	else
		console.log("Error" ,err);
});
////////////////// index.pug rendering
// app.get('/index',function(req,res){
// 	res.render('index.pug','')
// });
////////////////////////
app.get('/index',function(req,res){
	connection.query('select * from landmarks ',function(err,result){
	if (!err) {
		res.render('index.pug',{title:'landmarks Names',landmarks:result});
	}
});
});
///////////////////// landmark.pug rendering
// app.get('/landmark/:id',function(req,res){
// 	res.render('landmark.pug','')
// });
//////////////////////// Landmarks information by id
app.get('/landmark/:id',function(req,res){
	var id =req.params.id;
	connection.query('select * from landmarks where id=?',id,function(err,result){
	if (!err) {
		res.render('landmark.pug',{title:'landmarks Information',landmarks:result});
	}
});
});
///////////////////// landmarkcountry.pug rendering
// app.get('/landmark/country/:country',function(req,res){
// 	res.render('landmarkcountry.pug','')
// });
/////////////////////////
app.get('/landmark/country/:country',function(req,res){
	var country =req.params.country;
	connection.query('select * from landmarks where country=?',country,function(err,result){
	if (!err) {
		res.render('landmarkcountry.pug',{title:'landmarks country',landmarks:result});
	}
});
});
///////////////////// landmarkcontenent.pug rendering
// app.get('/landmark/:continent',function(req,res){
// 	res.render('landmarkcontinent.pug','')
// });
////////////////////
app.get('/landmark/contenent/:contenent',function(req,res){
	var contenent =req.params.contenent;
	connection.query('select * from landmarks where contenent=?',contenent,function(err,result){
	if (!err) {
		res.render('landmarkcontenent.pug',{title:'landmarks contenent',landmarks:result});
	}
});
});
/////////////////formget
app.get('/landmark/form',function(req,res){
	connection.query('select * from landmarks where contenent=?',contenent,function(err,result){
	if (!err) {
		res.render('form.pug',{title:'landmarks contenent'});
	}
});
});
///////////////////form post
app.post('/landmark/addlandmark',function(req,res){
	connection.query('insert into landmarks set ?',contenent,function(err,result){
	if (!err) {
		res.render('form.pug',{title:'landmarks contenent'});
	}
});
});


//////////////////////////////////////////

app.get('/studentss',function(req,res){
	connection.query('select * from students ',function(err,result){
	if (!err) {
		res.render('index.pug',{title:'Test Page',students:result});
	}
});
});

//////////////////////////////////////Body Parser to use post to send Data 
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
/////////////////////////////////////////
app.get('/',function (req,res) {
	res.send("Hello Buty Girl ^_^ ")
	// if I put here Next Will access it 
});
//this in Wrong will not access to it becu its end point
//will  access it if i put next in in first handeler 
app.get('/',function (req,res) {
	res.send("Hello Buty Girl ^_^ ")
});


app.use('/wiki',wiki);
////////////////////next lec 

app.use(express.static('public'))
app.use(express.static('public2'))
app.use(express.static('css'))
app.use(express.static('js'))

app.get('/user/:id',function(req,res){
	id=req.params.id;
	res.send("Sama Id = " + id);
});

app.get('/student',function(req,res){
	var id=req.query.id;
	res.send("Student ID is " + id);
});

app.post('/adduser',function(req,res){
	var fn=req.body.fn;
	var ln=req.body.ln;
	res.send("Welcome Buty " + fn + ln )
});

//////////////////next lec 3
// app.post('/print',function(req,res){

// 	var name=req.body.name;
// 	var major=req.body.major;
// 	var avg =req.body.avg;

// 	req.send(name + "Student in "+ major + " her Avg : "+avg);
// });
////////////////////
// var connection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'0599050371',
// 	database:'citce'
// });

// connection.connect();
// connection.query('select * from students',function(err,rows,fields){
// 	if (!err) {
// 		console.log("students",rows);
// 		console.log("Fields",fields);
// 	}
// 	else
// 		console.log("Error" ,err);
// });

//////Create Route Handeler
app.get('/student/:id',function(req,res){
	var id =req.params.id;
	connection.query('select * from students where id=?',id,function(err,result){
	if (!err) {
		res.send(result);
	}
	else
		console.log("Error" ,err);
});
});
////////////Route Handeler insert Student 
app.post('/addstudent',function(req,res){
	connection.query('insert into students set ? ',req.body,function(err,result){
		if (!err)
			res.send("Record Save Successfuly")
		else
			console.log("Error" ,err);
	});
});
///Get all Student 
app.get('/students',function(req,res){
	connection.query('select * from students',function(err,result){
	if (!err) {
		res.send(result);
	}
	else
		console.log("Error" ,err);
});
});
/// get student by major 
app.get('/studentmajor/:major',function(req,res){
	var major =req.params.major;
	connection.query('select * from students where major=?',major,function(err,result){
	if (!err) {
		res.send(result);
	}
	else
		console.log("Error" ,err);
});
});
// app.get('student/:id',function(req,res){
// 	connection.query('insert into students (name, major, avg) values ("Safa","CS",99)) ',function(err,rows,fields){
// 	if (!err) {
// 		console.log("students",rows);
// 		console.log("Fields",fields);
// 	}
// 	else
// 		console.log("Error" ,err);
// });
// });

app.listen(3005,function(){
	console.log("App Is listening on port 3005")
});
