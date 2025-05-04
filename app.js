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
    architectureImage: '/images/loot-manager-mermaid.png',
    overview: 'A comprehensive guild management system specifically designed for Throne and Liberty, focusing on DKP (Dragon Kill Points) tracking, raid scheduling, and loot distribution. Built to handle the unique needs of T&L\'s guild system and progression mechanics.',
    keyFeatures: [
      'User Management: Authentication & Authorization, role-based access control, user profile management, guild selection and switching',
      'DKP Management: DKP tracking and distribution, session management, transaction history, user DKP balances',
      'Event Management: Event creation and scheduling, registration, attendance tracking, verification',
      'Guild Administration: User management, admin logs, team management, premium features',
      'Additional Features: Wishlist system, email notifications, privacy policy, premium upgrade system'
    ],
    architecture: `graph TD\n  User[\"User\"] -->|Login/Auth| Frontend[\"React Dashboard\"]\n  Frontend -->|API Calls| Backend[\"Firebase Functions API\"]\n  Backend -->|Data| Firestore[\"Firestore DB\"]\n  Frontend -->|Real-time Updates| Firestore\n  Admin[\"Admin\"] -->|Manages| Backend\n  Frontend -->|Notifications| Email[\"Email Service\"]`,
    techStack: [
      { name: 'Node.js', description: 'Backend server and API' },
      { name: 'React', description: 'Frontend user interface' },
      { name: 'MongoDB', description: 'Data storage and management' },
      { name: 'Redux Toolkit', description: 'State management' },
      { name: 'Material-UI', description: 'UI components' },
      { name: 'TailwindCSS', description: 'Styling' },
      { name: 'Firebase', description: 'Hosting, Auth, Functions, Firestore' }
    ],
    directoryStructure: [
      'src/api/ — API integration',
      'src/components/ — Reusable UI components',
      'src/features/ — Feature-specific components',
      'src/hooks/ — Custom React hooks',
      'src/interfaces/ — TypeScript interfaces',
      'src/services/ — Business logic services',
      'src/store/ — Redux store configuration',
      'src/styles/ — Global styles',
      'src/themes/ — Theme customization',
      'src/types/ — TypeScript type definitions',
      'src/utils/ — Utility functions',
      'src/contexts/ — React contexts'
    ],
    apiEndpoints: [
      { method: 'GET', path: '/api/loot', description: 'Retrieve loot history' },
      { method: 'POST', path: '/api/loot', description: 'Add new loot entry' },
      { method: 'GET', path: '/api/dkp', description: 'Get DKP standings' },
      { method: 'POST', path: '/auth', description: 'Authentication flow' },
      { method: 'GET', path: '/events', description: 'Event listing' }
    ],
    workflow: [
      'Local development with Firebase emulators, hot reloading, TypeScript compilation',
      'Testing with Jest, React Testing Library, ESLint',
      'Deployment via Firebase Hosting and GitHub Actions'
    ],
    summary: `LootManager started as a simple way to help my Throne and Liberty guild keep track of who got what loot. It\'s grown into a full-featured system that makes guild life easier - from scheduling raids to managing DKP. I built it to solve real problems we faced in our guild, and it\'s been great seeing other guilds find it useful too.`
  },
  {
    name: 'RaidAlert',
    description: 'Sleep soundly knowing your ARK base is being watched. Get real-time raid notifications, manage your tribe, and let Discord do the worrying for you.',
    url: 'https://raidalert.aznet.com',
    image: '/images/raidalert.png',
    architectureImage: '/images/raid-alert-mermaid.png',
    overview: 'To protect ARK Survival Evolved bases by providing real-time raid notifications and tribe management through Discord. The system monitors server activity, tracks tribe resources, and alerts players of potential threats, helping tribes maintain their dominance in the harsh ARK environment.',
    keyFeatures: [
      'Discord Bot: Monitors Discord channels for tribe-related activity, supports multi-tribe configurations per guild, handles commands and button interactions, provides real-time alerts, and logs activity/errors for audit and troubleshooting.',
      'Web Dashboard: Simple web interface for status monitoring, fetching and displaying tribe analytics and alert data.',
      'Backend API: RESTful endpoints for tribe configuration and license management, health check endpoint for uptime monitoring, centralized Firestore database for persistent storage.',
      'Licensing System: Supports tiered features and license expiration, admin endpoints for license management and auditing.'
    ],
    architecture: `graph TD\n  Discord[\"Discord Server\"] -->|Bot Commands & Events| Bot[\"RaidAlert Discord Bot\"]\n  Bot -->|API Calls| API[\"Express.js REST API\"]\n  API -->|Data| Firestore[\"Google Firestore DB\"]\n  API -->|Serves| Dashboard[\"Web Dashboard\"]\n  Dashboard -->|Fetches Analytics| API\n  Admin[\"Admin\"] -->|Manages Licenses| API`,
    techStack: [
      { name: 'Node.js', description: 'Backend server' },
      { name: 'Express.js', description: 'API and dashboard' },
      { name: 'discord.js', description: 'Discord bot' },
      { name: 'Google Firestore', description: 'Database' },
      { name: 'Firebase', description: 'Hosting' }
    ],
    directoryStructure: [
      '/index.js — Main entry for the Discord bot',
      '/backend/server.js — Express server for API and dashboard',
      '/backend/routes/ — API route definitions for tribes and licenses',
      '/utils/ — Shared utilities (Firestore, tribe config, licensing, analytics)',
      '/dashboard/ — Web dashboard server and static files',
      '/logs/ — Log files for bot and server activity'
    ],
    apiEndpoints: [
      { method: 'POST', path: '/create-tribe-config', description: 'Create or update a tribe configuration' },
      { method: 'GET', path: '/get-tribe-config/:guildId', description: 'Fetch a tribe config for a guild' },
      { method: 'GET', path: '/check-license/:guildId', description: 'Check license status for a guild' },
      { method: 'POST', path: '/update-license', description: 'Update or assign a license' },
      { method: 'GET', path: '/all-licenses', description: '(Admin) List all active licenses' }
    ],
    workflow: [
      'nodemon for development',
      'Testing with jest',
      'Deployment via Firebase Hosting and GitHub Actions'
    ],
    summary: `RaidAlert came from a real need - we kept getting raided in ARK when no one was online. I built this bot to give us a fighting chance, and it\'s been a game-changer for our tribe. It\'s not perfect, but it helps us sleep better knowing we\'ll get a heads-up if someone\'s messing with our base. The Discord integration makes it easy for everyone to stay in the loop.`
  },
  {
    name: 'D4UT',
    description: 'Because sometimes you need more than just "big number go up". Optimize your Diablo 4 builds with actual math, item comparisons, and character planning that doesn\'t involve sacrificing goats.',
    url: 'https://d4ut.aznet.com',
    image: '/images/d4ut.png',
    architectureImage: '/images/d4ut-mermaid.png',
    overview: 'A powerful web-based utility tool specifically designed for Diablo 4 players, offering advanced build optimization, damage calculations, and item comparison features. The tool helps players maximize their character\'s potential by analyzing stats, skills, and gear combinations.',
    keyFeatures: [
      'Character Optimization: Build calculations, stat analysis, gear optimization',
      'Data Analysis: Comprehensive stat tracking, performance metrics',
      'User Interface: Interactive maps, build planners, stat calculators',
      'Localization: Multi-language support, internationalization',
      'Data Management: State management, data persistence, real-time updates'
    ],
    architecture: `graph TD\n  UI[\"User Interface\"] --> RC[\"React Components\"]\n  RC --> SM[\"State Management (Zustand)\"]\n  SM --> DP[\"Data Processing\"]\n  DP --> LS[\"Local Storage/API\"]`,
    techStack: [
      { name: 'React 18 (TypeScript)', description: 'Frontend and calculations' },
      { name: 'Zustand', description: 'State management' },
      { name: 'HeadlessUI', description: 'UI components' },
      { name: 'HeroIcons', description: 'Icons' },
      { name: 'Styled Components', description: 'Styling' },
      { name: 'TailwindCSS', description: 'Styling' },
      { name: 'SASS', description: 'Styling' },
      { name: 'PostCSS', description: 'Styling' },
      { name: 'Leaflet', description: 'Maps & Visualization' },
      { name: 'React-Leaflet', description: 'Maps & Visualization' },
      { name: 'React Tour', description: 'UI Enhancements' },
      { name: 'React Toastify', description: 'UI Enhancements' },
      { name: 'React Input Slider', description: 'UI Enhancements' },
      { name: 'Vite', description: 'Development Tools' },
      { name: 'Yarn 3.6.1', description: 'Development Tools' },
      { name: 'TypeScript 5.0', description: 'Development Tools' },
      { name: 'ESLint', description: 'Development Tools' },
      { name: 'Lodash', description: 'Additional Libraries' },
      { name: 'Immer', description: 'Additional Libraries' },
      { name: 'Dayjs', description: 'Additional Libraries' },
      { name: 'Axios', description: 'Additional Libraries' },
      { name: 'Jimp', description: 'Additional Libraries' },
      { name: 'Tesseract.js', description: 'Additional Libraries' },
      { name: 'Vercel Analytics', description: 'Additional Libraries' }
    ],
    directoryStructure: [
      'src/assets/ — Static assets',
      'src/components/ — Reusable UI components',
      'src/App.tsx — Main application component',
      'src/calculation.ts — Build calculation logic',
      'src/locales.ts — Internationalization',
      'src/main.tsx — Application entry point',
      'src/stats.tsx — Statistics and analysis',
      'src/store.tsx — State management'
    ],
    apiEndpoints: [
      { method: 'GET', path: '/api/builds', description: 'Get saved builds' },
      { method: 'POST', path: '/api/calculate', description: 'Calculate build stats' },
      { method: 'GET', path: '/api/items', description: 'Get item database' }
    ],
    workflow: [
      'Local development with Vite\'s hot module replacement',
      'TypeScript compilation and type checking',
      'ESLint for code quality',
      'Yarn for package management',
      'Vite for building and previewing'
    ],
    summary: `D4UT started as a personal project to help me figure out which gear was actually better in Diablo 4. I kept getting frustrated trying to compare items and calculate damage, so I built something to do the math for me. It\'s grown into a tool that helps other players make better decisions about their builds and gear. I\'m always adding new features based on what players find useful.`
  }
];

