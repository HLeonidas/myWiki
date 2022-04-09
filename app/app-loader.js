import express from "express";
import { requestLogger } from "../middleware/request-logger.js";
import { cors } from "../middleware/cors.js";
import { log } from "../logging/app-logger.js";

import { apiV1Router } from "./apiv1-router.js";
// import { defaultError, } from "../errorHandling/error-handler.js";

const { json } = express;

export const configure = async (app) => {

    // app.use(cors());
    app.use(json());
    app.use(requestLogger);

    app.use("/api/v1", apiV1Router)

    let clientFolder = 'mywikiclient/build';
    app.use(express.static(clientFolder));
    log.success(`serving static content from folder ${clientFolder}.`);

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: clientFolder });
    });
};

// export const configureInErrorMode = async (app) => {
//     app.use(defaultError);
// };
