module.exports = {
	name: 'leave',
	description: 'stop the bot and leave the channel',
	async execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'Store Manager' || r.name === 'RAV Stammkunde')) {
				const voiceChannel = message.member.voice.channel;

				if (!voiceChannel) return message.channel.send("Du musst in einem Chat sein um mich zu stoppen...!");
				await voiceChannel.leave();
				await message.channel.send('Bruda muss los... :smiling_face_with_tear:')
			} else {
				message.channel.send('Muss gehen Fard ruft an. Er meint er braucht doch Hilfe... :smiling_face_with_tear:')
			}
		} catch (error) {

		}
	}
}