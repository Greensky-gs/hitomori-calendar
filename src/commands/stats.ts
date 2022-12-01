import { AmethystCommand } from "amethystjs";
import isStaff from "../preconditions/isStaff";
import { stats } from "../typings/stats";
import { query } from "../utils/query";

export default new AmethystCommand({
    name: 'stats',
    description: "Affiche les stats d'un utilisateur",
    preconditions: [ isStaff ]
})
.setMessageRun(async({ message, options }) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(options.first)?.user;
    if (!user) return message.channel.send(`:x: | Merci de mentionner ou de donner l'id d'un membre`).catch(() => {});

    const datas = await query<stats>(`SELECT * FROM stats WHERE user_id='${user.id}'`);
    if (!datas || datas.length === 0) return message.channel.send(`:x: | Je n'ai aucune info sur ce membre`);

    
})