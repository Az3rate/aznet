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
    description: 'Because nothing says "I love my guild" like meticulously tracking who got what loot. Keep your guild\'s loot drama to a minimum with advanced DKP tracking, raid scheduling, and loot distribution tools.',
    url: 'https://lootmanager.aznet.com',
    image: '/images/lootmanager.png',
    features: [
      'Advanced DKP tracking system',
      'Raid scheduling and attendance tracking',
      'Loot distribution and history',
      'Guild member management',
      'Real-time notifications'
    ],
    techStack: [
      {
        name: 'Node.js',
        description: 'Backend server and API'
      },
      {
        name: 'React',
        description: 'Frontend user interface'
      },
      {
        name: 'MongoDB',
        description: 'Data storage and management'
      }
    ],
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/loot',
        description: 'Retrieve loot history'
      },
      {
        method: 'POST',
        path: '/api/loot',
        description: 'Add new loot entry'
      },
      {
        method: 'GET',
        path: '/api/dkp',
        description: 'Get DKP standings'
      }
    ]
  },
  {
    name: 'RaidAlert',
    description: 'Sleep soundly knowing your ARK base is being watched. Get real-time raid notifications, manage your tribe, and let Discord do the worrying for you.',
    url: 'https://raidalert.aznet.com',
    image: '/images/raidalert.png',
    features: [
      'Real-time raid monitoring',
      'Discord integration',
      'Tribe management',
      'Custom alert rules',
      'Base status tracking'
    ],
    techStack: [
      {
        name: 'Python',
        description: 'Monitoring and alert system'
      },
      {
        name: 'Discord API',
        description: 'Notification delivery'
      },
      {
        name: 'Redis',
        description: 'Real-time data processing'
      }
    ],
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/status',
        description: 'Get base status'
      },
      {
        method: 'POST',
        path: '/api/alert',
        description: 'Configure alert rules'
      },
      {
        method: 'GET',
        path: '/api/logs',
        description: 'View raid history'
      }
    ]
  },
  {
    name: 'D4UT',
    description: 'Because sometimes you need more than just "big number go up". Optimize your Diablo 4 builds with actual math, item comparisons, and character planning that doesn\'t involve sacrificing goats.',
    url: 'https://d4ut.aznet.com',
    image: '/images/d4ut.png',
    features: [
      'Build optimization calculator',
      'Item comparison tool',
      'Character planner',
      'Skill tree simulator',
      'Damage calculator'
    ],
    techStack: [
      {
        name: 'TypeScript',
        description: 'Frontend and calculations'
      },
      {
        name: 'Vue.js',
        description: 'User interface'
      },
      {
        name: 'Web Workers',
        description: 'Background calculations'
      }
    ],
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/builds',
        description: 'Get saved builds'
      },
      {
        method: 'POST',
        path: '/api/calculate',
        description: 'Calculate build stats'
      },
      {
        method: 'GET',
        path: '/api/items',
        description: 'Get item database'
      }
    ]
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