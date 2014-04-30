var models = require('../models/models.js');

// findAll(quizes) devuelve todos los objetos de la tabla
exports.inicio = function(req, res){
 
    res.render('inicio.ejs');
  
};

exports.index = function(req, res){
  models.Quiz.findAll().success(function(quizes) {
    res.render('index.ejs', { quizes: quizes});
  })
};

exports.show = function(req, res){
  models.Quiz.find({where: {pregunta: req.query.pregunta}}).success(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('show.ejs', { respuesta: 'Correcto' });
    } else {
      res.render('show.ejs',
       	{ respuesta: 'La respuesta es: ' + quiz.respuesta});
    }
  })
};

exports.new = function(req, res){
  res.render('new.ejs');
};

exports.create = function(req, res){
  models.Quiz.create({
    pregunta:  req.body.pregunta,
    respuesta: req.body.respuesta
  });
  res.redirect("/index");
};

exports.select = function(req, res){
  models.Quiz.findAll().success(function(quizes) {
    res.render('select.ejs', { quizes: quizes});
  })
};

exports.edit = function(req, res){
  models.Quiz
    .find({where: {pregunta: req.query.pregunta}})
    .success(function(quiz) {
      res.render('edit.ejs', 
               { pregunta: quiz.pregunta, 
                 respuesta: quiz.respuesta,
                 id: quiz.id
               });
  })
};

exports.update = function(req, res){
  models.Quiz
    .find(+req.body.id).success(function(quiz) {
      if (quiz) {
        quiz.pregunta = req.body.pregunta;
        quiz.respuesta = req.body.respuesta;
        quiz
          .save()
          .success(function (){res.redirect("/index");})
          .error(function (err){next(err);})
      };
  });
};

exports.remove = function(req, res){
   
	models.Quiz.findAll().success(function(quizes) {
	res.render('remove.ejs', { quizes: quizes});
  })
  
};

exports.borrar = function(req, res){
	models.Quiz.find({where: {pregunta: req.query.pregunta}}).success(function(quiz) {
      res.render('borrar.ejs', 
               { 
                 id: quiz.id
               });
  })
};

exports.eliminar= function(req, res){
  models.Quiz
    .find(+req.body.id).success(function(quiz) {
      if (quiz) {
		
        quiz
          .destroy()
          .success(function (){res.redirect("/index");})
          .error(function (err){next(err);})
      };
  });
};
