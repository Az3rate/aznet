class AboutController {
    static async getAboutPage(req, res) {
        res.render('pages/about');
    }
}

module.exports = AboutController; 