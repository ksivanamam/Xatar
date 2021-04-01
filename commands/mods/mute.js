module.exports = {
	name: 'mute',
	description: 'Mutes a member',
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'Devs')) {
				var target = message.mentions.users.first()
				if (target) {
					var mainRole = message.guild.roles.cache.find(role => role.name === 'member')
					var muteRole = message.guild.roles.cache.find(role => role.name === 'mute')
					var memberTarget = message.guild.members.cache.get(target.id)

					// memberTarget.roles.remove(mainRole.id)
					// memberTarget.roles.add(muteRole.id)
					console.log(mainRole, muteRole)
					message.channel.send(`@${memberTarget.user.id} wurde mundtot gemacht...`)
				}
			} else {
				var failureResponse = 'Nur baba Devs können muten du Lappen...'
				message.channel.send(failureResponse)
			}
		} catch (error) {
			console.error(error)
			let errorResponse = 'Zellenwärter ruft mich uno momento ahki...'
			message.channel.send(errorResponse)
		}
	}
}