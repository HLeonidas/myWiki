export const cors = () => {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ACAO);
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, content-type, If-None-Match');
        res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE');
        res.setHeader('Access-Control-Expose-Headers', 'ETag');

        if (req.method.toUpperCase() === 'OPTIONS')
            res.status(200).send('Preflight ok!');
        else next();
    }
}