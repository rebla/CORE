// Modelos ORM
var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definicion de la clase Quiz desde quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

// sequelize.sync() crea las tablas de datos definidas en el modelo
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creadas las tabas de la DB
  Quiz.count().success(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: '¿Cual es la capital de Italia?',
      	            respuesta: 'Roma'
      	         })
      .success(function(){console.log('Base de datos inicializada')});
    };
  });
});