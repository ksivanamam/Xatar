const queue = new Map();
const path = require('path')

module.exports = {
	name: 'sharmuta',
	aliases: ['Istighfar'],
	cooldown: 0,
	description: 'Advanced music bot',
	async execute(message, args, cmd, client, Discord) {


		const voice_channel = message.member.voice.channel;
		if (!voice_channel) return message.channel.send('Du musst in einem Channel sein akho...');
		const permissions = voice_channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Keine Rechte!');
		if (!permissions.has('SPEAK')) return message.channel.send('Keine Rechte!');

		if (cmd === 'sharmuta') {
			let successResponse = 'Sharmuta...'
			message.channel.send(successResponse)

			const voiceChannel = message.member.voice.channel;
			const connection = await voiceChannel.join();

			connection.play(path.join(_dirname, 'Astaghfirullah.mp3'), {
				seek: 0,
				volume: 1
			})
			.on('finish', () => {
				voiceChannel.leave();
				message.channel.send('Bruda muss los... Handyakku fast leer.');
			});
		}
	}

}