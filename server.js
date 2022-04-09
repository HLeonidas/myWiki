'use strict';

import express from 'express';
import http from 'http'
import dotenv from 'dotenv';
import { configure } from './app/app-loader.js';
import { log } from './logging/app-logger.js';
import { fs } from './firestore/firestore.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const hostname = process.env.HOST;
const port = process.env.PORT;

app.hostname = hostname;
app.port = port;
app.protocol = 'http';

const main = async () => {
    log.info(`server started. starting webserver ...`);

    server.listen(port, hostname, async () => {
        try {
            log.success(`Web Server up and running at: ${hostname}:${port}`);
            log.success(`Firestore initialized: ${fs.name}`);
            // log.info(`server started. trying to connect to database ...`);
            // log.success(`DBConnect to ${mongoConnectionString} successful`);

            configure(app);

        } catch (err) {
            // configureInErrorMode(app)
            log.error(
                `Chat Web Application running in error-mode.\n` +
                `There were startup-problems. App is not healty!\n` +
                err,
            );
        }
    });
}

main();

export default app;