module.exports = {
   name: 'clear',
   description: 'Clears text messages in chat.',
   async execute(message, args) {
	   try {
		   if (!args[0]) {
			   return message.reply('Gib Anzahl Zeilen an du Kek.')
		   } else if (isNaN(args[0])) {
			   return message.reply('ANZAHL heisst eine Zahl du Hurensohn...')
		   } else if (args[0] > 100) {
			   return message.reply('Du kannst nicht mehr als 100 Zeilen löschen.')
		   } else if (args[0] < 1) {
			   return message.reply('Du musst mindestens einen Türken löschen. Ehm Ich meine Zeile...')
		   }

		   await message.channel.messages.fetch({limit: args[0]}).then(messages => {
			   message.channel.bulkDelete(messages)
		   })
	   } catch (error) {
		   console.error(error);
		   message.channel.send('Sry Akhi. KC bumst mich grad zwischen meinen Nackenspeck...')
	   }
   }
}