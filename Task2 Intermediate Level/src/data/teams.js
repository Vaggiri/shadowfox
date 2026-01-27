// Team logos and data for IPL teams
export const teams = {
    MI: {
        name: 'Mumbai Indians',
        shortName: 'MI',
        color: '#004BA0',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/800px-Mumbai_Indians_Logo.svg.png'
    },
    CSK: {
        name: 'Chennai Super Kings',
        shortName: 'CSK',
        color: '#FDB913',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/800px-Chennai_Super_Kings_Logo.svg.png'
    },
    RCB: {
        name: 'Royal Challengers Bengaluru',
        shortName: 'RCB',
        color: '#EC1C24',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/800px-Royal_Challengers_Bangalore_2020.svg.png'
    },
    KKR: {
        name: 'Kolkata Knight Riders',
        shortName: 'KKR',
        color: '#3A225D',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/800px-Kolkata_Knight_Riders_Logo.svg.png'
    },
    DC: {
        name: 'Delhi Capitals',
        shortName: 'DC',
        color: '#004C93',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Delhi_Capitals_Logo.svg/800px-Delhi_Capitals_Logo.svg.png'
    },
    SRH: {
        name: 'Sunrisers Hyderabad',
        shortName: 'SRH',
        color: '#FF822A',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sunrisers_Hyderabad.svg/800px-Sunrisers_Hyderabad.svg.png'
    },
    PBKS: {
        name: 'Punjab Kings',
        shortName: 'PBKS',
        color: '#ED1B24',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Punjab_Kings_Logo.svg/800px-Punjab_Kings_Logo.svg.png'
    },
    RR: {
        name: 'Rajasthan Royals',
        shortName: 'RR',
        color: '#EA1A85',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Rajasthan_Royals_Logo.svg/800px-Rajasthan_Royals_Logo.svg.png'
    },
    GT: {
        name: 'Gujarat Titans',
        shortName: 'GT',
        color: '#1C2E4A',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Gujarat_Titans_Logo.svg/800px-Gujarat_Titans_Logo.svg.png'
    },
    LSG: {
        name: 'Lucknow Super Giants',
        shortName: 'LSG',
        color: '#0B2347',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lucknow_Super_Giants_Logo.svg/800px-Lucknow_Super_Giants_Logo.svg.png'
    }
};

export const getTeamByShortName = (shortName) => {
    return teams[shortName] || null;
};

export default teams;
