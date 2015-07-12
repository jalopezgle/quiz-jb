var path = require ('path');
var util = require('util');
var DATABASE_URL = "postgres://zdvlemedrspqeq:V-JPfw8aFoRrmNC28v4AVp2vgS@ec2-54-83-46-91.compute-1.amazonaws.com:5432/ddgqicdfani46a"
//DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
//var 
DATABASE_URL = "sqlite://:@:/"
 process.env.DATABASE_URL = DATABASE_URL;
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require ('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

//var sequelize = new Sequelize (null, null, null,
//							{dialect: "sqlite", storage: "quiz.sqlite"});

var Quiz = sequelize.import (path.join(__dirname, 'quiz'));

var comment_path = path.join (__dirname,'comment');
var Comment = sequelize.import (comment_path);
Comment.belongsTo (Quiz);
Quiz.hasMany (Comment);


Quiz.avgCommentCount = function(callback, cerror){    
    sequelize.query("SELECT ROUND(AVG(c),2) as c FROM (SELECT a.id, COUNT(DISTINCT b.id) c FROM \"Quizzes\" a LEFT JOIN \"Comments\" b ON a.id = b.\"QuizId\"  GROUP BY a.id ) a")
    .then(function(c){ callback(c);})
    .catch(function(error){cerror(error)});
};

Quiz.noCommentCount = function(callback, cerror){    
    sequelize.query("SELECT COUNT(*) as c FROM \"Quizzes\" a WHERE NOT EXISTS (SELECT 1 FROM \"Comments\" b WHERE a.id = b.\"QuizId\") ")
    .then(function(c){ callback(c);})
    .catch(function(error){cerror(error)});
};

Quiz.commentCount = function(callback, cerror){    
    sequelize.query("SELECT COUNT(*) as c FROM \"Quizzes\" a WHERE EXISTS (SELECT 1 FROM \"Comments\" b WHERE a.id = b.\"QuizId\") ")
    .then(function(c){ callback(c);})
    .catch(function(error){cerror(error)});
};


var query = 'SELECT * FROM `Quizzes` ' +
            'LEFT JOIN `Comments` ON `Quizzes`.`id` = `Comments`.`QuizId` ' +
            'WHERE  1=1';
//var escapedName = sequelize.constructor.Utils.escape(last_name);
var escapedName ="";
queryWithParams = util.format(query, escapedName);

Quiz.commentCount2 = function(callback, cerror){  
sequelize.query(queryWithParams, Quiz)
  .error(function(err) {
    // error callback
     cerror = err;
  })
  .success(function(quizzes) {
    quizzes.getComment(); // does not trigger a new query
  });
};


exports.Quiz = Quiz;
exports.Comment = Comment;




sequelize.sync().then(function (){
	  Quiz.count().then(function (count){
	  	 if (count===0){
	  	 	Quiz.create({
	  	 		pregunta: 'Capital de Italia',
	  	 		respuesta: 'Roma',
	  	 		tema: 'humanidades'
	  	 	});
	  	Quiz.create({
	  	 		pregunta: 'Capital de Portugal',
	  	 		respuesta: 'Lisboa',
	  	 		tema: 'humanidades'
	  	 	})	 	
	  	 	.then(function(){console.log('Base de datos inicializada')});
	  	 };
	  });
});