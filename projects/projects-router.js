const router = require('express').Router();

const Projects = require('../projects/projects-model');

// GET projects

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve projects data.' })
        })
})

// GET project by id

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

// GET project actions

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

// POST (add new project)

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

// PUT (update project)

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: 'Projects require both a name and a description.' })
    } else {
        Projects.updateProject(req.body.id, req.body)
            .then(count => {
                if (count > 0) {
                    res.status(201).json({ message: `${count} ${count > 1 ? 'records' : 'record'} updated.`})
                } else {
                    res.status(404).json({ errorMessage: 'A project with the specified ID does not exist.' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Project data could not be updated.' })
            })
    }
})

module.exports = router;