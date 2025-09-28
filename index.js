const { Client, Collection } = require("discord.js");
const { createDatabase } = require("whisky.db");
const db = new createDatabase();

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.activeAttacks = new Collection(); // Aktif saldırıları takip etmek için eklendi
client.config = require("./config.json");

require("./handler")(client);

client.login(client.config.token);

// developed by youtube.com/@djsturkiye // Whisky Lorean
