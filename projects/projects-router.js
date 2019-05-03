const router = require('express').Router();

const Projects = require('../projects/projects-model');

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve projects data.' })
        })
})

router.get('/:id', (req, res) => {
    Projects.getProjectById(req.params.id)
        .then(project => {
            if (project) {
                res.status(201).json(project)
            } else {
                res.status(404).json({ errorMessage: 'A project with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve project from the database.' })
        })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectById(req.params.id)
        .then(project => {
            if (project) {
                Projects.getProjectActions(req.params.id)
                    .then(actions => {
                        res.status(201).json(actions)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'Cannot retrieve acitons from database.' })
                    })
            } else {
                res.status(404).json({ errorMessage: 'A project with the specified ID does not exist.' })
            }
        })
})

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: 'New projects require both a name and description.' })
    } else {
        Projects.addProject(req.body)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Could not add project to database.' })
            })
    }
})

module.exports = router;