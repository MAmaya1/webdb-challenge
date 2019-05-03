const router = require('express').Router();

const Actions = require('../actions/actions-model');

// GET actions

router.get('/', (req, res) => {
    Actions.getActions()
        .then(actions => {
            res.status(201).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve actions data.' })
        })
})

// GET action by ID

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

// POST (add new action)

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

// PUT (update action)

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.project_id) {
        res.status(400).json({ errorMessage: 'An action requires a name, description, and project id.' })
    } else {
        Actions.updateAction(req.params.id, req.body)
            .then(count => {
                if (count > 0) {
                    res.status(201).json({ message: `${count} ${count > 1 ? 'records' : 'record'} updated.` })
                } else {
                    res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Action could not be updated.' })
            })
    }
})

router.delete('/:id', (req, res) => {
    Actions.deleteAction(req.params.id)
        .then(count => {
            if (count) {
                if (count) {
                    res.status(200).json({ message: `${count} ${count > 1 ? 'records' : 'record'} deleted.` })
                } else {
                    res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Action could not be deleted from the database.' })
        })
})

module.exports = router;