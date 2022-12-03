import { Message } from "discord.js";
import { stats } from "../typings/database";
import { query } from "./query";

export const needCancel = (reply: undefined | Message) => {
    if (!reply || reply.content.toLowerCase() === 'cancel') return true;
    return false;
}
export const updateMember = async(userId: string) => {
    const datas = await query<stats>(`SELECT * FROM stats WHERE user_id='${userId}'`);
    let sql = `INSERT INTO stats (user_id, serie, wordsFound, lastWord) VALUES ('${userId}', '1', '1', '${Date.now()}')`;
    if (datas.length === 0) {
        sql = `UPDATE stats SET serie='${(parseInt(datas[0].lastWord) - Date.now() > 864000000) ? datas[0].serie + 1 : '1'}', wordsFound='${datas[0].wordsFound + 1}', lastWord='${Date.now()}' WHERE user_id='${userId}'`
    };

    query(sql);
}