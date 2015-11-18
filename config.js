module.exports = {
    misc: {
        listen_port: 13510
    },
    jwt: {
        accessToken: {
            secret: 'cfvgbhnj',
            expiresInMinutes: 3600,
            algorithm: 'HS256',
            audience: 'fvgbhnj',
            subject: 'fvgbhnj',
            issuer: 'vgtbhnj',
            noTimestamp: false,
            header: {}
        },
        refreshToken: {
            secret: 'cfvgbhftvgybhnj',
            expiresInMinutes: 36000,
            algorithm: 'HS256',
            audience: 'fvgbhnj',
            subject: 'fvgbhnj',
            issuer: 'vgtbhnj',
            noTimestamp: false,
            header: {}
        }
    },
    upload: {
        meta: '/Users/fishead/Workbench/JiaChong/file_warehouse_api/storage/meta',
        ref: '/Users/fishead/Workbench/JiaChong/file_warehouse_api/storage/ref',
        chunk: '/Users/fishead/Workbench/JiaChong/file_warehouse_api/storage/chunk',
        single: {
            fileFieldName: 'single'
        }
    }
};
