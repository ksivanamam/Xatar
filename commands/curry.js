module.exports = {
	name: 'curry',
	description: 'This is a curry command.',
	execute(message, args, Discord) {
		try {
			var successResponse = new Discord.MessageEmbed()
				.setColor('#FFD700')
				.setTitle('Chadpreet')
				.setDescription(`Mashallah diese Inder. Ich küss seine Augen.`)
				.addFields({
					name: 'Aussehen:',
					value: `10/10`
				}, {
					name: 'Intelicence:',
					value: `130 IC`
				}, {
					name: 'Hat Überschuss an:',
					value: `Bobs und Vagen`
				}, )
				.setImage('https://incels.wiki/images/thumb/6/66/Currycel.jpg/300px-Currycel.jpg')
			message.channel.send(successResponse)
		} catch (error) {
			console.log(error)
			var failureResponse = 'Sry ahki nur noch Baklawa da.'
			message.channel.send(failureResponse)
		}

	}
}