module.exports = {
	name: 'ping',
	description: 'This is a ping command.',
	execute(message, args) {
		if (message.member.roles.cache.some(r => r.name === 'Devs')) {
			let successResponse = 'PONG'
			message.channel.send(successResponse)
		} else {
			let errorResponse = 'Nur die Babas aller Babas können pingen akho...'
			message.channel.send(errorResponse)
		}
	}
}