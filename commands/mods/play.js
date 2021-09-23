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

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
	name: 'play',
	aliases: ['skip', 'stop'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
	cooldown: 0,
	description: 'Advanced music bot',
	async execute(message, args, cmd, client, Discord) {


		//Checking for the voicechannel and permissions (you can add more permissions if you like).
		const voice_channel = message.member.voice.channel;
		if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
		const permissions = voice_channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
		if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

		//This is our server queue. We are getting this server queue from the global queue.
		const server_queue = queue.get(message.guild.id);

		//If the user has used the play command
		if (cmd === 'play') {
			if (!args.length) return message.channel.send('You need to send the second argument!');
			let song = {};

			//If the first argument is a link. Set the song object to have two keys. Title and URl.
			if (ytdl.validateURL(args[0])) {
				const song_info = await ytdl.getInfo(args[0]);
				song = {
					title: song_info.videoDetails.title,
					url: song_info.videoDetails.video_url
				}
			} else {
				//If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
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

			//If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
			if (!server_queue) {

				const queue_constructor = {
					voice_channel: voice_channel,
					text_channel: message.channel,
					connection: null,
					songs: []
				}

				//Add our key and value pair into the global queue. We then use this to get our server queue.
				queue.set(message.guild.id, queue_constructor);
				queue_constructor.songs.push(song);

				//Establish a connection and play the song with the vide_player function.
				try {
					const connection = await voice_channel.join();
					queue_constructor.connection = connection;
					video_player(message.guild, queue_constructor.songs[0]);
				} catch (err) {
					queue.delete(message.guild.id);
					message.channel.send('There was an error connecting!');
					throw err;
				}
			} else {
				server_queue.songs.push(song);
				return message.channel.send(`👍 **${song.title}** added to queue!`);
			}
		} else if (cmd === 'skip') skip_song(message, server_queue);
		else if (cmd === 'stop') stop_song(message, server_queue);
	}

}

const video_player = async (guild, song) => {
	const song_queue = queue.get(guild.id);

	//If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
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
	await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
	if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
	if (!server_queue) {
		return message.channel.send(`There are no songs in queue 😔`);
	}
	server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
	if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
	server_queue.songs = [];
	server_queue.connection.dispatcher.end();
}