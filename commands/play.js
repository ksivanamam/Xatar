/* const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
		name: 'play',
		description: 'Joins and plays a video from youtube',
		async execute(message, args) {
			try {
				if (message.member.roles.cache.some(r => r.name === 'Store Manager' || r.name === 'RAV Stammkunde')) {
						const voiceChannel = message.member.voice.channel;

						if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
						const permissions = voiceChannel.permissionsFor(message.client.user);
						if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
						if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
						if (!args.length) return message.channel.send('You need to send the second argument!');

						const validURL = (str) => {
							var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
							if (!regex.test(str)) {
								return false;
							} else {
								return true;
							}
						}

						if (validURL(args[0])) {

							const connection = await voiceChannel.join();
							const stream = ytdl(args[0])

							connection.play(stream, {
									seek: 0,
									volume: 1
								})
								.on('finish', () => {
									voiceChannel.leave();
									message.channel.send('Bruda muss los... Handyakku fast leer.');
								});

							await message.reply(`:thumbsup: Jetzt läuft: ***Dein Link!***`)

							return
						}


						const connection = await voiceChannel.join();

						const videoFinder = async (query) => {
							const videoResult = await ytSearch(query);

							return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

						}

						const video = await videoFinder(args.join(' '));

						if (video) {
							const stream = ytdl(video.url, {
								filter: 'audioonly'
							});
							connection.play(stream, {
									seek: 0,
									volume: 1
								})
								.on('finish', () => {
									voiceChannel.leave();
									message.channel.send('Bruda muss los... Handyakku fast leer.');
								});

							await message.reply(`:thumbsup: Jetzt läuft ***${video.title}***`)
						} else {
							message.channel.send('Keine Videos gefunden.');
						}
					} else {
						message.channel.send('Nur der Baba aller Babas kann mich Schwuchtel zum zwitschern bringen akho...');
					}
				}
				catch (error) {
					console.log('Unable to run play command');
				}
			}
		} */

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
	name: 'play',
	aliases: ['skip', 'stop'],
	cooldown: 0,
	description: 'Advanced music bot',
	async execute(message, args, cmd, client, Discord) {


		const voice_channel = message.member.voice.channel;
		if (!voice_channel) return message.channel.send('Du musst in einem Channel sein akho...');
		const permissions = voice_channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Keine Rechte!');
		if (!permissions.has('SPEAK')) return message.channel.send('Keine Rechte!');

		const server_queue = queue.get(message.guild.id);

		if (cmd === 'play') {
			if (!args.length) return message.channel.send('Was play? Play was??');
			let song = {};

			if (ytdl.validateURL(args[0])) {
				const song_info = await ytdl.getInfo(args[0]);
				song = {
					title: song_info.videoDetails.title,
					url: song_info.videoDetails.video_url
				}
			} else {
				const video_finder = async (query) => {
					const video_result = await ytSearch(query);
					return (video_result.videos.length > 1) ? video_result.videos[0] : null;
				}

				const video = await video_finder(args.join(' '));
				if (video) {
					song = {
						title: video.title,
						url: video.url
					}
				} else {
					message.channel.send('Error finding video.');
				}
			}

			if (!server_queue) {

				const queue_constructor = {
					voice_channel: voice_channel,
					text_channel: message.channel,
					connection: null,
					songs: []
				}

				queue.set(message.guild.id, queue_constructor);
				queue_constructor.songs.push(song);

				try {
					const connection = await voice_channel.join();
					queue_constructor.connection = connection;
					video_player(message.guild, queue_constructor.songs[0]);
				} catch (err) {
					queue.delete(message.guild.id);
					message.channel.send('Heute kein drop. WLAN geht nicht...!');
					throw err;
				}
			} else {
				server_queue.songs.push(song);
				return message.channel.send(`👍 **${song.title}** Zur Queue hinzugefügt.!`);
			}
		} else if (cmd === 'skip') skip_song(message, server_queue);
		else if (cmd === 'stop') stop_song(message, server_queue);
	}

}

const video_player = async (guild, song) => {
	const song_queue = queue.get(guild.id);

	if (!song) {
		song_queue.voice_channel.leave();
		queue.delete(guild.id);
		return;
	}
	const stream = ytdl(song.url, {
		filter: 'audioonly'
	});
	song_queue.connection.play(stream, {
			seek: 0,
			volume: 0.5
		})
		.on('finish', () => {
			song_queue.songs.shift();
			video_player(guild, song_queue.songs[0]);
		});
	await song_queue.text_channel.send(`🎶 Jetzt spielt **${song.title}**`)
}

const skip_song = (message, server_queue) => {
	if (!message.member.voice.channel) return message.channel.send('Du musst in einem Channel sein akho...');
	message.channel.send('Skip skip.')
	if (!server_queue) {
		return message.channel.send(`There are no songs in queue`);
	}
	server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
	if (!message.member.voice.channel) return message.channel.send('Du musst in einem Channel sein akho...!');
	message.channel.send('Ich hör ja schon auf...')
	server_queue.songs = [];
	server_queue.connection.dispatcher.end();
}