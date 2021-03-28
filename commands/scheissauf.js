module.exports = {
	name: 'scheissauf',
	description: 'This is a roast command.',
	execute(message, args, Discord) {
		try {
			if (!args[0]) {
				var requestReciever = 'Wen soll ich dissen Lelek? Eno? Mero? Serro El Merro?'
				message.channel.send(requestReciever)
			} else {
				var rawReciever = args[0].toString()
				var reciever = rawReciever.replace(/,/g, ' ')
				var disses = [`${reciever} hat einen TF Bern Lehrabschluss.`, `${reciever} hat zwei TF Bern Lehrabschlüsse...`, `${reciever} hat Pickel am Yarak.`, `${reciever} ist schwul.`, `${reciever} lutsch Eier.`, `Karroten isst ${reciever} am liebsten mit Fler-Kot-Dip...`, `${reciever} hat Hodenkrebs.`, `${reciever} fickt nicht mal dickere Frauen.`, `${reciever} ist ein Incel.`, `${reciever} trinkt sein eigenes Sperma an Ramadan weil halal.`, `${reciever} ist flodder flodder...`, `${reciever} spielt american handball.`, `${reciever} seine mudda ist eine hure.`, `${reciever} hat Hodenkrebs.`]
				var setDisses = []

				function generateDiss() {
					while (setDisses.length < 3) {
						var r = Math.floor(Math.random() * disses.length)
						if (setDisses.indexOf(r) === -1) setDisses.push(r);
					}
				}
				generateDiss()
				var successResponse = new Discord.MessageEmbed()
					.setColor('#FFD700')
					.setTitle('Dein persönlicher Diss von Xatar')
					.setDescription(`Gründe warum ${reciever} nicht von AON gesigned wurde ahki...`)
					.addFields({
						name: 'Ersterenz:',
						value: `${disses[setDisses[0]]}`
					}, {
						name: 'Zweitenz:',
						value: `${disses[setDisses[1]]}`
					}, {
						name: 'Und zu aller letzt akhi:',
						value: `${disses[setDisses[2]]}`
					}, )
					.setImage('https://hiphop.de/sites/default/files/styles/hiphopde_800x450/public/xatar_pr_1600_2018_1.jpg?itok=m-K9NgUt')
				message.channel.send(successResponse)
			}
		} catch (error) {
			console.log(error)
			var failureResponse = 'Sry ahki. Mir fällt nix ein wie damals bei KC...'
			message.channel.send(failureResponse)
		}

	}
}