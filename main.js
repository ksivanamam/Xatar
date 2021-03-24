var discord = require('discord.js')
var client = new discord.Client()
var prefix = '.'
var fs = require('fs')

client.commands = new discord.Collection()

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
		}
	}
})

client.login('NzE1NjE1NDc5MTA3OTQ0NTAx.Xs_y2Q.Ur_oTrFioh1q-c1p3TsBysJtJQ0')