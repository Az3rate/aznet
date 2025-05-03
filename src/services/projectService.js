const ProjectModel = require('../models/projectModel');

class ProjectService {
    static getAllProjects() {
        return ProjectModel.getAllProjects();
    }

    static getProjectByName(name) {
        const project = ProjectModel.getProjectByName(name);
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }
}

module.exports = ProjectService; 