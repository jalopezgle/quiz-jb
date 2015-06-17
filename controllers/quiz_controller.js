var models = require ('../models/models.js');

/*exports.question = function (req, res){
	models.Quiz.findAll().then(function (quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta});
	})
	//res.render('quizes/question',{pregunta:'Capital de ITALIA'});
};*/

exports.load = function (req, res, next, quizId){
	models.Quiz.findById(quizId).then (
		function(quiz){
			if (quiz){
				 req.quiz = quiz;
				 next();
			} else { next (new Error ('NO existe quizId=' + quizId));}
		}).catch(function(error){next (error);})
};



//No olvide delimitar el string contenido en search con el comodín % antes y después y cambie también los espacios en blanco por %. 
//De esta forma, si busca "uno dos" ("%uno%dos%"), mostrará todas las preguntas que tengan "uno" seguido de "dos", 
//independientemente de lo que haya entre "uno" y "dos".

/*exports.index = function (req,res){
	var search;
	search = req.query.search;
	if (search) {
		search = search.replace(/\s/g,"%");
		search = "'%"+search+"%'";

	    models.Quiz.findAll({where: ["pregunta like ?", search]}, {order: 'pregunta ASC'}  ).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes}); 
    } else {
	   models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	}


	}).catch(function(error) {next (error);})
};

  models.Quiz.findAll({where: ["pregunta like ?", search]}, {order: 'pregunta ASC'}  ).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes}); 
*/


exports.index = function (req,res){
	   var search; 
	   search = req.query.search;
	   if (search) {
		search = search.replace(/\s/g,"%");
		search = "%"+search+"%";
		//search = '%Italia%';
		models.Quiz.findAll({where: ["pregunta like ?", search] }).then(function(quizes){
		quizes.sort();
		//quizes.reverse();
		res.render('quizes/index.ejs', {quizes: quizes});
	    }).catch(function(error) {next (error);})
	    return;
	   }


      	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	    }).catch(function(error) {next (error);})
};
/*
exports.show = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: quiz});
	})
};
*/

exports.show = function(req,res){
	
		res.render('quizes/show',{quiz: req.quiz});
	
};

///////
/*
exports.answer = function (req, res ){s
	models.Quiz.findAll().then(function (quiz) {
	//if (req.query.respuesta==='Roma'){
	if (req.query.respuesta===quiz[0].respuesta){	
		res.render('quizes/answer',{respuesta:'Correcto'});
	} else {
		res.render('quizes/answer',{respuesta: 'Incorrecto'});
	}
	})
};
*/

/*
exports.answer = function (req,res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{quiz:quiz,respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{quiz:quiz,respuesta:'Incorrecto'});
		}
	})
};
*/

exports.answer = function (req,res) {
	var resultado = 'Incorrecto';

		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'CCorrecto';
		} 
		res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
	
};