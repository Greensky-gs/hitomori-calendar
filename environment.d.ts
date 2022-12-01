declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            host: string;
            password: string;
            database: string;
            user: string;
        }
    }
}

export {};