var express	=	require('express'),
	app		=	express(),
	mysql	=	require('mysql'),
	bodyParser=require("body-parser"),
	connection	= mysql.createConnection({
		host:"localhost",
		user:'root',
		password:'123456',
		database:'survey'
	});
	connection.connect(function(err){
		if (err){
			console.log(err);
		}else{
			console.log('connected with mysql');
		}
	});
	app.use(bodyParser());
	app.use( bodyParser.json() ); 
	app.use(bodyParser.urlencoded({    
                    extended: true
                })); 
var userid='528647';
var surveyId='18';
var isauthenticated = false;
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});
	app.use('/node_modules',express.static(_dirname='/node_modules'));

	app.get('/',function(req,res){
		if(isauthenticated){
			res.json('success');
		}else{
			res.json('login failed');
		};
	});

	app.get('/auth',function(req,res){
		var q="select id,name,phone_number as phone,role from user where id='528647'";
		connection.query(q,function(err,result){
			if (err) throw err
			    // console.log(result);
				res.json(result);
		});
	});
	app.post('/post',function(req,res){
		if(isauthenticated){

		}else{
			res.json('redirect');
		}
	});

	app.post('/createSurvey',function(req,res){
		 // console.log(req.body);
		// var q="Insert INTO survey ('author_id','survey_name','description','start_date','end_date','max_replies') values (?,?,?,?,?,?)";
		var q="Insert INTO survey set ?";
		var post={
			'author_id': userid,
			'survey_name': req.body.surveyName,
			'start_date' : new Date(req.body.startDate),
			'end_date': new Date(req.body.endDate),
			'description':req.body.category,
			'max_replies': req.body.max_replies
		};
		// console.log(req.body.category);
		connection.query(q,[post],function(err,success){
			if (err) {
				console.log(err)
			}else{
				surveyId = success.insertId;
				res.json('success');
			}
		});

	});
	app.post('/addQuestion',function(req,res){
		console.log(req.body);
		var 
		if(req.body.answerType=='radio'){
			var post= {
				'survey_id':surveyId,
				'question' : req.body.question,
				'question_type': req.body.answerType,
				'options': req.body.answer
			};
			connection.query(q,[post],function(err,success){})
		}else{
			var post={
				'survey_id': surveyId,
				'question' : req.body.question,
				'question_type': req.body.answerType
			};
			connection.query(q,[post],function(err,success){})
		};
	});





	app.listen('3000',function(err){
		if (err) throw err
			console.log('port listening on 3000');
	}); 