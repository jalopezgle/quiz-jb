// Definicion del modelo de Quiz con validación

/*module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }    
  );
}

*/
/*
module.exports = function (sequelize, DataTypes) {
 return sequelize.define('Comment', {
   texto: {
     type: DataTypes.STRING,
     validate: { notEmpty: { msg: '-> Falta comentario' } }
   },
   publicado: {
     type: DataTypes.BOOLEAN,
     defaultValue: false
   }
 },
 {
   classMethods: {
     countUnpublished: function () {
       return 5;
     },
     countCommentedQuizes: function () {
       return 6;
     }
   }
 });
;
*/

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Comment', {
    texto: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: '-> Falta comentario' } }
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    classMethods: {
      countUnpublished: function () {
        return this.count({ where: { publicado: false } });
      },
      countCommentedQuizes: function () { // NOTE: mejor en el modelo Quiz ¿cómo?
        return this.aggregate('QuizId', 'count', { distinct: true });
      }
    }
  });
};