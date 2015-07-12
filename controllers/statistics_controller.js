var models = require ('../models/models.js');

//El número de preguntas
//El número de comentarios totales
//El número medio de comentarios por pregunta
//El número de preguntas sin comentarios
//El número de preguntas con comentarios
var statistics =  {
	numpreguntas     : 0,
	comentarios      : 0,
	mediacomentarios : 0.0,
	preguntassincomentarios : 0,
	preguntasconcomentarios : 0,
  control: ""

};






exports.show4 = function(req,res){
  // NOTE: Usar promesas (Promise.all) sería mejor, ya que se podrían
  // lanzar todas las consultas simultáneamente
  models.Quiz.count()
  .then(function (numQuizes) { // número de preguntas
    statistics.numpreguntas = numQuizes;

    return models.Comment.count();
  })
  .then(function (numComments) { // número de comentarios
    statistics.comentarios = numComments;
    if (statistics.numpreguntas > 0) statistics.mediacomentarios = numComments / statistics.numpreguntas;

    return models.Quiz.noCommentCount(
                                function(c){
                                    statistics.preguntassincomentarios = c[0].c;
                                    models.Quiz.commentCount(
                                        function(c){
                                            statistics.preguntasconcomentarios = c[0].c;

                                           res.render('quizes/statistics',{statistics: statistics, errors: []});
                                        },function(err){
                                            next(err);                                        }                                        
                                    );
                                },
                                function(err){
                                    next(err);
                                }                               
                            ); 
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    next();
  });

};



exports.show5 = function(req,res){
 models.Comment.count().then(
                 function(ccount){
                    statistics.comentarios = ccount;                         
                    models.Quiz.avgCommentCount(
                        function(c){
                            statistics.mediacomentarios = c[0].c;
                            models.Quiz.noCommentCount(
                                function(c){
                                    statistics.preguntassincomentarios = c[0].c;
                                    models.Quiz.commentCount(
                                        function(c){
                                            statistics.preguntasconcomentarios = c[0].c;
                                            res.render('quizes/statistics', {statistics: statistics, errors: errors});
                                        },function(err){
                                            next(err);
                                        }                                        
                                    );
                                },
                                function(err){
                                    next(err);
                                }                               
                            );                           
                        }, function(err){
                            next(err);
                        }
                    );                    
                 }
             ).catch(function(error){next(error)});
         };




exports.show = function(req, res, next) {
    var errors = req.session.errors || {};
    req.session.errors = {};
  
    models.Quiz.count().then(
        function(count){
            statistics.numpreguntas = count;
            models.Comment.count().then(
                function(ccount){
                    statistics.comentarios = ccount;                         
                    models.Quiz.avgCommentCount(
                        function(d){
                            var obj = JSON.parse(JSON.stringify(d[0]).replace('[','').replace(']',''));
                 
                            statistics.mediacomentarios = parseFloat(obj.c).toFixed(1);
                            
                            models.Quiz.noCommentCount(
                                function(c){
                                    var obj = JSON.parse(JSON.stringify(c[0]).replace('[','').replace(']',''));
                                    statistics.preguntassincomentarios = obj.c;
                                    models.Quiz.commentCount(
                                        function(c){
                                            var obj = JSON.parse(JSON.stringify(c[0]).replace('[','').replace(']',''));
                                            statistics.preguntasconcomentarios = obj.c;
                                            res.render('quizes/statistics', {statistics: statistics, errors: errors});
                                        },function(err){
                                            next(err);
                                        }                                        
                                    );
                                },
                                function(err){
                                    next(err);
                                }                               
                            );                           
                        }, function(err){
                            next(err);
                        }
                    );                    
                }
            ).catch(function(error){next(error)});
        }
    ).catch(function(error){next(error)}
    ).finally(function(){
    console.log("");
    console.log("---- Finalizan las estadísticas otra version----");
    console.log("");
    console.log(statistics);
    res.render('quizes/statistics', {statistics: statistics, errors: []});
});
    //res.render('stats/stats', {stats: stats, errors: errors});
};




