module.exports = {
	name: 'ping',
	description: 'This is a ping command.',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'Devs')) {
				let successResponse = 'PONG'
				message.channel.send(successResponse)
			} else {
				let failureResponse = 'Nur die Babas aller Babas können pingen akho...'
				message.channel.send(failureResponse)
			}
		} catch (error) {
			console.error(error)
			let errorResponse = "Zellenwärter ruft mich uno momento ahki..."
			message.channel.send(errorResponse)
		}

	}
}