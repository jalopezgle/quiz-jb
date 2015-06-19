/*

module.exports = function (sequelize, DataTypes){
	return sequelize.define ('Quiz',{ //nombre de la tabla
		pregunta: {
		type: DataTypes.STRING, //definicion de campos
		validate: {notEmpty: {msg: "--> Falta pregunta"}}
	},
		respuesta: {
		type:      DataTypes.STRING,
		validate: {notEmpty: {msg: "-->Falta Respuesta"}}
	}
	});
}



module.exports = function (sequelize, DataTypes){
	return sequelize.define ('Quiz',{ //nombre de la tabla
		pregunta: DataTypes.STRING, //definicion de campos
		respuesta: DataTypes.STRING,
	});
}
*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      image: {
        type: DataTypes.STRING
      }
    }
  );
}