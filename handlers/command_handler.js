const { client } = require("discord.js")

const fs = require('fs')

module.exports = (client, Discord) => {
	const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

	for (const file of command_files) {
		var command = require(`../commands/${file}`)
		if (command.name) {
			client.commands.set(command.name, command)
		} else {
			continue
		}
	}
}