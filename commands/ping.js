module.exports = {
	name: 'ping',
	description: 'This is a ping command.',
	execute(message, args) {
		let response = 'PONG'
		message.channel.send(response)
	}
}