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
      },
      tema:  {
         type: DataTypes.STRING
      }


    }
  );
}

/*
var friendlyUrlMethods = require('./FriendlyUrl')(['first_name', 'last_name']);
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {
    instanceMethods: Sequelize.Utils._.extend({}, friendlyUrlMethods, {
      countTasks: function() {
        return this.__factory.associations['Tasks'].target.count({ where: { user_id: this.id } });
      }
    });
  })
};
*/