module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("Du musst in einem Chat sein um mich zu stoppen...!");
        await voiceChannel.leave();
        await message.channel.send('Bruda muss los... :smiling_face_with_tear:')
 
    }
}