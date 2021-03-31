module.exports = {
	name: 'ban',
	description: 'command to ban members',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'RAV Stammkunde')) {
				var member = message.mentions.users.first()
				if (member) {
					var memberTarget = message.guild.members.cache.get(member.id)
					memberTarget.ban()
					var successResponse = 'Antar wurde gebannt.'
					message.channel.send(successResponse)
				} else {
					var failureResponse = 'Diesen Gangster kann man nicht bannen...'
					message.channel.send(failureResponse)
				}
			} else {
				let failureResponse = 'Nur die Babas aller Babas können diese Schlampen bannen akho...'
				message.channel.send(failureResponse)
			}
		} catch (error) {
			var errorResponse = 'Sry Bruder. Bin zu dumm um diese Hure zu bannen...'
			message.channel.send(errorResponse)
		}
	}
}