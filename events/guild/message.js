module.exports = (Discord, client, message) => {
	const prefix = '.'

	if (!message.content.startsWith(prefix) || message.author.bot) return

	var args = message.content.slice(prefix.length).split(/ +/)
	var cmd = args.shift().toLocaleLowerCase()

	const command = client.commands.get(cmd) || client.command.find(a => a.aliases && a.aliases.include(cmd))

	if(command) command.execute(message, args, cmd, client, Discord)
}