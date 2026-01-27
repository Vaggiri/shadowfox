export const teamStats = {
    // Overall Record
    overall: {
        matchesPlayed: 249,
        wins: 145,
        losses: 103,
        noResult: 1,
        winPercentage: 58.23,
        titles: 5,
        runnerUp: 1,
        playoffAppearances: 11
    },

    // Championships
    championships: [
        { year: 2013, captain: 'Rohit Sharma', finalVs: 'CSK', venue: 'Kolkata' },
        { year: 2015, captain: 'Rohit Sharma', finalVs: 'CSK', venue: 'Kolkata' },
        { year: 2017, captain: 'Rohit Sharma', finalVs: 'RPS', venue: 'Hyderabad' },
        { year: 2019, captain: 'Rohit Sharma', finalVs: 'CSK', venue: 'Hyderabad' },
        { year: 2020, captain: 'Rohit Sharma', finalVs: 'DC', venue: 'Dubai' }
    ],

    // Current Season (2026)
    currentSeason: {
        position: 'TBD',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        nrr: 0.00,
        form: [] // Last 5 matches: 'W', 'L', 'W', etc.
    },

    // Home vs Away
    homeAway: {
        home: {
            played: 125,
            won: 82,
            lost: 43,
            winPercentage: 65.6
        },
        away: {
            played: 124,
            won: 63,
            lost: 60,
            winPercentage: 50.8
        }
    },

    // Key Achievements
    achievements: [
        'Most IPL Titles (5)',
        'Most Successful Franchise',
        'Longest Winning Streak (9 matches)',
        'Highest Team Total (235/9)',
        'Most Consecutive Final Appearances (3)'
    ],

    // Top Performers (All-Time MI)
    topPerformers: {
        mostRuns: {
            player: 'Rohit Sharma',
            runs: 6628,
            matches: 249,
            average: 30.27,
            strikeRate: 130.82
        },
        mostWickets: {
            player: 'Lasith Malinga',
            wickets: 170,
            matches: 122,
            average: 19.80,
            economy: 7.14
        },
        bestBowling: {
            player: 'Alzarri Joseph',
            figures: '6/12',
            match: 'vs SRH 2019',
            venue: 'Hyderabad'
        },
        highestScore: {
            player: 'Rohit Sharma',
            score: '109*',
            match: 'vs KKR 2012',
            venue: 'Kolkata'
        }
    },

    // Quick Stats for Dashboard
    quickStats: [
        {
            id: 1,
            label: 'Total Matches',
            value: 249,
            icon: 'Activity',
            color: 'blue'
        },
        {
            id: 2,
            label: 'Matches Won',
            value: 145,
            icon: 'Trophy',
            color: 'gold'
        },
        {
            id: 3,
            label: 'Win Rate',
            value: '58.2%',
            icon: 'TrendingUp',
            color: 'green'
        },
        {
            id: 4,
            label: 'IPL Titles',
            value: 5,
            icon: 'Award',
            color: 'gold'
        },
        {
            id: 5,
            label: 'Playoff Apps',
            value: 11,
            icon: 'Star',
            color: 'blue'
        },
        {
            id: 6,
            label: 'Home Wins',
            value: 82,
            icon: 'Home',
            color: 'blue'
        }
    ],

    // Head to Head vs Top Teams
    headToHead: {
        CSK: { played: 35, won: 18, lost: 17, winRate: 51.4 },
        RCB: { played: 31, won: 19, lost: 12, winRate: 61.3 },
        KKR: { played: 30, won: 22, lost: 8, winRate: 73.3 },
        DC: { played: 30, won: 16, lost: 14, winRate: 53.3 },
        RR: { played: 25, won: 13, lost: 12, winRate: 52.0 },
        PBKS: { played: 29, won: 15, lost: 14, winRate: 51.7 },
        SRH: { played: 20, won: 13, lost: 7, winRate: 65.0 }
    }
};

export default teamStats;
