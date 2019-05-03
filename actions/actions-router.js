const router = require('express').Router();

const Actions = require('../actions/actions-model');

router.get('/:id', (req, res) => {
    Actions.getActionById(req.params.id)
        .then(action => {
            if (action) {
                res.status(201).json(action)
            } else {
                res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve action from database.' })
        })
})

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.project_id) {
        res.status(400).json({ errorMessage: 'A new action requires a name, description, and project id.' })
    } else {
        Actions.addAction(req.body)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Action could not be added to the database.' })
            })
    }
})

module.exports = router;