import { AmethystCommand } from "amethystjs";
import { EmbedBuilder } from "discord.js";
import isStaff from "../preconditions/isStaff";
import { stats } from "../typings/database";
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

    const embed = new EmbedBuilder()
        .setTitle('Informations de membres')
        .setDescription(`Here are the stats of <@${user.id}>`)
        .setThumbnail(user.displayAvatarURL({ forceStatic: true }))
        .setFields(
            {
                name: "Mots trouvés :",
                value: datas[0].wordsFound ?? '0',
                inline: false
            },
            {
                name: 'Série :',
                value: (datas[0].serie ?? '0') + " mots d'affilée",
                inline: false
            }
        )
        .setColor('Orange')
    message.channel.send({ embeds: [ embed ] }).catch(() => {});
})