module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PROJECTS: [
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
    ]
}; 