exports.showgood = function (req, res) {
  console.log("");
  console.log("---- Comienzan las estadísticas ----");
  console.log("");

  // NOTE: Usar promesas (Promise.all) sería mejor, ya que se podrían
  // lanzar todas las consultas simultáneamente
  models.Quiz.count()
  .then(function (numQuizes) { // número de preguntas
    statistics.numpreguntas = numQuizes;
    return models.Comment.count();
  })
  .then(function (numComments) { // número de comentarios
    statistics.comentarios = numComments;
    return models.Comment.countUnpublished();
  })
  .then(function (numUnpublished) { // número de comentarios sin publicar
    statistics.preguntassincomentarios = numUnpublished;
    return models.Comment.countCommentedQuizes();
  })
  .then(function (numCommented) { // número de preguntas con comentario
    statistics.preguntasconcomentarios = numCommented;
    res.render('quizes/statistics', {statistics: statistics, errors: errors});
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    console.log("");
    console.log("---- Finalizan las estadísticas ----");
    console.log("");
    console.log(statistics);
    if (statistics.numpreguntas > 0) statistics.mediacomentarios = statistics.comentarios / statistics.numpreguntas;
    res.render('quizes/statistics', {statistics: statistics, errors: []});
  });

};



exports.show3 = function(req,res){
  // NOTE: Usar promesas (Promise.all) sería mejor, ya que se podrían
  // lanzar todas las consultas simultáneamente
  models.Quiz.count()
  .then(function (numQuizes) { // número de preguntas
    statistics.numpreguntas = numQuizes;

    return models.Comment.count();
  })
  .then(function (numComments) { // número de comentarios
    statistics.comentarios = numComments;
    if (statistics.numpreguntas > 0) statistics.mediacomentarios = numComments / statistics.numpreguntas;

    return laschungas();
  })
  .then(function (c) { // número de comentarios sin publicar
    statistics.preguntassincomentarios = c; 

    
    return models.Quiz.commentCount();
  })
  .then(function (c) { // número de preguntas con comentario
    statistics.preguntasconcomentarios = c;
    res.render('quizes/statistics',{statistics: statistics, errors: []});
    return statistics;
  })
  .then(function (result){
     res.render('quizes/statistics',{result: statistics, errors: []});
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    next();
  });


};



var laschungas =        models.Quiz.noCommentCount(
                                function(c){
                                    statistics.preguntassincomentarios = c[0].c;
                                    models.Quiz.commentCount(
                                        function(c){
                                            statistics.preguntasconcomentarios = c[0].c;

                                           res.render('quizes/statistics',{statistics: statistics, errors: []});
                                        },function(err){
                                            next(err);                                        }                                        
                                    );
                                },
                                function(err){
                                    next(err);
                                }                               
                            ); 


