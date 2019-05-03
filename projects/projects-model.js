const db = require('../data/dbConfig');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getProjectActions,
    updateProject,
    deleteProject
}

function getProjects() {
    return db('projects')
}

function getProjectById(id) {
    return db('projects')
        .where({ id })
        .first();
}

function getProjectActions(projectId) {
    return db('actions as a')
      .join('projects as p', 'p.id', 'a.project_id')
      .select('a.id', 'a.description', 'a.notes', 'a.completed')
      .where('a.project_id', projectId);
  }

function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then(([id]) => {
            return getProjectById(id)
        })
}

function updateProject(id, changes) {
    return db('projects')
        .where({ id })
        .update(changes)
}

function deleteProject(id) {
    return db('projects')
        .where('id', id)
        .del()
}