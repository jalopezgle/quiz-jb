var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController= require('../controllers/comment_controller');
var sessionController= require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors:[]});
});
//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',  quizController.answer);
//ojo es router param no get!!!!
router.param('quizId', quizController.load);
router.param('commentId',commentController.load);

//definición de rutas de sesión
router.get ('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', quizController.index);
///quizes?search=texto_a_buscar
router.get('/quizes?search=', quizController.index);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',				sessionController.loginRequired,quizController.new);
router.post('/quizes/create',			sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',		sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',	sessionController.loginRequired,quizController.destroy);

router.get('/quizes/statistics', statisticsController.show);


router.get( '/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.get( '/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired, commentController.publish); //esto deberia ser un put

router.get('/author', function(req, res) {
  res.render('author', { title: 'Autores' , errors:[]});
});

module.exports = router;

