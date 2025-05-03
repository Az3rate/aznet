const ProjectService = require('../services/projectService');

class ProjectController {
    static async getProjectPage(req, res, next) {
        try {
            const project = ProjectService.getProjectByName(req.params.name);
            res.render('pages/project', { project });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProjectController; 