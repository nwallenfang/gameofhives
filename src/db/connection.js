 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('player', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: 'C:\\Users\\kirah\\Desktop\\gameofhiveDB.db'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  