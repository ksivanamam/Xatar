module.exports = {
	name: 'unmute',
	description: 'Unmutes a member',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'Devs')) {
				var target = message.mentions.users.first()
				if (target) {
					var mainRole = message.guild.roles.cache.find(role => role.name === 'member')
					var muteRole = message.guild.roles.cache.find(role => role.name === 'mute')
					var memberTarget = message.guild.members.cache.get(target.id)

					memberTarget.roles.remove(muteRole.id)
					memberTarget.roles.add(mainRole.id)
					message.channel.send(`@${memberTarget.user.id} Kashoggi darf wieder reden...`)
				}
			} else {
				var failureResponse = 'Nur baba Devs können unmuten du Lappen...'
				message.channel.send(failureResponse)
			}
		} catch (error) {
			console.error(error)
			let errorResponse = 'Zellenwärter ruft mich uno momento ahki...'
			message.channel.send(errorResponse)
		}
	}
}