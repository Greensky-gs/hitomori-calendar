import { AmethystEvent } from "amethystjs";
import { query } from "../utils/query";

export default new AmethystEvent('ready', async() => {
    const res = await query(`SELECT word FROM configs`);
    if (res.length > 0) return;

    query(`INSERT INTO configs (word) VALUES ('cadeau')`);
})