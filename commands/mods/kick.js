module.exports = {
	name: 'kick',
	description: 'command to kick members',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'RAV Stammkunde')) {
				var member = message.mentions.users.first()
				if (member) {
					var memberTarget = message.guild.members.cache.get(member.id)
					memberTarget.kick()
					var successResponse = 'Antar wurde gekickt.'
					message.channel.send(successResponse)
				} else {
					var failureResponse = 'Diesen Gangster kann man nicht kicken...'
					message.channel.send(failureResponse)
				}
			} else {
				let failureResponse = 'Nur die Babas aller Babas können diese Hurenkinder kicken akho...'
				message.channel.send(failureResponse)
			}

		} catch (error) {
			var errorResponse = 'Sry Bruder. Bin zu dumm um diese Hure zu kicken...'
			message.channel.send(errorResponse)
		}
	}
}