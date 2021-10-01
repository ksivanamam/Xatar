module.exports = {
	name: 'clear',
	description: 'Clears text messages in chat.',
	async execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'RAV Stammkunde' || r.name === 'Store manager')) {
				if (!args[0]) {
					return message.reply('Gib Anzahl Zeilen an du Pislik.')
				} else if (isNaN(args[0])) {
					return message.reply('ANZAHL heisst eine Zahl du Hurensohn...')
				} else if (args[0] > 100) {
					return message.reply('Du kannst nicht mehr als 100 Zeilen löschen.')
				} else if (args[0] < 1) {
					return message.reply('Du musst mindestens einen Türken löschen. Ehm Ich meine Zeile...')
				}

				await message.channel.messages.fetch({
					limit: args[0]
				}).then(messages => {
					message.channel.bulkDelete(messages)
				})
			} else {
				let failureResponse = 'Nur die Babas aller Babas können Chatverlauf löschen akho...'
				message.channel.send(failureResponse)
			}
		} catch (error) {
			console.error(error);
			message.channel.send('Sry Akhi. KC bumst mich grad zwischen meinen Nackenspeck...')
		}
	}
}