
// Definicion del modelo Post:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta: {
                 type: DataTypes.STRING,
                 validate: {
                     notEmpty: {msg: "La pregunta no puede estar vacia"}
                 }
              },
              respuesta: {
                 type: DataTypes.STRING,
                 validate: {
                     notEmpty: {msg: "La respuesta no puede estar vacia"}
                 }
              }
            });
}