/*
+                            Quiz.noCommentCount(
+                                function(c){
+                                    stats.questionWithoutComments = c[0].c;
+                                    Quiz.commentCount(
+                                        function(c){
+                                            stats.questionWithComments = c[0].c;

+                                            res.render('stats/stats', {stats: stats, errors: errors});
+                                        },function(err){
+                                            next(err);
+                                        }                                        
+                                    );
+                                },
+                                function(err){
+                                    next(err);
+                                }                               
+                            ); 
*/
exports.show2 = function(req,res){
	// res.render('author', { title: 'Autores' , errors:[]});
    var contar = 0;
	var numpreguntas     = 0;
	var comentarios      = 0;
	var mediacomentarios = 0;
	var preguntassincomentarios = 0;
	var preguntasconcomentarios = 0;
	var comments;







// exports.showProfile = function(req, res){
//   User.find(req.params.id).success(function(user) {
//     user.getPosts().success(function(posts) {
//     	user.getFollowee().success(function(followees){
//     		res.render('profile', { posts: posts, imgSrc: gravatarURL(user.email), user: req.user, userDetails: user, followees: followees });
//     	});
//     });
//   });
// };
	

	  models.Quiz.findAll().then(function(quizes){
	  	quizes[0].getComments().success(function(comments) {  
			 	 comentarios = comentarios + comments.length; 
			 	 statistics.numpreguntas=5;
                 statistics.comentarios =comentarios;
			 	res.render('quizes/statistics',{statistics: statistics, errors: []});
		});
        return;

	  //recorrer lista de preguntas
		// for (quizzy in quizes) {
		// 	 quizes.getComments().success(function(comments) {  
		// 	 	comentarios = comentarios + comments.length; 
		// 	 });
			
		// 	//comentarios = comentarios + 3;
		// /*	if (quizzy.comments.count===0) {
  //              preguntassincomentarios++;
		// 	}else {
  //              preguntasconcomentarios++;
		// 	}
		// */	

		// }
        //if (numpreguntas > 0) mediacomentarios = comentarios / numpreguntas;
        
		// obtener numero de comentarios de cada pregunta
        statistics.numpreguntas=numpreguntas;
        statistics.comentarios =comentarios;
        statistics.mediacomentarios = mediacomentarios;
        statistics.preguntassincomentarios = preguntassincomentarios;
        statistics.preguntasconcomentarios = preguntasconcomentarios;
        res.render('quizes/statistics',{statistics: statistics, errors: []});
		return statistics;
	    }).then (function(result){

          res.render('quizes/statistics',{result: statistics, errors: []});
	    }).catch(function(error) {next (error); });
   
    
	
};
/*
exports.getStatistics = function(req, res, next) {
 3    req.statistics = {};
 4    models.Quiz.count()
 5    .then(function(numQuizes) {
 6        req.statistics.numQuizes = numQuizes;
 7        var promise = 
 8        models.Quiz.findAndCountAll({
 9            include: [
10                {
11                    model: models.Comment,
12                    required: true,
13                    where: {
14                        publicado: true 
15                    }
16                }
17            ],
18            distinct: true
19         });
20        return promise;
21    }).then(function(result) {
22        req.statistics.numQuizesWithComments = result.count;
23        req.statistics.numQuizesWithoutComments = req.statistics.numQuizes - result.count;
24        return models.Comment.count();
25    }).then(function(numComments) {
26        req.statistics.numComments = numComments;
27        if (req.statistics.numQuizes > 0) {
28            req.statistics.avgComments = numComments / req.statistics.numQuizes;
29        } else {
30            req.statistics.avgComments = 0;
31        }
32    }).catch(function(error) {
33        console.error(error);
34    }).finally(function(error) {
35        next();
36    });
37}

var models = require('../models/models.js');
 2
 3var statistics = {
 4      quizes: 0,
 5      comments: 0,
 6      commentsUnpublished: 0,
 7      commentedQuizes:0
 8    };
 9
10var errors = [];
11
12exports.calculate = function (req, res, next) {
13
14  // NOTE: Usar promesas (Promise.all) sería mejor, ya que se podrían
15  // lanzar todas las consultas simultáneamente
16  models.Quiz.count()
17  .then(function (numQuizes) { // número de preguntas
18    statistics.quizes = numQuizes;
19    return models.Comment.count();
20  })
21  .then(function (numComments) { // número de comentarios
22    statistics.comments = numComments;
23    return models.Comment.countUnpublished();
24  })
25  .then(function (numUnpublished) { // número de comentarios sin publicar
26    statistics.commentsUnpublished = numUnpublished;
27    return models.Comment.countCommentedQuizes();
28  })
29  .then(function (numCommented) { // número de preguntas con comentario
30    statistics.commentedQuizes = numCommented;
31  })
32  .catch(function (err) { errors.push(err); })
33  .finally(function () {
34    next();
35  });
36
37};
38
39// GET /quizes/statistics
40exports.show = function (req, res) {
41  res.render('statistics/show', { statistics: statistics, errors: errors });
42};

*/