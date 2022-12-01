import { database } from "..";

export const query = <T = any>(search: string) => {
    return new Promise<string | T[]>((resolve, reject) => {
      database.query(search, (error, request) => {
        if (error) reject(error)
        else resolve(request);
      });
    });
  };