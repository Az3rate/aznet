const express = require('express');
const app = express();
const PORT = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Sample data for your websites
const websites = [
  {
    name: 'LootManager',
    description: 'Streamline your Throne and Liberty guild operations with advanced DKP tracking, raid scheduling, and loot distribution tools.',
    url: 'https://lootmanager.aznet.com',
    image: '/images/lootmanager.png'
  },
  {
    name: 'RaidAlert',
    description: 'Protect your ARK Survival Evolved base with real-time raid notifications, tribe management, and automated Discord alerts.',
    url: 'https://raidalert.aznet.com',
    image: '/images/raidalert.png'
  },
  {
    name: 'D4UT',
    description: 'Optimize your Diablo 4 builds with advanced damage calculations, item comparisons, and character planning tools.',
    url: 'https://d4ut.aznet.com',
    image: '/images/d4ut.png'
  }
];

// Home route
app.get('/', (req, res) => {
  res.render('index', { websites });
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Project detail route
app.get('/project/:name', (req, res) => {
  const project = websites.find(w => w.name.toLowerCase().replace(/\s+/g, '') === req.params.name.toLowerCase());
  if (!project) {
    return res.status(404).send('Project not found');
  }
  res.render('project', { project });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 