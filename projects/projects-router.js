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

module.exports = router;