module.exports = {
	name: 'name',
	description: 'description',
	execute(message, args) {
		try {

		} catch (error) {
			console.error(error)
			let errorResponse = 'Zellenwärter ruft mich uno momento ahki...'
			message.channel.send(errorResponse)
		}
	}
}