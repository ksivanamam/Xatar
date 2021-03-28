module.exports = {
	name: 'sag',
	description: 'This is a repeat command.',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'Devs')) {
				let rawResponse = args.toString()
				let successResponse = rawResponse.replace(/,/g, ' ')
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