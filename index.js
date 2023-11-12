const { BedrockPortal } = require('bedrock-portal'); 
const { Authflow, Titles } = require('prismarine-auth'); 
require('dotenv').config();

const ip = process.env.ip;
const port = process.env.port;
const title = process.env.name;
const description = process.env.description;
const memberCount = process.env.memberCount;
const maxMemberCount = process.env.maxMemberCount;


const main = async () => {
    console.log('Starting Process')
    try { 
        const flow = new Authflow(); 
        const xbl = await flow.getXboxToken(); 
        const auth = new Authflow(email, './auth', { 
            flow: 'live', 
            authTitle: Titles.MinecraftNintendoSwitch, 
            deviceType: 'Nintendo' 
		}); 
        const session = new BedrockPortal(auth, {
            ip: `${ip}`,
            port: port, 
            joinability: 'friends_of_friends', 
            modules: { 
                autoFriendAdd: true 
            }, 
            world: {
                hostName: `${title}`,
                name: `${description}`,
                memberCount: memberCount,
                maxMemberCount: maxMemberCount
            }
        }); 
        module.exports.session = session;
        await session.start(); 
        session.on('playersAdded', (players) => { 
            players.forEach(async (player) => { 
                console.log('XUID: ' + player.profile.xuid + '\n Gamertag: ' + player.profile.gamertag + '\n Gamerscore: ' + player.profile.gamerscore + '\n\n\n\n'); 			}); 
        }); 
    } catch(e) {} 
}; 
main();
