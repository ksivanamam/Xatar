const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
		name: 'play',
		description: 'Joins and plays a video from youtube',
		async execute(message, args) {
			try {
				if (message.member.roles.cache.some(r => r.name === 'Store manager')) {
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
		}