// Home route - Terminal interface
app.get('/', (req, res) => {
  res.render('index', { websites });
});

// API endpoint for terminal commands
app.get('/api/terminal/command', (req, res) => {
  const { command } = req.query;
  
  // Simulate command processing delay
  setTimeout(() => {
    let response;
    
    switch (command) {
      case 'help':
        response = {
          type: 'success',
          output: `
Available commands:
  help        - Show this help message
  clear       - Clear the terminal
  about       - Show about information
  projects    - List all projects
  contact     - Show contact information
  ls          - List directory contents
  cd [dir]    - Change directory
  cat [file]  - Read file contents
  echo [text] - Print text
  neofetch    - Show system information
  exit        - Exit the terminal
          `
        };
        break;
        
      case 'projects':
        response = {
          type: 'success',
          output: websites.map(w => `${w.name.padEnd(15)} - ${w.description}`).join('\n')
        };
        break;
        
      case 'about':
        response = {
          type: 'success',
          output: `
AZNET - Terminal Interface
Version: 1.0.0
Created with ❤️ by AZNET Team

This is a modern terminal-style interface for our website.
Navigate through our content using terminal commands.
          `
        };
        break;
        
      default:
        response = {
          type: 'error',
          output: `Command not found: ${command}\nTry 'help' for available commands`
        };
    }
    
    res.json(response);
  }, 500);
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