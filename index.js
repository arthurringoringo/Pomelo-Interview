'use strict';

const Hapi = require('@hapi/hapi');
const service = require('./service');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/PostData',
        handler: (request, h) => {
            var payload = request.payload;
            const responseTree = service.response1(payload);

            return h.response(responseTree);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();