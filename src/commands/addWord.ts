import { AmethystCommand, waitForMessage } from "amethystjs";
import { Message, TextChannel } from "discord.js";
import isStaff from "../preconditions/isStaff";
import { needCancel } from "../utils/functions";
import { query } from "../utils/query";

export default new AmethystCommand({
    name: 'setword',
    description: "Configure le mot du jour",
    preconditions: [ isStaff ]
})
.setMessageRun(async({ message, options }) => {
    message.delete();
    let word = options.first;
    if (!word) {
        const msg = await message.channel.send(`❓ | Envoyez le mot que vous voulez-configurer.\n\nRépondez par \`cancel\` pour annuler`) as Message<true>;
        const reply = await waitForMessage({
            channel: message.channel as TextChannel,
            whoCanReply: 'useronly',
            user: message.author
        });

        if (needCancel(reply)) return msg.delete().catch(() => {});
        word = reply.content;
    }

    query(`UPDATE configs SET word='${word}'`);
    message.channel.send("✅ | Mot changé")
})