import { Precondition } from "amethystjs";

export default new Precondition('isStaff')
    .setMessageRun(({ message }) => {
        if (!message.member.roles.cache.has('71268595709850424')) return {
            ok: false,
            message: 'User not staff',
            isChatInput: false,
            channelMessage: message
        }
        return {
            ok: true,
            isChatInput: false,
            channelMessage: message
        }
    })