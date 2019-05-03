const db = require('../data/dbConfig');

module.exports = {
    getActions,
    getActionById,
    addAction,
    updateAction,
    deleteAction
}

function getActions() {
    return db('actions')
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

function updateAction(id, changes) {
    return db('actions')
        .where({ id })
        .update(changes)
}

function deleteAction(id) {
    return db('actions')
        .where('id', id)
        .del()
}