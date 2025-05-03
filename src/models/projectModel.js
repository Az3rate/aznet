const { PROJECTS } = require('../config/constants');

class ProjectModel {
    static getAllProjects() {
        return PROJECTS;
    }

    static getProjectByName(name) {
        return PROJECTS.find(project => 
            project.name.toLowerCase().replace(/\s+/g, '') === name.toLowerCase()
        );
    }
}

module.exports = ProjectModel; 