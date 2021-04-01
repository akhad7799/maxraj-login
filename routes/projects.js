const express = require('express');
const router = express.Router();
const {Project, validate} = require('../models/project');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/',  async (req, res) => {
    const projects = await Project.find().sort('title');
    res.send(projects);
});

router.post('/', [auth, admin], async (req, res) => {
    const {error} = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let project = new Project({
        title: req.body.title
    });
    project = project.save();
    res.status(201).send(project);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    if (project)
        return res.status(404).send('Nothing found by given id');
    res.send(project);
});

router.get('/:id', async (req, res) => {
    const project = await Project.findOne(req.params.id);
    if (project)
        return res.status(404).send('Nothing found by given id');
    res.send(project);
});

module.exports = router;

