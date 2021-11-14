const path = require('path')

module.exports = {
	name: 'empathy',
	aliases: ['mitleid'],
	cooldown: 0,
	description: 'Advanced music bot',
	async execute(message, args, cmd, client, Discord) {


		const voice_channel = message.member.voice.channel;
		if (!voice_channel) return message.channel.send('Du musst in einem Channel sein akho...');
		const permissions = voice_channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Keine Rechte!');
		if (!permissions.has('SPEAK')) return message.channel.send('Keine Rechte!');

		if (cmd === 'empathy') {
			let successResponse = 'Liebe afrikanische Kinder und liebe asiatische Kinder es tut mir sehr leid, dass... ** *lacht* **'
			message.channel.send(successResponse)

			const voiceChannel = message.member.voice.channel;
			const connection = await voiceChannel.join();

			connection.play(path.join(__dirname, 'empathy.mp3'))
			.on('finish', () => {
				voiceChannel.leave();
				message.channel.send('Du hast vollkommen Recht. Das ist nicht witzi...');
			});
		}
	}

}