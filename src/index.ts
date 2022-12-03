import { AmethystClient } from "amethystjs";
import { Partials } from "discord.js";
import { config } from "dotenv";
import { createConnection } from "mysql";

config();

const client = new AmethystClient({
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    partials: [ Partials.Message, Partials.Channel ]
}, {
    token: process.env.token,
    commandsFolder: './dist/commands',
    preconditionsFolder: './dist/preconditions',
    eventsFolder: './dist/events',
    debug: true,
    prefix: '!',
    botNameWorksAsPrefix: false,
    mentionWorksAsPrefix: false
})

client.start({});

const database = createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
database.connect();

export { database };