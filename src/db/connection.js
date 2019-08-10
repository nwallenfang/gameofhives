/* eslint-disable no-console */
/* eslint-disable camelcase */
const Sequelize = require('sequelize');


const sequelize = new Sequelize('player', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: `${__dirname}/sqlite.db`,
});

const init_table = 'CREATE TABLE IF NOT EXISTS `player` (\n'
  + '\t`id`\tINTEGER PRIMARY KEY AUTOINCREMENT,\n'
  + '\t`name`\tTEXT NOT NULL UNIQUE,\n'
  + '\t`password`\tTEXT NOT NULL,\n'
  + '\t`gamecount`\tINTEGER NOT NULL,\n'
  + '\t`wincount`\tINTEGER NOT NULL\n)';


function init_sequelize() {
  try {
    sequelize.query(init_table).then();
    console.log('Connected sucessfully to DB');
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

init_sequelize();
module.exports = sequelize;
