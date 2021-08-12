const ms = require('ms');
module.exports = {
	name: 'mute',
	description: "This mutes a member",
	execute(message, args) {
		try {
			if (message.member.roles.cache.some(r => r.name === 'RAV Stammkunde' || r.name === 'Store manager')) {
				const target = message.mentions.users.first();
				if (target) {

					let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
					let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

					let memberTarget = message.guild.members.cache.get(target.id);

					if (!args[1]) {
						memberTarget.roles.remove(mainRole.id);
						memberTarget.roles.add(muteRole.id);
						message.channel.send(`<@${memberTarget.user.id}> has been muted`);
						return
					}
					memberTarget.roles.remove(mainRole.id);
					memberTarget.roles.add(muteRole.id);
					message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

					setTimeout(function () {
						memberTarget.roles.remove(muteRole.id);
						memberTarget.roles.add(mainRole.id);
					}, ms(args[1]));
				} else {
					message.channel.send('Cant find that member!');
				}
			} else {

			}
		} catch (error) {
			console.error(error);
			message.channel.send('Sry Akhi. KC bumst mich grad zwischen meinen Nackenspeck...')
		}
	}
}