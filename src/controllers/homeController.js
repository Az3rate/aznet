const ProjectService = require('../services/projectService');

class HomeController {
    static async getHomePage(req, res) {
        try {
            const projects = ProjectService.getAllProjects();
            res.render('pages/home', { projects });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HomeController; 