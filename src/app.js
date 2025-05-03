const express = require('express');
const { PORT } = require('./config/constants');
const setupMiddleware = require('./config/middleware');

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup routes
app.use('/', homeRoutes);
app.use('/', projectRoutes);
app.use('/', aboutRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app; 