module.exports = {
	name: 'schulzeit',
	description: 'This is a story command.',
	execute(message, args) {
		try {
			let failureResponse = 'Wir waren arm, aber Bildung war eine große Sache in meiner Familie. Ich war einer der wenigen unter meinen Freunden, die es aufs Gymnasium schafften. Ich bemühte mich und war am Anfang ein richtiger Musterschüler, aber ich fühlte mich ungerecht behandelt. Mir erschien das Leben wie ein Restaurant, in dem ein riesiges Büfett aufgebaut war. Jeder nahm sich, was er wollte. Nur gab es vor diesem Büfett eine Art unsichtbare Glasscheibe für uns Kanaken. Ich konnte alles sehen, aber nie mitessen. Ich wollte aber auch was vom Büfett.'
			message.channel.send(failureResponse)
		} catch (error) {
			console.error(error)
			let errorResponse = "Zellenwärter ruft mich uno momento ahki..."
			message.channel.send(errorResponse)
		}
	}
}