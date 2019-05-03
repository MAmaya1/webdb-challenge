const db = require('../data/dbConfig');

module.exports = {
    getActionById,
    addAction
}

function getActionById(id) {
    return db('actions')
        .where({ id })
        .first();
}

function addAction(action) {
    return db('actions')
        .insert(action, 'id')
        .then(([id]) => {
            return getActionById(id)
        })
}