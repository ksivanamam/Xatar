module.exports = {
	name: 'ping',
	description: 'This is a ping command.',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'RAV Stammkunde' || r.name === 'Store manager')) {
				let successResponse = 'PONG'
				message.channel.send(successResponse)
				console.log('Xatar has answerd a ping request sent by', message.author.username);
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