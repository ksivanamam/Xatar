var Discord = require('discord.js')
var client = new Discord.Client()
var prefix = '.'
var fs = require('fs')

client.commands = new Discord.Collection()

var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (var file of commandFiles) {
	var command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('Xatar iz da!')
})

client.on('message', message => {
	if (!message.content.startsWith(prefix || message.author.bot)) {
		return
	} else {
		var args = message.content.slice(prefix.length).split(/ +/)
		var command = args.shift().toLocaleLowerCase()

		if (command === 'ping') {
			client.commands.get('ping').execute(message, args)
		} else if (command === 'sag') {
			client.commands.get('sag').execute(message, args)
		} else if (command === 'scheissauf') {
			client.commands.get('scheissauf').execute(message, args, Discord)
		} else if (command === 'schulzeit') {
			client.commands.get('schulzeit').execute(message, args)
		} else if (command === 'curry') {
			client.commands.get('curry').execute(message, args, Discord)
		} else if (command === 'clear') {
			client.commands.get('clear').execute(message, args)
		}
	}
})

client.login('NzE1NjE1NDc5MTA3OTQ0NTAx.Xs_y2Q.Ur_oTrFioh1q-c1p3TsBysJtJQ0')