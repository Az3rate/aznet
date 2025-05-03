const express = require('express');
const path = require('path');

module.exports = (app) => {
    // Set up EJS as the view engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../../views'));

    // Serve static files
    app.use(express.static(path.join(__dirname, '../../public')));

    // Body parser middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render('errors/500');
    });

    // 404 handler
    app.use((req, res) => {
        res.status(404).render('errors/404');
    });
}; 