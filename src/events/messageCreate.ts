import { AmethystEvent } from "amethystjs";
import { configs } from "../typings/database";
import { updateMember } from "../utils/functions";
import { query } from "../utils/query";

export default new AmethystEvent('messageCreate', async(msg) => {
    if (!msg.guild || msg.author.bot || !msg.content.toLowerCase().startsWith(msg.client.configs.prefix)) return;

    const args = msg.content.slice(msg.client.configs.prefix.length).split(/ +/g);
    const word = args.shift()?.toLowerCase();

    if (!word) return;
    msg.delete();
    const toGuess = (await query<configs>(`SELECT word FROM configs`))[0].word;

    if (!toGuess) return;
    if (word === toGuess) {
        updateMember(msg.author.id);
        msg.channel.send(`<@${msg.author.id}> a trouvé le mot`);
    }
})