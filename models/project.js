const mongoose = require('mongoose');
const Joi = require('joi');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(20)
    });
    return schema.validate(project);
}

exports.Project = Project;
exports.validate = validateProject;