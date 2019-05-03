const knex = require('knex');

const knesConfig = require('../knexfile');

const db = knex(knesConfig.development);

module.exports = db;