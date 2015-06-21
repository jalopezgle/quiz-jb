var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors:[]});
});
//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',  quizController.answer);
//ojo es router param no get!!!!
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
///quizes?search=texto_a_buscar
router.get('/quizes?search=', quizController.index);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
router.get('/author', function(req, res) {
  res.render('author', { title: 'Autores' });
});

module.exports = router;
